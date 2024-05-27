import Image from "next/image";
import Hero from "./components/Hero";
import MostPopular from "./components/MostPopular";
import Promotion from "./components/Promotion";
import News from "./components/News";
import { client } from "./lib/sanity";

export default async function Home () { 

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Hero/>
      <MostPopular/>
      <Promotion/>
      <News/>
    </main>
  );
}
