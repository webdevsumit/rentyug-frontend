import React from 'react';
import ServiceCard from './ServiceCard';
import "./../css/you-may-like.css";


function YouMayLike(props){
	return(
		<div className='you-may-like-main-container'>
			<h3>Recent Viewed</h3>
			<div className='you-may-like-container'>
			{props.data.map(d=>{return(
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
					fromYouMayLike={true}
					removeItem={props.removeItem}
					/>
					
				</div>
			)})}
			</div>
		</div>
	);
}

export default YouMayLike;
