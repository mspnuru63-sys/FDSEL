const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware pour permettre à Express de lire le format JSON envoyé par le client
app.use(express.json());

// 1. Chaîne de connexion à MongoDB Atlas
const MONGO_URI = "mongodb+srv://nuru:xWzoXo7BLV1rT1QG@cluster0.qzchynv.mongodb.net/?appName=Cluster0";

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log("✅ Connexion réussie à MongoDB Atlas !");
  })
  .catch((error) => {
    console.error("❌ Erreur de connexion à MongoDB :", error);
  });

// 2. Définition du Modèle de données (Le Schéma)
const UserSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: Number,
  dateCreation: { type: Date, default: Date.now }
});

const User = mongoose.model('User', UserSchema);

// 3. Vos Routes API

// Route de base (Test de bon fonctionnement du serveur)
app.get('/', (req, res) => {
  res.send("Le serveur fonctionne et est connecté à MongoDB !");
});

// ➡️ ROUTE POST : Ajouter un nouvel utilisateur dans la base de données
app.post('/api/users', async (req, res) => {
  try {
    const nouvelUtilisateur = new User({
      nom: req.body.nom,
      email: req.body.email,
      age: req.body.age
    });

    // Sauvegarde l'utilisateur dans le cloud MongoDB
    const utilisateurEnregistre = await nouvelUtilisateur.save();
    res.status(201).json(utilisateurEnregistre);
  } catch (error) {
    res.status(400).json({ message: "Erreur lors de l'enregistrement", error: error.message });
  }
});

// ➡️ ROUTE GET : Récupérer la liste de tous les utilisateurs
app.get('/api/users', async (req, res) => {
  try {
    const utilisateurs = await User.find();
    res.status(200).json(utilisateurs);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération", error: error.message });
  }
});

// 4. Démarrage du serveur
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur le port ${PORT}`);
});