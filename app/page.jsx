import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import {
  featuresData,
  howItWorksData,
  statsData,
  testimonialsData,
} from "@/data/landing";
import HeroSection from "@/components/hero";
import Link from "next/link";
import { Check, Star } from "lucide-react";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <HeroSection />

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {statsData.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="text-5xl md:text-6xl font-bold gradient-title mb-3 group-hover:scale-110 transition-transform duration-300">
                  {stat.value}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-title">
              Everything you need to manage your finances
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful features designed to help you take control of your financial future
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuresData.map((feature, index) => (
              <Card 
                key={index} 
                className="p-6 hover:shadow-xl transition-all duration-300 border-2 hover:border-purple-200 group"
              >
                <CardContent className="space-y-4 pt-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-100 via-pink-100 to-purple-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-gradient-to-b from-white via-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-title">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get started in minutes and transform your financial management
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            {howItWorksData.map((step, index) => (
              <div key={index} className="text-center relative">
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-r from-orange-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg z-10">
                  {index + 1}
                </div>
                <div className="w-20 h-20 bg-gradient-to-br from-orange-100 via-pink-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-title">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join thousands of satisfied users managing their finances with Wealth
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonialsData.slice(0, 6).map((testimonial, index) => (
              <Card 
                key={index} 
                className="p-6 hover:shadow-xl transition-all duration-300 border-2 hover:border-purple-200"
              >
                <CardContent className="pt-4">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 leading-relaxed italic">"{testimonial.quote}"</p>
                  <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="rounded-full border-2 border-purple-200"
                    />
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Ready to Take Control of Your Finances?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of users who are already managing their finances smarter with Wealth
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link href="/dashboard">
              <Button
                size="lg"
                className="bg-white text-purple-600 hover:bg-gray-50 px-8 py-6 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                Start Free Trial
              </Button>
            </Link>
            <Link href="/sign-in">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white/10 px-8 py-6 text-lg font-semibold"
              >
                Sign In
              </Button>
            </Link>
          </div>
          <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-white/80 text-sm">
            <div className="flex items-center gap-2">
              <Check className="h-5 w-5" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-5 w-5" />
              <span>Free forever plan</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-5 w-5" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
