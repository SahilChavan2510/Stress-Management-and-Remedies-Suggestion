import React, { useState } from 'react';
import axios from 'axios';

const Remedies = ({ sensorData, userData }) => {
  const [remedies, setRemedies] = useState('');
  const [loading, setLoading] = useState(false);

  const generateRemedies = async () => {
    setLoading(true);
    try {
      const prompt = `Generate health remedies for a ${userData.gender} professional (${userData.profession}), 
      Weight: ${userData.weight}kg, Height: ${userData.height}cm, 
      Current vitals: HR ${sensorData.heartRate}bpm, SpO2 ${sensorData.spo2}%, 
      Temp ${sensorData.bodyTemp}°C, Stress Level: ${sensorData.stressLevel}. 
      Provide 3 practical suggestions.`;

      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.REACT_APP_GEMINI_API_KEY}`;

      const response = await axios.post(
        apiUrl,
        {
          contents: [{
            parts: [{
              text: prompt
            }]
          }]
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      const remedyText = response.data.candidates[0].content.parts[0].text;

      // Format the response into a clean, neat structure (assuming API returns plain text)
      const formattedRemedies = formatRemedies(remedyText);
      setRemedies(formattedRemedies);

    } catch (error) {
      console.error('API Error:', error);
      setRemedies('Error generating remedies. Please check your API key and network connection.');
    }
    setLoading(false);
  };

  // Function to format the generated remedies into a clean, pointwise format
  const formatRemedies = (text) => {
    // Example format: Split the response based on line breaks or bullet points (assuming it's in plain text)
    const lines = text.split('\n').map(line => line.trim()).filter(line => line.length > 0);

    return lines.map((line, index) => {
      if (line.includes('**')) { // This is for making it bold or styling important parts
        return (
          <div key={index} className="remedy-point">
            <strong>{line}</strong>
          </div>
        );
      } else {
        return (
          <div key={index} className="remedy-point">
            <p>{line}</p>
          </div>
        );
      }
    });
  };

  return (
    <div className="row mt-4">
      <div className="col-md-12 text-center">
        <button 
          className="btn btn-primary btn-lg"
          onClick={generateRemedies}
          disabled={loading}
        >
          {loading ? 'Generating...' : 'Generate Remedies'}
        </button>
        <div className="remedy-box mt-3">
          <h4>Health Remedies</h4>
          <div>
            {remedies.length > 0 ? remedies : 'Click the button to generate remedies.'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Remedies;
