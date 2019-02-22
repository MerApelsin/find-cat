//component with 'about site' text - should toogle if text is showing or not.
//Same for mobile + desktop
import React, { Component } from 'react';
import catImg from './assets/jojo.png'

class About extends Component {
  
  render() {
        return (
            <div className='about-container'>
                <button onClick={this.props.showHome} className='about-btn normal-btn'>Tillbaka till Sök</button>
                <div className='about-text'>
                    <h1 className='about-title'>Om sidan</h1>
                    <h2 className='about-title'>Varför och hur?</h2>
                    <p>Denna sidan är gjort för att ge ett modernare och enklare sätt att hitta
                        katthem/kattpensionat.</p><br/>
                    <p> Detta görs antingen genom att välja ett län på kartan
                        eller via text sökning. Med det senare kan man söka på län, ort och kommun.
                        Detta gör dock att om man vill ha t.ex. stockholm innerstad så kommer en sökning på stockholm ge
                        resultat för hela länet, så det är en av de större svagheterna. Inga resultat kommer heller visa
                        den exakta addressen, utan det man kan söka på är det som står. Men alla resultat har en länk till
                        respektive sida där det finns mer information om hemmet och om det är ett katthem - deras regler och
                        vad man ska tänka på inför en adoption!
                    </p>
                    <h2 className='about-title'>Vem kan lägga upp?</h2>
                    <p>Endast admin, och då görs 'allt för hand' via admin-sidan. 'Uppladdad den [...]' som finns på varje resultat är för att informera om
                        när detta hem las till, vilket är en indikator på om hemsidan/hemmet fortfarande verkar vara aktivt. </p>
                    <h2 className='about-title'>Andra bra sidor</h2>
                    <ul>
                        <li><a href='http://katter.nu/' rel="noopener noreferrer" target="_blank" title='katter.nu'>Katter.nu - Generell info</a></li>
                        <li><a href='http://www.sverak.se/' rel="noopener noreferrer" target="_blank" title='Sverak'>Sverak - Kattförbund, info</a></li>
                    </ul>

                </div>
                <div className='about-img-container'>
                        <img alt='cat' src={catImg} title='Min katt Jojo'/>
                </div>
                <div>
                    <p style={{fontSize:'smaller'}}>Tack till <a href="https://www.flaticon.com/authors/roundicons" rel="noopener noreferrer" target="_blank" title="Roundicons">Roundicons</a> för loading ikonen.
                    </p>
                </div>
            </div>
          );
      }
}

export default About;