export const projectHref =
  "mailto:hello@tavyora.com?subject=Technology%20project%20%E2%80%94%20Tavyora";
export const yogaHref =
  "mailto:hello@tavyora.com?subject=Yoga%20enquiry%20%E2%80%94%20Tavyora";
export const problems = [
  {
    id: "build",
    name: "Build",
    intro: "I have an idea. It needs to become a real product.",
    skills: "Product thinking · UX / UI · Web / mobile · Backend · Deployment",
    title: "Give the idea a working form.",
    description:
      "Define the problem, design the experience and build the foundations together. Start with a useful first release.",
    stages: ["Understand", "Design & build", "Release"],
    note: "A path from the problem to a working product.",
  },
  {
    id: "rework",
    name: "Rework",
    intro: "The product exists, but the experience or system needs work.",
    skills:
      "UX audit · Product review · Redesign · Performance · Architecture · Modernisation",
    title: "Find the friction. Work from there.",
    description:
      "Review the experience and the architecture before deciding what to change. Improve deliberately, then check the result.",
    stages: ["Review", "Improve", "Evaluate"],
    note: "A return path: evaluate the change against the original problem.",
  },
  {
    id: "intelligence",
    name: "Intelligence",
    intro: "I have repetitive information work software should handle.",
    skills:
      "LLM integration · OCR · Document intelligence · Retrieval · Automation · Human review",
    title: "Make information useful.",
    description:
      "Route documents and questions through the tools that fit. Bring the results together with evaluation and human review.",
    stages: ["Information", "LLM / OCR", "Human review"],
    note: "Branch for different inputs. Rejoin for a result someone can check.",
  },
  {
    id: "systems",
    name: "Systems",
    intro: "The interface is only part of the problem.",
    skills:
      "APIs · Backend · Databases · Infrastructure · Deployment · Observability",
    title: "Make the foundations dependable.",
    description:
      "Consider the API, data and deployment as one connected system. Make the connections clear and the system understandable after handover.",
    stages: ["Interfaces", "Data & logic", "Operations"],
    note: "Connected responsibilities, with a clear way to observe the system.",
  },
] as const;
export const capabilities = [
  {
    id: "build",
    name: "Design & build",
    note: "From intent to interface.",
    items:
      "Product thinking / UX & UI / Websites / Web applications / Mobile applications / Frontend engineering",
  },
  {
    id: "systems",
    name: "Systems",
    note: "The foundations behind the experience.",
    items:
      "Backend engineering / APIs / Databases / Infrastructure / Deployment / Observability",
  },
  {
    id: "intelligence",
    name: "Intelligence",
    note: "Applied where it earns its place.",
    items:
      "LLM integration / OCR & document workflows / Retrieval / Automation / Structured information / Human review",
  },
  {
    id: "rework",
    name: "Audit & rescue",
    note: "Understand before rebuilding.",
    items:
      "UX audit / Product review / Performance / Architecture / Redesign / Modernisation",
  },
] as const;
