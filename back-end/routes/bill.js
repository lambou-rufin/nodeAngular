const express = require("express");
const connection = require("../connection");
const router = express.Router();
const ejs = require("ejs");
const pdf = require("html-pdf");
const path = require("path");
const fs = require("fs");
const uuid = require("uuid");
const auth = require("../services/Authentication");

// Fonction utilitaire pour exécuter une requête SQL avec async/await
const executeQuery = (query, params = []) => {
    return new Promise((resolve, reject) => {
        connection.query(query, params, (err, results) => {
            if (err) reject(err);
            else resolve(results);
        });
    });
};

// Générer un rapport PDF et enregistrer dans la base de données
router.post("/generateReport", auth.authenticateToken, async (req, res) => {
    try {
        const generatedUuid = uuid.v1();
        const orderDetails = req.body;

        if (!orderDetails.productDetails || !orderDetails.name || !orderDetails.email) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const productDetailsReport = JSON.parse(orderDetails.productDetails);
        const query = "INSERT INTO bill (name, uuid, email, contactNumber, paymentMethod, total, productDetails, createdBy) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        
        await executeQuery(query, [
            orderDetails.name,
            generatedUuid,
            orderDetails.email,
            orderDetails.contactNumber,
            orderDetails.paymentMethod,
            orderDetails.totalAmount,
            orderDetails.productDetails,
            res.locals.email,
        ]);

        // Génération du PDF
        const filePath = `./generated_pdf/${generatedUuid}.pdf`;
        ejs.renderFile(path.join(__dirname, "report.ejs"), {
            productDetails: productDetailsReport,
            name: orderDetails.name,
            email: orderDetails.email,
            contactNumber: orderDetails.contactNumber,
            paymentMethod: orderDetails.paymentMethod,
            totalAmount: orderDetails.totalAmount,
        }, (err, html) => {
            if (err) {
                return res.status(500).json({ error: "Error generating PDF template", details: err.message });
            }

            pdf.create(html).toFile(filePath, (err) => {
                if (err) {
                    return res.status(500).json({ error: "Error creating PDF", details: err.message });
                }
                res.status(201).json({ uuid: generatedUuid });
            });
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Télécharger un PDF existant ou le générer s'il n'existe pas
router.get("/getPdf", auth.authenticateToken, async (req, res) => {
    try {
        const { uuid, productDetails, name, email, contactNumber, paymentMethod, totalAmount } = req.body;
        if (!uuid) {
            return res.status(400).json({ message: "UUID is required" });
        }

        const pdfPath = `./generated_pdf/${uuid}.pdf`;
        if (fs.existsSync(pdfPath)) {
            res.contentType("application/pdf");
            return fs.createReadStream(pdfPath).pipe(res);
        }

        if (!productDetails) {
            return res.status(400).json({ message: "Product details required to regenerate PDF" });
        }

        const productDetailsReport = JSON.parse(productDetails);
        ejs.renderFile(path.join(__dirname, "report.ejs"), {
            productDetails: productDetailsReport,
            name,
            email,
            contactNumber,
            paymentMethod,
            totalAmount,
        }, (err, html) => {
            if (err) {
                return res.status(500).json({ error: "Error generating PDF template", details: err.message });
            }

            pdf.create(html).toFile(pdfPath, (err) => {
                if (err) {
                    return res.status(500).json({ error: "Error creating PDF", details: err.message });
                }
                res.contentType("application/pdf");
                fs.createReadStream(pdfPath).pipe(res);
            });
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Récupérer toutes les factures
router.get("/getBills", auth.authenticateToken, async (req, res) => {
    try {
        const query = "SELECT * FROM bill ORDER BY id DESC";
        const results = await executeQuery(query);
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Supprimer une facture
router.delete("/delete/:id", auth.authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const query = "DELETE FROM bill WHERE id = ?";
        const results = await executeQuery(query, [id]);

        if (results.affectedRows === 0) {
            return res.status(404).json({ message: "Bill ID not found" });
        }

        res.status(200).json({ message: "Bill deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
