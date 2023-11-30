import express, { Request, Response } from 'express';
import { DocumentClient } from '@sdk';
import { Routes } from '@sdk/routes';
import cors from 'cors';

const app = express();
const port = 8080;
app.use(cors());

/**
 * Document Route
 */

// Request Schema
type DocumentRequest = DocumentClient[Routes.Document]['GET']['params'];
// Response Schema
type DocumentResponse = DocumentClient[Routes.Document]['GET']['response'];

// Handler
app.get(
  Routes.Document,
  (
    req: Request<{}, {}, {}, DocumentRequest>,
    res: Response<DocumentResponse>
  ) => {
    res.send({
      id: req.query.id,
      message: 'Document',
    });
  }
);

/**
 * Documents Route
 */

// Response Schema
type DocumentsResponse = DocumentClient[Routes.Documents]['GET']['response'];

// Handler
app.get(Routes.Documents, (_, res: Response<DocumentsResponse>) => {
  res.send({
    documents: [
      {
        id: '1',
        message: 'Document',
      },
      {
        id: '2',
        message: 'Document',
      },
    ],
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
