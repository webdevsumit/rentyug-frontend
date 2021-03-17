import React from 'react';
import {Link } from 'react-router-dom';


function ServiceCatagoryCard(props){
	return(
		<div className='ServiceCatagoryCard'>
			<div onClick={props.handleChooseCatagory}>
				<img src={props.Image} alt='service catagory'/>
				<Link to='/search'>
					<div>
						<h3>{props.Name}</h3>
						<p>{props.Description}</p>
					</div>
				</Link>
			</div>
		</div>
	);
}

export default ServiceCatagoryCard;
