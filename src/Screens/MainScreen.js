import React,{useEffect, useState} from 'react';
import Navbar from '../Components/Navbar';
import CategoriesPage from './CategoriesPage';
import SubMainScreen from './SubMainScreen';
import SearchScreen from './SearchScreen';
import MessageScreen from './MessageScreen';
import SignupScreen from './SignupScreen';
import LoginScreen from './LoginScreen';
import AccountScreen from './AccountScreen';
import Description from './Description';
import AboutUs from './AboutUs';
import PostScreen from './PostScreen';
import MyPostScreen from './MyPostScreen';
import MySavedServices from './MySavedServices';
import PPScreen from './PPScreen';
import FAQScreen from './FAQScreen';

import {BrowserRouter as Router, Route} from 'react-router-dom';

import RequestPage from './RequestPage';
import { setIsLogin, setUrl} from '../redux/isLogin'
import {useDispatch } from 'react-redux'
import Category from './Category';



function MainScreen(){

	const dispatch = useDispatch();
	dispatch(setUrl('https://rentyug-backend.live/'));
	//dispatch(setUrl('http://127.0.0.1:8000/'));
	//dispatch(setUrl('http://127.0.0.1/'));

	useEffect(()=>{
		const user = localStorage.getItem('user223');
		if((user===null) || (user==='')) dispatch(setIsLogin(false));
		else dispatch(setIsLogin(true));
	},[])

	return(<>
			<Router>
				<Navbar/>
				<div className='breakpoint'></div>
				<Route path='/' exact component={SubMainScreen}/>
				<Route path='/signup' component={SignupScreen}/>
				<Route path='/login' component={LoginScreen}/>
				<Route path='/messages' component={MessageScreen}/>
				<Route path='/categories' component={CategoriesPage}/>
				<Route path='/category' component={Category}/>
				<Route path='/posts' component={PostScreen}/>
				<Route path='/mysavedservices' component={MySavedServices}/>
				<Route path='/request-page' component={RequestPage}/>
				<Route path={'/search'} component={SearchScreen}/>
				<Route path='/account/' component={AccountScreen}/>
				<Route path={'/service/'}component={Description}/>
				<Route path='/myposts' component={MyPostScreen}/>
				<Route path='/privacy-policy' component={PPScreen}/>
				<Route path='/faq' component={FAQScreen}/>
				<Route path='/about' component={AboutUs}/>
			</Router>
			
		</>
	);
}

export default MainScreen;
