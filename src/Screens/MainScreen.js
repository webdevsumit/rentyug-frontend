import React,{Component} from 'react';
import Navbar from '../Components/Navbar';
import SubMainScreen from './SubMainScreen';
import SearchScreen from './SearchScreen';
import MessageScreen from './MessageScreen';
import SignupScreen from './SignupScreen';
import LoginScreen from './LoginScreen';
import AccountScreen from './AccountScreen';
import Description from './Description';
import AddNewSmsBox from './AddNewSmsBox'
import AboutUs from './AboutUs';
import PostScreen from './PostScreen';
import MyPostScreen from './MyPostScreen';
import MySavedServices from './MySavedServices';
import PPScreen from './PPScreen';
import FAQScreen from './FAQScreen';

import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import axios from 'axios';

import SearchIcon from '@material-ui/icons/Search';



class MainScreen extends Component{
	state={
		'login':false,
		'toSearch':'',
		'screen':'',
		'mainPage':true,
		'productId':'',
		'provider':'',
		'showSearchBar':false,
		'showCategories' : false,
	}

	componentDidMount(){
		const user = localStorage.getItem('user223');

		localStorage.setItem('url','https://sumit2232.pythonanywhere.com/');
		//localStorage.setItem('url','http://127.0.0.1:8000/');
		
		if((user===null) || (user==='')){
			this.setState({'screen':'SubMainScreen','login':false});
		}else{
			this.setState({'screen':'SubMainScreen','login':true});
		}
	}

	componentWillUnmount(){
		localStorage.removeItem('url')
	}
	
	handleLogout(){
		const url = localStorage.getItem('url');
		axios.get(url+'logout/',{
				  headers: {
				    'Authorization': `Token ${localStorage.getItem('token')}` 
				  }
				}).then(res=>{
			this.setState({'screen':'SubMainScreen','login':false,'mainPage':true});
			localStorage.removeItem('user223');
			localStorage.removeItem('token');
		})
	}
	
	handleSearch(){
		if(this.state.toSearch !== null && this.state.toSearch !== ''){
			this.setState({'showSearchBar':false});
		}
		this.setState({'showSearchBar':false});
		this.setState({'toSearch':''})
	}

	handleOpenService(id){
		if (this.state.login) this.setState({'productId':id});
		else alert('Please Signup or Login');
	}

	handleChooseCatagory(name){
		this.setState({'toSearch':name});
	}

	afterAddingNewSms(user,provider){
		this.setState({'screen':'AddNewSmsBox','mainPage':false,'provider':provider});
	}

	handleShowCategories(btnStatus = "auto"){
		if (btnStatus==='auto') this.setState({'showCategories':!this.state.showCategories});
		else this.setState({'showCategories':btnStatus});
	}
	
	render(){
		return(
			<div className='MainScreen'>
				<Router>
				
				<Navbar 
				 onSearchClick = {()=>this.setState({'showSearchBar':!this.state.showSearchBar})}
				 onShowCategories = {this.handleShowCategories.bind(this)}
				 handleLogout={this.handleLogout.bind(this)}
				 login={this.state.login}
				/>
				<div className='breakpoint'></div>
				
				{this.state.showSearchBar && <div className='searchBarDiv'>
					<input 
						className='searchBar'
						type='text' 
						value={this.state.toSearch}
						onChange={e=>this.setState({'toSearch':e.target.value})}
					/><em className='search-em' onClick={()=>this.setState({'showSearchBar':false})}>x</em>
					<Link to={'/search/'+this.state.toSearch}>
						<SearchIcon className='nav-icon'
							onClick={this.handleSearch.bind(this)}
						/>
					</Link>
				</div>}

				<Route path='/' exact >
					<SubMainScreen
					showCategories = {this.state.showCategories}
					openAboutUs={()=>this.setState({'screen':'AboutUs','mainPage':false})}
					handleChooseCatagory={this.handleChooseCatagory.bind(this)}
					handleOpenService={this.handleOpenService.bind(this)}
					login={this.state.login}/>
				</Route>


				<Route path='/signup' >
					<SignupScreen
						afterSignup={()=>this.setState({'screen':'SubMainScreen',
						'mainPage':true,'login':true})}
					/>
				</Route>

				<Route path='/login' >
					<LoginScreen
						afterLogin={()=>this.setState({'screen':'SubMainScreen',
						'mainPage':true,'login':true})}
					/>
				</Route>
								 
				
				<Route path='/messages' component={MessageScreen}/>


				<Route path='/posts' component={PostScreen}/>

				<Route path='/mysavedservices' component={MySavedServices}/>
				

				<Route path={'/search/'+this.state.toSearch}>
					<SearchScreen 
						handleOpenService={this.handleOpenService.bind(this)} 
						Name={this.state.toSearch}/>
				</Route>


				<Route path={'/account/'+localStorage.getItem('user223')} component={AccountScreen}/>

				<Route path={'/service/'+this.state.productId}>
					<Description
					afterAddingNewSms={this.afterAddingNewSms.bind(this)}
					productId={this.state.productId}/>
				</Route>

				<Route path='/myposts' component={MyPostScreen}/>
				
				<Route path='/privacy-policy' component={PPScreen}/>
				
				<Route path='/faq' component={FAQScreen}/>
				
				{this.state.screen==='AddNewSmsBox'?<AddNewSmsBox
				back={()=>{this.setState({'screen':'SubMainScreen','mainPage':true})}}
				provider={this.state.provider}/>:''}

				<Route path='/about' component={AboutUs}/>


				</Router>
				
			</div>
		);
	}
}

export default MainScreen;
