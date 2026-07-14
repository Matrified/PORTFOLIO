export default function SectionDivider() {
  return (
    <div className="relative flex items-center justify-center py-5" aria-hidden="true">
      <div className="h-px w-24 bg-gradient-to-r from-transparent via-matrix/25 to-matrix/50" />
      <div className="relative mx-3 h-2 w-2 rounded-full border border-matrix/50">
        <span className="absolute inset-0 animate-ping rounded-full bg-matrix/30" />
      </div>
      <div className="font-mono text-[8px] tracking-[0.35em] text-matrix/25">PACKET_OK</div>
      <div className="relative mx-3 h-2 w-2 rounded-full border border-cyber-cyan/50">
        <span className="absolute inset-0 animate-ping rounded-full bg-cyber-cyan/20 [animation-delay:400ms]" />
      </div>
      <div className="h-px w-24 bg-gradient-to-l from-transparent via-cyber-cyan/25 to-cyber-cyan/50" />
    </div>
  );
}
