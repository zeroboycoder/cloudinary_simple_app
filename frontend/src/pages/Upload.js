import React, { useState } from "react";

const Upload = () => {
   const [fileInputState, setFileInputState] = useState();
   const [previewFile, setPreviewFile] = useState();
   const [selectedFile, setSelectedFile] = useState();

   const inputChangeHandler = (event) => {
      const file = event.target.files[0];
      previewImage(file);
   };

   const previewImage = (file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
         setPreviewFile(reader.result);
      };
   };

   const submitHandler = (event) => {
      event.preventDefault();
      if (!previewFile) return;
      uploadImage(previewFile);
   };

   const uploadImage = (base64EncodedImage) => {
      console.log(base64EncodedImage);
      try {
         fetch("/api/upload", {
            method: "POST",
            body: JSON.stringify({ data: base64EncodedImage }),
            headers: { "Content-type": "application/json" },
         });
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <div>
         <h1>Upload</h1>
         <form onSubmit={submitHandler}>
            <input
               type="file"
               name="image"
               onChange={(event) => inputChangeHandler(event)}
               value={fileInputState}
               className="form-input"
            />
            {previewFile && (
               <img src={previewFile} alt="img" style={{ height: "300px" }} />
            )}
            <br />
            <button className="btn" type="submit">
               Submit
            </button>
         </form>
      </div>
   );
};

export default Upload;
