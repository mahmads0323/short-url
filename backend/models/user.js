const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  salt: {
    type: String,
    required: true,
  },
  hash: {
    type: String,
    required: true,
  },
  creations: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Url",
    },
  ],
});

userSchema.pre("save", async function (next) {
  const existingUser = await User.findOne({ email: this.email });
  if (existingUser) {
    return next(new Error("email already exists, schema"));
  }
  return next();
});

const User = mongoose.model("user", userSchema);

module.exports = User;
