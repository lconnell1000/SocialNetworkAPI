const { Thought, User } = require("../models");

module.exports = {
    //get all the thoughts
    getThoughts(req, res) {
        Thought.find()
          .select("-__v")
          .then((thoughts) => res.json(thoughts))
          .catch((err) => res.status(500).json(err));
      },
      //gets a single thought by ID
      getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
          .select("-__v")
          .then((thought) => ( res.json(thought))
          .catch((err) => res.status(500).json(err)));
      },
      //create a thought
      createThought(req, res) {
        Thought.create(req.body)
          .then((thought) => {
            return User.findOneAndUpdate({ username: req.body.username }, { $addToSet: { thoughts: thought._id } }, { new: true });
                            })
          .then((user) => (res.json("Added new thought")))
          .catch((err) => res.status(500).json(err));
      },
      //update thought by ID
      updateThought(req, res) {
        Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $set: req.body }, { new: true })
          .then((thought) => (res.json(thought)))
          .catch((err) => res.status(500).json(err));
      },
      //delete thought by ID
      deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
        .then((thought) => (User.findOneAndUpdate({ thoughts: req.params.thoughtId }, { $pull: { thoughts: req.params.thoughtId } }, { new: true })))
          .then((user) => ( res.json({ message: "Thought deleted successfully!" })))
          .catch((err) => res.status(500).json(err));
      },
      //add a reaction to a thought
      addReaction(req, res) {
        Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $addToSet: { reactions: req.body } }, { runValidators: true, new: true })
          .then((thought) => (res.json(thought)))
          .catch((err) => res.status(500).json(err));
      },
      //delete a reaction to a thought
      deleteReaction(req, res) {
        Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $pull: { reactions: { reactionId: req.body.reactionId } } }, { runValidators: true, new: true })
          .then((thought) => (res.json(thought)))
          .catch((err) => res.status(500).json(err));
      },
};