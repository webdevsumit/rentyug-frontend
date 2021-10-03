import React,{ useEffect ,useState} from 'react';
import MessageCard from '../Components/MessageCard';
import MessageBox from './MessageBox';
import axios from 'axios';
import "./../css/message-screen.css";
import {useSelector} from "react-redux";


function MessageScreen(){
	
	const [unreaddata, setUnreadData] = useState([]);
	const [readdata, setReadData] = useState([]);
	const [msgBox, setMsgBox] = useState(false);

	const [msgingTo, setMsgingTo] = useState('');
	const { url } = useSelector(state=>state.isLogin);
	
	useEffect(()=>{
		
		axios.post(url+'messageBox/',{'Username':localStorage.getItem('user223')},{
						headers: {
							'Authorization': `Token ${localStorage.getItem('token')}` 
						}
					}).then(res=>{
			setUnreadData(res.data.filter(d=>d.UnreadMessages));
			setReadData(res.data.filter(d=>d.UnreadMessages===false));
		})
	},[msgBox]);

	
	return(
		<div className='message-screen'>
			{msgBox?
			
			<MessageBox 
				msgingTo={msgingTo}
				onClose={()=>setMsgBox(false)}
			/>
			
			:
			
			<div className="message-group-card">
				{unreaddata.map(d=>
				<div key={d.id} onClick={()=>{setMsgingTo(d.MessagePartner);setMsgBox(true)}}>
					<MessageCard 
						Username={d.Username}
						Name={d.MessagePartner}
						Unread = {d.UnreadMessages}
					/>
				</div>)}

				{readdata.map(d=>
				<div key={d.id} onClick={()=>{setMsgingTo(d.MessagePartner);setMsgBox(true)}}>
					<MessageCard 
						Username={d.Username}
						Name={d.MessagePartner}
						Unread = {d.UnreadMessages}
					/>
					</div>)}
			</div>
			}
		</div>
	);
}

export default MessageScreen;
