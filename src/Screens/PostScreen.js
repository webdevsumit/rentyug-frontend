import React,{useState, useEffect} from 'react';
import axios from 'axios';
import {Link, Redirect} from 'react-router-dom';
import PostMedia from './../Components/PostMedia';

import FavoriteIcon from '@material-ui/icons/Favorite';
import SaveRoundedIcon from '@material-ui/icons/SaveRounded';
import { useSelector } from "react-redux";
import UploadingAnim from '../Components/UploadingAnim';
import LoadingAnim from '../Components/LoadingAnim';
import ShowError from '../Components/ShowError';
import "./../css/post.css";
import DeleteIcon from '@material-ui/icons/Delete';

function PostScreen(){

	const { isLogin, url } = useSelector(state=>state.isLogin);

	const [data, setData] = useState(null);
	const [commentWord, setCommentWord] = useState('');
	const [replyWord, setReplyWord] = useState('');
	const [uploading, setUploading] = useState(false);
	const [loadingMore, setLoadingMore] = useState(false);

	const [contentLoaded, setContentLoaded] = useState(0);
	const [allLoaded, setAllLoaded] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [isError, setIsError] = useState(false);
	const [notLogin, setNotLogin] = useState(false);
	
	useEffect(()=>{
		axios.post(url+'posts/',{},{
			headers: {
				'Authorization': `Token ${localStorage.getItem('token')}` 
			}
		}).then(res=>{
			setData(res.data);
			if (res.data.length>0)
				setContentLoaded(res.data[res.data.length-1].Posts[res.data[res.data.length-1].Posts.length-1].id+1);
			else setAllLoaded(true);
			
		}).catch(err=>{
			if (!isLogin) setNotLogin(true);
		})
	},[]);

	const morePosts=()=>{
		setLoadingMore(true);
		
		axios.post(url+'morePosts/',{
			'PostsStartId' : contentLoaded
		},{
			headers : {
				'Authorization': `Token ${localStorage.getItem('token')}`
			}
		}).then(res=>{
			const data = res.data;
			
			if (res.data.length>0){
				setContentLoaded(res.data[res.data.length-1].Posts[res.data[res.data.length-1].Posts.length-1].id+1);
				setData(val=>[...val,...data]);
			}
			else setAllLoaded(true);
			setLoadingMore(false);
		}).catch(err=>{
			setLoadingMore(false);
			setData(data=>data);
		});
	}

	const commentIt=(serviceId, postId)=>{
		if (commentWord===''){
			setIsError(true);
			setErrorMessage('Please write something!');
		}
		else{
			setUploading(true);
			axios.post(url+'addPostComment/',{
					'postId':postId,
					'comment':commentWord,
					'type':'post'
				},{
						headers: {
							'Authorization': `Token ${localStorage.getItem('token')}` 
					}
				}).then(res=>{
					setUploading(false);
					setData(data=>{
						data.map(ser=>{
							if (ser.id===serviceId){
								ser.Posts.map(post=>{
									if (post.id===postId){
										post.Comments = res.data
									}
									return post;
								})
							}
							return ser;
						})
						return data;
					});
					setCommentWord('');
			}).catch(err=>setData(data=>data))
		}
	}

	const removeComment=(serviceId,postId,commentId)=>{
			
			setUploading(true);
			axios.post(url+'removePostComment/',{
					'commentId':commentId,
					'postId':postId,
					'type':'post'
				},{
						headers: {
							'Authorization': `Token ${localStorage.getItem('token')}` 
					}
				}).then(res=>{
					setUploading(false);
					setData(data=>{
						data.map(ser=>{
							if (ser.id===serviceId){
								ser.Posts.map(post=>{
									if (post.id===postId){
										post.Comments = res.data;
									}
									return post;
								})
							}
							return ser;
						})
						return data;
					});
			}).catch(err=>{
				setData(data=>data);
				setUploading(false);
			})
	}


	const replyIt=(serviceId,postId,commentId)=>{
		if (replyWord===''){
			setIsError(true);
			setErrorMessage('Please write something!');
		}
		else{
			
			setUploading(true);
			axios.post(url+'addPostCommentReply/',{
					'commentId':commentId,
					'postId':postId,
					'reply':replyWord,
					'type':'post'
				},{
						headers: {
							'Authorization': `Token ${localStorage.getItem('token')}` 
					}
				}).then(res=>{
					setUploading(false);
					setData(data=>{
						data.map(ser=>{
							if (ser.id===serviceId){
								ser.Posts.map(post=>{
									if (post.id===postId){
										post.Comments = res.data;
									}
									return post;
								})
							}
							return ser;
						})
						return data;
					});
					setReplyWord('');
			}).catch(err=>{
				setData(data=>data);
				setUploading(false);
			})
		}
	}

	const removeReply=(serviceId, postId, replyId)=>{
			setUploading(true);
			axios.post(url+'removePostCommentReply/',{
					'replyId':replyId,
					'postId':postId,
					'type':'post'
				},{
						headers: {
							'Authorization': `Token ${localStorage.getItem('token')}` 
					}
				}).then(res=>{
					setUploading(false);
					setData(data=>{
						data.map(ser=>{
							if (ser.id===serviceId){
								ser.Posts.map(post=>{
									if (post.id===postId){
										post.Comments = res.data;
									}
									return post;
								})
							}
							return ser;
						})
						return data;
					});
			}).catch(err=>{
				setData(data=>data);
				setUploading(false);
			})
	}
	

	const likePost=(serviceId, postId)=>{
			
			axios.post(url+'addPostLike/',{
					'postId':postId,
					'type':'post'
				},{
						headers: {
							'Authorization': `Token ${localStorage.getItem('token')}` 
					}
				}).then(res=>{
					setData(data=>{
						data.map(ser=>{
							if (ser.id===serviceId){
								ser.Posts.map(post=>{
									if (post.id===postId){
										post.TotalLikes = res.data.TotalLikes;
										post.LikedBy=res.data.LikedBy;
									}
									return post;
								})
							}
							return ser;
						})
						return data;
					});
			}).catch(err=>{
				setData(data=>data);
				setUploading(false);
			})
	}

	

	const savePost=(serviceId)=>{
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
				setIsError(true);
				setErrorMessage(res.data.msg);
		}).catch(err=>{
			setData(data=>data);
			setUploading(false);
		})
	}
	
	if (notLogin) return <Redirect to='/login' />

	return(
		<div className='PostScreen'>

			{isError && <ShowError message={errorMessage} onclose={()=>setIsError(false)}/>}

			{uploading && <UploadingAnim/>}
			<h3><em>Posts</em></h3>
			<div className='breakpoint'></div>

			{data?
				<div>
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
									<p className='post-desc para-whitespace'>{post.Text}</p>
								</details>
								

								<div>

									{post.LikedBy.filter(user=>user.username===localStorage.getItem('user223'))
																			.length!==0?
									<button onClick={()=>likePost(ser.id, post.id)}
									className = 'liked'>
											
										<FavoriteIcon style={{fill: 'red'}}
										className='like-icon'/> {post.TotalLikes}
									</button>:
									<button onClick={()=>likePost(ser.id, post.id)}>
																			
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
											target="_blank" rel="noreferrer">
										<button>Share on WhatsApp</button>
									</a>
									
								</div>
							</div>

							<details className='post-comment-section'>
								<summary>Comments {post.Comments.length}</summary>

								<div className='post-comment-section-div'>
									<textarea rows='3' cols='25' value={commentWord} onChange={(e)=>setCommentWord(e.target.value)} 
										placeholder='Write you comment here.'></textarea>
									<button onClick={()=>commentIt(ser.id, post.id)}>comment</button>
									
									{post.Comments.map(comment=><div key={comment.id} className='post-comment'>
										<p className='post-comment-text para-whitespace'>
											<em className='post-user'>@{comment.Username}</em>

											{comment.Username===localStorage.getItem('user223') &&  <DeleteIcon className='cross-for-delete-search-name'
															onClick={()=>removeComment(ser.id, post.id, comment.id)}
															/>}
											<br/>
											{comment.Comment}
										</p>
										
										
										<details>
											<summary>replies {comment.Replies.length}</summary>
											<div>
												{comment.Replies.map(reply=><div key={reply.id}>
													<p className='post-reply-text para-whitespace'>
													<em className='post-user'>@{reply.Username}</em>
														{reply.Username===localStorage.getItem('user223') && <DeleteIcon className='cross-for-delete-search-name'
															onClick={()=>removeReply(ser.id, post.id, reply.id)}
															/>}
														<br/>
													{reply.Reply}
													</p>
												</div>)}
												<textarea rows='2' cols='25' value={replyWord} 
														onChange={(e)=>setReplyWord(e.target.value)} 
														placeholder='Write you reply here.'></textarea>
												<button onClick={()=>replyIt(ser.id, post.id, comment.id)}>reply</button>
											</div>
										</details>
										
									</div>)}
								</div>
							</details>
							
						</div>
						
					</div>)}
				</div>)}

				{loadingMore?
					<div>loading...</div>
				:
					<div>
						{allLoaded? 
							<div>You caught all.</div>
						:
							<button onClick={morePosts}>load more</button>
						}
					</div>}
				</div>
			:	
			<LoadingAnim/>}
		
	</div>)
}
export default PostScreen;

