import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

const userSchema = new mongoose.Schema({
        username:{
                type: String,
        },
        password: {
                type: String,
                required: true,
        },
        email: {
                type: String,
                required: true,
                unique: true
        }
});


//Static Signup Method
userSchema.statics.signup = async function(username, password, email) {
        //Validate the user's input
        if (!username || !email || !password) {
                throw Error('All fields must be filled')
        }
        //Validate user's email
        if (!validator.isEmail(email)) {
                throw Error('Email not valid')
        }
        //Validate user's password
        if (!validator.isStrongPassword(password)) {
                throw Error('Password not strong enough')
        }

        //Check if the email is already in the database
        const exists = await this.findOne({ email })
        if (exists) {
          throw Error('Email already in use')
        }
      
        //Create a user
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)
      
        const user = await this.create({ username, password: hash, email })
      
        return user
}
      
//Static Log In Method
userSchema.statics.login = async function(email, password) {
        //Validate the user's input
        if (!email || !password) {
                throw Error('All fields must be filled')
        }

        //Check if the email is already in the database
        const user = await this.findOne({ email })

        //Return error if we can't find any email already exist in the database
        if (!user) {
          throw Error('Incorrect email')
        }

        //Need to match the email
        const match = await bcrypt.compare(password, user.password)
      
        if (!match) {
                throw Error('Incorrect password')
        }
            
        return user
}


//Model are fancy constructors compiled from schema definitions. 
// Instance of a model is called a document
const User = mongoose.model('User', userSchema);
export default User;