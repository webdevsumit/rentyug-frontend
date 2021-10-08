import React,{useState, useEffect, useRef} from 'react';
import "./../css/message-box.css";

import axios from 'axios';
import {useSelector, useDispatch } from "react-redux";
import { setUnreadMsg } from '../redux/isLogin'

function MessageBox(props){

	const dispatch = useDispatch();
	const [msg,setMsg] = useState('');
	const [count, setCount] = useState(0);
	const { url } = useSelector(state=>state.isLogin);

	const msgingTo = props.msgingTo;
	const [messages, setMessages] = useState([]);

	const timer = setTimeout(()=>setCount(count+1),5000);
	const scrollRef = useRef(null);
	
	const handleRegularRender =()=>{
		
		axios.post(url+'messages/',{
		'Username':localStorage.getItem('user223'),
		'MessagePartner':msgingTo
		},{
						headers: {
							'Authorization': `Token ${localStorage.getItem('token')}` 
						}
			}).then(res=>{
			setMessages(res.data.messages);
			dispatch(setUnreadMsg(res.data.unreadMsg));
		})
	}

	useEffect(()=>{
		handleRegularRender();
		scrollRef.current.scrollTo(0,scrollRef.current.scrollHeight);
		return(
			clearTimeout(timer)
		)
	},[count]);

	const handleSendMessage=e=>{
		e.preventDefault();

		setMsg('');
		axios.post(url+'addMessages/',{
			'SendBy':localStorage.getItem('user223'),
			'Message':msg,
			'RecievedBy':msgingTo
		},{
						headers: {
							'Authorization': `Token ${localStorage.getItem('token')}` 
						}
			}).then(res=>{
			setMessages(res.data);
		})
	}
	
	return(
		<div className='message-box-outer-wrapper'>
			<div className='message-box-outer'>
				<div className="head-div">
					<h3 onClick={props.onClose} className='back-cross'>X</h3>
					<h4 className="box-head">messaging to @{msgingTo}</h4>
				</div>

				<div className='msg-content' ref={scrollRef}>
					{messages.map(d=>{return(
						<div className={d.SendBy===localStorage.getItem('user223')?'msg':'msg friends-msg'} key={d.id}>
							<h6>@{d.SendBy}</h6>
							<p>{d.Message}</p>
							<h6><em>{d.DateTime}</em></h6>
						</div>
					)})}
					<em id="end">end here</em>
				</div>

				<form className='message-form'>
					<input placeholder="Type here..." class="message-input" value={msg} onChange={e=>setMsg(e.target.value)}/>
					<button type="submit" onClick={handleSendMessage}>send</button>
				</form>
			</div>
		</div>
	);
}


export default MessageBox;
