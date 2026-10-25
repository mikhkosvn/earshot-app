import { AgentProvider } from '@/generated/prisma/enums';

export const IntegrationFieldKind = {
  text: 'text',
  secret: 'secret',
  select: 'select',
} as const;

export type IntegrationFieldKind =
  (typeof IntegrationFieldKind)[keyof typeof IntegrationFieldKind];

export const IntegrationFieldTarget = {
  agentId: 'agentId',
  apiKey: 'apiKey',
  config: 'config',
} as const;

export type IntegrationFieldTarget =
  (typeof IntegrationFieldTarget)[keyof typeof IntegrationFieldTarget];

export const TelephonySupport = {
  none: 'none',
  optional: 'optional',
  preselected: 'preselected',
} as const;

export type TelephonySupport =
  (typeof TelephonySupport)[keyof typeof TelephonySupport];

export type IntegrationFieldOption = {
  value: string;
  label: string;
};

export type IntegrationField = {
  target: IntegrationFieldTarget;
  configKey?: string;
  kind: IntegrationFieldKind;
  label: string;
  required: boolean;
  placeholder?: string;
  description?: string;
  options?: IntegrationFieldOption[];
};

export type ProviderIntegration = {
  telephony: TelephonySupport;
  fields: IntegrationField[];
  autoImportDescription?: string;
  autoSyncDescription?: string;
  postConversationMetadata: boolean;
};

export const PROVIDER_TILE_ORDER: AgentProvider[] = [
  AgentProvider.custom,
  AgentProvider.livekit,
  AgentProvider.pipecat,
  AgentProvider.elevenlabs,
  AgentProvider.retell,
  AgentProvider.vapi,
  AgentProvider.cisco,
  AgentProvider.bland,
  AgentProvider.synthflow,
  AgentProvider.koreai,
  AgentProvider.genesys,
  AgentProvider.gemini_cx,
  AgentProvider.amazon_connect,
  AgentProvider.agentforce,
  AgentProvider.sierra,
  AgentProvider.telnyx,
  AgentProvider.assemblyai,
  AgentProvider.agora,
];

export const CREDENTIAL_CHECK_PROVIDERS: AgentProvider[] = [
  AgentProvider.vapi,
  AgentProvider.retell,
  AgentProvider.elevenlabs,
];

export const RECONFIGURE_PROVIDERS: AgentProvider[] = [
  AgentProvider.vapi,
  AgentProvider.retell,
  AgentProvider.elevenlabs,
  AgentProvider.synthflow,
  AgentProvider.bland,
];

const US_REGION_OPTIONS: IntegrationFieldOption[] = [
  { value: 'us', label: 'US (default)' },
  { value: 'eu', label: 'EU' },
];

const assistantIdField = (
  label: string,
  placeholder: string,
  description?: string,
): IntegrationField => ({
  target: IntegrationFieldTarget.agentId,
  kind: IntegrationFieldKind.text,
  label,
  required: true,
  placeholder,
  description,
});

const apiKeyField = (
  label: string,
  description?: string,
): IntegrationField => ({
  target: IntegrationFieldTarget.apiKey,
  kind: IntegrationFieldKind.secret,
  label,
  required: true,
  description,
});

const configField = (
  configKey: string,
  label: string,
  options: Partial<IntegrationField> = {},
): IntegrationField => ({
  target: IntegrationFieldTarget.config,
  configKey,
  kind: IntegrationFieldKind.text,
  label,
  required: false,
  ...options,
});

const autoFetchDescription = (providerName: string) =>
  `Automatically fetch calls from ${providerName} API every 30 seconds for production monitoring.`;

const redactOnly: ProviderIntegration = {
  telephony: TelephonySupport.optional,
  fields: [],
  postConversationMetadata: false,
};

