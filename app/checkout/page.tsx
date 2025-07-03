"use client";
import { useUser, SignInButton } from "@clerk/nextjs";

import CheckOut from "../components/CheckOut";

const Page = () => {
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col gap-8">
        
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className="min-h-[calc(100vh-160px)] flex flex-col items-center justify-center bg-secondary">
        <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-sm border border-gray-100 text-center">
          {/* Simple icon using emoji */}
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 mb-4 text-2xl">
            🛒
          </div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            Check Out
          </h1>
          <p className="text-gray-600 mb-6">
            Sign in to complete your purchase. 
          </p>
          <SignInButton mode="modal">
            <button className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-200">
              Sign In
            </button>
          </SignInButton>
          
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Your Orders
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          View all your past and current orders
        </p>
      </div>
      <CheckOut/>
    </div>
  );
};

export default Page;