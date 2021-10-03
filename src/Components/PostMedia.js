import React from 'react';

function PostMedia(props){
	return(<div>
	
				{props.HasImage?<img src={props.Image} alt='Video' className='post-media'/>:
		       	  <video width="80%" height="auto" controls className='post-media'
		       	  	loading='lazy'
                      poster={props.Image}>
            	      <source src={props.Media} loading='lazy' type="video/mp4"/>
            	      <source src={props.Media} loading='lazy'type="video/ogg"/>
          	 	      <source src={props.Media} loading='lazy' type="video/webm"/>
                 </video>}

	</div>)
}

export default PostMedia;