export const PROVIDER_INTEGRATIONS: Record<AgentProvider, ProviderIntegration> =
  {
    [AgentProvider.custom]: {
      telephony: TelephonySupport.optional,
      fields: [
        {
          target: IntegrationFieldTarget.agentId,
          kind: IntegrationFieldKind.text,
          label: 'External Assistant ID',
          required: false,
          placeholder: 'Enter External Assistant ID',
          description:
            'Your external assistant or agent identifier. Used to link Earshot runs to calls on your system.',
        },
      ],
      postConversationMetadata: true,
    },
    [AgentProvider.vapi]: {
      telephony: TelephonySupport.optional,
      fields: [
        assistantIdField(
          'VAPI Assistant ID',
          'Enter VAPI Assistant ID',
          'Your VAPI Assistant ID.',
        ),
        apiKeyField(
          'VAPI Private API Key',
          'Required for all VAPI operations — calls and testing.',
        ),
      ],
      autoImportDescription: 'Pull calls from VAPI every 30 seconds.',
      autoSyncDescription: 'Refresh the prompt from VAPI every 5 minutes.',
      postConversationMetadata: false,
    },
    [AgentProvider.retell]: {
      telephony: TelephonySupport.optional,
      fields: [
        assistantIdField('Assistant ID', 'agent_xxx'),
        apiKeyField('Retell API key'),
      ],
      autoImportDescription: autoFetchDescription('Retell'),
      postConversationMetadata: false,
    },
    [AgentProvider.elevenlabs]: {
      telephony: TelephonySupport.optional,
      fields: [
        assistantIdField('Assistant ID', 'ElevenLabs agent ID'),
        apiKeyField('ElevenLabs API key'),
        configField('region', 'API Region', {
          kind: IntegrationFieldKind.select,
          options: US_REGION_OPTIONS,
        }),
      ],
      autoImportDescription: autoFetchDescription('ElevenLabs'),
      postConversationMetadata: false,
    },
    [AgentProvider.bland]: {
      telephony: TelephonySupport.optional,
      fields: [
        assistantIdField(
          'Assistant or Pathway ID',
          'Bland persona or pathway ID',
        ),
        apiKeyField('Bland AI API key'),
      ],
      autoImportDescription: autoFetchDescription('Bland AI'),
      postConversationMetadata: false,
    },
    [AgentProvider.synthflow]: {
      telephony: TelephonySupport.optional,
      fields: [
        assistantIdField('Assistant ID', 'Synthflow agent ID'),
        apiKeyField('Synthflow API key'),
      ],
      postConversationMetadata: false,
    },
    [AgentProvider.agentforce]: {
      telephony: TelephonySupport.optional,
      fields: [
        assistantIdField('Agent ID', 'Agentforce agent ID (0Xx…)'),
        apiKeyField('Agentforce Client Secret'),
        configField('clientId', 'Agentforce Client ID', {
          required: true,
          placeholder: 'Enter Agentforce Client ID',
        }),
        configField('domain', 'Agentforce Domain', {
          required: true,
          placeholder: 'https://example.my.salesforce.com',
        }),
      ],
      autoImportDescription: autoFetchDescription('Agentforce'),
      postConversationMetadata: false,
    },
    [AgentProvider.cisco]: {
      telephony: TelephonySupport.preselected,
      fields: [],
      autoImportDescription: 'Pull calls from Webex every 30 seconds.',
      postConversationMetadata: false,
    },
    [AgentProvider.genesys]: {
      telephony: TelephonySupport.preselected,
      fields: [
        apiKeyField('Genesys Client Secret'),
        configField('clientId', 'Genesys Client ID', { required: true }),
        configField('region', 'Genesys Region', { required: true }),
      ],
      postConversationMetadata: false,
    },
    [AgentProvider.gemini_cx]: {
      telephony: TelephonySupport.preselected,
      fields: [
        configField(
          'readerServiceAccountEmail',
          'Reader service account email',
          {
            required: true,
            placeholder: 'reader@your-project.iam.gserviceaccount.com',
          },
        ),
        configField('location', 'Location', {
          required: true,
          placeholder: 'us-central1 or global',
        }),
        configField('gcpProjectId', 'GCP Project ID', {
          placeholder: 'Optional — taken from the service account email',
        }),
        configField('cxAgentId', 'CX Agent ID', {
          placeholder: "Optional — the agent's id in CX Agent Studio",
        }),
      ],
      postConversationMetadata: false,
    },
    [AgentProvider.telnyx]: {
      telephony: TelephonySupport.optional,
      fields: [
        {
          target: IntegrationFieldTarget.agentId,
          kind: IntegrationFieldKind.text,
          label: 'Telnyx Assistant ID',
          required: false,
          placeholder: 'Enter Telnyx Assistant ID',
          description:
            'Your Telnyx AI Assistant ID. Used to link Earshot runs to your Telnyx assistant.',
        },
        apiKeyField('Telnyx API Key'),
      ],
      postConversationMetadata: false,
    },
    [AgentProvider.assemblyai]: {
      telephony: TelephonySupport.preselected,
      fields: [
        assistantIdField(
          'AssemblyAI Agent ID',
          'agent_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          'The id of your stored AssemblyAI voice agent. Used to find the call and fetch its transcript and tool calls after each run.',
        ),
        apiKeyField('AssemblyAI API Key'),
        configField('region', 'Region', {
          kind: IntegrationFieldKind.select,
          options: US_REGION_OPTIONS,
          description:
            'The AssemblyAI deployment your agent lives in. Agents, phone numbers and calls are separate per region; phone agents are US-hosted.',
        }),
      ],
      postConversationMetadata: false,
    },
    [AgentProvider.agora]: {
      telephony: TelephonySupport.none,
      fields: [
        configField('sessionEndpointUrl', 'Session Endpoint URL', {
          required: true,
          placeholder: 'https://your-host/earshot/v1/sessions',
          description:
            'Earshot sends a POST request to this endpoint per run to mint the Agora channel + token. It must return agora_app_id, agora_channel, agora_token (and optional encryption fields).',
        }),
        configField('requestMethod', 'Request Method', {
          kind: IntegrationFieldKind.select,
          options: [
            { value: 'POST', label: 'POST' },
            { value: 'GET', label: 'GET' },
          ],
          description:
            'HTTP method Earshot uses to call the session endpoint. Defaults to POST.',
        }),
        configField('clientId', 'Client ID', {
          required: true,
          description: 'Sent in the request body to the session endpoint.',
        }),
        apiKeyField(
          'Secret',
          'Sent in the secret header when calling the session endpoint. Stored encrypted.',
        ),
        configField('secretHeaderName', 'Secret Header Name (Optional)', {
          placeholder: 'X-Earshot-Secret',
          description:
            'Header that carries the secret. Defaults to X-Earshot-Secret.',
        }),
      ],
      postConversationMetadata: false,
    },
    [AgentProvider.koreai]: redactOnly,
    [AgentProvider.amazon_connect]: redactOnly,
    [AgentProvider.livekit]: redactOnly,
    [AgentProvider.pipecat]: redactOnly,
    [AgentProvider.sierra]: {
      telephony: TelephonySupport.none,
      fields: [],
      postConversationMetadata: false,
    },
    [AgentProvider.smallest]: redactOnly,
  };
