"use client";

// Structured tasting note: pick levels on each scale + aromas, and it writes
// a professional-sounding description for you as you go.

import { useState } from 'react';
import styles from '../styles.module.css';
import { aromaFamilies, scales } from '../data/language';
import { regions } from '../data/regions';

export type Tasting = {
  id: string;
  regionId: string;
  wine: string;
  producer: string;
  vintage: string;
  price: string;
  style: Style;
  sweetness: number;
  acidity: number;
  tannin: number;
  body: number;
  alcohol: number;
  finish: number;
  aromas: string[];
  rating: number;
  comments: string;
  createdAt: number;
};

const STYLES = ['Red', 'White', 'Rosé', 'Sparkling', 'Sweet', 'Fortified'] as const;
type Style = (typeof STYLES)[number];

const words = {
  sweetness: ['bone-dry', 'dry', 'off-dry', 'medium-sweet', 'sweet', 'lusciously sweet'],
  acidity: ['low', 'soft', 'medium', 'bright', 'high, mouthwatering'],
  tannin: ['barely there', 'soft, silky', 'medium', 'firm', 'grippy, high'],
  body: ['light', 'light-to-medium', 'medium', 'medium-to-full', 'full'],
  alcohol: ['low', 'moderate', 'high, warming'],
  finish: ['short', 'medium', 'long'],
};

const hasTannin = (style: Style) => style === 'Red' || style === 'Fortified';

function listify(items: string[]) {
  const lower = items.map((a) => a.toLowerCase());
  if (lower.length <= 1) return lower.join('');
  return `${lower.slice(0, -1).join(', ')} and ${lower[lower.length - 1]}`;
}

export function describe(t: Pick<Tasting, 'style' | 'sweetness' | 'acidity' | 'tannin' | 'body' | 'alcohol' | 'finish' | 'aromas'>) {
  const style = t.style === 'Sweet' || t.style === 'Fortified' ? `${t.style.toLowerCase()} wine` : t.style === 'Sparkling' ? 'sparkling wine' : t.style.toLowerCase();
  let s = `A ${words.sweetness[t.sweetness]}, ${words.body[t.body]}-bodied ${style} with ${words.acidity[t.acidity]} acidity`;
  s += hasTannin(t.style) ? ` and ${words.tannin[t.tannin]} tannins.` : '.';
  if (t.aromas.length) s += ` Aromas of ${listify(t.aromas)}.`;
  s += ` ${words.alcohol[t.alcohol][0].toUpperCase()}${words.alcohol[t.alcohol].slice(1)} alcohol and a ${words.finish[t.finish]} finish.`;
  return s;
}

const blank = (regionId: string): Tasting => ({
  id: '',
  regionId,
  wine: '',
  producer: '',
  vintage: '',
  price: '',
  style: 'Red',
  sweetness: 1,
  acidity: 2,
  tannin: 2,
  body: 2,
  alcohol: 1,
  finish: 1,
  aromas: [],
  rating: 0,
  comments: '',
  createdAt: 0,
});

type Props = {
  regionId?: string; // fixed region (class page) or chooser (practice mode)
  accent?: string;
  onSave?: (t: Tasting) => void;
  // Optional external aroma state (so the aroma wheel can drive it)
  aromas?: string[];
  onAromasChange?: (a: string[]) => void;
  hideAromaPicker?: boolean;
};

