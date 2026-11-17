// ============================================================
//  ALL IMAGE LOCATIONS LIVE HERE. Change an address below and the
//  site updates. Nothing else needs editing.
//
//  An address can be:
//    - a file inside the /public folder, e.g. '/images/my-photo.jpg'
//    - a full web link, e.g. 'https://example.com/photo.jpg'
//  Tip: the current files are illustrated placeholders (SVG).
// ============================================================

export const IMAGES = {
  // Big picture behind the home page headline
  hero: '/image/hero.jpg',

  // Property cards. One image per listing ID (see LISTINGS in data.js)
  listings: {
    'HP-101': '/image/listings/HP-101.jpg',
    'HP-102': '/image/listings/HP-102.jpg',
    'HP-103': '/image/listings/HP-103.jpg',
    'HP-104': '/image/listings/HP-104.jpg',
    'HP-105': '/image/listings/HP-105.jpg',
    'HP-106': '/image/listings/HP-106.jpg',
    'HP-107': '/image/listings/HP-107.jpg',
    'HP-108': '/image/listings/HP-108.jpg',
    'HP-201': '/image/listings/HP-201.jpg',
    'HP-202': '/image/listings/HP-202.jpg',
    'HP-203': '/image/listings/HP-203.jpg',
    'HP-204': '/image/listings/HP-204.jpg',
  },

  // Neighbourhood cards. One image per area ID (see AREAS in data.js)
  areas: {
    'sanjay-place': '/image/areas/sanjay-place.jpg',
    'kamla-nagar': '/image/areas/kamla-nagar.jpg',
    'sikandra': '/image/areas/sikandara.jpg',
    'taj-nagri': '/image/areas/taj-nagri.jpg',
    'fatehabad-road': '/image/areas/fatehabad-road.jpg',
    'dayalbagh': '/image/areas/dayalbagh.jpg',
  },

  // Adviser portraits, in the same order as TEAM in data.js
  team: [
    '/image/team/advisor-1.jpg',
    '/image/team/adviser-2.jpg',
    '/image/team/adviser-3.jpg',
  ],

  // Client story cards, in order
  stories: [
    '/image/stories/story-1.jpg',
    '/image/stories/story-2.jpg',
    '/image/stories/story-3.jpg',
  ],

  // Resource article cards, in order
  resources: [
    '/image/resources/article-1.jpg',
    '/image/resources/article-2.jpg',
    '/image/resources/article-3.jpg',
  ],
}
