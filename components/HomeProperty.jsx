import connectToDb from "@/config/database"
import Property from "@/models/Property";
import PropertyCard from "./PropertyCard";

const HomeProperty = async () => {
  await connectToDb();
  const properties = await Property.find({}).sort({
    createdAt:-1
  }).limit(3);

  return (
    <section className='px-4 py-6'>
      <div className="container-xl lg:container m-auto px-4 py-6">
        <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
          Recent Properties
        </h2>
        {properties?.length > 0 ?(
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties?.map(item=>{
            return (
              <PropertyCard property={item} key={item?._id} />
            )
          })}
          </div>
        ):(<p>No properties found</p>)}
      </div>
    </section>
  )
}

export default HomeProperty