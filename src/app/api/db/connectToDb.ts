import mongoose from 'mongoose'
// track the connection
let isConnected = false
export const connectToDataBase = async () => {
    mongoose.set('strictQuery', true)
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: 'languageAI_user',
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        isConnected = true
        console.log('we connected')
    } catch (error) {
        console.log(error)
    }
}
