import Link from "next/link";
// Make sure to import these components from your shadcn path
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils"; // Assuming you have the cn utility now

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-white/10 bg-black py-12 text-gray-400">
      <div className="container mx-auto grid grid-cols-1 gap-8 px-4 md:grid-cols-4">
        {/* Brand */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white">Best100Movies</h3>
          <p className="text-sm leading-relaxed">
            Your daily source for the curated best movies of 2026. No filler,
            just cinema.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="mb-4 font-semibold text-white">Explore</h4>
          <ul className="space-y-2 text-sm">
            <FooterLink href="/new-releases">New Releases</FooterLink>
            <FooterLink href="/genre/action">Action Movies</FooterLink>
            <FooterLink href="/genre/horror">Horror Movies</FooterLink>
            <FooterLink href="/blog">Film Blog</FooterLink>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="mb-4 font-semibold text-white">Legal</h4>
          <ul className="space-y-2 text-sm">
            <FooterLink href="/privacy" className="hover:text-white">
              Privacy Policy
            </FooterLink>
            <FooterLink href="/terms" className="hover:text-white">
              Terms of Service
            </FooterLink>
            <FooterLink href="/contact" className="hover:text-white">
              Contact Us
            </FooterLink>
          </ul>
        </div>

        {/* Newsletter / Social */}
        <div>
          <h4 className="mb-4 font-semibold text-white">Stay Updated</h4>
          <div className="flex gap-2">
            {/* Replaced with Shadcn Input component */}
            <Input
              placeholder="Enter email"
              className="w-full bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus-visible:ring-red-500"
            />
            {/* Replaced with Shadcn Button component */}
            <Button variant="default" className="bg-red-600 hover:bg-red-700">
              Go
            </Button>
          </div>
        </div>
      </div>
      <div className="container mx-auto mt-12 border-t border-white/5 px-4 pt-8 text-center text-xs">
        © 2026 Best100Movies. All rights reserved.
      </div>
    </footer>
  );
}

// Optional: A helper component for links to apply consistent styling and use the cn utility
const FooterLink = ({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <li>
    <Link
      href={href}
      className={cn("hover:text-red-500 transition-colors", className)}
    >
      {children}
    </Link>
  </li>
);
