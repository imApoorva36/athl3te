import LayeredCard from "@/components/LayeredCard";
import { Activity, Rocket, Sparkles, Target, Users, Utensils } from "lucide-react";
import Link from "next/link";

export default function Home() {

    const features = [
        { icon: <Activity className="h-5 w-5" />, text: "Monitor your activities" },
        { icon: <Target className="h-5 w-5" />, text: "Push yourself to achieve your goals" },
        { icon: <Users className="h-5 w-5" />, text: "Discuss with like minded individuals" },
        { icon: <Utensils className="h-5 w-5" />, text: "Curate personalised custom diets" },
        { icon: <Sparkles className="h-5 w-5" />, text: "Enhanced features and insights with AI" },
      ];

    return (
        <div>
            <div className="flex min-h-screen flex-col text-white items-center justify-between bg-gradient-to-b from-primary to-destructive px-6 py-12">
          <h1 className="mb-12 text-3xl font-bold text-white mx-auto">ATHL3TE</h1>
          <div className="flex flex-row items-center align-middle my-6 px-4">
            <Rocket className="h-16 w-16 my-auto align-middle" />
            <h2 className="text-2xl font-semibold text-white my-auto text-center p-2">Boost your fitness goals with Athl3te AI</h2>
          </div>
          <div className="mb-12 space-y-8">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                {feature.icon}
                <span className="text-sm">{feature.text}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-row items-center align-middle my-6">
            <LayeredCard
              mainColor="bg-accent"
              bgColor="bg-primary"
              borderWidth="border-[2px]"
              topOffset="top-[10px]"
              leftOffset="left-[14px]"
              roundedness="rounded-lg"
              textColor="text-black"
            >
              <Link href="/login"
                className="flex mx-auto w-full p-4 gap-2"
              >
                Get Started
              </Link>
            </LayeredCard>
          </div>
        </div>
        </div>
    );
}