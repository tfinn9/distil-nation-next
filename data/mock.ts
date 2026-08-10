import { Episode, Distillery, Article, Review, Event, Host, NavItem } from "@/types";

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Episodes", href: "/episodes/" },
  { label: "Distilleries", href: "/distilleries/" },
  { label: "Learn", href: "/learn/" },
  { label: "Reviews", href: "/reviews/" },
  { label: "Events", href: "/events/" },
  { label: "About", href: "/about/" },
  { label: "Contact", href: "/contact/" },
];

export const episodes: Episode[] = [
  {
    slug: "episode-01",
    episodeNumber: "01",
    title: "Is $400 Whisky the New Normal in NZ? & We Taste Divergence Sloe Finish & Reefton Gold Seeker Rye",
    guest: "Tom, Cameron & Ty",
    summary: "This week on Distil-Nation, we look at what's happening in New Zealand whisky right now — and why the top end has suddenly jumped from $200 to $400. Is this the new normal, or are we pushing past what consumers are willing to pay? We break down the shift toward ultra-premium releases, what's driving it, and whether the value stacks up. Along the way, we taste Reefton Distilling Co. Gold Seeker Rye and Divergence Whisky Sloe Gin Finished Single Malt. Plus, a look ahead to an upcoming usquebaugh release, and a few genuinely great NZ whiskies that still deliver serious value without the $400 price tag.",
    duration: "52 min",
    youtube: "https://www.youtube.com/watch?v=auTXXjNH_fI",
    spotify: "https://open.spotify.com/show/1lmSHlLbIHhpzTrpXxcsvJ",
    spreaker: "https://www.spreaker.com/podcast/distil-nation-nz--5937481",
    thumbnail: "https://img.youtube.com/vi/auTXXjNH_fI/maxresdefault.jpg",
    spiritType: "Whisky",
    region: "New Zealand",
    productsMentioned: ["Reefton Distilling Co. Gold Seeker Rye", "Divergence Whisky Sloe Gin Finished Single Malt"],
  },
  {
    slug: "episode-02",
    episodeNumber: "02",
    title: "Gin Botanicals of the South Island",
    guest: "Morgan & Lee",
    summary: "Exploring the native botanicals that give South Island gin its unmistakable sense of place.",
    duration: "42 min",
    youtube: "https://www.youtube.com/@distilnationnz",
    spotify: "https://open.spotify.com/show/1lmSHlLbIHhpzTrpXxcsvJ",
    spreaker: "https://www.spreaker.com/podcast/distil-nation-nz--5937481",
    thumbnail: "https://placehold.co/800x450/202020/F6F4EF?text=Episode+02",
    spiritType: "Gin",
    region: "Canterbury",
    productsMentioned: ["Wild Botanical Gin", "Lavender & Horopito"],
  },
  {
    slug: "episode-03",
    episodeNumber: "03",
    title: "Rum from the Pacific",
    guest: "Tane Moana",
    summary: "Cane, fermentation, and the South Pacific sun. A deep dive into the rum renaissance in New Zealand.",
    duration: "55 min",
    youtube: "https://www.youtube.com/@distilnationnz",
    spotify: "https://open.spotify.com/show/1lmSHlLbIHhpzTrpXxcsvJ",
    spreaker: "https://www.spreaker.com/podcast/distil-nation-nz--5937481",
    thumbnail: "https://placehold.co/800x450/202020/F6F4EF?text=Episode+03",
    spiritType: "Rum",
    region: "Auckland",
    productsMentioned: ["Pacific Gold Rum", "Spiced Batch #3"],
  },
  {
    slug: "episode-04",
    episodeNumber: "04",
    title: "Moonshine & the New Wave",
    guest: "Jesse Hayes",
    summary: "Is white spirit the future? We talk to a distiller challenging every rule in the book.",
    duration: "39 min",
    youtube: "https://www.youtube.com/@distilnationnz",
    spotify: "https://open.spotify.com/show/1lmSHlLbIHhpzTrpXxcsvJ",
    spreaker: "https://www.spreaker.com/podcast/distil-nation-nz--5937481",
    thumbnail: "https://placehold.co/800x450/202020/F6F4EF?text=Episode+04",
    spiritType: "Moonshine",
    region: "Wellington",
    productsMentioned: ["White Dog", "Corn Spirit"],
  },
  {
    slug: "episode-05",
    episodeNumber: "05",
    title: "Vodka Done Right",
    guest: "Elena Petrova",
    summary: "Why the cleanest spirit is also the hardest to perfect. A masterclass in base ingredients and filtration.",
    duration: "45 min",
    youtube: "https://www.youtube.com/@distilnationnz",
    spotify: "https://open.spotify.com/show/1lmSHlLbIHhpzTrpXxcsvJ",
    spreaker: "https://www.spreaker.com/podcast/distil-nation-nz--5937481",
    thumbnail: "https://placehold.co/800x450/202020/F6F4EF?text=Episode+05",
    spiritType: "Vodka",
    region: "Central Otago",
    productsMentioned: ["Glacial Vodka", "Citrus Infusion"],
  },
  {
    slug: "episode-06",
    episodeNumber: "06",
    title: "Liqueurs with a Local Twist",
    guest: "Sarah Chen",
    summary: "From coffee to kawakawa, we explore the botanical liqueurs winning over New Zealand drinkers.",
    duration: "41 min",
    youtube: "https://www.youtube.com/@distilnationnz",
    spotify: "https://open.spotify.com/show/1lmSHlLbIHhpzTrpXxcsvJ",
    spreaker: "https://www.spreaker.com/podcast/distil-nation-nz--5937481",
    thumbnail: "https://placehold.co/800x450/202020/F6F4EF?text=Episode+06",
    spiritType: "Liqueur",
    region: "Hawke's Bay",
    productsMentioned: ["Kawakawa Liqueur", "Coffee Spirit"],
  },
];

