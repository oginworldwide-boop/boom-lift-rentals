import type { BoomLift, ContactInfo } from './types';

export const CONTACT_INFO: ContactInfo = {
  phone: "+91 92210 28139",
  phone2: "+91 93245 25581",
  // Confirmed by the client on 2026-10-03.
  whatsapp: "+91 93245 25581",
  email: "oginworldwide@gmail.com",
  // Registered office, supplied by the client on 2026-10-03.
  address: {
    street: "Green Avenue, Bungalow No. 2",
    locality: "Mira Road East",
    city: "Thane",
    region: "Maharashtra",
    postalCode: "401107",
    country: "India"
  },
  // Placeholders until the client supplies them. The footer company-details line
  // renders only when a value is set.
  gstin: "",
  llpin: ""
};

// Names only, with the client's permission (2026-10-03). No logos, quotes or
// project details: those need separate permission.
export const CLIENTS = ["Godrej", "Reliance", "Vedanta Power", "Bokaro Steel"];

export const BOOM_LIFTS: BoomLift[] = [
  {
    id: "660sj",
    slug: "jlg-660sj",
    model: "660SJ",
    brand: "JLG",
    platformHeight: "20.12 m (66 ft)",
    horizontalOutreach: "17.30 m (56 ft 9 in)",
    platformCapacity: "230 kg (500 lb)",
    weight: "11,476 kg",
    heightM: 20.12,
    outreachM: 17.30,
    capacityKg: 230,
    weightKg: 11476,
    nominalHeightFt: 66,
    description: "JLG 660SJ telescopic boom lift. Hired with a certified operator.",
    imageUrl: "/images/660sj.webp",
    imageWidth: 1080,
    imageHeight: 1080,
    features: ["Certified operator included", "Oscillating axle"]
  },
  {
    id: "860sj",
    slug: "jlg-860sj",
    model: "860SJ",
    brand: "JLG",
    platformHeight: "26.21 m (86 ft)",
    horizontalOutreach: "22.86 m (75 ft)",
    platformCapacity: "230 kg (500 lb)",
    weight: "16,465 kg",
    heightM: 26.21,
    outreachM: 22.86,
    capacityKg: 230,
    weightKg: 16465,
    nominalHeightFt: 86,
    description: "JLG 860SJ telescopic boom lift. Hired with a certified operator.",
    imageUrl: "/images/860sj.webp",
    imageWidth: 1600,
    imageHeight: 1200,
    features: ["Certified operator included", "Oscillating axle", "Hydraulic platform rotation", "Tilt light and alarm"]
  },
  {
    id: "1200sjp",
    slug: "jlg-1200sjp",
    model: "1200SJP",
    brand: "JLG",
    platformHeight: "36.58 m (120 ft)",
    horizontalOutreach: "22.86 m (75 ft)",
    platformCapacity: "454 kg (1,000 lb)",
    weight: "18,552 kg",
    heightM: 36.58,
    outreachM: 22.86,
    capacityKg: 454,
    weightKg: 18552,
    nominalHeightFt: 120,
    description: "JLG 1200SJP telescopic boom lift with dual capacity rating and drive-out extendable axles. Hired with a certified operator.",
    imageUrl: "/images/1200sjp.webp",
    imageWidth: 1600,
    imageHeight: 1200,
    features: ["Certified operator included", "Dual capacity rating", "Extendable axles", "360° continuous turntable rotation"]
  },
  {
    id: "1350sjp",
    slug: "jlg-1350sjp",
    model: "1350SJP",
    brand: "JLG",
    platformHeight: "41.15 m (135 ft)",
    horizontalOutreach: "24.38 m (80 ft)",
    platformCapacity: "454 kg (1,000 lb)",
    weight: "20,411 kg",
    heightM: 41.15,
    outreachM: 24.38,
    capacityKg: 454,
    weightKg: 20411,
    nominalHeightFt: 135,
    description: "JLG 1350SJP telescopic boom lift with dual capacity rating. Hired with a certified operator.",
    imageUrl: "/images/1350sjp.webp",
    imageWidth: 1600,
    imageHeight: 1200,
    features: ["Certified operator included", "Dual capacity rating", "Full-time four-wheel drive"]
  },
  {
    id: "1500sj",
    slug: "jlg-1500sj",
    model: "1500SJ",
    brand: "JLG",
    platformHeight: "45.72 m (150 ft)",
    horizontalOutreach: "24.38 m (80 ft)",
    platformCapacity: "454 kg (1,000 lb)",
    weight: "22,000 kg",
    heightM: 45.72,
    outreachM: 24.38,
    capacityKg: 454,
    weightKg: 22000,
    nominalHeightFt: 150,
    description: "JLG 1500SJ telescopic boom lift with telescoping jib and dual capacity rating. Hired with a certified operator.",
    imageUrl: "/images/1500sj.webp",
    imageWidth: 1600,
    imageHeight: 1200,
    features: ["Certified operator included", "Telescoping jib", "Dual capacity rating"]
  },
  {
    id: "s60j",
    slug: "genie-s60j",
    model: "S-60 J",
    brand: "Genie",
    platformHeight: "18.50 m (60 ft 8 in)",
    horizontalOutreach: "12.30 m (40 ft 5 in)",
    platformCapacity: "300 kg (660 lb)",
    weight: "7,550 kg",
    heightM: 18.50,
    outreachM: 12.30,
    capacityKg: 300,
    weightKg: 7550,
    nominalHeightFt: 60,
    description: "Genie S-60 J telescopic boom lift. Hired with a certified operator.",
    imageUrl: "/images/s60j.webp",
    imageWidth: 2000,
    imageHeight: 2000,
    features: ["Certified operator included", "Active oscillating axle", "Low transport weight"]
  },
  {
    id: "s85xc",
    slug: "genie-s85xc",
    model: "S-85 XC",
    brand: "Genie",
    platformHeight: "25.91 m (85 ft)",
    horizontalOutreach: "22.71 m (74 ft 6 in)",
    platformCapacity: "454 kg (1,000 lb)",
    weight: "18,000 kg",
    heightM: 25.91,
    outreachM: 22.71,
    capacityKg: 454,
    weightKg: 18000,
    nominalHeightFt: 85,
    description: "Genie S-85 XC telescopic boom lift with dual capacity rating. Hired with a certified operator.",
    imageUrl: "/images/s85xc.webp",
    imageWidth: 750,
    imageHeight: 1428,
    features: ["Certified operator included", "Dual capacity (300/454 kg)", "Active oscillating axle"]
  }
];

