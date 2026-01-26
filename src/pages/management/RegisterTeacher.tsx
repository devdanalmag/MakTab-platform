import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Camera, User, Phone, Mail, Key } from 'lucide-react';
import Button from '../../components/common/Button';
import './RegisterTeacher.css';

const RegisterTeacher: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: '',
        phoneNumber: '',
        emailAddress: '',
        assignedClasses: [] as string[],
    });

    const availableClasses = [
        { id: 'halaqa-a', name: 'Halaqa A' },
        { id: 'halaqa-b', name: 'Halaqa B' },
        { id: 'halaqa-c', name: 'Halaqa C' },
        { id: 'islamiyya-1', name: 'Islamiyya 1' },
    ];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleClassToggle = (classId: string) => {
        setFormData((prev) => ({
            ...prev,
            assignedClasses: prev.assignedClasses.includes(classId)
                ? prev.assignedClasses.filter((id) => id !== classId)
                : [...prev.assignedClasses, classId],
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Registering teacher:', formData);
        navigate('/management/teachers');
    };

    const handleGenerateCode = () => {
        console.log('Generating invitation code');
    };

    return (
        <div className="register-teacher-page">
            {/* Header */}
            <header className="register-header">
                <button className="back-btn" onClick={() => navigate(-1)}>
                    <ArrowLeft size={22} />
                </button>
                <h1 className="header-title">Register Teacher</h1>
                <div className="header-spacer" />
            </header>

            {/* Main Content */}
            <main className="register-content">
                {/* Photo Upload */}
                <div className="photo-upload">
                    <div className="upload-placeholder">
                        <Camera size={28} className="upload-icon" />
                    </div>
                    <p className="upload-text">Upload Teacher's photo</p>
                </div>

                {/* Form */}
                <form className="register-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">FULL NAME</label>
                        <div className="input-wrapper">
                            <input
                                type="text"
                                name="fullName"
                                className="form-input"
                                placeholder="e.g. Malam Ibrahim Musa"
                                value={formData.fullName}
                                onChange={handleInputChange}
                            />
                            <User size={18} className="input-icon" />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">PHONE NUMBER</label>
                        <div className="input-wrapper">
                            <input
                                type="tel"
                                name="phoneNumber"
                                className="form-input"
                                placeholder="+234 000 000 0000"
                                value={formData.phoneNumber}
                                onChange={handleInputChange}
                            />
                            <Phone size={18} className="input-icon" />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">EMAIL ADDRESS</label>
                        <div className="input-wrapper">
                            <input
                                type="email"
                                name="emailAddress"
                                className="form-input"
                                placeholder="teacher@maktab.edu.ng"
                                value={formData.emailAddress}
                                onChange={handleInputChange}
                            />
                            <Mail size={18} className="input-icon" />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">ASSIGNED CLASSES / HALAQAT</label>
                        <div className="classes-grid">
                            {availableClasses.map((classItem) => (
                                <label key={classItem.id} className="class-checkbox">
                                    <input
                                        type="checkbox"
                                        checked={formData.assignedClasses.includes(classItem.id)}
                                        onChange={() => handleClassToggle(classItem.id)}
                                    />
                                    <span className="checkbox-label">{classItem.name}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <button
                        type="button"
                        className="generate-code-btn"
                        onClick={handleGenerateCode}
                    >
                        <Key size={18} />
                        Generate Invitation Code
                    </button>

                    <Button type="submit" variant="primary" fullWidth>
                        Register Teacher
                    </Button>
                </form>
            </main>
        </div>
    );
};

export default RegisterTeacher;
