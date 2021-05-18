import React,{useState, useEffect, useRef} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

function SiteIntro(props){

	const [logo, setLogo] = useState('');

	let head1 = useRef(null);
	
	useEffect(()=>{

		window.addEventListener('scroll',handleScroll);
		
		const url = localStorage.getItem('url');
		axios.get(url+'logo/').then(res=>{
			setLogo(res.data[0].Logo);
		});
		
		return window.removeEventListener('scroll',handleScroll);
	},[])

	const handleScroll=e=>{
		if (e.pageY-e.clientY<=200) console.log('done');
		console.log(e.clientY);
		console.log(e.pageY);
	}
	
	return(
		<div className='SiteIntro'>
			<div className='SiteIntro-bg' style={{backgroundImage:"url('/img/rentyugbg.jpg')"}}>
			</div>
			
			<div className='SiteIntro-content'>
			
				<div className='breakpoint'></div>
				
				<div>
					<img className='logo' src={logo} alt='logo'/>
				</div>
				<h2 className='head-des'>Our First renting social media</h2>

				<div className='breakpoint'></div>
				
				<h3 ref={head1}>Now, you can <b>make money</b> with your old things.</h3>
				<h3>Just give them on <b>rent</b>.</h3>

				<div className='breakpoint'></div>
				
				<h3>Get things that you need at <b>low price</b> with <b>verification</b>.</h3>
				<h3> Take on <b>rent</b>  or <b>purchase</b>.</h3>
				<br/>
				
				<em>You can find the verification tag on product if the details given are true. 
				Details with no tag may or may not be true. </em>

				<div className='breakpoint'></div>
				
				<h3>You can also make money by shipping product.</h3>
				<em>(comming soon)</em>

				<div className='breakpoint'></div>
				
				<a href='tel:+91 7999004229'>Customer care</a>
				
				<div className='breakpoint'></div>
				
				<Link to='/login'><button>login</button></Link>
				<Link to='/signup'><button>signup</button></Link>
				<Link to='/about'><button onClick={props.openAboutUs}>about us</button></Link>
			</div>
		</div>
	);
}

export default SiteIntro;
