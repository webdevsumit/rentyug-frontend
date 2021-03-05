import React from 'react';


function ServiceCatagoryCard(props){
	return(
		<div className='ServiceCatagoryCard'>
			<div onClick={props.handleChooseCatagory}>
				<img src={props.Image} alt='service catagory'/>
				<div>
					<h3>{props.Name}</h3>
					<p>{props.Description}</p>
				</div>
			</div>
		</div>
	);
}

export default ServiceCatagoryCard;
