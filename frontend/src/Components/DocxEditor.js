import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const DocxEditor = () => {
  const [content, setContent] = useState('');

  const handleDownload = () => {
    // Convert HTML content to DOCX format using mammoth
    const { saveAs } = require('file-saver');
    const mammoth = require('mammoth');

    mammoth.extractRawText({ value: content })
      .then((result) => {
        const docxContent = result.value;
        const blob = new Blob([docxContent], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
        saveAs(blob, 'document.docx');
      })
      .catch((error) => {
        console.error('Error converting to DOCX:', error);
      });
  };

  return (
    <div>
      <h2>DOCX Editor</h2>
      <ReactQuill
        theme="snow"
        value={content}
        onChange={(value) => setContent(value)}
      />
      <button onClick={handleDownload}>Download DOCX</button>
    </div>
  );
};

export default DocxEditor;
