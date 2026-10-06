"use client";

// Wine Class: a study companion for the CBS wine course.
// One page, four views (Syllabus · Region · Language · Notebook), switched via the URL hash
// so the browser back button works. Notes & tastings are saved in this browser (localStorage).

import { useEffect, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import { Cormorant_Garamond, Inter } from 'next/font/google';
import styles from './styles.module.css';
import { regions, kindColors, kindLabels, type Region, type WineKind } from './data/regions';
import { scales, aromaGroups, tastingSteps, glossary } from './data/language';
import { Glass, ProfileBars, Flashcards } from './components/Bits';
import AromaWheel from './components/AromaWheel';
import TastingForm, { describe, type Tasting } from './components/TastingForm';

const RegionMap = dynamic(() => import('./components/RegionMap'), {
  ssr: false,
  loading: () => <div className={styles.mapCanvas} style={{ height: 520 }} />,
});

const serif = Cormorant_Garamond({ subsets: ['latin'], weight: ['400', '500', '600'], style: ['normal', 'italic'] });
const sans = Inter({ subsets: ['latin'] });

// ───────────────────────── helpers ─────────────────────────

type View =
  | { page: 'home' }
  | { page: 'region'; id: string }
  | { page: 'language' }
  | { page: 'notebook' };

function parseHash(hash: string): View {
  const [, page, id] = hash.replace(/^#/, '').split('/');
  if (page === 'region' && regions.some((r) => r.id === id)) return { page: 'region', id };
  if (page === 'language') return { page: 'language' };
  if (page === 'notebook') return { page: 'notebook' };
  return { page: 'home' };
}

function toHash(v: View) {
  return v.page === 'region' ? `#/region/${v.id}` : v.page === 'home' ? '#/' : `#/${v.page}`;
}

const dayMs = 86_400_000;
const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
const classDate = (iso: string) => new Date(`${iso}T12:00:00`);
const fmt = (iso: string, opts: Intl.DateTimeFormatOptions) => classDate(iso).toLocaleDateString('en-US', opts);

function daysUntil(iso: string, now: Date) {
  return Math.round((startOfDay(classDate(iso)) - startOfDay(now)) / dayMs);
}

/** State that persists to localStorage (loaded after mount to avoid hydration mismatches). */
function useStored<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(initial);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw) setValue(JSON.parse(raw));
    } catch {
      /* storage unavailable */
    }
    setLoaded(true);
  }, [key]);
  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* storage unavailable */
    }
  }, [key, value, loaded]);
  return [value, setValue] as const;
}

