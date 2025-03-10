import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
        username: String,
        password: String,
        email: String
});
//Model are fancy constructors compiled from schema definitions. 
// Instance of a model is called a document
const User = mongoose.model('User', userSchema);
export default User;