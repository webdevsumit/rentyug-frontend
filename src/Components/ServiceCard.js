import React from 'react';
import {Link } from 'react-router-dom';


function ServiceCard(props){
	return(
		<div className='ServiceCatagoryCard ServiceCard'>
		
			<div onClick={props.handleOpenService}>

				<Link to={'/service/'+props.id}>
				<img src={props.Image} loading='lazy' alt='service'/>
				<div>
					{props.VStatus && <h6 className='VStatus'>verified</h6>}
					{props.RentalStatus? <h6 className='VStatus'>Available</h6>:<h6 className='VStatus'>Unavailable</h6>}
					<h4>{props.Rating}/5 rating , Category : {props.Type}</h4>
					<h3>{props.ShopName}</h3>
					<p>Rent : {props.PriceType}</p>
					<p>Open Time to contact : {props.OpenTime}</p>
					<p>Close Time to contact : {props.closeTime}</p>
				</div>

				</Link>

				{props.fromYouMayLike && <button className='removeItem' 
							onClick={()=>props.removeItem(props.id)}>remove</button>}
			</div>
		</div>
	);
}

export default ServiceCard;
