let express = require ('express');
let app = express();
let bodyParser = require('body-parser');
app.use(bodyParser.json());

//db initial code
let Datastore = require('nedb');
let db = new Datastore('coffee.db');
db.loadDatabase();

let workoutTracker = [];

// app.get('/',(req,res) => {
//     res.send('Hey this is the main page');
// })


//2. add a route on server, that is listening for a post request

app.post('/noMins',(req,res) => {
    console.log(req.body);
    let currentDate = Date();
    let obj = {
        date: currentDate,
        workout: req.body.mins
    }

    //inseret workout data into the database 
    db.insert(obj,(err,newDocs) => {
        // console.log('insered_new_document');
        if(err) {
            res.json({task:"Task Failed"});
        } else {
            res.json({task:"Success"});
            }
        })
       
    })
    // workoutTracker.push(obj);
    // console.log(workoutTracker);




app.use('/',express.static('public'));
app.listen(5000,() => {
    console.log ('listen at localhost: 5000');
})


//add route to get all workout track information
app.get('/getMins', (req,res) => {

    db.find({},(err,docs)=>{
        if(err){
            res.json({task:"Task Failed"})
        }else{
            let obj= {data: docs};
            res.json(obj);
        }
    })

    // let obj = { data: workoutTracker};
    // res.json(obj);
})

// //ad route to get all the workout track information
// app.get('getMins', (req,res)=>{
//     let obj = {data: workoutTracker};
//     res.json(obj);
// })

