"use client";

import * as React from "react";
import { Root as Accordion, Item as AccordionItem, Trigger as AccordionTrigger, Content as AccordionContent } from "@radix-ui/react-accordion";

import { ChevronDownIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { Section } from "./section"; // Adjust if needed
import { siteConfig } from "../config/site";
import { cn } from "@/lib/utils";

export default function FAQ() {
  return (
    <Section>
      <div className="mx-auto flex max-w-container flex-col items-center gap-8">
        <h2 className="text-center text-3xl font-semibold sm:text-5xl">
          Frequently Asked Questions
        </h2>
        <Accordion type="single" collapsible className="w-full max-w-[800px]">
          {faqData.map(({ id, question, answer }) => (
            <AccordionItem key={id} value={`item-${id}`} className="border-b">
              <AccordionTrigger className="flex flex-1 items-center justify-between py-4 text-md text-left font-medium transition-all hover:underline">
                {question}
                <ChevronDownIcon className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" />
              </AccordionTrigger>
              <AccordionContent className="overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down pb-4">
                {answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Section>
  );
}

const faqData = [
  {
    id: 1,
    question: "What is AdFriend, and how does it work?",
    answer: (
      <>
        <p className="mb-4 max-w-[640px] text-muted-foreground">
          AdFriend is a distraction-free platform that replaces intrusive ads with motivational content, productivity tips, and personalized learning resources.
        </p>
        <p className="mb-4 max-w-[640px] text-muted-foreground">
          Our goal is to help users stay focused, inspired, and engaged with meaningful content.
        </p>
      </>
    ),
  },
  {
    id: 2,
    question: "How does AdFriend improve my digital experience?",
    answer: (
      <>
        <p className="mb-4 max-w-[600px] text-muted-foreground">
          Instead of irrelevant and disruptive ads, AdFriend provides valuable insights, mindfulness reminders, and educational content tailored to your interests.
        </p>
        <p className="mb-4 max-w-[600px] text-muted-foreground">
          This ensures a seamless browsing experience that promotes well-being and productivity.
        </p>
      </>
    ),
  },
  {
    id: 3,
    question: "Can I customize the type of content I see?",
    answer: (
      <>
        <p className="mb-4 max-w-[600px] text-muted-foreground">
          Yes! AdFriend allows you to personalize your feed by selecting topics that interest you—whether it’s motivation, self-improvement, technology, or wellness.
        </p>
      </>
    ),
  },
];
