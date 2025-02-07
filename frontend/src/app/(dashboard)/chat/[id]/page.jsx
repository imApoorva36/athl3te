import { Heart, Send } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import LayeredCard from "@/components/LayeredCard";
import Link from "next/link";
import Image from "next/image";

export default function Chat() {
    const chatData = {
        communityName: "Cardio Community",
        welcomeMessage: "Welcome to the Cardio Community! 🎉",
        messages: [
            {
                id: 1,
                text: "Hey, what's happening today?",
                sender: "Abhishek",
                time: "10:32 AM",
                isUser: true
            },
            {
                id: 2,
                text: "Cardio bois, lessgooo!",
                sender: "Fahim",
                time: "10:32 AM",
                isUser: false
            },
            {
                id: 3,
                text: "Cardio bois, lessgooo!",
                sender: "AI",
                time: "10:32 AM",
                isAI: true
            }
        ]
    };

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
                        <Button variant="ghost" size="icon" className="text-primary hover:text-descructive">
                            <Image src="/back.png" width={20} height={20} alt="back" />
                        </Button>
                    </Link>
                </LayeredCard>
                <h1 className="text-xl font-semibold mt-2 mx-auto">{chatData.communityName}</h1>
                <LayeredCard
                    mainColor="bg-accent"
                    bgColor="bg-primary"
                    borderWidth="border-[2px]"
                    topOffset="top-[8px]"
                    leftOffset="left-[3px]"
                    roundedness="rounded-lg"
                    textColor="text-white"
                >
                    <Button variant="ghost" size="icon">
                        <Image src="/wallet.png" width={20} height={20} alt="wallet" />
                    </Button>
                </LayeredCard>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <div className="text-center text-gray-600">{chatData.welcomeMessage}</div>

                {chatData.messages.map((message) => (
                    <div key={message.id} className={`flex flex-col ${message.isUser ? 'items-end' : 'items-start'}`}>
                        <LayeredCard
                            mainColor={message.isUser ? "bg-primary" : "bg-accent"}
                            bgColor={message.isUser ? "bg-accent" : "bg-primary"}
                            borderWidth="border-[2px]"
                            topOffset="top-[10px]"
                            leftOffset="left-[14px]"
                            roundedness="rounded-xl"
                            textColor={message.isUser ? "text-white" : "text-black"}
                        >
                            <div className={`px-4 py-2 max-w-[80%] ${message.isAI ? 'flex items-center gap-2' : ''}`}>
                                {message.isAI && <Heart className="h-4 w-4 text-[#FF4500] fill-[#FF4500]" />}
                                {message.text}
                            </div>
                        </LayeredCard>
                        <span className="text-xs text-gray-500 mt-2">{message.sender} @ {message.time}</span>
                    </div>
                ))}
            </div>

            {/* Input Area */}
            <div className="p-4 border-t">
                <div className="flex gap-2">
                    <Input
                        placeholder="Type something..."
                        className="h-12 rounded-lg border-2 border-black focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                    <Button className="h-12 w-12 rounded-lg border-2 border-black bg-primary hover:bg-destructive">
                        <Send className="h-6 w-6" />
                    </Button>
                </div>
            </div>
        </>
    )
}

