import React, { useState, useEffect } from "react";
import { Image } from "cloudinary-react";

const Home = () => {
   const [ImageIds, setImageIds] = useState();
   const loadImage = () => {
      fetch("/api/image")
         .then((res) => res.json())
         .then((data) => setImageIds(data))
         .catch((err) => console.log(err));
   };
   useEffect(() => {
      loadImage();
   }, []);
   return (
      <div>
         <h1 className="title">Home</h1>
         {ImageIds &&
            ImageIds.map((imageId, index) => (
               <Image
                  key={index}
                  cloudName="pyaesonekhant"
                  publicId={imageId}
                  width="300"
                  crop="scale"
               />
            ))}
      </div>
   );
};

export default Home;
