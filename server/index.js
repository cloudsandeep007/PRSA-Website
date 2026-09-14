import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import db, { initDb } from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { seedDatabase } from './seed.js';

const JWT_SECRET = process.env.JWT_SECRET || 'prsa_skating_academy_secret_key_2026';
const PORT = process.env.PORT || 5000;

// Initialize DB schema & seed default data
try {
  initDb();
  seedDatabase();
} catch (e) {
  console.error("DB init error:", e);
}

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded media statically
const uploadsDir = path.join(__dirname, '..', 'public', 'uploads');
osEnsureDir(uploadsDir);
if (fs.existsSync(uploadsDir)) {
  app.use('/uploads', express.static(uploadsDir));
}

// Also serve public folder statically in production
const distDir = path.join(__dirname, '..', 'dist');
if (fs.existsSync(distDir)) {
  app.use(express.static(distDir));
}

function osEnsureDir(dir) {
  try {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  } catch (err) {
    console.warn('ReadOnly filesystem notice (osEnsureDir):', err.message);
  }
}

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, 'upload-' + uniqueSuffix + ext);
  }
});
const upload = multer({
  storage,
  limits: { fileSize: 15 * 1024 * 1024 }, // 15MB max
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
      cb(null, true);
    } else {
      cb(new Error('Only images and videos are allowed!'));
    }
  }
});

// Middleware: Authenticate Admin JWT Token
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Authentication token required' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid or expired token' });
    req.user = user;
    next();
  });
}

function logActivity(userEmail, action, details = '') {
  try {
    db.prepare('INSERT INTO activity_logs (user_email, action, details) VALUES (?, ?, ?)').run(
      userEmail, action, details
    );
  } catch (err) {
    console.error('Log activity error:', err);
  }
}

// ==========================================
// 1. PUBLIC REST API ENDPOINTS
// ==========================================

// Get All Content Key-Values
app.get('/api/content', (req, res) => {
  const rows = db.prepare('SELECT key, value FROM content').all();
  const contentMap = {};
  rows.forEach(r => contentMap[r.key] = r.value);
  res.json(contentMap);
});

// Get Global Settings
app.get('/api/settings', (req, res) => {
  const rows = db.prepare('SELECT key, value FROM settings').all();
  const settingsMap = {};
  rows.forEach(r => settingsMap[r.key] = r.value);
  res.json(settingsMap);
});

// Get Published Programs
app.get('/api/programs', (req, res) => {
  const rows = db.prepare('SELECT * FROM programs WHERE is_published = 1 ORDER BY display_order ASC, id ASC').all();
  res.json(rows);
});

// Get Published Coaches
app.get('/api/coaches', (req, res) => {
  const rows = db.prepare('SELECT * FROM coaches WHERE is_published = 1 ORDER BY display_order ASC, id ASC').all();
  res.json(rows);
});

// Get Published Events
app.get('/api/events', (req, res) => {
  const rows = db.prepare('SELECT * FROM events WHERE is_published = 1 ORDER BY id DESC').all();
  res.json(rows);
});

// Get Achievements
app.get('/api/achievements', (req, res) => {
  const rows = db.prepare('SELECT * FROM achievements ORDER BY display_order ASC, id ASC').all();
  res.json(rows);
});

// Get Published Gallery Media
app.get('/api/gallery', (req, res) => {
  const rows = db.prepare('SELECT * FROM gallery WHERE is_published = 1 ORDER BY display_order ASC, id DESC').all();
  res.json(rows);
});

// Get Published Testimonials
app.get('/api/testimonials', (req, res) => {
  const rows = db.prepare('SELECT * FROM testimonials WHERE is_published = 1 ORDER BY id ASC').all();
  res.json(rows);
});

// Get Locations
app.get('/api/locations', (req, res) => {
  const rows = db.prepare('SELECT * FROM locations WHERE is_published = 1 ORDER BY display_order ASC, id ASC').all();
  res.json(rows);
});

// Get FAQs
app.get('/api/faqs', (req, res) => {
  const rows = db.prepare('SELECT * FROM faqs WHERE is_published = 1 ORDER BY display_order ASC, id ASC').all();
  res.json(rows);
});

