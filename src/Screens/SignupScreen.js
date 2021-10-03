import React,{ useState } from 'react';
import axios from 'axios';
import {Link, Redirect} from 'react-router-dom';
import ShowError from '../Components/ShowError';
import "./../css/signup.css";
import { useSelector} from "react-redux";
import UploadingAnim from '../Components/UploadingAnim';


function SignupScreen(props){

	const { url } = useSelector(state=>state.isLogin);

	const [username, setUsername]     = useState('');
	const [email, setEmail]           = useState('');
	const [password1, setPassword1]   = useState('');
	const [password2, setPassword2]   = useState('');

	const [hidePass1, setHidePass1]   = useState(true);
	const [hidePass2, setHidePass2]   = useState(true);
	
	const [redirect, setRedirect] = useState(null);
	const [uploading, setUploading] = useState(false);

	const [errorMessage, setErrorMessage] = useState('');
	const [isError, setIsError] = useState(false);
	const [isGoodMessage, setIsGoodMessage] = useState(false);
	
	const handleSignup=(e)=>{
		e.preventDefault();
		if(password1 !== password2){
			setErrorMessage('Passwords are not matching.');
			setIsError(true);
		}else if(username==='' || password1==='' || email===''){
			setErrorMessage('Email, Username and Password fields are required.');
			setIsError(true);
		}else{
				let formData2 = new FormData();
				formData2.append('username',username);
				formData2.append('email',email);
				formData2.append('password',password1);
				

				setUploading(true);
				axios.post(url+'signupAsProvider/',formData2).then(res=>{
					setUploading(false);
					if(res.data.error){
						setErrorMessage(res.data.error)
						setIsError(true);
					}else{
						localStorage.setItem('user223',username);
						localStorage.setItem('token',res.data.token);
						setErrorMessage('Signup is successfull. please check your email inbox. There is something for you.')
						setIsGoodMessage(true);
						setTimeout(()=>{
							setRedirect(username);
						},5000);
					}
				}).catch(err=>{
					setErrorMessage('Please provide valid Username or password.');
					setIsError(true);
					setUploading(false);
				})
		}
	}

	if (redirect) return <Redirect to={'/account/'+redirect}/>;
	
	return(
		<div className='signup-main-container'>

			{isError && <ShowError message={errorMessage} onclose={()=>setIsError(false)}/>}
			{isGoodMessage && <ShowError message={errorMessage} goodMessage={true} onclose={()=>setIsError(false)}/>}

			{uploading && <UploadingAnim/>}
			
				<form className="signup-card">
				
				<div className="signup-input" >
					<input type='text' value={username} 
						onChange={e=>{setUsername(e.target.value)}}
						placeholder='Username* (in 1 word)' required
					/>
				</div>

				<div className="signup-input" >
					<input type='email' value={email} 
						onChange={e=>{setEmail(e.target.value)}}
						placeholder='Email*' required
					/>
				</div>
				
				<div className="signup-input" >
					<input type={hidePass1?'password':'text'} 
						value={password1} onChange={e=>{setPassword1(e.target.value)}}
						placeholder='Create Password*' required
					/>
					<button type="button" className="show-btn" onClick={()=>{setHidePass1(!hidePass1)}}>{hidePass1?'show':'hide'}</button>
				</div>
				
				<div className="signup-input" >
					<input type={hidePass2?'password':'text'} 
						value={password2} onChange={e=>{setPassword2(e.target.value)}}
						placeholder='Confirm Password*' required
					/>
					<button type="button" className="show-btn" onClick={()=>{setHidePass2(!hidePass2)}}>{hidePass2?'show':'hide'}</button>
				</div>

				<div>
					
					<button className='signup-btn' type="submit"
						onClick={handleSignup}
					>Signup</button>
				</div>

				<h6>Already have an account?<Link to="/login">login</Link></h6>


			</form>

		</div>
	);
}

export default SignupScreen;