export const distilleries: Distillery[] = [
  {
    slug: "1919-distilling",
    name: "1919 Distilling",
    region: "Auckland",
    spiritTypes: [
      "Gin",
      "Whisky",
      "Rum"
    ],
    description: "1919 Distilling is a Auckland producer of Gin, Whisky, Rum.",
    heroImage: "https://images.squarespace-cdn.com/content/v1/58fde58259cc68d7760fb903/1521094711608-FJLT70QO9AKW1EY2HOJT/1919+Distilling+logo+CMYK.jpg?format=750w",
    owners: "Soren Crabb",
    website: "https://1919distilling.com/",
    visitorInfo: "Tours available",
    hasVisitorCentre: false,
    hasTours: true,
    products: [],
  },
  {
    slug: "budo-spirits",
    name: "Budo Spirits",
    region: "Auckland",
    spiritTypes: [
      "Gin",
      "Vodka"
    ],
    description: "Budo Spirits is a Auckland producer of Gin, Vodka.",
    heroImage: "https://www.budospirits.com/cdn/shop/files/BUDO_Spirits.png?v=1735973241&width=600",
    website: "https://www.budospirits.com/",
    visitorInfo: "By appointment",
    hasVisitorCentre: false,
    hasTours: false,
    products: [
      "Budo Gin"
    ],
  },
  {
    slug: "d-stil",
    name: "d:STIL",
    region: "Auckland",
    spiritTypes: [
      "Gin"
    ],
    description: "d:STIL is a Auckland producer of Gin.",
    heroImage: "https://dstilproject.nz/wp-content/uploads/2025/03/dp-logo-rgb.png",
    visitorInfo: "By appointment",
    hasVisitorCentre: false,
    hasTours: false,
    products: [
      "Coatesvillian Gin"
    ],
  },
  {
    slug: "kakapo-distillery",
    name: "Kakapo Distillery",
    region: "Auckland",
    spiritTypes: [
      "Gin"
    ],
    description: "Kakapo Distillery is a Auckland producer of Gin.",
    heroImage: "https://placehold.co/1200x600/202020/F6F4EF?text=Kakapo+Distillery",
    website: "https://www.kakapodistillery.co.nz/",
    visitorInfo: "Cellar door available",
    hasVisitorCentre: true,
    hasTours: false,
    products: [],
  },
  {
    slug: "last-light-rum",
    name: "Last Light Rum",
    region: "Auckland",
    spiritTypes: [
      "Rum"
    ],
    description: "Last Light Rum is a Auckland producer of Rum.",
    heroImage: "https://lastlight.nz/cdn/shop/files/last_light_rum_hrz_white.png?v=1705446273&width=600",
    website: "https://lastlight.nz/",
    visitorInfo: "By appointment",
    hasVisitorCentre: false,
    hasTours: false,
    products: [],
  },
  {
    slug: "lunatic-lover",
    name: "Lunatic & Lover",
    region: "Auckland",
    spiritTypes: [
      "Gin",
      "Rum"
    ],
    description: "Lunatic & Lover is a Auckland producer of Gin, Rum.",
    heroImage: "https://placehold.co/1200x600/202020/F6F4EF?text=Lunatic+&+Lover",
    visitorInfo: "By appointment",
    hasVisitorCentre: false,
    hasTours: false,
    products: [],
  },
  {
    slug: "nv-distilling-co",
    name: "NV Distilling Co.",
    region: "Auckland",
    spiritTypes: [
      "Gin"
    ],
    description: "NV Distilling Co. is a Auckland producer of Gin.",
    heroImage: "https://cdn.shopify.com/s/files/1/0682/1298/2066/files/logo.png?height=628&pad_color=f6f5ec&v=1669670133&width=1200",
    website: "https://mokshadrinks.com/",
    visitorInfo: "By appointment",
    hasVisitorCentre: false,
    hasTours: false,
    products: [
      "Moksha Drinks"
    ],
  },
  {
    slug: "papaka-road-distillery",
    name: "Papaka Road Distillery",
    region: "Auckland",
    spiritTypes: [
      "Gin"
    ],
    description: "Papaka Road Distillery is a Auckland producer of Gin.",
    heroImage: "https://papakaroad.co.nz/cdn/shop/files/Papaka-Road-Logo_Web_4x_b7e6be2c-1fe5-4096-aef2-7653195cbc72.png?v=1693350966&width=360",
    website: "https://papakaroad.co.nz/",
    visitorInfo: "By appointment",
    hasVisitorCentre: false,
    hasTours: false,
    products: [],
  },
  {
    slug: "thomson-whisky",
    name: "Thomson Whisky",
    region: "Auckland",
    spiritTypes: [
      "Gin",
      "Whisky"
    ],
    description: "Thomson Whisky is a Auckland producer of Gin, Whisky. Founded in 2014.",
    heroImage: "https://thomsonwhisky.co.nz/cdn/shop/files/thomson_whisky_logo.png?v=1666728254&width=500",
    founded: "2014",
    owners: "Mat Thomson",
    website: "https://thomsonwhisky.co.nz/",
    visitorInfo: "By appointment",
    hasVisitorCentre: false,
    hasTours: false,
    products: [],
  },
  {
    slug: "twelfth-hour",
    name: "Twelfth Hour",
    region: "Auckland",
    spiritTypes: [
      "Gin"
    ],
    description: "Twelfth Hour is a Auckland producer of Gin.",
    heroImage: "https://www.twelfthhourdistillery.co.nz/wp-content/uploads/2021/06/Twelfth-Hour-01-Header-Logo-circle.png",
    website: "https://www.twelfthhourdistillery.co.nz/",
    visitorInfo: "By appointment",
    hasVisitorCentre: false,
    hasTours: false,
    products: [],
  },
  {
    slug: "batch10-spirits",
    name: "Batch10 Spirits",
    region: "Auckland",
    spiritTypes: [
      "Gin",
      "Whisky",
      "Vodka",
      "Rum",
      "Liqueurs"
    ],
    description: "Batch10 Spirits is a Auckland producer of Gin, Whisky, Vodka, Rum, Liqueurs.",
    heroImage: "https://batch10.com/cdn/shop/files/Batch_10_Logo_360x.jpg?v=1614300044",
    website: "https://batch10.com/",
    visitorInfo: "By appointment",
    hasVisitorCentre: false,
    hasTours: false,
    products: [],
  },
  {
    slug: "black-collar-distillery",
    name: "Black Collar Distillery",
    region: "Northland",
    spiritTypes: [
      "Gin",
      "Vodka",
      "Rum",
      "Liqueurs"
    ],
    description: "Black Collar Distillery is a Northland producer of Gin, Vodka, Rum, Liqueurs.",
    heroImage: "https://blackcollardistillery.com/cdn/shop/files/BCD-WHITE_LOGO.png?v=1680403777",
    website: "https://blackcollardistillery.com/",
    visitorInfo: "By appointment",
    hasVisitorCentre: false,
    hasTours: false,
    products: [],
  },
  {
    slug: "waiheke-distilling-co",
    name: "Waiheke Distilling Co.",
    region: "Auckland",
    spiritTypes: [
      "Gin"
    ],
    description: "Waiheke Distilling Co. is a Auckland producer of Gin.",
    heroImage: "https://waihekedistilling.co.nz/cdn/shop/files/wdc_logo_600x.svg?v=1692068271",
    website: "https://waihekedistilling.co.nz/",
    visitorInfo: "Cellar door and Tours available",
    hasVisitorCentre: true,
    hasTours: true,
    products: [],
  },
  {
    slug: "waiheke-whisky",
    name: "Waiheke Whisky",
    region: "Auckland",
    spiritTypes: [
      "Whisky"
    ],
    description: "Waiheke Whisky is a Auckland producer of Whisky. Founded in 2010.",
    heroImage: "https://waihekewhisky.com/cdn/shop/files/WW_Logos_WW_Logo_CLEAN-ai_30cb60e5-d1c0-42af-8820-362c00cb4d3f.png?v=1663910695&width=220",
    founded: "2010",
    website: "https://waihekewhisky.com/",
    visitorInfo: "Cellar door and Tours available",
    hasVisitorCentre: true,
    hasTours: true,
    products: [],
  },
  {
    slug: "coromandel-distilling-company",
    name: "Coromandel Distilling Company",
    region: "Auckland",
    spiritTypes: [
      "Gin"
    ],
    description: "Coromandel Distilling Company is a Auckland producer of Gin.",
    heroImage: "https://awildian.com/cdn/shop/files/Awildian-gin-brand-logo-black.png?v=1697156600&width=240",
    website: "https://awildian.com/",
    visitorInfo: "Cellar door available",
    hasVisitorCentre: true,
    hasTours: false,
    products: [
      "Awildian Gin"
    ],
  },
  {
    slug: "simply-pure",
    name: "Simply Pure",
    region: "Bay of Plenty",
    spiritTypes: [
      "Gin",
      "Vodka"
    ],
    description: "Simply Pure is a Bay of Plenty producer of Gin, Vodka.",
    heroImage: "https://www.simplypure.co.nz/cdn/shop/files/SPL_logo3_200x.png?v=1614760911",
    website: "https://www.simplypure.co.nz/",
    visitorInfo: "By appointment",
    hasVisitorCentre: false,
    hasTours: false,
    products: [
      "Black Robin Gin"
    ],
  },
  {
    slug: "clarity-distilling-co",
    name: "Clarity Distilling Co",
    region: "Bay of Plenty",
    spiritTypes: [
      "Gin"
    ],
    description: "Clarity Distilling Co is a Bay of Plenty producer of Gin.",
    heroImage: "https://claritydc.co.nz/wp-content/uploads/2023/01/Clarity-Distilling-Company-1536x1230.jpg",
    website: "https://claritydc.co.nz/",
    visitorInfo: "By appointment",
    hasVisitorCentre: false,
    hasTours: false,
    products: [],
  },
  {
    slug: "5-mile-distilling",
    name: "5 Mile Distilling",
    region: "Waikato",
    spiritTypes: [
      "Gin"
    ],
    description: "5 Mile Distilling is a Waikato producer of Gin.",
    heroImage: "https://5mile.nz/cdn/shop/files/5MD_Round_White_Background.png?v=1777346835&width=600",
    website: "https://5mile.nz/",
    visitorInfo: "Cellar door and Tours available",
    hasVisitorCentre: true,
    hasTours: true,
    products: [],
  },
  {
    slug: "pokeno-whisky",
    name: "Pokeno Whisky",
    region: "Waikato",
    spiritTypes: [
      "Whisky"
    ],
    description: "Pokeno Whisky is a Waikato producer of Whisky.",
    heroImage: "https://pokenowhisky.com/wp-content/themes/pokeno-rebuild/images/Pokeno-Embossed-Logo.png",
    website: "https://pokenowhisky.com/",
    visitorInfo: "Cellar door and Tours available",
    hasVisitorCentre: true,
    hasTours: true,
    products: [],
  },
  {
    slug: "pungent-pukeko",
    name: "Pungent Pukeko",
    region: "Waikato",
    spiritTypes: [
      "Gin"
    ],
    description: "Pungent Pukeko is a Waikato producer of Gin.",
    heroImage: "https://pungentpukeko.co.nz/cdn/shop/files/PP_Vertical_logo.svg?v=1728606803&width=480",
    website: "https://pungentpukeko.co.nz/",
    visitorInfo: "By appointment",
    hasVisitorCentre: false,
    hasTours: false,
    products: [],
  },
  {
    slug: "fenton-street",
    name: "Fenton Street",
    region: "Taranaki",
    spiritTypes: [
      "Gin",
      "Whisky"
    ],
    description: "Fenton Street is a Taranaki producer of Gin, Whisky.",
    heroImage: "https://images.squarespace-cdn.com/content/v1/65eea260e4a8e534b9b8a458/ec2f7779-dc1e-4b50-9556-de7f03bdc514/Fenton+st+logo.png?format=1500w",
    website: "https://www.fentonstreetartscollective.co.nz/",
    visitorInfo: "Cellar door available",
    hasVisitorCentre: true,
    hasTours: false,
    products: [],
  },
  {
    slug: "juno-gin",
    name: "Juno Gin",
    region: "Taranaki",
    spiritTypes: [
      "Gin",
      "Vodka",
      "Liqueurs"
    ],
    description: "Juno Gin is a Taranaki producer of Gin, Vodka, Liqueurs.",
    heroImage: "https://junogin.com/wp-content/themes/juno-gin/images/logo-footer.png",
    website: "https://junogin.com/",
    visitorInfo: "Cellar door and Tours available",
    hasVisitorCentre: true,
    hasTours: true,
    products: [],
  },
  {
    slug: "papiti-gin",
    name: "Papiti Gin",
    region: "Manawatū-Whanganui",
    spiritTypes: [
      "Gin",
      "Liqueurs"
    ],
    description: "Papiti Gin is a Manawatū-Whanganui producer of Gin, Liqueurs.",
    heroImage: "https://papaitigin.co.nz/cdn/shop/files/PapaitiGin-Logos_LeftAligned-white_4.svg?v=1745213954&width=832",
    website: "https://papaitigin.co.nz/",
    visitorInfo: "Cellar door available",
    hasVisitorCentre: true,
    hasTours: false,
    products: [],
  },
  {
    slug: "good-bones-distilling",
    name: "Good Bones Distilling",
    region: "Manawatū-Whanganui",
    spiritTypes: [
      "Vodka",
      "Liqueurs"
    ],
    description: "Good Bones Distilling is a Manawatū-Whanganui producer of Vodka, Liqueurs.",
    heroImage: "https://goodbones.nz/cdn/shop/files/good_bones_vector_300x300.png?v=1719009609",
    website: "https://goodbones.nz/",
    visitorInfo: "Cellar door available",
    hasVisitorCentre: true,
    hasTours: false,
    products: [],
  },
  {
    slug: "dr-beak-gin",
    name: "Dr Beak Gin",
    region: "Marlborough",
    spiritTypes: [
      "Gin"
    ],
    description: "Dr Beak Gin is a Marlborough producer of Gin.",
    heroImage: "https://drbeak.nz/cdn/shop/files/Dr-Beak-Logo_RGB-DarkBlue_3_x55@2x.png?v=1618252338",
    website: "https://drbeak.nz/",
    visitorInfo: "By appointment",
    hasVisitorCentre: false,
    hasTours: false,
    products: [],
  },
  {
    slug: "enceladus-distilling-co",
    name: "Enceladus Distilling Co",
    region: "Marlborough",
    spiritTypes: [
      "Gin"
    ],
    description: "Enceladus Distilling Co is a Marlborough producer of Gin.",
    heroImage: "https://spcdn.shortpixel.ai/spio/ret_img,q_cdnize,to_auto,s_webp:avif/enceladusdistilling.co.nz/wp-content/uploads/Winslow-Logo-White.png",
    website: "https://enceladusdistilling.co.nz/",
    visitorInfo: "By appointment",
    hasVisitorCentre: false,
    hasTours: false,
    products: [
      "The Winslow Distillery"
    ],
  },
  {
    slug: "greytown-distilling-co",
    name: "Greytown Distilling Co",
    region: "Marlborough",
    spiritTypes: [
      "Gin",
      "Liqueurs"
    ],
    description: "Greytown Distilling Co is a Marlborough producer of Gin, Liqueurs.",
    heroImage: "https://greytowngin.com/cdn/shop/files/GDC-logo.png?v=1666732606&width=400",
    website: "https://greytowngin.com/",
    visitorInfo: "By appointment",
    hasVisitorCentre: false,
    hasTours: false,
    products: [],
  },
  {
    slug: "imagination-gin",
    name: "Imagination Gin",
    region: "Marlborough",
    spiritTypes: [
      "Gin"
    ],
    description: "Imagination Gin is a Marlborough producer of Gin.",
    heroImage: "https://imaginationgin.nz/wp-content/themes/public/images/new/hlogo.png",
    website: "https://imaginationgin.nz/",
    visitorInfo: "By appointment",
    hasVisitorCentre: false,
    hasTours: false,
    products: [],
  },
  {
    slug: "reid-reid",
    name: "Reid & Reid",
    region: "Marlborough",
    spiritTypes: [
      "Gin"
    ],
    description: "Reid & Reid is a Marlborough producer of Gin.",
    heroImage: "https://static.wixstatic.com/media/82194b_2dd877e271784812b3ca215e5c420e2a~mv2.png/v1/crop/x_72,y_140,w_1146,h_569/fill/w_700,h_334,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Reid%26Reid_flag_black.png",
    website: "https://www.reidandreid.co.nz/",
    visitorInfo: "By appointment",
    hasVisitorCentre: false,
    hasTours: false,
    products: [],
  },
  {
    slug: "village-distillery",
    name: "Village Distillery",
    region: "Tasman",
    spiritTypes: [
      "Gin",
      "Vodka",
      "Rum",
      "Liqueurs"
    ],
    description: "Village Distillery is a Tasman producer of Gin, Vodka, Rum, Liqueurs.",
    heroImage: "https://dancingsands.com/cdn/shop/files/DS_Hero_Brand_Logo_Col_RGB_Adj.png?v=1750975511&width=240",
    website: "https://dancingsands.com/",
    visitorInfo: "Cellar door available",
    hasVisitorCentre: true,
    hasTours: false,
    products: [
      "Dancing Sands"
    ],
  },
  {
    slug: "kiwi-spirits-distillery",
    name: "Kiwi Spirits Distillery",
    region: "Tasman",
    spiritTypes: [
      "Gin",
      "Whisky",
      "Vodka",
      "Agave",
      "Liqueurs"
    ],
    description: "Kiwi Spirits Distillery is a Tasman producer of Gin, Whisky, Vodka, Agave, Liqueurs.",
    heroImage: "https://kiwispiritdistillery.co.nz/cdn/shop/files/Kiwi_Spirit_Distillery_-_White_Logo_Small_15698524-3f0a-45d3-93cb-23fbcfe5fee5.png?v=1707961963&width=400",
    website: "https://kiwispiritdistillery.co.nz/",
    visitorInfo: "Cellar door and Tours available",
    hasVisitorCentre: true,
    hasTours: true,
    products: [],
  },
  {
    slug: "rough-hands",
    name: "Rough Hands",
    region: "Tasman",
    spiritTypes: [
      "Brandy"
    ],
    description: "Rough Hands is a Tasman producer of Brandy.",
    heroImage: "https://elsewhen.nz/wp-content/uploads/2021/06/icon2.jpg",
    website: "https://elsewhen.nz/",
    visitorInfo: "By appointment",
    hasVisitorCentre: false,
    hasTours: false,
    products: [
      "Elsewhen"
    ],
  },
  {
    slug: "headwaters-distillery",
    name: "Headwaters Distillery",
    region: "Tasman",
    spiritTypes: [
      "Whisky"
    ],
    description: "Headwaters Distillery is a Tasman producer of Whisky.",
    heroImage: "https://headwatersdistillery.com/cdn/shop/files/Untitled-2_x60@2x.png?v=1677982842",
    website: "https://headwatersdistillery.com/",
    visitorInfo: "By appointment",
    hasVisitorCentre: false,
    hasTours: false,
    products: [],
  },
  {
    slug: "bureaucrats-gin",
    name: "Bureaucrats Gin",
    region: "Wellington",
    spiritTypes: [
      "Gin"
    ],
    description: "Bureaucrats Gin is a Wellington producer of Gin.",
    heroImage: "https://placehold.co/1200x600/202020/F6F4EF?text=Bureaucrats+Gin",
    visitorInfo: "By appointment",
    hasVisitorCentre: false,
    hasTours: false,
    products: [],
  },
  {
    slug: "karori-drinks-company",
    name: "Karori Drinks Company",
    region: "Wellington",
    spiritTypes: [
      "Gin"
    ],
    description: "Karori Drinks Company is a Wellington producer of Gin.",
    heroImage: "https://images.squarespace-cdn.com/content/v1/62d732d0c6b38839336808ed/a5fd0d71-783b-4b4b-9005-c3f84f31e1ad/ChemistryLogo.png?format=1500w",
    website: "https://www.chemistrygin.com/",
    visitorInfo: "By appointment",
    hasVisitorCentre: false,
    hasTours: false,
    products: [
      "Chemistry Gin"
    ],
  },
  {
    slug: "southward-distilling",
    name: "Southward Distilling",
    region: "Wellington",
    spiritTypes: [
      "Gin",
      "Whisky",
      "Vodka"
    ],
    description: "Southward Distilling is a Wellington producer of Gin, Whisky, Vodka.",
    heroImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAhw9FRJ98KnwGS_uIx4zdzTtCgvquxwME1Z41sDiH6Q&s",
    website: "https://www.southwarddistilling.com/",
    visitorInfo: "Cellar door available",
    hasVisitorCentre: true,
    hasTours: false,
    products: [],
  },
  {
    slug: "whistlebird-gin",
    name: "Whistlebird Gin",
    region: "Wellington",
    spiritTypes: [
      "Gin"
    ],
    description: "Whistlebird Gin is a Wellington producer of Gin.",
    heroImage: "https://images.squarespace-cdn.com/content/v1/65fd5c21447669721f51b792/4e951b98-8562-468b-9e24-9c1e722a4ef6/logo.png?format=1500w",
    website: "https://whistlebird.co.nz/",
    visitorInfo: "By appointment",
    hasVisitorCentre: false,
    hasTours: false,
    products: [],
  },
  {
    slug: "elemental-distillers",
    name: "Elemental Distillers",
    region: "Marlborough",
    spiritTypes: [
      "Gin"
    ],
    description: "Elemental Distillers is a Marlborough producer of Gin.",
    heroImage: "https://rootsdrygin.com/cdn/shop/files/thumbnail_ED_Logo-Modern_Invert_Trans.png?v=1734299139&width=1100",
    website: "https://rootsdrygin.com/",
    visitorInfo: "Cellar door available",
    hasVisitorCentre: true,
    hasTours: false,
    products: [
      "Roots Gin"
    ],
  },
  {
    slug: "strange-nature-gin",
    name: "Strange Nature Gin",
    region: "Marlborough",
    spiritTypes: [
      "Gin"
    ],
    description: "Strange Nature Gin is a Marlborough producer of Gin.",
    heroImage: "https://strangenaturegin.com/cdn/shop/files/Strange_Nature_Full_Logo_White.png?v=1774500331",
    website: "https://strangenaturegin.com/",
    visitorInfo: "By appointment",
    hasVisitorCentre: false,
    hasTours: false,
    products: [],
  },
  {
    slug: "best-behaviour-rum",
    name: "Best Behaviour Rum",
    region: "Bay of Plenty",
    spiritTypes: [
      "Rum"
    ],
    description: "Best Behaviour Rum is a Bay of Plenty producer of Rum.",
    heroImage: "https://www.bestbehaviour.co.nz/cdn/shop/files/Untitled-2-28.png?v=1762985877",
    website: "https://www.bestbehaviour.co.nz/",
    visitorInfo: "Cellar door available",
    hasVisitorCentre: true,
    hasTours: false,
    products: [],
  },
  {
    slug: "reefton-distilling-co",
    name: "Reefton Distilling Co",
    region: "West Coast",
    spiritTypes: [
      "Gin",
      "Whisky",
      "Vodka",
      "Liqueurs",
      "RTDs"
    ],
    description: "Reefton Distilling Co is a West Coast producer of Gin, Whisky, Vodka, Liqueurs, RTDs.",
    heroImage: "https://www.reeftondistillingco.com/cdn/shop/files/large-logo.png?v=1614310193&width=387",
    owners: "Patsy Bass",
    website: "https://www.reeftondistillingco.com/",
    visitorInfo: "Cellar door available",
    hasVisitorCentre: true,
    hasTours: false,
    products: [],
  },
  {
    slug: "cardrona-distillery",
    name: "Cardrona Distillery",
    region: "Otago",
    spiritTypes: [
      "Gin",
      "Whisky",
      "Vodka",
      "Liqueurs"
    ],
    description: "Cardrona Distillery is a Otago producer of Gin, Whisky, Vodka, Liqueurs.",
    heroImage: "https://www.cardronadistillery.co.nz/cdn/shop/files/logo.svg?v=1739324902&width=100",
    website: "https://www.cardronadistillery.co.nz/",
    visitorInfo: "Cellar door and Tours available",
    hasVisitorCentre: true,
    hasTours: true,
    products: [],
  },
  {
    slug: "scapegrace",
    name: "Scapegrace",
    region: "Otago",
    spiritTypes: [
      "Gin",
      "Whisky",
      "RTDs"
    ],
    description: "Scapegrace is a Otago producer of Gin, Whisky, RTDs.",
    heroImage: "https://placehold.co/1200x600/202020/F6F4EF?text=Scapegrace",
    website: "https://scapegracedistillery.com/",
    visitorInfo: "By appointment",
    hasVisitorCentre: false,
    hasTours: false,
    products: [],
  },
  {
    slug: "broken-heart-spirits",
    name: "Broken Heart Spirits",
    region: "Otago",
    spiritTypes: [
      "Gin",
      "Whisky",
      "Vodka",
      "Rum",
      "Liqueurs"
    ],
    description: "Broken Heart Spirits is a Otago producer of Gin, Whisky, Vodka, Rum, Liqueurs.",
    heroImage: "https://www.brokenheartspirits.com/wp-content/themes/brokenheartspirits2021/images/broken-heart-spirits-logo-2021.svg",
    website: "https://www.brokenheartspirits.com/",
    visitorInfo: "By appointment",
    hasVisitorCentre: false,
    hasTours: false,
    products: [],
  },
  {
    slug: "rifters",
    name: "Rifters",
    region: "Otago",
    spiritTypes: [
      "Gin",
      "Whisky",
      "Vodka"
    ],
    description: "Rifters is a Otago producer of Gin, Whisky, Vodka.",
    heroImage: "https://riftersgin.com/cdn/shop/files/Rifters-White_360x.svg?v=1780541906",
    website: "https://riftersgin.com/",
    visitorInfo: "Cellar door available",
    hasVisitorCentre: true,
    hasTours: false,
    products: [],
  },
  {
    slug: "rakiura-distilling-co",
    name: "Rakiura Distilling Co",
    region: "Southland",
    spiritTypes: [
      "Gin",
      "Vodka"
    ],
    description: "Rakiura Distilling Co is a Southland producer of Gin, Vodka.",
    heroImage: "https://www.thirdisland.co.nz/cdn/shop/files/Rakiura_Distilling_Company_Logo.png?v=1767751235&width=1100",
    website: "https://www.thirdisland.co.nz/",
    visitorInfo: "By appointment",
    hasVisitorCentre: false,
    hasTours: false,
    products: [
      "Third Island Gin"
    ],
  },
  {
    slug: "auld-farm-distillery",
    name: "Auld Farm Distillery",
    region: "Southland",
    spiritTypes: [
      "Gin",
      "Whisky"
    ],
    description: "Auld Farm Distillery is a Southland producer of Gin, Whisky.",
    heroImage: "https://images.squarespace-cdn.com/content/v1/5ac97c739d5abbb71e46c22e/1524372525444-FPXQY9GBXRTXPK0OQI4V/Auld+Reverse+Logo.png?format=750w",
    owners: "Rob Auld",
    website: "https://www.aulddistillery.co.nz/",
    visitorInfo: "Tours available",
    hasVisitorCentre: false,
    hasTours: true,
    products: [],
  },
  {
    slug: "bluff-gin",
    name: "Bluff Gin",
    region: "Southland",
    spiritTypes: [
      "Gin"
    ],
    description: "Bluff Gin is a Southland producer of Gin.",
    heroImage: "https://bluffdistillery.com/cdn/shop/files/Bluff-logo-brown.webp?v=1755558965&width=260",
    website: "https://bluffdistillery.com/",
    visitorInfo: "Cellar door and Tours available",
    hasVisitorCentre: true,
    hasTours: true,
    products: [],
  },
  {
    slug: "dunedin-craft-spirits",
    name: "Dunedin Craft Spirits",
    region: "Otago",
    spiritTypes: [
      "Gin"
    ],
    description: "Dunedin Craft Spirits is a Otago producer of Gin.",
    heroImage: "https://images.squarespace-cdn.com/content/v1/6686249925f0b10d8bcdda4d/b9243486-89b3-45df-9114-43dfe83f7344/DCD+logo+and+stamp+beside+C.png?format=1500w",
    website: "https://www.dunedincraftdistillers.nz/",
    visitorInfo: "Cellar door and Tours available",
    hasVisitorCentre: true,
    hasTours: true,
    products: [],
  },
  {
    slug: "new-zealand-whisky-collection",
    name: "New Zealand Whisky Collection",
    region: "Otago",
    spiritTypes: [
      "Whisky",
      "Vodka",
      "Liqueurs"
    ],
    description: "New Zealand Whisky Collection is a Otago producer of Whisky, Vodka, Liqueurs.",
    heroImage: "https://thenzwhisky.com/images/logo-white.png",
    website: "https://thenzwhisky.com/",
    visitorInfo: "Cellar door and Tours available",
    hasVisitorCentre: true,
    hasTours: true,
    products: [],
  },
  {
    slug: "no8-distillery",
    name: "No8 Distillery",
    region: "Otago",
    spiritTypes: [
      "Gin",
      "Vodka",
      "Rum",
      "Liqueurs"
    ],
    description: "No8 Distillery is a Otago producer of Gin, Vodka, Rum, Liqueurs.",
    heroImage: "https://static.wixstatic.com/media/cd2f2a_841196b4d6f74e0ba1154676cc43340e~mv2.png/v1/fill/w_650,h_650,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/No8Distillery_logo.png",
    website: "https://www.no8distillery.com/",
    visitorInfo: "Cellar door and Tours available",
    hasVisitorCentre: true,
    hasTours: true,
    products: [],
  },
  {
    slug: "sandymount-distillery",
    name: "Sandymount Distillery",
    region: "Otago",
    spiritTypes: [
      "Gin",
      "Whisky"
    ],
    description: "Sandymount Distillery is a Otago producer of Gin, Whisky.",
    heroImage: "https://www.sandymount.nz/wp-content/uploads/2022/02/SandymountDistillery-logo-black.png",
    website: "https://www.sandymount.nz/",
    visitorInfo: "Cellar door and Tours available",
    hasVisitorCentre: true,
    hasTours: true,
    products: [],
  },
  {
    slug: "humdinger-gin",
    name: "Humdinger Gin",
    region: "Canterbury",
    spiritTypes: [
      "Gin",
      "Liqueurs"
    ],
    description: "Humdinger Gin is a Canterbury producer of Gin, Liqueurs.",
    heroImage: "https://www.humdinger.nz/cdn/shop/files/Humdinger-Gin-Coloured-Bee-Logo-3.png?v=1782007008&width=400",
    website: "https://www.humdinger.nz/",
    visitorInfo: "Cellar door available",
    hasVisitorCentre: true,
    hasTours: false,
    products: [],
  },
  {
    slug: "akaroa-craft-distillery",
    name: "Akaroa Craft Distillery",
    region: "Canterbury",
    spiritTypes: [
      "Gin"
    ],
    description: "Akaroa Craft Distillery is a Canterbury producer of Gin.",
    heroImage: "https://placehold.co/1200x600/202020/F6F4EF?text=Akaroa+Craft+Distillery",
    website: "https://www.akaroacraftdistillery.com/",
    visitorInfo: "Cellar door and Tours available",
    hasVisitorCentre: true,
    hasTours: true,
    products: [
      "Hectors"
    ],
  },
  {
    slug: "bloody-good-gin",
    name: "Bloody Good Gin",
    region: "Canterbury",
    spiritTypes: [
      "Gin"
    ],
    description: "Bloody Good Gin is a Canterbury producer of Gin.",
    heroImage: "https://static.wixstatic.com/media/bf8719_40831d15997049908d4212c1c456ab48~mv2.png/v1/fill/w_596,h_162,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/bgg-bfg-header-logos.png",
    website: "https://www.bloodygoodgin.co.nz/",
    visitorInfo: "By appointment",
    hasVisitorCentre: false,
    hasTours: false,
    products: [],
  },
  {
    slug: "elsewhere-gin",
    name: "Elsewhere Gin",
    region: "Canterbury",
    spiritTypes: [
      "Gin"
    ],
    description: "Elsewhere Gin is a Canterbury producer of Gin.",
    heroImage: "https://placehold.co/1200x600/202020/F6F4EF?text=Elsewhere+Gin",
    website: "https://www.elsewheregin.com/",
    visitorInfo: "By appointment",
    hasVisitorCentre: false,
    hasTours: false,
    products: [],
  },
  {
    slug: "forth-luck-gin",
    name: "Forth Luck Gin",
    region: "Canterbury",
    spiritTypes: [
      "Gin"
    ],
    description: "Forth Luck Gin is a Canterbury producer of Gin.",
    heroImage: "https://forthluckgin.co.nz/cdn/shop/files/11111111111111_a53d47ec-59d2-40cb-be82-14b15617dc39.png?v=1663095455&width=350",
    website: "https://forthluckgin.co.nz/",
    visitorInfo: "By appointment",
    hasVisitorCentre: false,
    hasTours: false,
    products: [],
  },
  {
    slug: "longshot-distillery",
    name: "Longshot Distillery",
    region: "Canterbury",
    spiritTypes: [
      "Gin",
      "Vodka",
      "Liqueurs"
    ],
    description: "Longshot Distillery is a Canterbury producer of Gin, Vodka, Liqueurs.",
    heroImage: "https://longshotdistillery.co.nz/cdn/shop/files/LDWideLogo-Blue.png?v=1716908861&width=500",
    website: "https://longshotdistillery.co.nz/",
    visitorInfo: "By appointment",
    hasVisitorCentre: false,
    hasTours: false,
    products: [
      "The Racketeer"
    ],
  },
  {
    slug: "lyttelton-distillery-co",
    name: "Lyttelton Distillery Co",
    region: "Canterbury",
    spiritTypes: [
      "Gin"
    ],
    description: "Lyttelton Distillery Co is a Canterbury producer of Gin. Founded in 2017.",
    heroImage: "https://placehold.co/1200x600/202020/F6F4EF?text=Lyttelton+Distillery+Co",
    founded: "2017",
    visitorInfo: "By appointment",
    hasVisitorCentre: false,
    hasTours: false,
    products: [],
  },
  {
    slug: "the-spirits-workshop",
    name: "The Spirits Workshop",
    region: "Canterbury",
    spiritTypes: [
      "Gin",
      "Whisky",
      "RTDs"
    ],
    description: "The Spirits Workshop is a Canterbury producer of Gin, Whisky, RTDs.",
    heroImage: "https://cdn.prod.website-files.com/609364a53f67aec6377ab27b/60cfd6b238e06c0038240f16_Alternate-logo.svg",
    website: "https://www.thespiritsworkshop.co.nz/",
    visitorInfo: "Cellar door and Tours available",
    hasVisitorCentre: true,
    hasTours: true,
    products: [],
  },
];

