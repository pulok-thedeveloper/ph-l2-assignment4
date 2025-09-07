import { Link, NavLink } from "react-router-dom";
import { ModeToggle } from "./mode-toggler";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-1 text-2xl font-bold">
          <span className="text-primary">Book</span>
          <span>Store</span>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-6 font-medium text-sm">
          <li>
            <NavLink
              to="/books"
              className={({ isActive }) =>
                isActive
                  ? "text-primary font-semibold"
                  : "hover:text-primary transition-colors"
              }
            >
              All Books
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/borrow-summary"
              className={({ isActive }) =>
                isActive
                  ? "text-primary font-semibold"
                  : "hover:text-primary transition-colors"
              }
            >
              Borrow Summary
            </NavLink>
          </li>
        </ul>

        {/* Right side actions (desktop) */}
        <div className="hidden md:flex items-center gap-3">
          <ModeToggle />
        </div>

        {/* Mobile Menu */}
        <div className="flex items-center gap-2 md:hidden">
          <ModeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <SheetHeader>
                <SheetTitle className="text-xl font-bold">
                  Menu
                </SheetTitle>
              </SheetHeader>
              <ul className="mt-6 px-6 flex flex-col gap-4 font-medium text-base">
                <li>
                  <NavLink
                    to="/books"
                    className={({ isActive }) =>
                      isActive
                        ? "text-primary font-semibold"
                        : "hover:text-primary transition-colors"
                    }
                  >
                    All Books
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/borrow-summary"
                    className={({ isActive }) =>
                      isActive
                        ? "text-primary font-semibold"
                        : "hover:text-primary transition-colors"
                    }
                  >
                    Borrow Summary
                  </NavLink>
                </li>
              </ul>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
