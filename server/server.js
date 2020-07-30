const express = require("express");
const app = express();
const cloudinary = require("./util/cloudinary");

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.get("/api/image", (req, res, next) => {
   cloudinary.search
      .expression("folder : first_project")
      .sort_by("public_id", "desc")
      .max_results(30)
      .execute()
      .then((response) => {
         const publicIds = response.resources.map(
            (resource) => resource.public_id
         );
         res.send(publicIds);
      });
});

app.post("/api/upload", (req, res, next) => {
   const fileStr = req.body.data;
   cloudinary.uploader
      .upload(fileStr, {
         upload_preset: "first_project",
      })
      .then((response) => {
         console.log(response);
         res.json({ msg: "Success Upload" });
      })
      .catch((err) => {
         res.status(500).json({ msg: "Upload fail" });
      });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
   console.log(`Server is running at port ${PORT}`);
});
