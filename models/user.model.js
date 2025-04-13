import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  lastName: {
    type: String,
    default: "lastName",
  },
  location: {
    type: String,
    default: "My City",
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: 'user',
  },
});

const User = mongoose.models.User || mongoose.model("User",UserSchema);
export default User;
