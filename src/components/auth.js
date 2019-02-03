//loginform + auth handling.
//Same for mobile + desktop
import React, { Component } from 'react';
import api from '../firebase.js';
import Admin from './admin.js';

class Login extends Component {
    state = {
        username:'',
        password: '',
        errorMsg: '',
        authUser: ''
    }

    componentDidMount(){
        api.auth.onAuthStateChanged(authUser => {
            if(authUser) 
              this.setState({authUser: authUser.uid, username: '',password:''});
            else
                this.setState({authUser: ''})
        })
    }

    componentWillUnmount(){
        var unsubscribe = api.auth.onAuthStateChanged(function (user) {});
        unsubscribe();
    }
   
    onChange = (e) => { this.setState({[e.target.name]: e.target.value})}

    onSubmit = e => {
        e.preventDefault();
        const { username, password } = this.state;
        api.signIn(username,password)
            .catch(({message}) => { this.setState({errorMsg: message, username: '', password: ''})});
    };
    
  
    render() {
        const {authUser, errorMsg} = this.state;
        if(!authUser){
            return (
                <div className='auth-container'>
                    <h3>Admin inlogg</h3>
                    <h4>{errorMsg}</h4>
                    <form>
                        <label HTMLfor=''>Användarnamn</label><br/>
                        <input type='text' id="username" name="username" onChange={this.onChange} value={this.state.username}/><br/>
                        <label HTMLFor=''>Lösenord</label><br/>
                        <input type='password' id='password' name='password' onChange={this.onChange} value={this.state.password}/><br/>
                        <input type='submit' value='Login'/>
                    </form>
                </div>
              );
        }
        else{
            return(
                <Admin/>
            );
        }
     
    }
  }
  
  export default Login;