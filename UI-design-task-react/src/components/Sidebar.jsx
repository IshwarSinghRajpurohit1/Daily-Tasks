import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  GraduationCap, 
  Bus, 
  FileText, 
  BookOpen, 
  Calculator, 
  Video, 
  UserCircle, 
  Package, 
  Heart, 
  MessageSquare, 
  ClipboardList, 
  Settings, 
  LogOut,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import { cn } from '../lib/utils';
import { NavLink, useNavigate } from 'react-router-dom';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: Users, label: 'Users', path: '/users', subItems: true },
  { icon: GraduationCap, label: 'Admissions', path: '/admissions', active: true, subItems: [
    { label: 'Student', path: '/students' },
    { label: 'Add Student', path: '/add-student' }
  ]},
  { icon: Bus, label: 'Transport', path: '/transport', subItems: true },
  { icon: FileText, label: 'Examination', path: '/examination', subItems: true },
  { icon: BookOpen, label: 'Academic', path: '/academic', subItems: true },
  { icon: Calculator, label: 'Accounting', path: '/accounting', subItems: true },
  { icon: Video, label: 'Online Courses', path: '/online-courses' },
  { icon: UserCircle, label: 'Human Resource', path: '/hr', subItems: true },
  { icon: Package, label: 'Inventory', path: '/inventory', subItems: true },
  { icon: Heart, label: 'Alumni', path: '/alumni', subItems: true },
  { icon: MessageSquare, label: 'SMS Center', path: '/sms', subItems: true },
  { icon: ClipboardList, label: 'Assignments', path: '/assignments' },
  { icon: Settings, label: 'Setting', path: '/setting', subItems: true },
  { icon: LogOut, label: 'Logout', path: '/logout' },
];

export default function Sidebar({ currentPath, onNavigate, onLogout }) {
  const navigate = useNavigate();

  const handleItemClick = (item) => {
    if (item.label === 'Logout') {
      onLogout();
    } else if (item.subItems && Array.isArray(item.subItems)) {
      // Toggle logic or just navigate to first subitem
      onNavigate(item.subItems[0].path);
    } else {
      onNavigate(item.path);
    }
  };

  return (
    <div className="w-64 bg-[#F8FAFC] h-screen border-r border-gray-200 flex flex-col overflow-y-auto">
      <div className="p-6 flex items-center gap-2">
        <div className="bg-[#008080] p-2 rounded-lg">
          <GraduationCap className="text-white w-8 h-8" />
        </div>
        <div className="flex flex-col">
          <span className="text-xl font-bold text-[#008080]">Edu2All</span>
          <span className="text-[10px] text-orange-500 font-semibold -mt-1 uppercase tracking-wider">School ERP</span>
        </div>
      </div>

      <nav className="flex-1 px-4 py-2">
        {menuItems.map((item, index) => {
          const isActive = currentPath.startsWith(item.path) || (item.label === 'Admissions' && (currentPath === '/students' || currentPath === '/add-student' || currentPath === '/edit-student'));
          const isAdmissions = item.label === 'Admissions';

          return (
            <div key={index} className="mb-1">
              <button
                onClick={() => handleItemClick(item)}
                className={cn(
                  "w-full flex items-center justify-between px-3 py-2.5 rounded-md transition-colors group text-left",
                  isActive ? "bg-[#008080] text-white" : "text-gray-600 hover:bg-gray-100"
                )}
              >
                <div className="flex items-center gap-3">
                  <item.icon className={cn("w-5 h-5", isActive ? "text-white" : "text-gray-500 group-hover:text-[#008080]")} />
                  <span className="text-sm font-medium">{item.label}</span>
                </div>
                {item.subItems && (
                  isActive ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4 text-gray-400" />
                )}
              </button>
              
              {isAdmissions && (
                <div className="ml-11 mt-1 space-y-1">
                  {Array.isArray(item.subItems) && item.subItems.map((sub, idx) => (
                    <NavLink
                      key={idx}
                      to={sub.path}
                      className={({ isActive: isSubActive }) => cn(
                        "block w-full text-left py-1.5 text-sm transition-colors",
                        isSubActive ? "text-[#008080] font-semibold" : "text-gray-500 hover:text-[#008080]"
                      )}
                    >
                      - {sub.label}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );
}


