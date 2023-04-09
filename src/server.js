import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
import connectDB from "./config/connectDB"

require('dotenv').config(); // dòng này để giúp chạy được dòng 17

let app = express();

//config app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

viewEngine(app);
initWebRoutes(app);

//kết nối db
connectDB();

let port = process.env.PORT || 6969;
app.listen(port, () => {
    //callback
    console.log("backend node JS is running on the port: " + port);
});
