"use client";

import { useEffect, useRef, useState } from "react";
import s from "./visual-grammar.module.css";

type Node = { id: string; label: string; detail: string; x: number; y: number };
const anatomy: Node[] = [
  {
    id: "experience",
    label: "Experience",
    detail: "How the task unfolds",
    x: 10,
    y: 24,
  },
  {
    id: "interface",
    label: "Interface",
    detail: "What people use",
    x: 35,
    y: 24,
  },
  { id: "logic", label: "Logic", detail: "Rules and behaviour", x: 60, y: 24 },
  {
    id: "data",
    label: "Data",
    detail: "Information with structure",
    x: 85,
    y: 24,
  },
  {
    id: "api",
    label: "APIs",
    detail: "Connections between systems",
    x: 35,
    y: 70,
  },
  {
    id: "intelligence",
    label: "Intelligence",
    detail: "Interpret, check, assist",
    x: 60,
    y: 70,
  },
  {
    id: "infrastructure",
    label: "Infrastructure",
    detail: "Deploy and observe",
    x: 85,
    y: 70,
  },
];
const modes = [
  {
    id: "build",
    name: "Build",
    verb: "Assemble",
    meaning: "Turn an idea into a product.",
    title: "An idea becomes a working system.",
    note: "Experience, interface and engineering take shape together.",
    active: [
      "experience",
      "interface",
      "logic",
      "data",
      "api",
      "infrastructure",
    ],
    paths: ["M100 100H850", "M350 100V294H850", "M850 100V294"],
  },
  {
    id: "rework",
    name: "Rework",
    verb: "Simplify",
    meaning: "Improve what already exists.",
    title: "Keep what works. Remove the detours.",
    note: "Review the experience and its dependencies before deciding what to rebuild.",
    active: ["experience", "interface", "logic", "data"],
    paths: ["M100 100H850"],
  },
  {
    id: "intelligence",
    name: "Intelligence",
    verb: "Transform",
    meaning: "Make information useful.",
    title: "Give information a useful structure.",
    note: "Interpret information, validate it and make room for human review before action.",
    active: ["interface", "logic", "data", "intelligence"],
    paths: ["M350 100H600V294H850V100", "M600 294V100H850"],
  },
  {
    id: "systems",
    name: "Systems",
    verb: "Connect",
    meaning: "Connect the parts underneath.",
    title: "Make the underlying connections visible.",
    note: "Trace how interfaces, APIs, application logic and data are operated together.",
    active: ["interface", "api", "logic", "data", "infrastructure"],
    paths: ["M350 100V294H600V100H850V294", "M350 294H850"],
  },
] as const;

function useTrace(dependency: string | number) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = ref.current;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    if (!root || reduced.matches) return;
    const animations = Array.from(root.querySelectorAll("[data-trace]")).map(
      (path, i) =>
        path.animate(
          [
            { strokeDashoffset: 1, opacity: 0.25 },
            { strokeDashoffset: 0, opacity: 1 },
          ],
          {
            duration: 1000,
            delay: i * 65,
            easing: "cubic-bezier(.22,1,.36,1)",
          },
        ),
    );
    const stop = () => animations.forEach((a) => a.cancel());
    reduced.addEventListener("change", stop);
    return () => {
      stop();
      reduced.removeEventListener("change", stop);
    };
  }, [dependency]);
  return ref;
}
function Routes({ paths }: { paths: readonly string[] }) {
  return (
    <svg
      className={s.routes}
      viewBox="0 0 1000 420"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        className={s.guide}
        d="M100 0V420 M350 0V420 M600 0V420 M850 0V420"
      />
      {paths.map((path, i) => (
        <path
          key={`${i}-${path}`}
          d={path}
          data-trace
          pathLength="1"
          className={s.trace}
        />
      ))}
    </svg>
  );
}

