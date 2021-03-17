import React,{ useEffect ,useState} from 'react';
import MessageCard from '../Components/MessageCard';
import MessageBox from './MessageBox';
import axios from 'axios';


function MessageScreen(){

	const [data, setData] = useState([]);
	const [messages, setMessages] = useState([]);
	const [msgBox, setMsgBox] = useState(false);
	const [msgingTo, setMsgingTo] = useState('x');
	
	
	useEffect(()=>{
		const url = localStorage.getItem('url');
		axios.post(url+'messageBox/',{'Username':localStorage.getItem('user223')}).then(res=>{
			setData(res.data);
		})
	},[msgBox]);

	const handleClick = msgMan=>{
		setMsgingTo(msgMan);
		const url = localStorage.getItem('url');
		axios.post(url+'messages/',{
		'Username':localStorage.getItem('user223'),
		'MessagePartner':msgMan
		}).then(res=>{
			setMessages(res.data);
			setMsgBox(true);
		})
	}

	const handleSendingMsg=(msg,msgMan)=>{
		const url = localStorage.getItem('url');
		axios.post(url+'addMessages/',{
			'SendBy':localStorage.getItem('user223'),
			'Message':msg,
			'RecievedBy':msgMan
		}).then(res=>{
			setMessages(res.data);
		})
	}
	
	return(
		<div className='MessageScreen'>
			{msgBox?<div className='MessageBoxOuter'><h3
			className='cross'
			onClick={()=>setMsgBox(false)}>X</h3><MessageBox 
			handleSendingMsg={handleSendingMsg}
			msgingTo={msgingTo}
			handleRegularRender={handleClick}
			data={messages}/></div>:<React.Fragment>
			
				{data.map(d=><div key={d.id} onClick={()=>handleClick(d.MessagePartner)}>
				<MessageCard 
				Username={d.Username}
				Name={d.MessagePartner}
				Unread = {d.UnreadMessages}
				/>
				</div>)}
				
			</React.Fragment>}
		</div>
	);
}

export default MessageScreen;
