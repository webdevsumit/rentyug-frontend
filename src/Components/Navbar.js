import React,{useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import RateReviewRoundedIcon from '@material-ui/icons/RateReviewRounded';
import PhotoSizeSelectActualRoundedIcon from '@material-ui/icons/PhotoSizeSelectActualRounded';
import ForumIcon from '@material-ui/icons/Forum';
import SearchIcon from '@material-ui/icons/Search';
import CategoryIcon from '@material-ui/icons/Category';

import Tooltip from '@material-ui/core/Tooltip';

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
			<h3  className='Navhead'></h3>
			{props.login?<div className='msg-menu-div'>

				<Tooltip title='Search'>
					<SearchIcon onClick={props.onSearchClick} className='nav-icon'/>
				</Tooltip>
				
				<Tooltip title='Categories'>
					<CategoryIcon className='nav-icon'/>
				</Tooltip>
				
				<Link to='/posts'>
					<Tooltip title='Posts'>
						<PhotoSizeSelectActualRoundedIcon className='nav-icon'/>
					</Tooltip>
				</Link>
				
				<Link to='/messages'>
					<Tooltip title='Messages'>
						<ForumIcon className='nav-icon'/>
					</Tooltip>
				</Link>
				
				
				
				{showMenu?<Tooltip title='Close menu'>
					<CloseRoundedIcon onClick={()=>{showMenu?setShowMenu(false):setShowMenu(true)}} className='nav-icon menu-icon'/>
				</Tooltip>
				:<Tooltip title='Menu'>
					<MenuRoundedIcon onClick={()=>{showMenu?setShowMenu(false):setShowMenu(true)}} className='nav-icon menu-icon'/>
				</Tooltip>}
				
			</div>:<div className='msg-menu-div'>
				<Link to='/login'><button>LOGIN</button></Link>
				<Link to='/signup'><button>SIGNUP</button></Link>
			</div>}
			
			{showMenu?<div className='menu'>
				<Link to='/'>
					<button onClick={()=>{setShowMenu(false)}}>Home</button>
				</Link><br/>
				<Link to={'/account/'+localStorage.getItem('user223')} >
					<button onClick={()=>{setShowMenu(false)}}>Account</button>
				</Link><br/>
				<Link to='/posts'>
					<button onClick={()=>{setShowMenu(false)}}>Posts</button>
				</Link><br/>
				<Link to='/myposts'>
					<button onClick={()=>{setShowMenu(false)}}>My posts</button>
				</Link><br/>
				<Link to='/mysavedservices/'>
					<button onClick={()=>{setShowMenu(false)}}>My saved services</button>
				</Link><br/>
				<h6>CONNECT WITH US THROUGH</h6>
				<ul>
					<li><a href='mailto:sumitdhakad2232@gmail.com'>Mail</a></li>
					<li><a href='tel:+91 7999004229'>Phone Call</a></li>
					<li><a href='https://www.linkedin.com/in/sumit-dhakad-0152b1189'>Linkedin</a></li>
					<li><a href='https://www.instagram.com/__sumit__dhakad__/'>Instagram</a></li>
					<li><a href='https://www.facebook.com/sumit.dhakad.7587'>Facebook</a></li>
					<li><a href='sms:+91 7999004229'>Give feedback</a></li>
				</ul>
				<Link to='/'><button onClick={()=>{props.handleLogout(); setShowMenu(false);}}>Logout</button></Link>
				<Link to='/about'><button onClick={()=>{setShowMenu(false);}}>About us</button></Link>
				<h6 className='f-cursive c-name'>BY</h6>
				<h6 className='f-cursive'>ASSOCIATION YUG</h6>
			</div>:''}
		</div>	
	);
}


export default Navbar;
