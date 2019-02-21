import React, { Component } from 'react';
import './App.css';

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
    setTimeout(()=>{ this.setState({isMobile:  window.innerWidth < 700})}, 500);
  }

  toggleView = () => {
    let current = this.state.adminPage;
    current ? this.setState({adminPage: false}) : this.setState({adminPage: true});
  }

  renderButton = (value) => {
     return (<button onClick={this.toggleView} className='admin-btn admin-btn-colors'>{value}</button>);
  }

  render() {
      const {adminPage} = this.state;
      let headerclass = '';
      this.state.isMobile ? headerclass = 'app-block-mobile' : headerclass = 'app-block';

      
      if(!adminPage){
        return (
            <div>
                <div className='app-header'>
                        
                        <div className={headerclass}>
                        {this.renderButton('Logga in')}
                        </div>
                </div> 
                <div className='app-container'> 
                    <HomeView isMobile={this.state.isMobile}/>
                </div>
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