import ProjectCard from "./ProjectCard.js";

export default function ProjectGrid({ projects = [] }) {
  if (projects.length === 0) {
    return (
      <div>
        <p>ProjectGrid placeholder — no projects yet.</p>
      </div>
    );
  }

  return (
    <div>
      {projects.map((project) => (
        <ProjectCard key={project.slug || project.id} project={project} />
      ))}
    </div>
  );
}
