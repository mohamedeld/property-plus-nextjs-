import Link from "next/link"
import InfoBox from "./InfoBox"

const InfoBoxes = () => {
  return (
    <section>
    <div class="container-xl lg:container m-auto">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
        <InfoBox href="/properties" bgColor={"bg-gray-100"} description={"Find your dream rental property. Bookmark properties and contact owners."} title={"For Renters"} btnTitle={"Browse Properties"} btnStyle={"bg-black hover:bg-gray-700"}/>
        <InfoBox href="/properties/add" bgColor={"bg-blue-100"} description={"List your properties and reach potential tenants. Rent as anairbnb or long term."} title={"For Property Owners"} btnTitle={"Add Property"} btnStyle={"bg-blue-500 hover:bg-blue-600"}/>
      </div>
    </div>
  </section>
  )
}

export default InfoBoxes