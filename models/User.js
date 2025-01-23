const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required. Please enter your name.'],
    },
    email: {
        type: String,
        required: [true, 'Email is required. Please enter a valid email address.'],
        unique: true,
        validate: (value) => validator.isEmail(value),
    },
    password: { 
        type: String, 
        required: [true, 'Password is required. Please enter a strong password.'],
        minlength: [6, 'Password must be at least 6 characters long.'],
     },
});

// Hash the password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Add a method to compare passwords
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
