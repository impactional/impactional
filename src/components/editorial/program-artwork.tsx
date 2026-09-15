import { Globe2, MessagesSquare, Sprout, Orbit } from "lucide-react";

const symbols = { magenta: Sprout, ocean: Globe2, mint: MessagesSquare, amber: Orbit };
const words = { magenta: ["IDEA", "INTO", "ACTION."], ocean: ["LOCAL", "MEETS", "GLOBAL."], mint: ["LET’S", "TALK", "CHANGE."], amber: ["LEARN.", "CREATE.", "CONNECT."] };

export function ProgramArtwork({ accent, number }: { accent: keyof typeof symbols; number: string }) {
  const Icon = symbols[accent];
  return (
    <div className={`program-art program-art--${accent}`} aria-hidden="true">
      <div className="program-art__orbit" /><div className="program-art__orbit program-art__orbit--second" />
      <span className="program-art__number">{number}</span>
      <div className="program-art__paper"><span>THE IMPACTIONAL WAY</span>{words[accent].map((word, index) => <strong key={word} className={index === 1 ? "program-art__emphasis" : undefined}>{word}</strong>)}<Icon strokeWidth={1.25} /></div>
      <span className="program-art__sticker">✳</span><span className="program-art__caption">A little curiosity goes a long way.</span>
    </div>
  );
}
