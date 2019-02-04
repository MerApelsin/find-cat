import React, { Component } from 'react';

import RadioButtons from '../radiobuttons.js'
import About from '../about.js';

class HomeView extends Component {

    state = {
        query: '',
        selectedOption: 0,
    }

    onChange = (e) => { this.setState({[e.target.name]: e.target.value})}

    render() {
        return (
        <div>
            <About/>
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

export default HomeView;