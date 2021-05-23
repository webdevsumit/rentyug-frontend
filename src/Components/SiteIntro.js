import React,{useState, useEffect, useRef} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

function SiteIntro(props){

	const [logo, setLogo] = useState('');

	let mainHead = useRef(null);
	let mainHeadDes = useRef(null);
	let head1 = useRef(null);
	let head2 = useRef(null);
	let head3 = useRef(null);
	let subHead1 = useRef(null);
	let subHead2 = useRef(null);
	let customerLink = useRef(null);
	let leftButton = useRef(null);
	let middleButton = useRef(null);
	let rightButton = useRef(null);
	
	useEffect(()=>{
		
		window.addEventListener('scroll',e=>{
			
			if (window.pageYOffset<=10 && mainHead.current && mainHeadDes.current){
				mainHead.current.style.paddingTop = '20vh';
				mainHead.current.style.width = '100%';
				
				mainHeadDes.current.style.color = 'blue';
				
			}
			else if( mainHead.current && mainHeadDes.current) {
				mainHead.current.style.paddingTop = '0vh';
				mainHead.current.style.width = '300px';
				
				mainHeadDes.current.style.color = 'black';
			};
			
			if (window.pageYOffset>=40 && head1.current) {
				head1.current.style.opacity=1;
				head1.current.style.transform='translatey(-50%)';
				head1.current.style.fontSize='18px';
				
			}
			else if(head1.current) {
				head1.current.style.opacity=0;
				head1.current.style.transform='translatey(0%)';
			};
			
			if (window.pageYOffset>=160 && head1.current && head2.current) {
				head1.current.style.opacity=0.7;
				head1.current.style.fontSize='16px';
				
				head2.current.style.opacity=1;
				head2.current.style.transform='translatey(-50%)';
				head2.current.style.fontSize='18px';
				
			}
			else if(head2.current) {
				head2.current.style.opacity=0;
				head2.current.style.transform='translatey(0%)';
			};
			
			if (window.pageYOffset>=230 && subHead1.current) {
				subHead1.current.style.opacity=1;
				subHead1.current.style.fontSize='16px';
				
			}
			else if(subHead1.current){
				subHead1.current.style.opacity=0;
			};
			
			if (window.pageYOffset>=280 && head2.current && subHead1.current && head3.current) {
				head2.current.style.opacity=0.7;
				head2.current.style.fontSize='16px';
				subHead1.current.style.opacity=0.5;
				subHead1.current.style.fontSize='14px';
			
				head3.current.style.opacity=1;
				head3.current.style.transform='translatey(-50%)';
				
			}
			else if(head3.current){
				head3.current.style.opacity=0;
				head3.current.style.transform='translatey(0%)';
				head3.current.style.fontSize='18px';
			};
			
			if (window.pageYOffset>=360 && subHead2.current) {
				subHead2.current.style.opacity=1;
				subHead2.current.style.fontSize='16px';
				
			}
			else if(subHead2.current){
				subHead2.current.style.opacity=0;
			};
			
			if (window.pageYOffset>=400 && customerLink.current) {
				customerLink.current.style.opacity=1;
				customerLink.current.style.fontSize='16px';
				
			}
			else if(customerLink.current){
				customerLink.current.style.opacity=0;
			};
			
			if (window.pageYOffset>=440 
				&& head3.current 
				&& subHead2.current 
				&& customerLink.current 
				&& leftButton.current 
				&& middleButton.current 
				&& rightButton.current) {
				
				head3.current.style.opacity=0.7;
				head3.current.style.fontSize='16px';
				subHead2.current.style.opacity=0.5;
				subHead2.current.style.fontSize='14px';
				customerLink.current.style.opacity=0.5;
				customerLink.current.style.fontSize='14px';
			
				leftButton.current.style.opacity=1;
				middleButton.current.style.opacity=1;
				rightButton.current.style.opacity=1;
				
			}
			else if(leftButton.current 
					&& middleButton.current 
					&& rightButton.current) {
					
				leftButton.current.style.opacity=0;
				middleButton.current.style.opacity=0;
				rightButton.current.style.opacity=0;
				
				leftButton.current.style.transform='translatex(-100%)';
				middleButton.current.style.transform='scale(0.5)';
				rightButton.current.style.transform='translatex(100%)';
				
			};
			
			if (window.pageYOffset>=620 && leftButton.current 
							&& middleButton.current 
							&& rightButton.current) {
							
				leftButton.current.style.transform='scale(1.2)';
				middleButton.current.style.transform='scale(1.2)';
				rightButton.current.style.transform='scale(1.2)';
			}
			else if(window.pageYOffset<=620 && window.pageYOffset>=440 && leftButton.current 
							&& middleButton.current 
							&& rightButton.current){
							
				leftButton.current.style.transform='scale(1)';
				middleButton.current.style.transform='scale(1)';
				rightButton.current.style.transform='scale(1)';
			}
		});
		
		const url = localStorage.getItem('url');
		axios.get(url+'logo/').then(res=>{
			setLogo(res.data[0].Logo);
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
					<img className='logo' src={logo} alt='logo'/>
				</div>
				<h2 className='head-des' ref={mainHeadDes}>Our First renting social media</h2>

				<div className='breakpoint'></div>
				<div className='breakpoint'></div>
				
				<h3 ref={head1}>Now, you can <b>make money</b> with your old things.<br/>
					Just give them on <b>rent</b>.</h3>

				<div className='breakpoint'></div>
				<div className='breakpoint'></div>
				
				<h3 ref={head2}>Get things that you need at <b>low price</b> with <b>verification</b>.<br/>
					Take on <b>rent</b>  or <b>purchase</b>.</h3>
					
				<br/>
				
				<em ref={subHead1}>You can find the verification tag on product if the details given are true. 
				Details with no tag may or may not be true. </em>

				<div className='breakpoint'></div>
				
				<h3 ref={head3}>You can also <b>make money</b> by shipping product.</h3>
				<em ref={subHead2}>(comming soon)</em>

				<div className='breakpoint'></div>
				
				<a ref={customerLink} href='tel:+91 7999004229'>Customer care</a>
				
				<div className='breakpoint'></div>
				
				<Link to='/login'><button ref={leftButton}>login</button></Link>
				<Link to='/signup'><button ref={middleButton}>signup</button></Link>
				<Link to='/about'><button ref={rightButton} onClick={props.openAboutUs}>about us</button></Link>
			</div>
		</div>
	);
}

export default SiteIntro;
