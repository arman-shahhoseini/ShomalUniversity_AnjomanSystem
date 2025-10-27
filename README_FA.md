# صفحه فرود انجمن علمی دانشگاه شمال

یک صفحه فرود مدرن، جذاب و تعاملی برای جذب و معرفی دانشجویان جدیدالورود به انجمن علمی دانشگاه شمال.

## 🎯 ویژگی‌ها

### صفحات اصلی (9 صفحه)

1. **صفحه خوش‌آمدگویی** - معرفی جذاب با انیمیشن‌های خاص
2. **معرفی انجمن** - توضیح نقش و اهمیت انجمن علمی
3. **فرم نام** - دریافت نام و نام خانوادگی
4. **فرم شماره تماس** - دریافت شماره موبایل
5. **فرم رشته تحصیلی** - دریافت رشته تحصیلی
6. **فرم علاقه‌مندی‌ها** - دریافت علاقه‌مندی‌های دانشجو
7. **پیش‌نمایش سامانه انتخابات** - نمایش و لینک به سامانه اصلی
8. **پیام موفقیت** - تایید ثبت‌نام + اطلاع از قرعه‌کشی
9. **پیام نهایی** - پیام انگیزشی و دعوت به همکاری

### طراحی و UI/UX

- ✨ تم تیره حرفه‌ای با رنگ‌های نئون (آبی، طلایی، بنفش)
- 🎨 انیمیشن‌های روان با Framer Motion
- 📱 کاملاً Responsive (موبایل، تبلت، دسکتاپ)
- ⌨️ پشتیبانی از کیبورد (فلش‌های چپ/راست)
- 🎯 Navigation Dots برای حرکت بین صفحات
- 💫 Animated Background با Gradient Blobs
- ✅ Form Validation کامل

### پنل مدیریت

- 📊 نمایش آمار کلی (تعداد ثبت‌نام‌ها، رشته‌های مختلف)
- 🔍 جستجو و فیلتر بر اساس نام، شماره، علاقه‌مندی
- 📥 دانلود به صورت CSV
- 🔄 بروزرسانی خودکار هر 30 ثانیه
- 📱 Responsive Design

## 🚀 نحوه اجرا

### Development

```bash
cd /app/landing-page/frontend
yarn install
yarn dev
```

صفحه اصلی: `http://localhost:3001`
پنل مدیریت: `http://localhost:3001/admin`

### Production

فایل `.env.production` را با آدرس صحیح API تنظیم کنید:

```env
VITE_API_BASE_URL=https://your-domain.com/api/landing
```

سپس:

```bash
yarn build
```

## 🔌 API Integration

صفحه فرود به API های زیر متصل است:

### Backend Endpoints

- `GET /api/landing/health` - بررسی سلامت سرویس
- `POST /api/landing/register` - ثبت‌نام دانشجو جدید
- `GET /api/landing/registrations` - دریافت لیست ثبت‌نام‌ها
- `GET /api/landing/stats` - دریافت آمار

### نمونه Request

```bash
curl -X POST http://localhost:8001/api/landing/register \
  -H "Content-Type: application/json" \
  -d '{
    "first_name": "علی",
    "last_name": "محمدی",
    "phone": "09123456789",
    "field_of_study": "مهندسی کامپیوتر",
    "interests": "برنامه‌نویسی، هوش مصنوعی"
  }'
```

## 📁 ساختار پروژه

```
landing-page/
├── frontend/
│   ├── src/
│   │   ├── App.jsx           # صفحه اصلی با 9 صفحه
│   │   ├── AdminPanel.jsx    # پنل مدیریت
│   │   ├── main.jsx          # Router
│   │   └── index.css         # استایل‌های سفارشی
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
├── backend/
│   ├── server.py            # API Endpoints
│   └── requirements.txt
└── README_FA.md
```

## 🎨 تکنولوژی‌های استفاده شده

### Frontend
- **React 19** - کتابخانه UI
- **Vite 7** - Build Tool
- **Framer Motion** - انیمیشن‌ها
- **Tailwind CSS** - استایل‌دهی
- **Axios** - HTTP Client
- **Vazirmatn Font** - فونت فارسی

### Backend
- **FastAPI** - Framework
- **MongoDB** - دیتابیس
- **Motor** - MongoDB Async Driver
- **Pydantic** - Validation

## 📱 QR Code Access

این صفحه برای دسترسی از طریق QR Code طراحی شده است:
1. کاربر QR Code را اسکن می‌کند
2. به صفحه اصلی هدایت می‌شود
3. مرحله به مرحله فرم را پر می‌کند
4. در قرعه‌کشی شرکت می‌دهد
5. سامانه انتخابات را مشاهده می‌کند

## 🔐 امنیت

- Validation کامل در سمت Backend
- Rate Limiting برای جلوگیری از Spam
- CORS Configuration صحیح
- Input Sanitization

## 📊 مانیتورینگ

پنل مدیریت امکان مشاهده:
- تعداد کل ثبت‌نام‌ها
- رشته‌های مختلف
- جستجو و فیلتر
- Export به CSV

## 🌐 Deployment

### Netlify (Frontend)

```bash
cd frontend
yarn build
# آپلود فولدر dist به Netlify
```

### Render (Backend)

Backend از قبل در `/app/backend/server.py` یکپارچه شده است.

## 📞 پشتیبانی

برای هرگونه سوال یا مشکل:
- ایمیل: shomalanjoman.admin@shomal.ir
- تلگرام: @anjomanshomal

## 📝 یادداشت‌های مهم

1. **عدم تغییر سامانه انتخابات**: کد سامانه انتخابات اصلی تغییر نکرده و فقط لینک نمایش داده می‌شود
2. **ذخیره‌سازی**: تمام داده‌ها در MongoDB ذخیره می‌شوند
3. **Mobile First**: طراحی با اولویت موبایل انجام شده
4. **Performance**: بهینه‌سازی برای سرعت بالا

## 🎉 ویژگی‌های خاص

- انیمیشن‌های Smooth و حرفه‌ای
- Navigation با Keyboard و Dots
- Progress Tracking
- Auto-Save در Admin Panel
- Real-time Updates
- Export به CSV
- Fully Responsive
- RTL Support کامل

---

**ساخته شده با ❤️ برای انجمن علمی دانشگاه شمال**
