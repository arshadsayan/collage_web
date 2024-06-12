import React, { useState } from 'react';
import DocViewer, { DocViewerRenderers } from 'react-doc-viewer';

const DocumentViewerComponent = () => {
  const [showDocViewer, setShowDocViewer] = useState(false);

  const documents = [
    { uri: "https://picsum.photos/200/300" }
    // You can add more documents here
  ];
  if (documents.length === 0) {
    console.error("Documents array is empty. Please provide at least one document.");
  }

  return (
    <div>
      <button className="btn btn-secondary" styles="width: 90px; height: 45px; margin: auto; padding: auto;" onClick={() => setShowDocViewer(true)}>Preview</button>
      {showDocViewer && <DocViewer documents={documents}pluginRenderers={DocViewerRenderers} />}
    </div>
  );
};

export default DocumentViewerComponent;
