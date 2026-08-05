export interface Thought {
  id: string;
  title: string;
  excerpt: string;
  content: string[];
  date: string; // ISO date
  displayDate: string;
  readTime: string;
  tags: string[];
}

export const getAllThoughts = (): Thought[] => [
  {
    id: "building-snippetsx",
    title: "Why I Built SnippetsX Instead of Just Using Pastebin",
    excerpt:
      "Every time I paired with someone on a bug, we ended up in the same loop — screenshots, zipped folders, or a screen-share nobody could type into. SnippetsX started as a fix for that one annoyance.",
    content: [
      "Every time I paired with someone on a bug, we ended up in the same loop — a screenshot of the error, a zipped folder over Slack, or a screen-share where only one person could actually type. None of it felt like the way two developers should work on code together in 2025.",
      "SnippetsX started as a weekend fix for that one annoyance: a browser tab where I could write code, hit run, and hand someone a link that let them see my cursor move in real time. No signup friction, no local setup, no 'can you see my screen' back and forth.",
      "The execution layer turned out to be the hard part, not the collaboration layer. Getting 40+ languages to run safely in isolated containers, fast enough that it doesn't feel like a CI pipeline, took longer than the live-cursor sync did. Live typing over WebSockets is a solved problem; sandboxing untrusted code from strangers on the internet is not.",
      "It's since turned into something I use for technical interviews too — watching a candidate actually think through a problem in a shared editor tells you more in ten minutes than a take-home assignment does in a week.",
    ],
    date: "2026-07-28",
    displayDate: "Jul 28, 2026",
    readTime: "4 min read",
    tags: ["SnippetsX", "Product", "Real-time"],
  },
  {
    id: "11-months-at-startupcoaching",
    title: "11 Months In: What Full-Time at StartupCoaching Taught Me About Shipping",
    excerpt:
      "Freelance and self-taught projects reward polish. A product team rewards throughput. Ten months into a full-time Full Stack Engineer role, that's the biggest recalibration I've had to make.",
    content: [
      "Freelance and self-taught projects reward polish — you ship when it feels done. A product team rewards throughput and predictability — you ship on a cadence, and 'done' is a shared definition, not a personal one. That's the biggest recalibration I've had to make since joining StartupCoaching as a Full Stack Engineer in October 2025.",
      "Working across frontend, backend, APIs, databases, and performance in the same week means context-switching is a skill you actively train, not a side effect. I've gotten faster at reading a codebase I didn't write and finding the one file that actually needs to change, instead of the ten that look related.",
      "The other shift is around code review. Writing code that's easy for someone else to review fast is a different skill from writing code that works — and it's the one that compounds the most on a team.",
      "None of this replaces the self-learning phase that got me here. It just builds on top of it — the fundamentals from those earlier open-source contributions and personal projects are exactly what made ramping up on a production codebase possible in the first place.",
    ],
    date: "2026-07-14",
    displayDate: "Jul 14, 2026",
    readTime: "5 min read",
    tags: ["Career", "StartupCoaching", "Full Stack"],
  },
  {
    id: "self-taught-to-full-stack-engineer",
    title: "From Self-Taught to Full Stack Engineer: What Actually Changed",
    excerpt:
      "It wasn't the frameworks. I knew React and Node before anyone paid me to use them. What changed between the self-learning years and the job is harder to put on a resume.",
    content: [
      "It wasn't the frameworks. I knew React and Node before anyone paid me to use them — that stack was already familiar from personal projects and open-source contributions during my self-learning phase back in 2022–2023.",
      "What actually changed is harder to put on a resume: reading someone else's half-finished PR and understanding the intent behind it, not just the diff. Estimating a task honestly instead of optimistically. Knowing when 'it works on my machine' is not a sentence you're allowed to say out loud anymore.",
      "The Learn2Earn full-stack training program was the bridge between the two. It wasn't the syntax that mattered there either — it was doing structured code reviews, working against deadlines that weren't self-imposed, and building things that had to satisfy someone else's spec, not just my own curiosity.",
      "If I had to compress it into one line: self-taught teaches you how to build something. A job teaches you how to build something that other people can safely change after you.",
    ],
    date: "2026-06-30",
    displayDate: "Jun 30, 2026",
    readTime: "4 min read",
    tags: ["Career", "Self-Learning", "Growth"],
  },
  {
    id: "fullstack-in-production-ninepages",
    title: "Full Stack Development in Production: Lessons from Ninepages Techsolutions",
    excerpt:
      "Seventeen months building client work as a Full Stack Engineer at Ninepages Techsolutions taught me more about Redux than any tutorial ever did — mostly by showing me how not to use it.",
    content: [
      "Seventeen months building client work as a Full Stack Engineer at Ninepages Techsolutions in Agra taught me more about state management than any tutorial ever did — mostly by showing me how *not* to use it.",
      "Redux is easy to reach for and easy to overuse. A lot of what I actually learned there was where state should live: what belongs in a global store, what belongs in local component state, and what should never have been state at all and could just be derived on render.",
      "The other constant was MongoDB schema design under real client requirements that changed mid-project. Flexible schemas are a gift until three different features assume three different shapes for the same document — after that, you start writing validation layers whether the client's spec asked for them or not.",
      "Working on-site with a small team meant shipping features end-to-end — frontend, API, and database — instead of owning one layer. That full-stack ownership is probably the single habit that's carried over most directly into everything I've built since.",
    ],
    date: "2026-06-09",
    displayDate: "Jun 9, 2026",
    readTime: "5 min read",
    tags: ["Full Stack", "Ninepages Techsolutions", "Redux"],
  },
  {
    id: "open-source-after-fulltime-job",
    title: "Why I Still Contribute to Open Source After Landing a Full-Time Job",
    excerpt:
      "The projects that got me hired were self-directed. It would be easy to let that stop the moment a job fills the same hours. I've tried not to let that happen.",
    content: [
      "The projects that got me a foot in the door were self-directed — no ticket, no sprint, no one waiting on the PR. It would be easy to let that stop the moment a full-time job fills the same hours a side project used to. I've tried not to let that happen.",
      "Open-source work forces a different kind of discipline than client work does: your code has to make sense to a stranger with zero onboarding, your commit messages have to stand alone, and nobody is going to walk over to your desk to ask what you meant.",
      "It's also the only place I get to pick the stack without a client's legacy codebase deciding it for me — which is where most of what I know about newer tooling actually comes from, well before it shows up in paid work.",
      "It doesn't have to be a big project. A cleanly written bug fix on someone else's repo has taught me more some weeks than a full sprint at work.",
    ],
    date: "2026-05-19",
    displayDate: "May 19, 2026",
    readTime: "3 min read",
    tags: ["Open Source", "Habits"],
  },
  {
    id: "building-tomatoai",
    title: "Building TomatoAI: Wiring Up Multiple AI APIs Without Losing Your Mind",
    excerpt:
      "TomatoAI started as a single question — why do I have five different tabs open for five different AI tools? The answer turned into a lesson in rate limits, fallbacks, and prompt templates.",
    content: [
      "TomatoAI started as a single annoyance — why do I have five different browser tabs open for five different AI tools, each with its own login and its own half-remembered prompt style? The idea was to fold text generation, image generation, search, and basic data tools into one interface.",
      "The unglamorous part of that project wasn't the UI, it was the plumbing: rate-limiting so one runaway request doesn't burn the day's quota, retry logic for when a provider has a bad five minutes, and prompt templates so the output quality doesn't swing wildly between tools.",
      "Caching turned out to matter more than I expected. A large share of requests during testing were near-duplicates of something already asked minutes earlier — catching those before they hit the model made the whole thing feel noticeably faster without touching the model itself.",
      "It's still a personal project, not a company, but it's the one I keep coming back to whenever a new model API ships something interesting — it's become the place I test ideas before they show up anywhere else.",
    ],
    date: "2026-04-30",
    displayDate: "Apr 30, 2026",
    readTime: "4 min read",
    tags: ["TomatoAI", "AI", "Architecture"],
  },
];

export const getThoughtById = (id: string): Thought | undefined =>
  getAllThoughts().find((t) => t.id === id);
