# Wine Class 🍷

A study companion for the Columbia Business School wine course (Fall 2026).

| Date | Class |
| --- | --- |
| Oct 7 | Bordeaux |
| Oct 14 | West Coast |
| Oct 28 | Burgundy |
| Nov 4 | Piedmont |
| Nov 11 | Loire Valley |
| Nov 18 | Spain & Portugal |
| Dec 2 | Rhône |
| Dec 9 | Champagne |

## What's inside

- **Syllabus**: every class with a countdown to the next one and a world map of all eight regions.
- **Region pages**: each has five tabs.
  - *Overview*: intro, climate, soils, sub-zones, key facts, timeline, producers, food pairings
  - *Map*: an interactive map with clickable appellation pins
  - *Grapes*: wine-color glasses and 1–5 structure profiles (sweetness, acidity, tannin, body, alcohol)
  - *Study*: the classification system, flip flashcards, vocabulary
  - *Class notes*: lecture notes plus a structured tasting log
- **Tasting language**: the five tasting steps, the dry-to-sweet spectrum, the structure scales, an interactive aroma wheel, a tasting-note builder and a searchable glossary.
- **Notebook**: all notes and tastings in one place, with a Markdown export.
- A floating **✎ Notes** button opens a notes drawer from any page.

Notes are saved in your browser (localStorage). They stay put on the same browser and device, but use **Export** to keep a copy.

## Running it

```bash
npm install
npm run dev
```

Then open http://localhost:3000/prototypes/wine-class

## Editing content

All course content lives in `data/regions.ts` (one object per class) and `data/language.ts` (tasting vocabulary). Edit the text there and the pages update.

Maps use [Leaflet](https://leafletjs.com) with free CARTO/OpenStreetMap tiles, so you don't need an API key.
