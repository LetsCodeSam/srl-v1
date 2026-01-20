import React from 'react';
import { Play, Clock, BarChart3, CheckCircle2 } from 'lucide-react';
import type { Video } from '../types';
import { getThumbnailUrl } from '../utils';

interface VideoCardProps {
    video: Video;
    category?: string;
    onClick: (video: Video) => void;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, category, onClick }) => {
    const getDifficultyColor = (level: string) => {
        switch (level.toLowerCase()) {
            case 'beginner': return 'text-green-400 bg-green-400/10';
            case 'intermediate': return 'text-nordic-teal bg-nordic-teal/10';
            case 'advanced': return 'text-nordic-indigo bg-nordic-indigo/10';
            default: return 'text-gray-400 bg-gray-400/10';
        }
    };

    return (
        <div
            onClick={() => onClick(video)}
            className="group relative glass hover:bg-white/[0.06] transition-all duration-300 rounded-2xl p-6 cursor-pointer border border-white/5 overflow-hidden"
        >
            <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <Play className="w-6 h-6 text-nordic-teal fill-nordic-teal/20" />
            </div>

            <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                    {category && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-nordic-teal bg-nordic-teal/10 border border-nordic-teal/20">
                            {category}
                        </span>
                    )}
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${getDifficultyColor(video.difficulty)}`}>
                        {video.difficulty}
                    </span>
                    <span className="flex items-center gap-1.2 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-gray-400 bg-white/5">
                        <Clock className="w-3 h-3" />
                        {video.duration}
                    </span>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-white group-hover:text-nordic-teal transition-colors line-clamp-1">
                        {video.title}
                    </h3>
                    <p className="text-sm text-gray-400 mt-2 line-clamp-2 leading-relaxed">
                        {video.description}
                    </p>
                </div>

                <div className="pt-4 border-t border-white/5 relative">
                    <div className="flex items-center gap-2 mb-2 text-xs font-bold text-gray-500 uppercase tracking-widest">
                        <BarChart3 className="w-3 h-3" />
                        Key Learnings
                    </div>
                    <div className="space-y-1.5 pr-24"> {/* Add padding for thumbnail space */}
                        {video.learningPoints.slice(0, 3).map((point, i) => (
                            <div key={i} className="flex items-center gap-2 text-xs text-gray-300">
                                <CheckCircle2 className="w-3 h-3 text-nordic-teal/60" />
                                <span className="line-clamp-1">{point}</span>
                            </div>
                        ))}
                    </div>

                    {/* Thumbnail */}
                    <div className="absolute bottom-0 right-0 w-24 aspect-video rounded-xl overflow-hidden border border-white/10 shadow-2xl group-hover:scale-110 transition-transform duration-500">
                        <img
                            src={getThumbnailUrl(video.url)}
                            alt={video.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoCard;
