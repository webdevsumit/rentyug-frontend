import React from 'react';
import {Link } from 'react-router-dom';
import "./../css/service-card.css";
import StarIcon from '@material-ui/icons/Star';


function ServiceCard(props){
	return(
		<div className='Service-card'>
		
			<div className="shadow">
				<h6><em>{props.Type}</em></h6>

				<h6>Rating :  {props.Rating} <StarIcon style={{fill:'orange',fontSize:'14px',marginTop:'5px'}}/> </h6>

				<Link className="react-link" to={'/service/'+props.id}>
					<div className="img-wrapper">
						<img src={props.Image} className="product-image" loading='lazy' alt='service'/>
					</div>
					<div>

						{props.VStatus && 
							<h6 className='VStatus'>verified</h6>
						}
						{props.RentalStatus? 
							<h6 className='VStatus'>Available</h6>
						:
							<h6 className='VStatus'>Unavailable</h6>
						}
						<h4 className="card-head">{props.ShopName}</h4>
						<p className="card-details" >Rent : {props.PriceType}</p>
						<p className="card-details" >Open Time to contact : {props.OpenTime}</p>
						<p className="card-details" >Close Time to contact : {props.closeTime}</p>
					</div>
				</Link>

				{props.fromYouMayLike && <button className='removeItem' 
							onClick={()=>props.removeItem(props.id)}>remove</button>}
			</div>
		</div>
	);
}

export default ServiceCard;
