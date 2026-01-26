import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Camera, Building, User, GraduationCap, MapPin, ChevronDown, ArrowRight, Check } from 'lucide-react';
import Button from '../../components/common/Button';
import './SchoolSetup.css';

const SchoolSetup: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        schoolName: '',
        contactPerson: '',
        educationalSystem: '',
        schoolAddress: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        navigate('/management/dashboard');
    };

    return (
        <div className="school-setup-page">
            {/* Header */}
            <header className="setup-header">
                <button className="back-btn" onClick={() => navigate(-1)}>
                    <ArrowLeft size={22} />
                </button>
                <h1 className="header-title">School Setup</h1>
                <div className="check-badge">
                    <Check size={18} />
                </div>
            </header>

            {/* Main Content */}
            <main className="setup-content">
                <div className="welcome-section">
                    <h2 className="welcome-title">Welcome to MakTab</h2>
                    <p className="welcome-subtitle">Let's get your school profile ready.</p>
                </div>

                {/* Logo Upload */}
                <div className="logo-upload">
                    <div className="upload-placeholder">
                        <Camera size={32} className="upload-icon" />
                    </div>
                    <button className="upload-btn">UPLOAD SCHOOL LOGO</button>
                </div>

                {/* Form */}
                <form className="setup-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">SCHOOL NAME</label>
                        <div className="input-wrapper">
                            <Building size={18} className="input-icon" />
                            <input
                                type="text"
                                name="schoolName"
                                className="form-input"
                                placeholder="e.g MakTab Tahfeez and Islamiyya"
                                value={formData.schoolName}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">CONTACT PERSON</label>
                        <div className="input-wrapper">
                            <User size={18} className="input-icon" />
                            <input
                                type="text"
                                name="contactPerson"
                                className="form-input"
                                placeholder="full name administrator"
                                value={formData.contactPerson}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">EDUCATIONAL SYSTEM</label>
                        <div className="input-wrapper">
                            <GraduationCap size={18} className="input-icon" />
                            <select
                                name="educationalSystem"
                                className="form-select"
                                value={formData.educationalSystem}
                                onChange={handleInputChange}
                            >
                                <option value="">select school system</option>
                                <option value="tahfeez">Tahfeez Only</option>
                                <option value="islamiyya">Islamiyya Only</option>
                                <option value="both">Tahfeez & Islamiyya</option>
                            </select>
                            <ChevronDown size={18} className="select-icon" />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">SCHOOL ADDRESS</label>
                        <div className="input-wrapper">
                            <MapPin size={18} className="input-icon" />
                            <input
                                type="text"
                                name="schoolAddress"
                                className="form-input"
                                placeholder="complete physical address..."
                                value={formData.schoolAddress}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    <Button type="submit" variant="primary" fullWidth>
                        Continue to Dashboard
                        <ArrowRight size={18} />
                    </Button>
                </form>

                <p className="terms-text">
                    By setting up school, you to MakTab{' '}
                    <a href="#" className="terms-link">Terms of Service</a>
                    {' '}and{' '}
                    <a href="#" className="terms-link">Privacy Policy</a>
                </p>
            </main>
        </div>
    );
};

export default SchoolSetup;
