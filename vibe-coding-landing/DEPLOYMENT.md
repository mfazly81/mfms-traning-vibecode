# 🚀 Netlify Deployment Guide

## Prerequisites

1. **GitHub Repository** - Your code should be pushed to GitHub
2. **Netlify Account** - Sign up at [netlify.com](https://netlify.com)
3. **Supabase Project** - Make sure your Supabase project is set up

## Environment Variables

Before deploying, you need to set up environment variables in Netlify:

### Required Environment Variables

1. Go to your **Netlify Dashboard**
2. Navigate to **Site settings** → **Environment variables**
3. Add these variables:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_SITE_URL=https://your-site-name.netlify.app
```

## Deployment Steps

### Option 1: Deploy from GitHub (Recommended)

1. **Connect to GitHub**
   - Go to [netlify.com](https://netlify.com)
   - Click **"New site from Git"**
   - Choose **GitHub** and authorize Netlify

2. **Select Repository**
   - Choose your `vibe-coding-landing` repository
   - Netlify will auto-detect the build settings

3. **Build Settings** (should auto-detect):
   - **Build command**: `npm run build`
   - **Publish directory**: `out`
   - **Node version**: `18`

4. **Deploy**
   - Click **"Deploy site"**
   - Wait for the build to complete

### Option 2: Manual Deploy

1. **Build locally**:
   ```bash
   npm run build
   ```

2. **Upload to Netlify**:
   - Go to [netlify.com](https://netlify.com)
   - Drag and drop the `out` folder to deploy

## Post-Deployment

### 1. Set Environment Variables
- Go to **Site settings** → **Environment variables**
- Add your Supabase credentials
- Redeploy the site

### 2. Test the Form
- Visit your deployed site
- Test the subscription form
- Check your Supabase dashboard for new subscribers

### 3. Custom Domain (Optional)
- Go to **Domain settings**
- Add your custom domain
- Configure DNS settings

## Troubleshooting

### Build Errors
- Check that all dependencies are in `package.json`
- Ensure Node.js version is 18+
- Verify environment variables are set

### Form Not Working
- Check Supabase environment variables
- Verify Supabase project is active
- Check browser console for errors

### Performance Issues
- Images are optimized automatically
- Static files are cached
- CDN is enabled by default

## Features

✅ **Static Export** - Optimized for Netlify  
✅ **Environment Variables** - Secure Supabase connection  
✅ **Form Functionality** - Working subscription form  
✅ **Responsive Design** - Mobile-friendly  
✅ **Dark Theme** - Modern UI  
✅ **SEO Optimized** - Meta tags and structure  

## Support

If you encounter issues:
1. Check the **Deploy logs** in Netlify dashboard
2. Verify **Environment variables** are set correctly
3. Test **Supabase connection** locally first
4. Check **Browser console** for JavaScript errors

Your Vibe Coding landing page is now ready for deployment! 🎉 