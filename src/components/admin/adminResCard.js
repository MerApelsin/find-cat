import React from 'react';

class ResultCard extends React.Component {
    render() {
        const {name, url, time ,docid,itemid} = this.props;
        
      return (
        <div className='result-card'>
            <button onClick={() => {this.props.remove(itemid,docid)}}>X</button>
            <h2>{name}</h2>
            <p>uppladdad den {time}</p>
            <h3>Länk till hem: <a href={url}>här</a></h3>
        </div>
      );
    }
}

export default ResultCard;