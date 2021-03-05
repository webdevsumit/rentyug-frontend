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
				<h3 onClick={()=>{setMsg('Okay.')}}>
				Okay.<h6>tab to use</h6></h3>
				
				<h3 onClick={()=>{setMsg('Cancel.')}}>
				Cancel.<h6>tab to use</h6></h3>
				
				<h3 onClick={()=>{setMsg('Comming in 10 min..')}}>
				Comming in 10 min.<h6>tab to use</h6></h3>
				
				<h3 onClick={()=>{setMsg('Comming in.')}}>
				Comming in.<h6>tab to use</h6></h3>
				
				<h3 onClick={()=>{setMsg('min.')}}>
				min.<h6>tab to use</h6></h3>
				
				<h3 onClick={()=>{setMsg('for Saving, Haircut.')}}>
				for Saving, Haircut.<h6>tab to use</h6></h3>
				
				<h3 onClick={()=>{setMsg('Full time.')}}>
				Full Time.<h6>tab to use</h6></h3>
				
				<h3 onClick={()=>{setMsg('15 min.')}}>
				15 min.<h6>tab to use</h6></h3>
				
				<h3 onClick={()=>{setMsg('20 min.')}}>
				20 min.<h6>tab to use</h6></h3>
				
				<h3 onClick={()=>{setMsg('30 min.')}}>
				30 min.<h6>tab to use</h6></h3>
				
				<h3 onClick={()=>{setMsg('1 hour..')}}>
				1 hour.<h6>tab to use</h6></h3>
				
			</div>
			<div className='toSend'>
				<textarea value={msg} onChange={e=>setMsg(e.target.value)}></textarea>
				<button onClick={()=>{props.handleSendingMsg(msg,props.msgingTo);setMsg('')}}><h4 className='button'>SEND</h4></button>
			</div>
		</div>
	);
}


export default MessageBox;
