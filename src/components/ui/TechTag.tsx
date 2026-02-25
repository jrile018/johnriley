export default function TechTag({ label }: { label: string }) {
  return (
    <span className="inline-block px-1.5 py-px text-[9px] font-heading text-primary bg-primary/10 border border-primary/20 rounded-sm hover:bg-primary/20 hover:border-primary/40 transition-colors">
      {label}
    </span>
  );
}
