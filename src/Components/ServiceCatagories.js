import React from 'react';
import ServiceCatagoryCard from './ServiceCatagoryCard';

function ServiceCatagories(props){

	if (props.showCategories) return(
			<div className='nav-categories'>
				<h6>Categories</h6>
				{props.data.map(d=>{
					return(
						<ServiceCatagoryCard key={d.id} Name={d.Name} 
						 Description={d.Description}
						 Image={d.Image}
						 handleChooseCatagory={()=>props.handleChooseCatagory(d.Name)}/>
					)})}
				<a href='sms:+91 7999004229'>Contact us to add new category.</a>
			</div>
		);

	return(null);
}

export default ServiceCatagories;
