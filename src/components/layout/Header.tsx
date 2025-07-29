import { ChevronDown, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

export const Header = () => {
  return (
    <header className="h-16 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="flex items-center justify-between h-full px-6">
        {/* Logo */}
        <div className="flex items-center space-x-4 space-x-reverse">
          <div className="text-2xl font-bold text-hoosha-orange">
            HOOSHA
          </div>
        </div>

        {/* Center - Model Selector */}
        <div className="flex items-center space-x-2 space-x-reverse">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="min-w-[160px] justify-between">
                ChatGPT 4.1
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="w-[200px]">
              <DropdownMenuItem>هوش مصنوعی پیشرفته</DropdownMenuItem>
              <DropdownMenuItem>ChatGPT 4.1</DropdownMenuItem>
              <DropdownMenuItem>جستجوی وب هوشمند</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Right - User Menu */}
        <div className="flex items-center space-x-4 space-x-reverse">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>کمکهای جدید</DropdownMenuItem>
              <DropdownMenuItem>تاریخچه</DropdownMenuItem>
              <DropdownMenuItem>تنظیمات</DropdownMenuItem>
              <DropdownMenuItem>آموزش و مقالات</DropdownMenuItem>
              <DropdownMenuItem>پشتیبانی تلگرام</DropdownMenuItem>
              <DropdownMenuItem>حساب کاربری</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};