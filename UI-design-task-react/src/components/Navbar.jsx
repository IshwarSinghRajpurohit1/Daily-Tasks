import React from 'react';
import { Search, Bell, Menu, ChevronDown } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-10">
      <div className="flex items-center gap-6 flex-1">
        <button className="text-gray-500 hover:text-[#008080]">
          <Menu className="w-6 h-6" />
        </button>
        
        <div className="flex items-center max-w-md w-full">
          <div className="relative flex-1">
            <input 
              type="text" 
              placeholder="Search" 
              className="w-full pl-4 pr-10 py-2 bg-gray-50 border border-gray-200 rounded-l-md focus:outline-none focus:ring-1 focus:ring-[#008080] text-sm"
            />
          </div>
          <button className="bg-[#008080] text-white px-4 py-2 rounded-r-md hover:bg-[#006666] transition-colors text-sm font-medium">
            Search
          </button>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative">
          <Bell className="w-6 h-6 text-gray-500 cursor-pointer" />
          <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">3</span>
        </div>

        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center overflow-hidden">
            <img 
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" 
              alt="User" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="hidden md:flex flex-col">
            <span className="text-sm font-semibold text-gray-800">@admin.school</span>
            <span className="text-[11px] text-gray-500">admin@skdschool.in</span>
          </div>
          <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
        </div>
      </div>
    </header>
  );
}
