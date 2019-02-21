//loginform + auth handling.
//Same for mobile + desktop
import React, { Component } from 'react';
import api from '../../firebase.js';
import HomeManager from './homeManager.js';

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

    loginUser = () => {
        const { username, password } = this.state;
        api.signIn(username,password)
            .catch(({message}) => { this.setState({errorMsg: message, username: '', password: ''})});
    }
    
    logOutUser = () => {    
        api.signOut();
    }
  
    render() 
    { 
        return (
        <div>
            {!this.state.authUser && <div className='auth-container'>
                    <h2>Admin inlogg</h2>
                    {this.state.errorMsg}
                    <form>
                        <label htmlFor='username'>Användarnamn</label><br/>
                        <input className='admin-text-input' type='text' id="username" name="username" onChange={this.onChange} value={this.state.username}/><br/>
                        <label htmlFor='password'>Lösenord</label><br/>
                        <input className='admin-text-input' type='password' id='password' name='password' onChange={this.onChange} value={this.state.password}/><br/>
                    </form>
                    <button className='login-btn' onClick={this.loginUser}>Login</button>
                </div>}
            {this.state.authUser && <HomeManager logOut={this.logOutUser}/>}
        </div>
        );
    }
  }
  
  export default Login;