import React, { Component } from 'react';
import RadioButtons from '../radiobuttons.js';
import api from '../../firebase.js';
import AdminResults from './adminResults.js';

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
        regionCodes: {SE_BD: 'Norrbotten',
            SE_AC: 'Västerbotten',
            SE_Z: 'Jämtland',
            SE_U: 'Västmanland',
            SE_X: 'Gävleborg',
            SE_W: 'Dalarna',
            SE_Y: 'Västnorrland',
            SE_C: 'Uppsala',
            SE_AB: 'Stockholm',
            SE_D: 'Södermanland',
            SE_T: 'Örebro',
            SE_S: 'Värmland',
            SE_O: 'Västra Götaland',
            SE_E: 'Östergötland',
            SE_F: 'Jönköping',
            SE_H: 'Kalmar',
            SE_N: 'Halland',
            SE_G: 'Kronoberg',
            SE_I: 'Gotland',
            SE_K: 'Blekinge',
            SE_M: 'Skåne'}
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
        console.log('query admin')
        if(query.length > 0) {
            this.setState({loading: true, errormsg: ''});
            const term = query.charAt(0).toUpperCase() + query.toLowerCase().slice(1);
            
            let homesOnly = await this.createDataArray('CatHomes',term);
            let vacsOnly = await this.createDataArray('CatBoardingHomes',term);
            this.setState({responseHomes: homesOnly, responseVacation: vacsOnly, query: ''});
        }
    }

    fetchData = async(col, home) => {
        console.log('all admin');
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
        console.log(response);
        
        response.forEach((doc) => {
            let data = doc.data();
            console.log(data);
            
            let currentHome = {id: doc.id ,name:data.name, link:data.link, district:data.district,
                munici:data.municipality ,region:data.region, time:data.uploaded};
            tempArr.push(currentHome);
        });
        return tempArr;
    }

    uploadEntry = async () => 
    {
        let d = new Date();
        let toUpload = {
            name: this.state.name,
            link: this.state.link,
            district: this.state.district,
            municipality: this.state.munici,
            region: this.state.region,
            regionCode: this.getKeyByValue(this.state.regionCodes,this.state.region),
            searchTerms: [this.state.name,this.state.district, this.state.munici, this.state.region],
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
        this.setState({name: '', link:'', district:'', munici:'', region:''});
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
                <h4>Lägg upp ett:</h4>
                <RadioButtons items={['Katthem', 'Kattpensionat']} onSelect={(index) => { this.setState({selectedOption: index}); }}/>
                <form>
                    <label htmlFor='name'>Hemmets namn:</label><br/>
                    <input type='text' id='name' name='name' onChange={this.onChange} value={this.state.name} /><br/>
                    <label htmlFor='name'>Länk:</label><br/>
                    <input type='text' id='link' name='link' onChange={this.onChange} value={this.state.link} /><br/>
                    <label htmlFor='name'>Ort:</label><br/>
                    <input type='text' id='district' name='district' onChange={this.onChange} value={this.state.district} /><br/>
                    <label htmlFor='name'>Kommun:</label><br/>
                    <input type='text' id='munici' name='munici' onChange={this.onChange} value={this.state.munici} /><br/>
                    <label htmlFor='name'>Län:</label><br/>
                    <input type='text' id='region' name='region' onChange={this.onChange} value={this.state.region} /><br/>
                </form>
                <p>{this.state.msg}</p>
                <button onClick={this.uploadEntry}>Lägg upp</button><button onClick={this.clearFields}>Rensa fält</button>
            </div>
            <div className='admin-search'>
                <button onClick={() => {this.fetchData('CatHomes','homes');}}>Katthem</button><button onClick={() => {this.fetchData('CatBoardingHomes','vac');}}>Pensionat</button>
                <p>Eller sök:</p>
                <input type="text" id="query" name="query" onChange={this.onChange} value={this.state.query}/><button onClick={this.getHomesByQuery}>Sök</button>
                {this.state.loading && <div>Loading gif thingy</div>}
                
                    <AdminResults changeLoading={this.changeLoading} deleteEntry={this.removeHome} homes={this.state.responseHomes} vacation={this.state.responseVacation}/>
            </div>
            <button onClick={this.props.logOut} className='admin-logout'>Logga ut</button>
        </div>
        );
    }
}

export default HomeManager;