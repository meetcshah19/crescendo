import fs from "fs";
import cp from "child_process";

export const upload = async (req, res) => {
  try {
    console.log(req.file);
    if (req.file == undefined) {
      return res.status(400).send({ message: "Please upload a file!" });
    }
    // add the spleeter code here
    cp.exec(
      "cd ../spleeterenv/bin/; ./python3 spleeter separate -i ../../cr3sc3ndo/uploads/" +
        req.sessionID +
        "/" +
        req.file.originalname +
        " -p spleeter:5stems -o ../../cr3sc3ndo/uploads/" +
        req.sessionID,
      "/bin/bash",
      (data, stderr, std) => {
        console.log(data + std + stderr);
        res.status(200).send({
          message: "Uploaded the file successfully: " + req.file.originalname,
          client_id: req.sessionID,
        });
      }
    );
  } catch (err) {
    res.status(500).send({
      message: `Could not upload the file: ${req.file.originalname}. ${err}`,
    });
  }
};

export const getListFiles = (req, res) => {
  const directoryPath = __basedir + "/uploads/" + req.params.client_id + "/";
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
          "http://localhost:6900/uploads/" + req.params.client_id + "/" + file,
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
