# Deployment Checklist

## Pre-Deployment

- [x] All features implemented and tested locally
- [x] Health system working
- [x] Timer system working
- [x] All tutorial rooms functional
- [x] Test level playable
- [x] Leaderboard API endpoints created
- [x] Database schema defined
- [x] Environment variables documented
- [x] Build scripts configured
- [x] Deployment documentation created

## Database Setup

- [ ] Choose database provider (Supabase/Neon/Vercel Postgres)
- [ ] Create production database
- [ ] Copy connection string
- [ ] Test connection locally with production database
- [ ] Run `npx prisma db push` to create tables

## GitHub Setup

- [ ] Create GitHub repository
- [ ] Push code to GitHub
- [ ] Verify all files are committed
- [ ] Check .gitignore excludes .env.local

## Vercel Deployment

- [ ] Sign up/login to Vercel
- [ ] Import GitHub repository
- [ ] Configure build settings
- [ ] Add DATABASE_URL environment variable
- [ ] Deploy
- [ ] Wait for build to complete

## Post-Deployment Testing

- [ ] Visit deployment URL
- [ ] Test game loading
- [ ] Enter player name
- [ ] Complete Tutorial Room 1
- [ ] Complete Tutorial Room 2
- [ ] Complete Tutorial Room 3
- [ ] Complete Test Level
- [ ] Test leaderboard API: GET /api/leaderboard
- [ ] Test leaderboard API: POST /api/leaderboard
- [ ] Check browser console for errors
- [ ] Test on different browsers (Chrome, Firefox, Safari)
- [ ] Test on mobile devices (optional)

## Performance Check

- [ ] Game loads within 3 seconds
- [ ] No lag during gameplay
- [ ] Smooth animations
- [ ] Responsive controls
- [ ] No memory leaks

## Optional Enhancements

- [ ] Add custom domain
- [ ] Enable Vercel Analytics
- [ ] Setup error monitoring (Sentry)
- [ ] Add rate limiting to API
- [ ] Optimize images and assets
- [ ] Add meta tags for SEO
- [ ] Add Open Graph tags for social sharing

## Monitoring

- [ ] Check Vercel deployment logs
- [ ] Monitor database usage
- [ ] Check API response times
- [ ] Monitor error rates

## Documentation

- [ ] Update README with live URL
- [ ] Document any deployment issues encountered
- [ ] Update objectives.md with completion status
- [ ] Add learnings to takeaway.md

---

## Quick Deploy Commands

```bash
# 1. Ensure everything is committed
git status
git add .
git commit -m "Ready for production deployment"

# 2. Push to GitHub
git push origin main

# 3. Deploy via Vercel CLI (alternative to dashboard)
vercel --prod

# 4. Push database schema
npx prisma db push
```

---

## Rollback Plan

If deployment fails:

1. Check Vercel deployment logs
2. Verify environment variables
3. Test build locally: `pnpm build`
4. Check database connection
5. Revert to previous deployment in Vercel dashboard if needed

---

## Success Criteria

✅ Game is accessible at public URL
✅ All features work as expected
✅ No console errors
✅ Database operations successful
✅ Performance is acceptable
✅ Mobile-friendly (if applicable)

---

**Ready to deploy? Follow DEPLOYMENT.md for detailed instructions!**
