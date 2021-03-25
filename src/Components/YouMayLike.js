import React from 'react';
import ServiceCard from './ServiceCard';
import {Link } from 'react-router-dom';


function YouMayLike(props){
	return(
		<div className='ServiceCatagories'>
			<h3>You May Like</h3>
			<div className='YouMayLike'>
			{props.data.map(d=>{return(
				<div key={d.id}>
					<button className='removeItem' onClick={()=>props.removeItem(d.id)}>X</button>
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
					
				</div>
			)})}
			</div>
		</div>
	);
}

export default YouMayLike;
