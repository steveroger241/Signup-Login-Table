const bcrypt = require('bcrypt');

async function hashPassword(password) {
    try {
        const hashed = await bcrypt.hash(password, 10);
        return hashed;
    }
    catch (err) {
        console.log("PAsword hash error", err);
    }
}

async function comparePassword(given, original) {
    try {
        const match = await bcrypt.compare(given, original);
        return match;
    }
    catch (err) {
        console.log("PAsword hash error", err);
    }
}

module.exports = { hashPassword, comparePassword }