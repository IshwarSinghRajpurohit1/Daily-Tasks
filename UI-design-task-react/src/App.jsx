import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';
import Login from './components/Login';
import { ChevronRight } from 'lucide-react';

export default function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [editingStudent, setEditingStudent] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  
  const handleLogin = (newToken) => {
    setToken(newToken);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  const handleEdit = (student) => {
    setEditingStudent(student);
    navigate('/edit-student');
  };

  const getBreadcrumbs = () => {
    const path = location.pathname;
    if (path === '/add-student') return ['Home', 'Admissions', 'Add Student'];
    if (path === '/edit-student') return ['Home', 'Admissions', 'Edit Student'];
    if (path === '/students') return ['Home', 'Admissions', 'Student'];
    return ['Home', 'Dashboard'];
  };

  const breadcrumbs = getBreadcrumbs();

  if (!token) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="flex h-screen bg-[#F1F5F9]">
      <Sidebar currentPath={location.pathname} onNavigate={(path) => navigate(path)} onLogout={handleLogout} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="mb-6">
            <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
              {breadcrumbs.map((crumb, i) => (
                <React.Fragment key={i}>
                  <span className={i === breadcrumbs.length - 1 ? "text-[#008080] font-medium" : ""}>{crumb}</span>
                  {i < breadcrumbs.length - 1 && <ChevronRight className="w-3 h-3" />}
                </React.Fragment>
              ))}
            </div>
            <h1 className="text-xl font-bold text-gray-800">
              {location.pathname === '/add-student' ? 'Admission Form' : 
               location.pathname === '/edit-student' ? 'Edit Student' : 'Student List'}
            </h1>
          </div>

          <Routes>
            <Route path="/students" element={<StudentList token={token} onEdit={handleEdit} />} />
            <Route path="/add-student" element={<StudentForm token={token} onSuccess={() => navigate('/students')} />} />
            <Route path="/edit-student" element={<StudentForm token={token} initialData={editingStudent} onSuccess={() => navigate('/students')} />} />
            <Route path="/" element={<Navigate to="/students" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
