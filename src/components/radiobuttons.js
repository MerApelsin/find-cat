import React, { Component } from 'react';

class Radiobuttons extends Component{
    state = {
        selectedIndex: 0
    }

    handleOptionChange = changeEvent => {
        let indexInt = parseInt(changeEvent.target.value);
        this.setState({
        selectedIndex: indexInt
        }, () => {this.props.onSelect(this.state.selectedIndex)});
    };
    
    render() {
        const { items } = this.props;
        
        let radiobtns = items.map((item, index) => 
        {
            let a = index;

            return (
            <div className='radioButton' key={'radio' + a}>
                <label>
                    <input
                        type="radio"
                        name="post-Options"
                        value={a}
                        checked={this.state.selectedIndex === a}
                        onChange={this.handleOptionChange}
                        className="checkInput" />
                    {item}
                </label>
            </div>)
        })
        return (
            <div>
                <form>
                    {radiobtns}
                </form>
            </div>
        );
      }
    }

export default Radiobuttons;