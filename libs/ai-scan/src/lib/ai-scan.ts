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

function getPromptByType(type: string): string {
  switch (type) {
    case 'bankStatement':
      return 'The following image is a bank statement from Mexico. Help me parse the information and return it in JSON format, without any new line chars. I need the Name, the Address, the CLABE, No. de Cuenta and R.F.C.. The output format should be a JSON with the following format: {"full_name": ..., "address": ..., "clabe": ..., "account":..., "rfc": ...}.';
    case 'curp':
      return 'The following image contains a CURP (Clave Única de Registro de Población) document from Mexico. Extract the CURP code, full name, date of birth, and place of birth. Return the information in JSON format without any new line characters. The output format should be: {"curp": ..., "full_name": ..., "date_of_birth": ..., "place_of_birth": ...}.';
    case 'other':
      return 'The following image contains a document. Please analyze its contents and extract any relevant information. Return the information in a JSON format without any new line characters. The output format should include keys for any important fields you identify.';
    default:
      throw new Error('Unsupported document type');
  }
}

async function getParsedDocument(
  base64Image: string,
  type: string
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
  documentType: string
): Promise<string> {
  return await getParsedDocument(baseImage, documentType);
}

export { encodeImage };
