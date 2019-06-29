import React from 'react';

import Firebase from 'firebase';
import config from './utils/config';

class App extends React.Component {
  constructor(props) {
    super(props);
    Firebase.initializeApp(config);

    this.state = {
      developers: []
    };
  }

  render() {
    return <div>Hello World</div>;
  }
}

export default App;
