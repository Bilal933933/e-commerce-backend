import mongoose from "mongoose";

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
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    default: "user",
  },
},
{
  timestamps: true,
}
);

// index to optimize search by email
userSchema.index({ email: 1 });

const User = mongoose.model("User", userSchema);

export default User;