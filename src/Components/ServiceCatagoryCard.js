import React from 'react';
import {Link } from 'react-router-dom';


function ServiceCatagoryCard(props){
	return(
		<div onClick={props.handleChooseCatagory} className='nav-service-catagory-card'>
			<Link to={'/search/'+props.Name}>
				<img src={props.Image} alt='service catagory'/>
				<div>
					<h5>{props.Name}</h5>
					
				</div>
			</Link>
		</div>
	);
}

export default ServiceCatagoryCard;