// Public Form: Submit Free Trial Booking
app.post('/api/trial-bookings', (req, res) => {
  const { athlete_name, age, parent_phone, email, discipline, location, experience, message } = req.body;
  if (!athlete_name || !parent_phone || !email || !discipline) {
    return res.status(400).json({ error: 'Please fill in all required fields' });
  }

  const stmt = db.prepare(`
    INSERT INTO trial_bookings (athlete_name, age, parent_phone, email, discipline, location, experience, message, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'New')
  `);
  const result = stmt.run(athlete_name, Number(age) || 0, parent_phone, email, discipline, location || 'Main Arena', experience || 'First Timer', message || '');
  
  logActivity('Public Visitor', 'New Trial Booking Created', `Athlete: ${athlete_name}, Phone: ${parent_phone}`);

  res.status(201).json({
    success: true,
    booking_id: result.lastInsertRowid,
    message: 'Free Trial Booking submitted successfully! Our coaching team will call you shortly.'
  });
});

// Public Form: Submit Contact Enquiry
app.post('/api/contact-enquiries', (req, res) => {
  const { name, phone, email, subject, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required' });
  }

  const stmt = db.prepare(`
    INSERT INTO contact_enquiries (name, phone, email, subject, message, status)
    VALUES (?, ?, ?, ?, ?, 'New')
  `);
  const result = stmt.run(name, phone || '', email, subject || 'General Enquiry', message);

  logActivity('Public Visitor', 'New Contact Enquiry', `From: ${name} (${email})`);

  res.status(201).json({
    success: true,
    enquiry_id: result.lastInsertRowid,
    message: 'Thank you for reaching out! We have received your message.'
  });
});

// ==========================================
// 2. AUTHENTICATION API
// ==========================================

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' });

  const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
  if (!user) return res.status(401).json({ error: 'Invalid email or password' });

  const validPassword = bcrypt.compareSync(password, user.password_hash);
  if (!validPassword) return res.status(401).json({ error: 'Invalid email or password' });

  const token = jwt.sign({ id: user.id, username: user.username, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '7d' });

  logActivity(user.email, 'Admin Login Successful', `Role: ${user.role}`);

  res.json({
    token,
    user: { id: user.id, username: user.username, email: user.email, role: user.role }
  });
});

app.get('/api/auth/me', authenticateToken, (req, res) => {
  res.json({ user: req.user });
});

// ==========================================
// 3. ADMIN MANAGEMENT ENDPOINTS (PROTECTED)
// ==========================================

// Dashboard Metrics
app.get('/api/admin/dashboard', authenticateToken, (req, res) => {
  const totalBookings = db.prepare('SELECT COUNT(*) as count FROM trial_bookings').get().count;
  const newBookings = db.prepare("SELECT COUNT(*) as count FROM trial_bookings WHERE status = 'New'").get().count;
  const totalEnquiries = db.prepare('SELECT COUNT(*) as count FROM contact_enquiries').get().count;
  const newEnquiries = db.prepare("SELECT COUNT(*) as count FROM contact_enquiries WHERE status = 'New'").get().count;
  const totalPrograms = db.prepare('SELECT COUNT(*) as count FROM programs').get().count;
  const totalCoaches = db.prepare('SELECT COUNT(*) as count FROM coaches').get().count;
  const totalEvents = db.prepare('SELECT COUNT(*) as count FROM events').get().count;
  const totalGallery = db.prepare('SELECT COUNT(*) as count FROM gallery').get().count;
  const recentBookings = db.prepare('SELECT * FROM trial_bookings ORDER BY id DESC LIMIT 5').all();
  const recentLogs = db.prepare('SELECT * FROM activity_logs ORDER BY id DESC LIMIT 8').all();

  res.json({
    totalBookings,
    newBookings,
    totalEnquiries,
    newEnquiries,
    totalPrograms,
    totalCoaches,
    totalEvents,
    totalGallery,
    recentBookings,
    recentLogs
  });
});

