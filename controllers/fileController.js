import fs from "fs";
import cp from "child_process";

export const upload = async (req, res) => {
  try {
    console.log(req.file);
    if (req.file == undefined) {
      return res.status(400).send({ message: "Please upload a file!" });
    }
    // makes the file at /uploads/4rkXQFiK-gKYBH1W3RnXj_bRkYFpbdZy/lost/
    setTimeout(() => {
      res.status(200).send({
        message: "Uploaded the file successfully: " + req.file.originalname,
        client_id: req.sessionID,
        output_folder: req.file.originalname.split(".")[0],
      });
    }, 5000);
  } catch (err) {
    res.status(500).send({
      message: `Could not upload the file: ${req.file.originalname}. ${err}`,
    });
  }
};

export const getListFiles = (req, res) => {
  console.log(req.query);
  const directoryPath =
    __basedir +
    "/uploads/" +
    req.query.client_id +
    "/" +
    req.query.output_folder +
    "/";
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
          req.query.client_id +
          "/" +
          req.query.output_folder +
          "/" +
          file,
      });
    });

    res.status(200).send(fileInfos);
  });
};