export const articles: Article[] = [
  {
    slug: "what-is-moonshine",
    title: "What is Moonshine?",
    excerpt: "A friendly guide to unaged new-make spirits and why distillers are embracing them.",
    category: "Learn",
    readTime: "5 min",
    image: "https://placehold.co/600x400/202020/F6F4EF?text=Moonshine",
    content: "Placeholder content for the moonshine article.",
  },
  {
    slug: "how-whisky-is-made",
    title: "How Whisky Is Made",
    excerpt: "From grain to glass: the steps every New Zealand whisky distiller takes.",
    category: "Learn",
    readTime: "8 min",
    image: "https://placehold.co/600x400/202020/F6F4EF?text=Whisky",
    content: "Placeholder content for the whisky article.",
  },
  {
    slug: "gin-botanicals",
    title: "Gin Botanicals",
    excerpt: "The native plants that give New Zealand gin its signature taste.",
    category: "Learn",
    readTime: "6 min",
    image: "https://placehold.co/600x400/202020/F6F4EF?text=Botanicals",
    content: "Placeholder content for the gin botanicals article.",
  },
  {
    slug: "understanding-rum",
    title: "Understanding Rum",
    excerpt: "Cane, molasses, fermentation and the tropical touch of Pacific rum.",
    category: "Learn",
    readTime: "7 min",
    image: "https://placehold.co/600x400/202020/F6F4EF?text=Rum",
    content: "Placeholder content for the rum article.",
  },
  {
    slug: "distillation-explained",
    title: "Distillation Explained",
    excerpt: "What happens in the still and why it matters for every spirit.",
    category: "Learn",
    readTime: "9 min",
    image: "https://placehold.co/600x400/202020/F6F4EF?text=Distillation",
    content: "Placeholder content for the distillation article.",
  },
];

