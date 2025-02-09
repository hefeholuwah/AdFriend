"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "../card/Card";
import { CardContent } from "../card/CardContent";

const testimonials = [
  { id: 1, name: "Biruka Assefa", text: "Built the extension with a focus on seamless user experience and performance.", company: "Lead Extension Developer" },
  { id: 2, name: "Joseph Akharume", text: "Designed an intuitive frontend and implemented efficient login functionalities.", company: "Frontend Engineer & Auth Specialist" },
  { id: 3, name: "Julian Barbier", text: "Founder of the web extension, bringing innovation to online tools.", company: "Founder & Visionary" },
  { id: 4, name: "Tech_Grandalf", text: "Handled backend architecture and optimized database performance for scalability.", company: "Backend & Database Engineer" },
  { id: 5, name: "Saidi Siragi", text: "Engineered a smooth UI & frontend experience, ensuring user-friendly interactions.", company: "UI/UX & Lead Frontend Developer" },
];


const SocialProof = () => {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <section className="py-16 bg-background">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-semibold text-foreground sm:text-4xl">
        Meet the Developers 
        </h2>
        <p className="mt-3 text-lg text-muted-foreground">
        The brilliant minds behind AdFriend.
        </p>

        {/* Testimonials Marquee */}
        <div
          className="relative w-full overflow-hidden bg-muted py-8 mt-12 rounded-lg"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <motion.div
            className="flex space-x-6"
            initial={{ x: "100%" }}
            animate={{ x: isPaused ? "0%" : "-100%" }}
            transition={{ ease: "linear", duration: 20, repeat: Infinity }}
          >
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <Card key={`${testimonial.id}-${index}`} className="w-64 min-w-[16rem] p-4 shadow-md">
                <CardContent>
                  <p className="text-sm text-muted-foreground">{testimonial.text}</p>
                  <div className="mt-3 font-semibold text-foreground">
                    - {testimonial.name}, {testimonial.company}
                  </div>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
