import express from "express";

const app = express();
const port = 6900;

// Routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Return error on any routes that dont exist
app.use("*", (req, res) => {
  res.status(404).json({
    errorMessage:
      "Endpoint you are looking for does not exist or has been removed!",
  });
});
const startServer = () => {
  app.listen(port, () => console.log("Listening on port 6900!"));
};

startServer();