export function ProductSystem() {
  const [selected, setSelected] = useState(0);
  const current = modes[selected];
  const [hovered, setHovered] = useState<number | null>(null);
  const [focused, setFocused] = useState<number | null>(null);
  const [activation, setActivation] = useState(0);
  const preview = hovered ?? focused;
  const ref = useRef<HTMLDivElement>(null);
  const capture = useRef<SVGPathElement>(null);
  useEffect(() => {
    const root = ref.current;
    const path = capture.current;
    if (!root || !path) return;
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    let animations: Animation[] = [];
    const stop = () => {
      animations.forEach((animation) => animation.cancel());
      animations = [];
    };
    const measure = () => {
      const origin = root
        .querySelector('[aria-pressed="true"] [data-control-node]')
        ?.getBoundingClientRect();
      const target = root
        .querySelector(
          '[data-system-node][data-active="true"] [data-system-port]',
        )
        ?.getBoundingClientRect();
      const choices = root
        .querySelector("[data-choices]")
        ?.getBoundingClientRect();
      const stage = root
        .querySelector("[data-product-stage]")
        ?.getBoundingClientRect();
      if (!origin || !target || !choices || !stage) return;
      const bounds = root.getBoundingClientRect();
      const x = origin.left + origin.width / 2 - bounds.left;
      const y = origin.top + origin.height / 2 - bounds.top;
      const tx = target.left + target.width / 2 - bounds.left;
      const ty = target.top + target.height / 2 - bounds.top;
      const mobile = matchMedia("(max-width: 600px)").matches;
      const tablet = matchMedia(
        "(min-width: 601px) and (max-width: 900px)",
      ).matches;
      const row = root
        .querySelector('[aria-pressed="true"]')!
        .getBoundingClientRect();
      const gutter = Math.min(bounds.width - 5, row.right - bounds.left + 10);
      const bridgeY = mobile
        ? stage.top - bounds.top + 8
        : choices.bottom - bounds.top + 30;
      path.setAttribute(
        "d",
        mobile
          ? `M${x} ${y}H${bounds.width - 5}V${bridgeY}H${tx}V${ty}`
          : tablet
            ? `M${x} ${y}H${gutter}V${bridgeY}H${tx}V${ty}`
            : `M${x} ${y}V${bridgeY}H${tx}V${ty}`,
      );
    };
    measure();
    const resize = new ResizeObserver(measure);
    resize.observe(root);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        if (media.matches) return;
        const easing = "cubic-bezier(.22,1,.36,1)";
        animations.push(
          path.animate([{ strokeDashoffset: 1 }, { strokeDashoffset: 0 }], {
            duration: 350,
            easing,
          }),
        );
        root.querySelectorAll("[data-trace]").forEach((trace, i) => {
          animations.push(
            trace.animate(
              [
                { strokeDashoffset: 1, opacity: 0.25 },
                { strokeDashoffset: 0, opacity: 1 },
              ],
              { duration: 750, delay: 300 + i * 45, easing, fill: "backwards" },
            ),
          );
        });
        root
          .querySelectorAll(
            '[data-system-node][data-active="true"] [data-system-port]',
          )
          .forEach((port, i) => {
            animations.push(
              port.animate([{ opacity: 0.25 }, { opacity: 1 }], {
                duration: 650,
                delay: 350 + i * 45,
                easing,
                fill: "backwards",
              }),
            );
          });
      },
      { threshold: 0.1 },
    );
    observer.observe(root);
    media.addEventListener("change", stop);
    return () => {
      stop();
      observer.disconnect();
      resize.disconnect();
      media.removeEventListener("change", stop);
    };
  }, [selected, activation]);
  return (
    <div
      className={`${s.grammar} ${s.controlSystem}`}
      data-visual="product-system"
      data-mode={current.id}
      ref={ref}
    >
      <div className={s.studyTop}>
        <span>THE PRODUCT SYSTEM</span>
        <span>01 / RELATIONSHIPS</span>
      </div>
      <p className={s.invitation}>Where are you starting?</p>
      <svg className={s.capture} aria-hidden="true">
        <path ref={capture} pathLength="1" />
      </svg>
      <div
        data-choices
        className={`${s.selector} ${s.controlChoices}`}
        role="group"
        aria-label="Explore the product system"
      >
        {modes.map((mode, i) => (
          <button
            key={mode.id}
            type="button"
            aria-pressed={selected === i}
            onClick={() => {
              setSelected(i);
              setActivation((value) => value + 1);
            }}
            onPointerEnter={(event) => {
              if (event.pointerType === "mouse") setHovered(i);
            }}
            onPointerLeave={() => setHovered(null)}
            onFocus={() => {
              setHovered(null);
              setFocused(i);
            }}
            onBlur={() => setFocused(null)}
            aria-controls="product-system-explanation"
          >
            <span className={s.controlNumber}>0{i + 1}</span>
            <span className={s.controlText}>
              <strong>{mode.name}</strong>
              <span>{mode.meaning}</span>
            </span>
            <span
              className={s.controlNode}
              data-control-node
              aria-hidden="true"
            />
            <span className={s.controlCue} aria-hidden="true">
              ↳
            </span>
          </button>
        ))}
      </div>
      <div
        className={s.diagram}
        data-product-stage
        data-preview={preview !== null && preview !== selected}
      >
        <Routes paths={current.paths} />
        {selected === 1 && (
          <svg
            className={s.routes}
            viewBox="0 0 1000 420"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              className={s.detour}
              d="M100 100V340H460V50H720V220H400V100H850 M350 100V180H940V100"
            />
          </svg>
        )}
        <div className={s.layerOutline} aria-hidden="true" />
        {anatomy.map((node, i) => (
          <div
            key={node.id}
            className={s.node}
            data-system-node
            data-preview={
              preview !== null &&
              preview !== selected &&
              (modes[preview].active as readonly string[]).includes(node.id)
            }
            data-active={(current.active as readonly string[]).includes(
              node.id,
            )}
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
          >
            <span className={s.port} data-system-port aria-hidden="true" />
            <span className={s.nodeIndex}>0{i + 1}</span>
            <h3>{node.label}</h3>
            <p>{node.detail}</p>
            {node.id === "intelligence" && (
              <span className={s.optional}>WHEN USEFUL · WITH REVIEW</span>
            )}
          </div>
        ))}
      </div>
      <div
        id="product-system-explanation"
        className={s.explanation}
        aria-live="polite"
      >
        <span className={s.stateMark} aria-hidden="true">
          ↳
        </span>
        <div>
          <h3>{current.title}</h3>
          <p>{current.note}</p>
        </div>
        <span className={s.illustrative}>
          Illustrative system
          <br />
          Every project has its own shape.
        </span>
      </div>
      <div className={s.capabilityLegend}>
        <span>
          Design & build <b>experience / interface / logic</b>
        </span>
        <span>
          Systems <b>APIs / data / infrastructure</b>
        </span>
        <span>
          Intelligence <b>information / review / action</b>
        </span>
        <span>
          Audit & rescue <b>inspect across the system</b>
        </span>
      </div>
    </div>
  );
}

