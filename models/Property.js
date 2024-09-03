import {Schema,models,model} from 'mongoose'

const propertySchema = new Schema({
  owner:{
    type:Schema.Types.ObjectId,
    ref:'User',
    required:true
  },
  name:{
    type:String,
    required:[true,'name is required']
  },
  type:{
    type:String,
    required:[true,'type is required']
  },
  description:{
    type:String
  },
  location:{
    street:{
      type:String,
    },
    city:String,
    state:String,
    zipCode:String
  },
  beds:{
    type:Number,
    required:[true,'beds are required']
  },
  baths:{
    type:Number,
    required:[true,'beds are required']
  },
  square_feet:{
    type:Number,
    required:[true,'beds are required']
  },
  amenities:[{
    type:String
  }],
  rates:{
    nightly:Number,
    weekly:Number,
    monthly:Number
  },
  seller_info:{
    name:String,
    email:String,
    phone:String
  },
  images:[
    {
      type:String
    }
  ],
  is_featured:{
    type:Boolean,
    default:false
  }
},{timestamps:true});

const Property = models?.Property || model('Property',propertySchema);

export default Property;