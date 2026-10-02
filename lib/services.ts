export const services = [
  {
    id: "websites",
    number: "01",
    title: "Websites & improvements",
    summary: "Make it easy for people to understand your business and get in touch.",
    description:
      "A new website, a refresh, or a focused improvement to the site you already have. Built around your content, your customers, and a clear next step.",
    examples: [
      "Business and creative portfolio websites",
      "Mobile layouts, menus, and service pages",
      "Contact forms and links to your booking tools",
    ],
    startingPoint: "Start with a small website or a few specific improvements.",
  },
  {
    id: "automations",
    number: "02",
    title: "Automations & integrations",
    summary: "Connect your tools and reduce the work you keep doing by hand.",
    description:
      "Practical connections between forms, spreadsheets, and the systems you already use. We start with the task, check what your tools support, and agree on a manageable scope.",
    examples: [
      "Enquiries collected and organised in one place",
      "Information moved between supported tools",
      "Repeatable reports and follow-up workflows",
    ],
    startingPoint: "Start with one repetitive task and a clear expected result.",
  },
  {
    id: "custom-tools",
    number: "03",
    title: "Custom tools & dashboards",
    summary: "Bring your leads, projects, or everyday work into a clearer view.",
    description:
      "A small tool built around how you work: a tracker, a dashboard, or a feature your current setup is missing. We define who uses it and what they need to do before building.",
    examples: [
      "Lead, job, and project tracking",
      "Dashboards and summaries from existing data",
      "Custom features for an existing website or app",
    ],
    startingPoint: "Start with one workflow, using sample data to check the idea.",
  },
] as const

export const collaborationSteps = [
  {
    number: "01",
    title: "Understand the problem",
    description: "Show me your business, your current setup, and the part you want to improve.",
  },
  {
    number: "02",
    title: "Agree on a small scope",
    description: "We define the deliverables, price, timing, and what a useful result looks like.",
  },
  {
    number: "03",
    title: "Build, check, and hand over",
    description: "I build the agreed work, check it with you, and explain how to use and maintain it.",
  },
] as const
