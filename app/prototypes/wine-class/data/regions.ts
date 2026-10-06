// All of the course content lives here, one object per class session.
// Each region has: quick stats, a map (pins use real lat/lng), grapes with
// structure profiles (1–5 scales), key facts, vocabulary, a mini timeline and flashcards.

export type WineKind = 'red' | 'white' | 'sweet' | 'sparkling' | 'fortified' | 'rose' | 'mixed';

export type Pin = {
  name: string;
  lat: number;
  lng: number;
  kind: WineKind;
  note: string;
};

export type Profile = {
  sweetness: number;
  acidity: number;
  tannin: number;
  body: number;
  alcohol: number;
};

export type Grape = {
  name: string;
  color: 'red' | 'white';
  hex: string; // approximate color of the wine in the glass
  role: string;
  profile: Profile;
  aromas: string[];
};

export type Region = {
  id: string;
  title: string;
  date: string; // ISO date of the class
  country: string;
  tagline: string;
  accent: string; // theme color for this class
  intro: string;
  stats: { label: string; value: string }[];
  climate: string;
  soils: string;
  map: { center: [number, number]; zoom: number };
  pins: Pin[];
  grapes: Grape[];
  zones?: { name: string; desc: string }[];
  classification: { title: string; levels: { name: string; desc: string }[] };
  keyFacts: string[];
  timeline: { year: string; event: string }[];
  producers: string[];
  pairings: string[];
  vocab: { term: string; def: string }[];
  flashcards: { q: string; a: string }[];
};

