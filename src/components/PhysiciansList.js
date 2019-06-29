import React from 'react';

const PhysiciansList = ({ physicians, onSelect, selectedPhysician }) => {
  return (
    <div className="col-sm-3">
      <div className="row">
        <h1 className="company">notable</h1>
      </div>
      <div className="row">
        <h5>PHYSICIANS</h5>
      </div>
      <div className="row">
        <ul className="list-group">
          {physicians.map(physician => (
            <li
              onClick={() => onSelect(physician)}
              key={physician.id}
              className={
                physician.id === selectedPhysician.id
                  ? 'list-group-item clickable active'
                  : 'list-group-item clickable'
              }
            >
              {physician.last_name}, {physician.first_name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PhysiciansList;
