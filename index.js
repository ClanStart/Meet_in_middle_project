const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;

app.use(cors());
app.options('*',cors());
app.use(bodyParser.json());

// 🔐 Load/Store users from JSON file
const usersFile = path.join(__dirname, 'users.json');

// ✅ Register Route
app.post('/api/auth/register', (req, res) => {
  const { name, phone } = req.body;
  if (!name || !phone) {
    return res.json({ success: false, message: 'Missing name or phone' });
  }

  let users = [];
  try {
    users = JSON.parse(fs.readFileSync(usersFile, 'utf8'));
  } catch (err) {
    users = [];
  }

  const exists = users.find(u => u.phone === phone);
  if (exists) {
    return res.json({ success: false, message: 'User already exists' });
  }

  users.push({ name, phone });
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
  res.json({ success: true, message: 'Registered successfully' });
});

// ✅ Login Route
app.post('/api/auth/login', (req, res) => {
  const { phone } = req.body;

  let users = [];
  try {
    users = JSON.parse(fs.readFileSync(usersFile, 'utf8'));
  } catch (err) {
    users = [];
  }

  const user = users.find(u => u.phone === phone);
  if (!user) {
    return res.json({ success: false, message: 'User not found' });
  }

  res.json({ success: true, message: 'Login successful' });
});

// ✅ Meeting creation
const meetings = [];
app.post('/api/meeting/create', (req, res) => {
  const meetingId = Math.random().toString(36).substr(2, 6);
  meetings.push(meetingId);
  res.json({ success: true, meetingId });
});

// ✅ Share location
const locations = [];
app.post('/api/location/share', (req, res) => {
  const { phone, meetingId, latitude, longitude } = req.body;
  if (!phone || !meetingId || !latitude || !longitude) {
    return res.json({ success: false, message: 'Missing fields' });
  }

  locations.push({ phone, meetingId, latitude, longitude });
  res.json({ success: true, message: 'Location shared!' });
});

// ✅ Midpoint Suggestions
app.get('/api/suggestions/:meetingId', (req, res) => {
  const { meetingId } = req.params;
  const points = locations.filter(loc => loc.meetingId === meetingId);

  if (points.length === 0) {
    return res.json({ success: false, message: 'No locations shared yet' });
  }

  const avgLat = points.reduce((sum, p) => sum + parseFloat(p.latitude), 0) / points.length;
  const avgLng = points.reduce((sum, p) => sum + parseFloat(p.longitude), 0) / points.length;

  res.json({
    success: true,
    midpoint: {
      latitude: avgLat.toFixed(6),
      longitude: avgLng.toFixed(6),
    }
  });
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});