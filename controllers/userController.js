let users = {}; // In-memory storage for users

// ✅ Register user
exports.registerUser = (req, res) => {
    const { phone, name } = req.body;

    if (!phone || !name) {
        return res.status(400).json({ success: false, message: "Phone and name are required" });
    }

    users[phone] = { name, phone };
    console.log("✅ Registered User:", users[phone]);

    res.json({ success: true, message: "User registered successfully", user: users[phone] });
};

// ✅ Login user
exports.loginUser = (req, res) => {
    const { phone } = req.body;

    if (users[phone]) {
        return res.json({ success: true, message: "Login successful", user: users[phone] });
    } else {
        return res.status(404).json({ success: false, message: "User not found" });
    }
};