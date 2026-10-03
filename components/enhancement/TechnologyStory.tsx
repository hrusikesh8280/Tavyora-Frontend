"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import s from "./technology-story.module.css";

const stories = [
  {
    name: "Build",
    problem: "The idea is there. The product is still unclear.",
    title: "Give the idea a working structure.",
    outcome:
      "Decisions about the experience connect to the system that supports it.",
    verb: "Assemble",
    nodes: [
      ["Intent", "A problem worth solving"],
      ["Experience", "What people need to do"],
      ["Interface", "What they see and use"],
      ["Logic", "How it behaves"],
      ["Data", "What it remembers"],
      ["Operation", "How it runs"],
    ],
  },
  {
    name: "Rework",
    problem: "It works, but too much gets in the way.",
    title: "Keep what works. Untangle the rest.",
    outcome:
      "Review the friction before choosing a repair, a redesign or a rebuild.",
    verb: "Simplify",
    nodes: [
      ["Experience", "Find the difficult moment"],
      ["Handoff", "Remove duplicate steps"],
      ["Interface", "Keep useful patterns"],
      ["Logic", "Clarify responsibility"],
      ["Data", "Reduce repeated entry"],
      ["Operation", "Check the revised route"],
    ],
  },
  {
    name: "Intelligence",
    problem: "Too much information still needs manual handling.",
    title: "From mixed inputs to a reviewed action.",
    outcome:
      "OCR or LLM-assisted extraction can help; validation and human judgement stay in the workflow.",
    verb: "Transform",
    nodes: [
      ["Inputs", "Document · Email · Form · Image"],
      ["Extract", "Find relevant information"],
      ["Structure", "Organise fields + context"],
      ["Validate", "Check rules + exceptions"],
      ["Human review", "Resolve uncertainty"],
      ["Action", "Use the checked result"],
    ],
  },
  {
    name: "Systems",
    problem: "The interface is only part of the problem.",
    title: "See what the experience depends on.",
    outcome:
      "Make the relationships visible, including what happens when a dependency fails.",
    verb: "Connect",
    nodes: [
      ["Web / mobile", "The visible experience"],
      ["API", "A defined connection"],
      ["Application logic", "Rules + responsibilities"],
      ["Database", "Persistent information"],
      ["External service", "A managed dependency"],
      ["Deployment", "Release + observability"],
    ],
  },
] as const;

// Same six anchors in every diagnostic state. Mobile gets a separate route geometry.
const routes = [
  "M100 90H300H500V290H300H100",
  "M100 90H300H500V290H300H100",
  "M100 90H300H500V290H300H100",
  "M100 90H300H500V290H300 M500 90V190H100V290 M300 90V290",
];
const mobileRoutes = [
  "M75 70H225V240H75V410H225",
  "M75 70H225V240H75V410H225",
  "M75 70H225V240H75V410H225",
  "M75 70H225V240H75V410H225 M75 70V240 M225 240V410",
];

function Signal({ mode = 0 }: { mode?: number }) {
  return (
    <>
      <svg
        className={s.desktopRoutes}
        viewBox="0 0 600 380"
        preserveAspectRatio="none"
        fill="none"
        aria-hidden="true"
      >
        <path className={s.rail} d="M100 90H500V290H100V90 M300 90V290" />
        {mode === 1 && (
          <path
            data-friction
            className={s.friction}
            d="M100 90V180H430V125H220V335H500V240H145V290H500"
          />
        )}
        <path data-flow className={s.flow} pathLength="1" d={routes[mode]} />
        {mode === 2 && (
          <path className={s.reviewGate} d="M288 264V278 M312 264V278" />
        )}
      </svg>
      <svg
        className={s.mobileRoutes}
        viewBox="0 0 300 480"
        preserveAspectRatio="none"
        fill="none"
        aria-hidden="true"
      >
        <path className={s.rail} d="M75 70H225V410H75V70 M75 240H225" />
        {mode === 1 && (
          <path
            data-friction
            className={s.friction}
            d="M75 70V135H255V300H40V410H225"
          />
        )}
        <path
          data-flow
          className={s.flow}
          pathLength="1"
          d={mobileRoutes[mode]}
        />
      </svg>
    </>
  );
}

