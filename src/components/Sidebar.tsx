import React, { useState } from 'react';
import { ChevronDown, ChevronRight, PlayCircle, Folder, Menu, X, Sparkles } from 'lucide-react';
import type { Category } from '../types';

interface SidebarProps {
    categories: Category[];
    activeCategory: string;
    onSelectCategory: (name: string) => void;
    isOpen: boolean;
    onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
    categories,
    activeCategory,
    onSelectCategory,
    isOpen,
    onToggle
}) => {
    const [expandedCats, setExpandedCats] = useState<Record<string, boolean>>(
        categories.reduce((acc, cat) => ({ ...acc, [cat.name]: true }), {})
    );

    const toggleExpand = (name: string) => {
        setExpandedCats(prev => ({ ...prev, [name]: !prev[name] }));
    };

    return (
        <>
            {/* Mobile Toggle */}
            <button
                onClick={onToggle}
                className="fixed top-4 left-4 z-50 p-2 glass rounded-lg lg:hidden"
            >
                {isOpen ? <X className="text-nordic-teal" /> : <Menu className="text-nordic-teal" />}
            </button>

            {/* Sidebar Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
                    onClick={onToggle}
                />
            )}

            {/* Sidebar Content */}
            <aside className={`
        fixed top-0 left-0 h-full w-72 glass border-r border-white/5 z-40
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
                <div className="p-8 pb-4">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-nordic-teal to-nordic-indigo p-[2px]">
                            <div className="w-full h-full rounded-[10px] bg-nordic-charcoal flex items-center justify-center">
                                <span className="text-xl font-bold italic tracking-tighter">SRL</span>
                            </div>
                        </div>
                        <h1 className="text-xl font-bold tracking-tight text-white/90">v1 Template</h1>
                    </div>

                    <nav className="space-y-1 overflow-y-auto max-h-[calc(100vh-140px)] pr-2">
                        <button
                            onClick={() => onSelectCategory('Home')}
                            className={`
                w-full flex items-center gap-2 p-2 rounded-lg text-sm font-medium transition-all mb-4
                ${activeCategory === 'Home' ? 'text-nordic-teal bg-white/5 shadow-[0_0_20px_rgba(45,212,191,0.1)]' : 'text-gray-400 hover:text-white hover:bg-white/5'}
              `}
                        >
                            <Sparkles className="w-4 h-4" />
                            <span>Home (All Videos)</span>
                        </button>

                        {categories.map((cat) => (
                            <div key={cat.name} className="space-y-1">
                                <button
                                    onClick={() => toggleExpand(cat.name)}
                                    className={`
                    w-full flex items-center gap-2 p-2 rounded-lg text-sm font-medium transition-all
                    ${activeCategory === cat.name ? 'text-nordic-teal bg-white/5' : 'text-gray-400 hover:text-white hover:bg-white/5'}
                  `}
                                >
                                    {expandedCats[cat.name] ? (
                                        <ChevronDown className="w-4 h-4" />
                                    ) : (
                                        <ChevronRight className="w-4 h-4" />
                                    )}
                                    <Folder className="w-4 h-4" />
                                    <span onClick={(e) => { e.stopPropagation(); onSelectCategory(cat.name); }}>
                                        {cat.name}
                                    </span>
                                </button>

                                {expandedCats[cat.name] && (
                                    <div className="ml-6 space-y-1 pb-2">
                                        {cat.videos.map((video) => (
                                            <button
                                                key={video.title}
                                                onClick={() => {
                                                    onSelectCategory(cat.name);
                                                    // We can scrolls to video or just set active
                                                }}
                                                className="w-full flex items-center gap-2 p-1.5 rounded-md text-xs text-gray-500 hover:text-nordic-teal hover:bg-white/5 transition-all text-left"
                                            >
                                                <PlayCircle className="w-3.5 h-3.5 flex-shrink-0" />
                                                <span className="truncate">{video.title}</span>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </nav>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
