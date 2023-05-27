const  express = require('express')
const app =  express();
const router = express.Router();
const bodyParser = require('body-parser')
require('dotenv').config()
const initApiRoutes = require('./routes/api')
const cors = require("cors");

var corsOptions = {
    origin: "*",
    changeOrigin: true,
    optionsSuccessStatus: 200, 
};
app.use(cors(corsOptions));

app.use(bodyParser.json())
router.get('/',(req,res)=>{
    res.write("Welcome to node js ")
    res.end()
})
app.use('/',router);
initApiRoutes(app)

app.listen(process.env.PORT,()=> console.log(`server started..at localhost ${process.env.PORT}`) )