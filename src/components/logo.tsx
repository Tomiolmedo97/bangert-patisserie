export function Logo({ className, alt = "" }: { className?: string; alt?: string }) {
  return <img src="/logo.png" alt={alt} className={className} />;
}
