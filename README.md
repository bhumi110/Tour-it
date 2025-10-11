# 🏡 Tour-it

A full-stack web application that replicates the core features of **Airbnb**.  
Users can create listings, upload images, leave reviews, and manage their own properties with secure authentication and authorization.

🌐 **Live Demo:** [tour-it-6o7q.onrender.com](https://tour-it-6o7q.onrender.com)
- Note: Currently optimized for desktop; mobile responsiveness coming soon...
---

## 🚀 Features
- 🔐 **Authentication & Authorization**
  - User registration and login system (using Passport.js)
  - Secure password handling (passport-local-mongoose)
  - Only listing owners can edit/delete their listings
  - Only review authors can edit/delete their reviews
- 🏠 **Listings**
  - Create, update, and delete listings
  - Upload multiple images with **Multer + Cloudinary**
  - Validation with **Joi**
- 💬 **Reviews & Comments**
  - Add star ratings & comments on listings
  - Edit/Delete only your own reviews

---

## 🛠️ Tech Stack
**Frontend:**  
- HTML, CSS, JavaScript, EJS, EJS-Mate  

**Backend:**  
- Node.js, Express.js  

**Database:**  
- MongoDB with Mongoose  

**Authentication & Security:**  
- Passport.js, Passport-Local, Passport-Local-Mongoose  
- Express-Session, Connect-Flash  

**Image Uploads:**  
- Multer, Multer-Storage-Cloudinary, Cloudinary  

**Validation:**  
- Joi  

---


## 📸 Screenshots  

<p align="center">
  <img src="./output/homepage.png" alt="Homepage" width="400"/>
  <img src="./output/loginpage.png" alt="Login Page" width="400"/>
</p>

<p align="center">
  <img src="./output/create.png" alt="Create Listing" width="400"/>
  <img src="./output/detail.png" alt="Listing Details" width="400"/>
</p>
  


