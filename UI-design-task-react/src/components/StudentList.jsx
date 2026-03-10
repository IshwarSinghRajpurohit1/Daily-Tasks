import React, { useEffect, useState } from 'react';
import { Search, ChevronDown, Info, Trash2, Edit2 } from 'lucide-react';
import axios from 'axios';

export default function StudentList({ token, onEdit }) {
  const myToken = localStorage.getItem('token');
  console.log("Token in StudentList : ",myToken);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://test.edu2all.in/sch/student/getAllBySchId', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });
      
      const data = response.data;
      
      if (data && data.status !== 'failure') {
        let list = [];
        if (Array.isArray(data)) {
          list = data;
        } else if (data.data && Array.isArray(data.data)) {
          list = data.data;
        } else if (data.content && Array.isArray(data.content)) {
          list = data.content;
        } else if (data.students && Array.isArray(data.students)) {
          list = data.students;
        } else if (data.result && Array.isArray(data.result)) {
          list = data.result;
        } else if (data.studentData && Array.isArray(data.studentData)) {
          list = data.studentData;
        } else if (data.studentId || data.studentName) {
          list = [data];
        }
        setStudents(list);
      } else {
        console.error('Failed to fetch students:', data?.message || 'Unknown error');
      }
    } catch (error) {
      console.error('Error fetching students:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (studentId) => {
    if (!confirm('Are you sure you want to delete this student?')) return;
    try {
      const response = await axios.delete(`https://test.edu2all.in/sch/student/deleteByStId/${studentId}`, { 
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.status === 200 || response.status === 204) {
        fetchStudents();
      } else {
        alert(`Delete failed: ${response.data?.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error deleting student:', error);
      alert(`Delete error: ${error.response?.data?.message || error.message}`);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const filteredStudents = students.filter(s => 
    (s.studentName || s.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (s.studentId || '').toString().includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Class</span>
            <select className="px-4 py-2 bg-white border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#008080] min-w-[120px]">
              <option>One</option>
              <option>Two</option>
              <option>Three</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Section</span>
            <select className="px-4 py-2 bg-white border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#008080] min-w-[120px]">
              <option>A</option>
              <option>B</option>
              <option>C</option>
            </select>
          </div>
          <button 
            onClick={fetchStudents}
            className="px-4 py-2 bg-gray-100 text-gray-600 rounded-md text-sm hover:bg-gray-200 transition-colors flex items-center gap-2"
          >
            Refresh List
          </button>
        </div>

        <div className="flex items-center max-w-sm w-full">
          <div className="relative flex-1">
            <input 
              type="text" 
              placeholder="Search by name or ID..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-4 pr-10 py-2 bg-white border border-gray-200 rounded-l-md focus:outline-none focus:ring-1 focus:ring-[#008080] text-sm"
            />
          </div>
          <button className="bg-[#008080] text-white px-4 py-2 rounded-r-md hover:bg-[#006666] transition-colors text-sm font-medium">
            Search
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider w-16">#</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Student Id</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Name</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Parents Name</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Address</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Phone</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Email</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr>
                  <td colSpan={8} className="px-6 py-10 text-center text-gray-500">Loading students...</td>
                </tr>
              ) : filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-10 text-center text-gray-500">No students found.</td>
                </tr>
              ) : filteredStudents.map((student, index) => (
                <tr key={student.id || student.studentId} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-500">{index + 1}.</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-600">{student.studentId}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-100 overflow-hidden">
                        <img 
                          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${student.studentName || student.name}`} 
                          alt={student.studentName || student.name} 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-700">{student.studentName || student.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">{student.fatherName}</span>
                      <Info className="w-3.5 h-3.5 text-gray-400 cursor-pointer" />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 max-w-[200px]">
                      <span className="text-sm text-gray-500 truncate">{student.studentAddress || student.address}</span>
                      <Info className="w-3.5 h-3.5 text-gray-400 cursor-pointer shrink-0" />
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{student.parentNo || student.parentContact}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{student.studentEmail}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => onEdit(student)}
                        className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-md transition-colors"
                        title="Edit Student"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(student.studentId || student.id)}
                        className="p-1.5 text-red-500 hover:bg-red-50 rounded-md transition-colors"
                        title="Delete Student"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
