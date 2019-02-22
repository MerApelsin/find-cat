import React, { Component } from 'react';
import RadioButtons from '../radiobuttons.js';
import api from '../../firebase.js';
import AdminResults from './adminResults.js';
import loadingsvg from '../assets/loading.svg'


class HomeManager extends Component {
    state = {
        name: '',
        link: '',
        district: '',
        munici: '',
        region: '',
        query: '',
        selectedOption: 0,
        msg: '',
        responseHomes: '',
        responseVacation: '',
        loading: false,
        regionCodes: {SE_BD: 'norrbotten',
            SE_AC: 'västerbotten',
            SE_Z: 'jämtland',
            SE_U: 'västmanland',
            SE_X: 'gävleborg',
            SE_W: 'dalarna',
            SE_Y: 'västnorrland',
            SE_C: 'uppsala',
            SE_AB: 'stockholm',
            SE_D: 'södermanland',
            SE_T: 'örebro',
            SE_S: 'värmland',
            SE_O: 'västra götaland',
            SE_E: 'östergötland',
            SE_F: 'jönköping',
            SE_H: 'kalmar',
            SE_N: 'halland',
            SE_G: 'kronoberg',
            SE_I: 'gotland',
            SE_K: 'blekinge',
            SE_M: 'skåne'}
    }
    
    onChange = (e) => { this.setState({[e.target.name]: e.target.value})}

    getKeyByValue = (object, value) => {
        let foundKey = Object.keys(object).find(key => object[key] === value);
        return foundKey.replace("_", "-");
    }

    getTime = (d) => { 
        const monthNames = ["Januari", "Feburari", "Mars", "April", "Maj", "Juni",
            "Juli", "Augusti", "September", "Oktober", "November", "December"];
        let month = monthNames[d.getMonth()];
        let datestring = d.getDate().toString() + " " + month + " " + d.getFullYear();
        return datestring;
    }

    getHomesByQuery = async () => {
        const {query} = this.state;
        if(query.length > 0) {
            this.setState({loading: true, errormsg: ''});
            const searchTerm = query.toLowerCase();
            
            let homesOnly = await this.createDataArray('CatHomes',searchTerm);
            let vacsOnly = await this.createDataArray('CatBoardingHomes',searchTerm);
            if(homesOnly.length < 0 && vacsOnly.length < 0){
                this.setState({loading: false, errormsg: 'Inga resultat'});
            }
            else{
                this.setState({responseHomes: homesOnly, responseVacation: vacsOnly, query: ''});
            }
            
        }
    }

    fetchData = async(col, home) => {
        this.setState({loading: true, errormsg: ''});
        let res = await api.fetchAllFromCol(col);
        let resArr = [];
        res.forEach((doc) => {
            let data = doc.data();

            let currentHome = {id: doc.id ,name:data.name, link:data.link, district:data.district,
                munici:data.municipality ,region:data.region, time:data.uploaded};
            resArr.push(currentHome);
        });
        if(home === 'homes'){
            this.setState({responseHomes: resArr, responseVacation: []});
        }
        else {
            this.setState({responseVacation: resArr, responseHomes: []});
        }
    }

    createDataArray = async (path,query) => {  
        let tempArr = [];
        let response = '';
     
        response = await api.fetchDataQuery(path,query);
        
        response.forEach((doc) => {
            let data = doc.data();
            
            let currentHome = {id: doc.id ,name:data.name, link:data.link, district:data.district,
                munici:data.municipality ,region:data.region, time:data.uploaded};
            tempArr.push(currentHome);
        });
        return tempArr;
    }

    uploadEntry = async () => 
    {
        const {region} = this.state;
        const term = region.toLowerCase();
        
        let d = new Date();
        let toUpload = {
            name: this.state.name.toLowerCase(),
            link: this.state.linktoLowerCase(),
            district: this.state.district.toLowerCase(),
            municipality: this.state.munici.toLowerCase(),
            region: term,
            regionCode: this.getKeyByValue(this.state.regionCodes,term),
            searchTerms: [this.state.name.toLowerCase(),this.state.district.toLowerCase(), this.state.munici.toLowerCase(), this.state.region.toLowerCase()],
            uploaded: this.getTime(d)
        }
        if(this.state.selectedOption === 0) //katthem
        {
            let res = await api.uploadData('CatHomes',toUpload);
            this.handleUpload(res);
        }
        else //pensionat
        {
            let res = await api.uploadData('CatBoardingHomes',toUpload)
            this.handleUpload(res);
        }
    }

    handleUpload = (uploadRes) => {
        switch(uploadRes.type){
            case 'error':
            this.setState({msg: uploadRes.msg})
            break;
            case 'success':
            this.setState({msg: uploadRes.msg})
            break;
            default:
            break;
        }
    }

    clearFields = () => {
        this.setState({name: '', link:'', district:'', munici:'', region:'',msg:''});
    }

    removeHome = (col,id) => {
        api.deleteEntry(col,id);
    }

    changeLoading = () => {
        this.setState({loading: false});
    }

    render() {
        return (
        <div className='admin-container'>
            <div className='admin-upload'>
                <h3>Lägg upp ett:</h3>
                <RadioButtons items={['Katthem', 'Kattpensionat']} onSelect={(index) => { this.setState({selectedOption: index}); }}/>
                <form>
                    <label htmlFor='name'>Hemmets namn:</label><br/>
                    <input className='admin-text-input' type='text' id='name' name='name' onChange={this.onChange} value={this.state.name} /><br/>
                    <label htmlFor='name'>Länk:</label><br/>
                    <input className='admin-text-input' type='text' id='link' name='link' onChange={this.onChange} value={this.state.link} /><br/>
                    <label htmlFor='name'>Ort:</label><br/>
                    <input className='admin-text-input' type='text' id='district' name='district' onChange={this.onChange} value={this.state.district} /><br/>
                    <label htmlFor='name'>Kommun:</label><br/>
                    <input className='admin-text-input' type='text' id='munici' name='munici' onChange={this.onChange} value={this.state.munici} /><br/>
                    <label htmlFor='name'>Län:</label><br/>
                    <input className='admin-text-input' type='text' id='region' name='region' onChange={this.onChange} value={this.state.region} /><br/>
                </form>
                <p>{this.state.msg}</p>
                <button className='normal-btn' onClick={this.uploadEntry}>Lägg upp</button><button className='normal-btn' onClick={this.clearFields}>Rensa fält</button>
            </div>
            <div className='admin-search'>
                <h3>Hämta alla:</h3>
                <button className='normal-btn' onClick={() => {this.fetchData('CatHomes','homes');}}>Katthem</button><button className='normal-btn' onClick={() => {this.fetchData('CatBoardingHomes','vac');}}>Pensionat</button>
                <h3>Eller sök:</h3>
                <div style={{"display": "flex", "flexDirection":"row"}}>
                    <input type="text" id="query" name="query" className='text-input' onChange={this.onChange} value={this.state.query}/><button className='query-btn' onClick={this.getHomesByQuery}>Sök</button>
                </div>
                {this.state.loading && <div className='admin-loading'><img className='loading-img' alt='loading' src={loadingsvg}/></div>}
                    {this.state.errormsg}
                    <AdminResults changeLoading={this.changeLoading} deleteEntry={this.removeHome} homes={this.state.responseHomes} vacation={this.state.responseVacation}/>
            </div>
            <button onClick={this.props.logOut} className='admin-logout'>Logga ut</button>
        </div>
        );
    }
}

export default HomeManager;