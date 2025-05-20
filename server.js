const express = require('express');
const { createClient } = require('@supabase/supabase-js'); // Import Supabase client
const app = express();
const db = require('./store');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

// Supabase client setup
const supabaseUrl = 'https://bvwhbsfcaneqvcymopdu.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ2d2hic2ZjYW5lcXZjeW1vcGR1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcwNDI0MTksImV4cCI6MjA2MjYxODQxOX0.dJipEwAYxXdKltgxScA_YbJhKgyELO8gnL1Jm5PFDY0';
const supabase = createClient(supabaseUrl, supabaseKey);

// Middleware
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log("Method: " + req.method + ", path: " + req.path + ", query: " + JSON.stringify(req.query) + ", body: " + JSON.stringify(req.body));
  next();
});

// Serve uploaded images as static files
app.use('/uploads', express.static('uploads'));
app.use("/", express.static("."));

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directory to save uploaded files
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  }
});
const upload = multer({ storage: storage });

// Routes
app.post('/create-user', (req, res) => {
  const { username, profile_picture_url, bio } = req.body;

  db.createUser(username, profile_picture_url, bio)
    .then(() => res.status(201).json({ success: true }))
    .catch(err => res.status(500).json({ error: err.message }));
});

app.put('/update-user', (req, res) => {
  const { userId, updates } = req.body;

  db.updateUser(userId, updates)
    .then(() => res.status(200).json({ success: true }))
    .catch(err => res.status(500).json({ error: err.message }));
});

// Success: Upload image route
app.post('/upload-image', upload.single('image'), (req, res) => {
  const userId = req.body.userId;
  const field = req.body.field;
  const filePath = `/uploads/${req.file.filename}`;

  db.updateUser(userId, { [field]: filePath })
    .then(() => res.json({ success: true, path: filePath }))
    .catch(err => res.status(500).json({ error: err.message }));
});

app.get("/get-userdata/:userid", async (req, res) => {
  var dbData = await db.getUserById(req.params.userid);
  res.write(JSON.stringify(dbData));
  res.end();
});

// Start server (keep this last!)
app.listen(3000, () => {
  console.log(' Server listening on http://localhost:3000');
});