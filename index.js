var express = require('express');
var path = require('path');
var port = process.env.PORT || 3000;
var app = express();

let bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({extended:false}));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');	

app.use(express.static(path.join(__dirname, 'public')));

let repairsData = [ {Date: '2020/11/06', custName:'David',CarModel:'BMW',fee:800},
{Date: '2020/08/30', custName:'Robin',CarModel:'BMW',fee:400},
{Date: '2020/12/16', custName:'Tshepiso',CarModel:'Bentley',fee:1455},
{Date: '2018/01/06', custName:'Ofentse',CarModel:'Madzw',fee:5450},
{Date: '2020/04/20', custName:'Jackson',CarModel:'VW',fee:4125},
{Date: '2020/05/06', custName:'Sibusiso',CarModel:'Bentley',fee:8055}, 
{Date: '2020/05/20', custName:'Thembikile',CarModel:'Mercedes-Benz',fee:10021},
{Date: '2020/12/26', custName:'Thabo',CarModel:'Madza',fee:8000},
{Date: '2020/11/12', custName:'Mary Deliwe',CarModel:'VW',fee:1800}, ];



// index page
app.get('/', function(req, res) {
    res.render('index', {Data: repairsData});
});

// form page
app.get('/form', function(req, res) {
    res.render('form');
});

// post form page
app.post('/formData', function(req, res) {
    console.log("New Data Incoming");
    console.log(req.body);
    let repairsEntry = req.body;
    var newRepairsEntry = {Date: repairsEntry.Date, custName: repairsEntry.customerName, CarModel: repairsEntry.carModel , fee: repairsEntry.fee};
    repairsData.push(newRepairsEntry); 
    res.redirect('/');
});

//filtering of collection based on car model
app.get('/cars/:model', function(req, res) {
   console.log(req.params);
   let searchModel = req.params.model;
   res.render('index',{Data: repairsData.filter(item=> item.CarModel == searchModel)});
});

//error Handling
app.use((req, res, next) => {
    const error = new Error('Not Found - Invalid Route');
    error.status = 404;
    next(error);//forwards to the next with the error
});

app.use((error, req, res, next) => {
    res.render('404',{errorData:error});
});

app.listen(port, () => { console.log(`Server listening on port ${port}`) });