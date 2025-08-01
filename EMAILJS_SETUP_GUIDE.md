# 📧 EmailJS Setup Guide for Akshit Singh Portfolio

## 🚀 Quick Setup (5 minutes)

### Step 1: Create EmailJS Account
1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up with your Gmail (akshit1742@gmail.com)
3. Verify your email

### Step 2: Add Email Service
1. Go to **Email Services** → **Add New Service**
2. Choose **Gmail**
3. Click **Connect Account** and authorize with your Gmail
4. **Copy your Service ID** (looks like: `service_abc123`)

### Step 3: Create Email Template
1. Go to **Email Templates** → **Create New Template**
2. **Template Name**: `Portfolio Contact Form`
3. **Copy the HTML from `emailjs-template.html`** and paste it in the template editor
4. **Subject Line**: `🚀 New Portfolio Contact: {{subject}} - from {{name}}`
5. **Copy your Template ID** (looks like: `template_xyz789`)

### Step 4: Get Public Key
1. Go to **Account** → **General**
2. **Copy your Public Key** (looks like: `user_abcdefghijk`)

### Step 5: Update Environment Variables
Edit your `.env.local` file:

```env
# EmailJS Configuration
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_abc123
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xyz789
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=user_abcdefghijk
```

### Step 6: Test Your Contact Form
1. Restart your dev server: `npm run dev`
2. Go to `http://localhost:3001`
3. Scroll to contact section
4. Fill out and submit the form
5. Check your Gmail inbox!

## 📧 What You'll Receive

When someone contacts you, you'll get a beautifully formatted email with:

- **Professional header** with your branding
- **Contact person's details** (name, email, timestamp)
- **Subject and message** in easy-to-read format
- **Quick action buttons** to reply or call back
- **Portfolio branding** and your contact info

## 🎨 Email Features

- ✅ **Professional Design** - Matches your portfolio theme
- ✅ **Mobile Responsive** - Looks great on all devices
- ✅ **Quick Actions** - Reply and call buttons
- ✅ **Timestamp** - Shows when message was sent (IST timezone)
- ✅ **Branded Footer** - Your professional details
- ✅ **Easy to Read** - Clean, organized layout

## 🔧 Customization

To customize the email template:
1. Edit `emailjs-template.html`
2. Update the template in your EmailJS dashboard
3. Test with a new form submission

## 🆘 Troubleshooting

**Form not sending?**
- Check your environment variables
- Make sure service is connected to Gmail
- Verify template ID is correct

**Not receiving emails?**
- Check Gmail spam folder
- Verify your Gmail is connected in EmailJS
- Test with EmailJS dashboard first

**Template not working?**
- Make sure all variables are included: `{{name}}`, `{{email}}`, `{{subject}}`, `{{message}}`, `{{time}}`
- Check HTML syntax in template editor

## 📞 Support

If you need help:
- EmailJS Documentation: [docs.emailjs.com](https://www.emailjs.com/docs/)
- Test your setup in EmailJS dashboard before going live

---

**Your contact form is now ready to receive professional emails! 🎉**