// Approved copy (copy-draft 2026-10-03). Every {placeholder} is filled in code by
// fill() in src/fleet.ts from BOOM_LIFTS / CONTACT_INFO; a placeholder it cannot
// fill fails the build. No figure or phone number is typed into these strings.
export const TRANSLATIONS = {
  nav_call: "Call",
  nav_contact: "Contact",

  // Hero
  hero_eyebrow: "JLG and Genie telescopic boom lifts · operator included",
  hero_h1: "Boom lift rental in Mumbai and pan-India, operator included",
  hero_subhead: "{fleetCount} telescopic boom lifts (manlifts) from {minHeightFt} ft to {maxHeightFt} ft platform height, up to {maxCapacityKg} kg on the platform. A certified operator comes with every machine. Pricing is by quote.",
  hero_cta_1: "See the fleet",

  // Spec strip under the hero
  strip_height_label: "Platform height",
  strip_height_value: "{minHeightFt}–{maxHeightFt} ft",
  strip_capacity_label: "Platform capacity",
  strip_capacity_value: "Up to {maxCapacityKg} kg",
  strip_fleet_label: "Fleet",
  strip_fleet_value: "{fleetCount} machines · JLG, Genie",
  strip_operator_label: "Operator",
  strip_operator_value: "Included, certified",
  strip_area_label: "Area",
  strip_area_value: "Pan-India from Mumbai",
  strip_pricing_label: "Pricing",
  strip_pricing_value: "By quote",

  fleet_title: "Boom lift fleet",
  fleet_desc: "{fleetCount} JLG and Genie telescopic boom lifts, {minHeightFt}–{maxHeightFt} ft platform height. Every machine is hired with a certified operator.",

  // Spec labels
  spec_model: "Model",
  card_height: "Platform height",
  card_outreach: "Horizontal outreach",
  spec_capacity: "Platform capacity",
  spec_weight: "Machine weight",
  lift_type: "Telescopic boom lift",
  card_btn: "Specs and quote",

  trust_title: "What you get",
  trust_desc: "Four facts about every OG-IN hire.",
  trust_1_title: "Certified operator included",
  trust_1_desc: "Every machine is hired with a certified operator who runs it on your site. The operator is part of the hire, not an add-on.",
  trust_2_title: "Up to {maxHeightFt} ft platform height",
  trust_2_desc: "{highReachCount} machines work above 100 ft: {highReachHeightsFt} ft platform height.",
  trust_3_title: "Pan-India from Mumbai",
  trust_3_desc: "Based in Mumbai. Machines and operators are hired to sites across India. Tell us the site location when you enquire.",
  trust_4_title: "Up to {maxCapacityKg} kg on the platform",
  trust_4_desc: "Room for people, tools and materials. Each machine's rated capacity is on its spec page.",

  steps_title: "How hiring works",
  step_1_title: "1. Send the job details",
  step_1_desc: "Call, WhatsApp or use the quote form. Tell us the working height, site location and dates.",
  step_2_title: "2. Get a quote",
  step_2_desc: "We confirm which machine fits the job and send a quote for your dates.",
  step_3_title: "3. Machine arrives with its operator",
  step_3_desc: "The boom lift comes to your site with a certified operator who runs it for the hire.",

  clients_label: "Clients include",

  highreach_title: "Work above 100 ft",
  highreach_desc: "{highReachCount} JLG telescopic booms at {highReachHeightsFt} ft platform height, up to {maxCapacityKg} kg on the platform, each hired with a certified operator.",
  // Link text for /high-reach-boom-lift-rental/; rendered once that page exists.
  highreach_link: "High-reach boom lifts",

  cta_title: "Send the height and the site",
  cta_desc: "Tell us the working height, site location, start date and duration. We will suggest a machine from the fleet and send a quote.",
  cta_hours: "Mon–Sat, 9:00 AM–7:00 PM",

  spec_heading: "Specifications",
  features_heading: "Features",
  modal_rent_prompt: "Hire the {lift.brand} {lift.model} with operator",
  modal_contact_desk: "Get a quote by phone, WhatsApp or the form",
  with_operator: "Certified operator included",

  // CTA labels
  cta_whatsapp: "WhatsApp",
  cta_whatsapp_long: "WhatsApp us",
  cta_call: "Call",
  cta_call_long: "Call {phone}",
  cta_quote: "Get a quote",
  cta_whatsapp_aria: "Message us on WhatsApp",
  cta_call_aria: "Call us at {phone}",
  wa_prefill_generic: "Hello OG-IN, I need a boom lift. Working height: ___ Site location: ___ Start date: ___ Duration: ___",
  wa_prefill_lift: "Hello OG-IN, I'd like a quote for the {lift.brand} {lift.model} with operator. Site location: ___ Start date: ___ Duration: ___",

  // FAQ: visible on the home page. Strings are paragraphs, arrays are bullet lists,
  // [text](/path/) is a link. No FAQPage schema.
  faq: [
    { q: "Is an operator included?", a: ["Yes. Every machine is hired with a certified operator who runs it on your site. We do not hire machines without an operator."] },
    { q: "Which machines do you have, and how high do they reach?", a: ["{fleetCount} JLG and Genie telescopic boom lifts, from {minHeightFt} ft to {maxHeightFt} ft platform height, with up to {maxCapacityKg} kg platform capacity. The [fleet page](/fleet/) lists platform height, horizontal outreach, capacity and weight for each machine."] },
    { q: "How much does it cost?", a: ["Pricing is by quote. We do not publish a rate card. Send the machine (or the height you need), the site location, the start date and the duration, and we will send a quote for that job."] },
    { q: "Which areas do you cover?", a: ["We are based in Mumbai and hire pan-India. Tell us the site city when you enquire."] },
    {
      q: "How do I enquire, and what should I send?",
      a: [
        "Call, WhatsApp, or use the [quote form](/#quote). To get a quote quickly, send:",
        [
          "working height needed (or the machine, if you know it)",
          "site location",
          "start date and duration",
          "ground conditions: concrete, soil, slab or slope",
          "anything that limits access or reach, such as a gate, canopy, overhead cables or a podium",
        ],
        "Photos of the work area on WhatsApp help.",
      ],
    },
    { q: "Is a manlift the same as a boom lift?", a: ["On many Indian sites, \"manlift\" means any powered platform that lifts people. A telescopic boom lift is one type of manlift. Every OG-IN machine is a telescopic boom lift."] },
  ] as { q: string; a: (string | string[])[] }[],

  // Quote form (Netlify Forms)
  form_title: "Get a quote",
  form_intro: "Send the job details. We reply by phone or WhatsApp during working hours, Mon–Sat, 9:00 AM–7:00 PM.",
  form_name: "Your name",
  form_phone: "Phone (WhatsApp if possible)",
  form_phone_help: "We use this number to send the quote.",
  form_company: "Company (optional)",
  form_machine: "Machine",
  form_machine_unsure: "Not sure, help me choose",
  form_machine_help: "Not sure? Tell us the working height you need under Site conditions.",
  form_city: "Site city",
  form_city_help: "City or town, and the area if you know it.",
  form_start: "Start date",
  form_duration: "Duration",
  form_duration_opts: ["1–3 days", "Up to 1 week", "Up to 1 month", "Longer than 1 month", "Not sure yet"],
  form_conditions: "Site conditions (optional)",
  form_conditions_help: "Working height needed, what you are reaching (facade, roof, steelwork), ground (concrete, soil, slab), gate width, anything overhead.",
  form_required: "Required",
  form_submit: "Send enquiry",
  // Draft continues "See the privacy policy." -- appended, linked, once /privacy/ exists.
  form_privacy_note: "We use these details only to reply to this enquiry.",

  // /quote/thanks/
  thanks_title: "Enquiry received",
  thanks_body: "We have your details. We will contact you by phone or WhatsApp during working hours, Mon–Sat, 9:00 AM–7:00 PM.",
  thanks_urgent: "If the job can't wait, call {phone} or message us on WhatsApp.",
  thanks_back: "Back to the fleet",

  // /contact/
  contact_title: "Contact OG-IN Worldwide",
  contact_intro: "Boom lift rental enquiries by phone, WhatsApp or the quote form. Mon–Sat, 9:00 AM–7:00 PM.",
  contact_office_label: "Registered office",
  contact_email_label: "Email",
  contact_map_link: "Open in Google Maps",

  // Footer
  footer_desc: "OG-IN Worldwide LLP hires out JLG and Genie telescopic boom lifts, {minHeightFt}–{maxHeightFt} ft platform height, with a certified operator on every hire. Based in Mumbai, working pan-India.",
  footer_links: "Pages",
  footer_contact: "Contact",
  footer_address_label: "Registered office",
  footer_hours: "Mon–Sat, 9:00 AM–7:00 PM",
  // Rendered once /privacy/ exists.
  footer_privacy: "Privacy policy",
  footer_rights: "All rights reserved.",
};
