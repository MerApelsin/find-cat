import React from 'react';

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
        <div className='result-card'>
            <h2>{name}</h2>
            <p>uppladdad den {time}</p>
            <h3>Länk till hem: <a href={url}>här</a></h3>
            <h3>Ort: {district}</h3>
            <h3>Kommun: {munici}</h3>
            <h3>Län: {region}</h3>
        </div>
      );
    }
}

export default ResultCard;