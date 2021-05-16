import React,{Component} from 'react';
import  ServiceCatagories from '../Components/ServiceCatagories';
import FamousServices from '../Components/FamousServices';
import YouMayLike from '../Components/YouMayLike';
import Feedbacks from '../Components/Feedbacks';
import Footer from '../Components/Footer';
import SiteIntro from '../Components/SiteIntro';
import AddFeedback from '../Components/AddFeedback';
import axios from 'axios';

class SubMainScreen extends Component{
	state={
		
	}

	componentDidMount(){
		const url = localStorage.getItem('url');
		axios.post(url+'mainPageData/', {'user':localStorage.getItem('user223')}).then(res=>{
			this.setState(res.data);
		});
	}

	removeItem(id){
		const url = localStorage.getItem('url');
		axios.post( url+'removeItem/', 
		{
		'user':localStorage.getItem('user223'),
		'id':id
		},{
				  headers: {
				    'Authorization': `Token ${localStorage.getItem('token')}` 
				  }
		}).then(res=>{
			this.setState({'InterestedService':res.data.InterestedService});
		});

	}

	
	render(){
		return(
			<div>
				{this.state.ServiceCatagories?<div>
					
					{this.props.login?'':<SiteIntro openAboutUs={this.props.openAboutUs}/>}
					
					<ServiceCatagories
					 showCategories = {this.props.showCategories}
					 data={this.state.ServiceCatagories}
					 handleChooseCatagory={this.props.handleChooseCatagory}
					/>


					{this.state.InterestedService.Services && <YouMayLike
										removeItem={this.removeItem.bind(this)}
										data={this.state.InterestedService.Services} 
										handleOpenService={this.props.handleOpenService}/>}

					<h3>Services nearby you.</h3>
					<em>our engineers are working on it.</em>
					
					<FamousServices data={this.state.Plans[0].PlanServices} 
					handleOpenService={this.props.handleOpenService}/>

					
					

					<Feedbacks data={this.state.FrontPageFeedback}/>
					{this.props.login?<AddFeedback/>:<em>You can give feedback after signup/login.</em>}
					<hr/>
					<Footer/>
					
				</div>:<div><h6><em>loading...</em></h6></div>}
			</div>
		)
	}
}

export default SubMainScreen;
