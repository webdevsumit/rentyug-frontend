import React from 'react';
import ServiceCategoryCard from './ServiceCategoryCard';
import "./../css/servicecategories.css";

function ServiceCategories(props){

	return(
			<div className='service-categories'>
				<h3>Categories</h3>
				<div className="card-container">
					{props.data.map(d=>{
						return(
							<ServiceCategoryCard key={d.id}
							id={d.id}
							Name={d.Name}
							Image={d.Image}/>
						)})}
					</div>
				<a href='sms:+91 7999004229'><em>Contact us to add new category.</em></a>
			</div>
		)
}

export default ServiceCategories;
