import React from 'react';

function FeedbackCard(props){
	return(
		<div className='FeedbackCard'>
			<img src={props.Image} alt='Profile'/>
			<h6>@{props.Username}</h6>
			<p>{props.Message}</p>
			<em>Date: {props.Date}</em>
		</div>
	);
}

export default FeedbackCard;
