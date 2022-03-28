const express = require('express')
const app = express()
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Log =  require("./models/DataLog");
dotenv.config();
const port = 3000

app.set('view engine', 'ejs')

const user = {
    firstName: 'Admin',
    lastName: '',
}

app.get('/', async (req, res) => {
  
    const data = await Log.find().sort({'created_at':-1}).limit(10).exec();
    res.render('pages/index', {
        user,
        data,
        title: "Home Page"
    })
})




//connect to mongodb
mongoose.connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true ,useUnifiedTopology: true },
    ()=>{
        console.log("db connected");
    }
);

app.listen(port, () => {
  console.log(`App listening at port ${port}`)
})


const WebSocket = require('ws')
const wss = new WebSocket.Server({ port: 8080, host: '0.0.0.0' })

wss.on('connection', function connection(ws) {
    console.log("New client connected")

    ws.on('message', function message(data, isBinary) {
        console.log(data.toString());
        wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(data, { binary: isBinary });
            }
        });

        const log = new Log({
            value:data.toString()
        });
        log.save();
        
       
    });

    ws.on('close', function(connection) {
        console.log(" Peer " + connection.toString() + " disconnected.");
    });
});


