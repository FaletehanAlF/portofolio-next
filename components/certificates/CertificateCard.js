export default function CertificateCard({ certificate }) {
  if (!certificate) {
    return (
      <div>
        <p>CertificateCard placeholder</p>
      </div>
    );
  }

  return (
    <div>
      <h3>{certificate.title}</h3>
      <p>{certificate.issuer}</p>
    </div>
  );
}
