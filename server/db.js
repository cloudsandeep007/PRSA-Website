import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let db;
let isNative = false;

try {
  const Database = require('better-sqlite3');
  const isVercel = !!(process.env.VERCEL || process.env.AWS_EXECUTION_ENV || process.env.LAMBDA_TASK_ROOT);
  
  let dbPath;
  if (isVercel) {
    dbPath = path.join('/tmp', 'database.sqlite');
    const sourceDb = path.join(__dirname, 'database.sqlite');
    if (!fs.existsSync(dbPath) && fs.existsSync(sourceDb)) {
      try { fs.copyFileSync(sourceDb, dbPath); } catch (e) {}
    }
    db = new Database(dbPath);
    try { db.pragma('journal_mode = DELETE'); } catch (e) {}
  } else {
    dbPath = path.join(__dirname, 'database.sqlite');
    db = new Database(dbPath);
    try { db.pragma('journal_mode = WAL'); } catch (e) {}
  }
  isNative = true;
} catch (err) {
  console.warn('better-sqlite3 native module not available in environment. Activating Pure-JS In-Memory Database engine:', err.message);
  
  // Pure JS In-Memory Database Engine Fallback for Vercel Serverless
  const memoryStore = {
    users: [
      { id: 1, username: "superadmin", email: "superadmin@prsaroller.com", password_hash: "$2a$10$7Z2v1w9X0.GzM/rB5wV7JzW.k8d5.v3p2q1r0s9t6", role: "Super Admin" },
      { id: 2, username: "clientadmin", email: "client@prsaroller.com", password_hash: "$2a$10$7Z2v1w9X0.GzM/rB5wV7JzW.k8d5.v3p2q1r0s9t6", role: "Client Admin" }
    ],
    content: {
      "hero_type": "video",
      "hero_video_url": "https://assets.mixkit.co/videos/preview/mixkit-skaters-racing-on-an-outdoor-rink-41561-large.mp4",
      "hero_badge": "⚡ OFFICIAL RSFI AFFILIATED ACADEMY • BENGALURU, KARNATAKA",
      "hero_sub_badge": "ELECTRONIC CITY • NEO TOWN • HSR • FLOODLIT ARENA",
      "hero_title_1": "UNLEASH SPEED.",
      "hero_title_2": "MASTER THE RINK.",
      "hero_description": "Official RSFI roller skating training in Bangalore. From beginner balance & falling safety to podium medals at Ryan International, Viva Vibgyor, and State/National Championships.",
      "hero_bg_image": "/uploads/prsa_media_10.jpg",
      "hero_cta_primary_text": "BOOK A FREE TRIAL CLASS",
      "hero_cta_primary_link": "#trial",
      "hero_cta_secondary_text": "VIEW REAL ACTION GALLERY",
      "hero_cta_secondary_link": "#gallery",
      "stat_1_val": "850+",
      "stat_1_lbl": "ACTIVE SKATERS TRAINED",
      "stat_2_val": "12+",
      "stat_2_lbl": "NATIONAL CHAMPIONSHIP MEDALS",
      "stat_3_val": "8 RSFI",
      "stat_3_lbl": "CERTIFIED CHIEF COACHES",
      "stat_4_val": "100%",
      "stat_4_lbl": "SAFETY & HELMET COMPLIANCE"
    },
    settings: {
      "academy_name": "Professional Roller Skating Academy (PRSA)",
      "tagline": "Unleash Speed. Master The Rink.",
      "phone": "+91 98765 43210",
      "whatsapp": "919876543210",
      "email": "admissions@prsaroller.com",
      "admin_notify_email": "headcoach@prsaroller.com",
      "address": "PRSA Banked Speed Track Arena, Electronic City / Neo Town Corridor, Bengaluru, Karnataka 560100",
      "business_hours": "Morning: 6:00 AM – 9:30 AM | Evening: 5:00 PM – 8:30 PM (Tue - Sun)",
      "meta_title": "PRSA — Official RSFI Roller Skating Academy Bengaluru",
      "meta_description": "Official RSFI affiliated roller skating training in Bangalore. Quad, inline speed & slalom coaching for toddlers to championship athletes."
    },
    programs: [],
    coaches: [],
    events: [],
    achievements: [],
    gallery: [],
    testimonials: [],
    locations: [],
    faqs: [],
    trial_bookings: [],
    contact_enquiries: [],
    activity_logs: []
  };

  let autoId = 100;

  db = {
    pragma: () => {},
    backup: async () => {},
    exec: () => {},
    prepare: (sql) => {
      const trimmed = sql.trim().replace(/\s+/g, ' ');
      
      return {
        all: (...params) => {
          if (trimmed.includes('FROM content')) {
            return Object.entries(memoryStore.content).map(([k, v]) => ({ key: k, value: v }));
          }
          if (trimmed.includes('FROM settings')) {
            return Object.entries(memoryStore.settings).map(([k, v]) => ({ key: k, value: v }));
          }
          if (trimmed.includes('FROM programs')) return memoryStore.programs;
          if (trimmed.includes('FROM coaches')) return memoryStore.coaches;
          if (trimmed.includes('FROM events')) return memoryStore.events;
          if (trimmed.includes('FROM achievements')) return memoryStore.achievements;
          if (trimmed.includes('FROM gallery')) return memoryStore.gallery;
          if (trimmed.includes('FROM testimonials')) return memoryStore.testimonials;
          if (trimmed.includes('FROM locations')) return memoryStore.locations;
          if (trimmed.includes('FROM faqs')) return memoryStore.faqs;
          if (trimmed.includes('FROM trial_bookings')) {
            let res = [...memoryStore.trial_bookings];
            if (params[0]) res = res.filter(b => b.status === params[0]);
            return res.reverse();
          }
          if (trimmed.includes('FROM contact_enquiries')) return [...memoryStore.contact_enquiries].reverse();
          if (trimmed.includes('FROM activity_logs')) return [...memoryStore.activity_logs].reverse().slice(0, 100);
          return [];
        },
        get: (...params) => {
          if (trimmed.includes('FROM users WHERE email = ?')) {
            return memoryStore.users.find(u => u.email === params[0]);
          }
          if (trimmed.includes('COUNT(*) as count FROM users')) return { count: memoryStore.users.length };
          if (trimmed.includes('COUNT(*) as count FROM content')) return { count: Object.keys(memoryStore.content).length };
          if (trimmed.includes('COUNT(*) as count FROM programs')) return { count: memoryStore.programs.length };
          if (trimmed.includes('COUNT(*) as count FROM coaches')) return { count: memoryStore.coaches.length };
          if (trimmed.includes('COUNT(*) as count FROM events')) return { count: memoryStore.events.length };
          if (trimmed.includes('COUNT(*) as count FROM achievements')) return { count: memoryStore.achievements.length };
          if (trimmed.includes('COUNT(*) as count FROM gallery')) return { count: memoryStore.gallery.length };
          if (trimmed.includes('COUNT(*) as count FROM testimonials')) return { count: memoryStore.testimonials.length };
          if (trimmed.includes('COUNT(*) as count FROM locations')) return { count: memoryStore.locations.length };
          if (trimmed.includes('COUNT(*) as count FROM faqs')) return { count: memoryStore.faqs.length };
          if (trimmed.includes('COUNT(*) as count FROM trial_bookings')) {
            if (trimmed.includes("status = 'New'")) {
              return { count: memoryStore.trial_bookings.filter(b => b.status === 'New').length };
            }
            return { count: memoryStore.trial_bookings.length };
          }
          if (trimmed.includes('COUNT(*) as count FROM contact_enquiries')) {
            if (trimmed.includes("status = 'New'")) {
              return { count: memoryStore.contact_enquiries.filter(c => c.status === 'New').length };
            }
            return { count: memoryStore.contact_enquiries.length };
          }
          if (trimmed.includes('COUNT(*) as count FROM activity_logs')) return { count: memoryStore.activity_logs.length };
          return undefined;
        },
        run: (...params) => {
          autoId++;
          if (trimmed.includes('INSERT INTO users')) {
            memoryStore.users.push({ id: autoId, username: params[0], email: params[1], password_hash: params[2], role: params[3] || 'admin' });
          } else if (trimmed.includes('INSERT OR REPLACE INTO content') || trimmed.includes('INSERT INTO content')) {
            memoryStore.content[params[0]] = params[1];
          } else if (trimmed.includes('INSERT OR REPLACE INTO settings') || trimmed.includes('INSERT INTO settings')) {
            memoryStore.settings[params[0]] = params[1];
          } else if (trimmed.includes('INSERT INTO trial_bookings')) {
            memoryStore.trial_bookings.push({ id: autoId, athlete_name: params[0], age: params[1], parent_phone: params[2], email: params[3], discipline: params[4], location: params[5], experience: params[6], message: params[7], status: 'New', created_at: new Date().toISOString() });
          } else if (trimmed.includes('INSERT INTO contact_enquiries')) {
            memoryStore.contact_enquiries.push({ id: autoId, name: params[0], phone: params[1], email: params[2], subject: params[3], message: params[4], status: 'New', created_at: new Date().toISOString() });
          } else if (trimmed.includes('INSERT INTO activity_logs')) {
            memoryStore.activity_logs.push({ id: autoId, user_email: params[0], action: params[1], details: params[2], created_at: new Date().toISOString() });
          } else if (trimmed.includes('INSERT INTO programs')) {
            memoryStore.programs.push({ id: autoId, name: params[0], age_group: params[1], level: params[2], short_desc: params[3], full_desc: params[4], image_url: params[5], schedule: params[6], duration: params[7], display_order: params[8], is_published: 1 });
          } else if (trimmed.includes('INSERT INTO coaches')) {
            memoryStore.coaches.push({ id: autoId, name: params[0], position: params[1], photo_url: params[2], experience: params[3], specialization: params[4], achievements: params[5], bio: params[6], display_order: params[7], is_published: 1 });
          } else if (trimmed.includes('INSERT INTO events')) {
            memoryStore.events.push({ id: autoId, title: params[0], category: params[1], date_str: params[2], time_str: params[3], location: params[4], description: params[5], image_url: params[6], registration_status: params[7], is_published: 1 });
          } else if (trimmed.includes('INSERT INTO achievements')) {
            memoryStore.achievements.push({ id: autoId, title: params[0], category: params[1], year: params[2], count_label: params[3], description: params[4], image_url: params[5], display_order: params[6] });
          } else if (trimmed.includes('INSERT INTO gallery')) {
            memoryStore.gallery.push({ id: autoId, title: params[0], category: params[1], media_type: params[2], url: params[3], caption: params[4], display_order: params[5], is_published: 1 });
          } else if (trimmed.includes('INSERT INTO testimonials')) {
            memoryStore.testimonials.push({ id: autoId, name: params[0], role_desc: params[1], quote: params[2], rating: params[3], photo_url: params[4], is_published: 1 });
          } else if (trimmed.includes('INSERT INTO locations')) {
            memoryStore.locations.push({ id: autoId, name: params[0], tag_label: params[1], address: params[2], phone: params[3], schedule: params[4], maps_url: params[5], description: params[6], photo_url: params[7], display_order: params[8], is_published: 1 });
          } else if (trimmed.includes('INSERT INTO faqs')) {
            memoryStore.faqs.push({ id: autoId, question: params[0], answer: params[1], category: params[2], display_order: params[3], is_published: 1 });
          }
          return { lastInsertRowid: autoId, changes: 1 };
        }
      };
    }
  };
}

