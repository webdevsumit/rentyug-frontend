import React,{ useEffect ,useState} from 'react';
import MessageCard from '../Components/MessageCard';
import MessageBox from './MessageBox';
import axios from 'axios';


function AddNewSmsBox(props){

	const [data, setData] = useState([]);
	const [messages, setMessages] = useState([]);
	const [msgBox, setMsgBox] = useState(false);
	const [msgingTo, setMsgingTo] = useState('x');

	useEffect(()=>{
		setMsgingTo(props.provider);
		const url = localStorage.getItem('url');
		axios.post(url+'messages/',{
		'Username':localStorage.getItem('user223'),
		'MessagePartner':props.provider
		},{
				  headers: {
				    'Authorization': `Token ${localStorage.getItem('token')}` 
				  }
		}).then(res=>{
			setMessages(res.data);
			setMsgBox(true);
		})
	},[]);


	const handleClick = msgMan=>{
		setMsgingTo(msgMan);
		const url = localStorage.getItem('url');
		axios.post(url+'messages/',{
			'Username':localStorage.getItem('user223'),
			'MessagePartner':msgMan
		},{
				  headers: {
				    'Authorization': `Token ${localStorage.getItem('token')}` 
				  }
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
		},{
				  headers: {
				    'Authorization': `Token ${localStorage.getItem('token')}` 
				  }
		}).then(res=>{
			setMessages(res.data);
		})
	}
	
	return(
		<div className='MessageScreen'>
			{msgBox?<div className='MessageBoxOuter'><h3
			className='cross'
			onClick={props.back}>X</h3><MessageBox 
			handleSendingMsg={handleSendingMsg}
			msgingTo={msgingTo}
			handleRegularRender={handleClick}
			data={messages}/></div>:<h1 className="loader">
										<span>{localStorage.getItem('user223')?
										localStorage.getItem('user223'):'Hey'},</span>
										<span>we</span>
										<span>are</span>
										<span>loading</span>
										<span>the</span>
										<span>best</span>
										<span>for</span>
										<span>you</span>
								</h1>}
			
			{data.map(d=><div key={d.id} onClick={()=>handleClick(d.MessagePartner)}><MessageCard 
			Username={d.Username}
			Name={d.MessagePartner}
			Unread = {d.UnreadMessages}
			/></div>)}
			
		</div>
	);
}

export default AddNewSmsBox;
