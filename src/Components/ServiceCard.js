import React from 'react';

function ServiceCard(props){
	return(
		<div className='ServiceCatagoryCard ServiceCard'>
			<div onClick={props.handleOpenService}>
				<img src={props.Image} alt='service'/>
				<div>
					<h6>{props.Rating}/5 rating , Category : {props.Type}</h6>
					<p>{props.ShopName}</p>
					<h6>Rent : {props.PriceType}</h6>
					<h6>Open Time to contact : {props.OpenTime}</h6>
					<h6>Close Time to contact : {props.closeTime}</h6>
				</div>
			</div>
		</div>
	);
}

export default ServiceCard;