// Update Content Key-Values
app.put('/api/admin/content', authenticateToken, (req, res) => {
  const contentObj = req.body;
  const stmt = db.prepare('INSERT OR REPLACE INTO content (key, value, updated_at) VALUES (?, ?, CURRENT_TIMESTAMP)');
  for (const [key, value] of Object.entries(contentObj)) {
    stmt.run(key, String(value));
  }
  logActivity(req.user.email, 'Updated Content', `Keys: ${Object.keys(contentObj).join(', ')}`);
  res.json({ success: true, message: 'Content updated successfully' });
});

// Update Global Settings
app.put('/api/admin/settings', authenticateToken, (req, res) => {
  const settingsObj = req.body;
  const stmt = db.prepare('INSERT OR REPLACE INTO settings (key, value, updated_at) VALUES (?, ?, CURRENT_TIMESTAMP)');
  for (const [key, value] of Object.entries(settingsObj)) {
    stmt.run(key, String(value));
  }
  logActivity(req.user.email, 'Updated Settings', `Keys: ${Object.keys(settingsObj).join(', ')}`);
  res.json({ success: true, message: 'Settings updated successfully' });
});

// Programs CRUD
app.post('/api/admin/programs', authenticateToken, (req, res) => {
  const { name, age_group, level, short_desc, full_desc, image_url, schedule, duration, display_order } = req.body;
  const stmt = db.prepare('INSERT INTO programs (name, age_group, level, short_desc, full_desc, image_url, schedule, duration, display_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)');
  const res2 = stmt.run(name, age_group, level, short_desc, full_desc, image_url, schedule, duration, Number(display_order) || 0);
  logActivity(req.user.email, 'Created Program', name);
  res.json({ success: true, id: res2.lastInsertRowid });
});

app.put('/api/admin/programs/:id', authenticateToken, (req, res) => {
  const { name, age_group, level, short_desc, full_desc, image_url, schedule, duration, display_order, is_published } = req.body;
  const stmt = db.prepare('UPDATE programs SET name=?, age_group=?, level=?, short_desc=?, full_desc=?, image_url=?, schedule=?, duration=?, display_order=?, is_published=? WHERE id=?');
  stmt.run(name, age_group, level, short_desc, full_desc, image_url, schedule, duration, Number(display_order) || 0, is_published ? 1 : 0, req.params.id);
  logActivity(req.user.email, 'Updated Program', `ID: ${req.params.id} (${name})`);
  res.json({ success: true });
});

app.delete('/api/admin/programs/:id', authenticateToken, (req, res) => {
  db.prepare('DELETE FROM programs WHERE id = ?').run(req.params.id);
  logActivity(req.user.email, 'Deleted Program', `ID: ${req.params.id}`);
  res.json({ success: true });
});

// Coaches CRUD
app.post('/api/admin/coaches', authenticateToken, (req, res) => {
  const { name, position, photo_url, experience, specialization, achievements, bio, display_order } = req.body;
  const stmt = db.prepare('INSERT INTO coaches (name, position, photo_url, experience, specialization, achievements, bio, display_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?)');
  const res2 = stmt.run(name, position, photo_url, experience, specialization, achievements, bio, Number(display_order) || 0);
  logActivity(req.user.email, 'Created Coach', name);
  res.json({ success: true, id: res2.lastInsertRowid });
});

app.put('/api/admin/coaches/:id', authenticateToken, (req, res) => {
  const { name, position, photo_url, experience, specialization, achievements, bio, display_order, is_published } = req.body;
  const stmt = db.prepare('UPDATE coaches SET name=?, position=?, photo_url=?, experience=?, specialization=?, achievements=?, bio=?, display_order=?, is_published=? WHERE id=?');
  stmt.run(name, position, photo_url, experience, specialization, achievements, bio, Number(display_order) || 0, is_published ? 1 : 0, req.params.id);
  logActivity(req.user.email, 'Updated Coach', `ID: ${req.params.id} (${name})`);
  res.json({ success: true });
});

app.delete('/api/admin/coaches/:id', authenticateToken, (req, res) => {
  db.prepare('DELETE FROM coaches WHERE id = ?').run(req.params.id);
  logActivity(req.user.email, 'Deleted Coach', `ID: ${req.params.id}`);
  res.json({ success: true });
});

