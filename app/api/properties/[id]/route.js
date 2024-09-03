import connectToDb from "@/config/database"
import Property from "@/models/Property";

export const GET = async (request,{params})=>{
  try{
    await connectToDb();
    const property = await Property.findById(params?.id);
    if(!property){
      return new Response('property not found',{stauts:404});
    }
    return new Response(property,{status:200});
  }catch(error){
    return new Response('Something went wrong ',{status:
    500
    })
  }
}