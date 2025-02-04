const express = require('express');
const connection = require('../connection');
const router = express.Router();
const auth = require('../services/Authentication');

// Fonction utilitaire pour exécuter une requête SQL avec async/await
const executeQuery = (query) => {
    return new Promise((resolve, reject) => {
        connection.query(query, (err, results) => {
            if (err) reject(err);
            else resolve(results[0]);
        });
    });
};

router.get('/details', auth.authenticateToken, async (req, res) => {
    try {
        // Exécuter les requêtes en parallèle avec Promise.all pour optimiser la vitesse
        const [categoryResult, productResult, billResult] = await Promise.all([
            executeQuery("SELECT COUNT(id) AS categoryCount FROM category"),
            executeQuery("SELECT COUNT(id) AS productCount FROM product"),
            executeQuery("SELECT COUNT(id) AS billCount FROM bill") // Correction: `bill` au lieu de `product`
        ]);

        // Construire l'objet réponse
        const data = {
            category: categoryResult.categoryCount,
            product: productResult.productCount,
            bill: billResult.billCount
        };

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
