import { Button } from "@/components/ui/button";
import Link from 'next/link'
import { MoveRightIcon } from "lucide-react";

export default function Home() {
  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold">Welcome to the ELO Decision Maker</h1>
      <p className="mt-4 text-lg text-gray-600">
        Start ranking your decisions and view the results in real-time!
      </p>
      <div className="mt-8">
        <Link href="/startpage">
        <Button>
          Start here <MoveRightIcon/>
        </Button>
        </Link>
      </div>
    </div>
  );
}
