import React,{useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';




function MySavedServices(){
	const [data, setData] = useState(null);
	useEffect(()=>{
	
		const url = localStorage.getItem('url');
        axios.post(url+'savedServices/',{
                   'Username':localStorage.getItem('user223')
                },{
                     headers: {
                          'Authorization': `Token ${localStorage.getItem('token')}`
                    }                                                                    
                 }).then(res=>{
                   setData(res.data.data);                                                         
     	})
	},[]);


     const removePost=(serviceId)=>{                                                          
             const url = localStorage.getItem('url');                                       
             axios.post(url+'savePost/',{                                                   
                     'serviceId':serviceId,                                                 
                     'Username':localStorage.getItem('user223')                             
                 },{
                         headers: {
                             'Authorization': `Token ${localStorage.getItem('token')}`
                     }
                 }).then(res=>{
                     setData(data.filter(d=>d.id!==serviceId));
             })
     }




	
	return(<div>
		<h4><em>Your saved services</em></h4>
		<br/>
		{data?<div>
			{data.map(ser=><div key={ser.id} className='service-card-input-post'>
				<Link to={'/service/'+ser.id}>
					<h5>{ser.ShopName}</h5>
				</Link>
				<button onClick={()=>removePost(ser.id)}>remove</button>

			</div>)}
		</div>:<em>loading...</em>}
		
		
	</div>)
}

export default MySavedServices;
