import {
  ArrowDownToLine,
  ArrowRightToLine,
  ArrowUpCircle,
  ArrowUpToLine,
  CheckCircle2,
  Circle,
  HelpCircle,
  XCircle,
} from "lucide-react";

export const labels = [
  {
    value: "bug",
    label: "Bug",
  },
  {
    value: "feature",
    label: "Feature",
  },
  {
    value: "documentation",
    label: "Documentation",
  },
];

export const dateOptions: Intl.DateTimeFormatOptions = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
};

export const statuses = [
  {
    value: "backlog",
    label: "Backlog",
    icon: HelpCircle,
  },
  {
    value: "todo",
    label: "Todo",
    icon: Circle,
  },
  {
    value: "in progress",
    label: "In Progress",
    icon: ArrowUpCircle,
  },
  {
    value: "done",
    label: "Done",
    icon: CheckCircle2,
  },
  {
    value: "canceled",
    label: "Canceled",
    icon: XCircle,
  },
];

export const priorities = [
  {
    label: "Low",
    value: "low",
    icon: ArrowDownToLine,
  },
  {
    label: "Medium",
    value: "medium",
    icon: ArrowRightToLine,
  },
  {
    label: "High",
    value: "high",
    icon: ArrowUpToLine,
  },
];
