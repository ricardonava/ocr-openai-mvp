import express, { Request } from 'express';
import * as path from 'path';
import multer from 'multer'; // For handling file uploads
import { aiScan, type DocumentType, encodeImage } from '@just-scan/ai-scan';
import cors from 'cors';

const app = express();

// Set up file upload handling with multer
const upload = multer({ dest: 'uploads/' });

interface OpenAIResponse {
  //TODO
}

// Extend the Express Request interface to include files from multer
interface MulterRequest extends Request {
  files?: Express.Multer.File[];
}

type UploadedFile = {
  path: string;
  filename: string;
};

function determineDocumentType(filename: string): DocumentType {
  const lowercasedFilename = filename.toLowerCase();
  console.log('lowercasedFilename:', lowercasedFilename);

  if (lowercasedFilename.includes('bankstatement')) {
    return 'bankStatement';
  } else if (lowercasedFilename.includes('curp')) {
    return 'curp';
  } else if (lowercasedFilename.includes('proofofaddress')) {
    return 'proofOfAddress';
  }

  throw new Error('Unknown document type');
}

// handle OpenAI API call
async function uploadImagesAndGetResponse(
  files: UploadedFile[]
): Promise<OpenAIResponse> {
  try {
    const results = await Promise.all(
      files.map(async (file) => {
        // Use the more robust determineDocumentType function to categorize the file
        const documentType = determineDocumentType(file.filename);

        const imageEncoded = await encodeImage(file.path); // Encode each image
        // Scan and get the result
        return await aiScan(imageEncoded, documentType); // Return the result for each PDF
      })
    );

    return { results };
  } catch (error) {
    console.error('Error uploading Images to OpenAI:', error);
    throw error;
  }
}

app.use(
  cors({
    origin: 'http://localhost:4200', // Replace with your front-end URL
  })
);

// Serve static assets
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Basic route
app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to the API!' });
});

// Route to upload images files and get a response from OpenAI
app.post(
  '/api/upload',
  upload.array('images', 10),
  async (req: MulterRequest, res) => {
    try {
      const images: UploadedFile[] =
        req.files?.map((file) => {
          return { path: file.path, filename: file.originalname };
        }) || [];

      if (images.length === 0) {
        return res.status(400).send({ error: 'No files were uploaded.' });
      }

      // Call OpenAI API with uploaded PDF files
      const openAIResponse = await uploadImagesAndGetResponse(images);

      res.json(openAIResponse);
    } catch (error) {
      console.error('Error during OpenAI processing:', error);
      res.status(500).send({ error: 'Error processing Images with OpenAI' });
    }
  }
);

// Start server
const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
