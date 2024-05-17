import express, { request, response } from "express";
import { PORT, DATABASE, API_SECRET, API_KEY, CLOUD_NAME } from "./config.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import upload from "./middlewares/multer.js";
import { v2 as cloudinary } from "cloudinary";
import getDataUri from "./utils/datauri.js";
import cors from "cors";
import { Shows } from "./models/feedmodel.js";

dotenv.config();

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
});

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (request, response) => {
  console.log(request);
  return response.status(200).send(`Welcome`);
});

// to add project
app.post("/free-shows", upload, async (request, response) => {
  let fileUri = "";
  let mycloud = "";

  //   if (!request.file) {
  //     return response.status(400).send({
  //       message:
  //         "Send all required fields: title, description, cover_photo, is_professional, episodes",
  //     });
  //   } else {
  fileUri = getDataUri(request.file);
  mycloud = await cloudinary.uploader.upload(fileUri.content);
  //}

  try {
    if (
      !request.body.title ||
      !request.body.description ||
      //  !request.body.cover_photo ||
      !request.body.episodes
    ) {
      return response.status(400).send({
        message:
          "Send all required fields: title, description, cover_photo, is_professional, episodes",
      });
    }

    const newShow = {
      title: request.body.title,
      description: request.body.description,
      cover_photo: mycloud.secure_url,
      episodes: request.body.episodes,
    };
    const show = await Shows.create(newShow);
    return response.status(201).send(show);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// to get all projects
app.get("/free-shows", async (request, response) => {
  try {
    // response.header("Access-Control-Allow-Origin", "http://127.0.0.1:5173");
    // response.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    // response.header("Access-Control-Allow-Headers", "Content-Type");
    // response.header("Access-Control-Allow-Origin", "*");
    // response.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    // response.header("Access-Control-Allow-Headers", "Content-Type");
    const allShows = await Shows.find({});
    return response.status(200).json(allShows);
  } catch (error) {
    response.status(500).send({ message: error.message });
  }
});

// to get project by id
app.get("/free-shows/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const shows = await Shows.findById(id);
    return response.status(200).json(shows);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// to update project
app.post("/free-shows/:id", upload, async (request, response) => {
  const fileUri = getDataUri(request.file);
  const mycloud = await cloudinary.uploader.upload(fileUri.content);
  request.body.cover_photo = mycloud.secure_url;

  try {
    if (
      !request.body.title ||
      !request.body.description ||
      //  !request.body.cover_photo ||
      !request.body.episodes
    ) {
      return response.status(400).send({
        message:
          "Send all required fields: title, description, cover_photo, is_professional",
      });
    }
    const { id } = request.params;
    const result = await Shows.findByIdAndUpdate(id, request.body);
    if (!result) {
      return response.status(404).send({
        message: "Show not found",
      });
    }
    return response.status(200).send({
      message: "Show updated",
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//to delete project
app.delete("/free-shows/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const result = await Shows.findByIdAndDelete(id);
    if (!result) {
      return response.status(404).send({
        message: "show not found",
      });
    }
    return response.status(200).send({
      message: "show deleted successfully",
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

mongoose
  .connect(DATABASE)
  .then(() => {
    console.log("app connectec to db", PORT);
    app.listen(PORT, () => {
      console.log("port is here", PORT);
    });
  })
  .catch((error) => {
    console.log("error=>", error);
  });
