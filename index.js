// import express
const express = require("express");
const mongoose = require("mongoose");
const app = express();
//const Schema = mongoose.Schema;

app.use(express.json())
 
// specify the port that your server will run on
const HTTP_PORT = process.env.PORT || 8080;

const mongoURL = "mongodb+srv://dbUser:sqDqsr7UDQWgcZ@@cluster0.8ls97.mongodb.net/Cluster0?retryWrites=true&w=majority"

const connectionOptions = {useNewUrlParser: true, useUnifiedTopology: true}

mongoose.connect(mongoURL, connectionOptions).then(
    () => {
        console.log("Connected successfully to your database")
    }
).catch(
    (err) => {
        console.log("Error connecting to the database")
        console.log(err)
    }
)

const Schema = mongoose.Schema;

const CurrentItemsSchema = new Schema({
    name: String,
    rarity: String,
    description: String,
    goldPerTurn: Number
 })
 
 const CurrentItem = mongoose.model("current_item_table", CurrentItemsSchema)

//  const c1 = new CurrentItem({"name":"Magpie","rarity":"common","description":"Gives 9 gold every 4 spins","goldPerTurn":-1})
//  const c2 = new CurrentItem({"name":"King Midas","rarity":"rare","description":"Adds 1 Gold each turn. Adjacent Gold gives 3x more gold.","goldPerTurn":2})
//  const c3 = new CurrentItem({"name":"Goose","rarity":"common","description":"Has a 1% chance of adding a Golden Egg","goldPerTurn":1})
//  const c4 = new CurrentItem({"name":"Bee","rarity":"uncommon","description":"Adjacent Flowers give 2x more gold","goldPerTurn":1})
//  const c5 = new CurrentItem({"name":"Golden Egg","rarity":"rare","description":"","goldPerTurn":3})
//  const c6 = new CurrentItem({"name":"Cat","rarity":"common","description":"","goldPerTurn":1})
//  const c7 = new CurrentItem({"name":"Void Stone","rarity":"uncommon","description":"Adjacent empty squares give 1 coin more. Destroys itself if adjacent to 0  empty squares. Gives 8 coins when destroyed","goldPerTurn":0})


//  CurrentItem.create([c1,c2,c3,c4,c5,c6,c7]).then(
//         () => {
//             console.log("Bulk Insert with create was successful")
//         }
//     ).catch(
//         (err) => {
//             console.log("Error bulk inserting with create into the table.")
//             console.log(err)
//         }
//     )
    

//let currentItems = CurrentItem.find()


// let currentItems = [
//     {
//         "name":"Magpie",
//         "rarity":"common",
//         "description":"Gives 9 gold every 4 spins",
//         "goldPerTurn":-1
//     },
//     {
//         "name":"King Midas",
//         "rarity":"rare",
//         "description":"Adds 1 Gold each turn. Adjacent Gold gives 3x more gold.",
//         "goldPerTurn":2
//     },
//     {
//         "name":"Goose",
//         "rarity":"common",
//         "description":"Has a 1% chance of adding a Golden Egg",
//         "goldPerTurn":1
//     },
//     {
//         "name":"Bee",
//         "rarity":"uncommon",
//         "description":"Adjacent Flowers give 2x more gold",
//         "goldPerTurn":1
//     },
//     {
//         "name":"Golden Egg",
//         "rarity":"rare",
//         "description":"",
//         "goldPerTurn":3
//     },
//     {
//         "name":"Cat",
//         "rarity":"common",
//         "description":"",
//         "goldPerTurn":1
//     },
//     {
//         "name":"Void Stone",
//         "rarity":"uncommon",
//         "description":"Adjacent empty squares give 1 coin more. Destroys itself if adjacent to 0  empty squares. Gives 8 coins when destroyed",
//         "goldPerTurn":0
//     }
// ]
 
app.get("/", (req, res) => {
    CurrentItem.find().exec().then(
        (results) => {
            console.log(results)
            res.send(results)
        }
    ).catch(
        (err) => {
            console.log(error)
            res.status(500).send("Error when getting students from database.")
        }
    )
});

// list of url endpoints that your server will respond to
app.get("/api/items", (req, res) => {
    CurrentItem.find().exec().then(
        (results) => {
            console.log(results)
            res.send(results)
        }
    ).catch(
        (err) => {
            console.log(error)
            res.status(500).send("Error when getting students from database.")
        }
    )
});

app.get("/api/items/:item_name", (req, res) => {
    console.log(req.params)
    let ItemName = req.params.item_name;
    
    CurrentItem.find({name: ItemName}).exec().then(
        (results) => {
            console.log(results)
            res.status(200).send(results)
        }
    ).catch(
        (err) => {
            console.log(error)
            res.status(404).send({msg:`Sorry, could not find item with name: ${name}`})  
        }
    )

     
});
 
//add
app.post("/api/items", (req, res) => {
     let itemToInsert = req.body
     console.log(itemToInsert)

    // error handling
    if("name" in req.body && "rarity" in req.body) {
        ItemToAdd = new CurrentItem({"name": req.body.name,
        "rarity": req.body.rarity,
        "description": req.body.description,
        "goldPerTurn" : req.body.goldPerTurn})
        ItemToAdd.save()
        res.status(201).send({"msg" : "Item was successfully inserted"})
    } else {
        res.status(401).send({"msg":"Sorry, you are missing a item name or rarity in your json payload"})  
    }
      
})

// delete
app.delete("/api/items/:item_name", (req,res) => {
    
    let id = req.params.item_name;
    const itemIdFromUser = id

    CurrentItem.deleteOne({name: itemIdFromUser}).exec().then(
        (results) => {
            console.log(results)
            res.status(200).send({"msg":`Deleted item with name of ${itemIdFromUser}`})
        }
    ).catch(
        (err) => {
            console.log(error)
            res.status(500).send("Error when getting students from database.")
        }
    )
    
})

// update...?
app.put("/api/items/:item_id", (req,res) => {

    res.status(501).send({"msg":`Sorry this feature is not implemented`})

})


   
// start the server and output a message if the server started successfully
const onHttpStart = () => {
 console.log(`Server has started and is listening on port ${HTTP_PORT}`)
}
app.listen(HTTP_PORT, onHttpStart);