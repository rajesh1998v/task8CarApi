let express = require("express") ;
let app = express();
app.use(express.json ());
app.use( function (req, res, next) {
res.header("Access-Control-Allow-Origin","*");
res.header( "Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE, HEAD");
res. header( "Access-Control-Allow-Headers", "Origin, x-Requested-With, Content-Type, Accept");
next();
});
const port = 2410;
app.listen(port,()=>console.log(`Listening on port ${port}!`));

let {carMasterData,carData} = require("../carData");

app.get("/cars",function(req,res){
    let minprice = req.query. minprice;
    let maxprice = req.query.maxprice;
    let fuel = req.query.fuel;
    let type = req.query.type;
    let sort = req.query.sort;
    let arr1 = carData;
    let arr2 = carMasterData;

    if(maxprice){
        arr1 = arr1.filter((ct)=>ct.price>=maxprice);
    }
    if(minprice){
        arr1 = arr1.filter((ct)=>ct.price<=minprice);
    }
    if(fuel){
        arr2 = arr2.filter((st)=>st.fuel===fuel);
        arr1 = arr1.filter((c1)=>arr2.find((m1)=>m1.model===c1.model));
    }
    if(type){
        arr2 = arr2.filter((st)=>st.type===type);
        arr1 = arr1.filter((c1)=>arr2.find((m1)=>m1.model===c1.model));
    }
    if(sort==="kms"){
        arr1.sort((ct1,ct2)=>ct1.kms-ct2.kms);
    }
    if(sort==="price"){
        arr1.sort((ct1,ct2)=>ct1.price-ct2.price);
    }
    if(sort==="year"){
        arr1.sort((ct1,ct2)=>ct1.year-ct2.year);
    }
    res.send(arr1);
});

app.get("/cars/:id",function(req,res){
    let id = req.params.id;
    let car = carData.find(ct=>ct.id===id);
    res.send(car);
 })

 app.post("/cars",function(req,res){
    let body = req.body;
    carData.push(body);
    res.send(body);
});

app.put("/cars/:id",function(req,res){
    let id = req.params.id;
    let body = req.body;
    let index = carData.findIndex((p1)=>p1.id===id);
    if(index>=0){
        let updateCar = {id:id,...body};
        updateCar[index] = updateCar;
        res.send(body);
    }else{
        res.status(404).send("No Found")
    }
   
})

app.delete("/cars/:id",function(req,res){
    let id = req.params.id;
    let  index = carData.findIndex((p1)=>p1.id===id);
    let deleteCar = carData.splice(index,1);
    res.send(deleteCar);
})

app.get("/carmaster",function(req,res){
    // let car = carMasterData.find(ct=>ct.id===id);
    res.send(carMasterData);
 })