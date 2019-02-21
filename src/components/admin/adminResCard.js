import React from 'react';

class ResultCard extends React.Component {
    render() {
        const {name, url, time ,docid,itemid} = this.props;
        
      return (
        <div className='admin-result-card'>
            <div className='admin-card-title'>
                <h3>{name}</h3>
                <button className='admin-remove-btn' onClick={() => {this.props.remove(itemid,docid)}}>X</button>
            </div>
            <p>Uppladdad {time}</p><br/>
            <p>Länk: <a href={url}>här</a></p>
        </div>
      );
    }
}

export default ResultCard;