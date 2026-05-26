"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation: Check if fields are empty
    if (!email.trim() || !password.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    setIsLoading(true);

    // Simulate a brief loading state for a highly professional premium UX feel
    setTimeout(() => {
      // Parse a nice display name from the email (e.g. "keerti@gmail.com" -> "Keerti")
      const parsedName = email.split("@")[0];
      const displayName = parsedName.charAt(0).toUpperCase() + parsedName.slice(1);

      // Save fake user payload to localStorage
      const userPayload = {
        email: email.trim(),
        name: displayName,
      };
      localStorage.setItem("auth-user", JSON.stringify(userPayload));

      setIsLoading(false);
      
      // Dispatch a custom storage event so that the Navbar updates its state instantly!
      // This is a robust React pattern to communicate between separate tabs/components.
      window.dispatchEvent(new Event("storage"));

      // Redirect to the protected path or home page
      router.push(redirectTo);
    }, 800);
  };

  return (
    <Card className="w-full max-w-md p-6 sm:p-8 space-y-6 bg-white border border-gray-200 shadow-xl rounded-3xl">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
          Welcome Back
        </h1>
        <p className="text-sm font-semibold text-gray-400">
          Enter your details below to access your college dashboard
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 text-xs font-bold flex items-center gap-2">
          <span>⚠️</span>
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email Field */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-gray-500">
            Email Address
          </label>
          <Input
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            className="border-gray-200"
          />
        </div>

        {/* Password Field */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-gray-500">
            Password
          </label>
          <Input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
            className="border-gray-200"
          />
        </div>

        {/* Submit button */}
        <Button
          type="submit"
          variant="primary"
          loading={isLoading}
          className="w-full h-11 text-sm font-bold mt-2"
        >
          Sign In
        </Button>
      </form>

      <div className="text-center text-sm font-semibold text-gray-400 border-t border-gray-100 pt-4">
        Don't have an account?{" "}
        <Link
          href={`/signup?redirectTo=${encodeURIComponent(redirectTo)}`}
          className="text-blue-600 hover:text-blue-700 transition-colors"
        >
          Sign up
        </Link>
      </div>
    </Card>
  );
}

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 flex flex-col items-center justify-center min-h-[70vh] bg-gray-50/50">
      <Suspense fallback={
        <div className="flex flex-col items-center justify-center space-y-4">
          <span className="animate-spin rounded-full border-solid border-t-transparent h-8 w-8 border-3 border-blue-600" />
          <p className="text-gray-500 font-semibold text-sm">Loading login portal...</p>
        </div>
      }>
        <LoginForm />
      </Suspense>
    </div>
  );
}
