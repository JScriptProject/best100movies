import Link from "next/link";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/50 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold tracking-tighter text-white"
        >
          Best<span className="text-red-600">100</span>Movies
        </Link>

        {/* Desktop Links - Using Shadcn NavigationMenu */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="gap-2">
            <NavItem href="/">Home</NavItem>
            <NavItem href="/genre/action">Action</NavItem>
            <NavItem href="/genre/romance">Romance</NavItem>
            <NavItem href="/genre/horror">Horror</NavItem>
            <NavItem
              href="/new-releases"
              className="text-red-500 hover:text-red-400"
            >
              New Releases
            </NavItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Search Icon */}
        <div className="flex items-center gap-4">
          <div className="cursor-pointer rounded-full bg-white/10 p-2 transition hover:bg-white/20">
            <Search className="h-5 w-5 text-white" />
          </div>
        </div>

      </div>
    </header>
  );
}

// Helper component to keep code clean
const NavItem = ({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) => (
  <NavigationMenuItem>
    <Link href={href} legacyBehavior passHref>
      <NavigationMenuLink 
        className={cn(
          navigationMenuTriggerStyle(), 
          "bg-transparent text-gray-300 hover:bg-white/10 hover:text-white focus:bg-white/10 focus:text-white",
          className
        )}
      >
        {children}
      </NavigationMenuLink>
    </Link>
  </NavigationMenuItem>
);