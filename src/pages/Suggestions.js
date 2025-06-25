import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Suggestions = () => {
  const { meetingId } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchMidpoint = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/suggestions/midpoint/${meetingId}`);
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMidpoint();
  }, [meetingId]);

  return (
    <div className="container">
      <h2>🗺 Suggested Meeting Spot</h2>

      {!data ? (
        <p>Loading suggestions...</p>
      ) : (
        <div>
          <p><strong>Midpoint Latitude:</strong> {data.midpoint?.latitude}</p>
          <p><strong>Midpoint Longitude:</strong> {data.midpoint?.longitude}</p>
          {data.places?.length > 0 && (
            <>
              <h3>Nearby Places:</h3>
              <ul style={{ paddingLeft: '1rem' }}>
                {data.places.map((place, i) => (
                  <li key={i}>{place}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Suggestions;