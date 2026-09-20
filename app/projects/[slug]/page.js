export function generateStaticParams() {
  return [];
}

export default async function ProjectDetailPage({ params }) {
  const { slug } = await params;

  return (
    <main>
      <h1>Project: {slug}</h1>
      <p>Placeholder for project detail page.</p>
    </main>
  );
}
