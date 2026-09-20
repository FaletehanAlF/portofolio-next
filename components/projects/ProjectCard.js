export default function ProjectCard({ project }) {
  if (!project) {
    return (
      <div>
        <p>ProjectCard placeholder</p>
      </div>
    );
  }

  return (
    <div>
      <h3>{project.title}</h3>
      <p>{project.description}</p>
    </div>
  );
}
