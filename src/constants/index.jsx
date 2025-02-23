import { BookOpenText, BotMessageSquare, BotMessageSquareIcon, DollarSign, HandCoins, Landmark, UserRoundPen } from "lucide-react";
import { BatteryCharging } from "lucide-react";
import { Fingerprint } from "lucide-react";
import { ShieldHalf } from "lucide-react";
import { PlugZap } from "lucide-react";
import { GlobeLock } from "lucide-react";

import user1 from "../assets/profile-pictures/user1.jpg";
import user2 from "../assets/profile-pictures/user2.jpg";
import user3 from "../assets/profile-pictures/user3.jpg";
import user4 from "../assets/profile-pictures/user4.jpg";
import user5 from "../assets/profile-pictures/user5.jpg";
import user6 from "../assets/profile-pictures/user6.jpg";

export const navItems = [
  { label: "Features", href: "#" },
  { label: "Workflow", href: "#" },
  { label: "Pricing", href: "#" },
  { label: "Testimonials", href: "#" },
];

export const testimonials = [
  {
    user: "Ramesh Yadav",
    company: "Farmer",
    image: user1,
    text: "ArthMitra helped me understand how to budget my farm expenses and apply for government schemes like PM Kisan. I can now track my earnings and plan for the next harvest with confidence!",
  },
  {
    user: "Anjali Sharma",
    company: "Tailoring Business",
    image: user2,
    text: " always wanted to start my own boutique, but I didn't know how to manage finances. ArthMitra’s business insights gave me confidence, and I even got a Mudra loan approved!",
  },
  {
    user: "Sunita Verma",
    company: "Homemaker",
    image: user3,
    text: "My husband handles all finances, but I wanted to learn too. The gamified lessons on savings and budgeting in ArthMitra made it easy for me to understand and take charge!",
  },
  {
    user: "Sarita Chauhan",
    company: "Self-employed",
    image: user4,
    text: "I used to rely on my family for online payments. Now, I confidently use internet banking and even teach my neighbors about digital transactions!",
  },
  {
    user: "Ravi Kumar",
    company: "Aspiring Entrepreneur",
    image: user6,
    text: "I wanted to start a small mobile repair shop but had no idea about business planning. ArthMitra suggested profitable ideas based on my location and skills—now I’m on my way to success!",
  },
  {
    user: "Pooja Reddy",
    company: "College Student",
    image: user5,
    text: "Managing pocket money was always a challenge for me. ArthMitra’s expense tracker helped me create a budget and save for my future goals!",
  },
  
];

export const features = [
  {
    icon: <UserRoundPen />,
    text: "User profile",
    description:
      "Create and personalize your own profile on ArthMitra. Seamlessly manage your skills, projects, and entrepreneurial achievements. Stay updated with relevant opportunities, and showcase your journey in the world of business and innovation. Track progress, receive personalized suggestions, and engage with your professional network with ease.",
  },
  {
    icon: <GlobeLock />,
    text: "Community",
    description:
      "Join a dynamic community of entrepreneurs, innovators, and industry experts on ArthMitra. Share your knowledge, learn from others, and collaborate on diverse projects. Whether you’re a startup enthusiast or an established business owner, our platform connects like-minded individuals to foster growth and innovation across various sectors.",
  },
  {
    icon: <HandCoins />,
    text: "Expense Tracker",
    description:
      "Efficiently manage your business finances with ArthMitra’s intuitive expense tracker. Categorize, track, and visualize your expenses in real-time, ensuring better financial control. Our built-in tools make it easy to monitor your cash flow, prepare for taxes, and make informed financial decisions for your business or project.",
  },
  {
    icon: <Landmark />,
    text: "Government Schemes",
    description:
      "Stay updated with the latest government schemes designed to support startups and entrepreneurs. ArthMitra provides easy access to various funding, grants, and subsidies available for businesses across different sectors. Get detailed information about eligibility, application processes, and deadlines to ensure your business doesn’t miss out on valuable support.",
  },
  {
    icon: <BookOpenText />,
    text: "Learning Modules",
    description:
      "Boost your business acumen with ArthMitra’s comprehensive learning modules. Our platform offers self-paced courses tailored to entrepreneurs at every stage. From marketing and sales strategies to financial management and leadership, gain the knowledge and skills necessary to scale your business effectively and confidently.",
  },
  {
    icon: <DollarSign/>,
    text: "Blockchain Micro-loans",
    description:
      "ArthMitra integrates cutting-edge blockchain technology to provide secure, transparent, and decentralized micro-loans for entrepreneurs. Our platform allows businesses to access small loans without the need for traditional financial institutions, making funding more accessible, especially for new and underserved businesses. Experience seamless and efficient borrowing for your business needs.",
  },
];

export const checklistItems = [
  {
    title: "Create Your Profile",
    description:
      "Build a personalized profile to highlight your skills, achievements, and business journey, connecting you with opportunities and mentors.",
  },
  {
    title: "Search and Connect with Employers and Businesses",
    description:
      "Discover and connect with potential employers, partners, and investors to grow your business and expand your network.",
  },
  {
    title: "Track and Manage Your Expenses",
    description:
      "Keep track of your income, expenses, and cash flow for better financial management and decision-making.",
  },
  {
    title: "Hassle-Free Micro-Loans Powered by Blockchain",
    description:
      "Access secure, transparent micro-loans for your business through blockchain technology, with fewer barriers.",
  },
  {
    title: " Government Schemes & Subsidy Search",
    description:
      "Find and apply for relevant government schemes, grants, and subsidies that support your business growth.",
  },
];



export const resourcesLinks = [
  { 
    href: "https://www.linkedin.com/in/sakshi-tomar-3b629828a", 
    text: <i className="fab fa-linkedin"></i> // LinkedIn icon for Sakshi Tomar
  },
  { 
    href: "https://www.linkedin.com/in/tanisha-verma-1bb129226?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", 
    text: <i className="fab fa-linkedin"></i> // LinkedIn icon for Tanisha Verma
  }
];