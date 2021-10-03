import React from 'react';
import ServiceCard from './ServiceCard';
import "./../css/Famous-services.css";


function FamousServices(props){
	return(
		<div className="service-main-container">
			<h3>Deal Of The Day</h3>
			<em>get your best deal here.</em>
			<div className="services-container">
				{props.data?.map(d=>{return(
					<div key={d.id}>
						<ServiceCard 
						id={d.id}
						Image={d.MainImage} 
						Type={d.Type.Name} 
						ShopName={d.ShopName}
						Rating={d.Rating}
						PriceType={d.PriceType}
						OpenTime={d.OpenTime}
						closeTime={d.closeTime}
						VStatus = {d.VStatus}
						RentalStatus = {d.RentalStatus}
						/>
					</div>
				)})}
			</div>
		</div>
	);
}

export default FamousServices;
