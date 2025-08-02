# 🚀 Admin System Setup Guide

## 📋 Overview
Your portfolio now has a complete admin system that allows you to:
- ✅ Login as admin with JWT authentication
- ✅ Manage bio/introduction dynamically
- ✅ Add/edit/delete skills
- ✅ Add/edit/delete projects
- ✅ Add/edit/delete work experience
- ✅ Update contact information
- ✅ All changes reflect immediately on your live portfolio

## 🛠️ Setup Instructions

### Step 1: MongoDB Database Setup
1. **Create MongoDB Atlas Account**: Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. **Create a Cluster**: Choose the free tier
3. **Create Database User**: 
   - Go to Database Access
   - Add new user with username/password
4. **Get Connection String**:
   - Go to Clusters → Connect → Connect your application
   - Copy the connection string
   - Replace `<password>` with your actual password

### Step 2: Update Environment Variables
Edit your `.env.local` file with these values:

```env
# MongoDB Configuration
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_random_at_least_32_characters
JWT_EXPIRES_IN=7d

# No admin credentials needed in .env - they're stored in MongoDB!
```

### Step 3: Create Admin User
1. **Start your development server**: `npm run dev`
2. **Go to setup page**: `http://localhost:3001/admin/setup`
3. **Fill in your details**:
   - Name: Your full name
   - Email: Your email address
   - Password: Create a secure password
   - Confirm Password: Repeat the password
4. **Click "Create Admin Account"**
5. **You'll be redirected to login page**

### Step 4: Access Admin Panel
1. **Login**: Go to `http://localhost:3001/admin/login`
2. **Use the credentials you just created**
3. **Access dashboard**: You'll be redirected to `/admin/dashboard`

## 🎯 Admin Panel Features

### 📝 Bio & Introduction
- Update your name, title, and description
- Add profile image URL
- Update resume/CV link
- Changes appear immediately on homepage

### 💻 Skills Management
- Add skills with categories (Frontend, Backend, Database, Tools, Other)
- Set skill levels (Beginner, Intermediate, Advanced, Expert)
- Reorder skills with order field
- Delete skills you no longer use

### 🚀 Projects Management
- Add project details (title, description, technologies)
- Add GitHub and live demo links
- Mark projects as featured
- Set project status (Completed, In Progress, Planned)
- Upload project images (URL for now)

### 💼 Experience Management
- Add work experience with company details
- Set start/end dates or mark as current
- Add technologies used and key achievements
- Automatic timeline sorting

### 📞 Contact Information
- Update email, phone, location
- Add social media links (LinkedIn, GitHub, Twitter)
- Set availability status
- Update personal website

## 🔒 Security Features

- **JWT Authentication**: Secure token-based login
- **Protected Routes**: Admin panel requires authentication
- **HTTP-Only Cookies**: Secure token storage
- **Password Hashing**: Bcrypt with salt rounds
- **Environment Variables**: Sensitive data in .env files

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `POST /api/auth/logout` - Logout
- `GET /api/auth/profile` - Get user profile
- `POST /api/auth/setup` - Create initial admin user

### Portfolio Content (Public GET, Protected POST/PUT/DELETE)
- `/api/portfolio/bio` - Bio/introduction
- `/api/portfolio/skills` - Skills management
- `/api/portfolio/projects` - Projects management
- `/api/portfolio/experience` - Experience management
- `/api/portfolio/contact-info` - Contact information

## 🚀 Deployment Guide

### Environment Variables for Production
```env
# Production MongoDB
MONGODB_URI=your_production_mongodb_uri

# Strong JWT Secret (generate with: openssl rand -base64 32)
JWT_SECRET=your_production_jwt_secret

# Set to production
NODE_ENV=production

# No admin credentials needed - they're in MongoDB!
```

### Deployment Steps
1. **Deploy to Vercel/Netlify**:
   - Connect your GitHub repository
   - Add environment variables in dashboard (only MONGODB_URI and JWT_SECRET)
   - Deploy automatically

2. **Setup Admin User**:
   - Visit `https://yourdomain.com/admin/setup`
   - Create your admin account through the web form

3. **Access Admin Panel**:
   - Go to `https://yourdomain.com/admin/login`
   - Login with the credentials you created

## 🎨 Customization

### Adding New Content Types
1. **Create Schema** in `/src/models/Portfolio.ts`
2. **Add API Routes** in `/src/app/api/portfolio/[content-type]/`
3. **Create Admin Component** in `/src/components/admin/`
4. **Add to Dashboard** in `/src/app/admin/dashboard/page.tsx`

### Styling
- All components use Tailwind CSS
- Consistent design system with blue/purple theme
- Responsive design for mobile/desktop
- Dark mode support ready

## 🔧 Troubleshooting

### Common Issues
1. **MongoDB Connection Error**: Check connection string and network access
2. **JWT Token Issues**: Ensure JWT_SECRET is set and long enough
3. **Admin User Creation**: Make sure ADMIN_EMAIL and ADMIN_PASSWORD are set
4. **CORS Issues**: Add your domain to allowed origins if needed

### Debug Mode
Add to `.env.local` for debugging:
```env
DEBUG=true
```

## 📱 Mobile Support
- Responsive admin dashboard
- Touch-friendly interface
- Mobile-optimized forms
- Sidebar navigation for mobile

## 🎉 You're Ready!
Your portfolio now has a complete admin system. You can:
1. Login at `/admin/login`
2. Manage all content dynamically
3. See changes immediately on your live site
4. No more code editing required!

---

**Need help?** Check the console for error messages or review the API responses in browser dev tools.
