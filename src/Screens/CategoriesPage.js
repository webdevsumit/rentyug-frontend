import React, {useState, useEffect} from "react";
import { useSelector } from "react-redux";

import axios from "axios";
import ServiceCategories from "../Components/ServiceCategories";

function CategoriesPage(){
    const [data, setData] = useState([]);

	const { url } = useSelector(state=>state.isLogin);

	useEffect(() => {
		
		axios.get(url+'getCategories/').then(res=>{
			setData(res.data.ServiceCatagories);
		})
	}, []);
    return(<>
        <ServiceCategories data={data}/>
    </>);
}

export default CategoriesPage;