import Hero from "@/components/Hero";
import HomeProperty from "@/components/HomeProperty";
import InfoBoxes from "@/components/InfoBoxes";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Hero/>
      <InfoBoxes/>
      <HomeProperty/>
    </div>
  );
}
