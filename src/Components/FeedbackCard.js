import React from 'react';
import "./../css/feedback-card.css";

function FeedbackCard(props){
	return(
		<div className='feedback-card'>
			<img className="feedback-card-img" src={props.Image} alt='Profile'/>
			<h6 className="feedback-card-username">@{props.Username}</h6>
			<p className="feedback-p">{props.Message}</p>
			<em className="feedback-card-date">Date: {props.Date}</em>
		</div>
	);
}

export default FeedbackCard;
