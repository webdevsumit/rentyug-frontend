import React from 'react';
import {Link} from 'react-router-dom';
import "./../css/footer.css";

function Footer(props){

	return(
		<div className='footer'>
			<div>
				<Link to='/faq'>FAQ</Link>
				<a href='https://www.termsandconditionsgenerator.com/live.php?token=oCoBuUOAu8Y0NVA8oWMhq1okQyOxdLOL'>T&C</a>
				<Link to='/privacy-policy'>Privacy Policy</Link>
			</div>
			<p>©saveyourtime2021</p>
		</div>
	);
}

export default Footer;
