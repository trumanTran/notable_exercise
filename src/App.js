import React from 'react';
import PhysiciansList from './components/PhysiciansList';
import Appointments from './components/Appointments';

import Firebase from 'firebase';
import config from './utils/config';

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    Firebase.initializeApp(config);

    this.state = {
      physicians: [],
      selectedPhysician: '',
      appointments: []
    };
  }

  componentDidMount() {
    this.getPhysicians();
  }

  // GET request to retrive all physicians
  getPhysicians = () => {
    let ref = Firebase.database().ref('/Physicians');
    ref.on('value', snapshot => {
      const physicians = snapshot.val();
      this.setState({ physicians: physicians });
    });
  };

  // GET request to retrieve appointments belonging to selected physician
  getAppointments = physicanId => {
    let ref = Firebase.database().ref('/Appointments');
    let appointmentArr = [];
    ref
      .orderByChild('dr_id')
      .equalTo(physicanId)
      .on('child_added', snapshot => {
        const appointment = snapshot.val();
        appointmentArr.push(appointment);
      });
    this.setState({ appointments: appointmentArr });
  };

  // Select Physician
  selectPhysician = physican => {
    this.getAppointments(physican.id);
    this.setState({
      selectedPhysician: physican
    });
  };

  render() {
    const { physicians, selectedPhysician, appointments } = this.state;
    return (
      <div className="container">
        <div className="row">
          <PhysiciansList
            physicians={physicians}
            selectedPhysician={selectedPhysician}
            onSelect={this.selectPhysician}
          />
          <Appointments
            selectedPhysician={selectedPhysician}
            appointments={appointments}
          />
        </div>
      </div>
    );
  }
}

export default App;
