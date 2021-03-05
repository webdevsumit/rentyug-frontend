import React,{Component} from 'react';
import Navbar from '../Components/Navbar';
import SubMainScreen from './SubMainScreen';
import SearchScreen from './SearchScreen';
import MessageScreen from './MessageScreen';
import SignupScreen from './SignupScreen';
import LoginScreen from './LoginScreen';
import AccountScreen from './AccountScreen';
import Description from './Description';
import AddNewSmsBox from './addNewSmsBox'
import AboutUs from './AboutUs';

import axios from 'axios';

class MainScreen extends Component{
	state={
		'login':false,
		'toSearch':'',
		'screen':'',
		'mainPage':true,
		'productId':'',
		'provider':'',
	}

	componentDidMount(){
		const user = localStorage.getItem('user223');

		localStorage.setItem('url','http://127.0.0.1:8000/');
		
		if((user===null) || (user==='')){
			this.setState({'screen':'SubMainScreen','login':false});
		}else{
			this.setState({'screen':'SubMainScreen','login':true});
		}
	}
	
	handleLogout(){
		const url = localStorage.getItem('url');
		axios.get(url+'logout/').then(res=>{
			this.setState({'screen':'SubMainScreen','login':false,'mainPage':true});
			localStorage.removeItem('user223');
		})
	}

	handleSearch(){
		var input = prompt('Search here by name/catagory/search tags/etc :');
		this.setState({'toSearch':input});
		if(input !== null && input !== ''){
			this.setState({'screen':'SearchScreen','mainPage':false});
		}
	}

	handleOpenService(id){
		if (this.state.login) this.setState({'screen':'Description','mainPage':false,'productId':id});
		else alert('Please Signup or Login');
	}

	handleChooseCatagory(name){
		this.setState({'toSearch':name,'screen':'SearchScreen','mainPage':false});
	}

	afterAddingNewSms(user,provider){
		this.setState({'screen':'AddNewSmsBox','mainPage':false,'provider':provider});
	}
	
	render(){
		return(
			<div className='MainScreen'>
				{localStorage.setItem('Username','sumit')}
				<Navbar 
				 handleMessages={()=>this.setState({'screen':'MessageScreen','mainPage':false})}
				 handleLogin={()=>this.setState({'screen':'LoginScreen','mainPage':false})}
				 handleSignup={()=>this.setState({'screen':'SignupScreen','mainPage':false})}
				 handleAccount={()=>this.setState({'screen':'AccountScreen','mainPage':false})}
				 handleLogout={this.handleLogout.bind(this)}
				 handleAboutUs={()=>this.setState({'screen':'AboutUs','mainPage':false})}
				 login={this.state.login}
				/>
				<div className='breakpoint'></div>

				{this.state.mainPage?'':<button 
				className='search-btn'
				onClick={()=>this.setState({'screen':'SubMainScreen','mainPage':true})}
				>Back</button>}
				
				<button 
				onClick={this.handleSearch.bind(this)} 
				className='search-btn'>Search</button>


				
				{this.state.screen==='SubMainScreen'?<SubMainScreen
				openAboutUs={()=>this.setState({'screen':'AboutUs','mainPage':false})}
				handleChooseCatagory={this.handleChooseCatagory.bind(this)}
				handleOpenService={this.handleOpenService.bind(this)}
				login={this.state.login}/>:''}
				
				{this.state.screen==='SignupScreen'?<SignupScreen
							     afterSignup={()=>this.setState({'screen':'SubMainScreen',
							     'mainPage':true,'login':true})}
								 />:''}
								 
				{this.state.screen==='LoginScreen'?<LoginScreen
							     afterLogin={()=>this.setState({'screen':'SubMainScreen',
							     'mainPage':true,'login':true})}
								 />:''}
								 
				{this.state.screen==='MessageScreen'?<MessageScreen/>:''}
				
				{this.state.screen==='SearchScreen'?<SearchScreen 
								handleOpenService={this.handleOpenService.bind(this)} 
								Name={this.state.toSearch}/>:''}

				{this.state.screen==='AccountScreen'?<AccountScreen/>:''}
				
				{this.state.screen==='Description'?<Description
				afterAddingNewSms={this.afterAddingNewSms.bind(this)}
				productId={this.state.productId}/>:''}
				
				{this.state.screen==='AddNewSmsBox'?<AddNewSmsBox
				back={()=>{this.setState({'screen':'SubMainScreen','mainPage':true})}}
				provider={this.state.provider}/>:''}

				{this.state.screen==='AboutUs'?<AboutUs/>:''}
				
			</div>
		);
	}
}

export default MainScreen;
