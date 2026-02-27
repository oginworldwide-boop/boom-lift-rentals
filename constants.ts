import { BoomLift, ContactInfo } from './types';

export const CONTACT_INFO: ContactInfo = {
  phone: "+91 98765 43210",
  email: "rentals@og-in.com",
  address: {
    en: "Mumbai, Maharashtra, India",
    hi: "मुंबई, महाराष्ट्र, भारत"
  }
};

export const BOOM_LIFTS: BoomLift[] = [
  {
    id: "860sj",
    model: "860SJ",
    brand: "JLG",
    platformHeight: "26.21 m (86 ft)",
    horizontalOutreach: "22.86 m (75 ft)",
    platformCapacity: "230 kg (500 lb)",
    weight: "16,465 kg",
    description: {
      en: "The JLG 860SJ telescopic boom lift features a fuel-efficient Tier 4 engine and provides a large work envelope. Rented with a certified professional operator for maximum safety.",
      hi: "JLG 860SJ टेलीस्कोपिक बूम लिफ्ट में ईंधन-कुशल टियर 4 इंजन है। अधिकतम सुरक्षा के लिए प्रमाणित पेशेवर ऑपरेटर के साथ किराये पर उपलब्ध।"
    },
    imageUrl: "./images/860sj.webp",
    features: {
      en: ["Includes Professional Operator", "Oscillating Axle", "Hydraulic Platform Rotation", "Tilt Light and Alarm"],
      hi: ["पेशेवर ऑपरेटर शामिल है", "दोलन धुरी (Oscillating Axle)", "हाइड्रोलिक प्लेटफॉर्म रोटेशन", "टिल्ट लाइट और अलार्म"]
    }
  },
  {
    id: "1200sjp",
    model: "1200SJP",
    brand: "JLG",
    platformHeight: "36.58 m (120 ft)",
    horizontalOutreach: "22.86 m (75 ft)",
    platformCapacity: "454 kg (1,000 lb)",
    weight: "18,552 kg",
    description: {
      en: "The 1200SJP offers the reach and capacity you need for demanding jobsites. All rentals include an experienced operator to ensure precision and safety.",
      hi: "1200SJP कठिन कार्यस्थलों के लिए आवश्यक पहुंच और क्षमता प्रदान करता है। सभी किराये में सटीकता और सुरक्षा सुनिश्चित करने के लिए एक अनुभवी ऑपरेटर शामिल है।"
    },
    imageUrl: "./images/1200sjp.webp",
    features: {
      en: ["Includes Professional Operator", "Dual Capacity", "Extendable Axles", "360 Degree Continuous Rotation"],
      hi: ["पेशेवर ऑपरेटर शामिल है", "दोहरी क्षमता", "विस्तार योग्य धुरी", "360 डिग्री निरंतर रोटेशन"]
    }
  },
  {
    id: "1350sjp",
    model: "1350SJP",
    brand: "JLG",
    platformHeight: "41.15 m (135 ft)",
    horizontalOutreach: "24.38 m (80 ft)",
    platformCapacity: "454 kg (1,000 lb)",
    weight: "20,411 kg",
    description: {
      en: "Go from the ground to 135 ft in under 95 seconds. The 1350SJP provides exceptional stability. Rented exclusively with our skilled operators.",
      hi: "95 सेकंड से भी कम समय में जमीन से 135 फीट ऊपर जाएं। 1350SJP असाधारण स्थिरता प्रदान करता है। विशेष रूप से हमारे कुशल ऑपरेटरों के साथ किराये पर उपलब्ध।"
    },
    imageUrl: "./images/1350sjp.webp",
    features: {
      en: ["Includes Professional Operator", "Fastest Lift Speed", "JibPLUS® Boom", "Four-Wheel Hydrostatic Drive"],
      hi: ["पेशेवर ऑपरेटर शामिल है", "सबसे तेज़ लिफ्ट गति", "JibPLUS® बूम", "फोर-व्हील हाइड्रोस्टेटिक ड्राइव"]
    }
  }
];

