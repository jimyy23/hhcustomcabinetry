import type { ImageMetadata } from 'astro';
import charcoalKitchen from '../assets/gallery/charcoal-kitchen-island.jpeg';
import sageKitchen from '../assets/gallery/sage-kitchen.jpeg';
import marbleKitchen from '../assets/gallery/marble-backsplash-kitchen.jpeg';
import illuminatedKitchen from '../assets/gallery/illuminated-kitchen-island.jpeg';
import roomDivider from '../assets/gallery/custom-room-divider.jpeg';
import mediaWall from '../assets/gallery/walnut-media-wall.jpeg';
import mudroom from '../assets/gallery/custom-mudroom.jpeg';
import twoToneKitchen from '../assets/gallery/two-tone-kitchen.jpeg';
import pantry from '../assets/gallery/tall-pantry-cabinet.jpeg';
import wineRoom from '../assets/gallery/wine-room.jpeg';
import displayCabinet from '../assets/gallery/display-cabinetry.jpeg';
import wineStorage from '../assets/gallery/custom-wine-storage.jpeg';
import navyVanity from '../assets/gallery/navy-vanity.jpeg';
import flutedVanity from '../assets/gallery/fluted-wood-vanity.jpeg';
import whitePeninsula from '../assets/gallery/white-kitchen-peninsula.jpeg';
import whiteSeating from '../assets/gallery/white-kitchen-seating.jpeg';
import blueGreyKitchen from '../assets/gallery/blue-grey-kitchen.jpeg';
import underStair from '../assets/gallery/under-stair-cabinet.jpeg';
import greenBar from '../assets/gallery/green-bar-cabinet.jpeg';
import whiteVanity from '../assets/gallery/white-bathroom-vanity.jpeg';
import whiteBuiltIn from '../assets/gallery/white-built-in.jpeg';
import dressingRoom from '../assets/gallery/custom-dressing-room.jpeg';
import glassBuiltIn from '../assets/gallery/glass-front-built-in.jpeg';
import traditionalKitchen from '../assets/gallery/traditional-kitchen.jpeg';

export interface GalleryItem { src: ImageMetadata; alt: string; label: string; }

export const galleryItems: GalleryItem[] = [
  { src: charcoalKitchen, alt: 'Charcoal custom kitchen with a marble island and brass faucet', label: 'Charcoal kitchen' },
  { src: flutedVanity, alt: 'Floating wood vanity with fluted drawer fronts and brass ring pulls', label: 'Fluted wood vanity' },
  { src: displayCabinet, alt: 'Illuminated dark wood display and beverage cabinetry', label: 'Display cabinetry' },
  { src: whiteSeating, alt: 'Bright white kitchen with a wood island and counter seating', label: 'Two-tone kitchen' },
  { src: dressingRoom, alt: 'White dressing room cabinetry with glass doors and a centre island', label: 'Dressing room' },
  { src: sageKitchen, alt: 'Soft sage-green kitchen cabinets with a marble range hood', label: 'Sage kitchen' },
  { src: mediaWall, alt: 'Wall-to-wall walnut media centre with open display shelves', label: 'Media wall' },
  { src: navyVanity, alt: 'Navy blue bathroom vanity between matching open shelves', label: 'Navy vanity' },
  { src: twoToneKitchen, alt: 'White and warm wood kitchen with a large waterfall island', label: 'Custom kitchen' },
  { src: wineRoom, alt: 'Custom wood wine room with a central bottle rack', label: 'Wine room' },
  { src: illuminatedKitchen, alt: 'Custom kitchen island with under-cabinet illumination', label: 'Illuminated island' },
  { src: greenBar, alt: 'Deep green bar cabinet with open shelving and a stone counter', label: 'Bar cabinetry' },
  { src: glassBuiltIn, alt: 'White glass-front built-in cabinets with drawers', label: 'Glass-front built-in' },
  { src: blueGreyKitchen, alt: 'Blue-grey kitchen cabinets with brass hardware and stone counters', label: 'Blue-grey kitchen' },
  { src: whiteBuiltIn, alt: 'White living room built-in with shelves and a low media cabinet', label: 'Living room built-in' },
  { src: mudroom, alt: 'Warm wood mudroom bench with hooks and tall storage', label: 'Mudroom storage' },
  { src: whitePeninsula, alt: 'White kitchen with a curved peninsula and black seating', label: 'Kitchen peninsula' },
  { src: underStair, alt: 'Custom wood cabinetry fitted beneath a staircase', label: 'Under-stair cabinetry' },
  { src: whiteVanity, alt: 'Long white bathroom vanity with tower cabinets and mirrored doors', label: 'Bathroom vanity' },
  { src: roomDivider, alt: 'Custom open wood shelving used as an architectural room divider', label: 'Room divider' },
  { src: wineStorage, alt: 'Wood beverage cabinetry with wine fridge and bottle cubbies', label: 'Beverage centre' },
  { src: pantry, alt: 'Floor-to-ceiling warm wood pantry and appliance cabinetry', label: 'Tall pantry' },
  { src: traditionalKitchen, alt: 'Traditional white kitchen with a dark island and glass cabinet doors', label: 'Traditional kitchen' },
  { src: marbleKitchen, alt: 'Dark kitchen cabinetry with a dramatic marble backsplash', label: 'Marble backsplash kitchen' },
];
