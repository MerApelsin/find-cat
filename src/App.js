import React, { Component } from 'react';
import './App.css';
import throttle from 'lodash.throttle'
import RadioButtons from './components/radiobuttons';

class App extends Component {
  state = {
    isMobile: false,
    query: '',
    selectedOption: 0,
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

  onChange = (e) => { this.setState({[e.target.name]: e.target.value})}

  render() {
    return (
      <div className='app-container'>
        <div>
            <RadioButtons items={["Alla typer", "Endast Katthem", "Endast Kattpensionat"]} onSelect={(index) => { this.setState({selectedOption: index}); }}/>
            <div style={{"display": "flex", "flex-direction":"row","justify-content": "center"}}>
                <input type="text" id="query" name="query" onChange={this.onChange} value={this.state.title} /><button onClick={() => {console.log("hej")}}>sök</button>
            </div>
        </div>
      </div>
    );
  }
}

export default App;
