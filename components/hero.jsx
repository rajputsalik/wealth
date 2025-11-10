"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { ArrowRight, Sparkles, TrendingUp, Shield } from "lucide-react";

const HeroSection = () => {
    const heroImageRef = useRef();

    useEffect(() => {
        const imageElement = heroImageRef.current;

        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const scrollThreshold = 100;

            if (scrollPosition > scrollThreshold) {
                imageElement?.classList.add("scrolled");
            } else {
                imageElement?.classList.remove("scrolled");
            }
        }
         
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <section className="relative pt-32 pb-20 px-4 overflow-hidden bg-gradient-to-b from-white via-gray-50 to-white">
            {/* Background decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
                <div className="absolute top-40 right-10 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
            </div>

            <div className="container mx-auto text-center relative z-10">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-gradient-to-r from-orange-100 via-pink-100 to-purple-100 border border-orange-200/50">
                    <Sparkles className="h-4 w-4 text-purple-600" />
                    <span className="text-sm font-medium text-gray-700">AI-Powered Financial Management</span>
                </div>

                <h1 className="text-5xl md:text-7xl lg:text-8xl xl:text-[100px] pb-6 gradient-title leading-tight">
                    Manage your finances <br />
                    <span className="text-gray-900">with ease, Intelligence</span> <br />
                    <span className="text-gray-900">and confidence.</span>
                </h1>
                
                <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
                    An AI-powered financial management platform that helps you track, analyze, and optimize your spending with real-time insights.
                </p>

                <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-12">
                    <Link href={"/dashboard"}>
                        <Button 
                            size="lg" 
                            className="px-8 py-6 text-lg bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 hover:opacity-90 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 group"
                        >
                            Get Started Free
                            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </Link>
                    <Link href={"/sign-in"}>
                        <Button 
                            size="lg" 
                            variant="outline" 
                            className="px-8 py-6 text-lg border-2 hover:bg-gray-50 transition-all duration-300"
                        >
                            Sign In
                        </Button>
                    </Link>
                </div>

                {/* Trust indicators */}
                <div className="flex flex-wrap justify-center items-center gap-8 mb-12 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                        <Shield className="h-5 w-5 text-green-600" />
                        <span>Bank-level Security</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-blue-600" />
                        <span>50K+ Active Users</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-purple-600" />
                        <span>AI-Powered Insights</span>
                    </div>
                </div>

                {/* Hero Image */}
                <div className="hero-image-wrapper mt-12 md:mt-16">
                    <div ref={heroImageRef} className="hero-image">
                        <div className="relative mx-auto max-w-5xl">
                            <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 via-pink-400/20 to-purple-400/20 rounded-2xl blur-3xl"></div>
                            <Image 
                                src={"/banner.jpeg"} 
                                alt="Wealth Dashboard Preview" 
                                width={1200} 
                                height={700} 
                                className="relative mx-auto mt-10 rounded-2xl shadow-2xl border-2 border-gray-200/50 backdrop-blur-sm" 
                                priority 
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default HeroSection;
