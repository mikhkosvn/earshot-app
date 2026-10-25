export const OBSERVE_PATH = '/api/observability/v1/observe/';

export const observeSnippet = (origin: string) => `import requests

# Send call data to Earshot observability
url = '${origin}${OBSERVE_PATH}'
headers = {
    'X-API-KEY': '<your_earshot_api_key>',
    'Content-Type': 'application/json'
}
data = {
    'agent': '<agent_id_in_earshot>',
    'voice_recording_url': '<url_to_call_recording>',
    'transcript_type': 'custom',
    'transcript_json': [
        {
            'role': 'user',
            'content': 'Hello, I want to book an appointment.',
            'start_time': 0.5,
            'end_time': 2.3
        },
        {
            'role': 'assistant',
            'content': 'Sure, what time works for you?',
            'start_time': 2.5,
            'end_time': 4.1
        }
    ],
    'call_id': '<unique_call_identifier>',
    'call_ended_reason': '<reason_for_call_end>'
}
response = requests.post(url, headers=headers, json=data)
`;
