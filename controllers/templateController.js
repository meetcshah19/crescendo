import fs from "fs";

export const chooseTemplate = async (req, res) => {
  console.log(req.body);
  let data =
    "scale: " +
    req.body.scale +
    "\nwater: " +
    req.body.water +
    "\nparticles: " +
    req.body.particles;

  fs.writeFile(
    __basedir + "/uploads/" + req.body.client_id + "/data.txt",
    data,
    (err) => {
      if (err) return console.log(err);
      console.log("");
    }
  );

  res.status(200).send({ Yo: "yo" });
};
