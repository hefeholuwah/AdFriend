import * as React from "react";
import { ModeToggle } from "./mode-toggle";
import LaunchUI from "../logos/launch-ui";
import { siteConfig } from "../config/site";

export default function FooterSection() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-background px-4">
      <div className="mx-auto max-w-container">
        <div className="bg-background pb-4 pt-12 text-foreground">
          {/* Footer Content */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {/* Brand Section */}
            <div className="col-span-2 sm:col-span-3 md:col-span-1">
              <div className="flex items-center gap-2">
                <LaunchUI />
                <h3 className="text-xl font-bold">AdFriend</h3>
              </div>
            </div>

            {/* Custom Ad Replacement Widgets */}
            {[
              { title: "Motivation", links: ["Daily Quotes", "Success Stories"] },
              { title: "Wellness", links: ["Mindfulness Tips", "Exercise Reminders"] },
              { title: "Tech & Growth", links: ["Learning Resources", "Productivity Hacks"] },
            ].map((section, index) => (
              <div key={index} className="flex flex-col gap-4">
                <h3 className="text-md pt-1 font-semibold">{section.title}</h3>
                {section.links.map((link, linkIndex) => (
                  <a
                    key={linkIndex}
                    href={siteConfig.url}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link}
                  </a>
                ))}
              </div>
            ))}
          </div>

          {/* Footer Bottom */}
          <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t pt-4 text-xs text-muted-foreground sm:flex-row">
            <div>© {currentYear} AdFriend. All rights reserved.</div>
            <div className="flex items-center gap-4">
              <a href={siteConfig.url}>Privacy Policy</a>
              <a href={siteConfig.url}>Terms of Service</a>
              <ModeToggle />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
