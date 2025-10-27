# راهنمای دیپلوی صفحه فرود در Netlify

## مراحل دیپلوی:

### 1. تنظیمات Build در Netlify Dashboard

وارد پنل Netlify شوید و تنظیمات زیر را وارد کنید:

**Base directory:**
```
landing-page/frontend
```

**Build command:**
```
npm run build
```

**Publish directory:**
```
landing-page/frontend/dist
```

### 2. Environment Variables

در بخش Environment Variables در Netlify داشبورد، این متغیر را اضافه کنید:

```
VITE_API_BASE_URL = https://shomal-anjomanuni.onrender.com/api/landing
```

**نکته مهم:** اگر backend شما روی Render است، باید endpoint های `/api/landing` را به backend خود اضافه کنید.

### 3. Backend API Endpoints مورد نیاز

Backend شما باید این endpoint ها را داشته باشد:

- `POST /api/landing/register` - ثبت‌نام دانشجو
- `GET /api/landing/registrations` - لیست ثبت‌نام‌ها
- `GET /api/landing/stats` - آمار
- `GET /api/landing/health` - Health check

### 4. اضافه کردن API به Backend Render

در فایل `/app/backend/server.py` این endpoint ها رو اضافه کنید:

```python
# Landing Page Endpoints
landing_registrations = db["student_registrations"]

@app.post("/api/landing/register")
async def register_student(registration: dict):
    registration["created_at"] = datetime.utcnow()
    result = await landing_registrations.insert_one(registration)
    return {
        "success": True,
        "message": "ثبت‌نام شما با موفقیت انجام شد! 🎉",
        "id": str(result.inserted_id)
    }

@app.get("/api/landing/registrations")
async def get_registrations():
    registrations = []
    async for doc in landing_registrations.find().sort("created_at", -1):
        registrations.append({
            "id": str(doc["_id"]),
            "first_name": doc["first_name"],
            "last_name": doc["last_name"],
            "phone": doc["phone"],
            "field_of_study": doc["field_of_study"],
            "interests": doc["interests"],
            "created_at": doc["created_at"].isoformat()
        })
    return registrations

@app.get("/api/landing/stats")
async def get_stats():
    total = await landing_registrations.count_documents({})
    return {"total_registrations": total}
```

### 5. Deploy!

بعد از این تنظیمات، کد را push کنید و Netlify به صورت خودکار deploy می‌کند.

## تست Local

برای تست local:

```bash
cd /app/landing-page/frontend
npm run build
npm run preview
```

## نکات مهم

1. ✅ فایل `netlify.toml` در root پروژه قرار دارد
2. ✅ Environment variables را در Netlify dashboard تنظیم کنید
3. ✅ Backend باید CORS را برای دامنه Netlify شما باز کند
4. ✅ Base directory حتماً `landing-page/frontend` باشد

## لینک‌های مفید

- Frontend (Netlify): `https://your-site.netlify.app`
- Backend (Render): `https://shomal-anjomanuni.onrender.com`
- API Base: `https://shomal-anjomanuni.onrender.com/api/landing`
