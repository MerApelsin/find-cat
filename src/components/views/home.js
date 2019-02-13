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
        mapSearch: true
    }

    onChange = (e) => { this.setState({[e.target.name]: e.target.value})}

    setMapSelection = (id) => {
        this.setState({mapSelection: id}, () => {this.getHomesByMap();});
    }

    toggleSearchType = () => {
        let current = this.state.mapSearch;
        current ? this.setState({mapSearch: false}) : this.setState({mapSearch: true});
    }

    changeLoading = () => {
        this.setState({loading: false});
    }

    getHomesByMap = async () => {
        this.setState({loading: true});
        const {mapSelection} = this.state;
        //await api.fetchDataMap(col, mapSelection)
        switch(this.state.selectedOption){
            case 0:
            //gör 2 gets, skicka till result
            let homes = await api.fetchDataMap('CatHomes', mapSelection);
            let vacs = await api.fetchDataMap('CatBoardingHomes',mapSelection);
            this.setState({responseHomes: homes, responseVacation: vacs});
            break;
            case 1:
            //katthem
            let homesOnly = await api.fetchDataMap('CatHomes',mapSelection);
            this.setState({responseHomes: homesOnly});
            break;
            case 2:
            //pensionat
            let vacsOnly = await api.fetchDataMap('CatBoardingHomes',mapSelection);
            this.setState({responseVacation: vacsOnly});
            break;
            default:
            break;
        }

    }
    getHomesByQuery = async () => {
        this.setState({loading: true});
        const {query} = this.state;
        //await api.fetchDataQuery(col, query)
        switch(this.state.selectedOption){
            case 0:
            //gör 2 gets, skicka till result
            let homes = await api.fetchDataQuery('CatHomes',query);
            let vacs = await api.fetchDataQuery('CatBoardingHomes',query);
            this.setState({responseHomes: homes, responseVacation: vacs});
            break;
            case 1:
            let homesOnly = await api.fetchDataQuery('CatHomes',query);
            this.setState({responseHomes: homesOnly});
            //katthem
            break;
            case 2:
            //pensionat
            let vacsOnly = await api.fetchDataQuery('CatBoardingHomes',query);
            this.setState({responseVacation: vacsOnly});
            break;
            default:
            break;
        }
    }

    render() {
        if(!this.props.isMobile) {
            return (
                <div>
                    <About/>
                    <button onClick={this.toggleSearchType}>{this.state.mapSearch ? 'Söka via text' : 'Sök via karta' }</button>
                    <RadioButtons items={["Alla typer", "Endast Katthem", "Endast Kattpensionat"]} onSelect={(index) => { this.setState({selectedOption: index}); }}/>
                    {!this.state.mapSearch && <div>
                        <div style={{"display": "flex", "flexDirection":"row","justifyContent": "center"}}>
                            <input type="text" id="query" name="query" onChange={this.onChange} value={this.state.title} /><button>sök</button>
                        </div>
                    </div>}
                    {this.state.mapSearch && <div>
                        <Map setSelection={this.setMapSelection}/>
                    </div>}
                    <div>
                        <h3>Resultat</h3>
                        {this.state.loading && <div>Loading gif thingy</div>}
                        {(this.state.responseHomes !== '' || this.state.responseVacation !== '' ) && <Results option={this.state.selectedOption} changeLoading={this.changeLoading} homes={this.state.responseHomes} vacation={this.state.responseVacation}/>}
                    </div>
                </div>);
        }
        else{
            return(
                <div>
                    <p>Mobile!</p>
                </div>
            );
        }
        
  }
}

export default HomeView;