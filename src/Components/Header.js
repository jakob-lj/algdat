
import React from 'react';
import {Link} from 'react-router-dom';
import logo from './../logo.png';

function Header(props) {
  return <div>
    <div style={{height: '4em', background: '#0d1931', color: 'white'}}>
      <div style={{height: '100%', display: 'flex', alignItems: 'center', width: '70%', margin: 'auto'}}><div style={{height: '100%', margin: '1em'}}><img style={{height: '100%'}} src={logo} alt={'logo'}/></div><Link to={'/'} style={{color: 'white', textDecoration: 'none', fontSize: '1.2em'}}>Hjem</Link></div>
    </div>
  </div>;
}

export default Header;
