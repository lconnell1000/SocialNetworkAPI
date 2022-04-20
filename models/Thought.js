const { Schema, model } = require("mongoose");
const moment = require("moment");
const Reaction = require("./Reaction");

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (value) => moment(value).format("MMMM Do YYYY, h:mm:ss"),
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [Reaction],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

//get total thought count
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length ? this.reactions.length : 0;
});

//create thought model
const Thought = model("thought", thoughtSchema);

module.exports = Thought;