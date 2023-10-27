const express = require("express");
const connection = require("../connection");
const router = express.Router();
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
require("dotenv").config();
let auth = require("../services/Authentication");
let checkRole = require("../services/checkRole");

const saltRounds = 10; // Le nombre de "sauts" (rounds) pour le hachage

router.post("/signup", (req, res) => {
  let user = req.body;
  // Générer un hachage pour le mot de passe
  bcrypt.hash(user.password, saltRounds, (err, hash) => {
    if (err) {
      return res.status(500).json(err);
    }
    // Mettre à jour le mot de passe de l'utilisateur avec le hachage
    user.password = hash;
    // Continuer avec le reste du code pour l'insertion dans la base de données
    let query = "select email,password,role,status from user where email = ?";
    connection.query(query, [user.email], (err, results) => {
      if (!err) {
        if (results.length <= 0) {
          query =
            "insert into user (name, contactNumber, email, password, status, role) values(?, ?, ?, ?, 'false', 'user');";
          connection.query(
            query,
            [user.name, user.contactNumber, user.email, user.password],
            (err, results) => {
              if (!err) {
                return res
                  .status(200)
                  .json({ message: "Inscription réussie." });
              } else {
                return res.status(500).json(err);
              }
            }
          );
        } else {
          return res.status(400).json({ message: "L'email existe déjà." });
        }
      } else {
        return res.status(500).json(err);
      }
    });
  });
});
router.post("/login", (req, res) => {
  const user = req.body;
  // console.log(user);
  query = "select email,password,role,status from user where email = ?";
  connection.query(query, [user.email], (err, results) => {
    if (!err) {
      if (results.length <= 0 || results[0].password != user.password) {
        return res
          .status(401)
          .json({ message: "username ou mo de pass incorrect." });
      } else if (results[0].status === "false") {
        return res.status(401).json({ message: "Wait for admin approval." });
      } else if (results[0].password == user.password) {
        const response = { email: results[0].email, role: results[0].role };
        const accessToken = jwt.sign(response, process.env.ACCESS_TOKEN, {
          expiresIn: "8h",
        });
        res.status(200).json({ token: accessToken });
      } else {
        return res
          .status(400)
          .json({ message: "something went wrong, please try again." });
      }
    } else {
      return res.status(500).json(err);
    }
  });
});

// router.get("/getCurrentUser", auth.authenticateToken, (req, res) => {
//   // Les informations de l'utilisateur sont disponibles dans req.user
//   const user = req.user;
//   res.status(200).json(user);
// });
router.get("/getCurrentUser", auth.authenticateToken, (req, res) => {
  // Les informations de l'utilisateur sont maintenant disponibles dans req.user
  const user = req.user;
  res.status(200).json({ user });
});


// Ajoutez une nouvelle route pour récupérer tous les utilisateurs
router.get("/getUsers", (req, res) => {
  let query = "SELECT * FROM user";
  connection.query(query, (err, results) => {
    if (!err) {
      return res.status(200).json(results);
    } else {
      return res.status(500).json(err);
    }
  });
});

router.post("/forgotPassword", (req, res) => {
  let user = req.body;
  query = "select email,password from user where email = ?";
  connection.query(query, [user.email], (err, results) => {
    if (!err) {
      if (results.length <= 0) {
        let transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD,
          },
        });
        let mailOptions = {
          from: process.env.EMAIL,
          to: user.email,
          subject: "Password by lambo",
          html:
            "<p><b>My login detail by me lambo</b><br><b>Email:</b>" +
            results[0].email +
            "<br><b>Password:</b>" +
            results[0].password +
            '<br><a href="http://localhost:4200">Click here to login</a></p>',
        };
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log("Email sent:" + info.response);
          }
        });
        return res
          .status(200)
          .json({ message: "Password sent successfully in your emails." });
      } else {
        let transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD,
          },
        });
        let mailOptions = {
          from: process.env.EMAIL,
          to: user.email,
          subject: "Password by lambo",
          html:
            "<p><b>My login detail by me lambo</b><br><b>Email:</b>" +
            results[0].email +
            "<br><b>Password:</b>" +
            results[0].password +
            '<br><a href="http://localhost:4200">Click here to login</a></p>',
        };
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log("Email sent:" + info.response);
          }
        });

        return res
          .status(200)
          .json({ message: "Password sent successfully in your email." });
      }
    } else {
      return res.status(500).json(err);
    }
  });
});

router.get("/get", auth.authenticateToken, checkRole.checkRole, (req, res) => {
  const query =
    "select id,name,email,contactNumber,status from user where role='user'";
  connection.query(query, (err, results) => {
    if (!err) {
      return res.status(200).json(results);
    } else {
      return res.status(500).json(err);
    }
  });
});
router.patch(
  "/update",
  auth.authenticateToken,
  checkRole.checkRole,
  (req, res) => {
    let user = req.body;
    const query = "update user set status=? where id=?";
    connection.query(query, [user.status, user.id], (err, results) => {
      if (!err) {
        if (results.affectedRows == 0) {
          return res.status(404).json({ message: "User id does not exists" });
        }
        return res.status(200).json({ message: "User updated successfully" });
      } else {
        return res.status(500).json(err);
      }
    });
  }
);
router.get("/checkToken", auth.authenticateToken, (req, res) => {
  return res.status(200).json({ message: "true" });
});
router.post("/changePassword", auth.authenticateToken, (req, res) => {
  const user = req.body;
  const email = res.locals.email;
  // console.log(email);
  let query = "select * from user where email=? and password=?";
  // console.log(email,user)
  connection.query(query, [email, user.oldPassword], (err, results) => {
    if (!err) {
      if (results.length <= 0) {
        return res.status(400).json({ message: "Incorrect old password" });
      } else if (results[0].password == user.oldPassword) {
        query = "update user set password=? where email=?";
        connection.query(query, [user.newPassowprd, email], (err, results) => {
          if (!err) {
            return res
              .status(200)
              .json({ message: "Password updated successfully" });
          } else {
            return res.status(500).json(err);
          }
        });
      } else {
        return res
          .status(400)
          .json({ message: "Something went wrong. Please try again later" });
      }
    } else {
      return res.status(500).json(err);
    }
  });
});
module.exports = router;