function download(filename: string, text: string) {
  const blob = new Blob([text], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

// ───────────────────────── page ─────────────────────────

export default function WineClass() {
  const [view, setView] = useState<View>({ page: 'home' });
  const [now, setNow] = useState<Date | null>(null);
  const [notes, setNotes] = useStored<Record<string, string>>('wineclass:notes', {});
  const [tastings, setTastings] = useStored<Tasting[]>('wineclass:tastings', []);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    setNow(new Date());
    const sync = () => setView(parseHash(window.location.hash));
    sync();
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, []);

  const go = (v: View) => {
    window.location.hash = toHash(v);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const nextClass = useMemo(() => (now ? regions.find((r) => daysUntil(r.date, now) >= 0) ?? null : null), [now]);
  const region = view.page === 'region' ? regions.find((r) => r.id === view.id)! : null;

  const setNote = (id: string, text: string) => setNotes((n) => ({ ...n, [id]: text }));
  const addTasting = (t: Tasting) => setTastings((list) => [t, ...list]);
  const removeTasting = (id: string) => setTastings((list) => list.filter((t) => t.id !== id));

  return (
    <div className={`${styles.page} ${sans.className}`} style={{ ['--serif' as string]: serif.style.fontFamily }}>
      <nav className={styles.nav}>
        <button type="button" className={styles.brand} onClick={() => go({ page: 'home' })}>
          <span className={styles.brandMark}>◖</span> Vin<span className={styles.brandDot}>.</span>
        </button>
        <div className={styles.navLinks}>
          <button type="button" className={`${styles.navLink} ${view.page === 'home' || view.page === 'region' ? styles.navActive : ''}`} onClick={() => go({ page: 'home' })}>Syllabus</button>
          <button type="button" className={`${styles.navLink} ${view.page === 'language' ? styles.navActive : ''}`} onClick={() => go({ page: 'language' })}>Tasting language</button>
          <button type="button" className={`${styles.navLink} ${view.page === 'notebook' ? styles.navActive : ''}`} onClick={() => go({ page: 'notebook' })}>Notebook</button>
        </div>
      </nav>

      {view.page === 'home' && <Home now={now} nextClass={nextClass} onOpen={(id) => go({ page: 'region', id })} onGo={go} notes={notes} tastings={tastings} />}
      {region && (
        <RegionView
          key={region.id}
          region={region}
          now={now}
          note={notes[region.id] ?? ''}
          onNote={(t) => setNote(region.id, t)}
          tastings={tastings.filter((t) => t.regionId === region.id)}
          onAddTasting={addTasting}
          onRemoveTasting={removeTasting}
          onOpen={(id) => go({ page: 'region', id })}
        />
      )}
      {view.page === 'language' && <LanguageView onSave={addTasting} />}
      {view.page === 'notebook' && <NotebookView notes={notes} onNote={setNote} tastings={tastings} onRemove={removeTasting} onOpen={(id) => go({ page: 'region', id })} />}

      {/* Floating quick-notes drawer: always one tap away during class */}
      {view.page !== 'notebook' && (
        <>
          <button
            type="button"
            className={styles.fab}
            style={{ background: region?.accent ?? 'var(--wine)' }}
            onClick={() => setDrawerOpen(true)}
          >
            ✎ <span className={styles.fabLabel}>Notes</span>
          </button>
          <NotesDrawer
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            regionId={region?.id ?? nextClass?.id ?? regions[0].id}
            notes={notes}
            onNote={setNote}
          />
        </>
      )}

      <footer className={styles.footer}>
        Made for Columbia Business School · Wine class, Fall 2026 · Notes are saved privately in this browser.
      </footer>
    </div>
  );
}

// ───────────────────────── home / syllabus ─────────────────────────

function Home({ now, nextClass, onOpen, onGo, notes, tastings }: {
  now: Date | null;
  nextClass: Region | null;
  onOpen: (id: string) => void;
  onGo: (v: View) => void;
  notes: Record<string, string>;
  tastings: Tasting[];
}) {
  const days = nextClass && now ? daysUntil(nextClass.date, now) : null;
  const when = days === 0 ? 'Today' : days === 1 ? 'Tomorrow' : days !== null ? `In ${days} days` : '';

  const overviewPins = useMemo(
    () => regions.map((r) => ({ id: r.id, name: `${fmt(r.date, { month: 'short', day: 'numeric' })} · ${r.title}`, lat: r.map.center[0], lng: r.map.center[1], color: r.accent })),
    [],
  );

  return (
    <main>
      <header className={styles.hero}>
        <p className={styles.kicker}>Columbia Business School · Fall 2026</p>
        <h1 className={styles.heroTitle}>Wine, <em>decoded.</em></h1>
        <p className={styles.heroSub}>
          Eight classes, eight regions. Maps, grapes and the words to describe what’s in your glass, plus a notebook for everything you taste.
        </p>

        {nextClass && (
          <button type="button" className={styles.nextCard} style={{ ['--accent' as string]: nextClass.accent }} onClick={() => onOpen(nextClass.id)}>
            <span className={styles.nextBadge}>{when}</span>
            <span className={styles.nextBody}>
              <span className={styles.kicker}>Next class · {fmt(nextClass.date, { weekday: 'long', month: 'long', day: 'numeric' })}</span>
              <span className={styles.nextTitle}>{nextClass.title}</span>
              <span className={styles.nextTag}>{nextClass.tagline}</span>
            </span>
            <span className={styles.nextArrow}>Prepare →</span>
          </button>
        )}
      </header>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2 className={styles.h2}>The syllabus</h2>
          <p className={styles.muted}>Tap a class to dive in.</p>
        </div>
        <div className={styles.syllabus}>
          {regions.map((r, i) => {
            const d = now ? daysUntil(r.date, now) : null;
            const status = d === null ? '' : d < 0 ? 'Done' : r.id === nextClass?.id ? 'Next' : 'Upcoming';
            const tasted = tastings.filter((t) => t.regionId === r.id).length;
            const hasNotes = (notes[r.id] ?? '').trim().length > 0;
            return (
              <button key={r.id} type="button" className={`${styles.classCard} ${status === 'Done' ? styles.classDone : ''}`} style={{ ['--accent' as string]: r.accent }} onClick={() => onOpen(r.id)}>
                <span className={styles.classTop}>
                  <span className={styles.classNum}>{String(i + 1).padStart(2, '0')}</span>
                  {status && <span className={`${styles.status} ${status === 'Next' ? styles.statusNext : ''}`}>{status}</span>}
                </span>
                <span className={styles.classGlasses}>
                  {r.grapes.slice(0, 3).map((g) => (
                    <Glass key={g.name} color={g.hex} size={44} sparkling={r.id === 'champagne'} />
                  ))}
                </span>
                <span className={styles.classDate}>{fmt(r.date, { weekday: 'short', month: 'short', day: 'numeric' })}</span>
                <span className={styles.classTitle}>{r.title}</span>
                <span className={styles.classTag}>{r.tagline}</span>
                {(hasNotes || tasted > 0) && (
                  <span className={styles.classMeta}>
                    {hasNotes && '✎ notes'}{hasNotes && tasted > 0 && ' · '}{tasted > 0 && `${tasted} tasted`}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2 className={styles.h2}>Where we’re going</h2>
          <p className={styles.muted}>Hover a dot to see the class, click to open it.</p>
        </div>
        <div className={styles.mapFrame}>
          <RegionMap center={[42, -55]} zoom={3} pins={overviewPins} onSelect={onOpen} height={460} />
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.twoUp}>
          <button type="button" className={styles.bigLink} onClick={() => onGo({ page: 'language' })}>
            <span className={styles.kicker}>Learn to describe wine</span>
            <span className={styles.bigLinkTitle}>The tasting language</span>
            <span className={styles.muted}>Dry vs. sweet, tannin, acidity, body, the aroma wheel, and a builder that writes your tasting note.</span>
            <span className={styles.arrow}>→</span>
          </button>
          <button type="button" className={styles.bigLink} onClick={() => onGo({ page: 'notebook' })}>
            <span className={styles.kicker}>Your notes</span>
            <span className={styles.bigLinkTitle}>Class notebook</span>
            <span className={styles.muted}>Every class’s notes and every wine you’ve tasted, in one place. Export anytime.</span>
            <span className={styles.arrow}>→</span>
          </button>
        </div>
      </section>
    </main>
  );
}

// ───────────────────────── region ─────────────────────────

const TABS = ['Overview', 'Map', 'Grapes', 'Study', 'Class notes'] as const;
type Tab = (typeof TABS)[number];

function RegionView({ region, now, note, onNote, tastings, onAddTasting, onRemoveTasting, onOpen }: {
  region: Region;
  now: Date | null;
  note: string;
  onNote: (t: string) => void;
  tastings: Tasting[];
  onAddTasting: (t: Tasting) => void;
  onRemoveTasting: (id: string) => void;
  onOpen: (id: string) => void;
}) {
  const [tab, setTab] = useState<Tab>('Overview');
  const [activePin, setActivePin] = useState<string | null>(null);
  const idx = regions.findIndex((r) => r.id === region.id);
  const prev = regions[idx - 1];
  const next = regions[idx + 1];
  const d = now ? daysUntil(region.date, now) : null;

  const pins = useMemo(
    () => region.pins.map((p) => ({ id: p.name, name: p.name, lat: p.lat, lng: p.lng, color: kindColors[p.kind], note: p.note })),
    [region],
  );
  const kinds = Array.from(new Set(region.pins.map((p) => p.kind))) as WineKind[];

  return (
    <main style={{ ['--accent' as string]: region.accent }}>
      <header className={styles.regionHero}>
        <div className={styles.regionHeroText}>
          <p className={styles.kicker}>
            Class {idx + 1} · {fmt(region.date, { weekday: 'long', month: 'long', day: 'numeric' })}
            {d !== null && d >= 0 && <span className={styles.heroPill}>{d === 0 ? 'Today' : d === 1 ? 'Tomorrow' : `in ${d} days`}</span>}
          </p>
          <h1 className={styles.regionTitle}>{region.title}</h1>
          <p className={styles.regionCountry}>{region.country}</p>
          <p className={styles.regionTagline}>{region.tagline}</p>
        </div>
        <div className={styles.regionGlasses}>
          {region.grapes.map((g) => (
            <div key={g.name} className={styles.heroGlass}>
              <Glass color={g.hex} size={84} sparkling={region.id === 'champagne'} />
              <span>{g.name}</span>
            </div>
          ))}
        </div>
      </header>

      <div className={styles.stats}>
        {region.stats.map((s) => (
          <div key={s.label} className={styles.stat}>
            <span className={styles.statValue}>{s.value}</span>
            <span className={styles.statLabel}>{s.label}</span>
          </div>
        ))}
      </div>

      <div className={styles.tabs} role="tablist">
        {TABS.map((t) => (
          <button key={t} type="button" role="tab" aria-selected={tab === t} className={`${styles.tab} ${tab === t ? styles.tabOn : ''}`} onClick={() => setTab(t)}>
            {t}
          </button>
        ))}
      </div>

      {tab === 'Overview' && (
        <div className={styles.tabBody}>
          <p className={styles.lede}>{region.intro}</p>

          <div className={styles.twoUp}>
            <div className={styles.card}>
              <span className={styles.cardIcon}>☀</span>
              <h3 className={styles.h3}>Climate</h3>
              <p>{region.climate}</p>
            </div>
            <div className={styles.card}>
              <span className={styles.cardIcon}>▤</span>
              <h3 className={styles.h3}>Soils</h3>
              <p>{region.soils}</p>
            </div>
          </div>

          {region.zones && (
            <>
              <h3 className={styles.h3Section}>The lay of the land</h3>
              <div className={styles.zones}>
                {region.zones.map((z, i) => (
                  <div key={z.name} className={styles.zone}>
                    <span className={styles.zoneNum}>{i + 1}</span>
                    <div>
                      <strong>{z.name}</strong>
                      <p className={styles.muted}>{z.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          <h3 className={styles.h3Section}>Need to know</h3>
          <ol className={styles.facts}>
            {region.keyFacts.map((f) => (
              <li key={f} className={styles.fact}>{f}</li>
            ))}
          </ol>

          <h3 className={styles.h3Section}>Timeline</h3>
          <div className={styles.timeline}>
            {region.timeline.map((t) => (
              <div key={t.year} className={styles.timeItem}>
                <span className={styles.timeYear}>{t.year}</span>
                <span className={styles.timeDot} />
                <span className={styles.timeEvent}>{t.event}</span>
              </div>
            ))}
          </div>

          <div className={styles.twoUp}>
            <div>
              <h3 className={styles.h3Section}>Names to know</h3>
              <div className={styles.chips}>
                {region.producers.map((p) => <span key={p} className={styles.chipStatic}>{p}</span>)}
              </div>
            </div>
            <div>
              <h3 className={styles.h3Section}>At the table</h3>
              <ul className={styles.pairings}>
                {region.pairings.map((p) => <li key={p} className={styles.pairing}>🍽 {p}</li>)}
              </ul>
            </div>
          </div>
        </div>
      )}

      {tab === 'Map' && (
        <div className={styles.tabBody}>
          <div className={styles.mapLayout}>
            <div className={styles.mapFrame}>
              <RegionMap center={region.map.center} zoom={region.map.zoom} pins={pins} activeId={activePin} onSelect={setActivePin} />
              <div className={styles.legend}>
                {kinds.map((k) => (
                  <span key={k} className={styles.legendItem}><span className={styles.legendDot} style={{ background: kindColors[k] }} />{kindLabels[k]}</span>
                ))}
              </div>
            </div>
            <div className={styles.pinList}>
              {region.pins.map((p) => (
                <button key={p.name} type="button" className={`${styles.pinItem} ${activePin === p.name ? styles.pinItemOn : ''}`} onClick={() => setActivePin(p.name)}>
                  <span className={styles.legendDot} style={{ background: kindColors[p.kind] }} />
                  <span>
                    <strong>{p.name}</strong>
                    <span className={styles.pinNote}>{p.note}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === 'Grapes' && (
        <div className={styles.tabBody}>
          <div className={styles.grapeGrid}>
            {region.grapes.map((g) => (
              <article key={g.name} className={styles.grapeCard}>
                <div className={styles.grapeTop}>
                  <Glass color={g.hex} size={80} sparkling={region.id === 'champagne'} />
                  <div>
                    <span className={styles.grapeType}>{g.color === 'red' ? 'Red grape' : 'White grape'}</span>
                    <h3 className={styles.grapeName}>{g.name}</h3>
                    <p className={styles.muted}>{g.role}</p>
                  </div>
                </div>
                <ProfileBars profile={g.profile} accent={region.accent} />
                <div className={styles.chips}>
                  {g.aromas.map((a) => <span key={a} className={styles.chipStatic}>{a}</span>)}
                </div>
              </article>
            ))}
          </div>
          <p className={styles.footnote}>Structure dots show a typical style on a 1–5 scale. Individual wines vary with producer and vintage.</p>
        </div>
      )}

      {tab === 'Study' && (
        <div className={styles.tabBody}>
          <h3 className={styles.h3Section}>{region.classification.title}</h3>
          <div className={styles.ladder}>
            {region.classification.levels.map((l, i) => (
              <div key={l.name} className={styles.rung} style={{ ['--w' as string]: `${100 - i * (40 / region.classification.levels.length)}%` }}>
                <strong>{l.name}</strong>
                <span className={styles.muted}>{l.desc}</span>
              </div>
            ))}
          </div>

          <h3 className={styles.h3Section}>Flashcards</h3>
          <Flashcards cards={region.flashcards} accent={region.accent} />

          <h3 className={styles.h3Section}>Vocabulary</h3>
          <dl className={styles.vocab}>
            {region.vocab.map((v) => (
              <div key={v.term} className={styles.vocabItem}>
                <dt className={styles.vocabTerm}>{v.term}</dt>
                <dd className={styles.vocabDef}>{v.def}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}

      {tab === 'Class notes' && (
        <div className={styles.tabBody}>
          <div className={styles.notesLayout}>
            <div>
              <h3 className={styles.h3Section}>Lecture notes</h3>
              <textarea
                className={styles.textarea}
                placeholder={`Notes from ${region.title}… (saved automatically)`}
                value={note}
                onChange={(e) => onNote(e.target.value)}
              />
              <p className={styles.footnote}>Autosaved in this browser. Export everything from the Notebook.</p>
            </div>
            <div>
              <h3 className={styles.h3Section}>Log a wine we tasted</h3>
              <TastingForm regionId={region.id} accent={region.accent} onSave={onAddTasting} />
            </div>
          </div>

          {tastings.length > 0 && (
            <>
              <h3 className={styles.h3Section}>Tasted in this class</h3>
              <TastingList tastings={tastings} onRemove={onRemoveTasting} />
            </>
          )}
        </div>
      )}

      <div className={styles.pager}>
        {prev ? <button type="button" className={styles.ghostButton} onClick={() => onOpen(prev.id)}>← {prev.title}</button> : <span />}
        {next ? <button type="button" className={styles.ghostButton} onClick={() => onOpen(next.id)}>{next.title} →</button> : <span />}
      </div>
    </main>
  );
}

// ───────────────────────── tasting language ─────────────────────────

function LanguageView({ onSave }: { onSave: (t: Tasting) => void }) {
  const [activeScale, setActiveScale] = useState(0);
  const [aromas, setAromas] = useState<string[]>([]);
  const [query, setQuery] = useState('');
  const [cat, setCat] = useState<string>('All');
  const scale = scales[activeScale];
  const cats = ['All', 'Structure', 'Flavor', 'Quality', 'Faults', 'Winemaking'];
  const toggle = (n: string) => setAromas((a) => (a.includes(n) ? a.filter((x) => x !== n) : [...a, n]));

  const terms = glossary.filter(
    (g) => (cat === 'All' || g.cat === cat) && (g.term + g.def).toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <main>
      <header className={styles.hero}>
        <p className={styles.kicker}>The tasting language</p>
        <h1 className={styles.heroTitle}>How to <em>talk</em> about wine.</h1>
        <p className={styles.heroSub}>Every tasting note comes down to a few questions: how it looks, how it smells, and how it feels in your mouth. Here’s the vocabulary.</p>
      </header>

      <section className={styles.section}>
        <h2 className={styles.h2}>Five steps</h2>
        <div className={styles.steps}>
          {tastingSteps.map((s, i) => (
            <div key={s.step} className={styles.stepCard}>
              <span className={styles.stepIcon}>{s.icon}</span>
              <span className={styles.stepNum}>0{i + 1}</span>
              <strong className={styles.stepName}>{s.step}</strong>
              <p className={styles.muted}>{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.h2}>Sweetness: from bone-dry to luscious</h2>
        <div className={styles.spectrum}>
          {scales[0].levels.map((l, i) => (
            <div key={l} className={styles.spectrumCell} style={{ background: `color-mix(in srgb, #d98b2b ${10 + i * 17}%, var(--card))` }}>
              <span className={styles.spectrumLabel}>{l}</span>
              <span className={styles.spectrumWine}>{scales[0].examples.find((e) => e.level === i)?.wine ?? ''}</span>
            </div>
          ))}
        </div>
        <p className={styles.callout}><strong>The #1 confusion:</strong> {scales[0].tip}</p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.h2}>Structure: what you feel</h2>
        <div className={styles.segmented}>
          {scales.map((s, i) => (
            <button key={s.id} type="button" className={`${styles.segment} ${i === activeScale ? styles.segmentOn : ''}`} onClick={() => setActiveScale(i)}>
              {s.name}
            </button>
          ))}
        </div>
        <div className={styles.scalePanel}>
          <div>
            <h3 className={styles.scaleBig}>{scale.question}</h3>
            <p className={styles.kicker}>Where you feel it: {scale.where}</p>
            <p className={styles.scaleTip}>{scale.tip}</p>
          </div>
          <div className={styles.scaleMeter}>
            {scale.levels.map((l, i) => {
              const ex = scale.examples.find((e) => e.level === i);
              return (
                <div key={l} className={styles.meterRow}>
                  <span className={styles.meterBar} style={{ width: `${((i + 1) / scale.levels.length) * 100}%` }} />
                  <span className={styles.meterLabel}>{l}</span>
                  {ex && <span className={styles.meterEx}>{ex.wine}</span>}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.h2}>Aromas: what you smell</h2>
        <div className={styles.wheelLayout}>
          <AromaWheel selected={aromas} onToggle={toggle} />
          <div className={styles.aromaInfo}>
            {aromaGroups.map((g) => (
              <div key={g.name} className={styles.aromaTier}>
                <span className={styles.kicker}>{g.name} · {g.from}</span>
                <p>{g.desc}</p>
              </div>
            ))}
            <p className={styles.footnote}>Tap notes on the wheel and they’ll appear in the description builder below.</p>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2 className={styles.h2}>Build a tasting note</h2>
          <p className={styles.muted}>Pick what you sense and get a full sentence back. Save it to any class.</p>
        </div>
        <TastingForm onSave={onSave} aromas={aromas} onAromasChange={setAromas} hideAromaPicker />
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2 className={styles.h2}>Glossary</h2>
          <input className={`${styles.input} ${styles.search}`} placeholder="Search terms…" value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
        <div className={styles.segmented}>
          {cats.map((c) => (
            <button key={c} type="button" className={`${styles.segment} ${cat === c ? styles.segmentOn : ''}`} onClick={() => setCat(c)}>{c}</button>
          ))}
        </div>
        <dl className={styles.glossary}>
          {terms.map((g) => (
            <div key={g.term} className={styles.vocabItem}>
              <dt className={styles.vocabTerm}>{g.term} <span className={styles.catTag}>{g.cat}</span></dt>
              <dd className={styles.vocabDef}>{g.def}</dd>
            </div>
          ))}
          {terms.length === 0 && <p className={styles.muted}>No matching terms.</p>}
        </dl>
      </section>
    </main>
  );
}

// ───────────────────────── notebook ─────────────────────────

function TastingList({ tastings, onRemove }: { tastings: Tasting[]; onRemove: (id: string) => void }) {
  return (
    <div className={styles.tastingList}>
      {tastings.map((t) => (
        <article key={t.id} className={styles.tastingCard}>
          <div className={styles.tastingCardHead}>
            <div>
              <strong>{t.wine || 'Untitled wine'}</strong>
              <span className={styles.muted}> {[t.producer, t.vintage, t.price].filter(Boolean).join(' · ')}</span>
            </div>
            <span className={styles.stars}>{'★'.repeat(t.rating)}<span className={styles.starsOff}>{'★'.repeat(5 - t.rating)}</span></span>
          </div>
          <p className={styles.tastingDesc}>{describe(t)}</p>
          {t.comments && <p className={styles.muted}>{t.comments}</p>}
          <button type="button" className={styles.linkButton} onClick={() => confirm('Delete this tasting?') && onRemove(t.id)}>Delete</button>
        </article>
      ))}
    </div>
  );
}

function NotebookView({ notes, onNote, tastings, onRemove, onOpen }: {
  notes: Record<string, string>;
  onNote: (id: string, t: string) => void;
  tastings: Tasting[];
  onRemove: (id: string) => void;
  onOpen: (id: string) => void;
}) {
  const exportAll = () => {
    const md = regions
      .map((r) => {
        const ts = tastings.filter((t) => t.regionId === r.id);
        return [
          `# ${r.title} (${fmt(r.date, { month: 'long', day: 'numeric' })})`,
          '',
          (notes[r.id] ?? '').trim() || '_No notes yet._',
          '',
          ...(ts.length
            ? ['## Wines tasted', ...ts.map((t) => `- **${t.wine || 'Untitled'}** ${[t.producer, t.vintage, t.price].filter(Boolean).join(' · ')} ${'★'.repeat(t.rating)}\n  ${describe(t)}${t.comments ? `\n  ${t.comments}` : ''}`)]
            : []),
          '',
        ].join('\n');
      })
      .join('\n');
    download('wine-class-notes.md', md);
  };

  return (
    <main>
      <header className={styles.hero}>
        <p className={styles.kicker}>Everything in one place</p>
        <h1 className={styles.heroTitle}>My <em>notebook.</em></h1>
        <p className={styles.heroSub}>{tastings.length} wines tasted. Notes autosave in this browser; export a Markdown copy to keep them safe.</p>
        <button type="button" className={styles.primaryButton} onClick={exportAll}>Export notes (.md)</button>
      </header>

      {regions.map((r) => {
        const ts = tastings.filter((t) => t.regionId === r.id);
        return (
          <section key={r.id} className={styles.notebookSection} style={{ ['--accent' as string]: r.accent }}>
            <div className={styles.notebookHead}>
              <span className={styles.notebookSwatch} />
              <div>
                <span className={styles.kicker}>{fmt(r.date, { weekday: 'short', month: 'short', day: 'numeric' })}</span>
                <h2 className={styles.h2}>{r.title}</h2>
              </div>
              <button type="button" className={styles.ghostButton} onClick={() => onOpen(r.id)}>Open class →</button>
            </div>
            <textarea className={styles.textareaSmall} placeholder="No notes yet." value={notes[r.id] ?? ''} onChange={(e) => onNote(r.id, e.target.value)} />
            {ts.length > 0 && <TastingList tastings={ts} onRemove={onRemove} />}
          </section>
        );
      })}
    </main>
  );
}

// ───────────────────────── notes drawer ─────────────────────────

function NotesDrawer({ open, onClose, regionId, notes, onNote }: {
  open: boolean;
  onClose: () => void;
  regionId: string;
  notes: Record<string, string>;
  onNote: (id: string, t: string) => void;
}) {
  const [id, setId] = useState(regionId);
  useEffect(() => setId(regionId), [regionId]);
  const r = regions.find((x) => x.id === id)!;

  return (
    <>
      <div className={`${styles.scrim} ${open ? styles.scrimOn : ''}`} onClick={onClose} />
      <aside className={`${styles.drawer} ${open ? styles.drawerOn : ''}`} style={{ ['--accent' as string]: r.accent }} aria-hidden={!open}>
        <div className={styles.drawerHead}>
          <select className={styles.drawerSelect} value={id} onChange={(e) => setId(e.target.value)}>
            {regions.map((x) => (
              <option key={x.id} value={x.id}>{fmt(x.date, { month: 'short', day: 'numeric' })} · {x.title}</option>
            ))}
          </select>
          <button type="button" className={styles.closeButton} onClick={onClose} aria-label="Close notes">×</button>
        </div>
        <textarea
          className={styles.drawerText}
          placeholder={`Notes for ${r.title}…\n\nTip: jot down wines, the professor’s key points, and questions to look up later.`}
          value={notes[id] ?? ''}
          onChange={(e) => onNote(id, e.target.value)}
        />
        <p className={styles.footnote}>Autosaved ✓</p>
      </aside>
    </>
  );
}
