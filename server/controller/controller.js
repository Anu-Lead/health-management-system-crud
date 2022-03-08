 const { findByIdAndDelete } = require('../model/model');
let Userdb = require('../model/model');

//  create and save new user
exports.create = (req, res) => {
    // validate request
    if(!req.body){
        res.status(400).send({message: "Content cannot be empty."});
        return
    } 

    // new user
    const user = new Userdb({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        status: req.body.status
    })

    // save user in the database
    user
    .save(user)
    .then(data =>{
        // res.send(data)
        res.redirect('add-user')
    })
    .catch(err =>{
        res.status(500).send({
            message:err.message || "Some error occured while creating a create operation"
        });
    });
}

// retrieve and return all users/ retrive and return a single user
exports.find = (req, res) => {
    if(req.query.id){
        const id = req.query.id;
        Userdb.findById(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message: "Not Found User with ID" + id})
            }else {
                res.send(data)
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Error Retrieving User with ID" + id})
        })


    }else {
        Userdb.find()
    .then(user => {
        res.send(user)
    })
    .catch(err => {
        res.status("500").send({message: err.message || "Error Occurred while Retriving User Information"})
    })
    }
}

// 

// update a new identified user by user id
exports.update = (req, res) => {
    if(!req.body) {
        return res
        .status(400)
        .send({message: "Data-field to update cannot be empty "})
    }
    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
    .then(data => {
        if(!data){
            res.status(404).send({message: `Cannot Update User with ${id}. Maybe User Not Found`})
        } else {
            res.send(data)
        }
    })
    .catch(err => {
        res.status(500).send({messgae: "Error Update User Information"})
    })
}

// Delete a user with specified user id in the request.
exports.delete = (req, res)=>{
    const id =req.params.id;

    Userdb.findByIdAndDelete(id)
    .then(data => {
        if(!data){
            res.status(404).send({message: `Cannot Delete with ID ${id}. Perhaps, ID is Incorrect.`})
        }else{
            res.send({
                message: "This user has been deleted successfully!"
            })
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Could not Delete User with ID =" + id
        });
    });
}