// Events CRUD
app.post('/api/admin/events', authenticateToken, (req, res) => {
  const { title, category, date_str, time_str, location, description, image_url, registration_status } = req.body;
  const stmt = db.prepare('INSERT INTO events (title, category, date_str, time_str, location, description, image_url, registration_status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)');
  const res2 = stmt.run(title, category, date_str, time_str, location, description, image_url, registration_status || 'Open');
  logActivity(req.user.email, 'Created Event', title);
  res.json({ success: true, id: res2.lastInsertRowid });
});

app.put('/api/admin/events/:id', authenticateToken, (req, res) => {
  const { title, category, date_str, time_str, location, description, image_url, registration_status, is_published } = req.body;
  const stmt = db.prepare('UPDATE events SET title=?, category=?, date_str=?, time_str=?, location=?, description=?, image_url=?, registration_status=?, is_published=? WHERE id=?');
  stmt.run(title, category, date_str, time_str, location, description, image_url, registration_status, is_published ? 1 : 0, req.params.id);
  logActivity(req.user.email, 'Updated Event', `ID: ${req.params.id}`);
  res.json({ success: true });
});

app.delete('/api/admin/events/:id', authenticateToken, (req, res) => {
  db.prepare('DELETE FROM events WHERE id = ?').run(req.params.id);
  logActivity(req.user.email, 'Deleted Event', `ID: ${req.params.id}`);
  res.json({ success: true });
});

// Achievements CRUD
app.post('/api/admin/achievements', authenticateToken, (req, res) => {
  const { title, category, year, count_label, description, image_url, display_order } = req.body;
  const stmt = db.prepare('INSERT INTO achievements (title, category, year, count_label, description, image_url, display_order) VALUES (?, ?, ?, ?, ?, ?, ?)');
  const res2 = stmt.run(title, category, year, count_label, description, image_url, Number(display_order) || 0);
  logActivity(req.user.email, 'Created Achievement', title);
  res.json({ success: true, id: res2.lastInsertRowid });
});

app.put('/api/admin/achievements/:id', authenticateToken, (req, res) => {
  const { title, category, year, count_label, description, image_url, display_order } = req.body;
  const stmt = db.prepare('UPDATE achievements SET title=?, category=?, year=?, count_label=?, description=?, image_url=?, display_order=? WHERE id=?');
  stmt.run(title, category, year, count_label, description, image_url, Number(display_order) || 0, req.params.id);
  logActivity(req.user.email, 'Updated Achievement', `ID: ${req.params.id}`);
  res.json({ success: true });
});

app.delete('/api/admin/achievements/:id', authenticateToken, (req, res) => {
  db.prepare('DELETE FROM achievements WHERE id = ?').run(req.params.id);
  logActivity(req.user.email, 'Deleted Achievement', `ID: ${req.params.id}`);
  res.json({ success: true });
});

// Gallery CRUD
app.post('/api/admin/gallery', authenticateToken, (req, res) => {
  const { title, category, media_type, url, caption, display_order } = req.body;
  const stmt = db.prepare('INSERT INTO gallery (title, category, media_type, url, caption, display_order) VALUES (?, ?, ?, ?, ?, ?)');
  const res2 = stmt.run(title, category || 'All', media_type || 'image', url, caption, Number(display_order) || 0);
  logActivity(req.user.email, 'Added Gallery Media', title || url);
  res.json({ success: true, id: res2.lastInsertRowid });
});

app.put('/api/admin/gallery/:id', authenticateToken, (req, res) => {
  const { title, category, media_type, url, caption, display_order, is_published } = req.body;
  const stmt = db.prepare('UPDATE gallery SET title=?, category=?, media_type=?, url=?, caption=?, display_order=?, is_published=? WHERE id=?');
  stmt.run(title, category, media_type, url, caption, Number(display_order) || 0, is_published ? 1 : 0, req.params.id);
  logActivity(req.user.email, 'Updated Gallery Media', `ID: ${req.params.id}`);
  res.json({ success: true });
});

app.delete('/api/admin/gallery/:id', authenticateToken, (req, res) => {
  db.prepare('DELETE FROM gallery WHERE id = ?').run(req.params.id);
  logActivity(req.user.email, 'Deleted Gallery Media', `ID: ${req.params.id}`);
  res.json({ success: true });
});

