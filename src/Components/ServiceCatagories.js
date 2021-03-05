import React,{useState} from 'react';
import ServiceCatagoryCard from './ServiceCatagoryCard';


function ServiceCatagories(props){

	const [open, setOpen] = useState(false);

	return(
		<div className='ServiceCatagories'>
			<h2>Categories</h2>
			<button onClick={()=>{setOpen(!open)}}>{open?'Hide':'Show Categories'}</button><br/>
			{open && <React.Fragment>
			{props.data.map(d=>{
				return(
				<div key={d.id}>
					<ServiceCatagoryCard Name={d.Name} 
					 Description={d.Description}
					 Image={d.Image}
					 handleChooseCatagory={()=>props.handleChooseCatagory(d.Name)}/>
				</div>
			)})}
			</React.Fragment>
			}
			<a href='tel:+91 7999004229'>Contact us to add new category.</a>
		</div>
	);
}

export default ServiceCatagories;
