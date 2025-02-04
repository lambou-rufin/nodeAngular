const express = require('express');
const connection = require('../connection');
const router = express.Router();
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
require('dotenv').config();
let auth = require("../services/Authentication");
let checkRole = require("../services/checkRole");

// Fonction utilitaire pour exécuter une requête SQL avec Promises
const queryAsync = (sql, params) => {
    return new Promise((resolve, reject) => {
        connection.query(sql, params, (err, results) => {
            if (err) reject(err);
            else resolve(results);
        });
    });
};

// ✅ SIGNUP (Inscription)
router.post('/signup', async (req, res) => {
    try {
        const { name, contactNumber, email, password } = req.body;
        const checkUserQuery = "SELECT email FROM user WHERE email = ?";
        const existingUser = await queryAsync(checkUserQuery, [email]);

        if (existingUser.length > 0) {
            return res.status(400).json({ message: "Email déjà existant." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const insertUserQuery = `
            INSERT INTO user (name, contactNumber, email, password, status, role) 
            VALUES (?, ?, ?, ?, 'false', 'user');
        `;
        await queryAsync(insertUserQuery, [name, contactNumber, email, hashedPassword]);

        res.status(200).json({ message: "Inscription réussie." });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ✅ LOGIN (Connexion)
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const query = "SELECT email, password, role, status FROM user WHERE email = ?";
        const users = await queryAsync(query, [email]);

        if (users.length === 0) {
            return res.status(401).json({ message: "Email ou mot de passe incorrect." });
        }

        const user = users[0];

        // Vérifier le mot de passe haché
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ message: "Email ou mot de passe incorrect." });
        }

        if (user.status === 'false') {
            return res.status(401).json({ message: "Veuillez attendre l'approbation de l'administrateur." });
        }

        const token = jwt.sign({ email: user.email, role: user.role }, process.env.ACCESS_TOKEN, { expiresIn: '8h' });

        res.status(200).json({ token });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ✅ FORGOT PASSWORD (Mot de passe oublié)
router.post('/forgotPassword', async (req, res) => {
    try {
        const { email } = req.body;
        const query = "SELECT email, password FROM user WHERE email = ?";
        const users = await queryAsync(query, [email]);

        if (users.length === 0) {
            return res.status(404).json({ message: "Email non trouvé." });
        }

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        });

        let mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Mot de passe oublié - Lambo',
            html: `<p><b>Vos informations de connexion :</b><br><b>Email:</b> ${users[0].email}<br><b>Mot de passe:</b> ${users[0].password}<br><a href="http://localhost:4200">Cliquez ici pour vous connecter</a></p>`
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "Mot de passe envoyé par email." });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ✅ GET USERS (Récupérer tous les utilisateurs)
router.get('/get', auth.authenticateToken, checkRole.checkRole, async (req, res) => {
    try {
        const query = "SELECT id, name, email, contactNumber, status FROM user WHERE role = 'user'";
        const users = await queryAsync(query);
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ✅ UPDATE USER STATUS (Mise à jour du statut d'un utilisateur)
router.patch('/update', auth.authenticateToken, checkRole.checkRole, async (req, res) => {
    try {
        const { id, status } = req.body;
        const query = "UPDATE user SET status = ? WHERE id = ?";
        const result = await queryAsync(query, [status, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Utilisateur introuvable." });
        }

        res.status(200).json({ message: "Utilisateur mis à jour avec succès." });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ✅ CHECK TOKEN (Vérifier si le token est valide)
router.get('/checkToken', auth.authenticateToken, (req, res) => {
    res.status(200).json({ message: "Token valide." });
});

// ✅ CHANGE PASSWORD (Changer le mot de passe)
router.post('/changePassword', auth.authenticateToken, async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;
        const email = res.locals.email;

        const query = "SELECT password FROM user WHERE email = ?";
        const users = await queryAsync(query, [email]);

        if (users.length === 0) {
            return res.status(400).json({ message: "Utilisateur non trouvé." });
        }

        // Vérifier l'ancien mot de passe
        const match = await bcrypt.compare(oldPassword, users[0].password);
        if (!match) {
            return res.status(400).json({ message: "Ancien mot de passe incorrect." });
        }

        // Hacher le nouveau mot de passe
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        const updateQuery = "UPDATE user SET password = ? WHERE email = ?";
        await queryAsync(updateQuery, [hashedNewPassword, email]);

        res.status(200).json({ message: "Mot de passe mis à jour avec succès." });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