// Testimonials CRUD
app.post('/api/admin/testimonials', authenticateToken, (req, res) => {
  const { name, role_desc, quote, rating, photo_url } = req.body;
  const stmt = db.prepare('INSERT INTO testimonials (name, role_desc, quote, rating, photo_url) VALUES (?, ?, ?, ?, ?)');
  const res2 = stmt.run(name, role_desc, quote, Number(rating) || 5, photo_url);
  logActivity(req.user.email, 'Created Testimonial', name);
  res.json({ success: true, id: res2.lastInsertRowid });
});

app.put('/api/admin/testimonials/:id', authenticateToken, (req, res) => {
  const { name, role_desc, quote, rating, photo_url, is_published } = req.body;
  const stmt = db.prepare('UPDATE testimonials SET name=?, role_desc=?, quote=?, rating=?, photo_url=?, is_published=? WHERE id=?');
  stmt.run(name, role_desc, quote, Number(rating) || 5, photo_url, is_published ? 1 : 0, req.params.id);
  logActivity(req.user.email, 'Updated Testimonial', `ID: ${req.params.id}`);
  res.json({ success: true });
});

app.delete('/api/admin/testimonials/:id', authenticateToken, (req, res) => {
  db.prepare('DELETE FROM testimonials WHERE id = ?').run(req.params.id);
  logActivity(req.user.email, 'Deleted Testimonial', `ID: ${req.params.id}`);
  res.json({ success: true });
});

// Locations CRUD
app.post('/api/admin/locations', authenticateToken, (req, res) => {
  const { name, tag_label, address, phone, schedule, maps_url, description, photo_url, display_order } = req.body;
  const stmt = db.prepare('INSERT INTO locations (name, tag_label, address, phone, schedule, maps_url, description, photo_url, display_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)');
  const res2 = stmt.run(name, tag_label, address, phone, schedule, maps_url, description, photo_url, Number(display_order) || 0);
  logActivity(req.user.email, 'Created Location', name);
  res.json({ success: true, id: res2.lastInsertRowid });
});

app.put('/api/admin/locations/:id', authenticateToken, (req, res) => {
  const { name, tag_label, address, phone, schedule, maps_url, description, photo_url, display_order, is_published } = req.body;
  const stmt = db.prepare('UPDATE locations SET name=?, tag_label=?, address=?, phone=?, schedule=?, maps_url=?, description=?, photo_url=?, display_order=?, is_published=? WHERE id=?');
  stmt.run(name, tag_label, address, phone, schedule, maps_url, description, photo_url, Number(display_order) || 0, is_published ? 1 : 0, req.params.id);
  logActivity(req.user.email, 'Updated Location', `ID: ${req.params.id}`);
  res.json({ success: true });
});

app.delete('/api/admin/locations/:id', authenticateToken, (req, res) => {
  db.prepare('DELETE FROM locations WHERE id = ?').run(req.params.id);
  logActivity(req.user.email, 'Deleted Location', `ID: ${req.params.id}`);
  res.json({ success: true });
});

// FAQs CRUD
app.post('/api/admin/faqs', authenticateToken, (req, res) => {
  const { question, answer, category, display_order } = req.body;
  const stmt = db.prepare('INSERT INTO faqs (question, answer, category, display_order) VALUES (?, ?, ?, ?)');
  const res2 = stmt.run(question, answer, category || 'General', Number(display_order) || 0);
  logActivity(req.user.email, 'Created FAQ', question);
  res.json({ success: true, id: res2.lastInsertRowid });
});

app.put('/api/admin/faqs/:id', authenticateToken, (req, res) => {
  const { question, answer, category, display_order, is_published } = req.body;
  const stmt = db.prepare('UPDATE faqs SET question=?, answer=?, category=?, display_order=?, is_published=? WHERE id=?');
  stmt.run(question, answer, category, Number(display_order) || 0, is_published ? 1 : 0, req.params.id);
  logActivity(req.user.email, 'Updated FAQ', `ID: ${req.params.id}`);
  res.json({ success: true });
});

app.delete('/api/admin/faqs/:id', authenticateToken, (req, res) => {
  db.prepare('DELETE FROM faqs WHERE id = ?').run(req.params.id);
  logActivity(req.user.email, 'Deleted FAQ', `ID: ${req.params.id}`);
  res.json({ success: true });
});

