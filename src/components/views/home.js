import React, { Component } from 'react';

import RadioButtons from '../radiobuttons.js'
import About from '../about.js';
import api from '../../firebase.js'
import Map from '../map.js';
import Results from '../results.js'
import loadingsvg from '../assets/loading.svg';

class HomeView extends Component {

    state = {
        query: '',
        selectedOption: 0,
        mapSelection: '',
        response: '',
        type: '',
        errormsg: '',
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
        
        switch(this.state.selectedOption){
            case 0:
            //katthem
            let homesOnly = await this.createDataArray('map','CatHomes',mapSelection)
            this.setState({response: homesOnly, type:'Katthem'});
            break;
            case 1:
            //pensionat
            let vacsOnly = await this.createDataArray('map','CatBoardingHomes',mapSelection);
            this.setState({response: vacsOnly,type:'Kattpensionat'});
            break;
            default:
            break;
        }

    }
    getHomesByQuery = async () => {
        const {query} = this.state;
        
        if(query.length > 0) {
            this.setState({loading: true, errormsg: ''});
            const searchTerm = query.charAt(0).toUpperCase() + query.toLowerCase().slice(1);
            switch(this.state.selectedOption){
                case 0:
                let homesOnly = await this.createDataArray('string','CatHomes',searchTerm);
                this.setState({response: homesOnly,type:'Katthem'});
                //katthem
                break;
                case 1:
                //pensionat
                let vacsOnly = await this.createDataArray('string','CatBoardingHomes',searchTerm);
                this.setState({response: vacsOnly,type: 'Kattpensionat'});
                break;
                default:
                break;
            }
        }
        else {
            this.setState({errormsg: 'Tomt fält!'});
        }
    }

    createDataArray = async (type,path,query) => {  
        let tempArr = [];
        let response = '';
        
        if(type === 'map'){
            response = await api.fetchDataMap(path,query);
        }
        else {
            response = await api.fetchDataQuery(path,query);
        }
        
        response.forEach((doc) => {
            let data = doc.data();

            let currentHome = {id: doc.id ,name:data.name, link:data.link, district:data.district,
                munici:data.municipality ,region:data.region, time:data.uploaded};
            tempArr.push(currentHome);
        });
        return tempArr;
    }

    render() {
        let mapStyle = '';
        let resultStyle = '';
        if(this.state.mapSearch){
            mapStyle = 'next-to-map';
            resultStyle = 'home-result-map'
        }
        else {
            mapStyle = '';
            resultStyle = 'home-result';
        }

        if(!this.props.isMobile) {
            return (
                <div className='home-container'>
                    <About/>
                    <button className='normal-btn' onClick={this.toggleSearchType}>{this.state.mapSearch ? 'Söka via text' : 'Sök via karta' }</button>
                    <RadioButtons items={["Katthem", "Kattpensionat"]} onSelect={(index) => { this.setState({selectedOption: index}); }}/>
                    {!this.state.mapSearch && <div>
                        <p>{this.state.errormsg}</p>
                        <div style={{"display": "flex", "flexDirection":"row","justifyContent": "center"}}>
                            
                            <input className='text-input' type="text" id="query" name="query" onChange={this.onChange} value={this.state.query} /><button className='query-btn' onClick={this.getHomesByQuery}>Sök</button><br/>
                        </div>
                    </div>}
                    <div className={mapStyle}>
                        {this.state.mapSearch && 
                            <Map selected={this.state.selectedOption} setSelection={this.setMapSelection}/>
                        }
                        <div className={resultStyle}>
                            <h1 className='title-font'>Resultat</h1>
                            {this.state.loading && <img className='loading-img' alt='loading' src={loadingsvg}/>}
                            {(this.state.responseHomes !== '' || this.state.responseVacation !== '' ) && <Results type={this.state.type} selected={this.state.selectedOption} changeLoading={this.changeLoading} homes={this.state.response}/>}
                        </div>
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