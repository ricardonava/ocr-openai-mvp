import * as fs from 'fs';
import _ from 'lodash';

import { PROMPTS, type DocumentType } from './constants';

export type JsonObject = {
  [key: string]: never;
};

export async function encodeImage(imagePath: string): Promise<string> {
  const imageBuffer = await fs.promises.readFile(imagePath);
  const base64Image = imageBuffer.toString('base64');
  return `data:image/png;base64,${base64Image}`;
}

export function getPromptByType(type: DocumentType): string {
  switch (type) {
    case 'bankStatement':
      return PROMPTS.bankStatement + PROMPTS.commonFormatting;
    case 'curp':
      return PROMPTS.curp + PROMPTS.commonFormatting;
    case 'proofOfAddress':
      return PROMPTS.proofOfAddress + PROMPTS.commonFormatting;
    default:
      throw new Error('Unsupported document type');
  }
}

export const transformResponse = (obj: JsonObject): JsonObject => {
  const skipKeys = ['rfc', 'clabe', 'account', 'curp', 'dateOfBirth', 'poBox']; // Keys to skip transformation

  return _.mapValues(
    _.mapKeys(obj, (_value: never, key: never) => _.camelCase(key)),
    (value: JsonObject, key: string) => {
      if (skipKeys.includes(key)) {
        return value; // Skip transformation for specified keys
      }

      if (_.isPlainObject(value)) {
        return transformResponse(value); // Pass the skipKeys array to recursive calls
      } else if (_.isString(value)) {
        return _.startCase(_.toLower(value));
      }

      return value;
    }
  );
};
