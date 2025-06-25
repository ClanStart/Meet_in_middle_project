let meetings = [];
let invitedUsers = {};

exports.createMeeting = (req, res) => {
    const { title, description, date, time, createdBy, invitees } = req.body;

    if (!title || !date || !time || !createdBy) {
        return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const newMeeting = {
        id: meetings.length + 1,
        title,
        description,
        date,
        time,
        createdBy,
        invitees: invitees || []
    };

    meetings.push(newMeeting);

    // Save invitees
    newMeeting.invitees.forEach(phone => {
        if (!invitedUsers[phone]) invitedUsers[phone] = [];
        invitedUsers[phone].push(newMeeting);
    });

    res.json({ success: true, message: "Meeting created", meeting: newMeeting });
};

exports.getCreatedMeetings = (req, res) => {
    const { phone } = req.params;

    const userMeetings = meetings.filter(m => m.createdBy === phone);
    res.json({ success: true, meetings: userMeetings });
};

exports.getInvitedMeetings = (req, res) => {
    const { phone } = req.params;

    const invites = invitedUsers[phone] || [];
    res.json({ success: true, meetings: invites });
};

// ✅ NEW: Get all meetings
exports.getAllMeetings = (req, res) => {
    res.json({ success: true, meetings });
};