export const regions: Region[] = [
  // ───────────────────────────── BORDEAUX ─────────────────────────────
  {
    id: 'bordeaux',
    title: 'Bordeaux',
    date: '2026-10-07',
    country: 'France',
    tagline: 'The world’s benchmark for blended reds',
    accent: '#6b1e2e',
    intro:
      'Bordeaux sits on France’s Atlantic coast where the Garonne and Dordogne rivers meet to form the Gironde estuary. Almost everything here is a blend, and the estuary splits the region in two: Cabernet Sauvignon leads on the gravelly Left Bank, Merlot on the clay-and-limestone Right Bank.',
    stats: [
      { label: 'Vineyard area', value: '~110,000 ha' },
      { label: 'Châteaux', value: '~5,500+' },
      { label: 'Style', value: '~85% red' },
      { label: 'Signature', value: 'Cabernet / Merlot blends' },
    ],
    climate:
      'Maritime: mild, damp and moderated by the Atlantic and the Gulf Stream. The Landes pine forest shelters vines from ocean winds. Rain at harvest makes vintages vary a lot, which is why vintage matters so much here.',
    soils:
      'Left Bank: deep, warm gravel that drains well and stores heat, which suits late-ripening Cabernet. Right Bank: cool clay and limestone that suits early-ripening Merlot. Pomerol has iron-rich “crasse de fer” clay.',
    map: { center: [44.98, -0.45], zoom: 9 },
    pins: [
      { name: 'Saint-Estèphe', lat: 45.26, lng: -0.77, kind: 'red', note: 'Most northerly Médoc commune; more clay, sturdier and more rustic Cabernet.' },
      { name: 'Pauillac', lat: 45.199, lng: -0.748, kind: 'red', note: 'Home to 3 of the 5 First Growths (Lafite, Latour, Mouton). Cassis, cedar, pencil shavings.' },
      { name: 'Saint-Julien', lat: 45.155, lng: -0.735, kind: 'red', note: 'Balanced and classic: “claret” at its most consistent. No First Growths but many Seconds.' },
      { name: 'Margaux', lat: 45.04, lng: -0.67, kind: 'red', note: 'Thinnest gravel soils; the most perfumed and elegant Médoc wines. Home of Château Margaux.' },
      { name: 'Pessac-Léognan', lat: 44.77, lng: -0.64, kind: 'mixed', note: 'Northern Graves at the city’s edge. Haut-Brion; smoky reds and great oaked Sauvignon-Sémillon whites.' },
      { name: 'Sauternes', lat: 44.53, lng: -0.34, kind: 'sweet', note: 'Ciron river fog causes noble rot (Botrytis). Luscious sweet Sémillon. Château d’Yquem.' },
      { name: 'Entre-Deux-Mers', lat: 44.76, lng: -0.32, kind: 'white', note: '“Between two seas” (really two rivers). Crisp, good-value dry whites.' },
      { name: 'Saint-Émilion', lat: 44.894, lng: -0.155, kind: 'red', note: 'UNESCO medieval village on a limestone plateau. Merlot + Cabernet Franc. Cheval Blanc, Ausone.' },
      { name: 'Pomerol', lat: 44.93, lng: -0.2, kind: 'red', note: 'Tiny and Merlot-dominant; plush and velvety with truffle notes. Pétrus, Le Pin. No official classification.' },
    ],
    zones: [
      { name: 'Left Bank', desc: 'Médoc & Graves. Gravel, Cabernet Sauvignon-led, firm tannins, built to age.' },
      { name: 'Right Bank', desc: 'Saint-Émilion & Pomerol. Clay & limestone, Merlot-led, rounder and plusher.' },
      { name: 'Entre-Deux-Mers', desc: 'Between the rivers. Mostly fresh whites and value reds.' },
      { name: 'Sauternes & Barsac', desc: 'Southern Graves. Sweet wines from botrytized grapes.' },
    ],
    grapes: [
      { name: 'Cabernet Sauvignon', color: 'red', hex: '#3d0a1a', role: 'Backbone of the Left Bank', profile: { sweetness: 1, acidity: 4, tannin: 5, body: 4, alcohol: 3 }, aromas: ['Blackcurrant (cassis)', 'Cedar', 'Graphite', 'Tobacco', 'Mint'] },
      { name: 'Merlot', color: 'red', hex: '#4a0e22', role: 'Most-planted grape; heart of the Right Bank', profile: { sweetness: 1, acidity: 3, tannin: 3, body: 4, alcohol: 4 }, aromas: ['Plum', 'Black cherry', 'Chocolate', 'Truffle'] },
      { name: 'Cabernet Franc', color: 'red', hex: '#5a1428', role: 'Aromatic lift; key at Cheval Blanc', profile: { sweetness: 1, acidity: 4, tannin: 3, body: 3, alcohol: 3 }, aromas: ['Raspberry', 'Violet', 'Bell pepper', 'Pencil lead'] },
      { name: 'Petit Verdot', color: 'red', hex: '#2e0612', role: 'A small dash for color and spice', profile: { sweetness: 1, acidity: 4, tannin: 5, body: 5, alcohol: 4 }, aromas: ['Violet', 'Blueberry', 'Sage'] },
      { name: 'Sémillon', color: 'white', hex: '#e8c96a', role: 'Waxy body; main grape of Sauternes', profile: { sweetness: 1, acidity: 2, tannin: 1, body: 4, alcohol: 3 }, aromas: ['Lemon', 'Beeswax', 'Lanolin', 'Honey (with age)'] },
      { name: 'Sauvignon Blanc', color: 'white', hex: '#efe4a0', role: 'Freshness and zip in the white blends', profile: { sweetness: 1, acidity: 5, tannin: 1, body: 2, alcohol: 3 }, aromas: ['Grapefruit', 'Cut grass', 'Gooseberry'] },
    ],
    classification: {
      title: 'The 1855 Classification & friends',
      levels: [
        { name: '1855 Médoc (+ Haut-Brion)', desc: '61 châteaux ranked into five “growths” (crus) for the Paris Exposition, based on price. Only one change since: Mouton Rothschild was promoted to First Growth in 1973.' },
        { name: 'First Growths (Premiers Crus)', desc: 'Lafite Rothschild, Latour, Mouton Rothschild (Pauillac) · Margaux (Margaux) · Haut-Brion (Pessac-Léognan).' },
        { name: '1855 Sauternes', desc: 'Château d’Yquem alone is “Premier Cru Supérieur”, ranked above all others.' },
        { name: 'Saint-Émilion', desc: 'Re-ranked about every 10 years (most recently 2022), so wines can be promoted or demoted. Ausone, Cheval Blanc and Angélus have left the system.' },
        { name: 'Graves (1959)', desc: 'Lists classified reds and whites with no tiers.' },
        { name: 'Pomerol', desc: 'No classification at all, yet it includes some of the world’s most expensive wines (Pétrus, Le Pin).' },
        { name: 'Cru Bourgeois', desc: 'Value Médoc tier, re-assessed every 5 years: Cru Bourgeois, Supérieur, Exceptionnel.' },
      ],
    },
    keyFacts: [
      '“Claret” is the British name for red Bordeaux. England ruled Aquitaine from 1152 to 1453 (via Eleanor of Aquitaine), so the wine trade with England is centuries old.',
      'En primeur: top wines are sold as “futures” in spring, about 18 months before bottling, through négociants on “La Place de Bordeaux.” It’s a classic case study in pricing and market power.',
      'A château’s “second wine” (e.g. Les Forts de Latour, Carruades de Lafite) uses younger vines or lots not chosen for the main wine, so you get the same estate for much less money.',
      'Since 2021, Bordeaux has allowed new heat-tolerant varieties such as Touriga Nacional and Marselan in basic AOC wines to cope with climate change.',
      'Great recent vintages: 2005, 2009, 2010, 2015, 2016, 2018, 2019, 2020, 2022.',
      'Left Bank = Cabernet, gravel, structure. Right Bank = Merlot, clay, plushness. This is the single most tested Bordeaux idea.',
    ],
    timeline: [
      { year: '1152', event: 'Eleanor of Aquitaine marries the future Henry II; Bordeaux begins three centuries under English rule.' },
      { year: '1600s', event: 'Dutch engineers drain the Médoc marshes, exposing the gravel beds.' },
      { year: '1855', event: 'Napoleon III requests a classification for the Paris Exposition.' },
      { year: '1973', event: 'Mouton Rothschild promoted to First Growth.' },
      { year: '1982', event: 'Robert Parker hails the 1982 vintage, and the modern Bordeaux market takes off.' },
    ],
    producers: ['Château Lafite Rothschild', 'Château Latour', 'Château Margaux', 'Château Haut-Brion', 'Château Mouton Rothschild', 'Pétrus', 'Cheval Blanc', 'Château d’Yquem', 'Léoville-Las Cases', 'Château Palmer'],
    pairings: ['Roast lamb & steak frites (Left Bank)', 'Duck or mushroom dishes (Right Bank)', 'Sauternes with foie gras or Roquefort', 'Dry white Bordeaux with oysters'],
    vocab: [
      { term: 'Château', def: 'A wine estate, which may or may not have an actual castle.' },
      { term: 'Assemblage', def: 'The blend of grape varieties and lots that makes up the final wine.' },
      { term: 'Grand Vin', def: 'An estate’s top (first) wine.' },
      { term: 'Botrytis / noble rot', def: 'A fungus that shrivels grapes and concentrates sugar and acid, used for Sauternes.' },
      { term: 'Négociant', def: 'A merchant who buys and sells (and sometimes blends) wine.' },
    ],
    flashcards: [
      { q: 'Which grape dominates the Left Bank, and why?', a: 'Cabernet Sauvignon, because warm, free-draining gravel helps this late-ripening grape ripen fully.' },
      { q: 'Name the five First Growths.', a: 'Lafite Rothschild, Latour, Mouton Rothschild, Margaux, Haut-Brion.' },
      { q: 'What causes the sweetness of Sauternes?', a: 'Noble rot (Botrytis cinerea), encouraged by morning fog from the Ciron river, which concentrates the grapes.' },
      { q: 'Which famous Right Bank appellation has no classification?', a: 'Pomerol (Pétrus, Le Pin).' },
      { q: 'What is “en primeur”?', a: 'Selling wine as futures, before it is bottled, through the négociant system.' },
      { q: 'What was the only change to the 1855 red classification?', a: 'Mouton Rothschild was elevated from Second to First Growth in 1973.' },
    ],
  },

  // ───────────────────────────── WEST COAST ─────────────────────────────
  {
    id: 'west-coast',
    title: 'West Coast',
    date: '2026-10-14',
    country: 'USA · California, Oregon, Washington',
    tagline: 'New World ambition, from Napa Cabernet to Oregon Pinot',
    accent: '#a0522d',
    intro:
      'America’s Pacific states make about 90% of US wine. California brings sunshine and scale. Oregon’s Willamette Valley is the country’s Pinot Noir capital. Washington’s desert vineyards east of the Cascades make structured Cabernet, Merlot and Syrah. The key to all three is the cool influence of the Pacific.',
    stats: [
      { label: 'California share of US wine', value: '~80%' },
      { label: 'Napa share of CA crush', value: '~4%' },
      { label: 'Washington rank', value: '#2 US producer' },
      { label: 'Signature', value: 'Cab · Pinot · Chardonnay' },
    ],
    climate:
      'California: Mediterranean. Fog from the Pacific and San Pablo Bay cools the valleys, giving warm days and cold nights (a big diurnal swing). Oregon: cool and wet, similar to Burgundy. Washington: dry rain-shadow desert east of the Cascades, with irrigation and long summer days at about 46°N.',
    soils:
      'Napa has over 100 soil types, from volcanic hillsides to alluvial benches (“Rutherford dust”). Oregon’s Dundee Hills have red volcanic Jory soil. Washington has sandy loess left by the Ice Age Missoula Floods, which phylloxera dislikes, so many vines there grow on their own roots.',
    map: { center: [41.5, -121.2], zoom: 5 },
    pins: [
      { name: 'Oakville (Napa)', lat: 38.437, lng: -122.401, kind: 'red', note: 'Heart of Napa Cabernet: To Kalon, Opus One, Screaming Eagle.' },
      { name: 'Stags Leap District', lat: 38.4, lng: -122.32, kind: 'red', note: 'Silky “iron fist in a velvet glove” Cab. Won the 1976 Judgment of Paris.' },
      { name: 'Carneros', lat: 38.25, lng: -122.35, kind: 'mixed', note: 'Cool, windy, bay-influenced: Pinot Noir, Chardonnay and sparkling.' },
      { name: 'Russian River Valley', lat: 38.45, lng: -122.88, kind: 'mixed', note: 'Sonoma fog belt: lush Pinot Noir and rich Chardonnay.' },
      { name: 'Dry Creek Valley', lat: 38.67, lng: -122.95, kind: 'red', note: 'Old-vine Zinfandel country.' },
      { name: 'Paso Robles', lat: 35.63, lng: -120.69, kind: 'red', note: 'Warm Central Coast: Rhône blends, Cabernet, Zinfandel.' },
      { name: 'Sta. Rita Hills', lat: 34.65, lng: -120.35, kind: 'mixed', note: 'East–west valley funnels ocean air. Pinot and Chardonnay (“Sideways” country).' },
      { name: 'Lodi', lat: 38.13, lng: -121.27, kind: 'red', note: 'Some of the world’s oldest Zinfandel vines.' },
      { name: 'Dundee Hills (Willamette)', lat: 45.27, lng: -123.04, kind: 'red', note: 'Red Jory soils; Oregon Pinot’s birthplace (Eyrie, Domaine Drouhin).' },
      { name: 'Eola-Amity Hills', lat: 45.02, lng: -123.13, kind: 'red', note: 'Van Duzer Corridor winds cool the vines: taut, high-acid Pinot.' },
      { name: 'Walla Walla', lat: 46.06, lng: -118.34, kind: 'red', note: 'Syrah from cobblestone “Rocks” district; Cab and Merlot.' },
      { name: 'Red Mountain', lat: 46.3, lng: -119.44, kind: 'red', note: 'Hot, tiny AVA: Washington’s most powerful, tannic Cabernet.' },
      { name: 'Yakima Valley', lat: 46.4, lng: -120.25, kind: 'mixed', note: 'Washington’s first AVA (1983).' },
    ],
    zones: [
      { name: 'Napa Valley', desc: 'Small but prestigious. Opulent, ripe Cabernet Sauvignon.' },
      { name: 'Sonoma', desc: 'Larger and more varied: Pinot, Chardonnay, Zinfandel, Cab.' },
      { name: 'Central Coast', desc: 'Santa Barbara, Paso Robles, Monterey. Cool coastal Pinot through to warm Rhône varieties.' },
      { name: 'Willamette Valley (OR)', desc: 'Cool and wet. Elegant Pinot Noir and rising Chardonnay.' },
      { name: 'Columbia Valley (WA)', desc: 'Huge desert AVA with structured reds and crisp Riesling.' },
    ],
    grapes: [
      { name: 'Cabernet Sauvignon', color: 'red', hex: '#3a0818', role: 'Napa’s king; Washington’s star', profile: { sweetness: 1, acidity: 3, tannin: 5, body: 5, alcohol: 5 }, aromas: ['Blackberry', 'Cassis', 'Vanilla', 'Mocha', 'Mint'] },
      { name: 'Pinot Noir', color: 'red', hex: '#8a2433', role: 'Oregon, Sonoma Coast, Santa Barbara', profile: { sweetness: 1, acidity: 4, tannin: 2, body: 2, alcohol: 3 }, aromas: ['Red cherry', 'Raspberry', 'Cola', 'Forest floor'] },
      { name: 'Zinfandel', color: 'red', hex: '#4b0f20', role: 'California’s heritage grape (= Primitivo)', profile: { sweetness: 2, acidity: 3, tannin: 3, body: 5, alcohol: 5 }, aromas: ['Blackberry jam', 'Black pepper', 'Licorice'] },
      { name: 'Chardonnay', color: 'white', hex: '#e6c35c', role: 'From buttery-oaky to lean & mineral', profile: { sweetness: 1, acidity: 3, tannin: 1, body: 4, alcohol: 4 }, aromas: ['Baked apple', 'Pineapple', 'Butter', 'Vanilla', 'Toast'] },
      { name: 'Syrah', color: 'red', hex: '#30081a', role: 'Washington & Central Coast', profile: { sweetness: 1, acidity: 3, tannin: 4, body: 5, alcohol: 4 }, aromas: ['Blackberry', 'Smoked meat', 'Olive', 'Black pepper'] },
      { name: 'Riesling', color: 'white', hex: '#efe39a', role: 'Washington (Chateau Ste. Michelle)', profile: { sweetness: 2, acidity: 5, tannin: 1, body: 2, alcohol: 2 }, aromas: ['Lime', 'Green apple', 'Peach', 'Jasmine'] },
    ],
    classification: {
      title: 'AVAs & US label law',
      levels: [
        { name: 'AVA (American Viticultural Area)', desc: 'A geographic area defined by the TTB. It sets only the place. Unlike in Europe, there are no rules on grapes, yields or aging. Napa Valley AVA dates from 1981.' },
        { name: 'Varietal labeling', desc: 'Federal rule: a wine named for a grape must be at least 75% that grape. Oregon requires 90% for most varieties.' },
        { name: 'Place of origin', desc: 'Named AVA: at least 85% of grapes from it. State or county: at least 75%.' },
        { name: 'Vintage', desc: 'At least 95% of grapes from the stated year (if labeled with an AVA).' },
        { name: 'Meritage', desc: 'A trademarked name for American Bordeaux-style blends.' },
      ],
    },
    keyFacts: [
      'Judgment of Paris (1976): in a blind tasting, French judges ranked Stag’s Leap Wine Cellars 1973 Cabernet and Chateau Montelena 1973 Chardonnay above top Bordeaux and Burgundy. It put California on the map.',
      'Prohibition (1920–1933) nearly wiped out the US wine industry. Many old Zinfandel vines survived because home winemaking was allowed.',
      'Robert Mondavi opened his Oakville winery in 1966 and popularized varietal labels and “Fumé Blanc”.',
      'In 1965 David Lett (The Eyrie Vineyards) planted the Willamette Valley’s first Pinot Noir. When Burgundy’s Drouhin family bought land in Dundee Hills in 1987, the region gained credibility overnight.',
      'Washington is the second-largest US wine producer, but most of its grapes grow in desert, more than 150 miles from Seattle’s rain.',
      'Typical style: riper fruit, higher alcohol and more new oak than in Europe, though a “balance” movement since the 2010s favors earlier picking.',
    ],
    timeline: [
      { year: '1769', event: 'Spanish missionaries plant the “Mission” grape in California.' },
      { year: '1920–33', event: 'Prohibition.' },
      { year: '1966', event: 'Robert Mondavi Winery founded; David Lett’s first Oregon Pinot vintage soon follows.' },
      { year: '1976', event: 'Judgment of Paris.' },
      { year: '1981', event: 'Napa Valley becomes California’s first AVA.' },
      { year: '1987', event: 'Domaine Drouhin comes to Oregon.' },
    ],
    producers: ['Ridge', 'Stag’s Leap Wine Cellars', 'Chateau Montelena', 'Opus One', 'Robert Mondavi', 'Screaming Eagle', 'The Eyrie Vineyards', 'Domaine Drouhin Oregon', 'Leonetti Cellar', 'Au Bon Climat'],
    pairings: ['Napa Cab with ribeye', 'Oregon Pinot with salmon or mushrooms', 'Zinfandel with BBQ ribs', 'Buttery Chardonnay with lobster or roast chicken'],
    vocab: [
      { term: 'AVA', def: 'American Viticultural Area: a defined grape-growing region.' },
      { term: 'Diurnal shift', def: 'The swing between daytime and nighttime temperatures. Cool nights preserve acidity.' },
      { term: 'Cult wine', def: 'A tiny-production, mailing-list-only, very expensive wine (e.g. Screaming Eagle, Harlan).' },
      { term: 'Own-rooted', def: 'Vines grown without phylloxera-resistant rootstock (common in Washington).' },
      { term: 'Meritage', def: 'An American Bordeaux-style blend (rhymes with “heritage”).' },
    ],
    flashcards: [
      { q: 'What happened at the Judgment of Paris (1976)?', a: 'California wines (Stag’s Leap Cab and Montelena Chardonnay) beat top French wines in a blind tasting.' },
      { q: 'What is the minimum % for a varietal label in the US? In Oregon?', a: '75% federally; 90% in Oregon for most varieties.' },
      { q: 'What cools Napa Valley?', a: 'Fog and breezes from the Pacific Ocean and San Pablo Bay.' },
      { q: 'What is Oregon’s signature grape and region?', a: 'Pinot Noir from the Willamette Valley.' },
      { q: 'Why can Washington grow vines on their own roots?', a: 'Its sandy soils (from the Missoula Floods) resist phylloxera.' },
      { q: 'What does an AVA regulate?', a: 'Only geographic origin. Unlike European appellations, it sets no rules on grapes or yields.' },
    ],
  },

  // ───────────────────────────── BURGUNDY ─────────────────────────────
  {
    id: 'burgundy',
    title: 'Burgundy',
    date: '2026-10-28',
    country: 'France',
    tagline: 'Two grapes, a thousand vineyards: the cult of terroir',
    accent: '#7a2a3a',
    intro:
      'Burgundy (Bourgogne) is where the idea of terroir was refined: the belief that a specific plot of land gives wine a unique identity. Nearly all wine here comes from just Pinot Noir and Chardonnay, but it is split across hundreds of named vineyards (“climats”) mapped by medieval monks.',
    stats: [
      { label: 'Vineyard area', value: '~30,000 ha' },
      { label: 'Grand Crus', value: '33' },
      { label: 'Climats (UNESCO)', value: '1,247' },
      { label: 'Signature', value: 'Pinot Noir · Chardonnay' },
    ],
    climate:
      'Continental, with cold winters and warm summers. Spring frost, hail and autumn rain are constant threats. Grapes ripen at the edge of what’s possible, so vintages differ markedly.',
    soils:
      'Jurassic limestone and marl. On the Côte d’Or, the best vineyards sit mid-slope on east-facing hillsides, with good drainage, morning sun and the right balance of limestone and clay. Chablis has Kimmeridgian marl full of fossil oyster shells.',
    map: { center: [47.05, 4.35], zoom: 8 },
    pins: [
      { name: 'Chablis', lat: 47.81, lng: 3.8, kind: 'white', note: 'Steely, unoaked-tasting Chardonnay on Kimmeridgian soils. 7 Grand Cru climats on one hillside.' },
      { name: 'Gevrey-Chambertin', lat: 47.226, lng: 4.966, kind: 'red', note: 'Powerful, structured reds. 9 Grand Crus including Chambertin (Napoleon’s favorite).' },
      { name: 'Chambolle-Musigny', lat: 47.186, lng: 4.955, kind: 'red', note: 'The most perfumed, “feminine” reds. Musigny, Bonnes-Mares.' },
      { name: 'Vougeot', lat: 47.174, lng: 4.963, kind: 'red', note: 'Clos de Vougeot: a 50-ha walled Cistercian vineyard with ~80 owners.' },
      { name: 'Vosne-Romanée', lat: 47.16, lng: 4.95, kind: 'red', note: '“No common wines in Vosne.” Romanée-Conti, La Tâche, Richebourg.' },
      { name: 'Nuits-Saint-Georges', lat: 47.137, lng: 4.95, kind: 'red', note: 'Sturdy, earthy reds; gives the Côte de Nuits its name.' },
      { name: 'Corton', lat: 47.07, lng: 4.86, kind: 'mixed', note: 'Hill of Corton: the only red Grand Cru in the Côte de Beaune, plus Corton-Charlemagne (white).' },
      { name: 'Beaune', lat: 47.025, lng: 4.84, kind: 'mixed', note: 'Wine capital. Hospices de Beaune charity auction every November.' },
      { name: 'Pommard & Volnay', lat: 47.0, lng: 4.785, kind: 'red', note: 'Pommard: muscular. Volnay: silky and fragrant.' },
      { name: 'Meursault', lat: 46.98, lng: 4.77, kind: 'white', note: 'Rich, nutty, buttery Chardonnay.' },
      { name: 'Puligny & Chassagne-Montrachet', lat: 46.94, lng: 4.745, kind: 'white', note: 'Le Montrachet: arguably the greatest white wine vineyard on earth.' },
      { name: 'Côte Chalonnaise', lat: 46.84, lng: 4.72, kind: 'mixed', note: 'Mercurey, Givry, Rully: Burgundy values.' },
      { name: 'Pouilly-Fuissé (Mâconnais)', lat: 46.28, lng: 4.75, kind: 'white', note: 'Sunny, round Chardonnay; got Premier Crus in 2020.' },
    ],
    zones: [
      { name: 'Chablis', desc: 'Isolated in the north. Lean, mineral Chardonnay.' },
      { name: 'Côte de Nuits', desc: 'Northern Côte d’Or. Almost all red; 24 of the 25 red Grand Crus.' },
      { name: 'Côte de Beaune', desc: 'Southern Côte d’Or. The great whites (Meursault, Montrachet) plus Pommard & Volnay.' },
      { name: 'Côte Chalonnaise', desc: 'Lesser-known villages, good value.' },
      { name: 'Mâconnais', desc: 'Warmest; approachable, affordable Chardonnay.' },
    ],
    grapes: [
      { name: 'Pinot Noir', color: 'red', hex: '#8c2236', role: 'Every red of note', profile: { sweetness: 1, acidity: 4, tannin: 2, body: 2, alcohol: 3 }, aromas: ['Red cherry', 'Strawberry', 'Rose', 'Mushroom', 'Forest floor'] },
      { name: 'Chardonnay', color: 'white', hex: '#e9cf72', role: 'Every white of note', profile: { sweetness: 1, acidity: 4, tannin: 1, body: 3, alcohol: 3 }, aromas: ['Lemon', 'Green apple', 'Hazelnut', 'Wet stone', 'Brioche'] },
      { name: 'Aligoté', color: 'white', hex: '#f0e8b0', role: 'Tart, zippy everyday white; Bouzeron', profile: { sweetness: 1, acidity: 5, tannin: 1, body: 2, alcohol: 2 }, aromas: ['Lemon', 'Green apple', 'White flowers'] },
      { name: 'Gamay', color: 'red', hex: '#9b2a45', role: 'Beaujolais, just to the south', profile: { sweetness: 1, acidity: 4, tannin: 2, body: 2, alcohol: 3 }, aromas: ['Raspberry', 'Banana (carbonic)', 'Violet'] },
    ],
    classification: {
      title: 'The Burgundy pyramid',
      levels: [
        { name: 'Grand Cru (~1–2%)', desc: '33 vineyards. The label shows ONLY the vineyard name, e.g. “Chambertin”, “Montrachet”, “La Tâche”.' },
        { name: 'Premier Cru (~10%)', desc: 'Village + vineyard, e.g. “Chambolle-Musigny 1er Cru Les Amoureuses”.' },
        { name: 'Village (~35%)', desc: 'Named for the village, e.g. “Gevrey-Chambertin”, “Meursault”.' },
        { name: 'Regional (~50%)', desc: '“Bourgogne Rouge/Blanc”, Bourgogne Côte d’Or, Mâcon-Villages, etc.' },
      ],
    },
    keyFacts: [
      'Producer matters as much as vineyard. Because of Napoleonic inheritance laws, one vineyard can have dozens of owners making very different wines.',
      'Domaine = an estate that grows its own grapes. Négociant = a merchant house that buys grapes or wine (e.g. Louis Jadot, Joseph Drouhin).',
      'Cistercian and Benedictine monks spent centuries observing which plots made distinct wines. The Clos de Vougeot wall dates from the 14th century.',
      'The “Climats of Burgundy” became a UNESCO World Heritage Site in 2015.',
      'A “monopole” is a vineyard owned entirely by one producer, e.g. La Romanée-Conti (1.8 ha) or La Tâche, both owned by DRC.',
      'Burgundy is often the world’s most expensive wine at auction. Domaine de la Romanée-Conti and Leroy lead.',
      'Many village names were hyphenated with their most famous vineyard to borrow its prestige (Gevrey + Chambertin, Puligny + Montrachet).',
    ],
    timeline: [
      { year: '910', event: 'Abbey of Cluny founded; Benedictine monks begin vineyard work.' },
      { year: '1098', event: 'Cistercians found Cîteaux and later plant Clos de Vougeot.' },
      { year: '1395', event: 'Duke Philip the Bold bans “disloyal” Gamay in favor of Pinot Noir.' },
      { year: '1789', event: 'The Revolution seizes Church vineyards and sells them off in pieces.' },
      { year: '1936', event: 'First AOCs created.' },
      { year: '2015', event: 'Climats inscribed as UNESCO World Heritage.' },
    ],
    producers: ['Domaine de la Romanée-Conti', 'Domaine Leroy', 'Armand Rousseau', 'Comte Liger-Belair', 'Domaine Leflaive', 'Coche-Dury', 'Louis Jadot', 'Joseph Drouhin', 'Raveneau (Chablis)', 'William Fèvre'],
    pairings: ['Red Burgundy with coq au vin or roast duck', 'Boeuf bourguignon', 'Chablis with oysters', 'Meursault with lobster or creamy chicken', 'Époisses cheese'],
    vocab: [
      { term: 'Climat', def: 'A precisely named vineyard plot with its own soil, slope and history.' },
      { term: 'Clos', def: 'A vineyard enclosed by stone walls.' },
      { term: 'Lieu-dit', def: 'A named vineyard that isn’t classified as Premier or Grand Cru.' },
      { term: 'Monopole', def: 'A vineyard with a single owner.' },
      { term: 'Domaine vs. négociant', def: 'Estate-grown vs. merchant-bought grapes or wine.' },
      { term: 'Côte d’Or', def: '“Golden slope”: Côte de Nuits + Côte de Beaune.' },
    ],
    flashcards: [
      { q: 'What two grapes dominate Burgundy?', a: 'Pinot Noir (red) and Chardonnay (white).' },
      { q: 'How is a Grand Cru labeled?', a: 'With only the vineyard name (e.g. “Chambertin”), not the village.' },
      { q: 'What soil defines Chablis?', a: 'Kimmeridgian marl: limestone and clay full of fossilized oyster shells.' },
      { q: 'Which half of the Côte d’Or is famous for reds? For whites?', a: 'Côte de Nuits = reds; Côte de Beaune = great whites (plus Pommard/Volnay reds).' },
      { q: 'Why are Burgundy vineyards so fragmented?', a: 'Church lands were seized in the Revolution, and Napoleonic inheritance law split them among heirs.' },
      { q: 'What is a monopole? Give an example.', a: 'A vineyard owned by one producer, e.g. La Romanée-Conti (DRC).' },
    ],
  },

  // ───────────────────────────── PIEDMONT ─────────────────────────────
  {
    id: 'piedmont',
    title: 'Piedmont',
    date: '2026-11-04',
    country: 'Italy',
    tagline: 'Tar and roses: the home of Barolo and Barbaresco',
    accent: '#8b3a2f',
    intro:
      'Piemonte, “at the foot of the mountains”, is Italy’s northwestern corner, ringed on three sides by the Alps. Its pride is Nebbiolo, a pale, perfumed and ferociously tannic grape that becomes Barolo and Barbaresco. Everyday life runs on juicy Barbera and Dolcetto. In autumn, Alba’s white truffle season brings visitors from around the world.',
    stats: [
      { label: 'DOCGs', value: '19 (most in Italy)' },
      { label: 'Barolo min. aging', value: '38 months' },
      { label: 'Barbaresco min. aging', value: '26 months' },
      { label: 'Signature', value: 'Nebbiolo' },
    ],
    climate:
      'Continental, with cold, foggy winters and hot summers. Autumn fog (“nebbia”, which likely gave Nebbiolo its name) settles in the valleys at harvest. Nebbiolo ripens very late, in October, so it gets the best south-facing slopes.',
    soils:
      'Calcareous marl. In Barolo, the western Tortonian soils (La Morra, Barolo) give more perfumed, approachable wines. The eastern Serravallian sandstone (Serralunga, Monforte) gives more powerful, long-lived ones.',
    map: { center: [44.85, 8.15], zoom: 9 },
    pins: [
      { name: 'La Morra', lat: 44.638, lng: 7.934, kind: 'red', note: 'Western Barolo: aromatic, softer, more approachable. Brunate, Rocche dell’Annunziata.' },
      { name: 'Barolo (village)', lat: 44.61, lng: 7.943, kind: 'red', note: 'Namesake village; the famous Cannubi hill.' },
      { name: 'Castiglione Falletto', lat: 44.623, lng: 7.976, kind: 'red', note: 'Central: a balance of perfume and power.' },
      { name: 'Serralunga d’Alba', lat: 44.61, lng: 8.0, kind: 'red', note: 'Eastern Barolo: the most structured, long-lived wines. Monfortino, Vigna Rionda.' },
      { name: 'Monforte d’Alba', lat: 44.583, lng: 7.968, kind: 'red', note: 'Powerful, dense Barolo. Bussia, Ginestra.' },
      { name: 'Alba', lat: 44.7, lng: 8.035, kind: 'mixed', note: 'Market town; white truffle capital (Oct–Dec).' },
      { name: 'Barbaresco', lat: 44.725, lng: 8.081, kind: 'red', note: 'Barolo’s “queen”: slightly lighter and more elegant. Gaja, Produttori del Barbaresco.' },
      { name: 'Roero', lat: 44.79, lng: 7.96, kind: 'white', note: 'Sandy soils north of the Tanaro river: Arneis (white) and lighter Nebbiolo.' },
      { name: 'Asti', lat: 44.9, lng: 8.207, kind: 'sparkling', note: 'Moscato d’Asti (gently sparkling, sweet, ~5.5% ABV) and Barbera d’Asti.' },
      { name: 'Nizza Monferrato', lat: 44.773, lng: 8.357, kind: 'red', note: 'Nizza DOCG: top-tier Barbera.' },
      { name: 'Gavi', lat: 44.69, lng: 8.807, kind: 'white', note: 'Crisp, citrusy white from the Cortese grape.' },
      { name: 'Gattinara (Alto Piemonte)', lat: 45.62, lng: 8.368, kind: 'red', note: 'Northern Nebbiolo (locally “Spanna”), more alpine and lean.' },
    ],
    zones: [
      { name: 'Langhe', desc: 'Rolling hills around Alba: Barolo, Barbaresco, Dolcetto, Barbera d’Alba.' },
      { name: 'Roero', desc: 'Sandier soils across the Tanaro: Arneis and fragrant Nebbiolo.' },
      { name: 'Monferrato / Asti', desc: 'Barbera d’Asti, Nizza, Moscato d’Asti.' },
      { name: 'Alto Piemonte', desc: 'Gattinara, Ghemme, Boca: cooler, alpine Nebbiolo.' },
    ],
    grapes: [
      { name: 'Nebbiolo', color: 'red', hex: '#7a2a2a', role: 'Barolo & Barbaresco: pale but powerful', profile: { sweetness: 1, acidity: 5, tannin: 5, body: 4, alcohol: 4 }, aromas: ['Rose', 'Tar', 'Sour cherry', 'Licorice', 'Truffle'] },
      { name: 'Barbera', color: 'red', hex: '#4a0c24', role: 'Most planted red; the everyday wine', profile: { sweetness: 1, acidity: 5, tannin: 2, body: 3, alcohol: 4 }, aromas: ['Sour cherry', 'Plum', 'Blackberry'] },
      { name: 'Dolcetto', color: 'red', hex: '#3e0a2a', role: '“Little sweet one” (but dry), drunk young', profile: { sweetness: 1, acidity: 2, tannin: 3, body: 3, alcohol: 3 }, aromas: ['Black cherry', 'Almond', 'Licorice'] },
      { name: 'Moscato Bianco', color: 'white', hex: '#f1e3a0', role: 'Moscato d’Asti: frothy and sweet', profile: { sweetness: 4, acidity: 3, tannin: 1, body: 1, alcohol: 1 }, aromas: ['Peach', 'Orange blossom', 'Grape', 'Sage'] },
      { name: 'Arneis', color: 'white', hex: '#eedf98', role: 'Roero’s white', profile: { sweetness: 1, acidity: 2, tannin: 1, body: 3, alcohol: 3 }, aromas: ['Pear', 'Almond', 'Chamomile'] },
      { name: 'Cortese', color: 'white', hex: '#f2eab8', role: 'Gavi', profile: { sweetness: 1, acidity: 4, tannin: 1, body: 2, alcohol: 2 }, aromas: ['Lime', 'Green apple', 'Almond'] },
    ],
    classification: {
      title: 'Italy’s DOC system',
      levels: [
        { name: 'DOCG', desc: 'Denominazione di Origine Controllata e Garantita: the strictest tier, tasted and guaranteed. Barolo and Barbaresco were among Italy’s first DOCGs (1980).' },
        { name: 'DOC', desc: 'Controlled origin: Langhe Nebbiolo, Barbera d’Alba, Dolcetto d’Alba.' },
        { name: 'IGT / IGP', desc: 'Regional wine with more freedom (rare in Piedmont).' },
        { name: 'MGA', desc: 'Menzioni Geografiche Aggiuntive: official vineyard names (crus) in Barolo and Barbaresco, e.g. Cannubi, Brunate, Asili, Rabajà.' },
        { name: 'Barolo aging', desc: 'At least 38 months (18 in wood); Riserva at least 62 months.' },
        { name: 'Barbaresco aging', desc: 'At least 26 months (9 in wood); Riserva at least 50 months.' },
      ],
    },
    keyFacts: [
      'Nebbiolo is a paradox: pale garnet in color, yet with some of the highest tannin and acidity of any grape. Don’t judge it by color.',
      'The “Barolo Wars” (1980s–90s): Traditionalists (Bartolo Mascarello, Giacomo Conterno) used long macerations and big old botti casks. Modernists (Elio Altare and the “Barolo Boys”) used short macerations and new French barriques.',
      'Barolo was once sweet. In the 19th century, with help from French oenologist Louis Oudart, it became the dry wine we know, favored by the House of Savoy: “the wine of kings, the king of wines.”',
      'Angelo Gaja revolutionized Barbaresco from the 1960s with single-vineyard wines and global prices.',
      'Produttori del Barbaresco is one of the world’s most respected cooperatives, and a great value.',
      'The Langhe-Roero and Monferrato vineyard landscapes became a UNESCO site in 2014.',
    ],
    timeline: [
      { year: '1268', event: 'First written record of Nebbiolo (“nibiol”) near Turin.' },
      { year: '1800s', event: 'Barolo becomes dry under the Marchesa Falletti and Cavour.' },
      { year: '1958', event: 'Produttori del Barbaresco founded.' },
      { year: '1980', event: 'Barolo and Barbaresco among Italy’s first DOCGs.' },
      { year: '2010', event: 'MGA crus officially mapped.' },
    ],
    producers: ['Giacomo Conterno', 'Bartolo Mascarello', 'Giuseppe Rinaldi', 'Bruno Giacosa', 'Gaja', 'Produttori del Barbaresco', 'Vietti', 'Elio Altare', 'G.D. Vajra', 'Braida (Barbera)'],
    pairings: ['Barolo with white truffle tajarin or brasato al Barolo', 'Barbera with pizza and tomato dishes (acid meets acid)', 'Dolcetto with salumi', 'Moscato d’Asti with fruit tarts'],
    vocab: [
      { term: 'Botte (pl. botti)', def: 'A large, old, neutral oak cask, the traditionalist’s choice.' },
      { term: 'Barrique', def: 'A small (225 L) new French oak barrel, the modernist’s choice.' },
      { term: 'Bricco', def: 'The top of a hill, often the best-exposed vineyard.' },
      { term: 'Sorì', def: 'A south-facing slope (best sun).' },
      { term: 'Frizzante', def: 'Lightly sparkling (Moscato d’Asti) vs. spumante (fully sparkling).' },
    ],
    flashcards: [
      { q: 'What grape makes Barolo and Barbaresco?', a: '100% Nebbiolo.' },
      { q: 'What are Nebbiolo’s classic aromas?', a: '“Tar and roses”, plus sour cherry, licorice and truffle.' },
      { q: 'Minimum aging for Barolo vs. Barbaresco?', a: 'Barolo 38 months (18 in wood); Barbaresco 26 months (9 in wood).' },
      { q: 'What were the “Barolo Wars”?', a: 'Traditionalists (long maceration, big old botti) vs. modernists (short maceration, new barriques).' },
      { q: 'Which Barolo communes give the most structured wines?', a: 'Serralunga d’Alba and Monforte d’Alba (eastern, Serravallian soils).' },
      { q: 'Barbera vs. Dolcetto structure?', a: 'Barbera: high acid, low tannin. Dolcetto: low acid, moderate grippy tannin.' },
    ],
  },

  // ───────────────────────────── LOIRE ─────────────────────────────
  {
    id: 'loire',
    title: 'Loire Valley',
    date: '2026-11-11',
    country: 'France',
    tagline: 'France’s garden: crisp whites, châteaux and Cabernet Franc',
    accent: '#5b7a3a',
    intro:
      'The Loire is France’s longest river at about 1,000 km, with vineyards stretching from the Atlantic at Nantes to the center of France. Known as the “Garden of France” and the “Valley of the Kings” for its Renaissance châteaux, it makes every style of wine: bone-dry to lusciously sweet, still and sparkling. Its hallmark is bright acidity.',
    stats: [
      { label: 'River length', value: '~1,000 km' },
      { label: 'Main whites', value: 'Chenin · Sauvignon · Melon' },
      { label: 'Main red', value: 'Cabernet Franc' },
      { label: 'Signature', value: 'High acidity, every style' },
    ],
    climate:
      'Cool. Maritime in the west near the Atlantic (Muscadet), becoming continental in the east (Sancerre). Grapes struggle to ripen in cool years, which gives the region its trademark freshness.',
    soils:
      'Varied. Granite and schist near Nantes; tuffeau (soft, chalky limestone, also used to build the châteaux and carved into cellars) in Anjou-Saumur-Touraine. In Sancerre, Kimmeridgian marl (“terres blanches”), limestone (“caillottes”) and flint (“silex”).',
    map: { center: [47.3, 0.7], zoom: 7 },
    pins: [
      { name: 'Muscadet Sèvre et Maine', lat: 47.16, lng: -1.27, kind: 'white', note: 'Melon de Bourgogne aged “sur lie”: lean, saline and made for oysters.' },
      { name: 'Savennières', lat: 47.38, lng: -0.66, kind: 'white', note: 'Intense, age-worthy dry Chenin. Coulée de Serrant (Nicolas Joly, a biodynamic pioneer).' },
      { name: 'Coteaux du Layon', lat: 47.29, lng: -0.57, kind: 'sweet', note: 'Botrytized sweet Chenin. Quarts de Chaume and Bonnezeaux are the grands crus.' },
      { name: 'Saumur', lat: 47.26, lng: -0.08, kind: 'mixed', note: 'Saumur-Champigny Cab Franc and Saumur Brut sparkling, aged in tuffeau caves.' },
      { name: 'Chinon', lat: 47.167, lng: 0.24, kind: 'red', note: 'Cabernet Franc: raspberry, violet and pencil lead. Rabelais’ hometown.' },
      { name: 'Bourgueil', lat: 47.28, lng: 0.17, kind: 'red', note: 'Firmer, more tannic Cab Franc.' },
      { name: 'Vouvray', lat: 47.41, lng: 0.8, kind: 'mixed', note: 'Chenin in every style: sec, demi-sec, moelleux (sweet) and pétillant/mousseux.' },
      { name: 'Montlouis-sur-Loire', lat: 47.39, lng: 0.83, kind: 'white', note: 'Vouvray’s neighbor across the river; great-value Chenin.' },
      { name: 'Sancerre', lat: 47.33, lng: 2.84, kind: 'white', note: 'The benchmark Sauvignon Blanc: citrus, chalk and gunflint. Also Pinot Noir rouge and rosé.' },
      { name: 'Pouilly-Fumé', lat: 47.28, lng: 2.95, kind: 'white', note: 'Sancerre’s twin across the river; smoky, flinty Sauvignon (Dagueneau, Ladoucette).' },
      { name: 'Menetou-Salon', lat: 47.23, lng: 2.49, kind: 'white', note: 'Sancerre-style Sauvignon at a gentler price.' },
    ],
    zones: [
      { name: 'Pays Nantais', desc: 'Atlantic coast: Muscadet (Melon de Bourgogne).' },
      { name: 'Anjou-Saumur', desc: 'Chenin Blanc (dry to sweet), Cab Franc, rosé, sparkling.' },
      { name: 'Touraine', desc: 'Vouvray & Montlouis Chenin; Chinon & Bourgueil Cab Franc.' },
      { name: 'Centre-Loire', desc: 'Sancerre, Pouilly-Fumé: Sauvignon Blanc.' },
    ],
    grapes: [
      { name: 'Chenin Blanc', color: 'white', hex: '#e8cf6e', role: 'The Loire’s chameleon, from dry to sweet to sparkling', profile: { sweetness: 2, acidity: 5, tannin: 1, body: 3, alcohol: 3 }, aromas: ['Quince', 'Baked apple', 'Honey', 'Chamomile', 'Wet wool (lanolin)'] },
      { name: 'Sauvignon Blanc', color: 'white', hex: '#efe6a6', role: 'Sancerre & Pouilly-Fumé', profile: { sweetness: 1, acidity: 5, tannin: 1, body: 2, alcohol: 3 }, aromas: ['Grapefruit', 'Gooseberry', 'Cut grass', 'Gunflint', 'Chalk'] },
      { name: 'Melon de Bourgogne', color: 'white', hex: '#f3edc4', role: 'Muscadet', profile: { sweetness: 1, acidity: 4, tannin: 1, body: 1, alcohol: 2 }, aromas: ['Lemon', 'Green apple', 'Sea spray', 'Yeast (sur lie)'] },
      { name: 'Cabernet Franc', color: 'red', hex: '#6a1830', role: 'Chinon, Bourgueil, Saumur-Champigny', profile: { sweetness: 1, acidity: 4, tannin: 3, body: 2, alcohol: 2 }, aromas: ['Raspberry', 'Violet', 'Green bell pepper', 'Graphite'] },
      { name: 'Pinot Noir', color: 'red', hex: '#a03246', role: 'Red & rosé Sancerre', profile: { sweetness: 1, acidity: 4, tannin: 2, body: 2, alcohol: 2 }, aromas: ['Red cherry', 'Strawberry', 'Earth'] },
    ],
    classification: {
      title: 'Reading a Loire label',
      levels: [
        { name: 'AOC by place', desc: 'Most labels name the place, not the grape. Learn the grape behind each: Sancerre = Sauvignon; Vouvray = Chenin; Chinon = Cab Franc; Muscadet = Melon.' },
        { name: 'Sweetness terms', desc: 'Sec (dry) → Tendre / Demi-Sec (off-dry) → Moelleux (sweet) → Liquoreux (very sweet, botrytis).' },
        { name: 'Sur lie', desc: 'Muscadet aged on its dead yeast cells over winter, adding texture and a slight spritz.' },
        { name: 'Crémant de Loire', desc: 'Traditional-method sparkling (same method as Champagne). The Loire is France’s second-largest sparkling producer.' },
      ],
    },
    keyFacts: [
      'The Loire is the most diverse wine region in France, making red, white, rosé, sparkling, dry and sweet wine.',
      'Sancerre made Sauvignon Blanc famous before New Zealand did. Loire style is more mineral and restrained; Marlborough’s is more tropical and pungent.',
      'Chenin Blanc can age for decades thanks to its piercing acidity. Old sweet Vouvray and Coteaux du Layon from the early 1900s can still be alive.',
      'Tuffeau limestone was quarried to build the châteaux. The caves left behind now store wine and grow mushrooms.',
      'The Loire is a center of natural and biodynamic winemaking (Nicolas Joly, Clos Rougeard, Thierry Puzelat).',
      'The Loire Valley between Sully-sur-Loire and Chalonnes is a UNESCO World Heritage Site (2000).',
    ],
    timeline: [
      { year: '5th c.', event: 'Monks establish vineyards along the river.' },
      { year: '1500s', event: 'French kings build Chambord, Chenonceau and the Renaissance châteaux.' },
      { year: '1936', event: 'Early AOCs, including Vouvray and Sancerre.' },
      { year: '1980s', event: 'Nicolas Joly converts Coulée de Serrant to biodynamics.' },
      { year: '2000', event: 'Central Loire becomes UNESCO World Heritage.' },
    ],
    producers: ['Domaine Huet (Vouvray)', 'Clos Rougeard', 'Didier Dagueneau', 'Domaine Vacheron', 'François Cotat', 'Nicolas Joly', 'Domaine de la Pépière (Muscadet)', 'Bernard Baudry (Chinon)', 'Charles Joguet', 'Domaine des Baumard'],
    pairings: ['Muscadet with oysters', 'Sancerre with goat cheese (Crottin de Chavignol)', 'Chinon with pork rillettes or roast chicken', 'Demi-sec Vouvray with spicy Thai food', 'Sweet Layon with tarte Tatin'],
    vocab: [
      { term: 'Sur lie', def: 'Aged on the lees (dead yeast) for texture and freshness.' },
      { term: 'Tuffeau', def: 'Soft, chalky limestone typical of Anjou-Touraine.' },
      { term: 'Silex', def: 'Flint soil, often linked to a “gunflint” or struck-match smell.' },
      { term: 'Moelleux', def: 'Sweet (literally “marrowy”, meaning soft).' },
      { term: 'Pétillant', def: 'Lightly sparkling, softer than mousseux (fully sparkling).' },
    ],
    flashcards: [
      { q: 'What grape is Sancerre?', a: 'Sauvignon Blanc (white); Pinot Noir for red and rosé.' },
      { q: 'What grape is Muscadet, and what does “sur lie” mean?', a: 'Melon de Bourgogne; aged on its lees for added texture and freshness.' },
      { q: 'Which Loire red grape is in Chinon?', a: 'Cabernet Franc.' },
      { q: 'Name the Loire sweetness terms from dry to sweet.', a: 'Sec → Demi-sec (tendre) → Moelleux → Liquoreux.' },
      { q: 'Why does Chenin Blanc age so well?', a: 'Very high acidity (plus sugar in sweet styles) preserves it.' },
      { q: 'What are the three classic Sancerre soils?', a: 'Terres blanches (Kimmeridgian marl), caillottes (limestone), silex (flint).' },
    ],
  },

  // ───────────────────────────── SPAIN & PORTUGAL ─────────────────────────────
  {
    id: 'iberia',
    title: 'Spain & Portugal',
    date: '2026-11-18',
    country: 'Iberian Peninsula',
    tagline: 'Old vines, oak-aged Tempranillo, Sherry and Port',
    accent: '#b5462e',
    intro:
      'Iberia combines ancient traditions with modern energy. Spain has more land under vine than any country on earth. Its classics are oak-aged Rioja and Ribera del Duero Tempranillo, along with Sherry, a fortified wine full of history. Portugal has 250+ native grapes and the world’s first demarcated wine region, the Douro, home of Port.',
    stats: [
      { label: 'Spain vineyard area', value: '~950,000 ha (#1)' },
      { label: 'Portugal native grapes', value: '250+' },
      { label: 'Douro demarcated', value: '1756' },
      { label: 'Signature', value: 'Tempranillo · Port · Sherry' },
    ],
    climate:
      'Mostly hot and dry, with a high central plateau (the Meseta) that gives cold nights. The Atlantic northwest (Rías Baixas, Vinho Verde) is green, rainy and cool. Mediterranean east (Priorat, Penedès). The Douro is scorching in summer.',
    soils:
      'Chalky albariza (Jerez) holds water through drought. Llicorella slate (Priorat) and schist terraces (Douro) force vines to dig deep. Granite (Rías Baixas, Dão). Clay-limestone (Rioja Alta).',
    map: { center: [40.2, -4.6], zoom: 6 },
    pins: [
      { name: 'Rioja', lat: 42.58, lng: -2.85, kind: 'red', note: 'Spain’s classic: Tempranillo-led, traditionally aged in American oak. López de Heredia, CVNE, La Rioja Alta.' },
      { name: 'Ribera del Duero', lat: 41.62, lng: -4.12, kind: 'red', note: 'High-altitude (~800 m) Tempranillo (Tinto Fino): powerful. Vega Sicilia, Pingus.' },
      { name: 'Toro', lat: 41.52, lng: -5.39, kind: 'red', note: 'Hot, muscular Tinta de Toro (Tempranillo).' },
      { name: 'Rueda', lat: 41.41, lng: -4.96, kind: 'white', note: 'Zesty Verdejo.' },
      { name: 'Priorat', lat: 41.19, lng: 0.78, kind: 'red', note: 'Llicorella slate, old Garnacha & Cariñena. A DOQ (top tier). Álvaro Palacios.' },
      { name: 'Penedès (Cava)', lat: 41.43, lng: 1.79, kind: 'sparkling', note: 'Cava: traditional-method sparkling from Macabeo, Xarel·lo and Parellada.' },
      { name: 'Rías Baixas', lat: 42.51, lng: -8.81, kind: 'white', note: 'Atlantic Galicia: saline, peachy Albariño for seafood.' },
      { name: 'Bierzo', lat: 42.55, lng: -6.6, kind: 'red', note: 'Mencía: fragrant, Pinot-like reds on slate.' },
      { name: 'Jerez (Sherry)', lat: 36.68, lng: -6.13, kind: 'fortified', note: 'Sherry Triangle (Jerez, Sanlúcar, El Puerto): Palomino on albariza chalk.' },
      { name: 'Vinho Verde', lat: 41.95, lng: -8.45, kind: 'white', note: '“Green” = young. Light, spritzy Alvarinho & Loureiro.' },
      { name: 'Porto / Gaia', lat: 41.13, lng: -8.61, kind: 'fortified', note: 'Port lodges in Vila Nova de Gaia age the wine shipped down the Douro.' },
      { name: 'Douro Valley', lat: 41.19, lng: -7.55, kind: 'fortified', note: 'Schist terraces; Port and increasingly great dry reds.' },
      { name: 'Dão', lat: 40.66, lng: -7.91, kind: 'red', note: 'Granite highlands: elegant Touriga Nacional, Encruzado whites.' },
      { name: 'Bairrada', lat: 40.44, lng: -8.43, kind: 'red', note: 'Tannic Baga reds and sparkling.' },
      { name: 'Alentejo', lat: 38.57, lng: -7.91, kind: 'red', note: 'Hot southern plains: ripe reds and cork forests.' },
    ],
    zones: [
      { name: 'Northern Spain', desc: 'Rioja, Ribera del Duero, Toro, Rueda, Navarra.' },
      { name: 'Green Spain', desc: 'Galicia: Rías Baixas (Albariño), Bierzo, Ribeira Sacra.' },
      { name: 'Catalonia', desc: 'Priorat, Penedès, Cava.' },
      { name: 'Andalucía', desc: 'Jerez: Sherry.' },
      { name: 'Portugal', desc: 'Douro (Port), Vinho Verde, Dão, Bairrada, Alentejo, Madeira (Atlantic island).' },
    ],
    grapes: [
      { name: 'Tempranillo', color: 'red', hex: '#5a0f22', role: 'Spain’s noble grape (Tinto Fino / Tinta Roriz)', profile: { sweetness: 1, acidity: 3, tannin: 4, body: 4, alcohol: 4 }, aromas: ['Red cherry', 'Dried fig', 'Leather', 'Tobacco', 'Vanilla & dill (American oak)'] },
      { name: 'Garnacha', color: 'red', hex: '#8a2632', role: 'Priorat, Navarra, Rioja blends', profile: { sweetness: 1, acidity: 2, tannin: 2, body: 4, alcohol: 5 }, aromas: ['Strawberry', 'Raspberry', 'White pepper', 'Dried herbs'] },
      { name: 'Albariño', color: 'white', hex: '#efe3a0', role: 'Rías Baixas / Vinho Verde (Alvarinho)', profile: { sweetness: 1, acidity: 5, tannin: 1, body: 2, alcohol: 3 }, aromas: ['Peach', 'Lemon', 'Sea salt', 'Apricot'] },
      { name: 'Palomino', color: 'white', hex: '#e9d68a', role: 'The base of nearly all Sherry', profile: { sweetness: 1, acidity: 1, tannin: 1, body: 3, alcohol: 5 }, aromas: ['Almond', 'Bread dough (flor)', 'Saline', 'Chamomile'] },
      { name: 'Touriga Nacional', color: 'red', hex: '#2e0618', role: 'Portugal’s flagship: Port & Douro reds', profile: { sweetness: 1, acidity: 3, tannin: 5, body: 5, alcohol: 4 }, aromas: ['Violet', 'Blackberry', 'Bergamot', 'Rockrose'] },
      { name: 'Mencía', color: 'red', hex: '#6a1832', role: 'Bierzo, Ribeira Sacra', profile: { sweetness: 1, acidity: 4, tannin: 3, body: 3, alcohol: 3 }, aromas: ['Red berries', 'Violet', 'Graphite'] },
    ],
    classification: {
      title: 'Aging labels & fortified styles',
      levels: [
        { name: 'Joven / Roble', desc: 'Young, little or no oak.' },
        { name: 'Crianza', desc: 'Rioja: 2 years aging, at least 1 in oak.' },
        { name: 'Reserva', desc: 'Rioja: 3 years, at least 1 in oak.' },
        { name: 'Gran Reserva', desc: 'Rioja: 5 years, at least 2 in oak (made only in good vintages).' },
        { name: 'Sherry: biological', desc: 'Fino & Manzanilla aged under a yeast layer (flor): pale, bone-dry, salty, almondy.' },
        { name: 'Sherry: oxidative', desc: 'Oloroso (no flor; rich, nutty). Amontillado & Palo Cortado start under flor, then age oxidatively. PX is intensely sweet.' },
        { name: 'Port: ruby styles', desc: 'Ruby, Reserve, LBV (Late Bottled Vintage), Vintage Port (only “declared” years, about 3 per decade, aged in bottle).' },
        { name: 'Port: tawny styles', desc: 'Aged in small casks: 10/20/30/40-year Tawny, Colheita (single-vintage tawny). Nutty, caramel, dried fruit.' },
      ],
    },
    keyFacts: [
      'Port is made by adding grape spirit (aguardente) during fermentation. This kills the yeast and leaves natural sugar, giving a sweet wine of about 19–22% ABV. It was developed for British merchants shipping wine by sea.',
      'Sherry uses the solera system, a fractional blending of barrels across ages, so every bottle contains a little very old wine.',
      'The Douro was demarcated by the Marquis of Pombal in 1756, the world’s first legally defined wine region.',
      'Madeira is heated (estufagem) and deliberately oxidized, so it is almost indestructible once opened. Styles from dry to sweet: Sercial, Verdelho, Bual, Malmsey.',
      'Spain’s top tier, DOCa (DOQ in Catalan), has just two members: Rioja (1991) and Priorat (2009). Rioja now also recognizes single vineyards (Viñedo Singular).',
      'Portugal produces about half of the world’s cork, mostly from Alentejo’s cork oak forests.',
      'Traditional Rioja used American oak (vanilla, coconut, dill); modern styles often use French oak.',
    ],
    timeline: [
      { year: '1703', event: 'Methuen Treaty gives Portuguese wine low tariffs in England, and the Port trade booms.' },
      { year: '1756', event: 'Douro demarcated, the world’s first wine region.' },
      { year: '1860s', event: 'Bordeaux merchants fleeing phylloxera bring their methods to Rioja.' },
      { year: '1989', event: 'René Barbier & Álvaro Palacios’ group revives Priorat.' },
      { year: '1991', event: 'Rioja becomes Spain’s first DOCa.' },
    ],
    producers: ['López de Heredia', 'La Rioja Alta', 'CVNE', 'Vega Sicilia', 'Dominio de Pingus', 'Álvaro Palacios', 'Bodegas Tradición / Lustau (Sherry)', 'Taylor’s / Graham’s / Fonseca (Port)', 'Quinta do Noval', 'Niepoort'],
    pairings: ['Rioja Reserva with roast lamb', 'Fino or Manzanilla with jamón, olives & almonds', 'Albariño with octopus (pulpo a la gallega)', 'Vintage Port with Stilton', 'Tawny Port with crème brûlée'],
    vocab: [
      { term: 'Fortified', def: 'Wine with added spirit (Port, Sherry, Madeira).' },
      { term: 'Flor', def: 'A yeast film that protects Fino Sherry from oxygen and adds bready, salty notes.' },
      { term: 'Solera', def: 'A tiered system of barrels for fractional blending across ages.' },
      { term: 'Quinta', def: 'A Portuguese wine estate.' },
      { term: 'Bodega', def: 'A Spanish winery (or wine cellar).' },
      { term: 'Declared vintage', def: 'A Port house announces a Vintage Port only in exceptional years.' },
    ],
    flashcards: [
      { q: 'What makes Port sweet?', a: 'Grape spirit is added mid-fermentation, which stops the yeast and leaves residual sugar.' },
      { q: 'Rioja Crianza vs. Reserva vs. Gran Reserva?', a: '2 yrs (1 oak) · 3 yrs (1 oak) · 5 yrs (2 oak).' },
      { q: 'What is flor and which Sherries use it?', a: 'A yeast layer that blocks oxygen. Used for Fino and Manzanilla (and to start Amontillado).' },
      { q: 'What is Spain’s main red grape and its aliases?', a: 'Tempranillo: Tinto Fino (Ribera), Tinta de Toro, Tinta Roriz/Aragonez (Portugal).' },
      { q: 'Tawny vs. Ruby Port?', a: 'Ruby: youthful, fruity, bottle-aged. Tawny: aged in small casks, giving nutty, caramel and amber color.' },
      { q: 'Which white grape defines Rías Baixas?', a: 'Albariño (Alvarinho in Portugal’s Vinho Verde).' },
    ],
  },

  // ───────────────────────────── RHÔNE ─────────────────────────────
  {
    id: 'rhone',
    title: 'Rhône',
    date: '2026-12-02',
    country: 'France',
    tagline: 'Syrah’s steep north and Grenache’s sunny south',
    accent: '#5a2448',
    intro:
      'The Rhône river runs south from Lyon to the Mediterranean, and its valley is two regions in one. The narrow Northern Rhône has steep granite terraces where Syrah is the only red grape. The broad, sunny Southern Rhône makes about 95% of the wine, mostly Grenache-based blends led by Châteauneuf-du-Pape.',
    stats: [
      { label: 'Volume from the South', value: '~95%' },
      { label: 'CdP grape varieties', value: '13 allowed' },
      { label: 'Côte-Rôtie Viognier', value: 'up to 20%' },
      { label: 'Signature', value: 'Syrah · Grenache (GSM)' },
    ],
    climate:
      'North: continental, with steep slopes facing the sun. South: Mediterranean, hot and dry, with lots of sun. Both are swept by the Mistral, a cold, dry north wind that keeps grapes healthy and has bent the region’s trees.',
    soils:
      'North: granite and schist on terraces so steep they’re worked by hand. South: “galets roulés”, large rounded river stones in Châteauneuf-du-Pape that store daytime heat and release it at night, plus sand, clay and limestone.',
    map: { center: [44.75, 4.85], zoom: 8 },
    pins: [
      { name: 'Côte-Rôtie', lat: 45.49, lng: 4.8, kind: 'red', note: '“Roasted slope.” Syrah co-fermented with a little Viognier. Guigal’s “La-Las.”' },
      { name: 'Condrieu', lat: 45.46, lng: 4.77, kind: 'white', note: 'The home of Viognier: apricot, peach and honeysuckle.' },
      { name: 'Saint-Joseph', lat: 45.19, lng: 4.8, kind: 'red', note: 'Long strip on the west bank; lighter, fragrant Syrah.' },
      { name: 'Hermitage', lat: 45.075, lng: 4.845, kind: 'mixed', note: 'A single granite hill: the north’s most powerful Syrah, plus Marsanne whites. Chave, Chapoutier, Jaboulet.' },
      { name: 'Crozes-Hermitage', lat: 45.13, lng: 4.88, kind: 'red', note: 'The north’s largest appellation; good-value Syrah.' },
      { name: 'Cornas', lat: 44.963, lng: 4.85, kind: 'red', note: '100% Syrah: dark, rustic, powerful.' },
      { name: 'Rasteau & Cairanne', lat: 44.23, lng: 4.98, kind: 'red', note: 'Southern villages promoted to cru status.' },
      { name: 'Gigondas', lat: 44.164, lng: 5.006, kind: 'red', note: 'Grenache-led reds under the jagged Dentelles de Montmirail.' },
      { name: 'Vacqueyras', lat: 44.14, lng: 4.98, kind: 'red', note: 'Gigondas’ neighbor: robust, spicy reds.' },
      { name: 'Beaumes-de-Venise', lat: 44.12, lng: 5.03, kind: 'sweet', note: 'Muscat de Beaumes-de-Venise: a fortified sweet wine (vin doux naturel).' },
      { name: 'Châteauneuf-du-Pape', lat: 44.056, lng: 4.832, kind: 'red', note: 'Galets roulés stones; up to 13 grape varieties. Rayas, Beaucastel, Vieux Télégraphe.' },
      { name: 'Lirac', lat: 44.03, lng: 4.69, kind: 'red', note: 'West-bank value alternative to CdP.' },
      { name: 'Tavel', lat: 43.99, lng: 4.7, kind: 'rose', note: 'The only French AOC for rosé alone: deep, dry and food-friendly.' },
    ],
    zones: [
      { name: 'Northern Rhône', desc: 'Syrah only for reds; Viognier, Marsanne, Roussanne for whites. Steep, small and prestigious.' },
      { name: 'Southern Rhône', desc: 'Grenache-based blends (GSM), crus, plus huge-volume Côtes du Rhône.' },
    ],
    grapes: [
      { name: 'Syrah', color: 'red', hex: '#2c0618', role: 'The only red grape of the North', profile: { sweetness: 1, acidity: 3, tannin: 4, body: 4, alcohol: 3 }, aromas: ['Blackberry', 'Black olive', 'Smoked bacon', 'Black pepper', 'Violet'] },
      { name: 'Grenache', color: 'red', hex: '#8a2a36', role: 'The South’s workhorse and star', profile: { sweetness: 1, acidity: 2, tannin: 2, body: 4, alcohol: 5 }, aromas: ['Strawberry', 'Kirsch', 'Garrigue', 'White pepper'] },
      { name: 'Mourvèdre', color: 'red', hex: '#30081c', role: 'The “M” in GSM: structure', profile: { sweetness: 1, acidity: 3, tannin: 5, body: 4, alcohol: 4 }, aromas: ['Blackberry', 'Leather', 'Game', 'Earth'] },
      { name: 'Viognier', color: 'white', hex: '#e9c862', role: 'Condrieu; a perfume dash in Côte-Rôtie', profile: { sweetness: 1, acidity: 2, tannin: 1, body: 4, alcohol: 4 }, aromas: ['Apricot', 'Peach', 'Honeysuckle', 'Violet'] },
      { name: 'Marsanne / Roussanne', color: 'white', hex: '#e6c66a', role: 'White Hermitage, white CdP', profile: { sweetness: 1, acidity: 2, tannin: 1, body: 4, alcohol: 4 }, aromas: ['Pear', 'Almond', 'Beeswax', 'Herbal tea'] },
    ],
    classification: {
      title: 'The Rhône pyramid',
      levels: [
        { name: 'Crus (17)', desc: 'Named appellations, e.g. Côte-Rôtie, Hermitage, Cornas (North); Châteauneuf-du-Pape, Gigondas, Tavel (South).' },
        { name: 'Côtes du Rhône Villages + village name', desc: 'e.g. CDR Villages Séguret: a step below cru.' },
        { name: 'Côtes du Rhône Villages', desc: '95 villages with stricter rules.' },
        { name: 'Côtes du Rhône', desc: 'The broad base, mostly Grenache blends. Great everyday value.' },
      ],
    },
    keyFacts: [
      'The popes moved to Avignon in the 14th century. Châteauneuf-du-Pape means the “Pope’s new castle.”',
      'Châteauneuf-du-Pape helped give birth to the AOC system: Baron Le Roy of Château Fortia drew up rules for it in 1923, a model for France’s 1935–36 AOC laws.',
      'Côte-Rôtie’s practice of co-fermenting Syrah with white Viognier stabilizes color and adds a floral lift.',
      'GSM = Grenache, Syrah, Mourvèdre, the classic Southern blend copied in Australia and California.',
      'Black pepper in Syrah comes from a real compound, rotundone, also found in peppercorns.',
      'Château Rayas makes Châteauneuf from 100% Grenache, while Château de Beaucastel uses all 13 grapes.',
    ],
    timeline: [
      { year: '600 BC', event: 'Greeks from Massalia (Marseille) bring vines up the river.' },
      { year: '1309', event: 'Papacy moves to Avignon.' },
      { year: '1923', event: 'Baron Le Roy writes Châteauneuf’s production rules.' },
      { year: '1936', event: 'Châteauneuf-du-Pape becomes one of France’s first AOCs.' },
      { year: '1978', event: 'Guigal’s “La-La” single vineyards make Côte-Rôtie a cult wine.' },
    ],
    producers: ['E. Guigal', 'Jean-Louis Chave', 'M. Chapoutier', 'Paul Jaboulet Aîné', 'Auguste Clape (Cornas)', 'Château Rayas', 'Château de Beaucastel', 'Domaine du Vieux Télégraphe', 'Domaine Georges Vernay (Condrieu)', 'Château de Saint Cosme'],
    pairings: ['Northern Syrah with peppered steak or venison', 'Châteauneuf with lamb & Provençal herbs', 'Condrieu with lobster or Thai curry', 'Tavel rosé with bouillabaisse'],
    vocab: [
      { term: 'GSM', def: 'Grenache-Syrah-Mourvèdre blend.' },
      { term: 'Galets roulés', def: 'Smooth river stones that store heat (Châteauneuf).' },
      { term: 'Garrigue', def: 'The scent of wild Mediterranean herbs: thyme, rosemary, lavender.' },
      { term: 'Mistral', def: 'A cold, dry north wind that keeps vines healthy.' },
      { term: 'Co-fermentation', def: 'Fermenting different grapes together (Syrah + Viognier).' },
      { term: 'Vin doux naturel', def: 'A naturally sweet wine fortified during fermentation (Beaumes-de-Venise).' },
    ],
    flashcards: [
      { q: 'What is the only red grape permitted in the Northern Rhône?', a: 'Syrah.' },
      { q: 'What does GSM stand for?', a: 'Grenache, Syrah, Mourvèdre.' },
      { q: 'What white grape is Condrieu?', a: 'Viognier.' },
      { q: 'What are galets roulés?', a: 'Large rounded river stones in Châteauneuf-du-Pape that hold and radiate heat.' },
      { q: 'Which Rhône appellation makes only rosé?', a: 'Tavel.' },
      { q: 'North vs. South: where is most of the wine made?', a: 'The South, about 95% of volume.' },
    ],
  },

  // ───────────────────────────── CHAMPAGNE ─────────────────────────────
  {
    id: 'champagne',
    title: 'Champagne',
    date: '2026-12-09',
    country: 'France',
    tagline: 'Chalk, cold and a second fermentation in the bottle',
    accent: '#b08d3c',
    intro:
      'Only sparkling wine from this region, about 90 miles northeast of Paris, may be called Champagne. Near the northern limit for ripening grapes, the cold climate makes thin, acidic base wines. These are perfect for a second fermentation in the bottle and years of aging on yeast, which gives the toasty, brioche richness and fine bubbles the region is known for.',
    stats: [
      { label: 'Bottles per year', value: '~300 million' },
      { label: 'Vineyard area', value: '~34,000 ha' },
      { label: 'Bottle pressure', value: '~5–6 atm' },
      { label: 'Signature', value: 'Pinot Noir · Meunier · Chardonnay' },
    ],
    climate:
      'Cool continental with maritime influence, at about 49°N. Frost and rain are risks, and grapes struggle to ripen, so blending across vineyards and vintages (using reserve wines) is how houses keep a consistent style.',
    soils:
      'Chalk. It holds water like a sponge in dry spells, drains in wet ones, and reflects light. The Romans dug chalk pits (crayères) that now serve as cold, constant-temperature cellars. Côte des Bar (Aube) has Kimmeridgian marl like Chablis.',
    map: { center: [48.7, 4.05], zoom: 8 },
    pins: [
      { name: 'Reims', lat: 49.258, lng: 4.032, kind: 'sparkling', note: 'Cathedral city where French kings were crowned; home of Veuve Clicquot, Krug, Ruinart, Taittinger.' },
      { name: 'Verzenay', lat: 49.16, lng: 4.15, kind: 'sparkling', note: 'Montagne de Reims Grand Cru: powerful Pinot Noir.' },
      { name: 'Bouzy & Ambonnay', lat: 49.08, lng: 4.16, kind: 'sparkling', note: 'Pinot Noir Grand Crus on the Montagne’s south face; Bouzy also makes still red.' },
      { name: 'Hautvillers', lat: 49.08, lng: 3.94, kind: 'sparkling', note: 'Abbey where Dom Pérignon was cellar master (1668–1715).' },
      { name: 'Aÿ', lat: 49.055, lng: 4.005, kind: 'sparkling', note: 'Historic Pinot Noir Grand Cru; Bollinger.' },
      { name: 'Épernay', lat: 49.04, lng: 3.96, kind: 'sparkling', note: 'Avenue de Champagne: Moët & Chandon, Pol Roger, Perrier-Jouët. Miles of cellars underneath.' },
      { name: 'Cramant & Avize', lat: 48.98, lng: 4.0, kind: 'sparkling', note: 'Côte des Blancs Grand Crus: Chardonnay finesse.' },
      { name: 'Le Mesnil-sur-Oger', lat: 48.945, lng: 4.02, kind: 'sparkling', note: 'The most mineral Chardonnay: Salon, Krug Clos du Mesnil.' },
      { name: 'Côte de Sézanne', lat: 48.72, lng: 3.72, kind: 'sparkling', note: 'Riper Chardonnay south of the Côte des Blancs.' },
      { name: 'Côte des Bar (Aube)', lat: 48.05, lng: 4.37, kind: 'sparkling', note: 'Pinot Noir on Kimmeridgian soils; growers’ hotbed (Les Riceys).' },
    ],
    zones: [
      { name: 'Montagne de Reims', desc: 'Pinot Noir: body and structure.' },
      { name: 'Vallée de la Marne', desc: 'Meunier: fruity, approachable.' },
      { name: 'Côte des Blancs', desc: 'Chardonnay: finesse, citrus, chalk.' },
      { name: 'Côte de Sézanne', desc: 'Chardonnay, riper style.' },
      { name: 'Côte des Bar', desc: 'Far south in the Aube: Pinot Noir.' },
    ],
    grapes: [
      { name: 'Pinot Noir', color: 'red', hex: '#f0d9a8', role: '~38%: body, red fruit, structure', profile: { sweetness: 1, acidity: 5, tannin: 1, body: 3, alcohol: 2 }, aromas: ['Red apple', 'Strawberry', 'Cherry'] },
      { name: 'Meunier', color: 'red', hex: '#f2dfae', role: '~32%: fruity, rounder, ages quicker', profile: { sweetness: 1, acidity: 4, tannin: 1, body: 2, alcohol: 2 }, aromas: ['Red apple', 'Pear', 'Spice'] },
      { name: 'Chardonnay', color: 'white', hex: '#f3e6b4', role: '~30%: finesse, citrus, longevity', profile: { sweetness: 1, acidity: 5, tannin: 1, body: 2, alcohol: 2 }, aromas: ['Lemon', 'Green apple', 'Chalk', 'White flowers'] },
    ],
    classification: {
      title: 'Sweetness levels (dosage)',
      levels: [
        { name: 'Brut Nature / Zero Dosage', desc: '0–3 g/L sugar: bone dry.' },
        { name: 'Extra Brut', desc: '0–6 g/L.' },
        { name: 'Brut', desc: 'Under 12 g/L: the most common style.' },
        { name: 'Extra Dry', desc: '12–17 g/L. Confusingly, sweeter than Brut!' },
        { name: 'Sec', desc: '17–32 g/L.' },
        { name: 'Demi-Sec', desc: '32–50 g/L: a dessert style.' },
        { name: 'Doux', desc: '50+ g/L: rare and sweet.' },
      ],
    },
    keyFacts: [
      'Traditional method: base wine → blend (assemblage) → add sugar & yeast (tirage) → second fermentation in the bottle creates CO₂ → aging on lees → riddling → disgorgement → dosage → cork.',
      'Aging on the dead yeast (autolysis) gives toast, brioche and biscuit notes. The minimum is 15 months for non-vintage and 3 years for vintage, and top houses go far longer.',
      'Dom Pérignon did NOT invent Champagne. He worked to improve still wine and blending. The English documented adding sugar to create sparkle (Christopher Merret, 1662), and their coal-fired glass was strong enough to hold the pressure.',
      'Barbe-Nicole Ponsardin, the Widow (Veuve) Clicquot, took over her husband’s house at 27. She created the riddling table (1816) and the first known vintage Champagne (1810) and blended rosé (1818).',
      'Label codes: NM (négociant-manipulant) = big house buying grapes. RM (récoltant-manipulant) = “grower Champagne” from the estate’s own vines.',
      'Rosé Champagne is unusual in Europe: it may be made by blending red and white wine (rosé d’assemblage).',
      '17 villages are rated Grand Cru and 42 Premier Cru under the old “échelle des crus” price scale.',
    ],
    timeline: [
      { year: '1662', event: 'Christopher Merret describes adding sugar to make wine sparkle (England).' },
      { year: '1668', event: 'Dom Pérignon becomes cellar master at Hautvillers.' },
      { year: '1729', event: 'Ruinart, the first established Champagne house.' },
      { year: '1816', event: 'Veuve Clicquot invents the riddling table.' },
      { year: '1876', event: 'Louis Roederer creates Cristal for Tsar Alexander II.' },
      { year: '1927', event: 'Champagne’s boundaries are legally fixed.' },
      { year: '2015', event: 'Champagne hillsides, houses and cellars become UNESCO World Heritage.' },
    ],
    producers: ['Krug', 'Bollinger', 'Louis Roederer (Cristal)', 'Dom Pérignon (Moët)', 'Veuve Clicquot', 'Pol Roger', 'Salon', 'Billecart-Salmon', 'Jacques Selosse (grower)', 'Egly-Ouriet (grower)'],
    pairings: ['Brut with oysters, caviar or potato chips', 'Blanc de Blancs with sushi', 'Rosé with salmon or strawberries', 'Vintage Champagne with roast chicken', 'Demi-Sec with fruit desserts'],
    vocab: [
      { term: 'Blanc de Blancs', def: '“White from whites”: 100% Chardonnay.' },
      { term: 'Blanc de Noirs', def: '“White from blacks”: Pinot Noir and/or Meunier.' },
      { term: 'NV (non-vintage)', def: 'A blend of years to keep a consistent house style.' },
      { term: 'Dosage', def: 'The sugar added after disgorgement that sets the final sweetness.' },
      { term: 'Remuage (riddling)', def: 'Gradually turning and tilting bottles to move sediment into the neck.' },
      { term: 'Disgorgement', def: 'Freezing the neck and popping out the yeast plug.' },
      { term: 'Prestige cuvée', def: 'A house’s top wine (Dom Pérignon, Cristal, Krug Clos du Mesnil).' },
    ],
    flashcards: [
      { q: 'What three main grapes make Champagne?', a: 'Pinot Noir, Meunier, Chardonnay.' },
      { q: 'Which is sweeter, Brut or Extra Dry?', a: 'Extra Dry (12–17 g/L) is sweeter than Brut (under 12 g/L).' },
      { q: 'Where do Champagne’s bubbles come from?', a: 'A second fermentation in the bottle (tirage adds sugar + yeast), which traps CO₂.' },
      { q: 'What is Blanc de Blancs?', a: '100% Chardonnay Champagne.' },
      { q: 'What does “RM” on a label mean?', a: 'Récoltant-manipulant: a grower who makes Champagne from their own grapes.' },
      { q: 'What creates the brioche/toast flavor?', a: 'Autolysis: aging on dead yeast cells (lees) in the bottle.' },
    ],
  },
];

export const kindColors: Record<WineKind, string> = {
  red: '#7b1e34',
  white: '#d8b64a',
  sweet: '#d98b2b',
  sparkling: '#c9b27a',
  fortified: '#5a2a1a',
  rose: '#e48a9a',
  mixed: '#8a6a7a',
};

export const kindLabels: Record<WineKind, string> = {
  red: 'Red',
  white: 'White',
  sweet: 'Sweet',
  sparkling: 'Sparkling',
  fortified: 'Fortified',
  rose: 'Rosé',
  mixed: 'Red & white',
};
