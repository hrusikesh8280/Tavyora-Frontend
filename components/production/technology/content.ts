// Capability statements supplied by Tavyora; no invented delivery outcomes.
export const problems = [
  {
    id: "build",
    name: "Build",
    intro: "I have an idea. It needs to become a real product.",
    skills:
      "Product thinking · UX architecture · UI design · Web / mobile · Frontend · Backend · Deployment",
    title: "Give the idea a working form.",
    description:
      "Turn the initial problem into a useful first release. Shape the experience and the technical foundations together, so decisions in one support the other.",
    stages: ["Intent", "Experience", "Working product"],
    note: "One starting point. Coordinated layers of design and engineering.",
  },
  {
    id: "rework",
    name: "Rework",
    intro: "The product exists, but the experience or system needs work.",
    skills:
      "UX audit · Product review · Redesign · Performance · Architecture · Modernisation",
    title: "Find the friction before the fix.",
    description:
      "Look at how people use the product and how the system behaves. Separate what needs repair from what is worth keeping before committing to a rebuild.",
    stages: ["Review", "Simplify", "Evaluate"],
    note: "Trace the existing route. Remove unnecessary turns. Check the change.",
  },
  {
    id: "intelligence",
    name: "Intelligence",
    intro: "I have repetitive information work software should handle.",
    skills:
      "LLM integration · OCR / document workflows · Information extraction · Retrieval · Automation · Human review",
    title: "Make information easier to act on.",
    description:
      "Connect documents, questions and routine tasks to a workflow people can use. Choose models and tools around the job, with evaluation and human review built in.",
    stages: ["Inputs", "Interpret", "Review"],
    note: "Different inputs merge into structured information someone can check.",
  },
  {
    id: "systems",
    name: "Systems",
    intro: "The interface is only part of the problem.",
    skills:
      "APIs · Backend engineering · Databases · Infrastructure · Deployment · Observability",
    title: "Make the connections dependable.",
    description:
      "Treat data, application logic and deployment as connected responsibilities. Make the system understandable to the people who will operate it.",
    stages: ["Interfaces", "Data & logic", "Operations"],
    note: "Clear connections between the interface, the data and the operating environment.",
  },
] as const;
export const capabilities = [
  {
    id: "build",
    name: "Design & build",
    line: "From intent to interface.",
    items: [
      "Product thinking",
      "UX / UI",
      "Websites",
      "Web applications",
      "Mobile applications",
      "Frontend engineering",
    ],
  },
  {
    id: "systems",
    name: "Systems",
    line: "The foundations behind the experience.",
    items: [
      "Backend engineering",
      "APIs",
      "Databases",
      "Infrastructure",
      "Deployment",
      "Observability",
    ],
  },
  {
    id: "intelligence",
    name: "Intelligence",
    line: "Applied where it earns its place.",
    items: [
      "LLM integration",
      "OCR / document workflows",
      "Retrieval",
      "Automation",
      "Structured information",
      "Human review",
    ],
  },
  {
    id: "rework",
    name: "Audit & rescue",
    line: "Understand before rebuilding.",
    items: [
      "UX audit",
      "Product review",
      "Performance analysis",
      "Architecture review",
      "Modernisation planning",
    ],
  },
] as const;
export const stages = [
  [
    "Understand",
    "Clarify who needs help, what is happening now and what a useful outcome would be.",
  ],
  [
    "Shape",
    "Choose a focused scope, the important constraints and a sensible first step.",
  ],
  [
    "Design",
    "Work through the experience and the system before expensive decisions become fixed.",
  ],
  [
    "Build",
    "Develop the interface and the foundations, with reviewable progress along the way.",
  ],
  [
    "Integrate",
    "Connect services, data and workflows; check how they behave together.",
  ],
  [
    "Deploy",
    "Prepare the environment, release process and handover so the work can be operated.",
  ],
  [
    "Improve",
    "Use observation and feedback to decide what deserves attention next.",
  ],
] as const;
export const situations = [
  "You have an idea and need help shaping the product.",
  "Your existing experience feels fragmented or difficult to use.",
  "Your workflow involves repetitive manual information handling.",
  "You need frontend and backend decisions to happen together.",
  "You have inherited a product or system that needs modernisation.",
  "You want a focused review before committing to a rebuild.",
];
export const engagements = [
  [
    "Build from zero",
    "Shape and create a product, from the initial problem through implementation.",
    "Start with the idea, the people it serves and the constraints you already know.",
  ],
  [
    "Improve what exists",
    "Audit, redesign or modernise an existing product or system.",
    "Start with what feels difficult, what must keep working and what you want to change.",
  ],
  [
    "Solve one hard problem",
    "Focus on a UX issue, architecture decision, automation workflow or technical bottleneck.",
    "Start with the specific obstacle. Agree a bounded piece of work and a way to evaluate it.",
  ],
] as const;
