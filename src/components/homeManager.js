import React, { Component } from 'react';
import RadioButtons from '../components/radiobuttons.js';
import api from '../firebase.js';
import Results from './results.js';

class HomeManager extends Component {
    state = {
        name: '',
        link: '',
        town: '',
        munici: '',
        region: '',
        query: '',
        selectedOption: 0,
        response: '',
        msg: '',
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

    uploadEntry = () => 
    {
        let toUpload = {
            name: this.state.name,
            link: this.state.link,
            town: this.state.town,
            municipality: this.state.munici,
            region: this.state.region,
            regionCode: this.getKeyByValue(this.state.regionCodes,this.state.region)
        }
        if(this.state.selectedOption === 0) //katthem
        {
           this.handleUpload(api.uploadData('CatHomes',toUpload));
        }
        else //pensionat
        {
           this.handleUpload(api.uploadData('CatBoardingHomes',toUpload));
        }
    }

    handleUpload = (uploadRes) => {
        switch(uploadRes.type){
            case 'error':
            this.setState({msg: uploadRes.msg})
            break;
            case 'success':
            this.setState({msg: uploadRes.msg, name: '', link:'', town:'', munici:'', region:''})
            break;
            default:
            break;
        }
    }

    render() {
        return (
        <div className='admin-container'>
            <button onClick={this.props.logOut}>Logga ut</button>
            <div>
                <h4>Lägg upp ett:</h4>
                <RadioButtons items={['Katthem', 'Kattpensionat']} onSelect={(index) => { this.setState({selectedOption: index}); }}/>
                <form>
                    <label htmlFor='name'>Hemmets namn:</label><br/>
                    <input type='text' id='name' name='name' onChange={this.onChange} value={this.state.title} /><br/>
                    <label htmlFor='name'>Länk:</label><br/>
                    <input type='text' id='link' name='link' onChange={this.onChange} value={this.state.title} /><br/>
                    <label htmlFor='name'>Stad:</label><br/>
                    <input type='text' id='town' name='town' onChange={this.onChange} value={this.state.title} /><br/>
                    <label htmlFor='name'>Kommun:</label><br/>
                    <input type='text' id='munici' name='munici' onChange={this.onChange} value={this.state.title} /><br/>
                    <label htmlFor='name'>Län:</label><br/>
                    <input type='text' id='region' name='region' onChange={this.onChange} value={this.state.title} /><br/>
                </form>
                <p>{this.state.msg}</p>
                <button onClick={this.uploadEntry}>Lägg upp</button>
            </div>
            <div>
                <button>Visa alla</button><button>Katthem</button><button>Pensionat</button>
                <p>Eller sök:</p>
                <input type="text" id="query" name="query" onChange={this.onChange} value={this.state.title}/><button>Sök</button>
                {this.state.response && <Results data={this.state.response} admin={true}/>}
            </div>
        </div>
        );
    }
}

export default HomeManager;