const { User, Thought } = require("../models");

module.exports = {
    //gets all the users
    getUsers(req, res) {
        User.find()
        .select("-__v")
        .then(users => res.json(users))
        .catch((err) => res.status(500).json(err));
    },
    //gets a single user by ID
    getSingleUser(req, res) {
        User.findOne({ "_id": req.params.userID })
        .select("-__v")
        .populate('thoughts')
        .populate('friends')
        .then(user =>  res.json(user))
        .catch((err) => res.status(500).json(err));
    },

    //create user
    createUser(req, res) {
        User.create(req.body)
        .then(user => res.json(user))
        .catch((err) => res.status(500).json(err));
    },

    //update a user by ID
    updateUser(req, res) {
        User.findOneAndUpdate({_id: req.params.userId}, {...req.body}, { new:true })
        .then(user => res.json(user))
        .catch((err) => res.status(500).json(err));
    },

    //delete a user by ID and their thoughts
    deleteUser(req, res) {
        User.findOneAndDelete({_id: req.params.userId})
        .then((user) => {Thought.deleteMany({ _id: { $in: user.thoughts }})})
        .then(() => res.json({message: "user and their thoughts deleted successfully"}))
        .catch((err) => res.status(500).json(err));
        },

    //add new friend to user by ID
    addFriend(req, res) {
        User.findOneAndUpdate({ _id: req.params.userId }, { $addToSet: { friends: req.params.friendId } }, { new: true })
        .then(user => res.json(user))
        .catch((err) => res.status(500).json(err));
    },

    //delete a friend by ID
    deleteFriend(req, res) {
        User.findOneAndUpdate({ _id: req.params.userId }, { $pull: { friends: req.params.friendId } }, { new: true })
        .then(user => res.json(user))
        .catch((err) => res.status(500).json(err));
    },
};