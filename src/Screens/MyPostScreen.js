import React,{useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';



function MyPostScreen(){

	const [data, setData] = useState(null);
	const [commentWord, setCommentWord] = useState('');
	const [replyWord, setReplyWord] = useState('');
	const [addPost, setAddPost] = useState(false);

	const [newImage, setNewImage] = useState(null);
	const [hasImage, setHasImage] = useState(false);
	const [newMedia, setNewMedia] = useState(null);
	const [newTittle, setNewTittle] = useState('');
	const [newText, setNewText] = useState('');
	const [selectedServiceId, setSelectedServiceId] = useState(null);

	const [preview, setPreview] = useState(false);
		
		
	
	useEffect(()=>{
		axios.post(localStorage.getItem('url')+'myPosts/', {
			'Username':localStorage.getItem('user223')
		},{
			headers :{
				'Authorization': `Token ${localStorage.getItem('token')}` 
			}
		}).then(res=>{
			setData(res.data);
		})
	},[]);



	const commentIt=(postId)=>{
		if (commentWord==='') alert('Please write something!');
		else{
			const url = localStorage.getItem('url');
			axios.post(url+'addPostComment/',{
					'postId':postId,
					'Username':localStorage.getItem('user223'),
					'comment':commentWord,
					'type':'myPost'
				},{
						headers: {
							'Authorization': `Token ${localStorage.getItem('token')}` 
					}
				}).then(res=>{
					setData(res.data.data);
					setCommentWord('');
			})	
		}
	}

	const removeComment=(commentId)=>{
			const url = localStorage.getItem('url');
			axios.post(url+'removePostComment/',{
					'commentId':commentId,
					'Username':localStorage.getItem('user223'),
					'type':'myPost'
				},{
						headers: {
							'Authorization': `Token ${localStorage.getItem('token')}` 
					}
				}).then(res=>{
					setData(res.data.data);
			})	
	}



	const replyIt=(commentId)=>{
		if (replyWord==='') alert('Please write something!');
		else{
			const url = localStorage.getItem('url');
			axios.post(url+'addPostCommentReply/',{
					'commentId':commentId,
					'Username':localStorage.getItem('user223'),
					'reply':replyWord,
					'type':'myPost'
				},{
						headers: {
							'Authorization': `Token ${localStorage.getItem('token')}` 
					}
				}).then(res=>{
					setData(res.data.data);
					setReplyWord('');
			})	
		}
	}

	const removeReply=(replyId)=>{
			const url = localStorage.getItem('url');
			axios.post(url+'removePostCommentReply/',{
					'replyId':replyId,
					'Username':localStorage.getItem('user223'),
					'type':'myPost'
				},{
						headers: {
							'Authorization': `Token ${localStorage.getItem('token')}` 
					}
				}).then(res=>{
					setData(res.data.data);
			})	
	}
	

	const likePost=(postId)=>{
			const url = localStorage.getItem('url');
			axios.post(url+'addPostLike/',{
					'postId':postId,
					'Username':localStorage.getItem('user223'),
					'type':'myPost'
				},{
						headers: {
							'Authorization': `Token ${localStorage.getItem('token')}` 
					}
				}).then(res=>{
					setData(res.data.data);
			})	
	}

	

	const savePost=(postId)=>{
			const url = localStorage.getItem('url');
			axios.post(url+'savePost/',{
					'postId':postId,
					'Username':localStorage.getItem('user223')
				},{
						headers: {
							'Authorization': `Token ${localStorage.getItem('token')}` 
					}
				}).then(res=>{
					alert(res.data.msg);
			})	
	}

	const activatePostTogle=(postId,serviceId)=>{
			const url = localStorage.getItem('url');
			axios.post(url+'activatePostTogle/',{
					'postId':postId,
					'Username':localStorage.getItem('user223'),
					'serviceId':serviceId
				},{
						headers: {
							'Authorization': `Token ${localStorage.getItem('token')}` 
					}
				}).then(res=>{
					if (res.data.msg) alert(res.data.msg);
					else setData(res.data);
			})	

	}


	const addNewPost=()=>{
		if(newMedia===null && newImage===null) alert('You have to add Image or Media');
		else{
			if (newTittle==='') alert('You cannot put Tittle empty.');
			else{
				if (selectedServiceId===null) alert('please add services first.');
				else{
					let formData = new FormData();
					formData.append('Tittle',newTittle);
					formData.append('Image',newImage);
					formData.append('hasImage',hasImage);
					formData.append('Media',newMedia);
					formData.append('Text',newText);
					formData.append('selectedServiceId',selectedServiceId);
					formData.append('Username',localStorage.getItem('user223'));

					axios.post(localStorage.getItem('url')+'addNewPost/',formData,{
						headers:{
							'Authorization': `Token ${localStorage.getItem('token')}` 
						}
					}).then(res=>{
						if(res.data.msg) alert(res.data.msg);
						else{
							setData(res.data);
							setNewTittle('');
							setNewImage(null);
							setHasImage(false);
							setNewMedia(null);
							setNewText('');
							setSelectedServiceId(null);
							setAddPost(false);
						}
					})
				}
			}
		}
	}





	return(
		<div className='MyPostScreen'>
			<h3><em>Your posts</em></h3>
			{data?<div>
				{data.map(ser=><div key={ser.id}>
					{ser.Posts.map(post=><div key={post.id}>


		        		<div className='post'>
	                        <div className='posts-main-section'>
	                            <h3 className='post-tittle'>{post.Tittle}</h3>
	       						<h6><em>from service : {ser.ShopName}</em></h6>

	                            {post.HasImage?<img src={post.Image} alt='Video' className='post-media'/>:
			                    <video width="80%" height="auto" controls  muted className='post-media'
			                         poster={post.Image}>
	                                 <source src={post.Media} type="video/mp4"/>
	                                 <source src={post.Media} type="video/ogg"/>
	                                 <source src={post.Media} type="video/webm"/>
			                    </video>}
		                        <details>
		                           <summary>Description</summary>
		                           <p className='post-desc'>{post.Text}</p>
		                        </details>
					
		                        <div>
					               <button onClick={()=>likePost(post.id)}
					                   className = {post.LikedBy.filter(user=>user.username===localStorage.getItem('user223'))
		                                .length!==0 && 'liked'}
			                       >like {post.TotalLikes}</button>
					
			                       <button onClick={()=>savePost(post.id)}>save</button>
	                               <Link to={'/service/'+ser.id}><button>product</button></Link>
			                           <a href={"whatsapp://send?text="+localStorage.getItem('url')+"/service/"+ser.id}                                  
					                        className='whatsapp-share'                                                                                 
					                        data-action="share/whatsapp/share"                                                                         
					                        target="_blank">                                                                                           
					                        <button>Share to WhatsApp</button>                                                                             
					                   </a>                                                                                                               
					                                                                                                                                                   
					              </div>                                                                                                                 
			                  </div>                                                                                                                     
					          <details className='post-comment-section'>                                                                                 
					                <summary>Comments {post.Comments.length}</summary>                                                                                            
					                <div className='post-comment-section-div'>                                                                             
					                   <textarea rows='3' cols='25' value={commentWord} onChange={(e)=>setCommentWord(e.target.value)}                    
					                       placeholder='Write you comment here.'></textarea>                                                              
					                   <button onClick={()=>commentIt(post.id)}>comment</button>                                                         
					                                                                                                                                                    
					                   {post.Comments.map(comment=><div key={comment.id} className='post-comment'>                                        
					                   <p className='post-comment-text'>
					                   <em className='post-user'>@{comment.Username}</em>                                                 
					                   
					                      {comment.Username===localStorage.getItem('user223') && <button                                                 
					                      onClick={()=>removeComment(comment.id)}>x</button>}
					                      <br/>
				                  			{comment.Comment}                                                    
				                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
										</p>
					                   <details>                                                                                                      
					                       <summary>replies {comment.Replies.length}</summary>                                                                                 
					                       <div>                                                                                                      
					                         {comment.Replies.map(reply=><div key={reply.id}>                                                       
					                          <p className='post-reply-text'>
						                          <em className='post-user'>@{reply.Username}</em>                                                   
					                          
						                            {comment.Username===localStorage.getItem('user223') && <button                                     
					  	                             onClick={()=>removeReply(reply.id)}>x</button>}
					           	                    <br/>                                           
					       	                 	  {reply.Reply}                                                  
					                               
					                           </p>                                                
					                          </div>)}                                                                                               
					                          <textarea rows='2' cols='25' value={replyWord}                                                         
					                               onChange={(e)=>setReplyWord(e.target.value)}                                                   
					                               placeholder='Write you reply here.'></textarea>                                                
					                           <button onClick={()=>replyIt(comment.id)}>reply</button>                                               
					                       </div>                                                                                                     
					                  </details>                                                                                                     
					                                                                                                                                             
		                            </div>)}                                                                                                           
	                              </div>                                                                                                                 
                            </details>                                                        
					     </div>
						<br/>
						<h6><em>Your post is activated free of cost upto 500 likes.</em></h6>
						<h6><em>After that you have to pay to reactivate that service post.</em></h6>
						<h6><em>Contact us to re-activate service(including all ppsts).</em></h6>					
						<h6><em>We can increase or decrease this (500) 
									according to audience reactions.</em></h6><br/>
						
						{post.Activated?<div>
							<em>post status : active</em><br/>
							<button onClick={()=>activatePostTogle(post.id,ser.id)}>Deactivate</button>
						</div>:<div>
							<em>post status : deactivated</em><br/>
							<button onClick={()=>activatePostTogle(post.id,ser.id)}>Re-activate</button>
						</div>}


					</div>)}





					
				</div>)}
			</div>:<em>loading...</em>}

			
			{addPost?<div className='new-post'>

				<img src={newImage?URL.createObjectURL(newImage):''} alt='' className='post-media'/><br/>

				<lable className='post-image-lable'>Image or Thumbnail for video</lable><br/>
				<input type='file' accept='image/*'
					onChange={e=>{setNewImage(e.target.files[0])}}/><br/>

				<input type='checkbox' value={hasImage} className='post-checkbox'
				onChange={()=>{setHasImage(!hasImage);setNewMedia(null);setPreview(false)}}/><em>image as post</em><br/>


				{!hasImage && <div>
					<lable className='post-image-lable'>or add video</lable><br/>
					<input type='file' accept='video/*'
						onChange={e=>{setNewMedia(e.target.files[0]);setPreview(true)}}/><br/>
				</div>}
						
				{preview && <video width='80%' controls muted className='post-media'>
					<source src={newMedia?URL.createObjectURL(newMedia):''} type="video/mp4"/>	
					<source src={newMedia?URL.createObjectURL(newMedia):''} type="video/ogg"/>	
					<source src={newMedia?URL.createObjectURL(newMedia):''} type="video/webm"/>	
				</video>}

				<input type='text' value={newTittle} placeholder='Tittle of the post'
					className='post-tittle-input'
					onChange={e=>setNewTittle(e.target.value)}/><br/>

				<textarea placeholder='Description' rows='8' cols='40' value={newText} 
					className='post-description-input'
					onChange={e=>setNewText(e.target.value)}></textarea>


				{data?<div>
					<h4>Select service</h4>
					{data.map(ser=><div key={ser.id} onClick={()=>setSelectedServiceId(ser.id)}
						className='service-card-input-post'>
						<h5>{ser.ShopName}</h5>
						{selectedServiceId===ser.id && <em>selected</em>}
					</div>)}
				</div>:<em>please add services first.</em>}
				<h6>
				<em>You cannot delete and  add more than 3 post per Service.</em>
				</h6>
				<button onClick={addNewPost}>add</button>
					

				
			</div>:<button onClick={()=>setAddPost(true)}>add new post</button>}

			
		
		</div>
	)
}

export default MyPostScreen;
