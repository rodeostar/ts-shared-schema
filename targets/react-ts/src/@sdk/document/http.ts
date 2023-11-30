import { Routes } from '../routes';
import type { Document } from './model';

export interface DocumentClient {
  [Routes.Document]: {
    GET: {
      params: {
        id: Document['id'];
      };
      response: Document;
    };
    POST: {
      params: Document;
      response: string;
    };
  };
  [Routes.Documents]: {
    GET: {
      params: {};
      response: {
        documents: Document[];
      };
    };
  };
}

export type DocumentRoute = DocumentClient[Routes.Document];
export type DocumentsRoute = DocumentClient[Routes.Documents];
