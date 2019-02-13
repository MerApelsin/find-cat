import React, { Component } from 'react';

/*export default function card(props) {
    return (
        <div>
            <h1>Hello, {props.name}</h1>
        </div>
    );
}*/

class ResultCard extends React.Component {
    render() {
      return (
        <div>
            <h1>Hello, {this.props.name}</h1>
        </div>
      );
    }
}

export default ResultCard;