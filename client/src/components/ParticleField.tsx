export default function ParticleField({ count = 24, dark = false }: { count?: number; dark?: boolean }) {
  return (
    <div className="particle-field" aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <span key={i} style={{ '--i': i } as React.CSSProperties} />
      ))}
    </div>
  );
}
