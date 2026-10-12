const PROTOCOL_VERSION = '2025-11-25';

const CONTACT = Object.freeze({
  businessName: 'H & H Custom Cabinetry',
  serviceArea: 'Greater Toronto and Hamilton Area (GTHA)',
  phone: '647-296-5035',
  telephoneUri: 'tel:+16472965035',
  email: 'info@hhcustomcabinetry.ca',
  showroomAddress: '3218 Wharton Way, Mississauga, ON L4X 2C1',
  showroomDirectionsUrl: 'https://g.page/r/Ca7gNl4WsWvhEBM/',
  quoteUrl: 'https://forms.gle/JT1WhXag7zr2zA6SA',
  appointmentRequestUrl: 'https://calendar.app.google/NGs2aarphHbUTMZJ6',
  appointmentNotice: 'A calendar selection is an appointment request only. H & H Custom Cabinetry will follow up by email or phone to discuss the project and confirm the exact date and time.',
});

const CONTACT_TOOL = Object.freeze({
  name: 'contact_us',
  title: 'Contact H & H Custom Cabinetry',
  description: 'Get verified contact details and official links to request a quote, request an appointment, or find the showroom. This tool returns information only and does not submit a form or confirm an appointment.',
  inputSchema: {
    type: 'object',
    properties: {
      preferredMethod: {
        type: 'string',
        enum: ['all', 'quote', 'appointment', 'phone', 'email', 'showroom'],
        default: 'all',
        description: 'Optional contact channel to highlight.',
      },
    },
    additionalProperties: false,
  },
  annotations: {
    title: 'Contact H & H Custom Cabinetry',
    readOnlyHint: true,
    destructiveHint: false,
    idempotentHint: true,
    openWorldHint: true,
  },
});

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Accept, Content-Type, MCP-Protocol-Version, MCP-Session-Id',
  'Access-Control-Expose-Headers': 'MCP-Protocol-Version',
  'Cache-Control': 'no-store',
};

const jsonResponse = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders,
      'Content-Type': 'application/json; charset=utf-8',
      'MCP-Protocol-Version': PROTOCOL_VERSION,
    },
  });

const result = (id, value) => ({ jsonrpc: '2.0', id, result: value });
const error = (id, code, message, data) => ({
  jsonrpc: '2.0',
  id: id ?? null,
  error: { code, message, ...(data === undefined ? {} : { data }) },
});

const contactResult = (preferredMethod = 'all') => {
  const highlights = {
    quote: { quoteUrl: CONTACT.quoteUrl },
    appointment: {
      appointmentRequestUrl: CONTACT.appointmentRequestUrl,
      appointmentNotice: CONTACT.appointmentNotice,
    },
    phone: { phone: CONTACT.phone, telephoneUri: CONTACT.telephoneUri },
    email: { email: CONTACT.email },
    showroom: {
      showroomAddress: CONTACT.showroomAddress,
      showroomDirectionsUrl: CONTACT.showroomDirectionsUrl,
    },
  };
  const highlighted = preferredMethod === 'all' ? CONTACT : highlights[preferredMethod];

  return {
    content: [
      {
        type: 'text',
        text: `${CONTACT.businessName} serves the ${CONTACT.serviceArea}. Call ${CONTACT.phone}, email ${CONTACT.email}, request a quote at ${CONTACT.quoteUrl}, request an appointment at ${CONTACT.appointmentRequestUrl}, or visit the showroom at ${CONTACT.showroomAddress}. ${CONTACT.appointmentNotice}`,
      },
    ],
    structuredContent: {
      preferredMethod,
      highlighted,
      contact: CONTACT,
    },
    isError: false,
  };
};

const handleMessage = (message) => {
  if (!message || message.jsonrpc !== '2.0' || typeof message.method !== 'string') {
    return error(message?.id, -32600, 'Invalid Request');
  }

  const isNotification = !Object.hasOwn(message, 'id');
  if (isNotification) return null;

  switch (message.method) {
    case 'initialize':
      return result(message.id, {
        protocolVersion: PROTOCOL_VERSION,
        capabilities: { tools: { listChanged: false } },
        serverInfo: {
          name: 'hh-custom-cabinetry-contact',
          title: 'H & H Custom Cabinetry Contact',
          version: '1.0.0',
        },
        instructions: 'Use the contact_us tool to retrieve verified public contact details and official inquiry links. Appointment selections are requests until confirmed by the business.',
      });

    case 'ping':
      return result(message.id, {});

    case 'tools/list':
      return result(message.id, { tools: [CONTACT_TOOL] });

    case 'tools/call': {
      if (message.params?.name !== CONTACT_TOOL.name) {
        return error(message.id, -32602, 'Unknown tool', { availableTools: [CONTACT_TOOL.name] });
      }

      const preferredMethod = message.params?.arguments?.preferredMethod ?? 'all';
      const allowedMethods = CONTACT_TOOL.inputSchema.properties.preferredMethod.enum;
      if (!allowedMethods.includes(preferredMethod)) {
        return error(message.id, -32602, 'Invalid preferredMethod', { allowedMethods });
      }

      return result(message.id, contactResult(preferredMethod));
    }

    default:
      return error(message.id, -32601, 'Method not found');
  }
};

export async function onRequest(context) {
  if (context.request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  if (context.request.method !== 'POST') {
    return new Response('MCP Streamable HTTP endpoint. Send JSON-RPC requests with POST.', {
      status: 405,
      headers: { ...corsHeaders, Allow: 'POST, OPTIONS', 'Content-Type': 'text/plain; charset=utf-8' },
    });
  }

  let payload;
  try {
    payload = await context.request.json();
  } catch {
    return jsonResponse(error(null, -32700, 'Parse error'), 400);
  }

  if (Array.isArray(payload)) {
    if (payload.length === 0) return jsonResponse(error(null, -32600, 'Invalid Request'), 400);
    const responses = payload.map(handleMessage).filter(Boolean);
    return responses.length === 0
      ? new Response(null, { status: 202, headers: corsHeaders })
      : jsonResponse(responses);
  }

  const response = handleMessage(payload);
  return response === null
    ? new Response(null, { status: 202, headers: corsHeaders })
    : jsonResponse(response);
}
