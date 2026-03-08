const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// INSCRIPTION
exports.register = async (req, res) => {

  try {

    const { username, email, password } = req.body;

    // vérifier si email existe
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "Email déjà utilisé" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // créer utilisateur
    const user = new User({
      username,
      email,
      password: hashedPassword
    });

    await user.save();

    res.status(201).json({
      message: "Utilisateur créé"
    });

  } catch (error) {
    res.status(500).json(error);
  }

};
// CONNEXION
exports.login = async (req, res) => {

  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Utilisateur non trouvé" });
    }

    // vérifier password
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(400).json({ message: "Mot de passe incorrect" });
    }

    // créer token
    const token = jwt.sign(
      { id: user._id },
      "SECRET_KEY",
      { expiresIn: "1d" }
    );

    res.json({
      token,
      user
    });

  } catch (error) {
    res.status(500).json(error);
  }

};