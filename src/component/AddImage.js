import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../config/globelConfig";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { ToastContainer, toast } from 'react-toastify';
import { FiRefreshCcw } from 'react-icons/fi';

import 'react-toastify/dist/ReactToastify.css';


function AddImage() {
  const [images, setImages] = useState([])
  const [state, setState] = useState({
    email: '',
    name: '',
    imageId: ''
  });
  
  const limit = 8;
  const [page, setPage] = useState(1);
  const [totalRecord, setTotalRecord] = useState(0);

  function handleOnChange(e) {
    e.preventDefault()
    e.stopPropagation()
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value
    });
  }

  const getUserImages = (pages) => {
    axios.post(`${baseUrl}/api/user/user-img`, { page: pages? pages: page , limit})
      .then(res => {
        if(res.data.rows && res.data.rows.length > 0) {
          setTotalRecord(res.data.count)
          const margeImages  = images.concat(res.data.rows)
          setImages(margeImages)
        }
      })
  }

  const getNewUserImages = () => {
    axios.post(`${baseUrl}/api/user/user-img`, { moreId: images[0].id})
      .then(res => {
        if(res.data.rows && res.data.rows.length > 0) {
          setTotalRecord(totalRecord + res.data.rows.length)
          const margeImages  = res.data.rows.concat(images)
          setImages(margeImages)
        }
      })
  }

  useEffect(() => {
    document.body.classList.add('bodyClass');
    getUserImages()
  }, [])

  const sendImageToUser = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if(!state.imageId) {
      toast.error("Please Select Image");  
      return false
    }
    axios.post(`${baseUrl}/api/user/user`, state)
      .then(res => {
        toast("Image Sent!");        
        console.log(res)
      })
  }

  return (

    <>
        <ToastContainer />
        <div className="header">
          <img src={'/images/header.jpg'} alt="header"/> 
        </div>
      <div class="collage-wrapper">
        <div className="imageform">
          <form className="form" onSubmit={sendImageToUser}>
            <div className="row">
              <div className="col-md-12 col-lg-12">
                <div className="form-group">
                  <label for="name" className="mb-2">Name</label>
                  <input type="text" className="form-control" id="name" placeholder="Name"
                    onChange={handleOnChange}
                    name="name" />
                </div>
                <div className="form-group mt-3">
                  <label for="email" className="mb-2">Email Address</label>
                  <input type="text" className="form-control" id="email" placeholder="Email" onChange={handleOnChange} name="email" />
                </div>
                {/* <div className="form-group mt-3">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                    <label class="form-check-label" for="defaultCheck1">
                      Choose image
                    </label>
                  </div>
                </div> */}
              </div>
            </div>
            <div className="d-flex justify-content-between">
            <div className="submitbut" style={{ flex: 1}}>
              <button class="btn btn-primary">Send Mail</button>
            </div>
            <div className="submitbut">
              <FiRefreshCcw className="cursor-pointer" size={45} onClick={getNewUserImages}/>
            </div>
            </div>
            <div className="allimageselect">
              <div className="row">
              {images.map((ob, index) => (
                <div key={index} className="col-lg-3 col-md-4 col-sm-12">
                <div className="imageslectied">
                  <input id={`${ob.id}`} class="checkbox-custom" name={"a"} type="radio" defaultChecked={state.imageId===ob.id}
                  onChange={(e) => {
                    setState({
                      ...state,
                      imageId: Number(e.target.id)
                    });
                  }} />
                  <label for={`${ob.id}`} class="checkbox-custom-label"><LazyLoadImage src={`${baseUrl}/api/user/img?image=${ob.image}`} alt="1"/></label>
                </div>
              </div>
              ))}
              </div>

            </div>

            
          </form>
          {(totalRecord === 0 || totalRecord > images.length) &&<div className="submitbut">
              <button class="btn btn-secondary" onClick={() =>{
                const pageInfo  = page + 1
                setPage(pageInfo)
                getUserImages(pageInfo)
              }}>Load More</button>
            </div>}
        </div>
      </div>
    </>
  )




}
export default AddImage;