function useSceneMotion(state: number) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    let animations: Animation[] = [];
    const stop = () => {
      animations.forEach((a) => a.cancel());
      animations = [];
    };
    const play = () => {
      stop();
      if (media.matches) return;
      const options = { duration: 1200, easing: "cubic-bezier(.22,1,.36,1)" };
      el.querySelectorAll<SVGPathElement>("[data-flow]").forEach((path) => {
        animations.push(
          path.animate(
            [
              { strokeDasharray: "1", strokeDashoffset: 1 },
              { strokeDasharray: "1", strokeDashoffset: 0 },
            ],
            options,
          ),
        );
      });
      el.querySelectorAll<HTMLElement>("[data-node]").forEach((node, i) => {
        animations.push(
          node.animate(
            state === 0
              ? [
                  { opacity: 0.3, transform: "translateY(8px)" },
                  { opacity: 1, transform: "translateY(0)" },
                ]
              : [{ opacity: 0.4 }, { opacity: 1 }],
            { ...options, duration: 650, delay: i * 90, fill: "backwards" },
          ),
        );
      });
      el.querySelectorAll("[data-resolve]").forEach((node) => {
        animations.push(
          node.animate([{ opacity: 0.15 }, { opacity: 1 }], {
            duration: 500,
            delay: 900,
            easing: "cubic-bezier(.22,1,.36,1)",
            fill: "backwards",
          }),
        );
      });
      el.querySelectorAll("[data-friction]").forEach((path) => {
        animations.push(
          path.animate([{ opacity: 0.9 }, { opacity: 0.12 }], {
            ...options,
            duration: 1300,
          }),
        );
      });
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          play();
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    media.addEventListener("change", stop);
    return () => {
      observer.disconnect();
      media.removeEventListener("change", stop);
      stop();
    };
  }, [state]);
  return ref;
}

export function ProblemHero() {
  const ref = useSceneMotion(0);
  return (
    <div
      className={s.heroArt}
      ref={ref}
      aria-label="User, information and workflow connect into a working system"
    >
      <div className={s.stageCaption}>
        <span>THE STARTING POINT</span>
        <span>01 → 02</span>
      </div>
      <div className={s.heroInputs}>
        {["User", "Information", "Workflow"].map((label, i) => (
          <span data-node key={label}>
            <i aria-hidden="true">0{i + 1}</i>
            {label}
          </span>
        ))}
      </div>
      <svg
        viewBox="0 0 400 120"
        preserveAspectRatio="none"
        fill="none"
        aria-hidden="true"
      >
        <path
          className={s.rail}
          d="M60 0V50H200V120 M200 0V120 M340 0V50H200"
        />
        <path
          data-flow
          pathLength="1"
          className={s.flow}
          d="M60 0V50H200V120 M200 0V120 M340 0V50H200"
        />
      </svg>
      <div className={s.heroResolution} data-resolve>
        <span className={s.resolutionMark} aria-hidden="true" />
        <strong>A working system</strong>
        <span>Connected around the problem.</span>
      </div>
    </div>
  );
}

function NodeStudy({ mode, step }: { mode: number; step: number }) {
  // Tiny studies encode a change in information, never a fictitious interface.
  return (
    <svg
      className={s.nodeStudy}
      viewBox="0 0 64 30"
      fill="none"
      aria-hidden="true"
    >
      {mode === 2 ? (
        <>
          {step === 0 && (
            <>
              <path d="M4 5h9v18H4z M21 10h11v9H21z M39 3h8v22h-8z M54 8h7v14h-7z" />
              <path d="M6 9h5 M23 13h7 M41 8h4 M56 12h3" />
            </>
          )}
          {step === 1 && (
            <>
              <path d="M5 5v20 M59 5v20 M5 15h17 M42 15h17" />
              <path d="M26 6h12v18H26z M29 11h6 M29 16h6" />
            </>
          )}
          {step === 2 && (
            <>
              <path d="M9 6h46v18H9z M25 6v18 M9 12h46 M9 18h46" />
            </>
          )}
          {step === 3 && (
            <>
              <path d="M9 7l3 3 5-5 M9 17l3 3 5-5 M25 8h27 M25 18h27" />
            </>
          )}
          {step === 4 && (
            <>
              <path d="M8 15h15 M41 15h15 M27 4v22 M37 4v22" />
            </>
          )}
          {step === 5 && (
            <>
              <path d="M5 15h37 M35 8l7 7-7 7 M47 5h12v20H47z" />
            </>
          )}
        </>
      ) : mode === 1 ? (
        <>
          <path className={s.glyphOld} d="M5 5h40v20H15V12h42" />
          <path d="M5 15h52 M50 8l7 7-7 7" />
        </>
      ) : mode === 3 ? (
        <>
          <path d="M7 10h12v12H7z M45 10h12v12H45z M19 16h26 M32 16V4" />
          <path d="M28 4h8" />
        </>
      ) : (
        <>
          {Array.from({ length: Math.min(step + 1, 3) }, (_, i) => (
            <path key={i} d={`M${8 + i * 5} ${9 - i * 3}h38v15h-38z`} />
          ))}
        </>
      )}
    </svg>
  );
}

