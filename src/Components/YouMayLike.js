import React from 'react';
import ServiceCard from './ServiceCard';


function YouMayLike(props){
	return(
		<div className='ServiceCatagories FamousServices'>
			<h2>You May Like</h2>
			{props.data.map(d=>{return(
				<div key={d.id}>
					<ServiceCard 
					Image={d.MainImage} 
					Type={d.Type.Name} 
					ShopName={d.ShopName}
					Rating={d.Rating}
					PriceType={d.PriceType}
					OpenTime={d.OpenTime}
					closeTime={d.closeTime}
					handleOpenService={()=>props.handleOpenService(d.id)}
					/>
					<button onClick={()=>props.removeItem(d.id)}>remove</button>
				</div>
			)})}
		</div>
	);
}

export default YouMayLike;
