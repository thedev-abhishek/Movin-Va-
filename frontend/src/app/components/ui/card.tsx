import * as React from "react";

import { cn } from "./utils";

function Card({ className, ...props }: React.ComponentProps<"div">) {
  const onMouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty('--mouse-x', `${x}%`);
    el.style.setProperty('--mouse-y', `${y}%`);
  };
  return (
    <div
      data-slot="card"
      onMouseMove={onMouseMove}
      className={cn(
        "relative bg-card/70 text-card-foreground flex flex-col gap-6 rounded-xl border border-border/70 shadow-[0_0_0_1px_rgba(99,102,241,0.08)] overflow-hidden",
        "before:pointer-events-none before:absolute before:inset-0 before:content-[''] before:opacity-0 before:transition-opacity before:duration-300 before:bg-[radial-gradient(800px_circle_at_var(--mouse-x,50%)_var(--mouse-y,0%),rgba(99,102,241,0.22),transparent_40%),radial-gradient(600px_circle_at_0%_100%,rgba(236,72,153,0.18),transparent_45%)] before:dark:bg-[radial-gradient(800px_circle_at_var(--mouse-x,50%)_var(--mouse-y,0%),rgba(56,189,248,0.20),transparent_40%),radial-gradient(600px_circle_at_0%_100%,rgba(168,85,247,0.14),transparent_45%)]",
        "hover:before:opacity-100 group/card:hover:before:opacity-100 group-hover:before:opacity-100",
        className,
      )}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 pt-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className,
      )}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <h4
      data-slot="card-title"
      className={cn("leading-none", className)}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <p
      data-slot="card-description"
      className={cn("text-muted-foreground", className)}
      {...props}
    />
  );
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className,
      )}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6 [&:last-child]:pb-6", className)}
      {...props}
    />
  );
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 pb-6 [.border-t]:pt-6", className)}
      {...props}
    />
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
};
