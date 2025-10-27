from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = FastAPI(title="Shomal University Landing Page API")

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB Connection
MONGO_URL = os.getenv("MONGO_URL")
DATABASE_NAME = os.getenv("DATABASE_NAME", "shomal_voting")

if not MONGO_URL:
    raise ValueError("MONGO_URL not found in environment variables")

client = AsyncIOMotorClient(MONGO_URL)
db = client[DATABASE_NAME]
registrations_collection = db["student_registrations"]

# Pydantic Models
class StudentRegistration(BaseModel):
    first_name: str = Field(..., min_length=2, max_length=50)
    last_name: str = Field(..., min_length=2, max_length=50)
    phone: str = Field(..., min_length=10, max_length=15)
    field_of_study: str = Field(..., min_length=2, max_length=100)
    interests: str = Field(..., min_length=2, max_length=500)

class StudentRegistrationResponse(BaseModel):
    id: str
    first_name: str
    last_name: str
    phone: str
    field_of_study: str
    interests: str
    created_at: datetime

# API Endpoints
@app.get("/api/landing/health")
async def health_check():
    return {"status": "healthy", "service": "landing-page-api"}

@app.post("/api/landing/register", response_model=dict)
async def register_student(registration: StudentRegistration):
    try:
        # Create registration document
        registration_doc = {
            "first_name": registration.first_name,
            "last_name": registration.last_name,
            "phone": registration.phone,
            "field_of_study": registration.field_of_study,
            "interests": registration.interests,
            "created_at": datetime.utcnow(),
        }
        
        # Insert into database
        result = await registrations_collection.insert_one(registration_doc)
        
        return {
            "success": True,
            "message": "ثبت‌نام شما با موفقیت انجام شد! 🎉",
            "id": str(result.inserted_id)
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"خطا در ثبت‌نام: {str(e)}")

@app.get("/api/landing/registrations", response_model=List[dict])
async def get_all_registrations():
    try:
        registrations = []
        cursor = registrations_collection.find().sort("created_at", -1)
        
        async for doc in cursor:
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
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"خطا در دریافت لیست: {str(e)}")

@app.get("/api/landing/stats")
async def get_stats():
    try:
        total_registrations = await registrations_collection.count_documents({})
        return {
            "total_registrations": total_registrations
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"خطا در دریافت آمار: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8002)