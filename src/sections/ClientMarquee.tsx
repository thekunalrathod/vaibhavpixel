const CLIENTS = [
  'Wander', 'AM MD', 'GROWPRONTO', 'HIDE', 'Nailboo', 'TATBROW',
  'BEST OF THE BONE', 'ecomlanders', 'NOMAD LANE', 'VOLTED',
  'DADFUEL', 'Kosso', 'melrose', 'FIT PREPS',
  'monday', 'PRIME', 'THE MAN SHAKE', 'SCG AGENCY',
  'Optimium7', 'DORI EYEWEAR', 'TwiGry', 'FAMOUS',
];

export default function ClientMarquee() {
  const allClients = [...CLIENTS, ...CLIENTS];

  return (
    <section
      className="w-full overflow-hidden"
      style={{
        height: 80,
        borderTop: '1px solid var(--color-border)',
        borderBottom: '1px solid var(--color-border)',
      }}
    >
      <div className="marquee-track h-full flex items-center gap-16">
        {allClients.map((client, i) => (
          <span
            key={i}
            className="text-sm font-medium uppercase tracking-wider whitespace-nowrap flex-shrink-0"
            style={{
              color: 'var(--color-text-tertiary)',
              opacity: 0.4,
              fontFamily: "'Inter', sans-serif",
            }}
          >
            {client}
          </span>
        ))}
      </div>
    </section>
  );
}
