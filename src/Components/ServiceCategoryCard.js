import React from 'react';
import {Link } from 'react-router-dom';
import "./../css/serviceCategoryCard.css";


function ServiceCategoryCard(props){
	return(<>
	<Link  to={'/category/'+props.id}>
			<div className='service-catagory-card shadow'>
				<div>
					<img className='service-catagory-card-img' src={props.Image} alt='service catagory'/>
					<h5 className="category-name">{props.Name}</h5>
				</div>
			</div>
		</Link>
	</>);
}

export default ServiceCategoryCard;
