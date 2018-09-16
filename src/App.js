import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import ChatPage from './pages/ChatPage';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route path="/rooms" component={ChatPage} />
            <Route path="/users" />
          </Switch>

          {/* <ChatPage /> */}
        </div>
      </Router >
    );
  }
}

export default App;
