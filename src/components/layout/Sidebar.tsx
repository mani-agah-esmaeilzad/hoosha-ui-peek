import { useState } from "react";
import { 
  Brain, 
  MessageSquare, 
  Image, 
  Users, 
  Lightbulb, 
  TrendingUp, 
  Package, 
  Calculator, 
  UtensilsCrossed, 
  Music, 
  Settings,
  ChevronDown,
  Plus,
  History,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

interface SidebarItem {
  title: string;
  icon: any;
  href?: string;
  items?: SidebarItem[];
}

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const sidebarData: SidebarItem[] = [
  {
    title: "مدل ها - AI",
    icon: Brain,
    items: [
      { title: "هوش مصنوعی پیشرفته", icon: Brain, href: "/models/master-mind" },
      { title: "ChatGPT 4.1", icon: MessageSquare, href: "/models/chatgpt-4o" },
      { title: "جستجوی وب هوشمند", icon: TrendingUp, href: "/models/perplexity" },
    ]
  },
  {
    title: "تولید محتوا و عکس",
    icon: Image,
    items: [
      { title: "تولید عکس", icon: Image, href: "/image/generate" },
      { title: "دستیار سوشال مدیا", icon: Users, href: "/content/social-analyst" },
      { title: "مقاله و سئو سایت", icon: MessageSquare, href: "/content/essay" },
    ]
  },
  {
    title: "دستیار ها",
    icon: Users,
    items: [
      { title: "مترجم", icon: MessageSquare, href: "/assistants/translator" },
      { title: "مشاور مسافرتی", icon: MessageSquare, href: "/assistants/travel-agent" },
      { title: "آشپز", icon: UtensilsCrossed, href: "/assistants/cooking" },
      { title: "کارشناس تکنولوژی", icon: Settings, href: "/assistants/tech-expert" },
      { title: "پزشک", icon: MessageSquare, href: "/assistants/doctor" },
      { title: "معلم", icon: MessageSquare, href: "/assistants/teacher" },
      { title: "مربی باشگاه", icon: MessageSquare, href: "/assistants/fitness-coach" },
      { title: "کارشناس کد‌نویسی", icon: MessageSquare, href: "/assistants/code-expert" },
    ]
  },
  {
    title: "ابزار ها",
    icon: Settings,
    items: [
      { title: "ایده های بیزنس", icon: Lightbulb, href: "/tools/business-ideas" },
      { title: "تحلیل بازار فارکس و کریپتو", icon: TrendingUp, href: "/tools/trading" },
      { title: "دراپشیپینگ", icon: Package, href: "/tools/drop-shipping" },
      { title: "حل ریاضیات", icon: Calculator, href: "/tools/math" },
      { title: "برنامه غذایی و رژیم", icon: UtensilsCrossed, href: "/tools/healthy-diet" },
      { title: "تولید موسیقی", icon: Music, href: "/tools/generate-music" },
    ]
  }
];

export const Sidebar = ({ isOpen = true, onClose }: SidebarProps) => {
  const [openGroups, setOpenGroups] = useState<string[]>([]);

  const toggleGroup = (title: string) => {
    setOpenGroups(prev => 
      prev.includes(title) 
        ? prev.filter(g => g !== title)
        : [...prev, title]
    );
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={cn(
        "fixed top-0 right-0 h-full w-80 bg-background border-l z-50 transform transition-transform duration-300 ease-in-out md:relative md:transform-none md:z-auto",
        isOpen ? "translate-x-0" : "translate-x-full md:translate-x-0",
        "md:w-80"
      )}>
        {/* Mobile Close Button */}
        <div className="flex items-center justify-between p-4 border-b md:hidden">
          <div className="text-lg font-bold text-hoosha-orange">منو</div>
          <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-4 border-b hidden md:block">
          <Button className="w-full justify-start bg-hoosha-orange hover:bg-hoosha-orange-hover text-white">
            <Plus className="h-4 w-4 ml-2" />
            گفتگوی جدید
          </Button>
        </div>

        <ScrollArea className="flex-1 h-[calc(100vh-140px)]">
          <div className="p-4 space-y-2">
            {/* History Section */}
            <div className="mb-6">
              <div className="flex items-center text-sm text-muted-foreground mb-2">
                <History className="h-4 w-4 ml-2" />
                تاریخچه
              </div>
              <div className="text-sm text-muted-foreground py-4 text-center">
                خالی است.!
              </div>
            </div>

            {/* Main Navigation */}
            {sidebarData.map((group) => (
              <Collapsible 
                key={group.title}
                open={openGroups.includes(group.title)}
                onOpenChange={() => toggleGroup(group.title)}
              >
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full justify-between hover:bg-muted/50 h-auto py-3"
                  >
                    <div className="flex items-center">
                      <group.icon className="h-4 w-4 ml-2 flex-shrink-0" />
                      <span className="text-sm font-medium truncate">{group.title}</span>
                    </div>
                    <ChevronDown className={cn(
                      "h-4 w-4 transition-transform flex-shrink-0",
                      openGroups.includes(group.title) && "rotate-180"
                    )} />
                  </Button>
                </CollapsibleTrigger>
                
                <CollapsibleContent className="space-y-1 mt-1">
                  {group.items?.map((item) => (
                    <Button
                      key={item.title}
                      variant="ghost"
                      className="w-full justify-start hover:bg-muted/50 h-auto py-2 pr-8"
                    >
                      <item.icon className="h-3 w-3 ml-2 flex-shrink-0" />
                      <span className="text-xs truncate">{item.title}</span>
                    </Button>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            ))}

            {/* Settings at Bottom */}
            <div className="mt-8 pt-4 border-t">
              <Button variant="ghost" className="w-full justify-start hover:bg-muted/50">
                <Settings className="h-4 w-4 ml-2" />
                <span className="text-sm">تنظیمات</span>
              </Button>
            </div>
          </div>
        </ScrollArea>
      </div>
    </>
  );
};