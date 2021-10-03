import React, {useState, useEffect} from 'react';
import ServiceCard from './../Components/ServiceCard';
import "./../css/category-services.css";
import { useSelector } from "react-redux";
import LoadingAnim from '../Components/LoadingAnim';
import axios from 'axios';


function Category(){

    const [data, setData]  = useState(null);
    const [categoryName, setCategoryName]  = useState(null);
    const { url } = useSelector(store=>store.isLogin);

    useEffect(()=>{
        var product_id = window.location.href.split('/')[4];
        axios.get(url+'category/'+product_id).then(res=>{
            setData(res.data.data);
            setCategoryName(res.data.categoryName);
        })
    },[]);

 	return(<>
     {data?
		<div className="service-main-container">
			<h3>Get You Best Here.</h3>
			<div className="services-container">
				{data?.map(d=>{return(
					<div key={d.id}>
						<ServiceCard 
						id={d.id}
						Image={d.MainImage} 
						Type={d.Type.Name} 
						ShopName={d.ShopName}
						Rating={d.Rating}
						PriceType={d.PriceType}
						OpenTime={d.OpenTime}
						closeTime={d.closeTime}
						VStatus = {d.VStatus}
						RentalStatus = {d.RentalStatus}
						/>
					</div>
				)})}
			</div>
		</div>
        :
        <LoadingAnim/>}
	</>);
}

export default Category;
