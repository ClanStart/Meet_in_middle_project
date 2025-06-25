import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MeetingDetails = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const [meetingId, setMeetingId] = useState('');
  const [status, setStatus] = useState('');

  const handleLocationShare = () => {
    if (!meetingId) return alert("Please enter Meeting ID first");

    if (!navigator.geolocation) {
      return alert("Geolocation not supported by your browser");
    }

    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;

      try {
        const res = await fetch("http://localhost:5000/api/location/share", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            phone: user.phone,
            meetingId,
            latitude,
            longitude,
          }),
        });

        const data = await res.json();

        if (data.success) {
          setStatus("📍 Location shared!");
        } else {
          setStatus("❌ Failed: " + data.message);
        }
      } catch (err) {
        console.error(err);
        setStatus("💥 Server error!");
      }
    });
  };

  return (
    <div className="container">
      <h2>📡 Share Your Location</h2>

      <input
        type="text"
        placeholder="Enter Meeting ID"
        value={meetingId}
        onChange={(e) => setMeetingId(e.target.value)}
      />

      <button onClick={handleLocationShare}>Share Location</button>

      {status && <p>{status}</p>}

      <button
        onClick={() => navigate(`/suggestions/${meetingId}`)}
        disabled={!meetingId}
        style={{ marginTop: '1rem' }}
      >
        View Meeting Suggestions
      </button>
    </div>
  );
};

export default MeetingDetails;