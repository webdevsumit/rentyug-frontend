import React,{Component} from 'react';
import ServiceCard from '../Components/ServiceCard';
import axios from 'axios';


class SearchScreen extends Component{
	state={
		'data':[],
	}

	componentDidMount(){
		const url = localStorage.getItem('url');
		axios.post(url+'search/',{'searchName':this.props.Name})
		.then(res=>{
			this.setState({'data':res.data.data});
		})
	}
	
	render(){
		return(
			<div className='SearchScreen'>
				<h6>Our developers working on nearby services.</h6>
				<h6>Results for {this.props.Name}</h6>

				{this.state.data.map(d=>{return(
					<div key={d.id}>
						<ServiceCard 
						Image={d.MainImage} 
						Type={d.Type.Name} 
						PriceType={d.PriceType}
						ShopName={d.ShopName}
						Rating={d.Rating}
						OpenTime={d.OpenTime}
						closeTime={d.closeTime}
						handleOpenService={()=>this.props.handleOpenService(d.id)}
						/>
					</div>
				)})}
				
			</div>
		);
	}
}

export default SearchScreen;
