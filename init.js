const mongoose = require('mongoose');
const Chat = require('./models/chat');

main().then(() => {
  console.log('Database connected successfully');
}).catch(err => {
  console.log('Database connection error:', err);
});

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
  console.log('Connected to MongoDB');
}

let chat1 = new Chat({
  from: "catlyn",
  to: "david",
  msg: "Hello, david!",
  created_at: new Date()
});

let allChats= [
  { from: "Alice", to: "Bob", msg: "Hello, Bob!", created_at: new Date() },
  { from: "Bob", to: "Alice", msg: "Hi, Alice!", created_at: new Date() },
  { from: "Charlie", to: "David", msg: "Hey, David!", created_at: new Date() },
  { from: "Eve", to: "Frank", msg: "Are you coming to the meeting?", created_at: new Date() },
  { from: "Frank", to: "Eve", msg: "Yes, I will be there on time.", created_at: new Date() },
  { from: "Grace", to: "Heidi", msg: "Lets grab lunch tomorrow.", created_at: new Date() },
  { from: "Heidi", to: "Grace", msg: "Sounds good, where?", created_at: new Date() },
  { from: "Ivan", to: "Judy", msg: "Check out this cool link!", created_at: new Date() },
  { from: "Judy", to: "Ivan", msg: "Wow, thats awesome!", created_at: new Date() },
  { from: "Mallory", to: "Oscar", msg: "Did you finish the project?", created_at: new Date() },
  { from: "Oscar", to: "Mallory", msg: "Almost done, just final touches.", created_at: new Date() },
  { from: "Peggy", to: "Sybil", msg: "Can we reschedule our call?", created_at: new Date() },
  { from: "Sybil", to: "Peggy", msg: "Sure, how about 5 PM?", created_at: new Date() },
  { from: "Trent", to: "Victor", msg: "Good luck with your exam!", created_at: new Date() },
  { from: "Victor", to: "Trent", msg: "Thanks, I really need it!", created_at: new Date() },
  { from: "Walter", to: "Xavier", msg: "Happy Birthday! 🎉", created_at: new Date() },
  { from: "Xavier", to: "Walter", msg: "Thank you so much!", created_at: new Date() },
  { from: "Yvonne", to: "Zara", msg: "Lets plan a trip this weekend.", created_at: new Date() }
]

Chat.insertMany(allChats).then((res) => {
  console.log(res);
}).catch(err => {   
    console.log('Error inserting multiple chat messages:', err);
});

chat1.save().then((res) => {
  console.log(res);
}).catch(err => {   
    console.log('Error saving chat message:', err);
});

Chat.insertMany(allChats).then((res) => {
  console.log(res);
}).catch(err => {   
    console.log('Error inserting multiple chat messages:', err);
});