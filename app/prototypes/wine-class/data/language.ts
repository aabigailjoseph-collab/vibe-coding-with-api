// The vocabulary of tasting: structure scales, the aroma wheel and a glossary.

export type Scale = {
  id: 'sweetness' | 'acidity' | 'tannin' | 'body' | 'alcohol' | 'finish';
  name: string;
  question: string;
  where: string; // where you feel it
  levels: string[];
  tip: string;
  examples: { level: number; wine: string }[];
};

export const scales: Scale[] = [
  {
    id: 'sweetness',
    name: 'Sweetness',
    question: 'Is there sugar left in the wine?',
    where: 'Tip of the tongue',
    levels: ['Bone dry', 'Dry', 'Off-dry', 'Medium-sweet', 'Sweet', 'Luscious'],
    tip: '“Dry” means NOT sweet. It has nothing to do with the drying, puckery feeling (that’s tannin). And fruity ≠ sweet: a ripe Napa Cab can smell like jam yet be totally dry.',
    examples: [
      { level: 0, wine: 'Muscadet, Brut Nature Champagne' },
      { level: 1, wine: 'Almost all red wine, Sancerre, Chablis' },
      { level: 2, wine: 'Demi-sec Vouvray, many German Rieslings' },
      { level: 4, wine: 'Moscato d’Asti, Demi-Sec Champagne' },
      { level: 5, wine: 'Sauternes, PX Sherry, Port' },
    ],
  },
  {
    id: 'acidity',
    name: 'Acidity',
    question: 'Does it make your mouth water?',
    where: 'Sides of the tongue; you salivate',
    levels: ['Low', 'Medium−', 'Medium', 'Medium+', 'High'],
    tip: 'Acidity makes a wine taste fresh, crisp and lively. Too little and it’s “flabby.” Cool climates make higher-acid wines. After swallowing, tilt your head down: if you start drooling, acidity is high.',
    examples: [
      { level: 0, wine: 'Viognier, warm-climate Merlot' },
      { level: 2, wine: 'Napa Chardonnay, Grenache' },
      { level: 4, wine: 'Sancerre, Chenin Blanc, Nebbiolo, Champagne' },
    ],
  },
  {
    id: 'tannin',
    name: 'Tannin',
    question: 'Does it dry out your gums?',
    where: 'Gums, cheeks and teeth',
    levels: ['Low', 'Medium−', 'Medium', 'Medium+', 'High'],
    tip: 'Tannins come from grape skins, seeds, stems and oak, so it’s mostly a red-wine thing. Think of over-steeped black tea. Describe the texture too: silky, velvety, fine-grained, grippy, chalky, coarse.',
    examples: [
      { level: 0, wine: 'Beaujolais, most whites' },
      { level: 2, wine: 'Pinot Noir, Merlot, Grenache' },
      { level: 4, wine: 'Cabernet Sauvignon, Nebbiolo, Syrah' },
    ],
  },
  {
    id: 'body',
    name: 'Body',
    question: 'How heavy does it feel?',
    where: 'Whole mouth: weight & texture',
    levels: ['Light', 'Medium−', 'Medium', 'Medium+', 'Full'],
    tip: 'Think skim milk → whole milk → cream. Alcohol, sugar and extract all add body. A light-bodied wine is not a worse wine, just a different weight.',
    examples: [
      { level: 0, wine: 'Muscadet, Moscato d’Asti, Beaujolais' },
      { level: 2, wine: 'Chianti, Sancerre Rouge, Chablis' },
      { level: 4, wine: 'Napa Cab, Châteauneuf, oaked Chardonnay' },
    ],
  },
  {
    id: 'alcohol',
    name: 'Alcohol',
    question: 'Does it feel warm in your throat?',
    where: 'Back of the throat & chest',
    levels: ['Low (<11%)', 'Medium (11–13.5%)', 'High (13.5%+)'],
    tip: 'Riper grapes have more sugar, so the yeast make more alcohol. Hot climates = higher alcohol. If it burns, it’s “hot.” Thick “legs” or “tears” on the glass also hint at alcohol (they are NOT a sign of quality).',
    examples: [
      { level: 0, wine: 'Moscato d’Asti (5.5%), Mosel Riesling' },
      { level: 1, wine: 'Bordeaux, Burgundy, Champagne' },
      { level: 2, wine: 'Zinfandel, Châteauneuf, Amarone, Port (fortified ~20%)' },
    ],
  },
  {
    id: 'finish',
    name: 'Finish',
    question: 'How long does the flavor last after swallowing?',
    where: 'After you swallow',
    levels: ['Short', 'Medium', 'Long'],
    tip: 'Count the seconds the flavor (not the burn) lingers. Under 5 s is short and over 15 s is long. A long finish is one of the clearest signs of quality.',
    examples: [
      { level: 0, wine: 'Simple everyday wine' },
      { level: 2, wine: 'Grand Cru Burgundy, top Barolo, vintage Champagne' },
    ],
  },
];

