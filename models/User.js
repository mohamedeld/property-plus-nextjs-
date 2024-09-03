import {Schema,models,model} from 'mongoose'

const userSchema = new Schema({
  email:{
    type:String,
    required:[true,'email is required'],
    unique:[true, 'email already exists']
  },
  username:{
    type:String,
    required:[true,'user name is required']
  },
  image:String,
  bookmarks:[{
    type:Schema.Types.ObjectId,
    ref:'Property'
  }]
},{timestamps:true});

const User = models?.User || model('User',userSchema);

export default User;