export function DiagnosticStage() {
  const [active, setActive] = useState(0);
  const story = stories[active];
  const ref = useSceneMotion(active);
  return (
    <div className={s.diagnostic} data-diagnostic data-active={story.name}>
      <div
        className={s.selectors}
        role="group"
        aria-label="Choose your technology problem"
      >
        {stories.map((item, i) => (
          <button
            key={item.name}
            aria-pressed={i === active}
            aria-controls="diagnostic-stage"
            onClick={() => setActive(i)}
          >
            <span className={s.index}>0{i + 1}</span>
            <span>
              <strong>{item.name}</strong>
              <span>{item.problem}</span>
            </span>
            <span className={s.selectionMark} aria-hidden="true">
              ↗
            </span>
          </button>
        ))}
      </div>
      <div className={s.stage} id="diagnostic-stage" ref={ref}>
        <div className={s.stageCaption}>
          <span>ONE SYSTEM / {story.verb.toUpperCase()}</span>
          <span>0{active + 1} / 04</span>
        </div>
        <div className={s.stageTitle} aria-live="polite">
          <h3>{story.title}</h3>
        </div>
        <div className={s.canvas}>
          <Signal mode={active} />
          <ol className={s.nodes}>
            {story.nodes.map(([label, detail], i) => (
              <li
                className={s.node}
                data-node
                key={i}
                style={{ "--node": i } as CSSProperties}
              >
                <NodeStudy mode={active} step={i} />
                <span className={s.nodePort} aria-hidden="true" />
                <span className={s.nodeNumber}>0{i + 1}</span>
                <strong>{label}</strong>
                <span>{detail}</span>
              </li>
            ))}
          </ol>
        </div>
        <div className={s.stageFoot}>
          <p>{story.outcome}</p>
          <small>Illustrative system · not a client project</small>
        </div>
      </div>
    </div>
  );
}

const phases = [
  [
    "Understand",
    "Find the actual problem.",
    "People, constraints and the current workflow come into focus.",
  ],
  [
    "Shape",
    "Choose what matters first.",
    "Agree a useful scope instead of carrying every possibility forward.",
  ],
  [
    "Design",
    "Make the decisions visible.",
    "Connect the experience, interface and system before building.",
  ],
  [
    "Build",
    "Turn decisions into working software.",
    "Develop a reviewable product and the foundations underneath it.",
  ],
  [
    "Integrate",
    "Make the parts work together.",
    "Connect information and services; check the handoffs.",
  ],
  [
    "Deploy",
    "Prepare it for everyday use.",
    "Release, observe and hand over a system people can operate.",
  ],
  [
    "Improve",
    "Learn from what happens.",
    "Use feedback and observation to choose the next change.",
  ],
] as const;
const maturity = [
  "A question to investigate",
  "A bounded scope",
  "A connected design",
  "A working product",
  "Connected services",
  "An operable system",
  "Evidence for the next decision",
];

