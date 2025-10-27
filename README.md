# صفحه فرود انجمن علمی دانشگاه شمال

این پروژه صفحه فرود رسمی و تعاملی انجمن علمی دانشگاه شمال برای جشن خوش‌آمدگویی دانشجویان جدیدالورود است.

## ✨ ویژگی‌ها

- **Hero Section** با انیمیشن‌های نئونی و افکت‌های جذاب
- **فرم تعاملی مرحله‌به‌مرحله** برای ثبت‌نام دانشجویان
- **پنل ادمین** برای مشاهده لیست ثبت‌نام‌ها
- **لینک به سامانه انتخابات** الکترونیکی
- **طراحی تم تاریک** با رنگ‌های نئونی آبی، طلایی و بنفش
- **کاملاً واکنش‌گرا** (Responsive) برای موبایل و دسکتاپ

## 🚀 دسترسی به سرویس‌ها

### Frontend
- صفحه اصلی: `http://localhost:3001`
- پنل ادمین: `http://localhost:3001/admin`

### Backend API
### Base URL: `http://localhost:8001/api/landing`
- Health Check: `GET /api/landing/health`
- ثبت‌نام: `POST /api/landing/register`
- لیست ثبت‌نام‌ها: `GET /api/landing/registrations`
- آمار: `GET /api/landing/stats`

**نکته**: Backend API در سرور اصلی (`/app/backend/server.py`) یکپارچه شده است.

## 🛠 تکنولوژی‌ها

### Frontend
- React 19
- Vite
- Tailwind CSS
- Framer Motion
- Axios

### Backend
- FastAPI
- Motor (MongoDB Async Driver)
- Pydantic

### Database
- MongoDB (Collection: `student_registrations`)

## 📦 ساختار پروژه

```
/app/landing-page/
├── backend/
│   ├── server.py          # FastAPI backend
│   ├── requirements.txt   # Python dependencies
│   └── .env              # Environment variables
├── frontend/
│   ├── src/
│   │   ├── App.jsx       # صفحه اصلی
│   │   ├── AdminPanel.jsx # پنل ادمین
│   │   ├── main.jsx      # Entry point
│   │   └── index.css     # Styles
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
└── README.md
```

## 🎨 طراحی

- **تم**: تاریک با گرادیانت‌های نئونی
- **رنگ‌ها**: آبی نئونی (#00D9FF)، طلایی (#FFD700)، بنفش (#B026FF)
- **فونت**: Vazirmatn (فارسی)
- **انیمیشن‌ها**: Framer Motion

## 📝 نحوه استفاده

### مشاهده صفحه اصلی
مرورگر خود را باز کرده و به آدرس زیر بروید:
```
http://localhost:3001
```

### مشاهده پنل ادمین
به آدرس زیر بروید:
```
http://localhost:3001/admin
```

پنل ادمین به صورت خودکار در مسیر `/admin` در دسترس است.

## 🔧 مدیریت سرویس‌ها

```bash
# مشاهده وضعیت سرویس‌ها
sudo supervisorctl status

# راه‌اندازی مجدد backend
sudo supervisorctl restart landing-backend

# راه‌اندازی مجدد frontend
sudo supervisorctl restart landing-frontend

# راه‌اندازی مجدد همه سرویس‌ها
sudo supervisorctl restart landing-backend landing-frontend
```

## 📊 پایگاه داده

داده‌های ثبت‌نام در MongoDB ذخیره می‌شوند:
- **Database**: `shomal_voting`
- **Collection**: `student_registrations`

### ساختار داده:
```json
{
  "_id": "ObjectId",
  "first_name": "string",
  "last_name": "string",
  "phone": "string",
  "field_of_study": "string",
  "interests": "string",
  "created_at": "datetime"
}
```

## 🎯 ویژگی‌های خاص

- ✅ فرم مرحله‌به‌مرحله با Progress Bar
- ✅ انیمیشن‌های نرم و حرفه‌ای
- ✅ پیام‌های انگیزشی و تشویقی
- ✅ اطلاع‌رسانی قرعه‌کشی
- ✅ لینک به سامانه انتخابات الکترونیکی
- ✅ ذخیره امن اطلاعات
- ✅ پنل ادمین برای مشاهده ثبت‌نام‌ها

## 🎁 قرعه‌کشی

با تکمیل فرم ثبت‌نام، دانشجویان به‌طور خودکار در قرعه‌کشی هدیه انجمن علمی شرکت داده می‌شوند.

## 🔗 لینک‌های مرتبط

- سامانه انتخابات الکترونیکی: https://anjomanshomal.netlify.app/

---

**توسعه‌دهنده**: E1 Agent
**تاریخ**: 2025
