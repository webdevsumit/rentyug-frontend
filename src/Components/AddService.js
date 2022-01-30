import React,{ useState, useEffect} from 'react';
import ShowError from '../Components/ShowError';
import axios from 'axios';
import "./../css/account.css";
import UploadingAnim from '../Components/UploadingAnim';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import ServiceCategoryCard from '../Components/ServiceCategoryCard';

function AddService(props) {

    const { url } = useSelector(state=>state.isLogin);
    const [data, setData] = useState({});
    const [canAddNewItem, setCanAddNewItem] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
	const [isError, setIsError] = useState(false);

    const [shopCatagories, setShopCatagories] = useState([]);

    const [newShopName, setNewShopName] = useState('');
	const [newMainImage, setNewMainImage] = useState(null);
	const [newItemCataId, setNewItemCataId] = useState('');
	const [desc, setDesc] = useState('');
	const [newItemOpenTime, setNewItemOpenTime] = useState('');
	const [newItemCloseTime, setNewItemCloseTime] = useState('');
	const [newItemPriceType, setNewItemPriceType] = useState('');

	const [readTC, setReadTC] = useState(false);
	const [agreeTC, setAgreeTC] = useState(false);

	const [uploading, setUploading] = useState(false);

    useEffect(()=>{
		
		axios.post(url+'account/',{'username':localStorage.getItem('user223')},{ 
				  headers: {
				    'Authorization': `Token ${localStorage.getItem('token')}` 
				  }
				})
		.then(res=>{
			setData(res.data.profile);
			if(res.data.profile.User.first_name==='' || res.data.profile.User.last_name==='' || res.data.profile.Address==='' || res.data.profile.Address==='' || res.data.profile.MobileNo===''){
				setIsError(true);
				setErrorMessage("Please complete the profile account page. It will help us make this app more trustable. Then you can add service");
			}else if(res.data.profile.lat===23.25 && res.data.profile.lng===77.41){
				setIsError(true);
				setErrorMessage("Settnig your location on map help us to show your service in nearby services. Please do this it will just few seconds.");
			}else{
                setCanAddNewItem(true);
            }
		})
        axios.get(url+'ShopCatagories/',{
            headers: {
              'Authorization': `Token ${localStorage.getItem('token')}` 
            }
          })
            .then(res=>{
            setShopCatagories(res.data.ServiceCatagories);
            console.log(res.data.ServiceCatagories)
        })
	},[]);


    const addNewService=()=>{
        if(newShopName==='' || newMainImage===null || newItemOpenTime==='' || newItemCloseTime==='' || newItemPriceType==='' || newItemCataId===''){
           setIsError(true);
           setErrorMessage('All fields are required.');
       }else{
            var formData = new FormData();
            formData.append('ShopName',newShopName);
            formData.append('MainImage',newMainImage);
            formData.append('catagoryId',newItemCataId);
            formData.append('description',desc);
            formData.append('OpenTime',newItemOpenTime);
            formData.append('CloseTime',newItemCloseTime);
            formData.append('PriceType',newItemPriceType);
            formData.append('username', localStorage.getItem('user223'));
           

           setUploading(true);
            axios.post(url+'addNewService/',formData,{
                                       headers: {
                                         'Authorization': `Token ${localStorage.getItem('token')}` 
                                       }
                                 })
            .then(res=>{
                setUploading(false);
                 setData(res.data.profile);
                 setNewShopName('');
                 setNewMainImage(null);
                 setNewItemCataId('');
                 setNewItemOpenTime('');
                 setNewItemCloseTime('');
                 setNewItemPriceType('');
                 setCanAddNewItem(false);
                 setIsError(true);
                 setErrorMessage('Please add the remaining details and apply for verification.');
                 setTimeout(()=>{
                    setRedirect(true);
                 },2000);
                 
            }).catch(err=>{
                setIsError(true);
                setErrorMessage('Something is wrong please contact customer care.');
            })
        }
    }

  if (redirect) return <Redirect to={'/account/' + data.User.username} />
  return (
    <div className="add-new-service-component">
    {isError && <ShowError message={errorMessage} onclose={()=>setIsError(false)}/>}
    {uploading && <UploadingAnim/>}
      {canAddNewItem ? (
        <div className="addServiceCard">
          <p>
            Product/Service Name :<br/>
            <input
              type='text'
              className='title-input'
              placeholder="Enter full name with address(if want to sell)"
              onChange={(e) => setNewShopName(e.target.value)}
            />
          </p>

          <p className="previewImage">
            {newMainImage ? (
              <img src={URL.createObjectURL(newMainImage)} alt="" />
            ) : (
              ""
            )}
          </p>

          <p>
            Main Image :{" "}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setNewMainImage(e.target.files[0])}
            />
          </p>
          <p>
            <em>Note : You can add more images later.</em>
          </p>

          <p>Catagory : select from below list.</p>

          <div className="service-categories">
            <div className="service-card-container">
              {shopCatagories?.map((Sc) => {
                return (
                  <div
                    key={Sc.id}
                    className={newItemCataId === Sc.id?"accoount-page-category":"cursor-pointer"}
                    onClick={() => setNewItemCataId(Sc.id)}
                  >
                    <ServiceCategoryCard
                      id={Sc.id}
                      Name={Sc.Name}
                      Image={Sc.Image}
                      disabled={true}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          <p>
          <h3>Set Description</h3>
          <textarea 
            rows='20' cols='auto'
            value={desc} onChange={e=>setDesc(e.target.value)}>
          </textarea>
          </p>

          <p>
            Open Time to contact :
            <input
              type="text"
              placeholder="eg. 10:00 am"
              onChange={(e) => setNewItemOpenTime(e.target.value)}
            />
          </p>

          <p>
            Close Time to contact :
            <input
              type="text"
              placeholder="eg. 9:00 pm"
              onChange={(e) => setNewItemCloseTime(e.target.value)}
            />
          </p>

          <p>
            Rent :
            <input
              type="text"
              placeholder="eg. Rs.10/month"
              onChange={(e) => setNewItemPriceType(e.target.value)}
            />
          </p>

          <p>
            Note: Add search tag(after saving) so CONSUMERS can find you more
            easily.
          </p>
          <p></p>
          <p>
            MOST IMP : Do not forget to add your name, your Product name(all
            types of name), your area(including city, colony, etc) in many
            different way to search tag.
          </p>
          <p></p>

          {readTC ? (
            <div>
              <h4>Terms and Conditions to upload product.</h4>
              <br />

              <ul>
                <li>
                  Take care of your product on your own. Initially we are not
                  providing that type of facility but later we will add that.
                </li>
                <br />

                <li>
                  We are not responsible for your product. Make sure your are
                  taking security money or ID proof or something else. So you
                  can feel secure.
                </li>
                <br />

                <li>
                  You are providing something to your customers so you are the
                  master of your business. Do not do anything that will put you
                  in trouble.
                </li>
                <br />

                <li>
                  Please call us to apply for the verification tag. It will help
                  you to increase consumers trust on you and make you more
                  profitable.
                </li>
                <br />

                <li>
                  For verification we can call(audio or video) or come to you,
                  depends on the size and value of product and verify you are
                  giving the right details about the product or not.
                </li>
                <br />

                <li>
                  After getting verification tag do not try to change anything
                  in service otherwise it will removed. If you want to change
                  please contact us.
                </li>
                <br />

                <li>
                  Our goal is to get more and more trust on us by people like
                  you Please co-operate us.{" "}
                </li>
                <br />

                <li>
                  Thankyou for providing service. If you have any doubt feel
                  free to contact us.
                </li>
                <br />
                <li>
                  <a href="tel:+91 7999004229">customer care</a>
                </li>
              </ul>
            </div>
          ) : (
            <button onClick={() => setReadTC(!readTC)}>
              Read 8 points to keep in mind.{" "}
            </button>
          )}

          <input type="checkbox" onChange={() => setAgreeTC(!agreeTC)} />
          <label>I agree</label>

          {agreeTC ? (
            <button onClick={addNewService}>Add</button>
          ) : (
            <button
              onClick={() => {
                setIsError(true);
                setErrorMessage(
                  "Please read carefully and agree that terms and conditions."
                );
              }}
            >
              Add
            </button>
          )}
        </div>
      ) : (
        <div>
            <h5>Please complete the profile.</h5>
        </div>
      )}
    </div>
  );
}

export default AddService;
