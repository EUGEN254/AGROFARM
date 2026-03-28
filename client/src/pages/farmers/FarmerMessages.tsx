import { useState } from "react";
import { Send, Menu } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const conversations = [
  { id: 1, name: "John Doe", lastMessage: "Are tomatoes available?" },
  { id: 2, name: "Market Hub Ltd", lastMessage: "We need 200kg potatoes" },
  { id: 3, name: "Jane Smith", lastMessage: "Can you deliver tomorrow?" },
];

const messagesData = {
  1: [
    { from: "buyer", text: "Hi, are tomatoes available?" },
    { from: "farmer", text: "Yes, I have fresh stock." },
  ],
  2: [
    { from: "buyer", text: "We need 200kg potatoes" },
  ],
  3: [
    { from: "buyer", text: "Can you deliver tomorrow?" },
  ],
};

export default function FarmerMessages() {
  const [activeChat, setActiveChat] = useState(conversations[0]);
  const [messages, setMessages] = useState(messagesData);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;

    setMessages((prev) => ({
      ...prev,
      [activeChat.id]: [
        ...(prev[activeChat.id] || []),
        { from: "farmer", text: input },
      ],
    }));

    setInput("");
  };

  /* -------------------------
     CHAT LIST (REUSABLE)
  --------------------------*/
  const ChatList = () => (
    <div className="w-full md:w-80 border-r bg-card">
      <div className="p-4 font-semibold">Messages</div>
      <Separator />

      <ScrollArea className="h-[calc(100vh-100px)]">
        {conversations.map((chat) => (
          <div
            key={chat.id}
            onClick={() => setActiveChat(chat)}
            className={`flex items-center gap-3 p-3 cursor-pointer hover:bg-muted ${
              activeChat.id === chat.id ? "bg-muted" : ""
            }`}
          >
            <Avatar>
              <AvatarFallback>
                {chat.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <p className="font-medium text-sm">{chat.name}</p>
              <p className="text-xs text-muted-foreground truncate">
                {chat.lastMessage}
              </p>
            </div>
          </div>
        ))}
      </ScrollArea>
    </div>
  );

  return (
    <div className="flex h-[calc(100vh-80px)] overflow-hidden">

      {/* DESKTOP SIDEBAR */}
      <div className="hidden md:block">
        <ChatList />
      </div>

      {/* MOBILE SIDEBAR */}
      <div className="md:hidden absolute top-4 left-4 z-50">
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline">
              <Menu size={18} />
            </Button>
          </SheetTrigger>

          <SheetContent side="left" className="p-0">
            <ChatList />
          </SheetContent>
        </Sheet>
      </div>

      {/* CHAT AREA */}
      <div className="flex-1 flex flex-col bg-background">

        {/* HEADER */}
        <div className="p-4 border-b flex items-center gap-3">
          <Avatar>
            <AvatarFallback>
              {activeChat.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <p className="font-semibold">{activeChat.name}</p>
        </div>

        {/* MESSAGES */}
        <ScrollArea className="flex-1 p-4 space-y-4">
          {(messages[activeChat.id] || []).map((msg, i) => (
            <div
              key={i}
              className={`flex ${
                msg.from === "farmer" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`px-4 py-2 rounded-xl max-w-xs text-sm ${
                  msg.from === "farmer"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </ScrollArea>

        {/* INPUT */}
        <div className="p-4 border-t flex gap-2">
          <Input
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <Button onClick={sendMessage} size="icon">
            <Send size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
}