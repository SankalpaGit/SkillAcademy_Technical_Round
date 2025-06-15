import { useEffect, useRef } from "react";
import { Code, Zap, Shield} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Feature {
    icon: React.ReactNode;
    title: string;
    description: string;
    bgColor: string;
}


const features: Feature[] = [
    {
        icon: <Code className="text-4xl text-indigo-600" />,
        title: "Clean Code",
        description: "Built with industry best practices for clean and maintainable code.",
        bgColor: "bg-indigo-100",
    },
    {
        icon: <Zap className="text-4xl text-yellow-600" />,
        title: "Fast Performance",
        description: "Optimized for speed and performance across devices.",
        bgColor: "bg-yellow-100",
    },
    {
        icon: <Shield className="text-4xl text-green-600" />,
        title: "Secure",
        description: "Security-first approach to protect your data and privacy.",
        bgColor: "bg-green-100",
    },
];



const Landing = () => {
    const heroRef = useRef<HTMLDivElement>(null);
    const featuresRef = useRef<HTMLDivElement>(null);
    const blogRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.fromTo(
            heroRef.current,
            { opacity: 0, y: -100 },
            {
                opacity: 1,
                y: 0,
                duration: 1.5,
                ease: "power4.out",
            }
        );

        gsap.fromTo(
            featuresRef.current,
            { opacity: 0, y: 100 },
            {
                scrollTrigger: {
                    trigger: featuresRef.current,
                    start: "top 80%",
                },
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power2.out",
            }
        );

        gsap.fromTo(
            blogRef.current,
            { opacity: 0, y: 100 },
            {
                scrollTrigger: {
                    trigger: blogRef.current,
                    start: "top 80%",
                },
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power2.out",
            }
        );
    }, []);

    const currentYear: number = new Date().getFullYear();

    return (
        <div className="font-sans text-gray-800">
            {/* Hero Section */}
            <section
                ref={heroRef}
                className="relative bg-gradient-to-r px-5 from-indigo-500 to-purple-500 text-white overflow-hidden"
            >
                <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-12">
                    <div className="flex flex-col items-start justify-center h-fit w-full md:ml-16">
                        <h1 className="text-5xl font-extrabold leading-tight mb-6 mt-6">
                            Empower Your Workflow with Modern Tools
                        </h1>
                        <p className="text-lg mb-6">
                            Discover the platform that helps you manage tasks, explore ideas, and stay productive.
                        </p>
                        <button className="bg-white text-indigo-600 font-semibold px-6 py-3 rounded-xl shadow-md hover:bg-gray-100">
                            Get Started
                        </button>
                    </div>
                    <div className="flex justify-center w-full h-5/6">
                        <img src="/hero.png" alt="Tech Illustration" />
                    </div>
                </div>
                <div className="absolute inset-0 bg-white -rotate-[9deg] opacity-20 z-0" />
            </section>

            {/* Features Section */}
            <section ref={featuresRef} className="bg-gray-50 py-20">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-4xl font-bold mb-4 text-center">Our Features</h2>
                    <p className="text-lg text-gray-600 mb-12 text-center">
                        Designed to elevate your development experience.
                    </p>
                    <div className="grid md:grid-cols-3 gap-8">
                        {features.map((feature, idx) => (
                            <div
                                key={idx}
                                className="bg-white p-6 rounded-xl border-2 border-purple-300"
                            >
                                <div className={`mb-2 w-fit p-2 rounded-md ${feature.bgColor}`}>
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                                <p className="text-gray-600">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>


            {/* Footer */}
            <footer className="bg-indigo-500 text-white py-10">
                <div className="max-w-6xl mx-auto px-4 text-center">
                    <p className="text-sm">
                        &copy; {currentYear} GyanPatra. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Landing;
