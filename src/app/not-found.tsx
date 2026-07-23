import type { Metadata } from "next";
import { Compass } from "lucide-react";
import { NotFoundTracker } from "@/app/_components/NotFoundTracker";
import { EmptyState } from "@/components/ui/empty-state";
import { routePaths } from "@/config/routes";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Page Not Found",
  description:
    "The requested IndustryX Lab guide page could not be found. Return home or continue with the available beginner project guide.",
  path: "/404",
  index: false,
});

export default function NotFound() {
  return (
    <main
      id="main-content"
      className="mx-auto flex min-h-[70dvh] max-w-3xl flex-col items-center justify-center px-5 pb-20 pt-28 sm:px-6"
    >
      <NotFoundTracker />
      <EmptyState
        icon={Compass}
        status="404 · PAGE NOT FOUND"
        title="This page is not available yet."
        description="The address may have changed, or the page may not have been published. Choose a working page below to continue learning."
        primaryAction={{
          label: "Go to Home",
          href: routePaths.home,
        }}
        secondaryAction={{
          label: "Open Beginner Guide",
          href: routePaths.beginner,
          variant: "outline",
        }}
      />
    </main>
  );
}
