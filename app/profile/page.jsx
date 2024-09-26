import Image from "next/image";
import Link from "next/link";
import connectToDb from "@/config/database";
import { getUserSession } from "@/utils/getUserSession";
import Property from "@/models/Property";
import ProfileProperties from "@/components/ProfileProperties";
import convertToObjectSerializable from "@/utils/convertToObject";
const ProfilePage = async () => {
  await connectToDb();
  const userSession = await getUserSession();
  const { userId } = userSession;
  if (!userId) {
    throw new Error("user id is required");
  }

  const propertiesDocs = await Property?.find({
    owner: userId,
  })?.lean();

  const properties = propertiesDocs?.map(convertToObjectSerializable)

  return (
    <section className="bg-blue-50">
      <div className="container m-auto py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <h1 className="text-3xl font-bold mb-4">Your Profile</h1>
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/4 mx-20 mt-10">
              <div className="mb-4">
                <Image
                  width={200}
                  height={200}
                  objectFit="cover"
                  className="h-32 w-32 md:h-48 md:w-48 rounded-full mx-auto md:mx-0 object-cover"
                  src={userSession?.user?.image || "/images/profile.png"}
                  alt="User"
                />
              </div>

              <h2 className="text-2xl mb-4">
                <span className="font-bold block">Name: </span>{" "}
                {userSession?.user?.name}
              </h2>
              <h2 className="text-2xl">
                <span className="font-bold block">Email: </span>{" "}
                {userSession?.user?.email}
              </h2>
            </div>

            <div className="md:w-3/4 md:pl-4">
              <h2 className="text-xl font-semibold mb-4">Your Listings</h2>
              <ProfileProperties properties={properties} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
