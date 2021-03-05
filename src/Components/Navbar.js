import React,{useState, useEffect} from 'react';
import axios from 'axios';

function Navbar(props){

	const [showMenu, setShowMenu]=useState(false);
	const [logo, setLogo]=useState('')

	useEffect(()=>{
		const url = localStorage.getItem('url');
		axios.get(url+'logo/').then(res=>{
			setLogo(res.data[0].Logo);
		})
	},[])

	return(
		<div className='NavbarDiv'>
			<img className='logo' src={logo} alt='logo'/>
			<h3  className='Navhead'>RentYug</h3>
			{props.login?<div className='msg-menu-div'>
				<button onClick={props.handleMessages}>Messages</button>
				<button onClick={()=>{showMenu?setShowMenu(false):setShowMenu(true)}}
				>{showMenu?'X':'Menu'}</button>
			</div>:<div className='msg-menu-div'>
				<button onClick={props.handleLogin}>LOGIN</button>
				<button onClick={props.handleSignup}>SIGNUP</button>
			</div>}
			
			{showMenu?<div className='menu'>
				<button onClick={()=>{props.handleAccount(); setShowMenu(false);}}>Account</button>
				<h3>CONNECT WITH US THROUGH</h3>
				<ul>
					<li><a href='mailto:sumitdhakad2232@gmail.com'>Mail</a></li>
					<li><a href='tel:+91 7999004229'>Phone Call</a></li>
					<li><a href='https://www.linkedin.com/in/sumit-dhakad-0152b1189'>Linkedin</a></li>
					<li><a href='https://www.instagram.com/__sumit__dhakad__/'>Instagram</a></li>
					<li><a href='https://www.facebook.com/sumit.dhakad.7587'>Facebook</a></li>
				</ul>
				<button onClick={()=>{props.handleLogout(); setShowMenu(false);}}>Logout</button>
				<button onClick={()=>{props.handleAboutUs(); setShowMenu(false);}}>About us</button>
				<a href='https://associationyug.com'>About our group</a>
				<h6 className='f-cursive c-name'>BY</h6>
				<h6 className='f-cursive'>ASSOCIATION YUG</h6>
			</div>:''}
		</div>	
	);
}


export default Navbar;
