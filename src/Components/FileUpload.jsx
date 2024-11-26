import React, { useState } from 'react';
import Cookies from 'js-cookie';
function FileUpload() {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null)

  const fileSelectedHandler = event => {
    console.log(event.target.files[0])
    setImage(event.target.files[0]);
    setImageUrl(URL.createObjectURL(event.target.files[0]))
  }

  const fileUploadHandler = () => {
    const formData = new FormData();
    formData.append('user[profile_picture]', image);

    fetch(`${import.meta.env.VITE_BASE_URL}addProfilePicture?access_token=`+ Cookies.get("auth_token"), {
      method: 'POST',
      body: formData,
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  return (
    <div>
      <input type="file" accept='image/*' onChange={fileSelectedHandler} />
      <button onClick={fileUploadHandler}>Upload</button>
      <img className='image' src={imageUrl}/>
    </div>
  );
}

export default FileUpload;