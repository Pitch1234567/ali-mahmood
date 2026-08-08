export function Reveal({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return <div className={`scroll-reveal ${className ?? ""}`}>{children}</div>;
}
