import Navbar from "./Navbar";
import FooterPart from "./FooterPart";
import { Button } from "@heroui/react";
import { Link } from "react-router-dom";

const featuredPost = {
  title: "The Startup-Friendly T&C Checklist",
  excerpt:
    "A practical checklist for founders who need strong Terms & Conditions without slowing down launch.",
  category: "Compliance",
  date: "Jan 10, 2025",
  readTime: "6 min read",
};

const posts = [
  {
    title: "How to Avoid Legal Blind Spots in Your SaaS",
    excerpt:
      "Common pitfalls that lead to disputes and how to address them early with clear terms.",
    category: "Founders",
    date: "Jan 5, 2025",
    readTime: "5 min read",
  },
  {
    title: "Privacy Policy vs. Terms & Conditions",
    excerpt:
      "Understand what each document covers and why both matter for your product.",
    category: "Guides",
    date: "Dec 28, 2024",
    readTime: "4 min read",
  },
  {
    title: "Launch-Ready Legal Docs in Under 10 Minutes",
    excerpt:
      "A step-by-step walkthrough for generating compliant terms quickly.",
    category: "Product",
    date: "Dec 20, 2024",
    readTime: "3 min read",
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[#181e2b] text-[#e4e6e8]">
      <Navbar />
      <div className="fixed -top-20 -left-20 w-64 h-64 rounded-full bg-[#2962ea]/20 blur-3xl -z-0"></div>
      <div className="fixed -bottom-20 -right-20 w-64 h-64 rounded-full bg-[#2962ea]/10 blur-3xl -z-0"></div>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-10 text-center">
        <div className="inline-flex items-center bg-[#2962ea]/10 text-[#2962ea] px-4 py-2 rounded-full mb-4 text-sm font-medium">
          Bolt Terms Blog
        </div>
        <h1 className="text-4xl font-extrabold mb-3">
          Insights for SaaS founders and online businesses
        </h1>
        <p className="text-[#9CA3AF] max-w-2xl mx-auto">
          Practical legal guidance, product updates, and best practices to help
          you launch with confidence.
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-[#232b38] border border-[#3a4556] rounded-2xl p-6 md:p-8 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-widest text-[#9CA3AF] mb-2">
                Featured · {featuredPost.category}
              </p>
              <h2 className="text-2xl font-bold mb-2">{featuredPost.title}</h2>
              <p className="text-[#9CA3AF] mb-4">{featuredPost.excerpt}</p>
              <div className="text-xs text-[#828a96]">
                {featuredPost.date} · {featuredPost.readTime}
              </div>
            </div>
            <Button className="btn-primary h-11 px-6 w-full md:w-auto">
              Read article
            </Button>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div
              key={post.title}
              className="bg-[#232b38] border border-[#3a4556] rounded-2xl p-6 hover:border-[#2962ea]/60 transition-colors"
            >
              <p className="text-xs uppercase tracking-widest text-[#9CA3AF] mb-3">
                {post.category}
              </p>
              <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
              <p className="text-[#9CA3AF] mb-4">{post.excerpt}</p>
              <div className="text-xs text-[#828a96] mb-5">
                {post.date} · {post.readTime}
              </div>
              <Button className="btn-secondary h-10 w-full">Read</Button>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="bg-[#1f2937] border border-[#3a4556] rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-3">
            Want compliance updates and product news?
          </h2>
          <p className="text-[#9CA3AF] mb-6">
            Follow our updates and get new templates as soon as they launch.
          </p>
          <Link to="/pricing">
            <Button className="btn-primary h-11 px-6">Explore Plans</Button>
          </Link>
        </div>
      </section>

      <FooterPart />
    </div>
  );
}
