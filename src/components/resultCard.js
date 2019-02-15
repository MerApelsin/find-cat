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
            <h2>{name}</h2>
            <p>uppladdad den {time}</p>
            <h3><a href={url}>Länk till hem</a></h3>
            <h3>{district}</h3>
            <h3>{munici}</h3>
            <h3>{region}</h3>
        </div>
      );
    }
}

export default ResultCard;