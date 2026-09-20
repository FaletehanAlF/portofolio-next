export default function ExperienceItem({ experience }) {
  if (!experience) {
    return (
      <div>
        <p>Experience</p>
      </div>
    );
  }

  return (
    <div>
      <h3>{experience.role}</h3>
      <p>{experience.company}</p>
      <p>{experience.period}</p>
    </div>
  );
}
