import React from 'react';
import MarkunreadRoundedIcon from '@material-ui/icons/MarkunreadRounded';
import SupervisorAccountRoundedIcon from '@material-ui/icons/SupervisorAccountRounded';

function MessageCard(props){
	return(
		<div className='MessageCard'>
			<SupervisorAccountRoundedIcon/>
			<div>
				<h6>@{props.Username}</h6>
				<h3>{props.Name}</h3>
			</div>
			{props.Unread && <p><MarkunreadRoundedIcon/></p>}
		</div>
	);
}

export default MessageCard;
