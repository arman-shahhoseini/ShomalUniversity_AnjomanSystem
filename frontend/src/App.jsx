import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { 
  GraduationCap, 
  Rocket, 
  Users, 
  Phone, 
  BookOpen, 
  Star, 
  PartyPopper,
  Gift,
  Home,
  Lightbulb,
  Handshake,
  Target,
  Trophy,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8001/api/landing';

function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    phone: '',
    field_of_study: '',
    interests: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  const handleNext = useCallback(() => {
    setCurrentStep(prev => prev + 1);
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentStep(prev => prev - 1);
  }, []);

  const handleSubmit = useCallback(async () => {
    setIsSubmitting(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/register`, formData);
      if (response.data.success) {
        handleNext();
      }
    } catch (error) {
      console.error('Error:', error);
      alert('خطا در ثبت‌نام. لطفاً دوباره تلاش کنید.');
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, handleNext]);

  return (
    <div className="app-wrapper">
      <div className="container">
        {/* Header with Logo */}
        <div className="header">
          <div className="logo-container">
            <img src="/logo.png" alt="لوگو دانشگاه شمال" className="logo" />
            <div className="header-text">
              <h1 className="system-name">سامانه انجمن دانشگاه شمال آمل</h1>
              <p className="header-subtitle">پل ارتباطی علم و دانش</p>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="progress-wrapper">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${(currentStep / 6) * 100}%` }} />
          </div>
          <div className="progress-text">مرحله {currentStep + 1} از 7</div>
        </div>

        {/* Content */}
        <div className="content">
          {currentStep === 0 && (
            <div className="step fade-in">
              <div className="icon-wrapper">
                <GraduationCap className="icon" strokeWidth={1.5} />
              </div>
              <h1 className="title">به انجمن علمی دانشگاه شمال<br />خوش آمدید</h1>
              <p className="subtitle">جایی که ایده‌ها به واقعیت تبدیل می‌شوند</p>
              <div className="features">
                <div className="feature feature-1">
                  <Lightbulb className="feature-icon" strokeWidth={2} />
                  <span>نوآوری</span>
                </div>
                <div className="feature feature-2">
                  <Handshake className="feature-icon" strokeWidth={2} />
                  <span>همکاری</span>
                </div>
                <div className="feature feature-3">
                  <BookOpen className="feature-icon" strokeWidth={2} />
                  <span>یادگیری</span>
                </div>
                <div className="feature feature-4">
                  <Trophy className="feature-icon" strokeWidth={2} />
                  <span>موفقیت</span>
                </div>
              </div>
              <button className="btn-primary" onClick={handleNext}>
                شروع ثبت‌نام
                <ChevronLeft className="btn-icon" size={20} />
              </button>
            </div>
          )}

          {currentStep === 1 && (
            <div className="step fade-in">
              <div className="icon-wrapper">
                <Rocket className="icon" strokeWidth={1.5} />
              </div>
              <h2 className="title">انجمن علمی یعنی چه؟</h2>
              <div className="info-card">
                <p>انجمن علمی دانشگاه شمال، محیطی است برای رشد علمی، فردی و اجتماعی دانشجویان. اینجا می‌توانید در پروژه‌های گروهی شرکت کنید، مهارت‌های جدید یاد بگیرید و با دانشجویان هم‌فکر ارتباط برقرار کنید.</p>
              </div>
              <div className="btn-row">
                <button className="btn-secondary" onClick={handlePrev}>
                  <ChevronRight className="btn-icon" size={20} />
                  قبلی
                </button>
                <button className="btn-primary" onClick={handleNext}>
                  ادامه
                  <ChevronLeft className="btn-icon" size={20} />
                </button>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="step fade-in">
              <div className="icon-wrapper">
                <Users className="icon" strokeWidth={1.5} />
              </div>
              <h2 className="title">بیایید آشنا شویم</h2>
              <p className="subtitle">نام و نام خانوادگی خود را وارد کنید</p>
              <div className="form">
                <div className="form-field">
                  <label>نام</label>
                  <input
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleInputChange}
                    placeholder="نام خود را وارد کنید"
                    autoComplete="off"
                  />
                </div>
                <div className="form-field">
                  <label>نام خانوادگی</label>
                  <input
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleInputChange}
                    placeholder="نام خانوادگی خود را وارد کنید"
                    autoComplete="off"
                  />
                </div>
              </div>
              <div className="btn-row">
                <button className="btn-secondary" onClick={handlePrev}>
                  <ChevronRight className="btn-icon" size={20} />
                  قبلی
                </button>
                <button 
                  className="btn-primary" 
                  onClick={handleNext}
                  disabled={!formData.first_name || !formData.last_name}
                >
                  بعدی
                  <ChevronLeft className="btn-icon" size={20} />
                </button>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="step fade-in">
              <div className="icon-wrapper">
                <Phone className="icon" strokeWidth={1.5} />
              </div>
              <h2 className="title">راه ارتباطی</h2>
              <p className="subtitle">شماره تماس خود را وارد کنید</p>
              <div className="form">
                <div className="form-field">
                  <label>شماره موبایل</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="09123456789"
                    dir="ltr"
                    autoComplete="off"
                  />
                </div>
              </div>
              <div className="btn-row">
                <button className="btn-secondary" onClick={handlePrev}>
                  <ChevronRight className="btn-icon" size={20} />
                  قبلی
                </button>
                <button 
                  className="btn-primary" 
                  onClick={handleNext}
                  disabled={!formData.phone || formData.phone.length < 10}
                >
                  بعدی
                  <ChevronLeft className="btn-icon" size={20} />
                </button>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="step fade-in">
              <div className="icon-wrapper">
                <Target className="icon" strokeWidth={1.5} />
              </div>
              <h2 className="title">رشته تحصیلی</h2>
              <p className="subtitle">در چه رشته‌ای مشغول تحصیل هستید؟</p>
              <div className="form">
                <div className="form-field">
                  <label>رشته تحصیلی</label>
                  <input
                    type="text"
                    name="field_of_study"
                    value={formData.field_of_study}
                    onChange={handleInputChange}
                    placeholder="مثال: مهندسی کامپیوتر"
                    autoComplete="off"
                  />
                </div>
              </div>
              <div className="btn-row">
                <button className="btn-secondary" onClick={handlePrev}>
                  <ChevronRight className="btn-icon" size={20} />
                  قبلی
                </button>
                <button 
                  className="btn-primary" 
                  onClick={handleNext}
                  disabled={!formData.field_of_study}
                >
                  بعدی
                  <ChevronLeft className="btn-icon" size={20} />
                </button>
              </div>
            </div>
          )}

          {currentStep === 5 && (
            <div className="step fade-in">
              <div className="icon-wrapper">
                <Star className="icon" strokeWidth={1.5} />
              </div>
              <h2 className="title">علاقه‌مندی‌ها</h2>
              <p className="subtitle">به چه موضوعاتی علاقه دارید؟</p>
              <div className="form">
                <div className="form-field">
                  <label>علاقه‌مندی‌ها</label>
                  <textarea
                    name="interests"
                    value={formData.interests}
                    onChange={handleInputChange}
                    placeholder="مثال: برنامه‌نویسی، هوش مصنوعی، رباتیک، طراحی..."
                    rows={5}
                    autoComplete="off"
                  />
                </div>
              </div>
              <div className="btn-row">
                <button className="btn-secondary" onClick={handlePrev}>
                  <ChevronRight className="btn-icon" size={20} />
                  قبلی
                </button>
                <button 
                  className="btn-submit" 
                  onClick={handleSubmit}
                  disabled={!formData.interests || isSubmitting}
                >
                  {isSubmitting ? 'در حال ثبت...' : 'ثبت نام'}
                  {!isSubmitting && <ChevronLeft className="btn-icon" size={20} />}
                </button>
              </div>
            </div>
          )}

          {currentStep === 6 && (
            <div className="step fade-in">
              <div className="icon-wrapper success">
                <PartyPopper className="icon" strokeWidth={1.5} />
              </div>
              <h2 className="title">تبریک!</h2>
              <p className="success-msg">ثبت‌نام شما با موفقیت انجام شد</p>
              <div className="info-card success">
                <div className="success-icon-wrapper">
                  <Gift className="success-icon" strokeWidth={2} />
                </div>
                <h3>شما در قرعه‌کشی هدایای انجمن شرکت دارید!</h3>
                <p>به زودی با شما تماس خواهیم گرفت</p>
              </div>
              <a href="https://anjomanshomal.netlify.app/" className="btn-primary">
                <Home className="btn-icon" size={20} />
                بازگشت به صفحه اصلی
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
