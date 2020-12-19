import fs from "fs";

export const upload = async (req, res) => {
  try {
    console.log(req.file);
    if (req.file == undefined) {
      return res.status(400).send({ message: "Please upload a file!" });
    }
    // add the spleeter code here
    setTimeout(() => {
      res.status(200).send({
        message: "Uploaded the file successfully: " + req.file.originalname,
        client_id: req.sessionID,
      });
    }, 1000);
  } catch (err) {
    res.status(500).send({
      message: `Could not upload the file: ${req.file.originalname}. ${err}`,
    });
  }
};

export const getListFiles = (req, res) => {
  const directoryPath =
    __basedir + "/uploads/" + req.params.client_id + "/output/";
  console.log(directoryPath);

  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      res.status(500).send({
        message: "Unable to scan files!",
      });
    }

    let fileInfos = [];

    files.forEach((file) => {
      fileInfos.push({
        name: file,
        url:
          "http://localhost:6900/uploads/" +
          req.params.client_id +
          "/output/" +
          file,
      });
    });

    res.status(200).send(fileInfos);
  });
};

// ignore
export const download = (req, res) => {
  const fileName = req.params.name;
  const directoryPath = __basedir + +"/uploads/";

  res.download(directoryPath + fileName, fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: "Could not download the file. " + err,
      });
    }
  });
};
