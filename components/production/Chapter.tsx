import s from "./system.module.css";
export function Chapter({ number, label }: { number: string; label: string }) {
  return (
    <p className={s.chapter}>
      <span>{number}</span>
      {label}
    </p>
  );
}
