import mongoose from 'mongoose'

export const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('BD Online')
  } catch (err) {
    console.log('Error al conectar a la BD' + err)
  }
}
