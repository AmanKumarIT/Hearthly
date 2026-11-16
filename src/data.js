// All sample content is placeholder. Each item is flagged on screen (FR-34).
export const BRAND = 'Hearthly'
export const CITY = 'Agra'
export const PHONE = '+910000000000'      // placeholder
export const WHATSAPP = 'https://wa.me/910000000000' // placeholder

export const MOVES = ['First home', 'Next chapter', 'Investment', 'Selling', 'Renting']

export const AREAS = [
  { id: 'sanjay-place', name: 'Sanjay Place', range: '₹55 L – ₹1.8 Cr', sum: ['Central, busy and well connected.', 'केंद्र में, व्यस्त और अच्छी कनेक्टिविटी।'], facts: ['Schools: good', 'Transit: great', 'Green: fair'] },
  { id: 'kamla-nagar', name: 'Kamla Nagar', range: '₹60 L – ₹2 Cr', sum: ['Leafy lanes, markets on your doorstep.', 'हरी गलियाँ, बाज़ार बिल्कुल पास।'], facts: ['Schools: great', 'Transit: good', 'Green: good'] },
  { id: 'sikandra', name: 'Sikandra', range: '₹40 L – ₹1.2 Cr', sum: ['Quieter streets with room to grow.', 'शांत गलियाँ, बढ़ने की जगह।'], facts: ['Schools: good', 'Transit: fair', 'Green: great'] },
  { id: 'taj-nagri', name: 'Taj Nagri Phase 2', range: '₹35 L – ₹95 L', sum: ['Planned colony living, family friendly.', 'योजनाबद्ध कॉलोनी, परिवार के अनुकूल।'], facts: ['Schools: good', 'Transit: fair', 'Green: good'] },
  { id: 'fatehabad-road', name: 'Fatehabad Road', range: '₹70 L – ₹2.5 Cr', sum: ['Hotels, cafés and quick highway access.', 'होटल, कैफ़े और हाईवे तक आसान पहुँच।'], facts: ['Schools: fair', 'Transit: great', 'Green: fair'] },
  { id: 'dayalbagh', name: 'Dayalbagh', range: '₹45 L – ₹1.4 Cr', sum: ['Calm, green and community minded.', 'शांत, हरा-भरा और मिलनसार।'], facts: ['Schools: great', 'Transit: fair', 'Green: great'] },
]

export const TYPES = [['flat', 'Flat', 'फ़्लैट'], ['house', 'House', 'घर'], ['bungalow', 'Bungalow', 'बंगला'], ['newbuild', 'New build', 'नया निर्माण']]

// buy = total price in ₹, rent = ₹ per month
export const LISTINGS = [
  { id: 'HP-101', intent: 'buy', area: 'sanjay-place', price: 7500000, beds: 3, baths: 2, sqft: 1450, type: 'flat', tag: 'New', title: 'Bright 3 BHK, lift and parking' },
  { id: 'HP-102', intent: 'buy', area: 'kamla-nagar', price: 12500000, beds: 4, baths: 3, sqft: 2400, type: 'house', title: 'Family home with a courtyard' },
  { id: 'HP-103', intent: 'buy', area: 'sikandra', price: 5200000, beds: 2, baths: 2, sqft: 1100, type: 'newbuild', tag: 'Reduced', title: 'Modern 2 BHK, ready to move' },
  { id: 'HP-104', intent: 'buy', area: 'dayalbagh', price: 9800000, beds: 3, baths: 3, sqft: 2000, type: 'bungalow', title: 'Quiet bungalow near parks' },
  { id: 'HP-105', intent: 'buy', area: 'taj-nagri', price: 4300000, beds: 2, baths: 1, sqft: 950, type: 'flat', title: 'Cosy first-home flat' },
  { id: 'HP-106', intent: 'buy', area: 'fatehabad-road', price: 21000000, beds: 5, baths: 4, sqft: 3600, type: 'bungalow', tag: 'New', title: 'Grand 5 BHK with terrace' },
  { id: 'HP-107', intent: 'buy', area: 'sanjay-place', price: 3600000, beds: 1, baths: 1, sqft: 620, type: 'flat', title: 'Smart 1 BHK for investors' },
  { id: 'HP-108', intent: 'buy', area: 'sikandra', price: 8400000, beds: 3, baths: 2, sqft: 1800, type: 'newbuild', title: 'Garden-facing new build' },
  { id: 'HP-201', intent: 'rent', area: 'kamla-nagar', price: 28000, beds: 2, baths: 2, sqft: 1050, type: 'flat', tag: 'New', title: 'Furnished 2 BHK' },
  { id: 'HP-202', intent: 'rent', area: 'fatehabad-road', price: 45000, beds: 3, baths: 3, sqft: 1700, type: 'flat', title: 'Spacious 3 BHK, gated' },
  { id: 'HP-203', intent: 'rent', area: 'dayalbagh', price: 18000, beds: 1, baths: 1, sqft: 600, type: 'flat', title: 'Peaceful 1 BHK' },
  { id: 'HP-204', intent: 'rent', area: 'sanjay-place', price: 65000, beds: 4, baths: 3, sqft: 2600, type: 'house', title: 'Independent house, 4 BHK' },
]

export const TEAM = [
  { name: 'Sarah Mitchell', role: ['First-time buyer specialist', 'पहली बार खरीदने वालों की विशेषज्ञ'], bio: ['A reassuring voice for all those “is this a silly question?” moments.', 'हर “क्या यह बेवकूफ़ी भरा सवाल है?” वाले पल में भरोसेमंद आवाज़।'], hue: 20 },
  { name: 'Adam Khan', role: ['Home mover & loan adviser', 'घर बदलने और लोन सलाहकार'], bio: ['Making the numbers make sense, so you can move with confidence.', 'आँकड़े समझाते हैं, ताकि आप भरोसे से आगे बढ़ें।'], hue: 210 },
  { name: 'Jessica Williams', role: ['Investment adviser', 'निवेश सलाहकार'], bio: ['A practical, down-to-earth approach to your next investment.', 'आपके अगले निवेश के लिए व्यावहारिक और सीधा तरीका।'], hue: 165 },
]
// Placeholder names mirror the reference; replace with real staff before launch.

export const COSTS = { effective: '2026-04-01', owner: 'Client compliance lead (to verify)', stamp: { first: 5, next: 7, extra: 8 }, reg: 1, legal: 0.5, survey: 0.15, broker: 0.5, moving: 40000 }

export const FAQ = [
  ['Do I need to have found a property first?', 'क्या मुझे पहले संपत्ति ढूँढनी होगी?', 'Not at all. Many people talk to us first so they know their budget before they start looking.'],
  ['How much deposit will I need?', 'मुझे कितना डाउन पेमेंट चाहिए होगा?', 'It varies by lender and property. Many buyers start with around 10–20%, and we will explain your options plainly.'],
  ['Is the first appointment really free?', 'क्या पहली अपॉइंटमेंट सच में मुफ़्त है?', 'Yes. Any adviser fee is explained before you go ahead, never after.'],
  ['Can you help if I’m self-employed?', 'क्या आप स्वरोज़गार वालों की मदद करते हैं?', 'Yes. Lenders look at income differently for self-employed people, and we know which ones to approach.'],
  ['Do I have to live in Agra?', 'क्या मुझे आगरा में रहना ज़रूरी है?', 'No. We are based in Agra, but we advise by phone and video wherever you are.'],
  ['Is the calculator a loan offer?', 'क्या कैलकुलेटर एक लोन ऑफ़र है?', 'No. It is an illustration using an example rate. Your real figures depend on the lender and your circumstances.'],
]