// Aroma wheel: inner ring = families, outer ring = descriptors.
export type AromaFamily = { name: string; color: string; group: 'Primary' | 'Secondary' | 'Tertiary'; notes: string[] };

export const aromaFamilies: AromaFamily[] = [
  { name: 'Citrus', color: '#e7c94c', group: 'Primary', notes: ['Lemon', 'Lime', 'Grapefruit', 'Orange zest'] },
  { name: 'Orchard', color: '#b9c66a', group: 'Primary', notes: ['Green apple', 'Pear', 'Peach', 'Apricot', 'Quince'] },
  { name: 'Tropical', color: '#e9a64a', group: 'Primary', notes: ['Pineapple', 'Mango', 'Passion fruit', 'Lychee'] },
  { name: 'Red fruit', color: '#c8394a', group: 'Primary', notes: ['Strawberry', 'Raspberry', 'Red cherry', 'Cranberry'] },
  { name: 'Black fruit', color: '#5a1a3a', group: 'Primary', notes: ['Blackberry', 'Blackcurrant', 'Black cherry', 'Plum'] },
  { name: 'Floral', color: '#c98bb0', group: 'Primary', notes: ['Rose', 'Violet', 'Honeysuckle', 'Orange blossom'] },
  { name: 'Herbal', color: '#6e9a5a', group: 'Primary', notes: ['Cut grass', 'Bell pepper', 'Mint', 'Eucalyptus'] },
  { name: 'Spice', color: '#a0582a', group: 'Primary', notes: ['Black pepper', 'Licorice', 'Clove', 'Cinnamon'] },
  { name: 'Oak & lees', color: '#b48a5a', group: 'Secondary', notes: ['Vanilla', 'Toast', 'Butter', 'Brioche', 'Coconut', 'Smoke'] },
  { name: 'Earth', color: '#7c7468', group: 'Tertiary', notes: ['Wet stone', 'Flint', 'Forest floor', 'Mushroom', 'Truffle'] },
  { name: 'Aged', color: '#7a4a2a', group: 'Tertiary', notes: ['Leather', 'Tobacco', 'Dried fig', 'Honey', 'Nuts', 'Petrol'] },
];

export const aromaGroups = [
  { name: 'Primary', from: 'The grape', desc: 'Fruit, flowers, herbs and spice from the variety and its climate.' },
  { name: 'Secondary', from: 'The winemaking', desc: 'Oak (vanilla, toast, clove), malolactic fermentation (butter, cream), lees (bread, brioche).' },
  { name: 'Tertiary', from: 'Time & aging', desc: 'Leather, mushroom, forest floor, tobacco, dried fruit, nuts, honey, petrol.' },
];

export const tastingSteps = [
  { step: 'Look', icon: '◐', text: 'Tilt the glass over white paper. Note color and depth. Whites gain color with age; reds lose it (purple → ruby → garnet → tawny). A watery rim suggests age.' },
  { step: 'Swirl', icon: '↻', text: 'Swirl to add oxygen and release aromas. The “legs” or “tears” show alcohol and sugar, not quality.' },
  { step: 'Smell', icon: '◎', text: 'Take short sniffs. First check it’s clean (no wet cardboard = corked). Then find the fruit, other aromas and intensity.' },
  { step: 'Sip', icon: '◡', text: 'Take a decent sip, pull a little air through it, and coat your whole mouth. Note sweetness, acidity, tannin, alcohol and body.' },
  { step: 'Conclude', icon: '✓', text: 'Is it balanced? How long is the finish? Is it complex? Then guess: grape, region, age. Write it down!' },
];

