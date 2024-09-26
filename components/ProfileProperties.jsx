"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const ProfileProperties = ({ properties: initialProperties }) => {
  const [properties, setProperties] = useState(initialProperties);

  return (
    <>
      {properties?.length > 0 &&
        properties?.map((property) => {
          return (
            <div className="mb-10" key={property?._id}>
              <a href="/property.html">
                <Image
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="h-32 w-full rounded-md object-cover"
                  src={property?.images[0] || "/images/properties/a1.jpg"}
                  alt="Property 1"
                />
              </a>
              <div className="mt-2">
                <p className="text-lg font-semibold">{property?.name} 1</p>
                <p className="text-gray-600">Address: {property?.location?.street} {property?.location?.city} {" "} {property?.location?.state}</p>
              </div>
              <div className="mt-2">
                <Link
                  href="/properties/add"
                  className="bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600"
                >
                  Edit
                </Link>
                <button
                  className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
                  type="button"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
    </>
  );
};

export default ProfileProperties;
