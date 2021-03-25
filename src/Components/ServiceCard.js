import React from 'react';

function ServiceCard(props){
	return(
		<div className='ServiceCatagoryCard ServiceCard'>
			<div onClick={props.handleOpenService}>
				<img src={props.Image} alt='service'/>
				<div>
					{props.VStatus && <h6 className='VStatus'>verified</h6>}
					<h4>{props.Rating}/5 rating , Category : {props.Type}</h4>
					<h3>{props.ShopName}</h3>
					<p>Rent : {props.PriceType}</p>
					<p>Open Time to contact : {props.OpenTime}</p>
					<p>Close Time to contact : {props.closeTime}</p>
				</div>
			</div>
		</div>
	);
}

export default ServiceCard;
