import React, { Component } from 'react';
import './App.css';
import throttle from 'lodash.throttle'

import AdminView from './components/views/admin.js';
import HomeView from './components/views/home.js';

class App extends Component {
  state = {
    isMobile: false,
    adminPage: false,
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

  toggleView = () => {
    let current = this.state.adminPage;
    current ? this.setState({adminPage: false}) : this.setState({adminPage: true});
  }

  renderButton = (value) => {
     return (<button onClick={this.toggleView}>{value}</button>);
  }

  render() {
      const {adminPage} = this.state;
      if(!adminPage){
        return (
            <div className='app-container'>
                {this.renderButton('Logga in')}
                <HomeView/>
            </div>
        );
      }
      else{
        return (
            <div className='app-container'>
                {this.renderButton('Tillbaka')}
                <AdminView/>
            </div>
        );
      }
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