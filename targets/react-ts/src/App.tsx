import { useEffect, useState } from 'react';
import { Document, createClient } from './@sdk';

const client = createClient({
  apiKey: '123',
});

function App() {
  const [docs, setDocs] = useState<Document[]>();
  const [doc, setDoc] = useState<Document>();

  useEffect(() => {
    client
      .document()
      .retrieve({ id: '1' })
      .then((document) => {
        setDoc(document);
      });

    client
      .documents()
      .retrieve()
      .then((response) => {
        setDocs(response.documents);
      });
  }, []);

  return (
    <div>
      <p>Document: {JSON.stringify(doc)}</p>
      <ul>
        {docs?.map((doc) => (
          <li>{JSON.stringify(doc)}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
