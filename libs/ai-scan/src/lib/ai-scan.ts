import OpenAI from 'openai';
import * as fs from 'fs';

const openai = new OpenAI({
  apiKey:
    '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',
});

async function encodeImage(imagePath: string): Promise<string> {
  const imageBuffer = await fs.promises.readFile(imagePath);
  const base64Image = imageBuffer.toString('base64');
  return `data:image/png;base64,${base64Image}`;
}

type DocumentType = 'bankStatement' | 'curp' | 'proofOfAddress';

function getPromptByType(type: DocumentType): string {
  switch (type) {
    case 'bankStatement':
      return 'The following image is a Mexican bank statement. Parse the information and return it in JSON format without any new line characters. Extract the first name, last name, address (with street, state, country, and PO box), CLABE, No. de Cuenta, and R.F.C. The output should be: {"first_name": ..., "last_name": ..., "address": {"street": ..., "state": ..., "country": ..., "po_box": ...}, "clabe": ..., "account": ..., "rfc": ...}.';
    case 'curp':
      return 'The following image contains a CURP document from Mexico. Extract the CURP code, first name, last name, date of birth, and place of birth. Return the information in JSON format without any new line characters. The output should be: {"first_name": ..., "last_name": ..., "curp": ..., "date_of_birth": ..., "place_of_birth": ...}.';
    case 'proofOfAddress':
      return 'The following image contains a Mexican proof of address document. Extract the first name, last name, and address (including street, state, country, and PO box). Return the information in JSON format without any new line characters. The output should be: {"first_name": ..., "last_name": ..., "address": {"street": ..., "state": ..., "country": ..., "po_box": ...}}.';
    default:
      throw new Error('Unsupported document type');
  }
}

async function getParsedDocument(
  base64Image: string,
  type: DocumentType
): Promise<string> {
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

    return JSON.parse(completion.choices[0]?.message?.content);
  } catch (error) {
    console.error('Error in OpenAI:', error);
    return 'Try again later';
  }
}

export async function aiScan(
  baseImage: string,
  documentType: DocumentType
): Promise<string> {
  return await getParsedDocument(baseImage, documentType);
}

export { encodeImage };
