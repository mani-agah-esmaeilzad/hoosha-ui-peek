import { User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "./ThemeToggle";

interface HeaderProps {
  onToggleSidebar?: () => void;
}

export const Header = ({ onToggleSidebar }: HeaderProps) => {
  return (
    <header className="h-16 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="flex items-center justify-between h-full px-4 md:px-6">
        {/* Left - Mobile Menu + Logo */}
        <div className="flex items-center space-x-4 space-x-reverse">
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden h-9 w-9"
            onClick={onToggleSidebar}
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          {/* Logo */}
          <div className="text-xl md:text-2xl font-bold text-hoosha-orange">
            HOOSHA
          </div>
        </div>

        {/* Right - Theme Toggle + User Menu */}
        <div className="flex items-center space-x-2 space-x-reverse">
          <ThemeToggle />
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full h-9 w-9">
                <User className="h-4 w-4" />
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