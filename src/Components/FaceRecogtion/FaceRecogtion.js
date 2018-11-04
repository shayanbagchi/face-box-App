import React from 'react';
import './FaceRecogtion.css';

const FaceRecogtion = ({imageUrl ,boxes}) => {
	return (
		<div className='center ma'>
		<div className='absolute mt2'>
		<img id='inputimage' alt='' src={imageUrl} width = '500px' height='auto'/>
			{boxes.map(boxes => {
				return(
				<div key={boxes.topRow}
					className='bounding-box'
					style={{top: boxes.topRow,right:boxes.rightCol,bottom:boxes.bottomRow,left:boxes.leftCol}}>
				</div>
				)})
			}
		</div>
		</div>
		);
}

export default FaceRecogtion;