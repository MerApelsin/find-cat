import React, { Component } from 'react';

/*export default function card(props) {
    return (
        <div>
            <h1>Hello, {props.name}</h1>
        </div>
    );
}*/
/*
 name={item.name} url={item.link} district={item.district}
                munici={item.munici} region={item.region} time={item.time}
*/
class ResultCard extends React.Component {
    render() {
        const {name, url, district, munici, region, time} = this.props;
      return (
        <div>
            <h1>Hello, {this.props.name}</h1>
        </div>
      );
    }
}

export default ResultCard;