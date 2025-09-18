const express = require('express');
const app = express();
const port = 8080;
const mongoose = require('mongoose');
const path = require("path");
const Chat = require('./models/chat');
const methodOverride = require("method-override");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

main().then(() => {
  console.log('Database connected successfully');
}).catch(err => {
  console.log('Database connection error:', err);
});

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
  console.log('Connected to MongoDB');
}

//Index route to fetch and display chats
app.get('/chats', async (req, res) => {
  try {
    let chats = await Chat.find({});
    //console.log(chats);
    res.render('index', { chats });
    } catch (err) {
    res.status(500).send('Error retrieving chats:' + err.message);
  }
});

//Route to handle new chat message submission
app.get('/chats/new', (req, res) => {
    res.render('new');
});

//Create route
app.post("/chats" , (req,res)=>{
    let { from , to , msg} = req.body;
    let newChat = new Chat({
        from: from,
        to: to,
        msg: msg,
        created_at : new Date()
    });
    newChat
    .save()
    .then(res=>{
        console.log("chat was saved");
    })
    .catch((err)=>{
        console.log(err);
    });
    res.redirect("/chats");
});

//Edit Route
app.get("/chats/:id/edit",async (req,res)=>{
    let {id}=req.params;
    let chat = await Chat.findById(id);
    res.render("edit" ,{chat})
})

//Update ROute
app.put("/chats/:id", async (req,res)=>{
    let {id}= req.params;
    let {msg: newMsg} = req.body;
    let updatedChat= await Chat.findByIdAndUpdate(id, {msg:newMsg}, {runValidators:true, new:true});
    console.log(updatedChat);
    res.redirect("/chats");
})

//Delete Route
app.delete("/chats/:id" , async (req,res)=>{
    let {id}= req.params;
    let deletedChat= await Chat.findByIdAndDelete(id);
    console.log(deletedChat);
    res.redirect('/chats');
});

app.get('/', (req, res) => {
  res.send('root is working');
});


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});