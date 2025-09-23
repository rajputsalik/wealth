"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {useEffect, useRef} from "react";


const HeroSection = () => {

    const heroImageRef = useRef();

    useEffect(() => {
        const imageElement = heroImageRef.current;

        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const scrollThreshold = 100; // Adjust this value to control when the effect starts

            if (scrollPosition > scrollThreshold) {
                imageElement.classList.add("scrolled");
            } else {
                imageElement.classList.remove("scrolled");
            }
        }
         
        window.addEventListener("scroll", handleScroll)

        return () => window.removeEventListener("scroll", handleScroll);
  }, []) 

    return (
        <section className="pt-40 pb-20 px-4">
        <div className="container mx-auto text-center">
                <h1 className="text-5xl md:text-8xl lg:text-[105px] pb-6 gradient-title"> Manage your finances <br /> with ease , Intelligence and confidence.</h1>
                <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">An AI-powered financial management platform that helps you track , analyze, and optimize your spending with real-time insights.</p>

                <div className="flex justify-center space-x-4" >
                    <Link href={"/dashboard"}>
                        <Button size="lg" className="px-8 cursor-pointer">Get Started</Button>
                    </Link>

                </div>
                <div className="hero-image-wrapper mt-5 md:mt-0 ">
                    <div ref={heroImageRef} className="hero-image">
                        <Image src={"/banner.jpeg"} alt="Hero Image" width={1200} height={700} className="mx-auto mt-10 rounded-lg shadow-2xl border" priority />
                    </div>
                </div>
            </div>
    </section>
    
    );
}

export default HeroSection;
