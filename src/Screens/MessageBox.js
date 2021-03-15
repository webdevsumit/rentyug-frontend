import React,{useState, useEffect} from 'react';

function MessageBox(props){

	const [msg,setMsg] = useState('');
	const [count, setCount] = useState(0);

	const timer = setTimeout(()=>setCount(count+1),1000);

	useEffect(()=>{
		props.handleRegularRender(props.msgingTo);
		return(
			clearTimeout(timer)
		)
	},[count])
	
	return(
		<div className='MessageBox'>
			<h2>Message Box</h2>
			<h5>@{props.msgingTo}</h5>
			<a href='#dummyText' click><button>Go down</button></a>
			<div className='msgContent'>
			{props.data.map(d=>{return(
				<div className={d.SendBy===localStorage.getItem('user223')?'msg myMsg':'msg'} key={d.id}>
					<h6>@{d.SendBy}</h6>
					<p>{d.Message}</p>
					<h6><em>{d.DateTime}</em></h6>
				</div>
			)})}
			</div>
				
			<div className='dummyText' id='dummyText'>
				<h3 onClick={()=>{setMsg(msg+'Okay.')}}>
				Okay.</h3>
				
				<h3 onClick={()=>{setMsg(msg+'Wait')}}>
				Wait</h3>
				
				<h3 onClick={()=>{setMsg(msg+'Just for')}}>
				Just for</h3>
				
				<h3 onClick={()=>{setMsg(msg+'Yes.')}}>
				Yes.</h3>
				
				<h3 onClick={()=>{setMsg(msg+'No.')}}>
				No.</h3>
				
				<h3 onClick={()=>{setMsg(msg+'For')}}>
				For</h3>
				
				<h3 onClick={()=>{setMsg(msg+'1 month.')}}>
				1 month.</h3>
				
				<h3 onClick={()=>{setMsg(msg+'3 month.')}}>
				3 month.</h3>
				
				<h3 onClick={()=>{setMsg(msg+'5 month.')}}>
				5 month.</h3>
				
				<h3 onClick={()=>{setMsg(msg+'1 year.')}}>
				1 year.</h3>
				
			</div>
			<div className='toSend'>
				<textarea value={msg} onChange={e=>setMsg(e.target.value)}></textarea>
				<button onClick={()=>{props.handleSendingMsg(msg,props.msgingTo);setMsg('')}}><h4 className='button'>SEND</h4></button>
			</div>
		</div>
	);
}


export default MessageBox;
