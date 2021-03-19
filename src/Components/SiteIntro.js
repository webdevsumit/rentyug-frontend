import React,{useState, useEffect} from 'react';
import axios from 'axios';


function SiteIntro(props){

	const [logo, setLogo] = useState('');
	useEffect(()=>{
		const url = localStorage.getItem('url');
		axios.get(url+'logo/',{
				  headers: {
				    'Authorization': `Token ${localStorage.getItem('token')}` 
				  }
				}).then(res=>{
			setLogo(res.data[0].Logo);
		});
	},[])
	
	return(
		<div className='SiteIntro' style={{'background':'lightgreen'}}>
			<div>
			<img className='logo' src={logo} alt='logo'/>
			</div>
			
			<h1>A new  way of renting.</h1>
			
			<br/>
			<p>Let's make money together.</p>
			<p>Now you can <b>make money</b> by your old things. Just by giving it on <b>rent</b>.</p>
			<br/>
			<p>Get things that you need at <b>low price</b> with <b>verification</b>. Take it on <b>rent</b>  or <b>buy</b> it.</p>
			<p style={{'font-size':'10px'}}>NOTE: You can find the verification tag on product if the details given are true. 
			Details with no tag may or may not be true. Initially we are not responsible for your product
			but later we will add this feature. </p>
			<br/>
			<p>You can also make money by just shipping the product.(comming soon)</p>
			<br/>
			<a href='tel:+91 7999004229'>Customer care</a>
			<br/>
			<button onClick={props.openAboutUs}>Read more.</button>
		</div>
	);
}

export default SiteIntro;
