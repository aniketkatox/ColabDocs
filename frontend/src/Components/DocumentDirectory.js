import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const DocumentDirectory = () => {
  const [documents, setDocuments] = useState([]);
  const [newDocumentData, setNewDocumentData] = useState({
    title: '',
    content: '',
  });
  const [selectedDocumentContent, setSelectedDocumentContent] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:3001/users/logout');
      navigate('/signin');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const fetchDocuments = async () => {
    try {
      const response = await axios.get('http://localhost:3001/documents/all');
      console.log("fetch decument ",response.data)
      setDocuments(response.data.documents);
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  };

  const checkLoginStatus = async () => {
    try {
      await axios.get('http://localhost:3001/users/check-login');
      setIsLoggedIn(true);
    } catch (error) {
      setIsLoggedIn(false);
      console.error('Error checking login status:', error);
    }
  };

  const handleCreateDocument = async () => {
    try {
      const response = await axios.post('http://localhost:3001/documents/create',newDocumentData,{ withCredentials: true });
      const createdDocument = response.data.document;
      setDocuments([...documents, createdDocument]);
      setNewDocumentData({ title: '', content: '' });
      console.log('Document created successfully:', createdDocument);
    } catch (error) {
      console.error('Error creating document:', error);
    }
  };

  const handleDocumentClick = async (documentId) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/documents/${documentId}`
      );
      setSelectedDocumentContent(response.data.content);
    } catch (error) {
      console.error('Error fetching document content:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await checkLoginStatus();

      console.log('isLoggedIn in fetchData:', isLoggedIn);

      if (isLoggedIn) {
        await fetchDocuments();
      } else {
        // Redirect to login page if not logged in
        navigate('/signin');
      }
    };

    fetchData();
  }, [isLoggedIn, navigate]);

  if (!isLoggedIn) {
    // This case should not be reached due to the redirect in useEffect
    return null;
  }

  return (
    <div>
      <h2 style={{ textAlign: 'center', fontSize: '30px', paddingBottom: '20px', paddingTop: '20px' }}>Document Directory</h2>
      <button type="button" onClick={handleLogout} style={{ paddingLeft: '10px' }}>
        Log Out
      </button>
      <div style={{ textAlign: 'center', paddingBottom: '20px', paddingTop: '20px' }}>
        <h3>Create New Document</h3>
        <form onSubmit={(e) => e.preventDefault()}>
          <label>
            Title:
            <input
              type="text"
              name="title"
              value={newDocumentData.title}
              onChange={(e) => setNewDocumentData({ ...newDocumentData, title: e.target.value })}
            />
          </label>
          <label>
            Content:
            <textarea
              name="content"
              value={newDocumentData.content}
              onChange={(e) => setNewDocumentData({ ...newDocumentData, content: e.target.value })}
            />
          </label>
          <button type="button" onClick={handleCreateDocument}>
            Create Document
          </button>
        </form>
      </div>

      <ul style={{ textAlign: 'center', fontSize: '30px', paddingBottom: '20px', paddingTop: '50px', listStyleType: 'none', margin: '0', padding: '0' }}>
        {documents.map((document) => (
          <li
            style={{ cursor: 'pointer', paddingBottom: '20px' }}
            key={document._id}
            onClick={() => handleDocumentClick(document._id)}
          >
            {document.title}
          </li>
        ))}
      </ul>

      {selectedDocumentContent && (
        <div>
          <h3>Selected Document Content</h3>
          <pre>{selectedDocumentContent}</pre>
        </div>
      )}
    </div>
  );
};

export default DocumentDirectory;
