import React, { Component } from 'react';
import ResultCard from './resultCard.js';

class Result extends Component {
    state = {
        cathomes: [],
        vacHomes: []
    }

    componentDidMount(){
        this.handleData();
    }

    componentDidUpdate(prevProps, prevState){
        if(this.props.homes !== prevProps.homes || this.props.vacation !== prevProps.vacation){
            this.handleData();
        }
    }

    handleData= () => {
        const {homes, vacation} = this.props;
        let homeArray = [];
        let vacArray = [];
        if(homes && vacation){
           homeArray = this.createDataArray(homes);
           vacArray = this.createDataArray(vacation);
        }
        else if(homes){
            homeArray = this.createDataArray(homes);
        }
        else {
            vacArray = this.createDataArray(vacation);
        }
        this.createRenderArray(homeArray,vacArray);
    }

    createDataArray = (response) => {
        let tempArr = [];
        response.forEach((doc) => {
            let data = doc.data();
            let currrentHome = {name:data.name, link:data.link, district:data.district,
                munici:data.municipality ,region:data.region, time:data.uploaded};
            tempArr[tempArr.length-1] = currrentHome;
        });
        return tempArr;
    }

    createRenderArray = (homeArray, vacArray) => {
        this.props.changeLoading();
        if(homeArray.length > 0){
            let homeRender = homeArray.map((item) => {
                //map array to elements
                return <ResultCard name={item.name} url={item.link} district={item.district}
                munici={item.munici} region={item.region} time={item.time}/>
            });
        }
        if(vacArray.length > 0){
            let vacRender = vacArray.map((item) => {
                return <ResultCard name={item.name} url={item.link} district={item.district}
                munici={item.munici} region={item.region} time={item.time}/>
            })
        }
    }

    render() {
        return (
        <div>
            {this.state.cathomes.length > 0 && <h3>Katthem</h3>}
            {this.state.vacHomes.length > 0 && <h3>Kattpensionat</h3>}
        </div>
    );
  }
}

export default Result;