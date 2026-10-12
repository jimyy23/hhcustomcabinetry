# H & H Custom Cabinetry public API

This read-only API publishes verified business information for search engines, assistants, and other automated clients. It does not accept project submissions and does not require authentication.

## Endpoints

### `GET /api/v1/business.json`

Returns the business name, service area, showroom and contact details, services, official project links, and social profiles.

### `GET /api/status.json`

Returns the availability status of the static public API.

## Project actions

Use the `quoteUrl` returned by the business endpoint to open the official quote form. Use `bookingUrl` to open the appointment-request calendar. A calendar selection is a request only; H & H Custom Cabinetry will follow up by email or phone to confirm the client's needs and exact date and time.

The API is described by [OpenAPI 3.1](https://hhcustomcabinetry.ca/openapi.json) and advertised in the [RFC 9727 API catalog](https://hhcustomcabinetry.ca/.well-known/api-catalog).
