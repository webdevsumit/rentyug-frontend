import React,{ useState } from 'react';
import axios from 'axios';


function LoginScreen(props){

	const [username, setUsername]     = useState('');
	const [password, setPassword]   = useState('');

	const [hidePass, setHidePass]   = useState(true);

	const handleLogin=()=>{
		 if(username==='' || password===''){
			alert('All fields are required.');
		}else{
			const url = localStorage.getItem('url');
			axios.post(url+'login/',{
				'username':username,
				'password':password
			}).then(res=>{
				if(res.data.error){
					alert(res.data.error)
				}else{
					localStorage.setItem('user223',username);
					props.afterLogin();
				}
			}).catch(err=>{
				alert('Please provide valid details.'+err);
			})
		}
	}
	return(
		<div className='LoginScreen SignupScreen'>
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
