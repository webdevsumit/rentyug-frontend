import React from 'react';
import MarkunreadRoundedIcon from '@material-ui/icons/MarkunreadRounded';
import SupervisorAccountRoundedIcon from '@material-ui/icons/SupervisorAccountRounded';
import "./../css/message-card.css";

function MessageCard(props){
	return(
		<div className='message-card'>
			<SupervisorAccountRoundedIcon/>
			<div className="message-card-div">
				<h6>@{props.Username}</h6>
				<h3>{props.Name}</h3>
			</div>
			{props.Unread && <p><MarkunreadRoundedIcon/></p>}
		</div>
	);
}

export default MessageCard;
