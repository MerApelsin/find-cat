//component with 'about site' text - should toogle if text is showing or not.
//Same for mobile + desktop
import React, { Component } from 'react';

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
            <div>
                <button onClick={this.toggleVisability}>Läs om sidan</button> 
            </div>
          );
      }
      else{
        return (
            <div className='about-container'>
              <button onClick={this.toggleVisability}>Dölj om sidan</button>
              <div>
                  <h4>Om sidan</h4>
                  <p>yada yada yada</p>
              </div>
            </div>
          );
      }
  }
}

export default About;