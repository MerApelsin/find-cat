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
        loading: false,
    }

    onChange = (e) => { this.setState({[e.target.name]: e.target.value})}

    setMapSelection = (id) => {
        this.setState({mapSelection: id}, () => {this.getHomesByMap();});
    }

    getHomesByMap = async () => {
        const {mapSelection} = this.state;
        //await api.fetchDataMap(col, mapSelection)
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

    getHomesByQuery = async () => {
        const {query} = this.state;
        //await api.fetchDataQuery(col, query)
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
                {this.state.loading && <div>Loading gif thingy</div>}
                {(this.state.response !== '' && !this.state.loading) && <Results option={this.state.selectedOption} homes={this.state.responseHomes} vacation={this.state.responseVacation}/>}
            </div>
        </div>
    );
  }
}

export default HomeView;