const express = require("express");
const connection = require("../connection");
const router = express.Router();
const auth = require("../services/Authentication");
const checkRole = require("../services/checkRole");

// Helper pour exécuter une requête SQL avec async/await
const executeQuery = (query, params = []) => {
    return new Promise((resolve, reject) => {
        connection.query(query, params, (err, results) => {
            if (err) reject(err);
            else resolve(results);
        });
    });
};

// Ajouter un produit
router.post('/add', auth.authenticateToken, checkRole.checkRole, async (req, res) => {
    try {
        const { name, categoryId, description, price } = req.body;
        if (!name || !categoryId || !description || !price) {
            return res.status(400).json({ message: "Tous les champs sont requis." });
        }

        const query = "INSERT INTO product (name, categoryId, description, price, status) VALUES (?, ?, ?, ?, 'true')";
        await executeQuery(query, [name, categoryId, description, price]);

        res.status(201).json({ message: "Produit ajouté avec succès." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Récupérer tous les produits avec leur catégorie
router.get('/get', auth.authenticateToken, async (req, res) => {
    try {
        const query = `
            SELECT p.id, p.name, p.description, p.price, p.status, 
                   c.id AS categoryId, c.name AS categoryName
            FROM product AS p 
            INNER JOIN category AS c ON p.categoryId = c.id`;
        const products = await executeQuery(query);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Récupérer les produits d'une catégorie
router.get('/getByCategory/:id', auth.authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) return res.status(400).json({ message: "ID de catégorie requis." });

        const query = "SELECT id, name FROM product WHERE categoryId = ? AND status = 'true'";
        const products = await executeQuery(query, [id]);

        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Récupérer un produit par son ID
router.get('/getById/:id', auth.authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) return res.status(400).json({ message: "ID du produit requis." });

        const query = "SELECT id, name, description, price FROM product WHERE id = ?";
        const [product] = await executeQuery(query, [id]);

        if (!product) return res.status(404).json({ message: "Produit non trouvé." });

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Mettre à jour un produit
router.patch('/update', auth.authenticateToken, checkRole.checkRole, async (req, res) => {
    try {
        const { id, name, categoryId, description, price } = req.body;
        if (!id || !name || !categoryId || !description || !price) {
            return res.status(400).json({ message: "Tous les champs sont requis." });
        }

        const query = "UPDATE product SET name=?, categoryId=?, description=?, price=? WHERE id=?";
        const result = await executeQuery(query, [name, categoryId, description, price, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Produit non trouvé." });
        }

        res.status(200).json({ message: "Produit mis à jour avec succès." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Supprimer un produit
router.delete('/delete/:id', auth.authenticateToken, checkRole.checkRole, async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) return res.status(400).json({ message: "ID du produit requis." });

        const query = "DELETE FROM product WHERE id=?";
        const result = await executeQuery(query, [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Produit non trouvé." });
        }

        res.status(200).json({ message: "Produit supprimé avec succès." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Mettre à jour le statut d'un produit
router.patch('/updateStatus', auth.authenticateToken, checkRole.checkRole, async (req, res) => {
    try {
        const { id, status } = req.body;
        if (!id || status === undefined) {
            return res.status(400).json({ message: "ID et statut requis." });
        }

        const query = "UPDATE product SET status=? WHERE id=?";
        const result = await executeQuery(query, [status, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Produit non trouvé." });
        }

        res.status(200).json({ message: "Statut du produit mis à jour avec succès." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
