import React, { Component } from 'react';
import './App.css';
import throttle from 'lodash.throttle'
import { BrowserRouter as Router, Route,Link } from 'react-router-dom'

import AdminView from './components/views/admin.js';
import HomeView from './components/views/home.js';

class App extends Component {
  state = {
    isMobile: false,
  }
  
  componentDidMount() {
    window.addEventListener('resize', this.throttledHandleWindowResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.throttledHandleWindowResize);
  }

  throttledHandleWindowResize = () => {
    return throttle(() => {
      this.setState({ isMobile: window.innerWidth < 550 })
    }, 200);
  }

  render() {
    return (
    <Router>
      <div className='app-container'>
        <ul>
            <li><Link to="/Admin">Admin</Link></li>
            <li><Link to="/">Karta</Link></li>
        </ul>
        <Route exact path="/Admin" render={(props) => <AdminView/>}/>
        <Route exact path="/" render={(props) => <HomeView/>}/>
      </div>
    </Router>
    );
  }
}

export default App;

/*  <Router>
          <div className='mainContainer'>
            <div className='mainMenu'>
              <nav>
                <ul>
                  <li><Link to="/">Feed</Link></li>
                  <li><Link to="/calendar">Kalender</Link></li>
                  <li><Link to="/rules">Regler</Link></li>
                  <li>TBA ramverk</li>
                </ul>
              </nav>
              <Button onClick={this.logout}>logga ut</Button>
            </div>
            
            <Route exact path="/" render={(props) => <DashboardRedirect {...props} associationData={this.state.associationData} userType={this.state.userType} assocID={this.state.assocID}/>}/>
            <Route exact path="/calendar" render={(props) => <Calendar {...props} assocID={this.state.assocID}/>}/>
            <Route exact path="/rules" render={(props) => <Rules {...props} associationData={this.state.associationData} userType={this.state.userType} assocID={this.state.assocID}/>}/>
          </div>
        </Router> */