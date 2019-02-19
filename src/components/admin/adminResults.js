import React, { Component } from 'react';
import AdminCard from './adminResCard';

class AdminResult extends Component {
    state = {
        Homes: [],
        Vacs: [],
        vacMsg: '',
        homeMsg: '',
        loading: false
    }

    componentDidUpdate(prevProps){
        if(this.props.homes !== prevProps.homes && this.props.homes.length > 0){
            this.setState({Homes:[], msg: ''}, () => {this.createRenderArray('home',this.props.homes);})
        }
        if(this.props.vacation !== prevProps.vacation && this.props.vacation.length > 0){
            this.setState({Vacs:[], msg: ''}, () => {this.createRenderArray('vacs',this.props.vacation);})
        }
    }

    removeItem = (itemid,docid) => {
        let newHomeArr = [...this.state.Homes];
        let newVacArr = [...this.state.Vacs];
        console.log('state home begin ',this.state.Homes);
        
        console.log('home clone ',newHomeArr);
        
        if(itemid.includes('home')){
            let removeIndex = parseInt(itemid.slice(4));
            newHomeArr.splice(removeIndex,1);
            this.props.deleteEntry('CatHomes',docid);
            this.setState({Homes: newHomeArr});
        }
        else{
            let removeIndex = parseInt(itemid.slice(4));
            newVacArr.splice(removeIndex,1);
            this.props.deleteEntry('CatBoardingHomes',docid);
            this.setState({Vacs: newVacArr});
        }

        console.log('after remove ',this.state.Homes);
    }

    createRenderArray = (type,dataArray) => {
        
        let homeArr = [];
        let vacArr = [];
        if(type === 'home'){
            if(dataArray.length <= 0){
                this.setState({homeMsg: 'Inga resultat'});
            }
            else {
                homeArr = dataArray.map((item,index) => {
                    let currentIndex = index.toString();
                    let itemID = 'home'+currentIndex;
                                        
                    return <AdminCard remove={this.removeItem} itemid={itemID} docid={item.id} key={item.id} name={item.name} url={item.link} time={item.time}/>
                });
                
                this.setState({Homes: homeArr});
            }
        }
    
        else{
            if(dataArray.length <= 0){
                this.setState({vacMsg: 'Inga resultat'});
            }
            else {
                vacArr = dataArray.map((item,index) => {
                    let currentIndex = index.toString();
                    let itemID = 'Vacs'+currentIndex;
                    return <AdminCard remove={this.removeItem} itemid={itemID} docid={item.id} key={item.id} name={item.name} url={item.link} time={item.time}/>
                });
                
                this.setState({Vacs: vacArr});
            }
        }
        this.props.changeLoading();
    }

    render() {
        return (
        <div>
            <p>{this.state.homeMsg}</p>
            {this.state.Homes.length > 0 &&
                <div>
                    <h4>Katthem</h4> 
                    {this.state.Homes}
                </div>}
            <p>{this.state.vacMsg}</p>
            {this.state.Vacs.length > 0 &&
                <div>
                    <h4>Kattpensionat</h4> 
                    {this.state.Vacs}
                </div>}
        </div>
    );
  }
}

export default AdminResult;