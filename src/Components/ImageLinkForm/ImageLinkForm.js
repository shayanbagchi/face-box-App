import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({onInputChange,onSubmit}) => {
	return (
		<div className='f3'>
			<p>
				{'Detect Faces with One click !'}
			</p>
			<div className='center'>
				<div className='form center pa4 br3 shadow-5' >
					<input className='f4 pv2  w-70 ' type='text'
						onChange={onInputChange}/>
					<button className='buttoncolor w-30 grow f4 link pr3 dib pv2 white pa0 ma0' onClick={onSubmit}>Detect</button>
				</div>
			</div>
		</div>
		);
}

export default ImageLinkForm;