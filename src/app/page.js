import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "AdFriend - Transform Your Browsing Experience",
  description: "Transform ad spaces into positive, motivational content"
};

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex flex-col justify-center">
      <main className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-5xl font-bold text-white mb-8">Welcome to AdFriend</h1>
        <p className="text-xl text-white mb-12">Transform ad spaces into positive, motivational content</p>
        <div className="flex justify-center space-x-4">
          <Link 
            href="/login" 
            className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-100 transition duration-300"
          >
            Login
          </Link>
          <Link 
            href="/signup" 
            className="bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition duration-300"
          >
            Sign Up
          </Link>
        </div>
      </main>
    </div>
  );
}