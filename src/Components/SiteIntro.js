import React,{useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

function SiteIntro(props){

	const [logo, setLogo] = useState('');
	useEffect(()=>{
		const url = localStorage.getItem('url');
		axios.get(url+'logo/').then(res=>{
			setLogo(res.data[0].Logo);
		}); 
	},[])
	
	return(
		<div className='SiteIntro'>
			<div className='breakpoint'></div>
			<div className='breakpoint'></div>
			<div className='breakpoint'></div>
			<div className='breakpoint'></div>
			<div>
			<img className='logo' src={logo} alt='logo'/>
			</div>
			
			<h1>Our First renting social media</h1>
			
			<div className='breakpoint'></div>
			<div className='breakpoint'></div>
			<div className='breakpoint'></div>
			<div className='breakpoint'></div>
			<div className='breakpoint'></div>
			
			<p>Now you can <b>make money</b> by your old things.</p>
			<p>Just by giving it on <b>rent</b>.</p>
			
			<div className='breakpoint'></div>
			<div className='breakpoint'></div>
			<div className='breakpoint'></div>
			<div className='breakpoint'></div>
			<div className='breakpoint'></div>
			
			<p>Get things that you need at <b>low price</b> with <b>verification</b>.</p>
			<p> Take it on <b>rent</b>  or <b>buy</b> it.</p>
			<br/>
			
			<em>NOTE: You can find the verification tag on product if the details given are true. 
			Details with no tag may or may not be true. </em>
			
			<div className='breakpoint'></div>
			<div className='breakpoint'></div>
			<div className='breakpoint'></div>
			<div className='breakpoint'></div>
			<div className='breakpoint'></div>
			
			<p>You can also make money by just shipping the product.</p>
			<em>(comming soon)</em>
			
			<div className='breakpoint'></div>
			<div className='breakpoint'></div>
			<div className='breakpoint'></div>
			
			<a href='tel:+91 7999004229'>Customer care</a>
			
			<div className='breakpoint'></div>
			
			<Link to='/about'><button onClick={props.openAboutUs}>Read more.</button></Link>
		</div>
	);
}

export default SiteIntro;