export const TRANSLATIONS = {
  en: {
    nav_call: "Call to Rent",
    hero_badge: "Premium Access Solutions",
    hero_title_1: "Reach Higher with",
    hero_title_2: "JLG Telescopic",
    hero_title_3: "Boom Lifts",
    hero_desc: "OG-IN Worldwide LLP provides India's most reliable fleet of high-altitude telescopic boom lifts. All equipment is rented with certified professional operators.",
    hero_cta_1: "Explore Fleet",
    hero_cta_2: "Why Choose Us",
    fleet_title: "Our Premium Fleet",
    fleet_desc: "Select from our range of high-performance JLG telescopic boom lifts, maintained to the highest international standards and operated by experts.",
    card_height: "Height",
    card_outreach: "Outreach",
    card_btn: "View Specifications",
    trust_title: "The OG-IN Advantage",
    trust_desc: "We provide the reliability and expert manpower your high-altitude projects demand.",
    trust_1_title: "Expert Operators",
    trust_1_desc: "Every rental includes a certified, highly-trained operator to manage the equipment safely.",
    trust_2_title: "Certified Safety",
    trust_2_desc: "All our JLG lifts undergo rigorous multi-point safety inspections before every deployment.",
    trust_3_title: "Pan-India Delivery",
    trust_3_desc: "Efficient logistics network to deliver equipment and operators to your jobsite anywhere in India.",
    trust_4_title: "Maximum Uptime",
    trust_4_desc: "Modern fleet with low operational hours ensures your project stays on schedule without delays.",
    cta_title: "Ready to start your project?",
    cta_desc: "Our experts are ready to help you choose the right equipment and operator for your needs. Call us now for a custom quote.",
    cta_hours: "Available Monday - Saturday, 9:00 AM - 7:00 PM",
    modal_tech_specs: "Technical Specs",
    modal_features: "Key Features",
    modal_rent_prompt: "Ready to rent this model?",
    modal_contact_desk: "Contact our rental desk",
    footer_desc: "India's premier destination for high-reach telescopic boom lift rentals with professional operators. Specializing in JLG equipment.",
    footer_links: "Quick Links",
    footer_contact: "Contact Us",
    footer_rights: "All rights reserved.",
    with_operator: "With Professional Operator"
  },
  hi: {
    nav_call: "किराये के लिए कॉल करें",
    hero_badge: "प्रीमियम एक्सेस सॉल्यूशंस",
    hero_title_1: "नई ऊंचाइयों तक पहुंचें",
    hero_title_2: "JLG टेलीस्कोपिक",
    hero_title_3: "बूम लिफ्ट्स",
    hero_desc: "OG-IN वर्ल्डवाइड LLP भारत का सबसे विश्वसनीय हाई-एल्टीट्यूड टेलीस्कोपिक बूम लिफ्ट बेड़ा प्रदान करता है। सभी उपकरण प्रमाणित पेशेवर ऑपरेटरों के साथ किराये पर दिए जाते हैं।",
    hero_cta_1: "बेड़ा देखें",
    hero_cta_2: "हमें क्यों चुनें",
    fleet_title: "हमारा प्रीमियम बेड़ा",
    fleet_desc: "उच्च प्रदर्शन वाले JLG टेलीस्कोपिक बूम लिफ्टों की हमारी श्रृंखला से चुनें, जो विशेषज्ञों द्वारा संचालित और उच्चतम मानकों पर बनाए रखे गए हैं।",
    card_height: "ऊंचाई",
    card_outreach: "पहुंच",
    card_btn: "विवरण देखें",
    trust_title: "OG-IN का लाभ",
    trust_desc: "हम वह विश्वसनीयता और विशेषज्ञ जनशक्ति प्रदान करते हैं जिसकी आपके प्रोजेक्ट को आवश्यकता है।",
    trust_1_title: "विशेषज्ञ ऑपरेटर",
    trust_1_desc: "प्रत्येक किराये में उपकरण को सुरक्षित रूप से प्रबंधित करने के लिए एक प्रमाणित, उच्च प्रशिक्षित ऑपरेटर शामिल है।",
    trust_2_title: "प्रमाणित सुरक्षा",
    trust_2_desc: "हमारे सभी JLG लिफ्ट हर तैनाती से पहले कठोर मल्टी-पॉइंट सुरक्षा निरीक्षण से गुजरते हैं।",
    trust_3_title: "अखिल भारतीय डिलीवरी",
    trust_3_desc: "भारत में कहीं भी आपके कार्यस्थल पर उपकरण और ऑपरेटर पहुंचाने के लिए कुशल रसद नेटवर्क।",
    trust_4_title: "अधिकतम अपटाइम",
    trust_4_desc: "कम परिचालन घंटों वाला आधुनिक बेड़ा सुनिश्चित करता है कि आपका प्रोजेक्ट बिना किसी देरी के समय पर रहे।",
    cta_title: "क्या आप अपना प्रोजेक्ट शुरू करने के लिए तैयार हैं?",
    cta_desc: "हमारे विशेषज्ञ आपकी आवश्यकताओं के लिए सही उपकरण और ऑपरेटर चुनने में आपकी मदद करने के लिए तैयार हैं।",
    cta_hours: "उपलब्ध: सोमवार - शनिवार, सुबह 9:00 - शाम 7:00",
    modal_tech_specs: "तकनीकी विनिर्देश",
    modal_features: "प्रमुख विशेषताएं",
    modal_rent_prompt: "इस मॉडल को किराये पर लेना चाहते हैं?",
    modal_contact_desk: "हमारे रेंटल डेस्क से संपर्क करें",
    footer_desc: "पेशेवर ऑपरेटरों के साथ हाई-रीच टेलीस्कोपिक बूम लिफ्ट किराये के लिए भारत का प्रमुख गंतव्य।",
    footer_links: "त्वरित लिंक",
    footer_contact: "संपर्क करें",
    footer_rights: "सर्वाधिकार सुरक्षित।",
    with_operator: "पेशेवर ऑपरेटर के साथ"
  }
};