// Initialize database tables
export function initDb() {
  if (isNative && db && typeof db.exec === 'function') {
    try {
      db.exec(`
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          username TEXT UNIQUE NOT NULL,
          email TEXT UNIQUE NOT NULL,
          password_hash TEXT NOT NULL,
          role TEXT NOT NULL DEFAULT 'admin',
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS content (
          key TEXT PRIMARY KEY,
          value TEXT NOT NULL,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS programs (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          age_group TEXT,
          level TEXT,
          short_desc TEXT,
          full_desc TEXT,
          image_url TEXT,
          schedule TEXT,
          duration TEXT,
          display_order INTEGER DEFAULT 0,
          is_published INTEGER DEFAULT 1,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS coaches (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          position TEXT,
          photo_url TEXT,
          experience TEXT,
          specialization TEXT,
          achievements TEXT,
          bio TEXT,
          display_order INTEGER DEFAULT 0,
          is_published INTEGER DEFAULT 1,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS achievements (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT NOT NULL,
          category TEXT,
          year TEXT,
          count_label TEXT,
          description TEXT,
          image_url TEXT,
          display_order INTEGER DEFAULT 0,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS events (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT NOT NULL,
          category TEXT,
          date_str TEXT,
          time_str TEXT,
          location TEXT,
          description TEXT,
          image_url TEXT,
          registration_status TEXT DEFAULT 'Open',
          is_published INTEGER DEFAULT 1,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS gallery (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT,
          category TEXT DEFAULT 'All',
          media_type TEXT DEFAULT 'image',
          url TEXT NOT NULL,
          caption TEXT,
          display_order INTEGER DEFAULT 0,
          is_published INTEGER DEFAULT 1,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS testimonials (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          role_desc TEXT,
          quote TEXT NOT NULL,
          rating INTEGER DEFAULT 5,
          photo_url TEXT,
          is_published INTEGER DEFAULT 1,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS locations (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          tag_label TEXT,
          address TEXT,
          phone TEXT,
          schedule TEXT,
          maps_url TEXT,
          description TEXT,
          photo_url TEXT,
          display_order INTEGER DEFAULT 0,
          is_published INTEGER DEFAULT 1,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS faqs (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          question TEXT NOT NULL,
          answer TEXT NOT NULL,
          category TEXT DEFAULT 'General',
          display_order INTEGER DEFAULT 0,
          is_published INTEGER DEFAULT 1,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS trial_bookings (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          athlete_name TEXT NOT NULL,
          age INTEGER NOT NULL,
          parent_phone TEXT NOT NULL,
          email TEXT NOT NULL,
          discipline TEXT NOT NULL,
          location TEXT NOT NULL,
          experience TEXT NOT NULL,
          message TEXT,
          status TEXT DEFAULT 'New',
          notes TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS contact_enquiries (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          phone TEXT,
          email TEXT NOT NULL,
          subject TEXT,
          message TEXT NOT NULL,
          status TEXT DEFAULT 'New',
          notes TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS settings (
          key TEXT PRIMARY KEY,
          value TEXT NOT NULL,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS activity_logs (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          user_email TEXT NOT NULL,
          action TEXT NOT NULL,
          details TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );
      `);
    } catch (e) {
      console.error('initDb error:', e);
    }
  }
}

export default db;
