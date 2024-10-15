import express, { Request } from 'express';
import * as path from 'path';
import axios from 'axios';
import * as fs from 'fs';
import FormData from 'form-data';
import multer from 'multer'; // For handling file uploads
import { aiScan, encodeImage } from '@just-scan/ai-scan';

const app = express();

// Set up file upload handling with multer
const upload = multer({ dest: 'uploads/' });

const openAIKey = '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'; // Store your OpenAI API key in environment variables for security.

interface OpenAIResponse {
  // Define your response structure here based on OpenAI's API documentation
}

// Extend the Express Request interface to include files from multer
interface MulterRequest extends Request {
  files?: Express.Multer.File[];
}

// Function to handle the OpenAI API call
async function uploadImagesAndGetResponse(pdfPaths: string[]): Promise<OpenAIResponse> {
  try {
    const results: string[] = await Promise.all(
      pdfPaths.map(async (pdfPath) => {
        const imageEncoded = await encodeImage(pdfPath); // Encode each image
        const result = await aiScan(imageEncoded, 'bankStatement'); // Scan and get the result
        return result; // Return the result for each PDF
      })
    );

    // Concatenate the results
    const concatenatedResult = results.join(' '); // or use any other separator if needed
    return concatenatedResult as OpenAIResponse;

  } catch (error) {
    console.error('Error uploading PDFs to OpenAI:', error);
    throw error;
  }
}

// Serve static assets
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Basic route
app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to the API!' });
});


// Route to upload PDF files and get a response from OpenAI
app.post('/api/upload', upload.array('images', 10), async (req: MulterRequest, res) => {
  try {
    const images = req.files?.map((file) => file.path) || [];

    if (images.length === 0) {
      return res.status(400).send({ error: 'No files were uploaded.' });
    }

    // Call OpenAI API with uploaded PDF files
    const openAIResponse = await uploadImagesAndGetResponse(images);

    // Return OpenAI's response to the client
    res.json(openAIResponse);
  } catch (error) {
    console.error('Error during OpenAI processing:', error);
    res.status(500).send({ error: 'Error processing PDFs with OpenAI' });
  }
});

// Start server
const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);