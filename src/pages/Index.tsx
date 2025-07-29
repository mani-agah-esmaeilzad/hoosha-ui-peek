import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { ChatArea } from "@/components/chat/ChatArea";

const Index = () => {
  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Header />
      
      <div className="flex h-[calc(100vh-64px)]">
        <ChatArea />
        <Sidebar />
      </div>
    </div>
  );
};

export default Index;
