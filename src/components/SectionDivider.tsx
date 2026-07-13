export default function SectionDivider() {
  return (
    <div className="flex items-center justify-center py-4">
      <div className="flex items-center gap-2">
        <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-dark-border" />
        <div className="w-1.5 h-1.5 rounded-full bg-matrix/30" />
        <div className="w-1.5 h-1.5 rounded-full bg-matrix/50" />
        <div className="w-1.5 h-1.5 rounded-full bg-matrix/30" />
        <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-dark-border" />
      </div>
    </div>
  );
}
