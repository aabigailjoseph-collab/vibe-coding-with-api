"use client";

// An SVG aroma wheel: inner ring = aroma families, outer ring = individual notes.
// Clicking a note toggles it (used by the tasting-note builder).

import { useMemo } from 'react';
import styles from '../styles.module.css';
import { aromaFamilies } from '../data/language';

const R0 = 58; // inner hole
const R1 = 138; // family ring outer edge
const R2 = 240; // note ring outer edge

function polar(r: number, angle: number) {
  const a = (angle - 90) * (Math.PI / 180);
  return [r * Math.cos(a), r * Math.sin(a)];
}

function arc(rIn: number, rOut: number, start: number, end: number) {
  const [x1, y1] = polar(rOut, start);
  const [x2, y2] = polar(rOut, end);
  const [x3, y3] = polar(rIn, end);
  const [x4, y4] = polar(rIn, start);
  const large = end - start > 180 ? 1 : 0;
  return `M${x1} ${y1} A${rOut} ${rOut} 0 ${large} 1 ${x2} ${y2} L${x3} ${y3} A${rIn} ${rIn} 0 ${large} 0 ${x4} ${y4} Z`;
}

/** Radial label that stays upright on the left half of the wheel. */
function RadialText({ r, angle, text, size, color, weight = 400 }: { r: number; angle: number; text: string; size: number; color: string; weight?: number }) {
  const [x, y] = polar(r, angle);
  const flip = angle > 180;
  const rotation = flip ? angle + 90 : angle - 90;
  return (
    <text
      x={x}
      y={y}
      fontSize={size}
      fontWeight={weight}
      fill={color}
      textAnchor="middle"
      dominantBaseline="middle"
      transform={`rotate(${rotation} ${x} ${y})`}
      pointerEvents="none"
    >
      {text}
    </text>
  );
}

export default function AromaWheel({ selected, onToggle }: { selected: string[]; onToggle: (note: string) => void }) {
  const layout = useMemo(() => {
    const total = aromaFamilies.reduce((n, f) => n + f.notes.length, 0);
    const step = 360 / total;
    let cursor = 0;
    return aromaFamilies.map((family) => {
      const start = cursor;
      const notes = family.notes.map((note) => {
        const s = cursor;
        cursor += step;
        return { note, start: s, end: cursor };
      });
      return { family, start, end: cursor, notes };
    });
  }, []);

  return (
    <svg viewBox="-250 -250 500 500" className={styles.wheel} role="img" aria-label="Wine aroma wheel">
      {layout.map(({ family, start, end, notes }) => (
        <g key={family.name}>
          <path d={arc(R0, R1, start, end)} fill={family.color} stroke="var(--paper)" strokeWidth={2} />
          <RadialText r={(R0 + R1) / 2} angle={(start + end) / 2} text={family.name} size={10.5} color="#fff" weight={600} />
          {notes.map(({ note, start: s, end: e }) => {
            const on = selected.includes(note);
            return (
              <g key={note} className={styles.wheelNote} onClick={() => onToggle(note)}>
                <path
                  d={arc(R1 + 2, R2, s, e)}
                  fill={on ? family.color : 'var(--card)'}
                  stroke={family.color}
                  strokeOpacity={0.35}
                  strokeWidth={1}
                />
                <title>{`${family.name}: ${note}`}</title>
                <RadialText r={(R1 + R2) / 2 + 2} angle={(s + e) / 2} text={note} size={9.5} color={on ? '#fff' : 'var(--ink)'} />
              </g>
            );
          })}
        </g>
      ))}
      <circle r={R0 - 4} fill="var(--card)" />
      <text textAnchor="middle" y={-4} fontSize={11} fill="var(--muted)">tap a</text>
      <text textAnchor="middle" y={11} fontSize={11} fill="var(--muted)">note</text>
    </svg>
  );
}
