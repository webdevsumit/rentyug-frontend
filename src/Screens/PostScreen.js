import React,{useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import PostMedia from './../Components/PostMedia';

import FavoriteIcon from '@material-ui/icons/Favorite';
import SaveRoundedIcon from '@material-ui/icons/SaveRounded';

function PostScreen(){

	const [data, setData] = useState(null);
	const [commentWord, setCommentWord] = useState('');
	const [replyWord, setReplyWord] = useState('');
	const [uploading, setUploading] = useState(false);
	const [loadingMore, setLoadingMore] = useState(false);

	const [contentLoaded, setContentLoaded] = useState(0);
	const [allLoaded, setAllLoaded] = useState(false);
	
	useEffect(()=>{
		const url = localStorage.getItem('url');
		if (localStorage.getItem('user223')){
		axios.post(url+'posts/',{
			'Username':localStorage.getItem('user223')
		},{
			headers: {
				'Authorization': `Token ${localStorage.getItem('token')}` 
			}
		}).then(res=>{
			setData(res.data.data);
			setContentLoaded(10);
		})
		}
	},[]);

	const morePosts=()=>{
		setLoadingMore(true);
		const url = localStorage.getItem('url');
		axios.post(url+'morePosts/',{
			'Username' : localStorage.getItem('user223'),
			'data_count' : contentLoaded
		},{
			headers : {
				'Authorization': `Token ${localStorage.getItem('token')}`
			}
		}).then(res=>{
			const data = res.data.data;
			if(data.length===0) setAllLoaded(true);
			setData(val=>[...val,...data]);
			setContentLoaded(val=>val+10);
			setLoadingMore(false);
		}).catch(err=>{
			setLoadingMore(false);
		});
	}

	const commentIt=(postId)=>{
		if (commentWord==='') alert('Please write something!');
		else{
			const url = localStorage.getItem('url');

			setUploading(true);
			axios.post(url+'addPostComment/',{
					'postId':postId,
					'Username':localStorage.getItem('user223'),
					'comment':commentWord,
					'type':'post'
				},{
						headers: {
							'Authorization': `Token ${localStorage.getItem('token')}` 
					}
				}).then(res=>{
					setUploading(false);
					setData(res.data.data);
					setCommentWord('');
			})	
		}
	}

	const removeComment=(commentId)=>{
			const url = localStorage.getItem('url');

			setUploading(true);
			axios.post(url+'removePostComment/',{
					'commentId':commentId,
					'Username':localStorage.getItem('user223'),
					'type':'post'
				},{
						headers: {
							'Authorization': `Token ${localStorage.getItem('token')}` 
					}
				}).then(res=>{
					setUploading(false);
					setData(res.data.data);
			})	
	}



	const replyIt=(commentId)=>{
		if (replyWord==='') alert('Please write something!');
		else{
			const url = localStorage.getItem('url');

			setUploading(true);
			axios.post(url+'addPostCommentReply/',{
					'commentId':commentId,
					'Username':localStorage.getItem('user223'),
					'reply':replyWord,
					'type':'post'
				},{
						headers: {
							'Authorization': `Token ${localStorage.getItem('token')}` 
					}
				}).then(res=>{
					setUploading(false);
					setData(res.data.data);
					setReplyWord('');
			})	
		}
	}

	const removeReply=(replyId)=>{
			const url = localStorage.getItem('url');

			setUploading(true);
			axios.post(url+'removePostCommentReply/',{
					'replyId':replyId,
					'Username':localStorage.getItem('user223'),
					'type':'post'
				},{
						headers: {
							'Authorization': `Token ${localStorage.getItem('token')}` 
					}
				}).then(res=>{
					setUploading(false);
					setData(res.data.data);
			})	
	}
	

	const likePost=(postId)=>{
			const url = localStorage.getItem('url');
			axios.post(url+'addPostLike/',{
					'postId':postId,
					'Username':localStorage.getItem('user223'),
					'type':'post'
				},{
						headers: {
							'Authorization': `Token ${localStorage.getItem('token')}` 
					}
				}).then(res=>{
					setData(res.data.data);
			})	
	}

	

	const savePost=(serviceId)=>{
			const url = localStorage.getItem('url');

			setUploading(true);
			axios.post(url+'savePost/',{
					'serviceId':serviceId,
					'Username':localStorage.getItem('user223')
				},{
						headers: {
							'Authorization': `Token ${localStorage.getItem('token')}` 
					}
				}).then(res=>{
					setUploading(false);
					alert(res.data.msg);
			})	
	}

	
	
	return(<div className='PostScreen'>

		{uploading && <div className='uploading'>
					
				<span className='loading-bars'></span>
				<span className='loading-bars'></span>
				<span className='loading-bars'></span>
				<span className='loading-bars'></span>
				<span className='loading-bars'></span>
				<span className='loading-bars'></span>
				<span className='loading-bars'></span>
				
			</div>}
		<h3><em>Posts</em></h3>
		<div className='breakpoint'></div>

		{data?<div>
			{data.map(ser=><div key={ser.id}>
				{ser.Posts.map((post,i)=><div key={i}>

					<div className='post'>
						<div className='posts-main-section'>

							<h3 className='post-tittle'>{post.Tittle}</h3>
							<h6><em>from : {ser.ShopName}</em></h6>
							<PostMedia
								HasImage={post.HasImage}
								Image={post.Image}
								Media={post.Media}
							/>
							{ser.VStatus && <h6 className='VStatus'>verified</h6>}
							{ser.RentalStatus? <h6 className='VStatus'>Available</h6>:<h6 className='VStatus'>Unavailable</h6>}
							
							<details>
								<summary>Description</summary>
								<p className='post-desc'>{post.Text}</p>
							</details>
							

							<div>

								{post.LikedBy.filter(user=>user.username===localStorage.getItem('user223'))
																		.length!==0?
								<button onClick={()=>likePost(post.id)}
								className = 'liked'>
										
									<FavoriteIcon style={{fill: 'red'}}
									  className='like-icon'/> {post.TotalLikes}
								</button>:
								<button onClick={()=>likePost(post.id)}>
																		
									<FavoriteIcon style={{fill: 'white'}}
									 className='like-icon'/> {post.TotalLikes}
								</button>}
								
								<button onClick={()=>savePost(ser.id)}>
								<SaveRoundedIcon className='like-icon' style={{fill:'white'}}/>
								Save</button>
								<Link to={'/service/'+ser.id}><button>Product</button></Link>
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
													{reply.Username===localStorage.getItem('user223') && <button 
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
					
				</div>)}
			</div>)}
			{loadingMore?<div>loading...</div>:!allLoaded && <button onClick={morePosts}>load more</button>}
		</div>:<em>{localStorage.getItem('user223')?<h1 className="loader">
									<span>{localStorage.getItem('user223')},</span>
									<span>we</span>
									<span>are</span>
									<span>loading</span>
									<span>the</span>
									<span>best</span>
									<span>for</span>
									<span>you</span>
							</h1>:<i>please login</i>}</em>}
				
	</div>)
}
export default PostScreen;

