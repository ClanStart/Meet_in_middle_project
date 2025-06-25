import React, { useState } from 'react';

const CreateMeeting = () => {
  const [meetingId, setMeetingId] = useState('');
  const [status, setStatus] = useState('');
  const user = JSON.parse(localStorage.getItem('user'));

  const generateMeetingId = () => {
    // This creates a unique ID like "meet-172193831"
    return `meet-${Date.now()}`;
  };

  const handleCreate = async () => {
    const newMeetingId = generateMeetingId();

    try {
      const res = await fetch('http://localhost:5000/api/meeting/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          meetingId: newMeetingId,
          host: user.phone
        })
      });

      const data = await res.json();

      if (data.success) {
        setMeetingId(newMeetingId);
        setStatus('🎉 Meeting created successfully!');
      } else {
        setStatus('❌ Failed to create meeting.');
      }
    } catch (error) {
      console.error(error);
      setStatus('💥 Server error!');
    }
  };

  return (
    <div className="container">
      <h2>📍 Create Meeting</h2>
      <button onClick={handleCreate}>Generate Meeting</button>
      {status && <p>{status}</p>}
      {meetingId && (
        <>
          <p><strong>Meeting ID:</strong> {meetingId}</p>
          <p>📤 Share this ID with others to share their location</p>
        </>
      )}
    </div>
  );
};

export default CreateMeeting;