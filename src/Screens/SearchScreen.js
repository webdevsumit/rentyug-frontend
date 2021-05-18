import React,{Component} from 'react';
import ServiceCard from '../Components/ServiceCard';
import axios from 'axios';


class SearchScreen extends Component{
	state={
		'data':[],
	}

	componentDidMount(){
		const url = localStorage.getItem('url');
		axios.post(url+'search/',{'searchName':this.props.Name,'Username':localStorage.getItem('user223')})
		.then(res=>{
			this.setState({'data':res.data.data});
		})
	}
	
	render(){
		return(
			<div className='SearchScreen'>
				<h6>Results for {this.props.Name}</h6>
				<div>
				{this.state.data.map(d=>{return(
					<div key={d.id}>
						<ServiceCard 
						id={d.id}
						Image={d.MainImage} 
						Type={d.Type.Name} 
						PriceType={d.PriceType}
						ShopName={d.ShopName}
						Rating={d.Rating}
						OpenTime={d.OpenTime}
						closeTime={d.closeTime}
						handleOpenService={()=>this.props.handleOpenService(d.id)}
						VStatus = {d.VStatus}
						RentalStatus = {d.RentalStatus}
						/>
					</div>
				)})}
				</div>
				<div className='breakpoint'></div>
				<h4>{this.state.data.length===0 && 'No results!'}</h4>
				
			</div>
		);
	}
}

export default SearchScreen;