export const reviews: Review[] = [
  {
    slug: "cardrona-single-malt-12yo",
    name: "Cardrona Single Malt 12yo",
    distillery: "Cardrona Distillery",
    image: "https://placehold.co/400x600/202020/F6F4EF?text=Bottle+01",
    rating: 4.5,
    nose: "Honey, dried apricot and a touch of oak.",
    palate: "Creamy malt with orchard fruit and gentle spice.",
    finish: "Long, warm, slightly nutty.",
    value: "Excellent",
    recommendedFor: ["Whisky lovers", "Special occasions"],
    pros: ["Complex", "Well balanced"],
    cons: ["Pricey"],
    spiritType: "Whisky",
  },
  {
    slug: "lighthouse-coastal-gin",
    name: "Lighthouse Coastal Gin",
    distillery: "Lighthouse Spirits",
    image: "https://placehold.co/400x600/202020/F6F4EF?text=Bottle+02",
    rating: 4.2,
    nose: "Sea breeze, citrus and coastal herbs.",
    palate: "Bright and saline with a clean juniper backbone.",
    finish: "Crisp, refreshing.",
    value: "Great",
    recommendedFor: ["Gin fans", "Summer drinks"],
    pros: ["Unique", "Versatile"],
    cons: ["Limited release"],
    spiritType: "Gin",
  },
  {
    slug: "wilderness-botanical-gin",
    name: "Wilderness Botanical Gin",
    distillery: "Wilderness Distillery",
    image: "https://placehold.co/400x600/202020/F6F4EF?text=Bottle+03",
    rating: 4.4,
    nose: "Kawakawa, citrus and native florals.",
    palate: "Earthy, herbaceous and elegant.",
    finish: "Soft, lingering botanicals.",
    value: "Great",
    recommendedFor: ["Tonic pairings", "Local flavours"],
    pros: ["Distinctly NZ", "Smooth"],
    cons: ["Small batches"],
    spiritType: "Gin",
  },
];

