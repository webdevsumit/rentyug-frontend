import React,{useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import PostMedia from './../Components/PostMedia';


function PostScreen(){

	const [data, setData] = useState(null);
	const [commentWord, setCommentWord] = useState('');
	const [replyWord, setReplyWord] = useState('');
	
	
	useEffect(()=>{
		const url = localStorage.getItem('url');
		axios.post(url+'posts/',{
			'Username':localStorage.getItem('user223')
		},{
			headers: {
				'Authorization': `Token ${localStorage.getItem('token')}` 
			}
		}).then(res=>{
			setData(res.data.data);
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
					'type':'post'
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
					'type':'post'
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
					'type':'post'
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
					'type':'post'
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
					'type':'post'
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

	
	
	return(<div className='PostScreen'>
		<h3><em>Posts</em></h3>
		<div className='breakpoint'></div>

		{data?<div>
			{data.map(ser=><div key={ser.id}>
				{ser.Posts.map((post,i)=><div key={i}>

					<div className='post'>
						<div className='posts-main-section'>

							<h3 className='post-tittle'>{post.Tittle}</h3>
							
							<PostMedia
								HasImage={post.HasImage}
								Image={post.Image}
								Media={post.Media}
							/>
							
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
					
				</div>)}
			</div>)}
		</div>:<em>loading...</em>}
				
	</div>)
}
export default PostScreen;