// Leads: Trial Bookings Admin Manager
app.get('/api/admin/trial-bookings', authenticateToken, (req, res) => {
  const { status, search } = req.query;
  let sql = 'SELECT * FROM trial_bookings WHERE 1=1';
  const params = [];
  if (status) {
    sql += ' AND status = ?';
    params.push(status);
  }
  if (search) {
    sql += ' AND (athlete_name LIKE ? OR parent_phone LIKE ? OR email LIKE ?)';
    params.push(`%${search}%`, `%${search}%`, `%${search}%`);
  }
  sql += ' ORDER BY id DESC';
  const rows = db.prepare(sql).all(...params);
  res.json(rows);
});

app.put('/api/admin/trial-bookings/:id', authenticateToken, (req, res) => {
  const { status, notes } = req.body;
  db.prepare('UPDATE trial_bookings SET status = ?, notes = ? WHERE id = ?').run(status, notes || '', req.params.id);
  logActivity(req.user.email, 'Updated Trial Booking Status', `ID: ${req.params.id} -> Status: ${status}`);
  res.json({ success: true });
});

app.delete('/api/admin/trial-bookings/:id', authenticateToken, (req, res) => {
  db.prepare('DELETE FROM trial_bookings WHERE id = ?').run(req.params.id);
  logActivity(req.user.email, 'Deleted Trial Booking', `ID: ${req.params.id}`);
  res.json({ success: true });
});

// Leads: Contact Enquiries Admin Manager
app.get('/api/admin/contact-enquiries', authenticateToken, (req, res) => {
  const rows = db.prepare('SELECT * FROM contact_enquiries ORDER BY id DESC').all();
  res.json(rows);
});

app.put('/api/admin/contact-enquiries/:id', authenticateToken, (req, res) => {
  const { status, notes } = req.body;
  db.prepare('UPDATE contact_enquiries SET status = ?, notes = ? WHERE id = ?').run(status, notes || '', req.params.id);
  logActivity(req.user.email, 'Updated Contact Enquiry Status', `ID: ${req.params.id} -> Status: ${status}`);
  res.json({ success: true });
});

app.delete('/api/admin/contact-enquiries/:id', authenticateToken, (req, res) => {
  db.prepare('DELETE FROM contact_enquiries WHERE id = ?').run(req.params.id);
  logActivity(req.user.email, 'Deleted Contact Enquiry', `ID: ${req.params.id}`);
  res.json({ success: true });
});

// Media Manager: Upload File
app.post('/api/admin/media/upload', authenticateToken, upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  const fileUrl = `/uploads/${req.file.filename}`;
  logActivity(req.user.email, 'Uploaded Media File', fileUrl);
  res.json({
    success: true,
    url: fileUrl,
    filename: req.file.filename,
    originalName: req.file.originalname,
    size: req.file.size
  });
});

// Media Manager: List Uploaded Files
app.get('/api/admin/media', authenticateToken, (req, res) => {
  fs.readdir(uploadsDir, (err, files) => {
    if (err) return res.status(500).json({ error: 'Failed to read uploads folder' });
    const mediaFiles = files.map(f => {
      const stat = fs.statSync(path.join(uploadsDir, f));
      return {
        filename: f,
        url: `/uploads/${f}`,
        size: stat.size,
        created_at: stat.birthtime
      };
    }).sort((a, b) => b.created_at - a.created_at);
    res.json(mediaFiles);
  });
});

// Media Manager: Delete File
app.delete('/api/admin/media/:filename', authenticateToken, (req, res) => {
  const filePath = path.join(uploadsDir, req.params.filename);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    logActivity(req.user.email, 'Deleted Media File', req.params.filename);
    res.json({ success: true });
  } else {
    res.status(404).json({ error: 'File not found' });
  }
});

// Activity Logs API
app.get('/api/admin/activity-logs', authenticateToken, (req, res) => {
  const rows = db.prepare('SELECT * FROM activity_logs ORDER BY id DESC LIMIT 100').all();
  res.json(rows);
});

