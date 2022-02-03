import React,{ useState } from 'react';
import axios from 'axios';
import {Link, Redirect} from 'react-router-dom';
import ShowError from '../Components/ShowError';
import "./../css/login.css";
import { setIsLogin} from '../redux/isLogin'
import {useSelector, useDispatch } from 'react-redux'
import UploadingAnim from '../Components/UploadingAnim';
import { Visibility, VisibilityOff } from '@material-ui/icons';


function LoginScreen(props){

	const dispatch = useDispatch();
	const { url} = useSelector(state=>state.isLogin);

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const [forgotEmail, setForgotEmail] = useState('');

	const [hidePass, setHidePass] = useState(true);

	const [redirect, setRedirect] = useState(null);
	const [uploading, setUploading] = useState(false);

	const [errorMessage, setErrorMessage] = useState('');
	const [isError, setIsError] = useState(false);

	const [forgotpass, setForgotpass] = useState(false);

	const handleLogin=(e)=>{
		e.preventDefault();
		if(username==='' || password===''){
			setErrorMessage('All fields are required.');
			setIsError(true);
		}else{

			setUploading(true);
			axios.post(url+'login/',{
				'username':username,
				'password':password
			}).then(res=>{
				setUploading(false);
				if(res.data.error){
					setErrorMessage(res.data.error);
					setIsError(true);
				}else{
					localStorage.setItem('user223',res.data.username);
					localStorage.setItem('token',res.data.token);
					if (window.location.href.split('/')[3]==="login")
						setRedirect('redirect');
					dispatch(setIsLogin(true));
				}
			}).catch(err=>{
				setErrorMessage('Username or Password is not correct.');
				setIsError(true);
				setUploading(false);
			})
		}
	}

	const handleForgotPass=(e)=>{
		e.preventDefault();
		if(username===''){
			setErrorMessage('All fields are required.');
			setIsError(true);
		}else{
			

			setUploading(true);
			axios.post(url+'forgotpass/',{
				'email':forgotEmail
			}).then(res=>{
				setUploading(false);
				if(res.data.error){
					setErrorMessage(res.data.error);
					setIsError(true);
				}else{
					setErrorMessage("Temporary password has been sent to your email. Use that and reset password from your account page.");
					setIsError(true);
				}
			}).catch(err=>{
				setErrorMessage('Temporarily it is not possible try again later.');
				setIsError(true);
				setUploading(false);
			})
		}
	}

	

	if (redirect) return <Redirect to='/'/>;
	
	return(
		<div className='main-container'>
			{isError && <ShowError message={errorMessage} onclose={()=>setIsError(false)}/>}
			{uploading && <UploadingAnim/>}
			<form className="login-card">
				{forgotpass? <>

				<div className="login-input">
					<input type='email' value={forgotEmail} autoFocus={true}
						onChange={e=>{setForgotEmail(e.target.value.toLowerCase().replace(/\s/g,''))}}
						placeholder='email id' required
					/>
				</div>

				<div className="login-input">	
					<button type="submit" className='login-btn' 
						onClick={handleForgotPass}
					>Get mail</button>
				</div>
				
				<h6>Go to login page.<b className="forgot-pass" onClick={()=>setForgotpass(false)}>login</b></h6>
				
				</>:<>

				<div className="login-input">
					<input type='text' value={username} autoFocus={true}
						onChange={e=>{setUsername(e.target.value.toLowerCase().replace(/\s/g,''))}}
						placeholder='username or email' required
					/>
				</div>
				
				<div className="login-input">
					<input type={hidePass?'password':'text'} 
						value={password} onChange={e=>{setPassword(e.target.value)}}
						placeholder='password' required
					/>
					<button className="show-btn" type='button' onClick={()=>{setHidePass(!hidePass)}}>{hidePass?<Visibility/>:<VisibilityOff/>}</button>
				</div>
				
				<div className="login-input">	
					<button type="submit" className='login-btn' 
						onClick={handleLogin}
					>Login</button>
				</div>
				<div>
					<h6>Do not have account yet?<Link to="/signup">signup</Link></h6>
					<p className="forgot-pass" onClick={()=>setForgotpass(true)}>forgot password</p>
				</div>
				
				</>}
			</form>
		</div>	
	);
}

export default LoginScreen;
