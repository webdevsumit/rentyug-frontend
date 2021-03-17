import React from 'react';
import ServiceCard from './ServiceCard';
import {Link } from 'react-router-dom';


function YouMayLike(props){
	return(
		<div className='ServiceCatagories FamousServices'>
			<h2>You May Like</h2>
			{props.data.map(d=>{return(
				<div key={d.id}>
					<Link to={'/service/'+d.id}>
					<ServiceCard 
					Image={d.MainImage} 
					Type={d.Type.Name} 
					ShopName={d.ShopName}
					Rating={d.Rating}
					PriceType={d.PriceType}
					OpenTime={d.OpenTime}
					closeTime={d.closeTime}
					handleOpenService={()=>props.handleOpenService(d.id)}
					VStatus = {d.VStatus}
					/>
					</Link>
					<button onClick={()=>props.removeItem(d.id)}>remove</button>
				</div>
			)})}
		</div>
	);
}

export default YouMayLike;