const buildStages = [
  ["Intent", "Agree what needs to become easier.", "The problem"],
  ["Experience", "Shape the steps people will take.", "A usable path"],
  ["Interface", "Give those steps a clear interface.", "Something to use"],
  ["Logic", "Connect actions to reliable rules.", "Working behaviour"],
  ["Data", "Give the information a durable structure.", "A consistent record"],
  [
    "Operation",
    "Prepare the system to be run and maintained.",
    "A working release",
  ],
];
export function BuildStudy() {
  const [step, setStep] = useState(0);
  const ref = useTrace(step);
  return (
    <section
      className={s.grammar}
      data-visual="build-study"
      ref={ref}
      aria-labelledby="build-study-title"
    >
      <div className={s.studyTop}>
        <span>01 / BUILD</span>
        <span>ASSEMBLE</span>
      </div>
      <div className={s.studyHeading}>
        <h3 id="build-study-title">
          See how a product
          <br />
          takes shape.
        </h3>
        <p>
          Select a layer to see what it contributes.
          <br />
          This is an illustration, not a fixed delivery sequence.
        </p>
      </div>
      <div className={s.buildLayout}>
        <ol className={s.buildControls}>
          {buildStages.map(([name, detail], i) => (
            <li key={name}>
              <button
                type="button"
                aria-pressed={step === i}
                aria-controls="build-output"
                onClick={() => setStep(i)}
              >
                <span>0{i + 1}</span>
                <strong>{name}</strong>
                <span aria-hidden="true">↗</span>
              </button>
              <p>{detail}</p>
            </li>
          ))}
        </ol>
        <div className={s.assembly} data-step={step}>
          <svg
            viewBox="0 0 600 600"
            aria-hidden="true"
            className={s.assemblyRoutes}
          >
            <path className={s.guide} d="M60 30V570H560" />
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <path
                key={i}
                data-trace={i <= step ? "" : undefined}
                className={i <= step ? s.trace : s.guide}
                pathLength="1"
                d={`M60 ${80 + i * 82}H${160 + i * 26}V${110 + i * 64}H550`}
              />
            ))}
          </svg>
          {buildStages.map(([name, , result], i) => (
            <div
              key={name}
              className={s.assemblyLayer}
              data-built={i <= step}
              data-current={i === step}
              style={{
                top: `${10 + i * 13}%`,
                left: `${19 + i * 3}%`,
                width: `${73 - i * 3}%`,
              }}
            >
              <span>{name}</span>
              <svg
                className={s.layerGlyph}
                viewBox="0 0 80 24"
                aria-hidden="true"
              >
                <path
                  d={
                    [
                      "M8 12H70 M8 8V16 M70 8V16",
                      "M8 18H26V6H50V18H72",
                      "M8 4H72V20H8Z M8 10H72 M28 10V20",
                      "M8 12H30V4H72 M30 12V20H72",
                      "M8 4H72 M8 12H72 M8 20H72 M24 0V24",
                      "M8 12H30V4H60V20H30V12H72",
                    ][i]
                  }
                />
              </svg>
              <strong>{result}</strong>
              <i aria-hidden="true" />
            </div>
          ))}
          <div
            className={s.assemblyFooter}
            id="build-output"
            aria-live="polite"
          >
            <span>0{step + 1} / 06</span>
            <strong>{buildStages[step][2]}</strong>
            <span>Illustrative assembly</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export function IntelligenceStudy() {
  const [phase, setPhase] = useState<0 | 1 | 2>(0);
  const ref = useTrace(phase);
  return (
    <section
      className={s.grammar}
      data-visual="intelligence-study"
      data-phase={phase}
      ref={ref}
      aria-labelledby="intelligence-study-title"
    >
      <div className={s.studyTop}>
        <span>03 / INTELLIGENCE</span>
        <span>TRANSFORM · CHECK · ACT</span>
      </div>
      <div className={s.studyHeading}>
        <h3 id="intelligence-study-title">
          Turn information into
          <br />
          <em>a reviewed action.</em>
        </h3>
        <p>
          Extraction is only part of the job.
          <br />
          Structure, checks and human review connect it to an action.
        </p>
      </div>
      <div className={s.informationFlow}>
        <svg
          className={s.flowRoutes}
          viewBox="0 0 1000 440"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path className={s.guide} d="M20 220H980" />
          <path
            className={s.trace}
            data-trace
            pathLength="1"
            d={
              phase === 0
                ? "M20 100H180V220H340 M20 330H180V220"
                : phase === 1
                  ? "M20 100H180V220H660 M20 330H180V220"
                  : "M20 100H180V220H980 M20 330H180V220"
            }
          />
        </svg>
        <div className={s.sources}>
          <span className={s.smallLabel}>01 / DIFFERENT INPUTS</span>
          <div className={s.fragments} aria-hidden="true">
            <i>
              Document
              <span />
              <span />
              <span />
            </i>
            <i>
              Email
              <span />
              <span />
            </i>
            <i>
              Form
              <span />
              <span />
              <span />
            </i>
            <i>
              Image
              <span />
            </i>
          </div>
          <p>
            Documents, emails,
            <br />
            forms and images.
          </p>
        </div>
        <div className={s.record} data-ready={phase > 0}>
          <span className={s.smallLabel}>02 / EXTRACT & STRUCTURE</span>
          <div className={s.recordSheet}>
            <div>
              STRUCTURED RECORD <span aria-hidden="true">↳</span>
            </div>
            <dl>
              <div>
                <dt>Reference</dt>
                <dd>{phase > 0 ? "Example 014" : "—"}</dd>
              </div>
              <div>
                <dt>Request</dt>
                <dd>{phase > 0 ? "Update record" : "—"}</dd>
              </div>
              <div>
                <dt>Destination</dt>
                <dd>
                  {phase === 2
                    ? "Example workflow"
                    : phase === 1
                      ? "Needs review"
                      : "—"}
                </dd>
              </div>
            </dl>
            <span className={s.sample}>
              Fictional sample · no customer data
            </span>
          </div>
          <p>
            Extract fields; use retrieval
            <br />
            where context is needed.
          </p>
        </div>
        <div className={s.reviewGate} data-reviewed={phase === 2}>
          <span className={s.smallLabel}>03 / VALIDATE & REVIEW</span>
          <div className={s.gate}>
            <span aria-hidden="true">{phase === 2 ? "✓" : "?"}</span>
            <strong>{phase === 2 ? "Reviewed" : "Human review"}</strong>
            <p>
              {phase === 2
                ? "Example destination confirmed."
                : "Check ambiguous information before it moves on."}
            </p>
          </div>
          <p>
            Software checks structure.
            <br />A person checks the exception.
          </p>
        </div>
        <div className={s.action} data-ready={phase === 2}>
          <span className={s.smallLabel}>04 / ACTION</span>
          <span className={s.actionPort} aria-hidden="true">
            ↗
          </span>
          <strong>{phase === 2 ? "Ready to act" : "Waiting"}</strong>
          <p>
            {phase === 2
              ? "An approved record can enter the next workflow."
              : "The next action stays gated until review."}
          </p>
        </div>
      </div>
      <div
        className={s.flowControls}
        role="group"
        aria-label="Explore information processing"
      >
        {["View inputs", "Extract & validate", "Complete example review"].map(
          (label, i) => (
            <button
              type="button"
              key={label}
              aria-pressed={phase === i}
              onClick={() => setPhase(i as 0 | 1 | 2)}
            >
              {label}
              <span aria-hidden="true">↗</span>
            </button>
          ),
        )}
      </div>
      <p className={s.flowStatus} aria-live="polite">
        {phase === 0
          ? "Select Extract & validate to turn the sample inputs into a record."
          : phase === 1
            ? "The destination needs a human check. No action has been taken."
            : "Example review complete. This is a visual explanation; no document was processed or action performed."}
      </p>
    </section>
  );
}
