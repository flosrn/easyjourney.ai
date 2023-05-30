import React from "react";

import { ScrollArea } from "~/components/ui/ScrollArea";

import { cn } from "~/lib/classNames";

type SidebarProps = React.HTMLAttributes<HTMLDivElement> & {};

const SideColumn = ({ className }: SidebarProps) => (
  <aside className={cn("bg-background z-10 lg:mt-2", className)}>
    <div className="space-y-4">
      <ScrollArea className="h-screen">
        <div className="w-full">
          <div className="pb-4">
            <h4 className="mb-1 rounded-md px-2 py-1 text-sm font-semibold">
              Getting Started
            </h4>
            <div className="grid grid-flow-row auto-rows-max text-sm">
              <a
                className="group flex w-full items-center rounded-md border border-transparent px-2 py-1 text-muted-foreground hover:underline"
                target=""
                rel=""
                href="/docs"
              >
                Introduction
              </a>
              <a
                className="group flex w-full items-center rounded-md border border-transparent px-2 py-1 text-muted-foreground hover:underline"
                target=""
                rel=""
                href="/docs/installation"
              >
                Installation
              </a>
              <a
                className="group flex w-full items-center rounded-md border border-transparent px-2 py-1 text-muted-foreground hover:underline"
                target=""
                rel=""
                href="/docs/theming"
              >
                Theming
              </a>
              <a
                className="group flex w-full items-center rounded-md border border-transparent px-2 py-1 text-muted-foreground hover:underline"
                target=""
                rel=""
                href="/docs/cli"
              >
                CLI
              </a>
              <a
                className="group flex w-full items-center rounded-md border border-transparent px-2 py-1 text-muted-foreground hover:underline"
                target=""
                rel=""
                href="/docs/components/typography"
              >
                Typography
              </a>
            </div>
          </div>
          <div className="pb-4">
            <h4 className="mb-1 rounded-md px-2 py-1 text-sm font-semibold">
              Community
            </h4>
            <div className="grid grid-flow-row auto-rows-max text-sm">
              <a
                className="group flex w-full items-center rounded-md border border-transparent px-2 py-1 text-muted-foreground hover:underline"
                target=""
                rel=""
                href="/docs/figma"
              >
                Figma
              </a>
            </div>
          </div>
          <div className="pb-4">
            <h4 className="mb-1 rounded-md px-2 py-1 text-sm font-semibold">
              Forms
            </h4>
            <div className="grid grid-flow-row auto-rows-max text-sm">
              <a
                className="group flex w-full items-center rounded-md border border-transparent px-2 py-1 text-muted-foreground hover:underline"
                target=""
                rel=""
                href="/docs/forms/react-hook-form"
              >
                React Hook Form
                <span className="ml-2 rounded-md bg-[#adfa1d] px-1.5 py-0.5 text-xs leading-none text-[#000000] no-underline group-hover:no-underline">
                  New
                </span>
              </a>
              <span className="flex w-full cursor-not-allowed items-center rounded-md p-2 text-muted-foreground opacity-60 hover:underline">
                TanStack Form
                <span className="ml-2 rounded-md bg-muted px-1.5 py-0.5 text-xs leading-none text-muted-foreground no-underline group-hover:no-underline">
                  Soon
                </span>
              </span>
            </div>
          </div>
          <div className="pb-4">
            <h4 className="mb-1 rounded-md px-2 py-1 text-sm font-semibold">
              Components
            </h4>
            <div className="grid grid-flow-row auto-rows-max text-sm">
              <a
                className="group flex w-full items-center rounded-md border border-transparent px-2 py-1 text-muted-foreground hover:underline"
                target=""
                rel=""
                href="/docs/components/accordion"
              >
                Accordion
              </a>
              <a
                className="group flex w-full items-center rounded-md border border-transparent px-2 py-1 text-muted-foreground hover:underline"
                target=""
                rel=""
                href="/docs/components/alert"
              >
                Alert
              </a>
              <a
                className="group flex w-full items-center rounded-md border border-transparent px-2 py-1 text-muted-foreground hover:underline"
                target=""
                rel=""
                href="/docs/components/alert-dialog"
              >
                Alert Dialog
              </a>
              <a
                className="group flex w-full items-center rounded-md border border-transparent px-2 py-1 text-muted-foreground hover:underline"
                target=""
                rel=""
                href="/docs/components/aspect-ratio"
              >
                Aspect Ratio
              </a>
              <a
                className="group flex w-full items-center rounded-md border border-transparent px-2 py-1 text-muted-foreground hover:underline"
                target=""
                rel=""
                href="/docs/components/avatar"
              >
                Avatar
              </a>
              <a
                className="group flex w-full items-center rounded-md border border-transparent px-2 py-1 text-muted-foreground hover:underline"
                target=""
                rel=""
                href="/docs/components/badge"
              >
                Badge
              </a>
              <a
                className="group flex w-full items-center rounded-md border border-transparent px-2 py-1 text-muted-foreground hover:underline"
                target=""
                rel=""
                href="/docs/components/button"
              >
                Button
              </a>
              <a
                className="group flex w-full items-center rounded-md border border-transparent px-2 py-1 text-muted-foreground hover:underline"
                target=""
                rel=""
                href="/docs/components/calendar"
              >
                Calendar
              </a>
              <a
                className="group flex w-full items-center rounded-md border border-transparent px-2 py-1 text-muted-foreground hover:underline"
                target=""
                rel=""
                href="/docs/components/card"
              >
                Card
              </a>
              <a
                className="group flex w-full items-center rounded-md border border-transparent px-2 py-1 text-muted-foreground hover:underline"
                target=""
                rel=""
                href="/docs/components/checkbox"
              >
                Checkbox
              </a>
              <a
                className="group flex w-full items-center rounded-md border border-transparent px-2 py-1 text-muted-foreground hover:underline"
                target=""
                rel=""
                href="/docs/components/collapsible"
              >
                Collapsible
              </a>
              <a
                className="group flex w-full items-center rounded-md border border-transparent px-2 py-1 text-muted-foreground hover:underline"
                target=""
                rel=""
                href="/docs/components/combobox"
              >
                Combobox
              </a>
              <a
                className="group flex w-full items-center rounded-md border border-transparent px-2 py-1 text-muted-foreground hover:underline"
                target=""
                rel=""
                href="/docs/components/command"
              >
                Command
              </a>
              <a
                className="group flex w-full items-center rounded-md border border-transparent px-2 py-1 text-muted-foreground hover:underline"
                target=""
                rel=""
                href="/docs/components/context-menu"
              >
                Context Menu
              </a>
              <a
                className="group flex w-full items-center rounded-md border border-transparent px-2 py-1 text-muted-foreground hover:underline"
                target=""
                rel=""
                href="/docs/components/data-table"
              >
                Data Table
                <span className="ml-2 rounded-md bg-[#adfa1d] px-1.5 py-0.5 text-xs leading-none text-[#000000] no-underline group-hover:no-underline">
                  New
                </span>
              </a>
              <a
                className="group flex w-full items-center rounded-md border border-transparent px-2 py-1 text-muted-foreground hover:underline"
                target=""
                rel=""
                href="/docs/components/date-picker"
              >
                Date Picker
              </a>
              <a
                className="group flex w-full items-center rounded-md border border-transparent px-2 py-1 text-muted-foreground hover:underline"
                target=""
                rel=""
                href="/docs/components/dialog"
              >
                Dialog
              </a>
              <a
                className="group flex w-full items-center rounded-md border border-transparent px-2 py-1 text-muted-foreground hover:underline"
                target=""
                rel=""
                href="/docs/components/dropdown-menu"
              >
                Dropdown Menu
              </a>
              <a
                className="group flex w-full items-center rounded-md border border-transparent px-2 py-1 text-muted-foreground hover:underline"
                target=""
                rel=""
                href="/docs/components/hover-card"
              >
                Hover Card
              </a>
              <a
                className="group flex w-full items-center rounded-md border border-transparent px-2 py-1 text-muted-foreground hover:underline"
                target=""
                rel=""
                href="/docs/components/input"
              >
                Input
              </a>
              <a
                className="group flex w-full items-center rounded-md border border-transparent px-2 py-1 text-muted-foreground hover:underline"
                target=""
                rel=""
                href="/docs/components/label"
              >
                Label
              </a>
              <a
                className="group flex w-full items-center rounded-md border border-transparent px-2 py-1 text-muted-foreground hover:underline"
                target=""
                rel=""
                href="/docs/components/menubar"
              >
                Menubar
              </a>
              <a
                className="group flex w-full items-center rounded-md border border-transparent px-2 py-1 font-medium text-foreground hover:underline"
                target=""
                rel=""
                href="/docs/components/navigation-menu"
              >
                Navigation Menu
              </a>
              <a
                className="group flex w-full items-center rounded-md border border-transparent px-2 py-1 text-muted-foreground hover:underline"
                target=""
                rel=""
                href="/docs/components/popover"
              >
                Popover
              </a>
              <a
                className="group flex w-full items-center rounded-md border border-transparent px-2 py-1 text-muted-foreground hover:underline"
                target=""
                rel=""
                href="/docs/components/progress"
              >
                Progress
              </a>
              <a
                className="group flex w-full items-center rounded-md border border-transparent px-2 py-1 text-muted-foreground hover:underline"
                target=""
                rel=""
                href="/docs/components/radio-group"
              >
                Radio Group
              </a>
              <a
                className="group flex w-full items-center rounded-md border border-transparent px-2 py-1 text-muted-foreground hover:underline"
                target=""
                rel=""
                href="/docs/components/scroll-area"
              >
                Scroll Area
              </a>
              <a
                className="group flex w-full items-center rounded-md border border-transparent px-2 py-1 text-muted-foreground hover:underline"
                target=""
                rel=""
                href="/docs/components/select"
              >
                Select
              </a>
              <a
                className="group flex w-full items-center rounded-md border border-transparent px-2 py-1 text-muted-foreground hover:underline"
                target=""
                rel=""
                href="/docs/components/separator"
              >
                Separator
              </a>
              <a
                className="group flex w-full items-center rounded-md border border-transparent px-2 py-1 text-muted-foreground hover:underline"
                target=""
                rel=""
                href="/docs/components/sheet"
              >
                Sheet
              </a>
              <a
                className="group flex w-full items-center rounded-md border border-transparent px-2 py-1 text-muted-foreground hover:underline"
                target=""
                rel=""
                href="/docs/components/skeleton"
              >
                Skeleton
              </a>
              <a
                className="group flex w-full items-center rounded-md border border-transparent px-2 py-1 text-muted-foreground hover:underline"
                target=""
                rel=""
                href="/docs/components/slider"
              >
                Slider
              </a>
              <a
                className="group flex w-full items-center rounded-md border border-transparent px-2 py-1 text-muted-foreground hover:underline"
                target=""
                rel=""
                href="/docs/components/switch"
              >
                Switch
              </a>
              <a
                className="group flex w-full items-center rounded-md border border-transparent px-2 py-1 text-muted-foreground hover:underline"
                target=""
                rel=""
                href="/docs/components/table"
              >
                Table
                <span className="ml-2 rounded-md bg-[#adfa1d] px-1.5 py-0.5 text-xs leading-none text-[#000000] no-underline group-hover:no-underline">
                  New
                </span>
              </a>
              <a
                className="group flex w-full items-center rounded-md border border-transparent px-2 py-1 text-muted-foreground hover:underline"
                target=""
                rel=""
                href="/docs/components/tabs"
              >
                Tabs
              </a>
              <a
                className="group flex w-full items-center rounded-md border border-transparent px-2 py-1 text-muted-foreground hover:underline"
                target=""
                rel=""
                href="/docs/components/textarea"
              >
                Textarea
              </a>
              <a
                className="group flex w-full items-center rounded-md border border-transparent px-2 py-1 text-muted-foreground hover:underline"
                target=""
                rel=""
                href="/docs/components/toast"
              >
                Toast
              </a>
              <a
                className="group flex w-full items-center rounded-md border border-transparent px-2 py-1 text-muted-foreground hover:underline"
                target=""
                rel=""
                href="/docs/components/toggle"
              >
                Toggle
              </a>
              <a
                className="group flex w-full items-center rounded-md border border-transparent px-2 py-1 text-muted-foreground hover:underline"
                target=""
                rel=""
                href="/docs/components/tooltip"
              >
                Tooltip
              </a>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  </aside>
);

export default SideColumn;
