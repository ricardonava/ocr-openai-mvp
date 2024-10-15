import express, { Request } from 'express';
import * as path from 'path';
import multer from 'multer'; // For handling file uploads
import { aiScan, encodeImage } from '@just-scan/ai-scan';

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

// handle OpenAI API call
async function uploadImagesAndGetResponse(pdfPaths: string[]): Promise<OpenAIResponse> {
  try {
    const results = await Promise.all(
      pdfPaths.map(async (pdfPath) => {
        const imageEncoded = await encodeImage(pdfPath); // Encode each image
        const result = await aiScan(imageEncoded, 'bankStatement'); // Scan and get the result
        return result; // Return the result for each PDF
      })
    );
    
    return { results }; 

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


// Route to upload images files and get a response from OpenAI
app.post('/api/upload', upload.array('images', 10), async (req: MulterRequest, res) => {
  try {
    const images = req.files?.map((file) => file.path) || [];

    if (images.length === 0) {
      return res.status(400).send({ error: 'No files were uploaded.' });
    }

    // Call OpenAI API with uploaded PDF files
    const openAIResponse = await uploadImagesAndGetResponse(images);
    
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