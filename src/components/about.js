//component with 'about site' text - should toogle if text is showing or not.
//Same for mobile + desktop
import React, { Component } from 'react';
import catImg from './assets/allan.png'

class About extends Component {
    state = {
        visible: false,
    }

    toggleVisability = () => 
    {
        this.state.visible ? this.setState({visible: false}) : this.setState({visible: true})
    }

  render() {
      const {visible} = this.state;
      if(!visible){
        return (
            <div className='about-container-empty'>
                <button onClick={this.toggleVisability}>Läs om sidan</button> 
            </div>
          );
      }
      else{
        return (
            <div className='about-container'>
                <button onClick={this.toggleVisability} className='about-btn'>Dölj om sidan</button>
                <div style={{display:'flex',flexDirection:'row'}}>
                    <div className='about-text'>
                        
                        <h4>Om sidan</h4>
                        <p>yada yada yada</p>
                    </div>
                    <div>
                        <img alt='cat' src={catImg}/>
                    </div>
                </div>
            </div>
          );
      }
  }
}

export default About;