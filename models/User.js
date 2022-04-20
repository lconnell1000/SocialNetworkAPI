const { Schema, model } = require("mongoose");


const userSchema = new Schema(
    {
      username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
      },
      email: {
        type: String,
        unique: true,
        required: true,
        match: [
            /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,5})$/,
             "Please enter a valid email!"],
      },
      thoughts: [
        {
          type: Schema.Types.ObjectId,
          ref: "Thought",
        },
      ],
      friends: [
        {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      ],
    },
    {
      toJSON: {
        virtuals: true,
        getters: true,
      },
      id: false,
    }
  );
  
  //get total friend count
  userSchema.virtual("friendCount").get(function () {
    return this.friends.length ? this.friends.length : 0;
  });
  
  //create user model
  const User = model("user", userSchema);
  
  module.exports = User;