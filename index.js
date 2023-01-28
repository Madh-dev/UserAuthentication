const express = require('express');
const bodyParser = require('body-parser');
const { default: mongoose } = require("mongoose");
const path = require('path');
const cookieParser = require('cookie-parser');
const expressHandlebars = require('express-handlebars');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const morgan = require('morgan')
const cors = require('cors');
const connectDb = require('./database/db');


const app = express();
app.use(morgan('dev'));



///=================Middleware to handle views is set up==========
app.set('views', path.join(__dirname, 'views'))
app.engine('handlebars',expressHandlebars.engine({
    extname: '.handlebars',
    defaultLayout: 'layout',
    layoutsDir: 'views/layouts/'
}));
app.set('view engine', 'handlebars')

//===============You set up middleware for express urlencoded,========
 //============cookie, session, and passport.==========
//======= Passport will be used when users want to log in.=======
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    cookie: {maxAge: 60000},
    secret: 'cookiesecret',
    saveUninitialized: false,
    resave: false
}));

//==========initialize passport and passport-session=======
app.use(passport.initialize())
app.use(passport.session());

//=======At some points, you will be displaying flash messages.=======
//===== Thus you need to set up middleware for that, and =====
//===also create the type of flash messages you want.=======
app.use(flash())
app.use((req,res,next)=>{
    res.locals.success_messages = req.flash('success')
    res.locals.error_messages = req.flash('error')
    next()
})
app.use(bodyParser.json());
app.use('/', require('./routes/index'))
app.use('/users', require('./routes/users'))
app.use((req,res,next)=>{
    res.render('notFound')
});


connectDb();
const con = mongoose.connection
con.on('open', ()=>{
    console.log('db connected')
})

app.listen(4000, ()=>{
    console.log('server connected and listening to port 4000');
   
})