//component with 'about site' text - should toogle if text is showing or not.
//Same for mobile + desktop
import React, { Component } from 'react';
import catImg from './assets/allan.png'

class About extends Component {
  
  render() {
        return (
            <div className='about-container'>
                <button onClick={this.props.showHome} className='about-btn normal-btn'>Tillbaka till Sök</button>
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

export default About;