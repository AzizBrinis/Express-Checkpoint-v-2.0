const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');


const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";
const blogs = [];

const app = express();
app.use(express.json())

const hours = new Date().getHours();
const day = new Date().getDay();

const MiddleWare = (req,res,next) => {
  if(day == 0 || day ===6 || hours >=17 || hours <=9){
    res.render("no-work")
  }
  next();
}

app.use(MiddleWare);


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/",(req,res) => {
  res.render("home",{text : homeStartingContent, title : "Home",blogs : blogs});
})

app.get("/posts/:id",(req,res) => {
  let blog = blogs.find(post => _.lowerCase(post.title) === _.lowerCase(req.params.id) );
  if (blog) {
    res.render("post",{text : blog.text, title : blog.title})
  } else {
    res.render("not-found")
  }
  
})

app.get("/about",(req,res) => {
  res.render("about",{text : aboutContent, title : "About"})
})

app.get("/contact",(req,res) => {
  res.render("contact",{text : contactContent, title : "Contact"})
})
app.get("/compose",(req,res) => {
  res.render("compose")
})


app.post("/compose", (req,res) => {
  const infos = {title : req.body.newType , text : req.body.bodypost};
  blogs.push(infos);
  res.redirect("/");

})

app.get("/posts",(req,res) => {
  res.render("posts",{ title : "Posts",blogs : blogs});
})











app.listen(3000, function() {
  console.log("Server started on port 3000");
});