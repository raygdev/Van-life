//import express
const express = require("express");

//create express server
const app = express();

//configure dotenv package
require("dotenv").config();

// import cors to make sure no cors conflicts in dev
const cors = require("cors");

//import helmet for convention in protection. will not configure just use
const helmet = require("helmet");

//default to 8080 if no env file with NODE_PORT=8080 so no conflicts with proxy
//from frontend package.json
const port = process.env.NODE_PORT || 8080;

//import the data array for vans
const data  = require("./data.js")

//app.use allows for the server to use the middleware called inside for every route
app.use(cors({origin:false}));
app.disable("x-powered-by");

//in case of url queries. Won't be part of this app though
app.use(express.urlencoded({ extended: false }));
//checks for body in request object otherwise request.body is undefined

app.use(express.json({
    type(req){
        return true
    }
}));

/**
 * -POST-
 * checks for user and password passed in response body
 */

app.post("/api/login", (req, res, next) => {
    const { email, password } = req.body
            // This is an extremely naive version of authentication. Please don't
            // do this in the real world, and never save raw text passwords
            // in your database 😇
    const user = {...data.user}

            if (!email || !password) {
                res.message = "Both fields required"
                return res.status(422).json({ message: "Both fields required" })
            } else if((user.email === email) && (user.password === password)){
                // At the very least, don't send the password back to the client 😅
                delete user.password
                return res.status(200).json({
                    user,
                    token: "Enjoy your pizza"
                })
            } else {

                res.message = "No user with those credentials found!"
                return res.status(404).json({ message: "No user with those credentials found!" })
            }

           
  });
  

  /**
   * -GET-
   *  gets all vans or a specific van if id is passed
   */
  app.get("/api/vans/:id?", (req, res, next) => {
      
      if(req.params.id){
        let van = data.vans.find(van => van.id === req.params.id)
        console.log(van)
        return res.json({vans:van})
      }
      res.json({vans:data.vans})
      
  });

  /**
   * -GET-
   * gets all vans or a specific van if id is passed
   */
  app.get("/api/host/vans/:id?", (req, res, next) => {
      
    if(req.params.id){
        let foundVan = data.vans.find(van => van.hostId === req.params.id)
        if(!foundVan){
            console.log("no van found")
            const message = "We can't seem to find what you are looking for!"
            res.message = message
            return res.status(404).json({message})
        } else {
            return res.json({vans:foundVan})
        }
    }
    return res.json({vans: data.vans})
  })

app.listen(port, () => {
    console.log(`app is listening on port: ${port} \n this has been fun!`)
})
