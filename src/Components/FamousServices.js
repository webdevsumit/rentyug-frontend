import React from 'react';
import ServiceCard from './ServiceCard';
import {Link} from 'react-router-dom';


function FamousServices(props){
	return(
		<div className='ServiceCatagories FamousServices'>
			<h2>Services by Supporters .</h2><em>#supporting</em>
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
				</div>
			)})}
		</div>
	);
}

export default FamousServices;
