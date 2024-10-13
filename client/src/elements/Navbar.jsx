import { useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowRight, Menu, UserCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const Navbar = () => {
    const { user, isLoggedIn, logout } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };
    const handleLogoClick = () => {
        if (!isLoggedIn) {
            navigate('/');
        }
        else {
            navigate('/dashboard');
        }
    };

    const NavItems = () => (
        <>
            {!isLoggedIn ? (
                <>
                    <Button variant="ghost" asChild>
                        <a href="/login">Login</a>
                    </Button>
                    <Button variant="default" asChild>
                        <a href="/register">Sign Up</a>
                    </Button>
                </>
            ) : (
                <>
                </>
            )}
        </>
    );

    return (
        <nav className="z-20 bg-transparent fixed w-full flex items-center justify-between p-4 bg-background">
            <div className="flex items-center space-x-2 cursor-pointer" onClick={handleLogoClick} >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                >
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
                <span className="font-bold text-xl">MyContacts</span>
            </div>

            <div className="hidden md:flex items-center space-x-4">
                <NavItems />
            </div>
            {!isLoggedIn ? (
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild className="md:hidden">
                        <Button variant="ghost" size="icon">
                            <Menu className="h-6 w-6" />
                            <span className="sr-only">Toggle menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-[240px] sm:w-[300px]">
                        <div className="flex flex-col  space-y-4 mt-4">
                            <NavItems />
                        </div>
                    </SheetContent>
                </Sheet>) : (
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Avatar className="cursor-pointer mx-auto ">
                            {user?.profilePicture ? (
                                <AvatarImage src={user.profilePicture} alt={user.name} />
                            ) : (
                                <AvatarFallback>
                                    <UserCircle2 className="h-5 w-5" />
                                </AvatarFallback>
                            )}
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="-ml-24">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem >{user.username}</DropdownMenuItem>
                        <DropdownMenuItem onClick={handleLogout} className="text-red-500 font-semibold">
                            Logout<ArrowRight className="ml-1 w-3" />
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )}
        </nav>
    );
};

export default Navbar;
