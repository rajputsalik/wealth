"use client";

import { SignIn } from "@clerk/nextjs";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const SignInPage = () => {
  return (
    <div className="flex min-h-screen">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 flex flex-col justify-center items-center p-12 text-white">
          <Link href="/" className="mb-8">
            <Image 
              src="/logo.png" 
              alt="Wealth Logo" 
              width={200} 
              height={80} 
              className="h-16 w-auto object-contain filter brightness-0 invert"
            />
          </Link>
          <h1 className="text-4xl font-bold mb-4 text-center">
            Welcome Back
          </h1>
          <p className="text-xl text-white/90 text-center max-w-md mb-8">
            Manage your finances with ease, intelligence, and confidence
          </p>
          <div className="space-y-4 max-w-md">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span>AI-powered receipt scanning</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <span>Real-time financial insights</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <span>Secure account management</span>
            </div>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
      </div>

      {/* Right side - Sign In Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gray-50 dark:bg-gray-900">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8 text-center">
            <Link href="/">
              <Image 
                src="/logo.png" 
                alt="Wealth Logo" 
                width={150} 
                height={60} 
                className="h-12 w-auto object-contain mx-auto mb-4"
              />
            </Link>
            <h1 className="text-3xl font-bold gradient-title mb-2">Welcome Back</h1>
            <p className="text-gray-600 dark:text-gray-400">Sign in to your account</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
            <SignIn 
              appearance={{
                elements: {
                  rootBox: "mx-auto",
                  card: "shadow-none bg-transparent",
                  headerTitle: "text-2xl font-bold text-gray-900 dark:text-white",
                  headerSubtitle: "text-gray-600 dark:text-gray-400",
                  socialButtonsBlockButton: "border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700",
                  formButtonPrimary: "bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 hover:opacity-90 transition-opacity",
                  footerActionLink: "text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300",
                  identityPreviewText: "text-gray-900 dark:text-white",
                  formFieldInput: "border-gray-300 dark:border-gray-600 focus:border-purple-500 dark:focus:border-purple-400",
                  formFieldLabel: "text-gray-700 dark:text-gray-300",
                },
              }}
            />
          </div>
          <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            Don't have an account?{" "}
            <Link 
              href="/sign-up" 
              className="font-semibold text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
