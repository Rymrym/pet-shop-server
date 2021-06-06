import mongoose from"mongoose";

const serviceSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
});

export default mongoose.model("User", userSchema);