export const events: Event[] = [];


export const hosts: Host[] = [
  {
    name: "Tom",
    role: "Host",
    bio: "The enabler and founder/former owner of Herrick Creek Distillery, always curious and rarely without a dram in hand.",
    image: "/assets/logo.jpg",
  },
  {
    name: "Cameron",
    role: "Host",
    bio: "The palate. Runs Discovering Drams Whisky Tastings and loves the story behind the bottle as much as the liquid.",
    image: "/assets/logo.jpg",
  },
  {
    name: "Ty",
    role: "Host",
    bio: "The Joker. A winemaker and general lover of all things beer, wine, & spirits.",
    image: "/assets/logo.jpg",
  },
];

export const siteConfig = {
  title: "Distil-Nation NZ",
  tagline: "Discover New Zealand's craft spirits.",
  description: "Tom, Cameron & Ty explore the world of New Zealand spirits, chatting to distillers and industry experts in a fun, relaxed, prejudice-free way.",
  email: "distilnationnz@gmail.com",
  youtube: "https://www.youtube.com/@distilnationnz",
  spotify: "https://open.spotify.com/show/1lmSHlLbIHhpzTrpXxcsvJ",
  spreaker: "https://www.spreaker.com/podcast/distil-nation-nz--5937481",
  facebook: "https://www.facebook.com/distilnationnz",
  instagram: "https://www.instagram.com/distilnationnz",
  newsletterAction: "https://buttondown.com/api/emails/embed-subscribe/distil-nation",
};

export const spiritTypes = ["All", "Whisky", "Gin", "Rum", "Vodka", "Liqueur", "Moonshine"];
export const regions = [
  "All",
  "Auckland",
  "Bay of Plenty",
  "Canterbury",
  "Central Otago",
  "Hawke's Bay",
  "Manawatū-Whanganui",
  "Marlborough",
  "Northland",
  "Otago",
  "Southland",
  "Taranaki",
  "Tasman",
  "Waikato",
  "Wairarapa",
  "Waitaki",
  "Wellington",
  "West Coast"
];
