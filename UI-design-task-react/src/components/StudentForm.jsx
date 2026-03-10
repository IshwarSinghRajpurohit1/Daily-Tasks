import React, { useState, useEffect } from 'react';
import { Calendar, Upload } from 'lucide-react';
import axios from 'axios';

export default function StudentForm({ token, initialData, onSuccess }) {
  const [formData, setFormData] = useState({
    studentName: '',
    fatherName: '',
    motherName: '',
    parentNo: '',
    studentEmail: '',
    parentEmail: '',
    fatherOccupation: '',
    motherOccupation: '',
    classNo: '',
    section: '',
    gender: '',
    studentDOB: '',
    emergencyNo: '',
    studentAddress: '',
    admissionDate: '',
    bloodGroup: 'O+',
    studentPh: '',
    city: '',
    country: '',
    state: '',
    pinCode: '',
    feeGroupName: 'General'
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      // Format dates for input[type="date"]
      const formatDate = (dateStr) => {
        if (!dateStr) return '';
        try {
          return new Date(dateStr).toISOString().split('T')[0];
        } catch (e) {
          return '';
        }
      };

      setFormData({
        studentName: initialData.studentName || initialData.name || '',
        fatherName: initialData.fatherName || '',
        motherName: initialData.motherName || '',
        parentNo: initialData.parentNo || initialData.parentContact || '',
        studentEmail: initialData.studentEmail || '',
        parentEmail: initialData.parentEmail || '',
        fatherOccupation: initialData.fatherOccupation || '',
        motherOccupation: initialData.motherOccupation || '',
        classNo: initialData.classNo || '',
        section: initialData.section || '',
        gender: initialData.gender || '',
        studentDOB: formatDate(initialData.studentDOB),
        emergencyNo: initialData.emergencyNo || '',
        studentAddress: initialData.studentAddress || initialData.address || '',
        admissionDate: formatDate(initialData.admissionDate),
        bloodGroup: initialData.bloodGroup || 'O+',
        studentPh: initialData.studentPh || '',
        city: initialData.city || '',
        country: initialData.country || '',
        state: initialData.state || '',
        pinCode: initialData.pinCode || '',
        feeGroupName: initialData.feeGroupName || 'General'
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const url = initialData 
        ? `https://test.edu2all.in/sch/student/updateStudent/${initialData.studentId || initialData.id}`
        : `https://test.edu2all.in/sch/student/regStudent`;

      const payload = {
        ...formData,
        studentDOB: formData.studentDOB ? new Date(formData.studentDOB).toISOString() : '',
        admissionDate: formData.admissionDate ? new Date(formData.admissionDate).toISOString() : '',
      };

      const response = await axios.post(url, payload, {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.status === 200 || response.status === 201) {
        onSuccess();
      } else {
        alert(response.data?.message || `Failed to ${initialData ? 'update' : 'register'} student`);
      }
    } catch (error) {
      console.error('Error saving student:', error);
      alert(error.response?.data?.message || 'Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
      <div className="flex border-b border-gray-100">
        <button className="px-8 py-4 text-sm font-semibold text-[#008080] border-b-2 border-[#008080]">
          {initialData ? 'Edit Student Details' : 'Single Student Admission'}
        </button>
        <button className="px-8 py-4 text-sm font-semibold text-gray-400 hover:text-gray-600">
          Excel Upload
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700">Name*</label>
            <input
              required
              name="studentName"
              value={formData.studentName}
              onChange={handleChange}
              placeholder="Enter Name"
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#008080] text-sm"
            />
          </div>

          {/* Father Name */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700">Father Name*</label>
            <input
              required
              name="fatherName"
              value={formData.fatherName}
              onChange={handleChange}
              placeholder="Enter Father Name"
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#008080] text-sm"
            />
          </div>

          {/* Mother Name */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700">Mother Name*</label>
            <input
              required
              name="motherName"
              value={formData.motherName}
              onChange={handleChange}
              placeholder="Enter Mother Name"
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#008080] text-sm"
            />
          </div>

          {/* Parent Contact */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700">Parent Contact Details*</label>
            <div className="flex">
              <select className="px-3 py-2.5 bg-gray-50 border border-gray-200 border-r-0 rounded-l-md text-sm focus:outline-none">
                <option>+91</option>
              </select>
              <input
                required
                name="parentNo"
                value={formData.parentNo}
                onChange={handleChange}
                placeholder="Enter Parent Contact Number"
                className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-r-md focus:outline-none focus:ring-1 focus:ring-[#008080] text-sm"
              />
            </div>
          </div>

          {/* Student Email */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700">Student Email*</label>
            <input
              required
              type="email"
              name="studentEmail"
              value={formData.studentEmail}
              onChange={handleChange}
              placeholder="Enter Student Email"
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#008080] text-sm"
            />
          </div>

          {/* Parent Email */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700">Parent Email*</label>
            <input
              required
              type="email"
              name="parentEmail"
              value={formData.parentEmail}
              onChange={handleChange}
              placeholder="Enter Parent Email"
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#008080] text-sm"
            />
          </div>

          {/* Father Occupation */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700">Father Occupation*</label>
            <select
              required
              name="fatherOccupation"
              value={formData.fatherOccupation}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#008080] text-sm text-gray-500"
            >
              <option value="">Select Father Occupation</option>
              <option value="Business">Business</option>
              <option value="Service">Service</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Mother Occupation */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700">Mother Occupation*</label>
            <select
              required
              name="motherOccupation"
              value={formData.motherOccupation}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#008080] text-sm text-gray-500"
            >
              <option value="">Select Mother Occupation</option>
              <option value="Housewife">Housewife</option>
              <option value="Service">Service</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Class */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700">Class*</label>
            <select
              required
              name="classNo"
              value={formData.classNo}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#008080] text-sm text-gray-500"
            >
              <option value="">Select Class</option>
              <option value="One">One</option>
              <option value="Two">Two</option>
              <option value="Three">Three</option>
            </select>
          </div>

          {/* Section */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700">Section*</label>
            <select
              required
              name="section"
              value={formData.section}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#008080] text-sm text-gray-500"
            >
              <option value="">Select Section</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
            </select>
          </div>

          {/* Gender */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700">Gender*</label>
            <select
              required
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#008080] text-sm text-gray-500"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Birthday */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700">Birthday*</label>
            <div className="relative">
              <input
                required
                type="date"
                name="studentDOB"
                value={formData.studentDOB}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#008080] text-sm"
              />
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700">Emergency Contact Details</label>
            <div className="flex">
              <select className="px-3 py-2.5 bg-gray-50 border border-gray-200 border-r-0 rounded-l-md text-sm focus:outline-none">
                <option>+91</option>
              </select>
              <input
                name="emergencyNo"
                value={formData.emergencyNo}
                onChange={handleChange}
                placeholder="Enter Emergency Contact"
                className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-r-md focus:outline-none focus:ring-1 focus:ring-[#008080] text-sm"
              />
            </div>
          </div>

          {/* Address */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700">Address*</label>
            <input
              required
              name="studentAddress"
              value={formData.studentAddress}
              onChange={handleChange}
              placeholder="Enter Address"
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#008080] text-sm"
            />
          </div>

          {/* Admission Date */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700">Admission Date*</label>
            <div className="relative">
              <input
                required
                type="date"
                name="admissionDate"
                value={formData.admissionDate}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#008080] text-sm"
              />
            </div>
          </div>

          {/* Blood Group */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700">Blood Group</label>
            <select
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#008080] text-sm text-gray-500"
            >
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
            </select>
          </div>
        </div>

        <div className="mt-10 flex justify-end gap-4">
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-2.5 bg-[#008080] text-white rounded-md hover:bg-[#006666] transition-colors font-semibold text-sm disabled:opacity-50 flex items-center gap-2"
          >
            {loading ? (initialData ? 'Updating...' : 'Adding...') : (initialData ? 'Update Student' : 'Add Student')}
          </button>
          <button
            type="button"
            onClick={onSuccess}
            className="px-8 py-2.5 border border-gray-200 text-gray-600 rounded-md hover:bg-gray-50 transition-colors font-semibold text-sm"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
