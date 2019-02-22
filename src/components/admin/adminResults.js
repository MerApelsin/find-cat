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
            this.setState({Homes:[], msg: '', Vacs:[]}, () => {this.createRenderArray('home',this.props.homes);})
        }
        if(this.props.vacation !== prevProps.vacation && this.props.vacation.length > 0){
            this.setState({Vacs:[], msg: '', Homes:[]}, () => {this.createRenderArray('vacs',this.props.vacation);})
        }
    }

    removeItem = (itemid,docid) => {
        let newHomeArr = [...this.state.Homes];
        let newVacArr = [...this.state.Vacs];
        
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
        console.log(dataArray);
        
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
        const {Homes,Vacs,homeMsg,vacMsg} = this.state;
        return (
        <div>
            {(Homes.length > 0 || Vacs.length > 0) &&<button className='normal-btn' onClick={() => {this.setState({Homes:[],Vacs:[]})}}>Rensa resultat</button>}
            <p>{homeMsg}</p>
            {Homes.length > 0 &&
                <div>
                    <h4>Katthem</h4> 
                    {Homes}
                </div>}
            <p>{vacMsg}</p>
            {Vacs.length > 0 &&
                <div>
                    <h4>Kattpensionat</h4> 
                    {Vacs}
                </div>}
        </div>
    );
  }
}

export default AdminResult;