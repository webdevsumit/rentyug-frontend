import React from 'react';
import ServiceCard from './ServiceCard';


function FamousServices(props){
	return(
		<div className='ServiceCatagories FamousServices'>
			<h3>Deal Of The Day</h3><em>get your best here.</em>
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
					handleOpenService={()=>props.handleOpenService(d.id)}
					VStatus = {d.VStatus}
					RentalStatus = {d.RentalStatus}
					/>
				</div>
			)})}
		</div>
	);
}

export default FamousServices;
