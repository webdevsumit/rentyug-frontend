import React from 'react';
import ServiceCard from './ServiceCard';


function YouMayLike(props){
	return(
		<div className='ServiceCatagories'>
			<h3>You May Like</h3>
			<div className='YouMayLike'>
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
					handleOpenService={()=>props.handleOpenService(d.id)}
					VStatus = {d.VStatus}
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
