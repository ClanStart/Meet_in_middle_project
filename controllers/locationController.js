// ✅ Don't use a separate 'let locations = {}'

exports.shareLocation = (req, res) => {
    const phone = req.body.phone || req.body.user;
    const { meetingId, latitude, longitude } = req.body;

    if (!phone || !meetingId || !latitude || !longitude) {
        return res.status(400).json({ success: false, message: "All fields required" });
    }

    // ✅ Store in app.locals so it's globally accessible
    const locations = req.app.locals.locations = req.app.locals.locations || {};

    if (!locations[meetingId]) {
        locations[meetingId] = [];
    }

    // Check if user already shared location
    const existing = locations[meetingId].find(loc => loc.phone === phone);
    if (existing) {
        existing.latitude = latitude;
        existing.longitude = longitude;
    } else {
        locations[meetingId].push({ phone, latitude, longitude });
    }

    console.log(`📍 Location received from ${phone} in meeting ${meetingId}`);

    res.json({ success: true, message: "Location shared successfully" });
};

exports.getAllLocations = (req, res) => {
    const { meetingId } = req.params;
    const locations = req.app.locals.locations || {};

    if (!locations[meetingId] || locations[meetingId].length === 0) {
        return res.status(404).json({ success: false, message: "No locations found for this meeting" });
    }

    res.json({ success: true, locations: locations[meetingId] });
};