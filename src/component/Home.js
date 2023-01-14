import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseUrl } from "../config/globelConfig";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import $ from 'jquery';


function Home() {
  const limit = 200;
  const [page, setPage] = useState(1);
  const [totalRecord, setTotalRecord] = useState(0);
  const [images, setImages] = useState({
    slot1: [],
    slot2: [],
    slot3: [],
    // slot4: [],
    // slot5: [],
    // slot6: []
  })
  const [totalImages, setTotalImages] = useState([])
  const getImages = (pages) => {
    if (totalRecord == 0 || totalRecord > images.length) {
      axios.post(`${baseUrl}/api/user/img-list`, { page: pages ? pages : page, limit })
        .then(res => {
          console.log(res.data.count)
          setTotalRecord(res.data.count);
          if (res.data.rows && res.data.rows.length > 0) {
            setTotalImages(res.data.rows)
            const dataTosave = {
              slot1: [],
              slot2: [],
              slot3: [],
              // slot4: [],
              // slot5: [],
              // slot6: []
            }
            console.log(res.data.rows)
            let j = res.data.rows.length;
            let i = 1;
            for (let obj of res.data.rows) {
              if(dataTosave[`slot${i}`].length < 2) {
                dataTosave[`slot${i}`].push(obj)
              }
              
              i++
              if (i > 3) {
                i = 1
              }

            }
            setImages(dataTosave)
          }
        })
    }
  }
  useEffect(() => {
    getImages();
  }, [])

  const setSlots = (data) => {
    if (data && data.length > 0) {
      const dataTosave = {
        slot1: [],
        slot2: [],
        slot3: []
      }
      let i = 1;
      for (let obj of data) {
        if(dataTosave[`slot${i}`].length < 2) {
          dataTosave[`slot${i}`].push(obj)
        }
          i++
          if (i > 3) {
            i = 1
          }
      }
      setImages(dataTosave)
    }
  }

  const getNewImages = () => {
    axios.post(`${baseUrl}/api/user/img-list`, { page: 0, limit: 10 })
      .then(res => {
        if (res.data.rows && res.data.rows.length > 0) {

          setTotalRecord(res.data.count);
          let imagesInfo = []
          if (res.data.rows && res.data.rows.length > 0) {
            let isUpdate = false
            for (let obj of res.data.rows) {
              if (totalImages.findIndex(ob => ob.id == obj.id) == -1) {
                isUpdate = true
                imagesInfo.push(obj);
              }
            }
            if (isUpdate) {
              const totalImagesInfo = imagesInfo.concat(totalImages)
              setTotalImages(totalImagesInfo)
              setTimeout(() => {
                setSlots(totalImagesInfo)
              })

            }
          }

        }
      })
  }

  useEffect(() => {
    const interval = setInterval(() => {
      getNewImages();
    }, 5000);
    return () => clearInterval(interval);
  }, [totalImages])

  function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
  }

  const fedEffect = (img, src) => {
    $(img).fadeOut(500, function () {
      $(img).attr('src', src);
      $(img).fadeIn(10000);
    });
  }
  // useEffect(() => {
  //   setTimeout(() => {
  //     let seq = 2;
  //     const interval1 = setInterval(() => {
  //     if(totalImages && totalImages.length > 0) {
  //       seq = seq == 2 ? 3: 2 
  //       const shuffleImages = shuffle(totalImages)
  //       const cols = $(".single-column");
  //       if (cols && cols.length > 0) {
  //         let i = 0;
  //         for(let col of cols) {
  //         const imgs =  $(col).children()

  //         for (let img of imgs) {
  //           if(i % seq == 0) {
  //             $(img).attr('src', `${baseUrl}/api/user/img?image=${shuffleImages[i].image ? shuffleImages[i].image : shuffleImages[0].image}`)
  //           } else {
  //          //   fedEffect(img, `${baseUrl}/api/user/img?image=${shuffleImages[i].image ? shuffleImages[i].image : shuffleImages[0].image}`)
  //           }


  //           i++;
  //         }
  //         }
  //       }
  //     }
  //   }, 2000);
  //   return () => clearInterval(interval1);
  //   }, 2000);
  // }, [totalImages])

  function shuffleA(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

  // const reArrangePhoto = () => {
  //   if (totalImages && totalImages.length > 0) {
  //     const dataTosave = {
  //       slot1: images.slot1,
  //       slot2: images.slot2,
  //       slot3: images.slot3
  //     }
  //     let i = 1;
  //     let dataImage = JSON.parse(JSON.stringify(totalImages));
  //     dataImage = shuffleA(dataImage)
  //     for (let obj of dataImage) {
  //         dataTosave[`slot${i}`] = [obj].concat(dataTosave[`slot${i}`])
  //         i++
  //         if (i > 3) {
  //           i = 1
  //         }
  //     }
  //     setImages(dataTosave)
  //   }
  // }
  // useEffect(() => {
  //   const interval1 = setInterval(() => { 
  //     reArrangePhoto()
  //   }, 2000);
  //   return () => clearInterval(interval1);
  // }, [totalImages])
  useEffect(() => {
    /** code by webdevtrick ( https://webdevtrick.com ) **/
    // setTimeout(() => {

    //   if(document.querySelectorAll('.single-column')) {
    //     [...document.querySelectorAll('.single-column')].map(column => {
    //      column.style.setProperty('--animation', 'slide');
    //       column.style.setProperty('height', '200%');
    //     });
    //   }


    // }, 5000)

    // const interval1 = setInterval(() => {
    //  const reroderImage =  shuffle(images)
    //   setImages(JSON.parse(JSON.stringify(reroderImage))  )
    // }, 3000);
    // return () => clearInterval(interval1);
  }, [images, document.querySelectorAll('.single-column')])
  return (

    <>

      <div className="collage-wrapper" >
        <div className="coll">


          {/* 
  {images.map((ob, key)=> (<div key={key}><img src={`${baseUrl}/api/user/img?image=${ob.image}`} alt="1"/>{}</div>) )}  */}

          <div class="main">
            <div class="single-column slide" id="div_1">
              {images.slot1 && images.slot1.length > 0 && images.slot1.map((ob, key) => (
                <LazyLoadImage className="elementToFadeInAndOut" src={`${baseUrl}/api/user/img?image=${ob.image}`} alt={`slot1_${key}`} />
              ))}
            </div>
            <div class="single-column" id="div_2">
              {images.slot2 && images.slot2.length > 0 && images.slot2.map((ob, key) => (
                <LazyLoadImage className="elementToFadeInAndOut" src={`${baseUrl}/api/user/img?image=${ob.image}`} alt={`slot2_${key}`} />
              ))}
            </div>
            <div class="single-column" id="div_3">
              {images.slot3 && images.slot3.length > 0 && images.slot3.map((ob, key) => (
                <LazyLoadImage className="elementToFadeInAndOut" src={`${baseUrl}/api/user/img?image=${ob.image}`} alt={`slot3_${key}`} />
              ))}
            </div>
            {/* <div class="single-column" id="div_4">
    {images.slot4 && images.slot4.length > 0 && images.slot4.map((ob, key)=> (
        <LazyLoadImage className="elementToFadeInAndOut" src={`${baseUrl}/api/user/img?image=${ob.image}`} alt={`slot4_${key}`}/>
    ))}
  </div>
  <div class="single-column" id="div_4">
    {images.slot5 && images.slot5.length > 0 && images.slot5.map((ob, key)=> (
        <LazyLoadImage className="elementToFadeInAndOut" src={`${baseUrl}/api/user/img?image=${ob.image}`} alt={`slot4_${key}`}/>
    ))}
  </div>
  <div class="single-column" id="div_4">
    {images.slot6 && images.slot6.length > 0 && images.slot6.map((ob, key)=> (
        <LazyLoadImage className="elementToFadeInAndOut" src={`${baseUrl}/api/user/img?image=${ob.image}`} alt={`slot4_${key}`}/>
    ))}
  </div> */}
            {/* <div class="single-column" >
    {images.slot5.map((ob, key)=> (
      <a key={`slot5_${key}`}>  <img src={`${baseUrl}/api/user/img?image=${ob.image}`} alt={`slot5_${key}`}/></a>
    ))}
  </div> */}
            {/* <div class="single-column">
      <a href="#"><img src="https://picsum.photos/300/300?random=1" alt="image" /></a>
      <a href="#"><img src="https://picsum.photos/300/300?random=2" alt="image" /></a>
      <a href="#"><img src="https://picsum.photos/300/300?random=3" alt="image" /></a>
      <a href="#"><img src="https://picsum.photos/300/300?random=4" alt="image" /></a>
    </div>
    <div class="single-column">
      <a href="#"><img src="https://picsum.photos/300/300?random=5" alt="image" /></a>
      <a href="#"><img src="https://picsum.photos/300/300?random=6" alt="image" /></a>
      <a href="#"><img src="https://picsum.photos/300/300?random=7" alt="image" /></a>
      <a href="#"><img src="https://picsum.photos/300/300?random=8" alt="image" /></a>
    </div>
    <div class="single-column">
      <a href="#"><img src="https://picsum.photos/300/300?random=9" alt="image" /></a>
      <a href="#"><img src="https://picsum.photos/300/300?random=10" alt="image" /></a>
      <a href="#"><img src="https://picsum.photos/300/300?random=11" alt="image" /></a>
      <a href="#"><img src="https://picsum.photos/300/300?random=12" alt="image" /></a>
    </div>
    <div class="single-column">
      <a href="#"><img src="https://picsum.photos/300/300?random=13" alt="image" /></a>
      <a href="#"><img src="https://picsum.photos/300/300?random=14" alt="image" /></a>
      <a href="#"><img src="https://picsum.photos/300/300?random=15" alt="image" /></a>
      <a href="#"><img src="https://picsum.photos/300/300?random=16" alt="image" /></a>
    </div> */}
          </div>

        </div>
      </div>

    </>
  )




}
export default Home;