export const glossary: { term: string; def: string; cat: 'Structure' | 'Flavor' | 'Quality' | 'Faults' | 'Winemaking' }[] = [
  { term: 'Dry', def: 'No perceptible sugar. The opposite of sweet, not of fruity.', cat: 'Structure' },
  { term: 'Off-dry', def: 'Just a touch of sweetness, often balanced by high acidity (e.g. many Rieslings, demi-sec Vouvray).', cat: 'Structure' },
  { term: 'Crisp', def: 'Refreshing, high acidity; usually said of whites.', cat: 'Structure' },
  { term: 'Flabby', def: 'Lacking acidity, so the wine feels dull or heavy.', cat: 'Structure' },
  { term: 'Tannic / Grippy', def: 'Noticeable tannins that dry the gums.', cat: 'Structure' },
  { term: 'Silky / Velvety', def: 'Smooth, fine tannins with a luxurious texture.', cat: 'Structure' },
  { term: 'Structured', def: 'A firm framework of acidity and tannin; often age-worthy.', cat: 'Structure' },
  { term: 'Hot', def: 'Alcohol is too noticeable and burns.', cat: 'Structure' },
  { term: 'Racy', def: 'Lively, vibrant, electric acidity.', cat: 'Structure' },
  { term: 'Fruit-forward', def: 'Fruit is the dominant impression (common in New World wines).', cat: 'Flavor' },
  { term: 'Jammy', def: 'Cooked, very ripe fruit flavors, like jam. Common in warm climates.', cat: 'Flavor' },
  { term: 'Oaky', def: 'Flavors from oak barrels: vanilla, toast, coconut, smoke, clove.', cat: 'Flavor' },
  { term: 'Buttery', def: 'From malolactic fermentation (diacetyl). Classic in California Chardonnay.', cat: 'Flavor' },
  { term: 'Minerality', def: 'Hard to define: wet stone, chalk, flint or saline impressions (Chablis, Sancerre).', cat: 'Flavor' },
  { term: 'Earthy', def: 'Soil, forest floor, mushroom. Common in Old World reds.', cat: 'Flavor' },
  { term: 'Herbaceous / Green', def: 'Grassy or bell-pepper notes (Sauvignon Blanc, Cabernet Franc).', cat: 'Flavor' },
  { term: 'Garrigue', def: 'Wild Mediterranean herbs (Southern Rhône).', cat: 'Flavor' },
  { term: 'Petrol', def: 'A kerosene note in aged Riesling (from the compound TDN). Considered a positive!', cat: 'Flavor' },
  { term: 'Toasty / Brioche', def: 'Bready notes from lees aging (Champagne) or oak.', cat: 'Flavor' },
  { term: 'Balanced', def: 'Fruit, acid, tannin, alcohol and sweetness are in harmony and nothing sticks out.', cat: 'Quality' },
  { term: 'Complex', def: 'Many layers of aroma and flavor that change in the glass.', cat: 'Quality' },
  { term: 'Long finish', def: 'Flavor lingers well after swallowing, a sign of quality.', cat: 'Quality' },
  { term: 'Elegant', def: 'Refined, balanced and not heavy.', cat: 'Quality' },
  { term: 'Opulent', def: 'Rich, lush and generous.', cat: 'Quality' },
  { term: 'Austere / Tight', def: 'Closed, hard and not yet showing much; often young wine that needs time.', cat: 'Quality' },
  { term: 'Typicity', def: 'How well a wine expresses its grape and place.', cat: 'Quality' },
  { term: 'Corked (TCA)', def: 'Smells of wet cardboard or a musty basement. Caused by a contaminated cork.', cat: 'Faults' },
  { term: 'Oxidized', def: 'Flat, bruised apple, sherry-like. Too much oxygen (unless intended, e.g. Sherry).', cat: 'Faults' },
  { term: 'Reduced', def: 'Struck match, rotten egg, rubber. Too little oxygen; often blows off with air.', cat: 'Faults' },
  { term: 'Brett', def: 'Barnyard, band-aid. A yeast (Brettanomyces); a little can add complexity.', cat: 'Faults' },
  { term: 'Volatile acidity (VA)', def: 'Nail-polish or vinegar smell.', cat: 'Faults' },
  { term: 'Terroir', def: 'Everything about a place (soil, climate, slope, tradition) that shapes a wine.', cat: 'Winemaking' },
  { term: 'Vintage', def: 'The year the grapes were harvested.', cat: 'Winemaking' },
  { term: 'Malolactic fermentation', def: 'Converts sharp malic acid to softer lactic acid, adding a creamy, buttery texture.', cat: 'Winemaking' },
  { term: 'Lees', def: 'Dead yeast cells. Aging “sur lie” adds texture and bready flavors.', cat: 'Winemaking' },
  { term: 'Noble rot', def: 'Botrytis cinerea: a fungus that concentrates grapes for sweet wines (Sauternes).', cat: 'Winemaking' },
  { term: 'Phylloxera', def: 'An aphid that destroyed European vineyards in the late 1800s. The fix was grafting onto American rootstock.', cat: 'Winemaking' },
  { term: 'Old vines (Vieilles Vignes)', def: 'Older vines give lower yields and more concentrated fruit. There is no legal definition.', cat: 'Winemaking' },
  { term: 'Cuvée', def: 'A specific blend or batch of wine.', cat: 'Winemaking' },
  { term: 'Fortified', def: 'Spirit added to wine (Port, Sherry, Madeira).', cat: 'Winemaking' },
  { term: 'Decant', def: 'Pour into another vessel to aerate young wine or separate old wine from sediment.', cat: 'Winemaking' },
  { term: 'Old World vs. New World', def: 'Europe (earthier, more acid, place-named) vs. elsewhere (riper, fruitier, grape-named). A useful but fading split.', cat: 'Winemaking' },
];
