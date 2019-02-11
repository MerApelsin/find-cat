import React, { Component } from 'react';

import RadioButtons from '../radiobuttons.js'
import About from '../about.js';
import api from '../../firebase.js'
import Map from '../map.js';
import Results from '../results.js'

class HomeView extends Component {

    state = {
        query: '',
        selectedOption: 0,
        mapSelection: '',
        responseHomes: '',
        responseVacation: '',
    }

    onChange = (e) => { this.setState({[e.target.name]: e.target.value})}

    setMapSelection = (id) => {
        this.setState({mapSelection: id}, () => {this.getHomes();});
    }

    getHomes = () => {
        const {mapSelection,  query} = this.state;
        switch(this.state.selectedOption){
            case 0:
            //gör 2 gets, skicka till result
            break;
            case 1:
            //katthem
            //gör 1 get, skicka till result
            break;
            case 2:
            //pensionat
            //---||---
            break;
            default:
            break;
        }
    }

    render() {
        return (
        <div>
            <About/>
            <div>
                <RadioButtons items={["Alla typer", "Endast Katthem", "Endast Kattpensionat"]} onSelect={(index) => { this.setState({selectedOption: index}); }}/>
                <div style={{"display": "flex", "flexDirection":"row","justifyContent": "center"}}>
                    <input type="text" id="query" name="query" onChange={this.onChange} value={this.state.title} /><button>sök</button>
                </div>
            </div>
            <div>
                <Map setSelection={this.setMapSelection}/>
            </div>
            <div>
                {this.state.response !== '' && <Results homes={this.state.responseHomes} vacation={this.state.responseVacation} admin={false}/>}
            </div>
        </div>
    );
  }
}

export default HomeView;