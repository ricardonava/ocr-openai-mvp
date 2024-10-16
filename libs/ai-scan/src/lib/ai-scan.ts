import OpenAI from 'openai';
import { OPENAI_API_KEY, type DocumentType } from './constants';
import { getPromptByType, JsonObject, encodeImage } from './utils';

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

async function getParsedDocument(
  base64Image: string,
  type: DocumentType
): Promise<JsonObject> {
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
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