export function OperationStory() {
  const [active, setActive] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const explicitSelection = useRef(false);
  useEffect(() => {
    const media = matchMedia(
      "(min-width: 901px) and (prefers-reduced-motion: no-preference)",
    );
    let frame = 0;
    const onScroll = () => {
      if (!media.matches || frame || explicitSelection.current) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const el = root.current;
        if (!el) return;
        const box = el.getBoundingClientRect();
        const zone = innerHeight * 0.44;
        if (box.top > zone || box.bottom < zone) return;
        const chapters = [
          ...el.querySelectorAll<HTMLElement>("[data-chapter]"),
        ];
        const index = chapters.reduce(
          (best, chapter, i) =>
            Math.abs(chapter.getBoundingClientRect().top - zone) <
            Math.abs(chapters[best].getBoundingClientRect().top - zone)
              ? i
              : best,
          0,
        );
        setActive(index);
      });
    };
    const resumeScroll = () => {
      explicitSelection.current = false;
    };
    const resumeKeys = (event: KeyboardEvent) => {
      if (
        ["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End"].includes(
          event.key,
        )
      )
        resumeScroll();
    };
    const resumePointer = (event: PointerEvent) => {
      if (!(event.target as HTMLElement).closest("button")) resumeScroll();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("wheel", resumeScroll, { passive: true });
    window.addEventListener("touchmove", resumeScroll, { passive: true });
    window.addEventListener("keydown", resumeKeys);
    window.addEventListener("pointerdown", resumePointer);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("wheel", resumeScroll);
      window.removeEventListener("touchmove", resumeScroll);
      window.removeEventListener("keydown", resumeKeys);
      window.removeEventListener("pointerdown", resumePointer);
      cancelAnimationFrame(frame);
    };
  }, []);
  return (
    <div className={s.operation} ref={root} data-operation data-phase={active}>
      <div
        className={s.processChapters}
        role="group"
        aria-label="Explore the work stages"
      >
        {phases.map(([name, headline, copy], i) => (
          <div data-chapter key={name}>
            <button
              aria-pressed={active === i}
              aria-controls="operation-stage"
              onClick={() => {
                explicitSelection.current = true;
                setActive(i);
              }}
            >
              <span className={s.index}>0{i + 1}</span>
              <span>
                <strong>{name}</strong>
                <span>{headline}</span>
              </span>
            </button>
            <p>{copy}</p>
          </div>
        ))}
      </div>
      <div className={`${s.stage} ${s.processStage}`} id="operation-stage">
        <div className={s.stageCaption}>
          <span>THE SAME SYSTEM, DEVELOPING</span>
          <span>0{active + 1} / 07</span>
        </div>
        <div className={s.stageTitle} aria-live="polite">
          <h3>{maturity[active]}</h3>
        </div>
        <div className={s.processCanvas}>
          <svg
            viewBox="0 0 600 380"
            preserveAspectRatio="none"
            fill="none"
            aria-hidden="true"
          >
            <path className={s.rail} d="M100 90H500V290H100V90 M300 90V290" />
            <path
              className={s.processRoute}
              style={{ strokeDashoffset: 1 - (active + 1) / 7 }}
              pathLength="1"
              d="M100 90H300H500V290H300H100V90"
            />
            <path
              className={s.feedback}
              data-visible={active === 6}
              d="M100 90V35H550V340H100V290"
            />
          </svg>
          <div className={s.systemLayers}>
            {[
              "People + problem",
              "Scope",
              "Experience + interface",
              "Logic + data",
              "Services + information",
              "Release + observation",
            ].map((name, i) => (
              <div
                key={name}
                data-complete={active >= i}
                style={{ "--layer": i } as CSSProperties}
              >
                <NodeStudy mode={0} step={i} />
                <span className={s.layerPort} aria-hidden="true" />
                <span>0{i + 1}</span>
                <strong>{name}</strong>
                <span className={s.layerStatus}>
                  {active >= i ? "Defined" : "To explore"}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className={s.stageFoot}>
          <p>{phases[active][2]}</p>
          <small>
            Enter where useful. Not every engagement needs every stage.
          </small>
        </div>
      </div>
    </div>
  );
}

export function CapabilityAnatomy() {
  return (
    <div className={s.anatomy} data-anatomy>
      <div className={s.anatomyHeader}>
        <span className={s.stageCaption}>
          ONE PRODUCT / CONNECTED RESPONSIBILITIES
        </span>
        <span className={s.stageCaption}>ILLUSTRATIVE ANATOMY</span>
      </div>
      <div className={s.anatomyMap}>
        <div className={s.anatomyBand} id="capability-build">
          <span className={s.index}>01</span>
          <div>
            <h3>Design & build</h3>
            <p>Shape what people need to do.</p>
          </div>
          <ul>
            <li>Product thinking</li>
            <li>Experience / UI</li>
            <li>Web / mobile</li>
          </ul>
        </div>
        <div className={s.anatomyBand} id="capability-systems">
          <span className={s.index}>02</span>
          <div>
            <h3>Systems</h3>
            <p>Connect the foundations behind it.</p>
          </div>
          <ul>
            <li>Logic / APIs</li>
            <li>Data / services</li>
            <li>Deployment / observability</li>
          </ul>
        </div>
        <div className={s.anatomyBand} id="capability-intelligence">
          <span className={s.index}>03</span>
          <div>
            <h3>Intelligence</h3>
            <p>Work with information across the system.</p>
          </div>
          <ul>
            <li>OCR / LLM workflows</li>
            <li>Retrieval / automation</li>
            <li>Validation / human review</li>
          </ul>
        </div>
        <aside className={s.auditSpan} id="capability-rework">
          <span className={s.index}>04 / ACROSS THE LAYERS</span>
          <h3>Audit & rescue</h3>
          <p>Inspect before changing.</p>
          <ul>
            <li>Experience</li>
            <li>Architecture</li>
            <li>Performance</li>
            <li>Information flow</li>
            <li>Operations</li>
          </ul>
          <small>Illustrative review framework</small>
        </aside>
      </div>
    </div>
  );
}
