import React from 'react';
import logoicon from '../../../assets/images/logo/iHelp-01.png'
const LogoIcon = (props) => {
    return ( 
        <img alt="Logo" src={logoicon} {...props} />
    );
}
 
export default LogoIcon;