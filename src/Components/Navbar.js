import React,{useState,} from 'react';
import {Link} from 'react-router-dom';

import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import PhotoSizeSelectActualRoundedIcon from '@material-ui/icons/PhotoSizeSelectActualRounded';
import ForumIcon from '@material-ui/icons/Forum';
import SearchIcon from '@material-ui/icons/Search';
import CategoryIcon from '@material-ui/icons/Category';
import AccountBoxRoundedIcon from '@material-ui/icons/AccountBoxRounded';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import SettingsApplicationsRoundedIcon from '@material-ui/icons/SettingsApplicationsRounded';
import EmailRoundedIcon from '@material-ui/icons/EmailRounded';
import ContactPhoneRoundedIcon from '@material-ui/icons/ContactPhoneRounded';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';

import Tooltip from '@material-ui/core/Tooltip';
import { setIsCategory ,setIsMenu} from './../redux/isCategory'
import {useSelector, useDispatch } from 'react-redux'

function Navbar(props){

	const dispatch = useDispatch();
	const { isCategory, isMenu } = useSelector(state=>state.isCategory);

	return( 
		<div className='NavbarDiv'>
			<img className='logo' src="/img/logo.png" alt='logo' loading='lazy'/>
			{props.login?<div className='msg-menu-div'>

				<Tooltip title='Search'>
					<SearchIcon onClick={props.onSearchClick} className='nav-icon'/>
				</Tooltip>
				
				<Tooltip title='Categories'>
					<CategoryIcon onClick={()=>{dispatch(setIsCategory(!isCategory))}} className='nav-icon'/>
				</Tooltip>
				
				<Link to='/posts'>
					<Tooltip title='Posts'>
						<PhotoSizeSelectActualRoundedIcon className='nav-icon'/>
					</Tooltip>
				</Link>
				
				<Link to='/messages'>
					<Tooltip title='Messages'>
						<ForumIcon onClick={()=>dispatch(setIsMenu(false))} className='nav-icon'/>
					</Tooltip>
				</Link>
				
				
				
				{isMenu?<Tooltip title='Close menu'>
					<CloseRoundedIcon onClick={()=>{dispatch(setIsMenu(!isMenu))}} className='nav-icon menu-icon'/>
				</Tooltip>
				:<Tooltip title='Menu'>
					<MenuRoundedIcon onClick={()=>{dispatch(setIsMenu(!isMenu))}} className='nav-icon menu-icon'/>
				</Tooltip>}
				
			</div>:<div className='msg-menu-div'>
				<Tooltip title='Search'>
					<SearchIcon onClick={props.onSearchClick} 
					style={{marginTop:'12px'}}
					className='nav-icon'/>
				</Tooltip>
				<Link to='/login'><button>LOGIN</button></Link>
				<Link to='/signup'><button>SIGNUP</button></Link>
			</div>}
			
			{isMenu?<div className='menu'>
				<Link to='/'>
					<button onClick={()=>{dispatch(setIsMenu(false))}}><HomeRoundedIcon style={{'font-size':'10px'}}/> Home</button>
				</Link><br/>
				<Link to={'/account/'+localStorage.getItem('user223')} >
					<button onClick={()=>{dispatch(setIsMenu(false))}}>
					<AccountBoxRoundedIcon style={{'font-size':'10px'}}/> Account</button>
				</Link><br/>
				<Link to='/posts'>
					<button onClick={()=>{dispatch(setIsMenu(false))}}>
						<PhotoSizeSelectActualRoundedIcon style={{'font-size':'10px'}}/> Posts</button>
				</Link><br/>
				<Link to='/request-page'>
					<button onClick={()=>{dispatch(setIsMenu(false))}}>
						<PlaylistAddIcon style={{'font-size':'10px'}}/> Request Page</button>
				</Link><br/>
				<button onClick={()=>{dispatch(setIsCategory(!isCategory))}}>
				<CategoryIcon style={{'font-size':'10px'}}/> Categories</button>
				
				<Link to='/myposts'>
					<button onClick={()=>{dispatch(setIsMenu(false))}}>
					<PhotoSizeSelectActualRoundedIcon style={{'font-size':'10px'}}/> My posts</button>
				</Link><br/>
				<Link to='/mysavedservices/'>
					<button onClick={()=>{dispatch(setIsMenu(false))}}>
					<SettingsApplicationsRoundedIcon style={{'font-size':'10px'}}/> My saved services</button>
				</Link><br/>
				<h6>CONNECT WITH US THROUGH</h6>
				<ul>
					<li><a href='mailto:sumitdhakad2232@gmail.com'>
						<EmailRoundedIcon style={{'font-size':'20px'}}/></a>
					<a href='tel:+91 7999004229'>
						<ContactPhoneRoundedIcon style={{'font-size':'20px'}}/></a></li>
					<li><a href='https://www.linkedin.com/company/rentyug/'>Linkedin</a></li>
					<li><a href='https://www.instagram.com/RentYug/'>Instagram</a></li>
					<li><a href='https://www.facebook.com/RentYug/'>Facebook</a></li>
					<li><a href='sms:+91 7999004229'>Give feedback</a></li>
				</ul>
				<Link to='/about'><button onClick={()=>{dispatch(setIsMenu(false))}}>About us</button></Link><br/>
				<Link to='/'><button onClick={()=>{props.handleLogout(); dispatch(setIsMenu(false))}}>Logout</button></Link><br/>
				
			</div>:''}
		</div>	
	);
}


export default Navbar;
