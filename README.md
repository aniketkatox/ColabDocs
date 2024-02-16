# Collaborative Document Editor

To run the frontend, run this command:

```
npm install
npm start
```

Then you will need to run your backend server. This can be hosted or thorugh your local host. To do this, switch into this directory and run node server.js. This will run your server locally and you will be able to save/access any changes.

To run the backend server, run this command:

```
npm install
node index.js
```

## Overview

The Collaborative Document Editor is a feature-rich, web application designed to facilitate seamless collaboration on documents. With its intuitive interface and powerful capabilities, users can effortlessly create, view, edit, and share documents in real-time.

### Architecture Overview

#### Frontend

* React.js: Powers the frontend for building user interfaces.
* Rich-text Editing (Quill): Provides rich-text editing capabilities for document creation and editing.

#### Backend

* Node.js: Manages server-side logic and backend operations.
* Express.js: Builds RESTful API endpoints for communication between frontend and backend.
* WebSocket (via Sharedb): Facilitates real-time communication and synchronization between clients and the server for collaborative editing.

#### Database

* MongoDB: Handles data persistence with a flexible schema structure, ideal for real-time collaboration.

### Features
* Rich-text formatting
  * Bold
  * Italics
  * Underline
  * Font color and size
  * Text alignment
  * Bullet and Numbered lists
 
* Persistent Login
* Multi-user support. Users can view others' edits in real time.
* Auto-saving.


https://github.com/aniketkatox/ColabDocs/assets/114221120/253458a6-eb43-49d3-996f-2823480a3a1f




https://github.com/aniketkatox/ColabDocs/assets/114221120/797ea04f-6eff-4c36-9926-66661562fed3



## Technologies Used
* React  
* React Router  
* Quill  
* Nodejs  
* Express  
* MongoDB  
* webSocket  