// Backup Database API
app.get('/api/admin/backup', authenticateToken, (req, res) => {
  const backupFile = path.join(__dirname, `backup-prsa-${Date.now()}.sqlite`);
  db.backup(backupFile)
    .then(() => {
      logActivity(req.user.email, 'Created Database Backup', path.basename(backupFile));
      res.download(backupFile, (err) => {
        if (fs.existsSync(backupFile)) fs.unlinkSync(backupFile);
      });
    })
    .catch(err => res.status(500).json({ error: 'Backup failed: ' + err.message }));
});

// Developer Portal: Real-time System & Database Diagnostics
app.get('/api/admin/developer/status', authenticateToken, (req, res) => {
  try {
    const memory = process.memoryUsage();
    
    // Database Table Row Counters
    const tableCounts = {
      users: db.prepare('SELECT COUNT(*) as count FROM users').get().count,
      content: db.prepare('SELECT COUNT(*) as count FROM content').get().count,
      programs: db.prepare('SELECT COUNT(*) as count FROM programs').get().count,
      coaches: db.prepare('SELECT COUNT(*) as count FROM coaches').get().count,
      events: db.prepare('SELECT COUNT(*) as count FROM events').get().count,
      achievements: db.prepare('SELECT COUNT(*) as count FROM achievements').get().count,
      gallery: db.prepare('SELECT COUNT(*) as count FROM gallery').get().count,
      testimonials: db.prepare('SELECT COUNT(*) as count FROM testimonials').get().count,
      locations: db.prepare('SELECT COUNT(*) as count FROM locations').get().count,
      faqs: db.prepare('SELECT COUNT(*) as count FROM faqs').get().count,
      trial_bookings: db.prepare('SELECT COUNT(*) as count FROM trial_bookings').get().count,
      contact_enquiries: db.prepare('SELECT COUNT(*) as count FROM contact_enquiries').get().count,
      activity_logs: db.prepare('SELECT COUNT(*) as count FROM activity_logs').get().count,
    };

    // Calculate uploaded files size
    let mediaCount = 0;
    let totalSizeBytes = 0;
    if (fs.existsSync(uploadsDir)) {
      const files = fs.readdirSync(uploadsDir);
      mediaCount = files.length;
      files.forEach(f => {
        try {
          totalSizeBytes += fs.statSync(path.join(uploadsDir, f)).size;
        } catch (e) {}
      });
    }

    res.json({
      success: true,
      serverTime: new Date().toISOString(),
      uptimeSeconds: Math.floor(process.uptime()),
      nodeVersion: process.version,
      platform: process.platform,
      memory: {
        rssMB: (memory.rss / (1024 * 1024)).toFixed(2),
        heapTotalMB: (memory.heapTotal / (1024 * 1024)).toFixed(2),
        heapUsedMB: (memory.heapUsed / (1024 * 1024)).toFixed(2)
      },
      tableCounts,
      mediaCount,
      mediaSizeMB: (totalSizeBytes / (1024 * 1024)).toFixed(2)
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch developer status: ' + err.message });
  }
});


// Sitemap.xml Endpoint
app.get('/sitemap.xml', (req, res) => {
  const baseUrl = req.protocol + '://' + req.get('host');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/#about-philosophy</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/#programs</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/#coaches</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/#trial</loc>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
</urlset>`;
  res.header('Content-Type', 'application/xml');
  res.send(xml);
});

// Robots.txt Endpoint
app.get('/robots.txt', (req, res) => {
  const baseUrl = req.protocol + '://' + req.get('host');
  const txt = `User-agent: *
Allow: /
Disallow: /admin/
Sitemap: ${baseUrl}/sitemap.xml`;
  res.header('Content-Type', 'text/plain');
  res.send(txt);
});

// SPA Fallback for production React router
app.get('*', (req, res) => {
  if (fs.existsSync(path.join(distDir, 'index.html'))) {
    res.sendFile(path.join(distDir, 'index.html'));
  } else {
    res.send('PRSA Backend API Server is Running! Access API at /api/...');
  }
});

if (!process.env.VERCEL && !process.env.AWS_EXECUTION_ENV && !process.env.LAMBDA_TASK_ROOT) {
  app.listen(PORT, () => {
    console.log(`\n🚀 PRSA Express Server running on http://localhost:${PORT}`);
  });
}

export default app;

