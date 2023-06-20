import __dirname from "./utils.js";
import config from "./config/config.js";
import cookieParser from "cookie-parser";
import express from "express";
import handlebars from "express-handlebars";
/* ---------------------- */
import mongoose from "mongoose";
/* ---------------------- */
import { Server } from "socket.io";
/* ---------------------- */
import passport from "passport";
import initializePassport from "./config/passport.config.js";
/* ---------------------- */
import jwtRouter from "./routes/jwt.router.js";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import viewsRouter from "./routes/views.router.js";
import mockingsRouter from "./routes/mockings.router.js";

//Declarando Express para usar sus funciones.
const app = express();

//Preparar la configuracion del servidor para recibir objetos JSON.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Template engine
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use(express.static(__dirname + "/public"));

//(Solo si usar Cookies): inicializar el cookie parser.
app.use(cookieParser("CoderS3cr3tC0d3"));
//Inicializar passport:
initializePassport();
app.use(passport.initialize());

//Routes
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/views", viewsRouter);
app.use("/api/jwt", jwtRouter);
app.use("/api/mockingproducts", mockingsRouter);

//Listening
const PORT = config.port;
const SERVER = app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});

//MongoDb
const MONGO_URL = config.mongoUrl;
const connectMongoDB = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Can't connect to MongoDB: " + error);
    process.exit();
  }
};
connectMongoDB();

//Chat
const socketServer = new Server(SERVER);
let messages = [];
// Abrimos el canal de comunicacion
socketServer.on("connection", (socket) => {
  socketServer.emit("messageLogs", messages);
  socket.on("message", (data) => {
    messages.push(data);
    console.log(messages);
    socket.emit("messageLogs", messages);
    socket.broadcast.emit("messageLogs", messages);
  });
  /* // hacemos un broadcast del nuevo usuario que se conecta al chat
  socket.on("userConnected", (data) => {
    socket.broadcast.emit("userConnected", data.user);
  }); */
});
