// import express
const express = require("express");
const app = express();

app.use(express.json())
 
// specify the port that your server will run on
const HTTP_PORT = process.env.PORT || 8080;

let currentItems = [
    {
        "name":"Magpie",
        "rarity":"common",
        "description":"Gives 9 gold every 4 spins",
        "goldPerTurn":-1
    },
    {
        "name":"King Midas",
        "rarity":"rare",
        "description":"Adds 1 Gold each turn. Adjacent Gold gives 3x more gold.",
        "goldPerTurn":2
    },
    {
        "name":"Goose",
        "rarity":"common",
        "description":"Has a 1% chance of adding a Golden Egg",
        "goldPerTurn":1
    },
    {
        "name":"Bee",
        "rarity":"uncommon",
        "description":"Adjacent Flowers give 2x more gold",
        "goldPerTurn":1
    },
    {
        "name":"Golden Egg",
        "rarity":"rare",
        "description":"",
        "goldPerTurn":3
    },
    {
        "name":"Cat",
        "rarity":"common",
        "description":"",
        "goldPerTurn":1
    },
    {
        "name":"Void Stone",
        "rarity":"uncommon",
        "description":"Adjacent empty squares give 1 coin more. Destroys itself if adjacent to 0  empty squares. Gives 8 coins when destroyed",
        "goldPerTurn":0
    }
]
 
app.get("/", (req, res) => {
    res.send(currentItems)
});

// list of url endpoints that your server will respond to
app.get("/api/items", (req, res) => {
    res.send(currentItems)
});

app.get("/api/items/:item_name", (req, res) => {
    console.log(req.params)
    let name = req.params.item_name;
    
    for (let i = 0; i < currentItems.length; i++) {
        let item = currentItems[i]
        if (item.name === name) {
            return res.send(item)
        }
    }

    res.status(404).send({msg:`Sorry, could not find item with name: ${name}`})   
});
 
//add
app.post("/api/items", (req, res) => {
     let itemToInsert = req.body
     console.log(itemToInsert)

    // error handling
    if ("name" in req.body && "rarity" in req.body) {
        currentItems.push(itemToInsert)
        res.status(201).send({"msg":"Item successfully inserted!"})
    }
    res.status(401).send({"msg":"Sorry, you are missing a item name or rarity in your json payload"})    
})

// delete
app.delete("/api/items/:item_name", (req,res) => {
    
    let id = req.params.item_name;
    const itemIdFromUser = id

     let pos = undefined
     for (let i = 0; i < currentItems.length; i++) {
         if (currentItems[i].name === itemIdFromUser) {
             pos = i
             break
         }
     }

    if (pos === undefined) {
        res.status(404).send({"msg":`Could not find item with id of ${itemIdFromUser}`})
        return
    }

    currentItems.splice(pos, 1)
    res.send({"msg":`Deleted item with name of ${itemIdFromUser}`})
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