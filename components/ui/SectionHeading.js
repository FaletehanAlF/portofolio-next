export default function SectionHeading({ title, subtitle }) {
  return (
    <div>
      <h2>{title || "Section"}</h2>
      {subtitle ? <p>{subtitle}</p> : null}
    </div>
  );
}
