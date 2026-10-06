"use client";

// Small visual building blocks: a wine glass, structure bars and flashcards.

import { useState } from 'react';
import styles from '../styles.module.css';
import type { Profile } from '../data/regions';

/** A minimal wine glass filled with the (approximate) color of the wine. */
export function Glass({ color, size = 56, sparkling = false }: { color: string; size?: number; sparkling?: boolean }) {
  return (
    <svg width={size * 0.62} height={size} viewBox="0 0 62 100" aria-hidden="true" className={styles.glass}>
      {/* liquid */}
      <path d="M12 30 Q12 58 31 60 Q50 58 50 30 Z" fill={color} />
      {sparkling && (
        <g fill="#ffffff" opacity="0.8">
          <circle cx="25" cy="50" r="1.4" />
          <circle cx="34" cy="44" r="1.1" />
          <circle cx="29" cy="38" r="1.3" />
          <circle cx="38" cy="53" r="1" />
        </g>
      )}
      {/* bowl outline */}
      <path d="M8 6 Q6 58 31 62 Q56 58 54 6" fill="none" stroke="currentColor" strokeWidth="2" />
      {/* stem + foot */}
      <line x1="31" y1="62" x2="31" y2="90" stroke="currentColor" strokeWidth="2" />
      <line x1="17" y1="92" x2="45" y2="92" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

const profileLabels: { key: keyof Profile; label: string }[] = [
  { key: 'sweetness', label: 'Sweetness' },
  { key: 'acidity', label: 'Acidity' },
  { key: 'tannin', label: 'Tannin' },
  { key: 'body', label: 'Body' },
  { key: 'alcohol', label: 'Alcohol' },
];

/** Five dot-scales showing a grape's typical structure. */
export function ProfileBars({ profile, accent }: { profile: Profile; accent: string }) {
  return (
    <div className={styles.profile}>
      {profileLabels.map(({ key, label }) => (
        <div key={key} className={styles.profileRow}>
          <span className={styles.profileLabel}>{label}</span>
          <span className={styles.profileDots}>
            {[1, 2, 3, 4, 5].map((n) => (
              <span
                key={n}
                className={styles.profileDot}
                style={{ background: n <= profile[key] ? accent : undefined }}
              />
            ))}
          </span>
        </div>
      ))}
    </div>
  );
}

/** Flip-card study deck. */
export function Flashcards({ cards, accent }: { cards: { q: string; a: string }[]; accent: string }) {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState<Set<number>>(new Set());

  const go = (delta: number) => {
    setFlipped(false);
    setIndex((i) => (i + delta + cards.length) % cards.length);
  };
  const markKnown = () => {
    setKnown((k) => new Set(k).add(index));
    go(1);
  };
  const card = cards[index];

  return (
    <div className={styles.flashWrap}>
      <button
        type="button"
        className={`${styles.flashCard} ${flipped ? styles.flashFlipped : ''}`}
        onClick={() => setFlipped((f) => !f)}
        style={{ ['--accent' as string]: accent }}
      >
        <span className={styles.flashInner}>
          <span className={styles.flashFront}>
            <span className={styles.flashKicker}>Question {index + 1} / {cards.length}</span>
            <span className={styles.flashText}>{card.q}</span>
            <span className={styles.flashHint}>Tap to reveal</span>
          </span>
          <span className={styles.flashBack}>
            <span className={styles.flashKicker}>Answer</span>
            <span className={styles.flashText}>{card.a}</span>
          </span>
        </span>
      </button>
      <div className={styles.flashControls}>
        <button type="button" className={styles.ghostButton} onClick={() => go(-1)}>← Prev</button>
        <span className={styles.flashProgress}>{known.size} / {cards.length} mastered</span>
        <button type="button" className={styles.ghostButton} onClick={markKnown}>Got it ✓</button>
        <button type="button" className={styles.ghostButton} onClick={() => go(1)}>Next →</button>
      </div>
    </div>
  );
}
