import React from 'react';

import './App.css';
import Connect from './components/Wallet/Connect';
import Home from './components/Home';
import DropshippingIntro from './DropshippingIntro';


const App = () => {
	
	

	return (
		<div className=' bg-blue-200 p-4'>
			<h1 className='text-center text-white italic font-semibold shadow-sm font-monospace'>We provide dropshipping services</h1>
			<DropshippingIntro/>
		<Connect></Connect>
		</div>
		
	);
};

export default App;
