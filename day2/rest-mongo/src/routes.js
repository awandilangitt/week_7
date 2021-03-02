const router = require("express").Router();

const UsersModel = require("../models/users")();

const middlewareaddUsers = require("../middleware/addusers");
const middlewareditUsers = require("../middleware/editusers");
const middlewaredeleteUsers = require("../middleware/deleteusers");

module.exports = function routes(){
    router.get('/users', async (req, res) => {
        try{
            const data = await UsersModel.find();
            res.json({message: "success read data users", data: data})
        } catch (error) {
            console.log(error);
            res.status(500).json({message: "error when read data users"});
        }
    });

    router.post('/users',middlewareaddUsers, async (req, res) => {
        try{
            await UsersModel.create(req.body);
            res.json({message: "success create new data users"});
        }catch (error) {
            console.log(error);
            res.status(500).json({message: "error when create data user"})
        }
    });

    
    // router.put('/', (req, res) => res.send("Hello You"));    
    router.put('/users', async (req, res) => {
        try{
            await UsersModel.update(req.body)["fullName"];
            res.json({message: "success updated data"});
        }catch (error) {
            console.log(error);
            res.status(500).json({message: "error when update data user"});
        }
    });
    
    // router.delete('/', (req, res) => res.send("Hello You"));
    router.delete('/users', (req, res)=> res.send("data has been deleted"))
    
    return router;
};