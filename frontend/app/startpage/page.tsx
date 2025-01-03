import { Separator } from "@/components/ui/separator";
import AddCardForm  from "./AddCardForm";
import { CardList } from "./CardList";

export default function Home() {
return (
  <div>
    <AddCardForm/>
    <Separator />
    <div className="flex items-center justify-center ">

    <CardList />
    </div>
  </div>
)
}