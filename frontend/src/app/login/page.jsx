"use client";

import { ChevronLeft, ChevronRight, Rocket, Activity, Target, Users, Utensils, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { WalletComponents } from "@/components/WalletComponents";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import LayeredCard from "@/components/LayeredCard";
import Image from "next/image";

const handleLogin = () => {
  const clientId = process.env.NEXT_PUBLIC_STRAVA_CLIENT_ID;
  const redirectUri = process.env.NEXT_PUBLIC_STRAVA_REDIRECT_URI;
  const authUrl = `https://www.strava.com/oauth/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=read,activity:read_all&approval_prompt=force`;
  window.location.href = authUrl;
};

export default function LoginPage() {
  const router = useRouter();
  const { address, isConnected } = useAccount();
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    if (isConnected && address) {
      // setIsRedirecting(true);
      // router.push("/achievements");
    }
  }, [isConnected, address, router]);
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    age: 21,
    weight: 60,
    height: 180,
    gender: "",
  })

  const features = [
    { icon: <Activity className="h-5 w-5" />, text: "Monitor your activities" },
    { icon: <Target className="h-5 w-5" />, text: "Push yourself to achieve your goals" },
    { icon: <Users className="h-5 w-5" />, text: "Discuss with like minded individuals" },
    { icon: <Utensils className="h-5 w-5" />, text: "Curate personalised custom diets" },
    { icon: <Sparkles className="h-5 w-5" />, text: "Enhanced features and insights with AI" },
  ]

  const handleNext = () => setStep(2)
  const handleBack = () => setStep(1)

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleIncrement = (field) => {
    setFormData((prev) => ({ ...prev, [field]: Number(prev[field]) + (field === "height" ? 1 : 1) }))
  }

  const handleDecrement = (field) => {
    setFormData((prev) => ({ ...prev, [field]: Number(prev[field]) - (field === "height" ? 1 : 1) }))
  }

  return (
    <div className="min-h-screen w-full">
      {step === 1 ? (
        <div className="flex min-h-screen flex-col px-6 py-12">
          <div className="flex flex-row justify-center items-center mb-10">
            <Image src="/logo/athlete_logo.png" width={50} height={50} alt="logo" />
            <h1 className="text-3xl font-bold mt-2 text-primary">ATHL3TE</h1>
          </div>

          <WalletComponents />

          <h2 className="my-8 text-xl font-semibold">Fill in your personal information</h2>

          <div className="space-y-6">
            <div>
              <label className="mb-2 block">Name:</label>
              <Input
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Enter your Name"
                className="rounded-full border py-2"
              />
            </div>

            <div>
              <label className="mb-2 block">Age:</label>
              <div className="flex items-center gap-2">
                <Button onClick={() => handleDecrement("age")} variant="outline" size="icon" className="rounded-full">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="min-w-[40px] text-center">{formData.age}</span>
                <Button onClick={() => handleIncrement("age")} variant="outline" size="icon" className="rounded-full">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex gap-8">
              <div>
                <label className="mb-2 block">Weight:</label>
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => handleDecrement("weight")}
                    variant="outline"
                    size="icon"
                    className="rounded-full"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span className="min-w-[40px] text-center">{formData.weight} kg</span>
                  <Button
                    onClick={() => handleIncrement("weight")}
                    variant="outline"
                    size="icon"
                    className="rounded-full"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div>
                <label className="mb-2 block">Height:</label>
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => handleDecrement("height")}
                    variant="outline"
                    size="icon"
                    className="rounded-full"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span className="min-w-[40px] text-center">{formData.height} cm</span>
                  <Button
                    onClick={() => handleIncrement("height")}
                    variant="outline"
                    size="icon"
                    className="rounded-full"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div>
              <label className="mb-2 block">Gender:</label>
              <div className="flex gap-4">
                {["Male", "Female"].map((gender) => (
                  <LayeredCard
                    key={gender}
                    mainColor="bg-accent"
                    bgColor="bg-primary"
                    borderWidth="border-[2px]"
                    topOffset="top-[8px]"
                    leftOffset="left-[8px]"
                    roundedness="rounded-lg"
                    textColor="text-white"
                  >
                    <Button
                      key={gender}
                      onClick={() => handleInputChange("gender", gender)}
                      variant={formData.gender === gender ? "default" : "outline"}
                      className={`${formData.gender === gender ? "bg-primary text-white hover:bg-destructive" : ""
                        }`}
                    >
                      {gender}
                    </Button>
                  </LayeredCard>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 w-3/4 mx-auto">
            <LayeredCard
              mainColor="bg-primary"
              bgColor="bg-white"
              borderWidth="border-[2px]"
              topOffset="top-[8px]"
              leftOffset="left-[12px]"
              roundedness="rounded-lg"
              textColor="text-white"
            >
              <Button
                onClick={handleNext}
                className="flex mx-auto w-full"
              >
                NEXT
              </Button>
            </LayeredCard>
          </div>
        </div>
      ) : (
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
              textColor="text-white"
            >
              <button
                onClick={async () => {
                  try {
                    const response = await handleLogin();
                    console.log("Strava Response:", response);
                  } catch (error) {
                    console.error("Error fetching Strava data:", error);
                  }
                }}
                className="flex mx-auto w-full p-4 gap-2"
              >
                <Image src="/logo/strava_logo.png" width={30} height={30} alt="strava" />
                Login with Strava
              </button>
            </LayeredCard>
          </div>
        </div>
      )}
    </div>
  )
}
