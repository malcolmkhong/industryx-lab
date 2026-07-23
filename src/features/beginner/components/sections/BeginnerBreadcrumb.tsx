import Link from "next/link"
import { routePaths } from "@/config/routes"

export function BeginnerBreadcrumb({
  home,
  buildProject,
  beginner,
}: {
  home: string
  buildProject: string
  beginner: string
}) {
  return (
    <div className="mb-8 flex items-center gap-2 font-mono text-xs text-muted-foreground">
      <Link
        href={routePaths.home}
        className="hover:text-foreground focus-visible-ring"
      >
        {home}
      </Link>
      <span aria-hidden="true">/</span>
      <span>{buildProject}</span>
      <span aria-hidden="true">/</span>
      <span className="text-primary">{beginner}</span>
    </div>
  )
}