import type { DocumentRoute, DocumentsRoute } from './document';
import { Routes } from './routes';
import { fetcher, withParams } from './util';
export type * from './document';
export * from './routes';

export const createClient = ({
  apiKey = '',
  host = 'http://localhost:8080',
}) => {
  const options = (opts: RequestInit = {}) => {
    return {
      ...opts,
      headers: {
        ...(opts?.headers || {}),
        'x-api-key': apiKey,
        'Content-Type': 'application/json',
      },
    };
  };

  return {
    document: () => {
      const docEndpoint = host + Routes.Document;

      return {
        retrieve(params: DocumentRoute['GET']['params']) {
          return fetcher<DocumentRoute['GET']['response']>(
            fetch(
              withParams(docEndpoint, params),
              options({
                method: 'GET',
              })
            )
          );
        },
        upsert(body: DocumentRoute['POST']['params']) {
          return fetcher<DocumentRoute['GET']['response']>(
            fetch(
              docEndpoint,
              options({
                method: 'POST',
                body: JSON.stringify(body),
              })
            )
          );
        },
      };
    },
    documents: () => {
      const docsEndpoint = host + Routes.Documents;

      return {
        retrieve() {
          return fetcher<DocumentsRoute['GET']['response']>(
            fetch(
              docsEndpoint,
              options({
                method: 'GET',
              })
            )
          );
        },
      };
    },
  };
};

// Attach the sdk to globalThis,
// making it available via window in the browser
(globalThis as any).createClient = createClient;
