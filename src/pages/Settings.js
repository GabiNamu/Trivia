import React from 'react';
import { connect } from 'react-redux';
import '../styles/Settings.css';

class Settings extends React.Component {
  render() {
    return (
      <div className="settigs-container">
        <h1 data-testid="settings-title">Settings</h1>
      </div>
    );
  }
}

export default connect()(Settings);
