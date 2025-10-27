# 🚀 راهنمای کامل Deploy صفحه فرود در Netlify

## مشکل: چرا سامانه انتخابات نمایش داده می‌شود؟

اگر در Netlify با تنظیم Base Directory به `landing-page` همچنان سامانه انتخابات نمایش داده می‌شود، به این دلیل است که:

1. ❌ Base directory باید دقیقاً `landing-page/frontend` باشد نه `landing-page`
2. ❌ Publish directory باید `dist` باشد نه `build`
3. ❌ Build command باید مطابق با Vite باشد

---

## ✅ راه حل کامل

### مرحله 1: حذف سایت قبلی و ایجاد سایت جدید

در Netlify Dashboard:
1. سایت قبلی را حذف کنید (یا یک سایت جدید بسازید)
2. به Settings > Build & deploy بروید

### مرحله 2: تنظیمات Build صحیح

**⚠️ مهم: این تنظیمات را دقیقاً همین‌طور وارد کنید**

```
Base directory: landing-page/frontend
Build command: npm run build
Publish directory: landing-page/frontend/dist
```

### مرحله 3: Environment Variables

در **Site settings > Environment variables** این متغیر را اضافه کنید:

```
Key: VITE_API_BASE_URL
Value: https://shomal-anjomanuni.onrender.com/api/landing
```

### مرحله 4: Deploy!

کد را Push کنید یا Trigger deploy دستی بزنید.

---

## 📋 Checklist قبل از Deploy

- [ ] Base directory: `landing-page/frontend` ✅
- [ ] Build command: `npm run build` ✅
- [ ] Publish directory: `landing-page/frontend/dist` ✅
- [ ] Environment variable: `VITE_API_BASE_URL` تنظیم شده ✅
- [ ] Backend endpoints در Render فعال است ✅
- [ ] CORS در backend برای دامنه Netlify باز است ✅

---

## 🔧 در صورت بروز مشکل

### مشکل 1: هنوز سامانه انتخابات نمایش داده می‌شود

**راه حل:**
- Clear کنید Cache & Deploy از Netlify
- یا سایت را حذف کرده و دوباره بسازید با تنظیمات صحیح

### مشکل 2: صفحه سفید یا خطای 404

**راه حل:**
- چک کنید Publish directory حتماً `landing-page/frontend/dist` باشد
- Build logs را در Netlify بررسی کنید

### مشکل 3: API کار نمی‌کند

**راه حل:**
1. بررسی کنید Environment variable درست تنظیم شده
2. بررسی کنید Backend در Render در حال اجراست
3. تست کنید: `https://shomal-anjomanuni.onrender.com/api/landing/health`

---

## 🎯 لینک‌های تست

بعد از deploy موفق، این لینک‌ها باید کار کنند:

- Frontend: `https://your-site.netlify.app`
- Backend Health: `https://shomal-anjomanuni.onrender.com/api/landing/health`

---

## 📸 تنظیمات صحیح در Netlify

در بخش **Build settings** باید دقیقاً این‌طور باشد:

```
Repository: your-github-repo
Base directory: landing-page/frontend
Build command: npm run build
Publish directory: landing-page/frontend/dist
```

---

## 🆘 در صورت نیاز به کمک

اگر همچنان مشکل دارید:

1. Screenshot از Build settings بگیرید
2. Build logs را کپی کنید
3. با من در میان بگذارید

موفق باشید! 🎉
