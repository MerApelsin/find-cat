import React, { Component } from 'react';
import ResultCard from './resultCard.js';

class Result extends Component {
    state = {
        Homes: [],
        msg: '',
        done: false,
    }

    componentDidUpdate(prevProps){
        if(this.props.homes !== prevProps.homes){
            this.setState({Homes:[], msg: ''}, () => {this.createRenderArray(this.props.homes);})
        }
        if(this.props.selected !== prevProps.selected){
            this.setState({Homes: [], done:false});
        }
    }

    createRenderArray = (dataArray) => {
        let renderArray = [];
        if(dataArray.length <= 0){
            this.setState({msg: 'Inga resultat', done:true}, () => {this.props.changeLoading();});
        }
        else {
            renderArray = dataArray.map((item) => {
                
                return <ResultCard key={item.id} name={item.name} url={item.link} district={item.district}
                    munici={item.munici} region={item.region} time={item.time}/>
            });
            
            this.setState({Homes: renderArray, done: true}, () => {this.props.changeLoading();});
        }
    }

    render() {
        return (
        <div>
            {this.state.done && <h2 className='title-font' style={{padding:0,margin:0}}>{this.props.type}</h2>}
            {this.state.msg}
            {this.state.Homes.length > 0 &&
                this.state.Homes}
        </div>
    );
  }
}

export default Result;