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
		<input className='f4 pa2 w-70 center' type='text'
		onChange={onInputChange}/>
		<button className='w-30 grow f4 link ph3 dib pv2 white bg-light-purple' onClick={onSubmit}>Detect</button>
		</div>
		</div>
		</div>
		);
}

export default ImageLinkForm;