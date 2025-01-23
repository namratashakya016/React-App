const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Register User
exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Create a new user
        const user = new User({ name, email, password });
        await user.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        if (error.name === 'ValidationError') {
            const errors = Object.keys(error.errors).map(
                (key) => error.errors[key].message
            );
            return res.status(400).json({ errors }); // Send all validation errors
        }
        res.status(500).json({ message: 'Server error' });
    }
};


// Login User
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email) throw new Error('Email is required');
        if (!password) throw new Error('Password is required');

        const user = await User.findOne({ email });
        if (!user) throw new Error('User not found');

        const isMatch = await user.comparePassword(password);
        if (!isMatch) throw new Error('Invalid credentials');
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: 'Login successful', token });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
