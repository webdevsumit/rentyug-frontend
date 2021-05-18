import React from 'react';
import {Link } from 'react-router-dom';

import StarIcon from '@material-ui/icons/Star';


function ServiceCard(props){
	return(
		<div className='ServiceCatagoryCard ServiceCard'>
		
			<div onClick={props.handleOpenService}>
				<h6><em>{props.Type}</em></h6>
				<h6>Rating :  {props.Rating} <StarIcon style={{fill:'orange',fontSize:'14px',marginTop:'5px'}}/> </h6>
				<Link to={'/service/'+props.id} style={{'background':'transparent'}}>
				<img src={props.Image} loading='lazy' alt='service'/>
				<div style={{'background':'transparent'}}>
					{props.VStatus && <h6 className='VStatus'>verified</h6>}
					{props.RentalStatus? <h6 className='VStatus'>Available</h6>:<h5 className='VStatus'>Unavailable</h5>}
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
