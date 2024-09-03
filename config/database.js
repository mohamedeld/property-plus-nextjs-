import mongoose from 'mongoose';

let connected = false;

 const connectToDb = async ()=>{
  mongoose.set('strictQuery',true);
  if(connected){
    console.log('Mongodb is already connected')
    return;
  }

  try{
    await mongoose.connect(process.env.DB_URL);
    connected = true;
  }catch(error){
    console.log(error)
  }

}
export default connectToDb