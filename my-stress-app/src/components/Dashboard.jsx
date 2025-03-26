import React from 'react';

const Dashboard = ({ sensorData }) => {
  return (
    <div className="row">
      <div className="col-md-3">
        <div className="card bg-primary text-white">
          <h5>Heart Rate</h5>
          <div className="value">{sensorData.heartRate}</div>
          <small>BPM</small>
        </div>
      </div>
      <div className="col-md-3">
        <div className="card bg-success text-white">
          <h5>SpO2</h5>
          <div className="value">{sensorData.spo2}</div>
          <small>%</small>
        </div>
      </div>
      <div className="col-md-3">
        <div className="card bg-info text-white">
          <h5>Body Temp</h5>
          <div className="value">{sensorData.bodyTemp}</div>
          <small>°C</small>
        </div>
      </div>
      <div className="col-md-3">
        <div className="card bg-warning text-dark">
          <h5>Stress Level</h5>
          <div className={`stress-level ${sensorData.stressLevel.toLowerCase()}`}>
            {sensorData.stressLevel}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
