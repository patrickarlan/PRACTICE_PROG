import * as React from "react"
import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

function Spinner({ className, ...props }: React.ComponentProps<typeof Loader2>) {
  return (
    <Loader2
      className={cn("animate-spin text-muted-foreground size-5", className)}
      {...props}
    />
  )
}

export { Spinner }
