import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    userId: String,
    currentCards: Array,
    // Add other fields as needed
})

const User = mongoose.models.User || mongoose.model('User', userSchema)

export default User
