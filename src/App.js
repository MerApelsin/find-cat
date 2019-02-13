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
    if(window.innerWidth < 550){
      this.setState({isMobile: true});
    }
    window.addEventListener('resize', this.throttledHandleWindowResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.throttledHandleWindowResize);
  }

  throttledHandleWindowResize = () => { 
    setTimeout(()=>{ this.setState({isMobile:  window.innerWidth < 550})}, 500);
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
                <HomeView isMobile={this.state.isMobile}/>
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