import Image from "next/image";
import client from "@/db"
import Link from 'next/link';

const dataFetching = async()=>{
  const users = await client.user.findMany({});
  return users
}
export default async function Home() {
  const users = await dataFetching();
  console.log(users)
  return (
    <div>
      <div className='relative overflow-hidden bg-cover bg-no-repeat bg-background-image h-96 w-full flex justify-center flex-col' >
        <h1 className="font-mono font-light text-gray text-4xl p-4">Welcome to StorySpace: </h1>
        <h2 className="font-mono text-gray p-4">Where Your Imagination <br/>
          Comes to Life
          </h2>
          <Link href="/signup">
            <button className="bg-darkgray text-white w-1/12 p-2 px-3 m-4 rounded-lg">
              Start Writing
            </button>
        </Link>
      </div>
    </div>
  );
}
