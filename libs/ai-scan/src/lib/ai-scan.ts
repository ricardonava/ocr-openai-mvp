import OpenAI from 'openai';
import { type DocumentType, OPENAI_API_KEY } from './constants';
import { encodeImage, getPromptByType, JsonObject } from './utils';

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

async function getParsedDocument(
  base64Image: string,
  type: DocumentType
): Promise<JsonObject> {
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      response_format: { type: 'json_object' },
      messages: [
        {
          role: 'user',
          content: [
            { type: 'text', text: getPromptByType(type) },
            {
              type: 'image_url',
              image_url: {
                url: base64Image,
                detail: 'high',
              },
            },
          ],
        },
      ],
    });

    const response = JSON.parse(completion.choices[0]?.message?.content);

    console.log('OpenAI response:', response);

    return response;
  } catch (error) {
    console.error('Error in OpenAI:', error);
    return {};
  }
}

export async function aiScan(
  baseImage: string,
  documentType: DocumentType
): Promise<JsonObject> {
  return await getParsedDocument(baseImage, documentType);
}

export { encodeImage, type DocumentType };
