const express = require("express");
const connection = require("../connection");
const router = express.Router();
const auth = require("../services/Authentication");
const checkRole = require("../services/checkRole");

// Fonction utilitaire pour exécuter une requête SQL avec async/await
const executeQuery = (query, params = []) => {
    return new Promise((resolve, reject) => {
        connection.query(query, params, (err, results) => {
            if (err) reject(err);
            else resolve(results);
        });
    });
};

// Ajouter une catégorie
router.post('/add', auth.authenticateToken, checkRole.checkRole, async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ message: "Category name is required" });
        }

        const query = "INSERT INTO category (name) VALUES (?)";
        await executeQuery(query, [name]);

        res.status(201).json({ message: "Category added successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Récupérer toutes les catégories
router.get('/get', auth.authenticateToken, async (req, res) => {
    try {
        const query = "SELECT * FROM category ORDER BY name";
        const results = await executeQuery(query);

        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Mettre à jour une catégorie
router.patch('/update', auth.authenticateToken, checkRole.checkRole, async (req, res) => {
    try {
        const { id, name } = req.body;
        if (!id || !name) {
            return res.status(400).json({ message: "Category id and name are required" });
        }

        const query = "UPDATE category SET name = ? WHERE id = ?";
        const results = await executeQuery(query, [name, id]);

        if (results.affectedRows === 0) {
            return res.status(404).json({ message: "Category ID not found" });
        }

        res.status(200).json({ message: "Category updated successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
