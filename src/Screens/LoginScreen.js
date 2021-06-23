import React,{ useState } from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';


function LoginScreen(props){

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const [hidePass, setHidePass] = useState(true);

	const [redirect, setRedirect] = useState(null);
	const [uploading, setUploading] = useState(false);

	const handleLogin=()=>{
		 if(username==='' || password===''){
			alert('All fields are required.');
		}else{
			const url = localStorage.getItem('url');

			setUploading(true);
			axios.post(url+'api-token-auth/',{
				'username':username,
				'password':password
			}).then(res=>{
				setUploading(false);
				if(res.data.error){
					alert(res.data.error)
				}else{
					localStorage.setItem('user223',username);
					localStorage.setItem('token',res.data.token);
					props.afterLogin();
					setRedirect('redirect');
				}
			}).catch(err=>{
				alert('Please provide valid details.'+err);
				setUploading(false);
			})
		}
	}

	if (redirect) return <Redirect to='/'/>;
	
	return(
		<div className='LoginScreen SignupScreen'>
			{uploading && <div className='uploading'>
								
				<span className='loading-bars'></span>
				<span className='loading-bars'></span>
				<span className='loading-bars'></span>
				<span className='loading-bars'></span>
				<span className='loading-bars'></span>
				<span className='loading-bars'></span>
				<span className='loading-bars'></span>
							
			</div>}
			
			<input type='text' value={username} 
				onChange={e=>{setUsername(e.target.value)}}
				placeholder='Username*' required
			/>

			<input type={hidePass?'password':'text'} 
				value={password} onChange={e=>{setPassword(e.target.value)}}
				placeholder='Password*' required
			/>
			<button onClick={()=>{setHidePass(!hidePass)}}>{hidePass?'show':'hide'}</button>
						
			<button className='signup-btn' 
				onClick={handleLogin}
			>Login</button>
		</div>	
	);
}

export default LoginScreen;
