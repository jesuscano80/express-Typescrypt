import express from "express";
import cors from "cors";
import {config} from "dotenv"
import userRoutes from "./routes/user.routes"
import {errorHandler} from "./middlewares/errorhandler"
import {notFound} from "./middlewares/404"
config();
const app=express();
//Falta actualizar cors validando solo el puerto que se tenga que usar
app.use(cors())
//Configuration
app.set("port", process.env.PORT || 3000);
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(userRoutes);
app.use("*",notFound);
app.use(errorHandler);
export default app;




