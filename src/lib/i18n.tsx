import { createContext, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import type { Project } from "@/lib/projects";

export type Locale = "sl" | "en";

const STORAGE_KEY = "finars-lang";

type ProjectCopy = { title: string; location: string; summary: string };

const enProjects: Record<string, ProjectCopy> = {
  "hisa-v-gozdu": {
    title: "House in the woods",
    location: "Zasavje",
    summary:
      "A three-storey family house with a partly buried basement and garage. The ground floor is an open living space with a glazed west façade opening onto a green terrace and pergola. 150 m² plus 90 m² of basement.",
  },
  "vila-arbos": {
    title: "Villa Arbos",
    location: "Slovenia",
    summary:
      "A single-storey villa in natural materials with a timber structure. Living spaces face south and west, under a mono-pitch roof with active solar systems. 80 m².",
  },
  "pasivna-hisa": {
    title: "Passive timber house",
    location: "Slovenia",
    summary: "An energy-efficient timber family house built to a high standard of thermal protection.",
  },
  "mladinski-center-trbovlje": {
    title: "Youth centre and hotel, Trbovlje",
    location: "Trbovlje",
    summary:
      "A partly buried building linking Revolution Square and 1 June Street. The walkable roof becomes a new public space. A youth centre with a hall and a hotel with 24 beds. 700 m², basement, ground and first floor.",
  },
  "parkirna-hisa-sallaumines": {
    title: "Sallaumines car park",
    location: "Zagorje ob Savi",
    summary:
      "A two-storey car park on a triangular plot between the Sallaumines pedestrian zone, Obrtniška cesta and a residential block. Separate access to the basement and the ground floor.",
  },
  "dvorana-bonifika": {
    title: "Bonifika sports hall",
    location: "Koper",
    summary: "Competition design for a multi-purpose sports hall at Bonifika.",
  },
  "hotel-tripoli": {
    title: "Hotel and rehabilitation centre, Tripoli",
    location: "Tripoli",
    summary: "A hotel and rehabilitation complex with a clear spatial hierarchy and open terraces.",
  },
  "bazen-libija": {
    title: "Olympic pool and wellness, Libya",
    location: "Libya",
    summary: "An indoor Olympic swimming complex with a wellness programme.",
  },
  "dvorana-tripoli": {
    title: "Multifunctional sports hall, Tripoli",
    location: "Tripoli",
    summary: "A multi-purpose sports hall with a swimming pool.",
  },
  "mercator-novo-mesto": {
    title: "Mercator shopping centre, Novo mesto",
    location: "Novo mesto",
    summary: "Design of a shopping centre with a clear traffic layout and a public edge.",
  },
  "objekt-mic": {
    title: "MIC building",
    location: "Slovenia",
    summary: "A commercial building with a strong façade rhythm and daylight drawn deep into the plan.",
  },
  "urbana-dnevna-soba": {
    title: "An urban living room in the countryside",
    location: "Slovenia",
    summary: "A house that combines private living with an open relationship to the landscape.",
  },
  dimnikcobau: {
    title: "Dimnikcobau offices",
    location: "Slovenia",
    summary: "Interior design and refurbishment of office space.",
  },
  "naselje-podcetrtek": {
    title: "Podčetrtek housing estate",
    location: "Podčetrtek",
    summary: "Urban and architectural design of a housing estate.",
  },
  "sola-trbovlje": {
    title: "Renovation of Revirski borci primary school",
    location: "Trbovlje",
    summary: "Refurbishment of a primary school, with better daylight and clearer circulation.",
  },
  "ptic-portoroz": {
    title: "PTIC student residence, Portorož",
    location: "Portorož",
    summary: "Refurbishment of the PTIC student residence and the interiors of the rooms.",
  },
  "sportna-loska-dolina": {
    title: "Loška dolina sports hall",
    location: "Loška dolina",
    summary: "Competition design for a sports hall in Loška dolina.",
  },
  "retail-kragujevac": {
    title: "Kragujevac retail centre",
    location: "Kragujevac",
    summary: "A shopping centre with clear vertical circulation and a public square.",
  },
  "sveta-gora": {
    title: "Funeral chapel, Zasavska Sveta gora",
    location: "Zasavje",
    summary: "A restrained public building at Zasavska Sveta gora.",
  },
  "blok-aurora": {
    title: "Aurora apartment block",
    location: "Slovenia",
    summary: "The Aurora residential block.",
  },
  "bazen-trbovlje": {
    title: "Trbovlje swimming pool",
    location: "Trbovlje",
    summary: "Design of a swimming complex in Trbovlje.",
  },
  "pilon-trbovlje": {
    title: "Pilon, Trbovlje",
    location: "Trbovlje",
    summary: "The Pilon commercial building in Trbovlje.",
  },
};

const copy = {
  sl: {
    langLabel: "Jezik",
    nav: [
      { href: "/#projekti", label: "Projekti" },
      { href: "/#storitve", label: "Storitve" },
      { href: "/#o-nas", label: "O nas" },
      { href: "/#kontakt", label: "Kontakt" },
    ],
    menuOpen: "Odpri meni",
    menuClose: "Zapri meni",
    kicker: "Arhitekturni biro · od 2006",
    heroTitleBefore: "Oblikujemo ",
    heroTitleEm: "prostore",
    heroTitleAfter: " z namenom",
    lede: "Center za arhitekturo, gradbeno projektiranje in celovite storitve — od ideje do izvedbe.",
    viewProjects: "Ogled projektov",
    getInTouch: "Stopite v stik",
    stats: [
      ["20", "Let izkušenj"],
      ["150+", "Projektov"],
      ["7", "Strokovnjakov"],
      ["A+", "Bonitetna ocena"],
    ] as const,
    projectsKicker: "Izbrani projekti",
    projectsTitle: "Prostor, ki govori zase",
    servicesKicker: "Kaj delamo",
    servicesTitle: "Celovite arhitekturne storitve",
    services: [
      ["01", "Projektna dokumentacija", "IDZ, DGD in PZI za zahtevne in manj zahtevne objekte — od ideje do izvedbe."],
      ["02", "Dokumentacija za OPPN", "Občinski podrobni prostorski načrti in pripadajoči elaborati."],
      ["03", "Oblikovanje interiera", "Celostna notranja oprema stanovanjskih in poslovnih prostorov."],
      ["04", "Gradbena dovoljenja", "Vodenje postopka do pravnomočnega gradbenega dovoljenja."],
      ["05", "Izvedbeni projekti", "Podrobna izvedbena dokumentacija za nemoteno delo na gradbišču."],
      ["06", "Projektantski nadzor", "Nadzor nad izvedbo in dokumentacija za prevzem objekta."],
    ] as const,
    aboutKicker: "O nas",
    aboutTitle: "Arhitektura z lokalnim značajem",
    aboutLead:
      "Fin Ars d.o.o. je arhitekturni biro, ki je nastal leta 2006 v Zagorju ob Savi. Vodji biroja sta Kristijan Čuk u.d.i.a., strokovni direktor, in Borut Dolar, poslovni direktor.",
    aboutTeam:
      "Ekipo sooblikujejo Urša Dirjec Meško, Irena Gorjup Gračner, Simon Škrbec, Dijana Subašič, Vladimir Mladenović in Špela Volaj.",
    newsKicker: "Novice",
    newsTitle: "Digitalna transformacija podjetja FIN ARS",
    newsBody:
      "Naložbo sofinancirata Republika Slovenija in Evropska unija iz Evropskega sklada za regionalni razvoj. Sofinanciranje operacije: do 100.000 €.",
    contactKicker: "Kontakt",
    contactTitle: "Pogovorimo se o vašem projektu",
    addressLabel: "Naslov",
    phoneLabel: "Telefon",
    emailLabel: "E-pošta",
    companyLabel: "Podatki podjetja",
    companyBody: "Davčna št.: SI 70790817\nMatična št.: 2144921000",
    nameLabel: "Ime in priimek",
    namePlaceholder: "Vaše ime",
    emailField: "E-pošta",
    emailPlaceholder: "vas@email.si",
    messageLabel: "Sporočilo",
    messagePlaceholder: "Opišite vaš projekt ali vprašanje...",
    send: "Pošlji sporočilo",
    sent: "Hvala, sporočilo je zabeleženo.",
    back: "Nazaj na projekte",
    authors: "Avtorji",
    footer: "Center za arhitekturo · Zagorje ob Savi",
    categories: {
      stanovanjsko: "stanovanjsko",
      javno: "javno",
      poslovno: "poslovno",
      šport: "šport",
      interier: "interier",
      urbanizem: "urbanizem",
    },
  },
  en: {
    langLabel: "Language",
    nav: [
      { href: "/#projekti", label: "Projects" },
      { href: "/#storitve", label: "Services" },
      { href: "/#o-nas", label: "About" },
      { href: "/#kontakt", label: "Contact" },
    ],
    menuOpen: "Open menu",
    menuClose: "Close menu",
    kicker: "Architecture studio · since 2006",
    heroTitleBefore: "We shape ",
    heroTitleEm: "spaces",
    heroTitleAfter: " with purpose",
    lede: "A studio for architecture, building design and complete services — from the first idea to completion.",
    viewProjects: "View projects",
    getInTouch: "Get in touch",
    stats: [
      ["20", "Years of practice"],
      ["150+", "Projects"],
      ["7", "Specialists"],
      ["A+", "Credit rating"],
    ] as const,
    projectsKicker: "Selected work",
    projectsTitle: "Space that speaks for itself",
    servicesKicker: "What we do",
    servicesTitle: "A complete architectural practice",
    services: [
      ["01", "Project documentation", "Concept, permit and construction drawings for demanding and simpler buildings — from the first idea to site."],
      ["02", "OPPN documentation", "Municipal detailed spatial plans and the studies that accompany them."],
      ["03", "Interior design", "Complete interiors for homes and workplaces."],
      ["04", "Building permits", "Managing the process through to a final building permit."],
      ["05", "Construction drawings", "Detailed documentation so work on site can proceed without interruption."],
      ["06", "Design supervision", "Supervision of construction and the documents needed to hand the building over."],
    ] as const,
    aboutKicker: "About",
    aboutTitle: "Architecture with a local character",
    aboutLead:
      "Fin Ars d.o.o. is an architecture studio founded in 2006 in Zagorje ob Savi. It is led by Kristijan Čuk, M.Arch., design director, and Borut Dolar, managing director.",
    aboutTeam:
      "The team includes Urša Dirjec Meško, Irena Gorjup Gračner, Simon Škrbec, Dijana Subašič, Vladimir Mladenović and Špela Volaj.",
    newsKicker: "News",
    newsTitle: "Digital transformation of FIN ARS",
    newsBody:
      "The investment is co-financed by the Republic of Slovenia and the European Union from the European Regional Development Fund. Co-financing of the operation: up to €100,000.",
    contactKicker: "Contact",
    contactTitle: "Let’s talk about your project",
    addressLabel: "Address",
    phoneLabel: "Phone",
    emailLabel: "Email",
    companyLabel: "Company details",
    companyBody: "Tax no.: SI 70790817\nReg. no.: 2144921000",
    nameLabel: "Full name",
    namePlaceholder: "Your name",
    emailField: "Email",
    emailPlaceholder: "you@email.com",
    messageLabel: "Message",
    messagePlaceholder: "Describe your project or question...",
    send: "Send message",
    sent: "Thank you. Your message has been noted.",
    back: "Back to projects",
    authors: "Authors",
    footer: "Centre for architecture · Zagorje ob Savi",
    categories: {
      stanovanjsko: "residential",
      javno: "public",
      poslovno: "commercial",
      šport: "sport",
      interier: "interior",
      urbanizem: "urbanism",
    },
  },
} as const;

type Copy = (typeof copy)[Locale];

type LocaleValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Copy;
};

const LocaleContext = createContext<LocaleValue | null>(null);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("sl");
  const persist = useRef(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "en" || saved === "sl") setLocaleState(saved);
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
    if (!persist.current) {
      persist.current = true;
      return;
    }
    localStorage.setItem(STORAGE_KEY, locale);
  }, [locale]);

  const value = useMemo<LocaleValue>(
    () => ({
      locale,
      setLocale: setLocaleState,
      t: copy[locale],
    }),
    [locale],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const value = useContext(LocaleContext);
  if (!value) throw new Error("useLocale must be used within LocaleProvider");
  return value;
}

export function localizeProject(project: Project, locale: Locale) {
  const category = copy[locale].categories[project.category];
  if (locale === "sl") {
    return {
      title: project.title,
      location: project.location,
      summary: project.summary,
      category,
    };
  }
  const en = enProjects[project.slug];
  return {
    title: en?.title ?? project.title,
    location: en?.location ?? project.location,
    summary: en?.summary ?? project.summary,
    category,
  };
}
