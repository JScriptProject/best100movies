import Link from "next/link";
import { Menu, Search } from "lucide-react";
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
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

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
            <NavItem href="/new-releases">New Releases</NavItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Search Icon */}
        <div className="flex items-center gap-4">
          <div className="cursor-pointer rounded-full bg-white/10 p-2 transition hover:bg-white/20">
            <Search className="h-5 w-5 text-white" />
          </div>
          <div className="md:hidden text-white">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6 cursor-pointer" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="bg-black border-white/10 text-white"
              >
                <SheetTitle className="text-white mb-6">Menu</SheetTitle>
                <div className="flex flex-col gap-6 text-lg font-medium mt-8">
                  <Link href="/" className="hover:text-red-500">
                    Home
                  </Link>
                  <Link href="/genre/action" className="hover:text-red-500">
                    Action Movies
                  </Link>
                  <Link href="/genre/romance" className="hover:text-red-500">
                    Romance
                  </Link>
                  <Link href="/genre/horror" className="hover:text-red-500">
                    Horror
                  </Link>
                  <Link href="/new-releases" className="hover:text-red-500">
                    New Releases
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

// Helper component to keep code clean
const NavItem = ({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <NavigationMenuItem>
    <Link href={href} legacyBehavior passHref>
      <NavigationMenuLink
        className={cn(
          navigationMenuTriggerStyle(),
          "bg-transparent text-gray-300 hover:bg-white/10 hover:text-white focus:bg-white/10 focus:text-white",
          className,
        )}
      >
        {children}
      </NavigationMenuLink>
    </Link>
  </NavigationMenuItem>
);
