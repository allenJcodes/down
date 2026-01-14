# Vercel Deployment Guide

## Prerequisites

1. **GitHub Account** - Your code should be pushed to a GitHub repository
2. **Vercel Account** - Sign up at [vercel.com](https://vercel.com)
3. **PostgreSQL Database** - Set up a production database (Supabase, Neon, or Vercel Postgres)

---

## Step 1: Prepare Your Database

### Option A: Supabase (Recommended)

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Wait for the database to be provisioned
3. Go to **Settings** → **Database** → **Connection String**
4. Copy the **Connection Pooling** URI (starts with `postgresql://`)
5. Save this for Step 3

### Option B: Neon

1. Go to [neon.tech](https://neon.tech) and create a new project
2. Copy the connection string provided
3. Save this for Step 3

### Option C: Vercel Postgres

1. In your Vercel dashboard, go to **Storage** → **Create Database**
2. Select **Postgres**
3. Follow the setup wizard
4. Copy the connection string

---

## Step 2: Push to GitHub

```bash
# Initialize git if not already done
git init

# Add all files
git add .

# Commit
git commit -m "Ready for deployment"

# Add remote (replace with your repo URL)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# Push to GitHub
git push -u origin main
```

---

## Step 3: Deploy to Vercel

### Via Vercel Dashboard

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click **Import Git Repository**
3. Select your GitHub repository
4. Configure your project:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./` (leave as default)
   - **Build Command**: `next build` (auto-detected)
   - **Output Directory**: `.next` (auto-detected)

5. **Add Environment Variables**:
   - Click **Environment Variables**
   - Add: `DATABASE_URL` = `your_postgresql_connection_string`
   - (Optional) Add Upstash variables if using rate limiting

6. Click **Deploy**

### Via Vercel CLI (Alternative)

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? Select your account
# - Link to existing project? No
# - Project name? down-platformer (or your choice)
# - Directory? ./ (press Enter)
# - Override settings? No

# Add environment variables
vercel env add DATABASE_URL
# Paste your database URL when prompted

# Deploy to production
vercel --prod
```

---

## Step 4: Run Database Migrations

After deployment, you need to push your Prisma schema to the production database:

```bash
# Set the production database URL temporarily
export DATABASE_URL="your_production_database_url"

# Push schema to production database
npx prisma db push

# Or if you prefer migrations
npx prisma migrate deploy
```

**Alternative**: Use Vercel's terminal or add a postbuild script:

Add to `package.json`:
```json
{
  "scripts": {
    "postbuild": "prisma generate"
  }
}
```

Then run migrations manually via your database provider's console or a one-time deployment script.

---

## Step 5: Verify Deployment

1. Visit your deployment URL (e.g., `https://your-project.vercel.app`)
2. Test the game:
   - Enter a player name
   - Complete tutorial rooms
   - Test the test level
3. Check the leaderboard API:
   - Visit `/api/leaderboard` to see if it returns data

---

## Environment Variables Needed

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | Yes | PostgreSQL connection string |
| `UPSTASH_REDIS_REST_URL` | No | For rate limiting (optional) |
| `UPSTASH_REDIS_REST_TOKEN` | No | For rate limiting (optional) |

---

## Troubleshooting

### Build Fails

**Error**: `Prisma Client not generated`
- **Solution**: Add `prisma generate` to your build command
- In Vercel: Settings → General → Build Command → `prisma generate && next build`

**Error**: `Cannot find module 'phaser'`
- **Solution**: Ensure all dependencies are in `dependencies`, not `devDependencies`

### Database Connection Issues

**Error**: `Can't reach database server`
- **Solution**: Check your DATABASE_URL is correct
- Ensure your database allows connections from Vercel's IP ranges
- For Supabase: Use the **Connection Pooling** string, not the direct connection

### Runtime Errors

**Error**: `Module not found` in browser
- **Solution**: Check that all imports use correct paths
- Verify `tsconfig.json` path aliases are working

---

## Post-Deployment

### Custom Domain (Optional)

1. Go to your project in Vercel
2. Click **Settings** → **Domains**
3. Add your custom domain
4. Follow DNS configuration instructions

### Monitoring

- **Vercel Analytics**: Automatically enabled
- **Error Tracking**: Consider adding Sentry
- **Database Monitoring**: Use your database provider's dashboard

### Continuous Deployment

Vercel automatically deploys when you push to your main branch:

```bash
# Make changes
git add .
git commit -m "Update game mechanics"
git push

# Vercel will automatically deploy
```

---

## Production Checklist

- [ ] Database is set up and accessible
- [ ] Environment variables are configured in Vercel
- [ ] Prisma schema is pushed to production database
- [ ] Build succeeds without errors
- [ ] Game loads and is playable
- [ ] Leaderboard API works
- [ ] No console errors in browser
- [ ] Performance is acceptable

---

## Useful Commands

```bash
# View deployment logs
vercel logs

# List all deployments
vercel ls

# Remove a deployment
vercel rm [deployment-url]

# Open project in browser
vercel open

# Check environment variables
vercel env ls
```

---

## Support

- **Vercel Docs**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Prisma Docs**: https://www.prisma.io/docs
- **Phaser Docs**: https://photonstorm.github.io/phaser3-docs/

---

**Your game is now live! 🎮**
