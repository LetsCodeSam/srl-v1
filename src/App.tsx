import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Sparkles } from 'lucide-react';
import Sidebar from './components/Sidebar';
import VideoCard from './components/VideoCard';
import VideoModal from './components/VideoModal';
import type { AppData, Video } from './types';

function App() {
  const [data, setData] = useState<AppData | null>(null);
  const [activeCategoryName, setActiveCategoryName] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    fetch('/data.json')
      .then(res => res.json())
      .then((json: AppData) => {
        setData(json);
        setActiveCategoryName('Home');
      });
  }, []);

  const activeCategory = data?.categories.find(c => c.name === activeCategoryName);

  const allVideos = data?.categories.flatMap(cat =>
    cat.videos.map(v => ({ ...v, categoryName: cat.name }))
  ) || [];

  const filteredVideos = activeCategoryName === 'Home'
    ? allVideos.filter(v =>
      v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : activeCategory?.videos.filter(v =>
      v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.description.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

  if (!data) return (
    <div className="h-screen w-full flex items-center justify-center bg-nordic-charcoal">
      <div className="w-12 h-12 border-4 border-nordic-teal border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen bg-nordic-black text-white selection:bg-nordic-teal selection:text-nordic-charcoal">
      <Sidebar
        categories={data.categories}
        activeCategory={activeCategoryName}
        onSelectCategory={(name) => {
          setActiveCategoryName(name);
          setIsSidebarOpen(false);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      <main className="lg:ml-72 min-h-screen p-6 lg:p-12 transition-all duration-300">
        {/* Header */}
        <header className="max-w-7xl mx-auto mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-nordic-teal mb-2">
              <Sparkles className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-widest">Premium Learning</span>
            </div>
            <h2 className="text-4xl font-extrabold tracking-tight">
              {activeCategoryName}
            </h2>
          </div>

          <div className="relative group max-w-sm w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-nordic-teal transition-colors" />
            <input
              type="text"
              placeholder={activeCategoryName === 'Home' ? "Search across all categories..." : `Search in ${activeCategoryName}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 glass hover:bg-white/[0.05] focus:bg-white/[0.08] outline-none rounded-xl border-white/5 focus:border-nordic-teal/30 transition-all text-sm"
            />
          </div>
        </header>

        {/* Video Grid */}
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategoryName}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
            >
              {filteredVideos.length > 0 ? (
                filteredVideos.map((video, i) => (
                  <motion.div
                    key={`${(video as any).categoryName || activeCategoryName}-${video.title}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <VideoCard
                      video={video}
                      category={activeCategoryName === 'Home' ? (video as any).categoryName : undefined}
                      onClick={setSelectedVideo}
                    />
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full py-20 text-center glass rounded-3xl border-dashed border-2 border-white/5">
                  <p className="text-gray-500 font-medium">No videos found matching "{searchQuery}"</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <VideoModal
            video={selectedVideo}
            onClose={() => setSelectedVideo(null)}
          />
        )}
      </AnimatePresence>

      {/* Background Glows */}
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-nordic-teal/5 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-nordic-indigo/5 blur-[120px] rounded-full pointer-events-none -z-10" />
    </div>
  );
}

export default App;
