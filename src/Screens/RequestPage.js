import React,{useState, useEffect} from "react";
import axios from 'axios';
import './../css/requestPage.css';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { useSelector } from "react-redux";
import MessageBox from "./MessageBox";
import { Redirect } from "react-router-dom";
import ShowError from "../Components/ShowError";
import UploadingAnim from "../Components/UploadingAnim";


function RequestPage(){

    const { isLogin, url } = useSelector(state=>state.isLogin);
    
    const [data, setData] = useState(null);
    const [filteredData, setFilteredData] = useState(null);
    const [isCompleted, setIsCompleted] = useState(false);
    const [searchedData, setSearchedData] = useState('');

    const [addingNew, setAddingNew] = useState(false);

    const [newTitle, setNewTitle] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [newContactInfo, setNewContactInfo] = useState('');
    const [msgBox, setMsgBox] = useState(false);

    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [uploading, setUploading] = useState('');
    
    
    useEffect(()=>{
        axios.get(url+'requestedServices/', {'user':localStorage.getItem('user223')},{
			headers: {
				'Authorization': `Token ${localStorage.getItem('token')}` 
			}
		}).then(res=>{
			setData(res.data.data);
            setFilteredData(res.data.data);
		})
    },[]);

    const handleFilter=(e)=>{
        e.preventDefault();
        setFilteredData(data.filter(d=>{
            if (d.Title.toUpperCase().search(searchedData.toUpperCase())!==-1 || d.Description.toUpperCase().search(searchedData.toUpperCase())!==-1) return true;
            else return false;
        }));
    }

    const handleCompleteRequest=(id)=>{
        axios.post(url+'completedRequestService/', {
                        'id':id
                    },{
			headers: {
				'Authorization': `Token ${localStorage.getItem('token')}` 
			}
		}).then(res=>{
			setFilteredData(data.filter(d=>{
                if (d.id===id) return false;
                else return true;
            }));
		})
    }

    const handleNewItem=e=>{
        e.preventDefault();
        setUploading(true);
        
        if (newDescription===''){
            setIsError(true);
            setErrorMessage('Please describe what do you want.');
        }
        else if (newTitle===''){
            setIsError(true);
            setErrorMessage('Please describe what do you want.');
        }
        else{
            axios.post(url+'addingServiceRequest/', {
                'username':localStorage.getItem('user223'),
                'title':newTitle,
                'description':newDescription,
                'contactInfo':newContactInfo
            },{
            headers: {
                'Authorization': `Token ${localStorage.getItem('token')}` 
            }
            }).then(res=>{
                setData(res.data.data);
                setFilteredData(res.data.data);
                setAddingNew(false);
                setUploading(false);
            })
        }
        setUploading(false);
    }

    if (msgBox && !isLogin) return <Redirect to="/login" />

    return(
        <div className='request-page'>
            {isError && <ShowError message={errorMessage} onclose={()=>setIsError(false)}/>}
            {uploading && <UploadingAnim/>}
            <div className='request-page-main'>
                <form>
                    <input type="search" class="request-search" value={searchedData} onChange={e=>setSearchedData(e.target.value)}  />
                    <button type="submit" onClick={handleFilter} >filter</button>
                </form>
                {filteredData && filteredData.map(d=><div key={d.id} className="request-card">
                    <h4>{d.Title}</h4>
                    <p>{d.Description}
                    </p>
                    <p>{d.ContactInfo}</p>

                    {msgBox && <MessageBox 
                        msgingTo={d.User.username}
                        onClose={()=>setMsgBox(false)}
                    />}


                    {d.User.username===localStorage.getItem('user223')?
                     <p>
                        <label>Request completed </label>
                            <input type='checkbox' value={isCompleted} onChange={e=>setIsCompleted(e.target.checked)} />
                            {isCompleted && <button onClick={()=>handleCompleteRequest(d.id)}>Confirm</button>}
                    </p>
                    :
                    <button type="button" onClick={()=>setMsgBox(true)}>message</button>}
                </div>)}

                <AddCircleIcon className='add-button' onClick={()=>setAddingNew(true)} />

                {addingNew && <div className='adding-new-item-div' >
                    <form className='new-item-div'>
                        <input type='text' value={newTitle} onChange={e=>setNewTitle(e.target.value)} placeholder='Title' /><br/><br/>
                        <textarea rows='10' cols='40' type='text' value={newDescription} onChange={e=>setNewDescription(e.target.value)} placeholder='Description' ></textarea><br/><br/>
                        <input type='text' value={newContactInfo} onChange={e=>setNewContactInfo(e.target.value)} placeholder='Contact info.(optional)' /><br/><br/>
                        <button onClick={handleNewItem}>Add</button>
                    </form>

                </div>}
            </div>
        </div>
    )
}

export default RequestPage;