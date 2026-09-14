# 🏆 PRSA Skating Academy — Non-Technical Admin & Management Guide

Welcome to the **PRSA Skating Academy Web Application Management Guide**. This document is designed for academy directors, coaches, and administrative staff. You **do not need any coding knowledge** to manage, update, and maintain this website.

---

## 📌 Table of Contents
1. [Logging In to the Admin Portal](#1-logging-in-to-the-admin-portal)
2. [Managing Free Trial Bookings](#2-managing-free-trial-bookings)
3. [Managing Contact Form Enquiries](#3-managing-contact-form-enquiries)
4. [Updating Website Content & Announcement Banners](#4-updating-website-content--announcement-banners)
5. [Managing Training Programs & Schedules](#5-managing-training-programs--schedules)
6. [Managing Coaches & Staff Profiles](#6-managing-coaches--staff-profiles)
7. [Uploading Photos & Videos to the Gallery](#7-uploading-photos--videos-to-the-gallery)
8. [Updating Contact Info, Phone Numbers & Addresses](#8-updating-contact-info-phone-numbers--addresses)
9. [SEO & Google Search Settings](#9-seo--google-search-settings)
10. [Security & Downloading Database Backups](#10-security--downloading-database-backups)
11. [Quick Troubleshooting Guide for Staff](#11-quick-troubleshooting-guide-for-staff)

---

## 1. Logging In to the Admin Portal

* **Admin Portal Web Address**: `https://yourdomain.com/admin/login` *(or `http://localhost:5173/admin/login` during local testing)*
* **Initial Default Login Email**: `admin@prsaroller.com`
* **Initial Default Password**: `Admin@123456`

> ⚠️ **IMPORTANT**: Change your default password immediately after logging in for the first time! (Go to **Settings** in the Admin panel).

---

## 2. Managing Free Trial Bookings

When a parent or skater fills out the **"Book a Free Trial Class"** form on the public website:

1. Click on **Trial Bookings** in the left sidebar menu.
2. You will see a table listing all student requests with details:
   * **Athlete Name & Age**
   * **Parent Phone Number & Email**
   * **Discipline Selected** (Quad, Speed Inline, Toddler Beginner, Slalom)
   * **Preferred Track Location**
   * **Experience Level**
3. **Changing Lead Status**:
   * Click on the status badge (**New**, **Contacted**, **Trial Scheduled**, **Enrolled**, or **Cancelled**) to keep your team organized.
4. **Staff Notes**:
   * Click **"Add Note"** to write down trial call details (e.g. *"Called parent on Monday, scheduled trial for Saturday 6:30 AM"*).

---

## 3. Managing Contact Form Enquiries

When visitors send a message via the **Contact Us** form:

1. Click on **Contact Enquiries** in the left sidebar menu.
2. View visitor messages, phone numbers, and subject lines.
3. Update the status badge (**New**, **In Progress**, **Resolved**) after contacting the parent or client.

---

## 4. Updating Website Content & Announcement Banners

You can change website text and headlines without touching code:

1. Click on **Content Manager** in the left sidebar.
2. Select the section you want to modify:
   * **Hero Section**: Change top announcement badges, main headlines (*"UNLEASH SPEED"*, *"MASTER THE RINK"*), hero subtext, and main banner image.
   * **Academy Stats**: Update numbers like active skaters trained (*"850+"*), championship medals (*"12+"*), or certified coaches (*"8 RSFI"*).
   * **About Section**: Update academy overview text, founding mission, and RSFI affiliation details.
3. Click **"Save Changes"** at the top right. Changes update on the public website instantly!

---

## 5. Managing Training Programs & Schedules

To add or update training categories (e.g. Quad Speed, Speed Inline, Beginner Toddler, Freestyle Slalom):

1. Go to **Content Manager** -> **Programs Tab**.
2. Click **"+ Add New Program"** or click **"Edit"** next to an existing program.
3. Update:
   * **Program Name & Level** (e.g., *Beginner, Intermediate, Advanced RSFI Competition*)
   * **Age Group** (e.g., *Ages 4 to 16+*)
   * **Short Summary & Full Description**
   * **Session Timings & Duration** (e.g., *6:00 AM – 7:30 AM (Tue - Sun)*)
   * **Cover Photo** (Upload image)
4. Toggle **Published / Hidden** to hide programs seasonally.

---

## 6. Managing Coaches & Staff Profiles

To update coach profiles and certifications:

1. Go to **Content Manager** -> **Coaches Tab**.
2. Click **"+ Add New Coach"** or **"Edit"**.
3. Fill in:
   * **Coach Full Name & Position** (e.g., *Head Speed Skating Coach*)
   * **RSFI Certifications & Experience** (e.g., *Level 3 RSFI Certified, 12+ Yrs Exp*)
   * **Specialization & Achievements**
   * **Coach Photo**
4. Click **Save**.

---

## 7. Uploading Photos & Videos to the Gallery

To add training photos, event highlights, and competition videos:

1. Click on **Media Library** in the left sidebar.
2. Click **"Upload New Media"**.
3. Select your photo (`.jpg`, `.png`, `.webp`) or video (`.mp4`) from your phone or computer.
4. Give it a **Title** and select a **Category** (e.g. *Speed Track, Ryan Competition, Podium Medals, Toddlers*).
5. Click **Upload**. The media will automatically appear on the public website's interactive gallery!

---

## 8. Updating Contact Info, Phone Numbers & Addresses

If your academy phone number, WhatsApp number, or venue address changes:

1. Click on **Settings** in the left sidebar.
2. Update:
   * **Academy Name & Tagline**
   * **Main Phone Number** (e.g., `+91 98765 43210`)
   * **WhatsApp Number** (e.g., `919876543210` without spaces or `+` sign)
   * **Admissions Email**
   * **Physical Address & Business Hours**
3. Click **"Save Academy Settings"**.

---

## 9. SEO & Google Search Settings

To control how your website appears on Google and WhatsApp share previews:

1. Click on **SEO Manager** in the left sidebar.
2. Edit:
   * **Page Meta Title**: What appears in the browser tab and Google search results.
   * **Meta Description**: A short summary describing your academy.
   * **Social Share Preview Image**: The image shown when someone shares your website link on WhatsApp, Facebook, or Instagram.
3. Click **"Save SEO Configuration"**.

---

## 10. Security & Downloading Database Backups

### Changing Your Password:
1. Go to **Settings**.
2. Scroll to **Security & Admin Accounts**.
3. Enter a new secure password and save.

### Downloading Backup Data (Recommended Weekly):
1. Go to **Settings**.
2. Click the **"Download Database Backup"** button at the top right.
3. Save the `.sqlite` file on your computer or Google Drive. This contains 100% of your student trial bookings, messages, programs, and settings. If anything ever happens to your server, your data is completely safe.

---

## 11. Quick Troubleshooting Guide for Staff

| Problem | Cause | Solution |
| :--- | :--- | :--- |
| **I forgot the admin password.** | Forgotten credentials | Ask your technical developer to re-run `npm run seed` on the server to reset the admin user to default, or update the database directly. |
| **Form submission says server error.** | Backend server is turned off | Ensure the Node server process (`npm start`) is running on your server host. |
| **Image uploaded is too big.** | File size exceeds 15MB limit | Resize or compress the image using a free tool like TinyPNG before uploading. |
| **WhatsApp link opens wrong number.** | Incorrect number format in Settings | Ensure the WhatsApp number in **Settings** has country code without `+` or spaces (e.g. `919876543210`). |

---

*Document version: 1.0.0 — Prepared for PRSA Skating Academy Administration.*
