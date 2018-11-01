import React from 'react';


const Navigation = ({onRoutechange ,isSignedIn}) => {
	if(isSignedIn){
		return (
			<nav style={{display: 'flex', justifyContent: 'flex-end'}}>
			<p onClick={() => onRoutechange ('signout')} className='f4 link dim black underline pa3 pointer'>Sign Out</p>
			</nav>
			);
	}else {
		return(
			<nav style={{display: 'flex', justifyContent: 'flex-end'}}>
			<p onClick={() => onRoutechange ('signin')} className='f4 link dim black underline pa3 pointer'>Sign In</p>
			<p onClick={() => onRoutechange ('register')} className='f4 link dim black underline pa3 pointer'>Register</p>
			</nav>
		);
	}
}

export default Navigation;