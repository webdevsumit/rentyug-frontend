import React,{Component} from 'react';
import ServiceCard from '../Components/ServiceCard';
import axios from 'axios';
import {Link} from 'react-router-dom';


class SearchScreen extends Component{
	state={
		'data':[],
	}

	componentDidMount(){
		const url = localStorage.getItem('url');
		axios.post(url+'search/',{'searchName':this.props.Name},{
				  headers: {
				    'Authorization': `Token ${localStorage.getItem('token')}` 
				  }
				})
		.then(res=>{
			this.setState({'data':res.data.data});
		})
	}
	
	render(){
		return(
			<div className='SearchScreen'>
				<h6>Results for {this.props.Name}</h6>

				{this.state.data.map(d=>{return(
					<div key={d.id}>
						<Link to={'/service/'+d.id}>
						<ServiceCard 
						Image={d.MainImage} 
						Type={d.Type.Name} 
						PriceType={d.PriceType}
						ShopName={d.ShopName}
						Rating={d.Rating}
						OpenTime={d.OpenTime}
						closeTime={d.closeTime}
						handleOpenService={()=>this.props.handleOpenService(d.id)}
						VStatus = {d.VStatus}
						/>
						</Link>
					</div>
				)})}
				<div className='breakpoint'></div>
				<h4>{this.state.data.length===0 && 'No results!'}</h4>
				
			</div>
		);
	}
}

export default SearchScreen;
