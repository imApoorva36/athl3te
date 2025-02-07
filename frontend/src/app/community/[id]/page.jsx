import { ArrowLeft, ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import LayeredCard from "@/components/LayeredCard"
import Link from "next/link"


export default function Community() {
  const communityData = {
    name: "Cardio Community",
    description:
      "Cardio Community is a group focused on heart health, endurance training, and fitness through activities like running, cycling, and HIIT workouts. It fosters motivation, shared goals, and a supportive environment for improving cardiovascular health. ❤️",
    members: [
      { name: "Abhishek Satpathy", gender: "Male", age: 21 },
      { name: "Fahim Ahmed", gender: "Male", age: 21 },
      { name: "Apoorva", gender: "Female", age: 20 },
    ],
    price: "2000 GWei",
  }

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b">
        <LayeredCard
          mainColor="bg-accent"
          bgColor="bg-primary"
          borderWidth="border-[2px]"
          topOffset="top-[8px]"
          leftOffset="left-[3px]"
          roundedness="rounded-lg"
          textColor="text-white"
        >
          <Link href="/communities">
            <Button variant="ghost" size="icon" className="text-primary hover:text-destructive">
              <ArrowLeft className="h-6 w-6" />
            </Button>
          </Link>
        </LayeredCard>
        <h1 className="text-xl font-semibold mt-2">{communityData.name}</h1>
      </div>

      {/* Description */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <LayeredCard
          mainColor="bg-accent"
          bgColor="bg-primary"
          borderWidth="border-[2px]"
          topOffset="top-[17px]"
          leftOffset="left-[24px]"
          roundedness="rounded-xl"
          textColor="text-black"
        >
          <div className="p-4">
            <p className="text-md  leading-relaxed">{communityData.description}</p>
          </div>
        </LayeredCard>

        <div className="my-10 px-4">
          <h2 className="text-lg font-semibold mb-3">Members</h2>
          <div className="space-y-2">
            {communityData.members.map((member, index) => (
              <div key={index} className="flex justify-between items-center text-sm">
                <span className="font-medium">{member.name}</span>
                <div className="text-gray-500">
                  <span>{member.gender}</span>
                  <span className="mx-2">•</span>
                  <span>{member.age}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Purchase Button */}
      <div className="p-4 justify-center mx-auto">
        <LayeredCard
          mainColor="bg-accent"
          bgColor="bg-primary"
          borderWidth="border-[2px]"
          topOffset="top-[10px]"
          leftOffset="left-[14px]"
          roundedness="rounded-xl"
          textColor="text-black"
        >
          <Button className="w-full h-12 flex items-center justify-center gap-2 bg-transparent hover:bg-transparent text-black">
            <ArrowUp className="h-5 w-5" />
            <span>Purchase for {communityData.price}</span>
          </Button>
        </LayeredCard>
      </div>
    </>

  )
}

