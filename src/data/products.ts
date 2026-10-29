import { Product } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'lum-01',
    name: 'Hasami Stoneware Tumbler Set',
    tagline: 'Hand-pressed organic clay from Nagasaki Prefecture',
    category: 'Kitchen & Table',
    price: 46.00,
    originalPrice: 52.00,
    rating: 4.9,
    reviewCount: 38,
    description: 'Crafted from a specialized blend of crushed stone and porcelain clay native to Hasami, Japan. Stackable, tactile, and designed for daily tea, pour-over coffee, or cool table water.',
    origin: 'Hasami, Nagasaki, Japan',
    material: 'Natural Porcelain & Crushed Stone Clay',
    dimensions: '3.3" D × 4.1" H (12 oz / 355 ml)',
    inStock: 14,
    badge: 'Bestseller',
    variants: [
      { name: 'Color', options: ['Natural Sand', 'Matte Charcoal', 'Warm Clay'] },
      { name: 'Set Size', options: ['Pair of 2', 'Set of 4'] }
    ],
    visualTheme: {
      background: 'from-[#EFECE6] to-[#DDD7CD]',
      accent: '#9C9283',
      icon: 'mug',
      tagline: 'Stoneware & Stone Clay',
      materialLook: 'Tactile Matte Glaze'
    },
    reviews: [
      {
        id: 'r1',
        author: 'Elena Rostova',
        location: 'Seattle, WA',
        rating: 5,
        date: 'October 12, 2026',
        title: 'The perfect morning ritual vessel',
        comment: 'The weight in the hand is just right. Unassuming, perfectly matte texture that feels warm even before you pour hot tea into it.',
        verified: true
      },
      {
        id: 'r2',
        author: 'Kenji Takahashi',
        location: 'Vancouver, BC',
        rating: 5,
        date: 'September 28, 2026',
        title: 'Stackable engineering genius',
        comment: 'They nest compactly in our open oak shelving and look like miniature sculptures when stacked.',
        verified: true
      }
    ]
  },
  {
    id: 'lum-02',
    name: 'Kinto Slow Glass Teapot',
    tagline: 'Heat-resistant borosilicate with removable brass mesh infuser',
    category: 'Kitchen & Table',
    price: 68.00,
    rating: 4.8,
    reviewCount: 42,
    description: 'Celebrates the beauty of loose leaves unfurling in hot water. Features a heat-retaining borosilicate glass bowl paired with an unlacquered brushed brass lid that patinas gracefully over time.',
    origin: 'Shiga Prefecture, Japan',
    material: 'Borosilicate Glass & Solid Brushed Brass',
    dimensions: '5.2" W × 4.7" H (700 ml capacity)',
    inStock: 8,
    badge: 'Staff Pick',
    variants: [
      { name: 'Hardware', options: ['Brushed Brass', 'Matte Black Steel'] },
      { name: 'Size', options: ['500 ml', '700 ml'] }
    ],
    visualTheme: {
      background: 'from-[#F3ECE1] to-[#E3D7C5]',
      accent: '#BFA054',
      icon: 'teapot',
      tagline: 'Pure Borosilicate & Brass',
      materialLook: 'Transparent Hand-Blown'
    },
    reviews: [
      {
        id: 'r3',
        author: 'Marcus Vance',
        location: 'Portland, OR',
        rating: 5,
        date: 'October 18, 2026',
        title: 'Watching tea brew is meditative',
        comment: 'Extremely clean pour with no drips. The brass lid feels solid and develops a lovely warm patina with daily use.',
        verified: true
      }
    ]
  },
  {
    id: 'lum-03',
    name: 'Hinoki Cypress End-Grain Cutting Board',
    tagline: 'Gentle on Japanese knife edges with natural antibacterial resin',
    category: 'Kitchen & Table',
    price: 84.00,
    rating: 4.9,
    reviewCount: 29,
    description: 'Harvested from sustainably managed Japanese cypress groves in the Kiso Valley. Hinoki wood naturally cushions knife blades, prevents dulling, and gives off a delicate forest aroma when dampened.',
    origin: 'Kiso Valley, Nagano, Japan',
    material: 'Wild-harvested Japanese Hinoki Cypress',
    dimensions: '16.5" L × 10.2" W × 1.2" Thick',
    inStock: 6,
    badge: 'Artisan Batch',
    variants: [
      { name: 'Size', options: ['Medium (14" × 9")', 'Large (16.5" × 10.2")'] },
      { name: 'Edge Profile', options: ['Minimal Bevel', 'Square Edge'] }
    ],
    visualTheme: {
      background: 'from-[#F5EFE6] to-[#E5DAC8]',
      accent: '#C7A265',
      icon: 'board',
      tagline: 'Sustainable Kiso Cypress',
      materialLook: 'Silky Fine Woodgrain'
    },
    reviews: [
      {
        id: 'r4',
        author: 'Chef David Lin',
        location: 'San Francisco, CA',
        rating: 5,
        date: 'October 02, 2026',
        title: 'Protects high-carbon steel knives',
        comment: 'As someone who sharpens on whetstones, this board keeps my gyuto blade razor sharp for twice as long between sessions.',
        verified: true
      }
    ]
  },
  {
    id: 'lum-04',
    name: 'Waffle-Weave French Flax Throw',
    tagline: 'Pre-washed Normandy flax with deep honeycomb texture',
    category: 'Living & Decor',
    price: 125.00,
    originalPrice: 145.00,
    rating: 4.9,
    reviewCount: 51,
    description: 'Woven from 100% long-staple French flax linen and stone-washed for immediate relaxed drape. The dimensional honeycomb weave breathes comfortably across all four seasons.',
    origin: 'Normandy, France & Porto, Portugal',
    material: '100% Certified European Flax Linen',
    dimensions: '55" × 78" (140 cm × 200 cm)',
    inStock: 12,
    badge: 'Bestseller',
    variants: [
      { name: 'Tone', options: ['Natural Flax', 'Warm Terracotta', 'Muted Olive', 'Smoky Slate'] },
      { name: 'Weave', options: ['Honeycomb Waffle', 'Relaxed Herringbone'] }
    ],
    visualTheme: {
      background: 'from-[#F6F1EA] to-[#E7DDD0]',
      accent: '#B08E77',
      icon: 'blanket',
      tagline: 'Stone-Washed Normandy Flax',
      materialLook: 'Textured Dimensional Waffle'
    },
    reviews: [
      {
        id: 'r5',
        author: 'Claire Delacroix',
        location: 'Austin, TX',
        rating: 5,
        date: 'October 15, 2026',
        title: 'Airy, substantial, and gets softer each wash',
        comment: 'Linen has a cooling weight in the summer and traps cozy warm air in the autumn. The drape on the sofa is effortlessly chic.',
        verified: true
      }
    ]
  },
  {
    id: 'lum-05',
    name: 'Dune Wool & Feather Floor Cushion',
    tagline: 'New Zealand felted wool filled with recycled feather down',
    category: 'Living & Decor',
    price: 74.00,
    rating: 4.7,
    reviewCount: 22,
    description: 'Designed for low-slung living, morning meditation, or lounging by low coffee tables. Upholstered in undyed woven wool with a durable concealed brass zipper.',
    origin: 'Christchurch, New Zealand',
    material: 'Unbleached Organic Wool & Recycled Down',
    dimensions: '20" × 20" × 5" Gusset',
    inStock: 9,
    variants: [
      { name: 'Colorway', options: ['Sandstone', 'Oatmeal Tweed', 'Umber Brown'] }
    ],
    visualTheme: {
      background: 'from-[#F4EFEA] to-[#E2D8CF]',
      accent: '#A58B79',
      icon: 'cushion',
      tagline: 'Undyed New Zealand Wool',
      materialLook: 'Tactile Woven Bouclé'
    },
    reviews: [
      {
        id: 'r6',
        author: 'Soren Lind',
        location: 'Minneapolis, MN',
        rating: 5,
        date: 'September 19, 2026',
        title: 'Makes sitting on the floor a pleasure',
        comment: 'Firm yet forgiving. Beautiful organic texture that looks right at home next to our teak furniture.',
        verified: true
      }
    ]
  },
  {
    id: 'lum-06',
    name: 'Mori Stoneware Vessel Vase',
    tagline: 'Unglazed exterior with waterproof interior satin slip',
    category: 'Living & Decor',
    price: 58.00,
    rating: 4.8,
    reviewCount: 31,
    description: 'An asymmetrical sculptural vessel inspired by ancient earthenware jugs. Left raw and unglazed on the exterior to showcase the natural iron flecks within the native clay.',
    origin: 'Shigaraki, Shiga, Japan',
    material: 'Coarse Grain Shigaraki Clay',
    dimensions: '6.5" D × 8.2" H',
    inStock: 5,
    badge: 'Low Stock',
    variants: [
      { name: 'Form', options: ['Bulbous Silhouette', 'Tall Fluted Cylinder'] },
      { name: 'Clay Finish', options: ['Iron-Spotted Sand', 'Smoke Reduced Charcoal'] }
    ],
    visualTheme: {
      background: 'from-[#EDE7DC] to-[#DAD0C0]',
      accent: '#8B7B6B',
      icon: 'vase',
      tagline: 'Raw Iron-Flecked Stoneware',
      materialLook: 'Unglazed Organic Texture'
    },
    reviews: [
      {
        id: 'r7',
        author: 'Amara Okafor',
        location: 'Chicago, IL',
        rating: 5,
        date: 'October 11, 2026',
        title: 'Works even with a single dried branch',
        comment: 'A true centerpiece. You do not even need flowers—a single branch of eucalyptus or olive looks like a museum installation.',
        verified: true
      }
    ]
  },
  {
    id: 'lum-07',
    name: 'Atlas Brushed Brass Dome Desk Lamp',
    tagline: 'Spun brass shade with 3-step warm touch dimmer',
    category: 'Lighting',
    price: 155.00,
    originalPrice: 175.00,
    rating: 5.0,
    reviewCount: 47,
    description: 'A monolithic statement for reading nooks or desks. Heavy solid cast base provides balanced anchoring, while the spun brass reflector directs 2700K warm diffused light downward without glare.',
    origin: 'Copenhagen, Denmark',
    material: 'Spun Solid Brass & Matte Walnut Stem',
    dimensions: '11.8" Shade Diameter × 14.5" Height',
    inStock: 7,
    badge: 'Editor Pick',
    variants: [
      { name: 'Finish', options: ['Brushed Raw Brass', 'Oxidized Gunmetal', 'Cream Enamel'] }
    ],
    visualTheme: {
      background: 'from-[#F7F2E7] to-[#E9DFCE]',
      accent: '#D4AF37',
      icon: 'lamp',
      tagline: 'Spun Brass & Walnut',
      materialLook: 'Hand-Finished Satin Brass'
    },
    reviews: [
      {
        id: 'r8',
        author: 'Julian Thorne',
        location: 'Brooklyn, NY',
        rating: 5,
        date: 'October 21, 2026',
        title: 'Illuminates with museum-level warmth',
        comment: 'The touch dimming on the brass base is buttery smooth. At 25% brightness it creates the coziest evening sanctuary.',
        verified: true
      }
    ]
  },
  {
    id: 'lum-08',
    name: 'Komorebi Pleated Linen Pendant',
    tagline: 'Hand-folded Belgian linen shade with natural cord wrap',
    category: 'Lighting',
    price: 110.00,
    rating: 4.8,
    reviewCount: 19,
    description: 'Diffuses light like sunlight filtering through tree leaves (komorebi). Hand-pleated natural flax shade suspended on an 8-foot braided jute electrical cord with brass ceiling canopy.',
    origin: 'Bruges, Belgium',
    material: 'Natural Belgian Linen & Braided Jute Cable',
    dimensions: '15.5" Diameter × 10.5" Height',
    inStock: 11,
    variants: [
      { name: 'Diameter', options: ['12" Compact', '15.5" Medium', '18.5" Statement'] },
      { name: 'Cord Color', options: ['Natural Jute', 'Charcoal Thread'] }
    ],
    visualTheme: {
      background: 'from-[#FAF4EC] to-[#EAE0D1]',
      accent: '#C29B7F',
      icon: 'pendant',
      tagline: 'Hand-Pleated Flax Diffuser',
      materialLook: 'Translucent Woven Texture'
    },
    reviews: [
      {
        id: 'r9',
        author: 'Nora Halvorsen',
        location: 'Boulder, CO',
        rating: 5,
        date: 'September 30, 2026',
        title: 'Completely transformed our dining table',
        comment: 'Soft, organic glow that eliminates all overhead harshness. The craftsmanship in the folds is breathtaking.',
        verified: true
      }
    ]
  },
  {
    id: 'lum-09',
    name: 'Kyoto Cypress & Hinoki Aromatherapy Diffuser',
    tagline: 'Cold-pressed wild cypress, vetiver, and smoky cedarwood',
    category: 'Care & Wellness',
    price: 48.00,
    rating: 4.9,
    reviewCount: 64,
    description: 'Hand-blended in small seasonal batches using wild-foraged Japanese cypress needle oil, smoky Atlas cedar, and grounding Haitian vetiver. Packaged in recyclable heavy amber glass with 8 natural rattan reeds.',
    origin: 'Kyoto & Grasse, France',
    material: 'Pharmaceutical Amber Glass & Rattan Reeds',
    dimensions: '200 ml (lasts 3–4 months continuous)',
    inStock: 18,
    badge: 'Bestseller',
    variants: [
      { name: 'Aroma Profile', options: ['Hinoki & Wild Moss', 'Smoked Fig & Cardamom', 'Neroli & White Amber'] }
    ],
    visualTheme: {
      background: 'from-[#F3ECE4] to-[#E4D7CA]',
      accent: '#9A5B32',
      icon: 'diffuser',
      tagline: 'Wild Foraged Botanical Botanics',
      materialLook: 'Apothecary Amber Glass'
    },
    reviews: [
      {
        id: 'r10',
        author: 'Dr. Evelyn Reed',
        location: 'Boston, MA',
        rating: 5,
        date: 'October 16, 2026',
        title: 'Feels like entering a misty temple in Kyoto',
        comment: 'Never synthetic or overwhelming. Subtle, woody, and universally calming whenever guests step into our entryway.',
        verified: true
      }
    ]
  },
  {
    id: 'lum-10',
    name: 'Santal & Beeswax Ceramic Candle',
    tagline: 'Hand-poured beeswax with cracked wooden wick',
    category: 'Care & Wellness',
    price: 38.00,
    rating: 4.8,
    reviewCount: 39,
    description: 'Clean-burning 100% organic beeswax and coconut wax in a reusable handcrafted stoneware cup. Features an FSC-certified wood wick that creates a gentle, soothing fireside crackle.',
    origin: 'Asheville, NC, USA',
    material: 'Natural Beeswax, Coconut Oil & Reusable Clay Cup',
    dimensions: '8.5 oz / 55 Hour Burn Time',
    inStock: 15,
    badge: 'New Arrival',
    variants: [
      { name: 'Clay Cup Glaze', options: ['Speckled Chalk', 'Toasted Dune', 'Matte Basalt'] }
    ],
    visualTheme: {
      background: 'from-[#F7EFE6] to-[#E7DCCE]',
      accent: '#A6734B',
      icon: 'candle',
      tagline: 'Clean Beeswax & Wood Wick',
      materialLook: 'Hand-Poured Ceramic'
    },
    reviews: [
      {
        id: 'r11',
        author: 'Hannah Bennett',
        location: 'Providence, RI',
        rating: 5,
        date: 'October 22, 2026',
        title: 'Reused the ceramic jar as an espresso cup!',
        comment: 'Burns clean down to the very base with zero tunneling. When finished, a wash with warm soap gave me my favorite new cortado cup.',
        verified: true
      }
    ]
  },
  {
    id: 'lum-11',
    name: 'Nordic Botanical Hand & Body Salve',
    tagline: 'Cold-pressed cloudberry seed, shea butter, and sea buckthorn',
    category: 'Care & Wellness',
    price: 32.00,
    rating: 4.9,
    reviewCount: 28,
    description: 'A restorative barrier balm formulated for dry climates and frequent handwashing. Rich in omega fatty acids, wild Arctic cloudberry, and nourishing calendula with zero greasy residue.',
    origin: 'Gothenburg, Sweden',
    material: 'Aluminum recyclable squeeze tube with key turner',
    dimensions: '75 ml / 2.5 fl oz',
    inStock: 25,
    variants: [
      { name: 'Scent', options: ['Birch Bark & Bergamot', 'Unscented Pure Botanicals'] }
    ],
    visualTheme: {
      background: 'from-[#F0ECE6] to-[#DDD7CF]',
      accent: '#6E7764',
      icon: 'bottle',
      tagline: 'Cold-Pressed Wild Arctic Flora',
      materialLook: 'Brushed Recyclable Aluminum'
    },
    reviews: [
      {
        id: 'r12',
        author: 'Lars Olofsson',
        location: 'Stockholm, Sweden',
        rating: 5,
        date: 'October 08, 2026',
        title: 'Saves hands during harsh winters',
        comment: 'Absorbs within seconds and leaves skin feeling conditioned rather than sticky. The birch scent is pure and uplifting.',
        verified: true
      }
    ]
  },
  {
    id: 'lum-12',
    name: 'Solid Walnut Desktop Valet Tray',
    tagline: 'CNC-milled from sustainably harvested Appalachian walnut',
    category: 'Stationery & Desk',
    price: 64.00,
    rating: 4.9,
    reviewCount: 35,
    description: 'Carved from a single timber billet with soft sculpted compartments for daily fountain pens, spectacles, keys, and pocket sundries. Finished with natural organic walnut oil and cork footings.',
    origin: 'Appalachian Highlands, Virginia, USA',
    material: 'Solid American Black Walnut & Natural Cork',
    dimensions: '11.5" L × 7.5" W × 0.9" H',
    inStock: 9,
    badge: 'Artisan Batch',
    variants: [
      { name: 'Timber Choice', options: ['American Walnut', 'White Hard Maple', 'Quarter-Sawn White Oak'] }
    ],
    visualTheme: {
      background: 'from-[#F1ECE4] to-[#DDD2C2]',
      accent: '#664E3D',
      icon: 'tray',
      tagline: 'Single-Billet Appalachian Timber',
      materialLook: 'Deep Satin Grain'
    },
    reviews: [
      {
        id: 'r13',
        author: 'Jonathan Gray',
        location: 'Toronto, ON',
        rating: 5,
        date: 'October 17, 2026',
        title: 'Brings calm to an otherwise busy desk',
        comment: 'The curves inside the pen channel make retrieving stationery effortless. Beautiful depth in the dark walnut grain.',
        verified: true
      }
    ]
  },
  {
    id: 'lum-13',
    name: 'Solid Brass Weightless Rollerball',
    tagline: 'Precision-machined balanced brass with Schmidt refill',
    category: 'Stationery & Desk',
    price: 48.00,
    rating: 4.8,
    reviewCount: 44,
    description: 'Machined from solid naval brass rod stock with micrometric tolerance. Features a balanced center of gravity that glides over paper with effortless capillary ink transfer.',
    origin: 'Kobe, Japan',
    material: 'Solid Raw Brass with Schmidt Safety Ceramic 888 Rollerball',
    dimensions: '5.4" Length × 0.42" Diameter (48 grams)',
    inStock: 16,
    badge: 'Bestseller',
    variants: [
      { name: 'Finish', options: ['Raw Machined Brass', 'Stonewashed Gunmetal', 'Matte Olive PVD'] },
      { name: 'Ink Nib', options: ['Fine (0.5 mm)', 'Medium (0.7 mm)'] }
    ],
    visualTheme: {
      background: 'from-[#F6F1E5] to-[#E9DEC8]',
      accent: '#B89B48',
      icon: 'pen',
      tagline: 'Naval Brass Micrometric Lathe',
      materialLook: 'Weighted Precision Metallic'
    },
    reviews: [
      {
        id: 'r14',
        author: 'Maya Lin',
        location: 'Philadelphia, PA',
        rating: 5,
        date: 'October 14, 2026',
        title: 'A writing instrument for a lifetime',
        comment: 'The balance between thumb and forefinger is perfection. It turns writing daily reflections into an intentional ritual.',
        verified: true
      }
    ]
  },
  {
    id: 'lum-14',
    name: 'Archival Thread-Bound Linen Journal',
    tagline: '120 gsm fountain-pen friendly cotton-blend paper from Milan',
    category: 'Stationery & Desk',
    price: 28.00,
    rating: 4.9,
    reviewCount: 57,
    description: 'Bound by hand using traditional lay-flat Smyth-sewn bookbinding. Filled with 192 pages of creamy, bleed-proof Italian milled acid-free paper, wrapped in bookcloth linen with silk ribbon.',
    origin: 'Milan, Italy',
    material: 'Natural Bookcloth Linen & 120 gsm Italian Cotton Paper',
    dimensions: '5.8" × 8.3" (A5 format, 192 pages)',
    inStock: 30,
    badge: 'Staff Pick',
    variants: [
      { name: 'Cover Cloth', options: ['Earthen Sand', 'Sage Forest', 'Charcoal Slate'] },
      { name: 'Ruling', options: ['Dot Grid (5 mm)', 'Ruled (7 mm)', 'Blank Cartridge'] }
    ],
    visualTheme: {
      background: 'from-[#F3EDE6] to-[#E2D8CF]',
      accent: '#826D5F',
      icon: 'notebook',
      tagline: 'Smyth-Sewn Italian Bookcloth',
      materialLook: 'Fine Weave Book Linen'
    },
    reviews: [
      {
        id: 'r15',
        author: 'Gabriel Santos',
        location: 'San Diego, CA',
        rating: 5,
        date: 'October 05, 2026',
        title: 'Zero bleed-through with wet fountain pens',
        comment: 'I use thick Iroshizuku inks and there is zero feathering or ghosting. The book lies 180 degrees completely flat right from page one.',
        verified: true
      }
    ]
  },
  {
    id: 'lum-15',
    name: 'Hasami Sandstone Rimmed Dinner Plate',
    tagline: 'Modern modular tableware crafted with unglazed matte rim',
    category: 'Kitchen & Table',
    price: 36.00,
    rating: 4.8,
    reviewCount: 33,
    description: 'Engineered with clean architectural lines for stacking and dining. The gentle raised rim frames culinary creations while keeping dressings contained. Dishwasher and microwave safe.',
    origin: 'Hasami, Nagasaki, Japan',
    material: 'Stoneware & High-fired Porcelain Ceramic',
    dimensions: '10.0" Diameter × 1.0" Rim Height',
    inStock: 20,
    badge: 'New Arrival',
    variants: [
      { name: 'Colorway', options: ['Natural Sand', 'Charcoal Basalt', 'Gloss Amber Glaze'] },
      { name: 'Size', options: ['10" Dinner Plate', '7.5" Salad Plate'] }
    ],
    visualTheme: {
      background: 'from-[#F4EFE9] to-[#E5DCD1]',
      accent: '#9A8E7D',
      icon: 'plate',
      tagline: 'Architectural Stacking Ceramic',
      materialLook: 'Dual Glaze Contrast'
    },
    reviews: [
      {
        id: 'r16',
        author: 'Karin Larsson',
        location: 'Stockholm, Sweden',
        rating: 5,
        date: 'October 19, 2026',
        title: 'Elevates even simple weeknight toast',
        comment: 'Minimal, robust, and the matte underside keeps plates sturdy on our oak table. Have replaced all our older tableware with these.',
        verified: true
      }
    ]
  }
];

export const CATEGORIES: { id: string; label: string }[] = [
  { id: 'All', label: 'All Objects' },
  { id: 'Kitchen & Table', label: 'Kitchen & Table' },
  { id: 'Living & Decor', label: 'Living & Decor' },
  { id: 'Care & Wellness', label: 'Care & Wellness' },
  { id: 'Lighting', label: 'Lighting' },
  { id: 'Stationery & Desk', label: 'Stationery & Desk' },
];
