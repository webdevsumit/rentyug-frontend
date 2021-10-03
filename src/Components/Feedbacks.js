import React from 'react';
import FeedbackCard from './FeedbackCard';
import "./../css/feedback.css";

function Feedbacks(props){
	return(
		<div className='Feedbacks'>
			<h3>What users think about us</h3>
			<div className='feedback-container'>
				{props.data.map(d=>{return(
					<div key={d.id}>
						<FeedbackCard
						Image={d.Feedback.Image.Image}
						Username={d.Feedback.User}
						Message={d.Feedback.Message}
						Date={d.Feedback.Date}
						/>
					</div>
				)})}
			</div>
		</div>
	);
}

export default Feedbacks;
