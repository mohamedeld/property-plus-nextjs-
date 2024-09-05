'use server';

import cloudinary from "@/config/cloudinary";
import connectToDb from "@/config/database";
import Property from "@/models/Property";
import { getUserSession } from "@/utils/getUserSession";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function addPropertyAction(formData){
  try{
    await connectToDb();
    const sessionUser = await getUserSession();
    if(!sessionUser || !sessionUser?.userId){
      throw new Error("User ID is required");
    }
    const {userId} = sessionUser;

    const amenities = formData.getAll('amenities');
    const images = formData.getAll('images').filter(image=> image.name !== '');
    const propertyData = {
      owner:userId,
      type:formData.get('type'),
      name:formData.get('name'),
      description:formData.get('description'),
      location:{
        street:formData.get('location.street'),
        city:formData.get('location.city'),
        state:formData.get('location.state'),
        zipcode:formData.get('location.zipcode'),
      },
      beds:formData.get('beds'),
      baths:formData.get('baths'),
      square_feet:formData.get('square_feet'),
      amenities,
      rates:{
        weekly:formData.get('rates.weekly'),
        monthly:formData.get('rates.monthly'),
        nightly:formData.get('rates.nightly'),
      },
      seller_info:{
        name:formData.get('seller_info.name.'),
        email:formData.get('seller_info.email'),
        phone:formData.get('seller_info.phone'),
      },
      
    }
    const imageUrls = []
    for(let imageFile of images){
      const imageBuffer = await imageFile.arrayBuffer();
      const imageArray = Array.from(new Uint8Array(imageBuffer));
      const imageData= Buffer.from(imageArray);

      // convert to base64 
      const imageBase64 = imageData?.toString('base64');
      // make request to cloundinary
      const result = await cloudinary.uploader.upload(`data:image/png;base64,${imageBase64}`,{
        folder:'propertybrad'
      })
      imageUrls.push(result.secure_url);
    }
    propertyData.images = imageUrls;
    const newProperty = await Property.create(propertyData);
    revalidatePath('/','layout');
    
    // Move redirect outside the try-catch block
    return redirect(`/properties/${newProperty?._id}`);
    
  }catch(error){
    console.log(error);
    // Handle any errors here
    throw error; // Re-throw the error to propagate it upwards
  }
}