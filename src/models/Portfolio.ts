import mongoose from 'mongoose';

// Bio/Introduction Schema
const BioSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  description: { type: String, required: true },
  profileImage: { type: String },
  resumeLink: { type: String },
}, { timestamps: true });

// Skills Schema
const SkillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { 
    type: String, 
    required: true,
    enum: ['Frontend', 'Backend', 'Database', 'Tools', 'Other']
  },
  level: { 
    type: String, 
    enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'],
    default: 'Intermediate'
  },
  icon: { type: String }, // For icon class or image URL
  order: { type: Number, default: 0 },
}, { timestamps: true });

// Projects Schema
const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  shortDescription: { type: String },
  technologies: [{ type: String }],
  githubUrl: { type: String },
  liveUrl: { type: String },
  image: { type: String },
  featured: { type: Boolean, default: false },
  status: { 
    type: String, 
    enum: ['Completed', 'In Progress', 'Planned'],
    default: 'Completed'
  },
  order: { type: Number, default: 0 },
}, { timestamps: true });

// Experience Schema
const ExperienceSchema = new mongoose.Schema({
  company: { type: String, required: true },
  position: { type: String, required: true },
  location: { type: String },
  startDate: { type: Date, required: true },
  endDate: { type: Date }, // null for current job
  current: { type: Boolean, default: false },
  description: { type: String, required: true },
  technologies: [{ type: String }],
  achievements: [{ type: String }],
  companyLogo: { type: String },
  order: { type: Number, default: 0 },
}, { timestamps: true });

// Education Schema
const EducationSchema = new mongoose.Schema({
  institution: { type: String, required: true },
  degree: { type: String, required: true },
  field: { type: String },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  current: { type: Boolean, default: false },
  grade: { type: String },
  description: { type: String },
  logo: { type: String },
  order: { type: Number, default: 0 },
}, { timestamps: true });

// Certifications Schema
const CertificationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  issuer: { type: String, required: true },
  issueDate: { type: Date, required: true },
  expiryDate: { type: Date },
  credentialId: { type: String },
  credentialUrl: { type: String },
  image: { type: String },
  skills: [{ type: String }],
  order: { type: Number, default: 0 },
}, { timestamps: true });

// Contact Info Schema
const ContactInfoSchema = new mongoose.Schema({
  email: { type: String, required: true },
  phone: { type: String },
  location: { type: String },
  linkedin: { type: String },
  github: { type: String },
  twitter: { type: String },
  website: { type: String },
  availability: { 
    type: String, 
    enum: ['Available', 'Busy', 'Not Available'],
    default: 'Available'
  },
}, { timestamps: true });

// Export all models
export const Bio = mongoose.models.Bio || mongoose.model('Bio', BioSchema);
export const Skill = mongoose.models.Skill || mongoose.model('Skill', SkillSchema);
export const Project = mongoose.models.Project || mongoose.model('Project', ProjectSchema);
export const Experience = mongoose.models.Experience || mongoose.model('Experience', ExperienceSchema);
export const Education = mongoose.models.Education || mongoose.model('Education', EducationSchema);
export const Certification = mongoose.models.Certification || mongoose.model('Certification', CertificationSchema);
export const ContactInfo = mongoose.models.ContactInfo || mongoose.model('ContactInfo', ContactInfoSchema);
