export function Section({ children, className = "", id = "" }: { children: React.ReactNode; className?: string; id?: string }) {
  return (
    <section
      id={id}
      className={`min-h-screen w-screen flex flex-col items-center justify-center px-6 md:px-12 relative scroll-mt-20 ${className}`}
    >
      {children}
    </section>
  );
}
