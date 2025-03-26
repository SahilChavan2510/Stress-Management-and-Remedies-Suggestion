import React from 'react';

const UserInput = ({ userData, setUserData }) => {
  const handleChange = (e) => {
    setUserData(prev => ({
      ...prev,
      [e.target.id]: e.target.value
    }));
  };

  return (
    <div className="row mt-4">
      <div className="col-md-3">
        <input
          type="text"
          className="form-control"
          id="gender"
          placeholder="Gender"
          value={userData.gender}
          onChange={handleChange}
        />
      </div>
      <div className="col-md-3">
        <input
          type="number"
          className="form-control"
          id="weight"
          placeholder="Weight (kg)"
          value={userData.weight}
          onChange={handleChange}
        />
      </div>
      <div className="col-md-3">
        <input
          type="number"
          className="form-control"
          id="height"
          placeholder="Height (cm)"
          value={userData.height}
          onChange={handleChange}
        />
      </div>
      <div className="col-md-3">
        <input
          type="text"
          className="form-control"
          id="profession"
          placeholder="Profession"
          value={userData.profession}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default UserInput;
