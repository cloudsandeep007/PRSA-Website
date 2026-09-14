import db, { initDb } from './db.js';
import bcrypt from 'bcryptjs';

export function seedDatabase() {
  try {
    initDb();

    // Seed Super Admin User (Developer)
    const superAdminEmail = "superadmin@prsaroller.com";
    let existingSuper = db.prepare("SELECT * FROM users WHERE email = ?").get(superAdminEmail);
    if (!existingSuper) {
      const hash = bcrypt.hashSync("SuperAdmin@123456", 10);
      db.prepare("INSERT INTO users (username, email, password_hash, role) VALUES (?, ?, ?, ?)").run("superadmin", superAdminEmail, hash, "Super Admin");
    }

    // Seed Client Admin User (Academy Owner / Client Portal)
    const clientEmail = "client@prsaroller.com";
    let existingClient = db.prepare("SELECT * FROM users WHERE email = ?").get(clientEmail);
    if (!existingClient) {
      const hash = bcrypt.hashSync("ClientAdmin@123456", 10);
      db.prepare("INSERT INTO users (username, email, password_hash, role) VALUES (?, ?, ?, ?)").run("clientadmin", clientEmail, hash, "Client Admin");
    }

    // Legacy admin user fallback
    const legacyEmail = "admin@prsaroller.com";
    let existingLegacy = db.prepare("SELECT * FROM users WHERE email = ?").get(legacyEmail);
    if (!existingLegacy) {
      const hash = bcrypt.hashSync("Admin@123456", 10);
      db.prepare("INSERT INTO users (username, email, password_hash, role) VALUES (?, ?, ?, ?)").run("admin", legacyEmail, hash, "Super Admin");
    }

    // Seed Global Settings
    const defaultSettings = [
      { key: "academy_name", value: "Professional Roller Skating Academy (PRSA)" },
      { key: "tagline", value: "Unleash Speed. Master The Rink." },
      { key: "phone", value: "+91 98765 43210" },
      { key: "whatsapp", value: "919876543210" },
      { key: "email", value: "admissions@prsaroller.com" },
      { key: "admin_notify_email", value: "headcoach@prsaroller.com" },
      { key: "address", value: "PRSA Banked Speed Track Arena, Electronic City / Neo Town Corridor, Bengaluru, Karnataka 560100" },
      { key: "business_hours", value: "Morning: 6:00 AM – 9:30 AM | Evening: 5:00 PM – 8:30 PM (Tue - Sun)" },
      { key: "meta_title", value: "PRSA — Official RSFI Roller Skating Academy Bengaluru" },
      { key: "meta_description", value: "Official RSFI affiliated roller skating training in Bangalore. Quad, inline speed & slalom coaching for toddlers to championship athletes." }
    ];

    for (const s of defaultSettings) {
      db.prepare("INSERT OR REPLACE INTO settings (key, value, updated_at) VALUES (?, ?, CURRENT_TIMESTAMP)").run(s.key, s.value);
    }

    // Seed Content (Hero, About)
    const defaultContent = [
      { key: "hero_type", value: "video" },
      { key: "hero_video_url", value: "https://assets.mixkit.co/videos/preview/mixkit-skaters-racing-on-an-outdoor-rink-41561-large.mp4" },
      { key: "hero_badge", value: "⚡ OFFICIAL RSFI AFFILIATED ACADEMY • BENGALURU, KARNATAKA" },
      { key: "hero_sub_badge", value: "ELECTRONIC CITY • NEO TOWN • HSR • FLOODLIT ARENA" },
      { key: "hero_title_1", value: "UNLEASH SPEED." },
      { key: "hero_title_2", value: "MASTER THE RINK." },
      { key: "hero_description", value: "Official RSFI roller skating training in Bangalore. From beginner balance & falling safety to podium medals at Ryan International, Viva Vibgyor, and State/National Championships." },
      { key: "hero_bg_image", value: "/uploads/prsa_media_10.jpg" },
      { key: "hero_cta_primary_text", value: "BOOK A FREE TRIAL CLASS" },
      { key: "hero_cta_primary_link", value: "#trial" },
      { key: "hero_cta_secondary_text", value: "VIEW REAL ACTION GALLERY" },
      { key: "hero_cta_secondary_link", value: "#gallery" },
      { key: "stat_1_val", value: "850+" },
      { key: "stat_1_lbl", value: "ACTIVE SKATERS TRAINED" },
      { key: "stat_2_val", value: "12+" },
      { key: "stat_2_lbl", value: "NATIONAL CHAMPIONSHIP MEDALS" },
      { key: "stat_3_val", value: "8 RSFI" },
      { key: "stat_3_lbl", value: "CERTIFIED CHIEF COACHES" },
      { key: "stat_4_val", value: "100%" },
      { key: "stat_4_lbl", value: "SAFETY & HELMET COMPLIANCE" }
    ];

    for (const c of defaultContent) {
      db.prepare("INSERT OR REPLACE INTO content (key, value, updated_at) VALUES (?, ?, CURRENT_TIMESTAMP)").run(c.key, c.value);
    }

    // Seed Programs
    const countProg = db.prepare("SELECT COUNT(*) as count FROM programs").get()?.count || 0;
    if (countProg === 0) {
      const progs = [
        {
          name: "Beginner Tots & Kids",
          age_group: "AGES 4 – 7",
          level: "Grassroots Foundation",
          short_desc: "Fun balance, safe falling reflexes, motor coordination, and introductory quad skates. Designed to eliminate fear and build cheerful athletic confidence.",
          full_desc: "Our Tots program focuses on safety-first kinetic movement, gentle balance drills on 4-wheel quad skates, and gamified slalom obstacles. Protective gear and helmets are strictly required and provided for trial sessions.",
          image_url: "/uploads/prsa_media_03.jpg",
          schedule: "3x Weekly • 45 Min",
          duration: "3 Months Level 1",
          display_order: 1
        },
        {
          name: "Basic & Recreational Quad Skating",
          age_group: "AGES 6+ & YOUTH",
          level: "Foundational Track",
          short_desc: "The core foundational curriculum. Master stride pushing, heel and toe stops, inside/outside edge control, and track awareness on quad and inline skates.",
          full_desc: "Students learn proper biomechanical posture, parallel stride returns, T-braking, and spin stops. Prepares skaters for both recreation and competitive squad tryouts.",
          image_url: "/uploads/prsa_media_05.jpg",
          schedule: "3x Weekly • 60 Min",
          duration: "4 Months Module",
          display_order: 2
        },
        {
          name: "Intermediate Quad & Inline Velocity",
          age_group: "VELOCITY TIER",
          level: "Intermediate Speed",
          short_desc: "Translating baseline control into high-velocity track performance. Introduces banked corner crossovers, slipstream drafting, and interval endurance.",
          full_desc: "Focuses on high-speed corner crossovers, aerodynamic tuck positions, cadence modulation, and endurance building on banked synthetic track surfaces.",
          image_url: "/uploads/prsa_media_11.jpg",
          schedule: "4x Weekly • 75 Min",
          duration: "6 Months Squad",
          display_order: 3
        },
        {
          name: "RSFI Speed Roller Racing (Elite Squad)",
          age_group: "COMPETITIVE PODIUM",
          level: "National Level",
          short_desc: "Exclusive RSFI sanctioned speed track & road squad. Transponder timing, 110mm inline speed boots, tactical race simulation, and state/national prep.",
          full_desc: "Designed for elite speed racers preparing for district, state, and RSFI National Championships. Features electronic transponder lap telemetry, sprint interval training, and customized athlete nutrition plans.",
          image_url: "/uploads/prsa_media_13.jpg",
          schedule: "5x Weekly • 90 Min",
          duration: "Annual High-Performance",
          display_order: 4
        },
        {
          name: "Artistic & Freestyle Slalom",
          age_group: "ALL AGES",
          level: "Specialized Technique",
          short_desc: "Precision cone slalom maneuvers, toe-wheel balance, spin turns, and choreographic expression on specialized rocker-frame skates.",
          full_desc: "Teaches speed slalom, crazy legs, wheelies, and artistic expression around precision cone tracks under certified slalom instructors.",
          image_url: "/uploads/prsa_media_15.jpg",
          schedule: "3x Weekly • 60 Min",
          duration: "Ongoing",
          display_order: 5
        },
        {
          name: "Adult Fitness & Open Rink",
          age_group: "ADULTS & MASTERS",
          level: "Fitness & Conditioning",
          short_desc: "Low-impact cardiovascular conditioning, core stability, and weekend open rink sessions for working professionals and adult skating enthusiasts.",
          full_desc: "Enjoy the joint-friendly cardio benefits of roller skating in a supportive, adult-only evening batch with equipment assistance.",
          image_url: "/uploads/prsa_media_06.jpg",
          schedule: "Weekend & Night Batches",
          duration: "Flexible Pass",
          display_order: 6
        }
      ];

      const stmt = db.prepare("INSERT INTO programs (name, age_group, level, short_desc, full_desc, image_url, schedule, duration, display_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
      for (const p of progs) {
        stmt.run(p.name, p.age_group, p.level, p.short_desc, p.full_desc, p.image_url, p.schedule, p.duration, p.display_order);
      }
    }

    // Seed Coaches
    const countCoach = db.prepare("SELECT COUNT(*) as count FROM coaches").get()?.count || 0;
    if (countCoach === 0) {
      const coaches = [
        {
          name: "Coach Arjun Kumar",
          position: "Head Coach & Founder",
          photo_url: "/uploads/prsa_media_02.jpg",
          experience: "14+ Years Experience",
          specialization: "RSFI Certified • Inline Speed & National Squad Lead",
          achievements: "Former National Gold Medalist, Trained 45+ State Medalists",
          bio: "Chief Coach Arjun has over 14 years of professional coaching experience across Karnataka. He holds official Level 3 RSFI certification and leads PRSA's high-performance speed racing contingent.",
          display_order: 1
        },
        {
          name: "Coach Pooja Sharma",
          position: "Chief Tots & Quad Instructor",
          photo_url: "/uploads/prsa_media_05.jpg",
          experience: "8+ Years Experience",
          specialization: "Child Biomechanics & Quad Foundations",
          achievements: "Certified Physical Educator, Specialist in Grassroots Confidence",
          bio: "Coach Pooja specializes in early childhood balance, fear elimination, and fun quad skate mastery. Her patient method has helped over 400 young kids fall in love with roller sports.",
          display_order: 2
        },
        {
          name: "Coach Rajesh Varma",
          position: "Freestyle Slalom & Technical Lead",
          photo_url: "/uploads/prsa_media_08.jpg",
          experience: "10+ Years Experience",
          specialization: "Artistic Slalom & Cone Precision",
          achievements: "National Slalom Judge, International Clinic Delegate",
          bio: "Coach Rajesh guides PRSA skaters through high-speed slalom tricks, rocker frame setup, and artistic posture for state & national competitions.",
          display_order: 3
        }
      ];

      const stmt = db.prepare("INSERT INTO coaches (name, position, photo_url, experience, specialization, achievements, bio, display_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
      for (const c of coaches) {
        stmt.run(c.name, c.position, c.photo_url, c.experience, c.specialization, c.achievements, c.bio, c.display_order);
      }
    }

    // Seed Events
    const countEvents = db.prepare("SELECT COUNT(*) as count FROM events").get()?.count || 0;
    if (countEvents === 0) {
      const evts = [
        {
          title: "Karnataka State Roller Skating Championship & Trials",
          category: "RSFI STATE CHAMPIONSHIP",
          date_str: "OCT 24 - 28",
          time_str: "6:00 AM onwards",
          location: "PRSA Banked Speed Track Arena, Electronic City",
          description: "Cadet, Sub-Junior & Junior Quad/Inline divisions. 300m Time Trial, 500m Sprint, and 1000m Rink Race selection trials.",
          image_url: "/uploads/prsa_media_10.jpg",
          registration_status: "Open"
        },
        {
          title: "RSFI 62nd National Roller Skating Championship",
          category: "NATIONAL CHAMPIONSHIP",
          date_str: "NOV 10 - 14",
          time_str: "Full Day Fixtures",
          location: "National Velodrome Sports Complex",
          description: "Track & Road Speed, Inline Freestyle Slalom, and Roller Hockey showcase representing Team Karnataka.",
          image_url: "/uploads/prsa_media_11.jpg",
          registration_status: "Confirmed"
        }
      ];

      const stmt = db.prepare("INSERT INTO events (title, category, date_str, time_str, location, description, image_url, registration_status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
      for (const e of evts) {
        stmt.run(e.title, e.category, e.date_str, e.time_str, e.location, e.description, e.image_url, e.registration_status);
      }
    }

    // Seed Achievements
    const countAch = db.prepare("SELECT COUNT(*) as count FROM achievements").get()?.count || 0;
    if (countAch === 0) {
      const achs = [
        {
          title: "Gold Medals — RSFI State Championship",
          category: "State Championship",
          year: "2024",
          count_label: "14 Gold",
          description: "PRSA speed team dominated the 500m sprint and 1000m rink race events.",
          image_url: "/uploads/prsa_media_03.jpg",
          display_order: 1
        },
        {
          title: "National Championship Podium Winners",
          category: "National Podium",
          year: "2023",
          count_label: "12 Medals",
          description: "Represented Karnataka state at 61st RSFI National Championships.",
          image_url: "/uploads/prsa_media_13.jpg",
          display_order: 2
        },
        {
          title: "Ryan International & Vibgyor Inter-School Champions",
          category: "Inter-School Trophy",
          year: "2024",
          count_label: "Overall Trophy",
          description: "Secured overall team championship trophy 3 years consecutively.",
          image_url: "/uploads/prsa_media_15.jpg",
          display_order: 3
        }
      ];

      const stmt = db.prepare("INSERT INTO achievements (title, category, year, count_label, description, image_url, display_order) VALUES (?, ?, ?, ?, ?, ?, ?)");
      for (const a of achs) {
        stmt.run(a.title, a.category, a.year, a.count_label, a.description, a.image_url, a.display_order);
      }
    }

    // Seed Gallery
    const countGal = db.prepare("SELECT COUNT(*) as count FROM gallery").get()?.count || 0;
    if (countGal === 0) {
      for (let i = 1; i <= 15; i++) {
        const num = i < 10 ? `0${i}` : `${i}`;
        const url = `/uploads/prsa_media_${num}.jpg`;
        const cat = i % 2 === 0 ? "Inline Speed" : "Quad Skates";
        db.prepare("INSERT INTO gallery (title, category, media_type, url, caption, display_order) VALUES (?, ?, ?, ?, ?, ?)").run(
          `PRSA Action Shot ${i}`,
          cat,
          "image",
          url,
          `High-speed training session at PRSA floodlit arena (${cat})`,
          i
        );
      }
    }

    // Seed Testimonials
    const countTest = db.prepare("SELECT COUNT(*) as count FROM testimonials").get()?.count || 0;
    if (countTest === 0) {
      const tests = [
        {
          name: "Meera Kulkarni",
          role_desc: "Parent of Cadet Skater (Verified Google Review)",
          quote: "Best skating academy in the region! My 5-year-old son started on quads with zero confidence. Coach Arjun and Pooja's patience transformed him in weeks. The track safety barriers gave us complete peace of mind.",
          rating: 5,
          photo_url: "/uploads/prsa_media_07.jpg"
        },
        {
          name: "Sunil Ramaswamy",
          role_desc: "Parent of State Gold Medalist (Verified Google Review)",
          quote: "PRSA's speed training is unmatched. The transponder timing gates and corner crossover drills helped my daughter shave 1.2 seconds in the 500m sprint, winning gold at the RSFI State Championship.",
          rating: 5,
          photo_url: "/uploads/prsa_media_09.jpg"
        },
        {
          name: "Rahul Bhasin",
          role_desc: "Adult Fitness & Speed Batch (Verified Google Review)",
          quote: "Joined the Adult Masters session after work. The synthetic banked rink is wonderful on the knees, equipment is top quality, and the coaching staff is thoroughly professional and encouraging.",
          rating: 5,
          photo_url: "/uploads/prsa_media_12.jpg"
        }
      ];

      const stmt = db.prepare("INSERT INTO testimonials (name, role_desc, quote, rating, photo_url) VALUES (?, ?, ?, ?, ?)");
      for (const t of tests) {
        stmt.run(t.name, t.role_desc, t.quote, t.rating, t.photo_url);
      }
    }

    // Seed Locations
    const countLoc = db.prepare("SELECT COUNT(*) as count FROM locations").get()?.count || 0;
    if (countLoc === 0) {
      const locs = [
        {
          name: "PRSA Floodlit Skating Arena",
          tag_label: "MAIN HEADQUARTERS",
          address: "Electronic City / Neo Town Corridor, Bengaluru, Karnataka 560100",
          phone: "+91 98765 43210",
          schedule: "Morning: 6:00 AM – 9:30 AM • Evening: 5:00 PM – 8:30 PM",
          maps_url: "https://maps.google.com/?q=Professional+Roller+Skating+Academy+Electronic+City",
          description: "Banked synthetic track with floodlight illumination, practice safety rails & spectator stands.",
          photo_url: "/uploads/prsa_media_10.jpg",
          display_order: 1
        },
        {
          name: "PRSA West Compound (HSR Layout)",
          tag_label: "QUAD & SLALOM",
          address: "HSR Layout Sector 2, near Agara Lake Sports Complex, Bengaluru",
          phone: "+91 98765 43211",
          schedule: "Tue - Sun • 6:00 AM – 8:30 PM",
          maps_url: "https://maps.google.com/?q=PRSA+Skating+HSR+Layout",
          description: "Flat & Banked Track Combination + Cones Agility Zone for slalom and toddlers.",
          photo_url: "/uploads/prsa_media_04.jpg",
          display_order: 2
        }
      ];

      const stmt = db.prepare("INSERT INTO locations (name, tag_label, address, phone, schedule, maps_url, description, photo_url, display_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
      for (const l of locs) {
        stmt.run(l.name, l.tag_label, l.address, l.phone, l.schedule, l.maps_url, l.description, l.photo_url, l.display_order);
      }
    }

    // Seed FAQs
    const countFaq = db.prepare("SELECT COUNT(*) as count FROM faqs").get()?.count || 0;
    if (countFaq === 0) {
      const faqs = [
        {
          question: "Do we need our own roller skates for the free trial session?",
          answer: "No! For your free trial class, PRSA provides certified quad or inline skates, certified helmets, knee pads, and elbow guards completely free. If you choose to enroll, our coaches perform a foot shape audit to advise on the right wheels and boot specifications.",
          category: "Trial & Gear",
          display_order: 1
        },
        {
          question: "Should my child start on Quad Skates or Inline Speed Skates?",
          answer: "For young kids (ages 4 to 6), quad skates provide broader lateral balance and help overcome fear of falling. Skaters age 7 and up or those with prior balance experience can choose either Quads or Inlines based on their competition interest. Our coaches assess this on Day 1.",
          category: "Programs",
          display_order: 2
        },
        {
          question: "Is PRSA officially affiliated with RSFI?",
          answer: "Yes, PRSA is fully aligned with Roller Skating Federation of India (RSFI) racing guidelines. Our competitive skaters receive official RSFI athlete registration cards and represent the academy at district, state, and national championship fixtures.",
          category: "Affiliation",
          display_order: 3
        },
        {
          question: "Can adults join without any previous roller skating experience?",
          answer: "Absoluteley. Our Adult Fitness & Open Rink program is tailored for working adults seeking low-impact cardiovascular conditioning. We begin with basic rink glides, core posture, and stopping techniques in a welcoming environment.",
          category: "Adults",
          display_order: 4
        }
      ];

      const stmt = db.prepare("INSERT INTO faqs (question, answer, category, display_order) VALUES (?, ?, ?, ?)");
      for (const f of faqs) {
        stmt.run(f.question, f.answer, f.category, f.display_order);
      }
    }
  } catch (err) {
    console.error("Error running database seed:", err);
  }
}
