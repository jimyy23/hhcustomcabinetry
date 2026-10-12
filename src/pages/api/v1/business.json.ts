import type { APIRoute } from 'astro';
import { business } from '../../../data/site';

export const prerender = true;

export const GET: APIRoute = () => {
  const response = {
    name: business.name,
    website: business.siteUrl,
    serviceArea: 'Greater Toronto and Hamilton Area (GTHA)',
    services: ['Custom kitchens', 'Bathroom vanities', 'Custom built-ins and storage'],
    showroom: {
      address: business.address,
      directionsUrl: business.mapsUrl,
    },
    contact: {
      phone: business.phone,
      telephoneUri: business.phoneHref,
      email: business.email,
    },
    actions: {
      quoteUrl: business.quoteUrl,
      bookingUrl: business.bookingUrl,
      bookingNotice: 'A calendar selection is an appointment request only. A team member will follow up by email or phone to discuss the project and confirm the exact date and time.',
    },
    social: {
      instagram: business.instagramUrl,
      facebook: business.facebookUrl,
    },
  };

  return new Response(JSON.stringify(response, null, 2), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
};
