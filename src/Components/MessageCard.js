import React from 'react';


function MessageCard(props){
	return(
		<div className='MessageCard'>
			<div>
				<h6>@{props.Username}</h6>
				<h3>{props.Name}</h3>
			</div>
			{props.Unread?<p>!</p>:''}
		</div>
	);
}

export default MessageCard;
