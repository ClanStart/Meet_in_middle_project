const { getAllLocations } = require('./locationController');

exports.suggestMidpoint = (req, res) => {
    const { meetingId } = req.params;

    const locations = req.app.locals.locations || {};  // shared from location controller
    const locs = locations[meetingId];

    if (!locs || locs.length === 0) {
        return res.status(404).json({ success: false, message: "No locations to suggest from." });
    }

    let totalLat = 0, totalLong = 0;

    locs.forEach(loc => {
        totalLat += loc.latitude;
        totalLong += loc.longitude;
    });

    const avgLat = totalLat / locs.length;
    const avgLong = totalLong / locs.length;

    // Mock nearby suggestions (normally you'd call Google Maps API here)
    const suggestions = [
        { name: "Central Cafe", lat: avgLat + 0.001, long: avgLong + 0.001 },
        { name: "MeetPark", lat: avgLat - 0.001, long: avgLong - 0.001 },
        { name: "ChatHub Restaurant", lat: avgLat, long: avgLong }
    ];

    res.json({
        success: true,
        midpoint: { latitude: avgLat, longitude: avgLong },
        suggestions
    });
};