export default function TastingForm({ regionId, accent = '#6b1e2e', onSave, aromas, onAromasChange, hideAromaPicker }: Props) {
  const [t, setT] = useState<Tasting>(() => blank(regionId ?? regions[0].id));
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  const selectedAromas = aromas ?? t.aromas;
  const setAromas = (a: string[]) => (onAromasChange ? onAromasChange(a) : setT((p) => ({ ...p, aromas: a })));
  const toggleAroma = (note: string) =>
    setAromas(selectedAromas.includes(note) ? selectedAromas.filter((n) => n !== note) : [...selectedAromas, note]);

  const set = <K extends keyof Tasting>(key: K, value: Tasting[K]) => {
    setSaved(false);
    setT((p) => ({ ...p, [key]: value }));
  };

  const full = { ...t, aromas: selectedAromas };
  const description = describe(full);

  const save = () => {
    if (!onSave) return;
    onSave({ ...full, id: `${Date.now()}`, createdAt: Date.now(), regionId: regionId ?? t.regionId });
    setT(blank(regionId ?? t.regionId));
    setAromas([]);
    setSaved(true);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(description);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard may be blocked; ignore */
    }
  };

  const scaleRows = scales.filter((s) => s.id !== 'tannin' || hasTannin(t.style));

  return (
    <div className={styles.tasting} style={{ ['--accent' as string]: accent }}>
      {onSave && (
        <div className={styles.tastingFields}>
          <input className={styles.input} placeholder="Wine (e.g. Château Talbot)" value={t.wine} onChange={(e) => set('wine', e.target.value)} />
          <input className={styles.input} placeholder="Producer / appellation" value={t.producer} onChange={(e) => set('producer', e.target.value)} />
          <input className={styles.input} placeholder="Vintage" value={t.vintage} onChange={(e) => set('vintage', e.target.value)} />
          <input className={styles.input} placeholder="Price" value={t.price} onChange={(e) => set('price', e.target.value)} />
          {!regionId && (
            <select className={styles.input} value={t.regionId} onChange={(e) => set('regionId', e.target.value)}>
              {regions.map((r) => (
                <option key={r.id} value={r.id}>{r.title}</option>
              ))}
            </select>
          )}
        </div>
      )}

      <div className={styles.segmented}>
        {STYLES.map((s) => (
          <button key={s} type="button" className={`${styles.segment} ${t.style === s ? styles.segmentOn : ''}`} onClick={() => set('style', s)}>
            {s}
          </button>
        ))}
      </div>

      <div className={styles.scaleGrid}>
        {scaleRows.map((scale) => {
          const value = t[scale.id as keyof Tasting] as number;
          return (
            <div key={scale.id} className={styles.scaleRow}>
              <div className={styles.scaleHead}>
                <span className={styles.scaleName}>{scale.name}</span>
                <span className={styles.scaleValue}>{scale.levels[value]}</span>
              </div>
              <div className={styles.scaleSteps}>
                {scale.levels.map((lvl, i) => (
                  <button
                    key={lvl}
                    type="button"
                    title={lvl}
                    aria-label={`${scale.name}: ${lvl}`}
                    className={`${styles.scaleStep} ${i <= value ? styles.scaleStepOn : ''}`}
                    onClick={() => set(scale.id as keyof Tasting, i as never)}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {!hideAromaPicker && (
        <div className={styles.aromaPicker}>
          {aromaFamilies.map((f) => (
            <div key={f.name} className={styles.aromaGroup}>
              <span className={styles.aromaGroupName} style={{ color: f.color }}>{f.name}</span>
              <div className={styles.chips}>
                {f.notes.map((n) => {
                  const on = selectedAromas.includes(n);
                  return (
                    <button
                      key={n}
                      type="button"
                      className={`${styles.chip} ${on ? styles.chipOn : ''}`}
                      style={on ? { background: f.color, borderColor: f.color } : undefined}
                      onClick={() => toggleAroma(n)}
                    >
                      {n}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className={styles.descBox}>
        <span className={styles.kicker}>Your description</span>
        <p className={styles.descText}>“{description}”</p>
        <button type="button" className={styles.ghostButton} onClick={copy}>{copied ? 'Copied ✓' : 'Copy'}</button>
      </div>

      {onSave && (
        <>
          <div className={styles.ratingRow}>
            <span className={styles.scaleName}>My rating</span>
            {[1, 2, 3, 4, 5].map((n) => (
              <button key={n} type="button" className={`${styles.star} ${n <= t.rating ? styles.starOn : ''}`} onClick={() => set('rating', n === t.rating ? 0 : n)} aria-label={`${n} stars`}>
                ★
              </button>
            ))}
          </div>
          <textarea className={styles.textareaSmall} placeholder="Other thoughts: would I buy it? What did the professor say?" value={t.comments} onChange={(e) => set('comments', e.target.value)} />
          <div className={styles.saveRow}>
            <button type="button" className={styles.primaryButton} onClick={save}>Save tasting</button>
            {saved && <span className={styles.savedNote}>Saved to your notebook ✓</span>}
          </div>
        </>
      )}
    </div>
  );
}
