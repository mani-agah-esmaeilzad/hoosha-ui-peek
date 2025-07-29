import { useState } from "react";
import { Send, Paperclip, Mic, FileText, DollarSign, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export const ChatArea = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue("");

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: "در حال پردازش پاسخ شما...",
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Welcome Section */}
      {messages.length === 0 && (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center max-w-md">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-hoosha-orange to-hoosha-orange-hover flex items-center justify-center">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-hoosha-orange rounded-full"></div>
              </div>
            </div>
            
            <h1 className="text-3xl font-bold mb-2">هوش مصنوعی فارسی</h1>
            <p className="text-muted-foreground mb-8">
              هوشا، ابزارهای هوش مصنوعی فارسی برای تولید محتوا و تحلیل همه در یک‌جا
            </p>

            {/* Quick Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-sm mx-auto px-4">
              <Button variant="outline" className="h-12 text-xs flex items-center space-x-2 space-x-reverse justify-center">
                <FileText className="h-4 w-4" />
                <span>تحلیل بازار فایل</span>
              </Button>
              <Button variant="outline" className="h-12 text-xs flex items-center space-x-2 space-x-reverse justify-center">
                <DollarSign className="h-4 w-4" />
                <span>ایده پیش‌فروش ماهه</span>
              </Button>
              <Button variant="outline" className="h-12 text-xs flex items-center space-x-2 space-x-reverse justify-center">
                <Mic className="h-4 w-4" />
                <span>من رو شگفت‌انده دکن</span>
              </Button>
              <Button variant="outline" className="h-12 text-xs flex items-center space-x-2 space-x-reverse justify-center">
                <TrendingUp className="h-4 w-4" />
                <span>تحلیل بازار</span>
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Messages Area */}
      {messages.length > 0 && (
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <Card className={`max-w-[70%] p-4 ${
                message.sender === 'user' 
                  ? 'bg-hoosha-orange text-white' 
                  : 'bg-muted'
              }`}>
                <p className="text-sm">{message.content}</p>
              </Card>
            </div>
          ))}
        </div>
      )}

      {/* Input Area */}
      <div className="border-t bg-background p-4">
        <div className="max-w-4xl mx-auto">
          {/* Mobile New Chat Button */}
          <div className="mb-4 md:hidden">
            <Button className="w-full bg-hoosha-orange hover:bg-hoosha-orange-hover text-white">
              <span>گفتگوی جدید</span>
            </Button>
          </div>
          <div className="relative">
            <Textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="پاسخ به چه موضوعی می‌توانم کمکتان کنم؟"
              className="min-h-[60px] resize-none pl-16 md:pl-24 pr-12 text-right text-sm md:text-base"
              dir="rtl"
            />
            
            {/* Attachment Button */}
            <Button
              size="icon"
              variant="ghost"
              className="absolute right-2 bottom-2 h-8 w-8"
            >
              <Paperclip className="h-4 w-4" />
            </Button>

            {/* Send Button */}
            <Button
              onClick={handleSendMessage}
              size="icon"
              className="absolute left-2 bottom-2 h-8 w-8 bg-hoosha-orange hover:bg-hoosha-orange-hover"
              disabled={!inputValue.trim()}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex justify-center mt-2">
            <p className="text-xs text-muted-foreground">
              هوش مصنوعی ممکن است اشتباه کند. اطلاعات مهم را بررسی کنید
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};