import React from 'react';
import logoicon from '../../../assets/images/logo/iHelp_white.png'
const LogoIcon = (props) => {
    return ( 
        <img alt="Logo" src={logoicon} {...props} />
    );
}
 
export default LogoIcon;