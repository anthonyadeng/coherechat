import { CohereClient, CohereError, CohereTimeoutError } from 'cohere-ai';
import {
  ChatMessage,
  ChatRequest,
  ChatStreamRequest,
  NonStreamedChatResponse,
} from 'cohere-ai/api';
const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY,
});
let message,
  temperature = 1,
  model,
  chatHistory;

(async () => {
  try {
    const stream = await cohere.chatStream({
      message: 'Tell me a story in 5 parts!',
    });

    for await (const chat of stream) {
      if (chat.eventType === 'text-generation') {
        process.stdout.write(chat.text);
      }
    }
  } catch (err) {
    if (err instanceof CohereTimeoutError) {
      console.log('Request timed out', err);
    } else if (err instanceof CohereError) {
      // catch all errors
      console.log(err.statusCode);
      console.log(err.message);
      console.log(err.body);
    }
  }
})();

export const chat = async (
  message: string,
  chatHistory: ChatMessage[]
): Promise<string> => {
  const chat = await cohere.chat({
    chatHistory: chatHistory,
    message: message,
    promptTruncation: 'AUTO_PRESERVE_ORDER',
    temperature: temperature,
    maxTokens: 1000,
    frequencyPenalty: 0.75,
    presencePenalty: 0.5,
  });

  return chat.text;
};
