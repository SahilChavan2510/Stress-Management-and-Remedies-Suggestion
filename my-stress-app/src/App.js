import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import UserInput from './components/UserInput';
import Remedies from './components/Remedies';
import './App.css';

function App() {
  const [sensorData, setSensorData] = useState({
    heartRate: '--',
    spo2: '--',
    bodyTemp: '--',
    stressLevel: '--'
  });

  const [userData, setUserData] = useState({
    gender: '',
    weight: '',
    height: '',
    profession: ''
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const newData = {
        heartRate: Math.floor(Math.random() * (140 - 60 + 1)) + 60,
        spo2: Math.floor(Math.random() * (100 - 85 + 1)) + 85,
        bodyTemp: (Math.random() * (38.5 - 36.0) + 36.0).toFixed(1)
      };
      
      setSensorData(prev => ({
        ...prev,
        ...newData,
        stressLevel: calculateStressLevel(newData)
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const calculateStressLevel = ({ heartRate, spo2, bodyTemp }) => {
    let stressScore = 0;
    if (heartRate >= 100 && heartRate <= 120) stressScore += 1;
    else if (heartRate > 120) stressScore += 2;
    if (spo2 >= 90 && spo2 <= 94) stressScore += 1;
    else if (spo2 < 90) stressScore += 2;
    if (bodyTemp >= 37.3 && bodyTemp <= 38.0) stressScore += 1;
    else if (bodyTemp > 38.0) stressScore += 2;
    return stressScore === 0 ? "Low" : stressScore <= 2 ? "Medium" : "High";
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Stress Monitoring and Remedies Suggestion System</h1>
      <Dashboard sensorData={sensorData} />
      <UserInput userData={userData} setUserData={setUserData} />
      <Remedies sensorData={sensorData} userData={userData} />
    </div>
  );
}

export default App;
