import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const LandingPage = () => {
  return (
    <section className="relative flex flex-col-reverse md:flex-row items-center justify-between h-screen text-white px-4 md:px-16 lg:px-24 overflow-hidden bg-gradient-to-b from-[#0A0A0A] to-zinc-900">
      {/* Background Image */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'url("/bg.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.15,
          zIndex: 0,
        }}
      ></div>

      {/* Main Content */}
      <div className="flex-1 z-10 md:pr-8 flex flex-col justify-center h-full">
        <h1 className="moving-gradient-text bg-gradient-to-bl bg-clip-text text-transparent from-white to-gray-500 text-4xl md:text-6xl font-bold mb-4">
          Welcome to <span className="md:text-8xl sm:text-7xl">MyContacts</span>
        </h1>
        <p className="text-lg md:text-xl mb-6 max-w-xl">
          Organize, manage, and connect with your contacts effortlessly.
        </p>
        <div className="flex space-x-4">
          <Button variant="default" className="transition-all duration-300">
            Get Started
          </Button>
          <Button
            variant="ghost"
            className="text-white hover:bg-white hover:text-gray-800 transition-all duration-300"
          >
            Learn More <ArrowRight className="ml-1 w-5" />
          </Button>
        </div>
      </div>

      {/* Text Section */}
      <div className="flex-1 z-10 flex items-center justify-center min-w-[60%] h-full mt-32 md:pb-28 relative overflow-y-hidden">
        <div className="text-2xl text-justify google-bebas moving-gradient-text bg-gradient-to-bl bg-clip-text text-transparent from-slate-100 via-purple-400  to-orange-500 sm:h-[90%] md:h-screen opacity-90">
          IN A FAST-PACED WORLD, MAINTAINING RELATIONSHIPS WITH FRIENDS AND FAMILY HAS BECOME MORE IMPORTANT THAN EVER. AS TECHNOLOGY ADVANCES, WE FIND OURSELVES IN NEED OF TOOLS THAT HELP US MANAGE OUR CONTACTS EFFECTIVELY. WITH A FEW SIMPLE CLICKS, WE CAN ADD A NEW CONTACT TO OUR LIST, REACH OUT TO FRIENDS AND FAMILY EASILY, AND MANAGE OUR CONTACTS EFFICIENTLY. STAYING CONNECTED WITH LOVED ONES HAS NEVER BEEN EASIER. 
          
          QUICKLY ADDING CONTACTS LIKE JOHN 992431234, EMMA 993524578, AND WILLIAM 994725630 CAN ENHANCE OUR NETWORK. WE CAN REACH OUT TO FRIENDS LIKE OLIVIA 991345678 AND NOAH 990845123 WITHOUT HASSLE, KEEPING OUR RELATIONSHIPS STRONG. AS WE MANAGE OUR CONTACTS, IT'S EASY TO STAY IN TOUCH WITH FAMILY MEMBERS SUCH AS LIA 992589765 OR DAVIS 990123456, MAKING SURE NO ONE FEELS LEFT OUT.
          
          THE ABILITY TO ADD AND MANAGE CONTACTS LIKE SOPHIA 994321456 AND MASON 992732891 HELPS US MAINTAIN IMPORTANT CONNECTIONS. WITH EFFICIENT MANAGEMENT, WE CAN CONNECT WITH FRIENDS, FAMILY, AND COLLEAGUES WITHOUT ANY HASSLE, ALWAYS HAVING THE RIGHT PEOPLE AT OUR FINGERTIPS.
          
          EACH NEW CONTACT ADDED TO OUR LIST, SUCH AS GRACE 994523678 AND LIAM 993412789, REPRESENTS AN OPPORTUNITY FOR CONNECTION AND GROWTH. STAYING CONNECTED WITH PEOPLE LIKE GABRIELA 992468134 AND AIDEN 993576489 BECOMES INSTANTANEOUS WITH EFFICIENT CONTACT MANAGEMENT.
          
          IN THIS MODERN AGE, HAVING THE ABILITY TO MANAGE CONTACTS EASILY MAKES ALL THE DIFFERENCE. WE CAN NAVIGATE OUR SOCIAL CIRCLES WITH EASE, ENSURING THAT WE MAINTAIN STRONG TIES WITH LOVED ONES, FRIENDS, AND FAMILY. IN A FAST-PACED WORLD, MAINTAINING RELATIONSHIPS WITH FRIENDS AND FAMILY HAS BECOME MORE IMPORTANT THAN EVER. AS TECHNOLOGY ADVANCES, WE FIND OURSELVES IN NEED OF TOOLS THAT HELP US MANAGE OUR CONTACTS EFFECTIVELY. WITH A FEW SIMPLE CLICKS, WE CAN ADD A NEW CONTACT TO OUR LIST, REACH OUT TO FRIENDS AND FAMILY EASILY, AND MANAGE OUR CONTACTS EFFICIENTLY. STAYING CONNECTED WITH LOVED ONES HAS NEVER BEEN EASIER. 
          
          QUICKLY ADDING CONTACTS LIKE JOHN 992431234, EMMA 993524578, AND WILLIAM 994725630 CAN ENHANCE OUR NETWORK. WE CAN REACH OUT TO FRIENDS LIKE OLIVIA 991345678 AND NOAH 990845123 WITHOUT HASSLE, KEEPING OUR RELATIONSHIPS STRONG. AS WE MANAGE OUR CONTACTS, IT'S EASY TO STAY IN TOUCH WITH FAMILY MEMBERS SUCH AS LIA 992589765 OR DAVIS 990123456, MAKING SURE NO ONE FEELS LEFT OUT.
          
          THE ABILITY TO ADD AND MANAGE CONTACTS LIKE SOPHIA 994321456 AND MASON 992732891 HELPS US MAINTAIN IMPORTANT CONNECTIONS. WITH EFFICIENT MANAGEMENT, WE CAN CONNECT WITH FRIENDS, FAMILY, AND COLLEAGUES WITHOUT ANY HASSLE, ALWAYS HAVING THE RIGHT PEOPLE AT OUR FINGERTIPS.
          
          EACH NEW CONTACT ADDED TO OUR LIST, SUCH AS GRACE 994523678 AND LIAM 993412789, REPRESENTS AN OPPORTUNITY FOR CONNECTION AND GROWTH. STAYING CONNECTED WITH PEOPLE LIKE GABRIELA 992468134 AND AIDEN 993576489 BECOMES INSTANTANEOUS WITH EFFICIENT CONTACT MANAGEMENT.
          
          IN THIS MODERN AGE, HAVING THE ABILITY TO MANAGE CONTACTS EASILY MAKES ALL THE DIFFERENCE. WE CAN NAVIGATE OUR SOCIAL CIRCLES WITH EASE, ENSURING
        </div>
      </div>
    </section>
  );
};

export default LandingPage;
