import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'
import User from "../model/user.js";
//const getSignedToken = require ("../util/signedToken");

const getSignedToken = function (id) {
  return jwt.sign({ _id: id }, process.env.JWT_SECRET, { expiresIn: "1hr" });
};

//export default getSignedToken;

async function createUser(payload) {
  return User.find({ email: payload.email })
    .exec()
    .then((user) => {
      if (user.length > 0) {
        throw new Error("User already exist");
      }
      return bcrypt
        .hash(payload.password, 10)
        .then((hashed) => {
          const newUser = new User({
            email: payload.email,
            password: hashed,
          });
          return newUser.save();
        })
        .catch((err) => {
          throw new Error("All field required");
        });
    });
}

const signInUser = async(payload) => {
  const user = await User.findOne({ email: payload.email })
    if (!user){
        throw new Error("Please enter email or password");
    }
    else {
        try {
            const res = await bcrypt.compare(payload.password, user.password)
            if (res){
             const token = getSignedToken(user._id);
             return token 
            }
        } catch (error) {
            console.log(error)
            throw new Error("All field required");
        }
   
}}
export default { createUser, signInUser, getSignedToken };