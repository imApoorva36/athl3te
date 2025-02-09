"use client";
import { Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import LayeredCard from "@/components/LayeredCard";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import sendApiRequest from "@/utils/apiUtility";

export default function InjuryAgentChat() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    const agent = "injury_bot";

    useEffect(() => {
        if (agent) {
            const storedMessages = JSON.parse(localStorage.getItem(agent)) || [];
            setMessages(storedMessages);
        }
    }, [agent]);

    const sendMessage = async () => {
        if (!input.trim()) return;

        const newMessage = {
            id: messages.length + 1,
            text: input,
            sender: "Me",
            time: new Date().toLocaleTimeString(),
            isUser: true,
        };

        let updatedMessages = [...messages, newMessage];
        setMessages(updatedMessages);
        localStorage.setItem(agent, JSON.stringify(updatedMessages));
        setInput("");

        setLoading(true);
        try {
            const response = await sendApiRequest({
                agent_name: agent,
                action: "prevention",
                params: { // Hardcoded values for demonstration
                    injuries: ["broken toes"],
                    personal_info:
                        "32-year-old recreational runner, runs 20km per week, has flat feet, works desk job, history of lower back pain",
                },
                input_text: messages[messages.length - 1]?.text || "",
            });

            const botMessage = {
                id: messages.length + 2,
                text: response.response,
                sender: agent,
                time: new Date().toLocaleTimeString(),
                isUser: false,
            };
            updatedMessages = [...updatedMessages, botMessage];
            setMessages(updatedMessages);
            localStorage.setItem(agent, JSON.stringify(updatedMessages));

        } catch (error) {
            console.error("API Error: ", error);
        } finally {
            setLoading(false);
        }
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
                    <Link href="/trainers">
                        <Button variant="ghost" size="icon" className="text-primary hover:text-descructive">
                            <Image src="/back.png" width={20} height={20} alt="back" />
                        </Button>
                    </Link>
                </LayeredCard>
                <h1 className="text-xl font-semibold mt-2 mx-auto">Injury Agent</h1>
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
                        <Image src="/agents/recovery_coach_agent.png" width={20} height={20} alt="wallet" />
                    </Button>
                </LayeredCard>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <div className="text-center text-gray-600">Welcome to Injury Agent Chat! 🎉</div>
                {messages.map((message) => (
                    <div key={message.id} className={`flex flex-col ${message.isUser ? 'items-end' : 'items-start'}`}>
                        <LayeredCard
                            mainColor={message.isUser ? "bg-primary" : "bg-accent"}
                            bgColor={message.isUser ? "bg-accent" : "bg-primary"}
                            borderWidth="border-[2px]"
                            topOffset="top-[10px]"
                            leftOffset="left-[10px]"
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
            <div className="p-4 border-t flex gap-2">
                <Input
                    placeholder="Type something..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="h-12 rounded-lg border-2 border-black"
                />
                <Button onClick={sendMessage} disabled={loading} className="h-12 w-12 rounded-lg border-2 border-black bg-primary">
                    {loading ? "..." : <Send className="h-6 w-6" />}
                </Button>
            </div>
        </>
    );
}
