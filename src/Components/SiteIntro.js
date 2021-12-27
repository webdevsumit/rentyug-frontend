import React,{useEffect, useRef} from 'react';
import {Link} from 'react-router-dom';
import "./../css/siteintro.css";

function SiteIntro(props){

	let mainHead = useRef(null);
	let mainHeadDes = useRef(null);
	let head1 = useRef(null);
	let customerLink = useRef(null);
	let leftButton = useRef(null);
	let middleButton = useRef(null);
	let rightButton = useRef(null);
	
	useEffect(()=>{
		window.addEventListener('scroll',e=>{
			
			if (window.pageYOffset<=5 && mainHead.current && mainHeadDes.current){
				mainHead.current.style.paddingTop = '30vh';
				mainHead.current.style.width = '100%';
				mainHeadDes.current.style.color = 'blue';
				
			}
			else if( mainHead.current && mainHeadDes.current) {
				mainHead.current.style.paddingTop = '0vh';
				mainHead.current.style.width = '300px';
				mainHeadDes.current.style.color = 'black';
			};
			
			if (window.pageYOffset>=5 && head1?.current?.style) {
				head1.current.style.opacity=1;
			}else{
				head1.current.style.opacity=0;
			}
		});
	},[]);
	
	return(
		<div className='SiteIntro'>
			<div className='SiteIntro-bg' style={{backgroundImage:"url('/img/rentyugbg.jpg')"}}>
			</div>
			
			<div className='SiteIntro-content'>
			
				<div className='breakpoint'></div>
				<div className='breakpoint'></div>
				
				<div className='img-div' ref={mainHead}>
					<img className='logo' src="./img/logo.png" alt='logo'/>
				</div>
				<h6 className='head-des' ref={mainHeadDes}>Our First renting social media</h6>
				<div className='intro-buttons'>
					<Link to='/login'><button ref={leftButton}>login</button></Link>
					<Link to='/signup'><button ref={middleButton}>signup</button></Link>
					<Link to='/about'><button ref={rightButton} onClick={props.openAboutUs}>about us</button></Link>
				</div>

				<div className='breakpoint'></div>
				<div className='breakpoint'></div>
				<div className='breakpoint'></div>

				<div ref={head1}  className='intro-heads'>
					<h4><b>GIVE or TAKE</b> anything on rent.<br/>
					Your unusable things can <b>HELP</b> someone.</h4>

					<div className='breakpoint'></div>
					
					<h4><b className='warning'>Our pupose </b>is to help those who cannot afford something important.<br/>
						like Good quality mic. for a <b>singer</b>.</h4>

					<br/>

					<div className='breakpoint'></div>
					
					<a ref={customerLink} href='tel:+91 7999004229'>Customer care</a>
					
					<div className='breakpoint'></div>
					<div className='breakpoint'></div>
					<div className='breakpoint'></div>
				</div>

			</div>
		</div>
	);
}

export default SiteIntro;
