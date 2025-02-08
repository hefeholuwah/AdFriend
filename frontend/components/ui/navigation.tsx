"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "./navigation-menu";
import LaunchUI from "../logos/launch-ui";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Motivational Quotes",
    href: "/features/motivational-quotes",
    description: "Get daily inspirational messages to keep you focused.",
  },
  {
    title: "Activity Reminders",
    href: "/features/activity-reminders",
    description: "Custom reminders like 'Did you do your burpees today?'",
  },
  {
    title: "Mindfulness Prompts",
    href: "/features/mindfulness-prompts",
    description: "Short exercises to encourage mindfulness and relaxation.",
  },
  {
    title: "Positive News Feed",
    href: "/features/positive-news",
    description: "Replace ads with uplifting and constructive news articles.",
  },
];

export default function Navigation() {
  return (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Getting Started</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    <LaunchUI />
                    <div className="mb-2 mt-4 text-lg font-medium">
                      AdFriend
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      A Chrome extension that replaces ads with positive content
                      to enhance user experience.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem href="/" title="Introduction">
                Learn how AdFriend transforms ads into meaningful widgets.
              </ListItem>
              <ListItem href="/" title="Installation">
                Step-by-step guide to installing and setting up AdFriend.
              </ListItem>
              <ListItem href="/" title="Customization">
                Explore how to personalize your experience.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Features</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/support" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Support
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
