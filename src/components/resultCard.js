import React from 'react';

class ResultCard extends React.Component {
    render() {
        const {name, url, district, munici, region, time} = this.props;
        
      return (
        <div className='result-card'>
            <h2 className='title-font'>{name}</h2>
            <p className='category'>Ort: </p><p>{district}</p><br/>
            <p className='category'>Kommun: </p><p>{munici}</p><br/>
            <p className='category'>Län: </p><p>{region}</p><br/>
            <p className='category'>Länk till hem: </p><p><a href={url} rel="noopener noreferrer" target="_blank">här</a></p><br/>
            <p className='time'>uppladdad den {time}</p>
        </div>
      );
    }
}

export default ResultCard;