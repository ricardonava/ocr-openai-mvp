export const OPENAI_API_KEY =
  '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';

export type DocumentType = 'bankStatement' | 'curp' | 'proofOfAddress';

export const PROMPTS = {
  commonFormatting: `For dates, format it as "MM-DD-YYY". For all other personal information, capitalize the first letter and format it in a human-readable form.`,
  bankStatement: `The following image is a Mexican bank statement. 
  Parse the information and return it in JSON format without any new line characters. 
  Extract the first name, last name, CLABE, No. de Cuenta, and R.F.C. 
  The output should be: {"firstName": ..., "lastName": ..., "clabe": ..., "account": ..., "rfc": ...}.`,
  curp: `The following image contains a CURP document from Mexico. 
    Extract the CURP code, first name, last name, date of birth, and place of birth. 
    Return the information in JSON format without any new line characters. 
    The output should be: 
    {"firstName": ..., "lastName": ..., "curp": ..., "dateOfBirth": ..., "placeOfBirth": ...}.`,
  proofOfAddress: `The following image contains a Mexican proof of address document.
   Extract the first name, last name, and address (including street, state, country, and PO box). 
   Return the information in JSON format without any new line characters. 
   The output should be: 
   {"firstName": ..., "lastName": ..., "address": {"street": ..., "state": ..., "country": ..., "poBox": ...}}.`,
};
