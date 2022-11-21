const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const app = express();

app.post("/profile", upload.single("avatar"), function (req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
  console.log(req.file);
  res.send("Success");
  return;
});

app.post(
  "/photos/upload",
  upload.array("photos", 12),
  function (req, res, next) {
    // req.files is array of `photos` files
    // req.body will contain the text fields, if there were any
    console.log(req.files);
    res.send("Success");
  }
);

const cpUpload = upload.fields([
  { name: "avatar", maxCount: 1 },
  { name: "gallery", maxCount: 8 },
]);
app.post("/cool-profile", cpUpload, function (req, res, next) {
  // req.files is an object (String -> Array) where fieldname is the key, and the value is array of files
  //
  // e.g.
  //  req.files['avatar'][0] -> File
  //  req.files['gallery'] -> Array
  //
  // req.body will contain the text fields, if there were any
  console.log(req.files);
  res.send("Success");
});

const PORT = 4000;
app.listen(PORT, async () => {
  console.log(`listening on port ${PORT}`);
  // which request, what handler
  app.use("/", (req, res) => {
    console.log(`request received at ${new Date()}`);
    console.log("req", req.body);
    //console.dir(res);
    res.send(`request received at ${new Date()}`);
  });
  console.log("application setup completed");
});
