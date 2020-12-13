import express from "express";
import fileUpload from "express-fileupload";
import path from "path";
const app = express();
const port = 6900;
app.use(fileUpload());
app.use(express.static('public'));

app.post('/upload', function (req, res) {
  console.log(req.files.audio);
  if (!req.files || Object.keys(req.files).length === 0) {
    console.log(req.files);
    return res.status(400).send('No files were uploaded.');
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let File = req.files.audio;

  // Use the mv() method to place the file somewhere on your server
  console.log(process.cwd())
  File.mv(process.cwd()+"/"+File.name, function (err) {
    if (err)
      return res.status(500).send(err);
    console.log("success");
    res.status(400).send('File uploaded');
  });
});

// Routes
app.get("/", (req, res) => {
  res.sendFile('index.html');
});


const startServer = () => {
  app.listen(port, () => console.log("Listening on port 6900!"));
};

startServer();
