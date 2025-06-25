require('dotenv').config();

let otpStore = {}

// ✅ Send OTP (Mocked)
exports.sendOTP = async (req, res) => {
    const { phone } = req.body;

    if (!phone || phone.length !== 10) {
        return res.status(400).json({ success: false, message: "Invalid phone number" });
    }

    const otp = Math.floor(1000 + Math.random() * 9000); // 4-digit OTP
    otpStore[phone] = otp; // Save OTP

    try {
        console.log(`📱 MOCK OTP for ${phone}: ${otp}`);
        res.json({ success: true, message: "OTP (mocked) sent successfully", otp: otp });
    } catch (error) {
        console.error("Error sending OTP:", error);
        res.status(500).json({ success: false, message: "Failed to send OTP" });
    }
};

// ✅ Verify OTP
exports.verifyOTP = (req, res) => {
    const { phone, otp } = req.body;

    if (!phone || !otp) {
        return res.status(400).json({ success: false, message: "Phone and OTP required" });
    }

    if (otpStore[phone] && otpStore[phone] == otp) {
        delete otpStore[phone]; // Optional: remove OTP after verification
        return res.json({ success: true, message: "OTP verified successfully" });
    } else {
        return res.status(400).json({ success: false, message: "Invalid or expired OTP" });
    }
};