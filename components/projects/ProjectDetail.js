export default function ProjectDetail({ project }) {
  if (!project) {
    return (
      <div>
        <p>ProjectDetail placeholder — project not found.</p>
      </div>
    );
  }

  return (
    <article>
      <h1>{project.title}</h1>
      <p>{project.description}</p>
    </article>
  );
}
