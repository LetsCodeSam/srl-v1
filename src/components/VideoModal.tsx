import React, { useEffect } from 'react';
import { X, ExternalLink } from 'lucide-react';
import type { Video } from '../types';

interface VideoModalProps {
    video: Video | null;
    onClose: () => void;
}

const VideoModal: React.FC<VideoModalProps> = ({ video, onClose }) => {
    if (!video) return null;

    // Handle escape key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    const getEmbedUrl = (url: string) => {
        if (url.includes('youtube.com') || url.includes('youtu.be')) {
            const vid = url.split('v=')[1]?.split('&')[0] || url.split('/').pop()?.split('?')[0];
            return `https://www.youtube.com/embed/${vid}?autoplay=1`;
        }
        if (url.includes('vimeo.com')) {
            const vid = url.split('/').pop()?.split('?')[0];
            return `https://player.vimeo.com/video/${vid}?autoplay=1`;
        }
        return url;
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-8">
            <div
                className="absolute inset-0 bg-nordic-black/90 backdrop-blur-xl"
                onClick={onClose}
            />

            <div className="relative w-full max-w-5xl glass border-white/10 rounded-3xl overflow-hidden shadow-2xl overflow-y-auto max-h-[90vh]">
                <div className="flex items-center justify-between p-6 border-b border-white/5">
                    <div>
                        <h2 className="text-xl font-bold text-white">{video.title}</h2>
                        <p className="text-sm text-gray-400">{video.difficulty} • {video.duration}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <a
                            href={video.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-gray-400 hover:text-white transition-colors"
                            title="Open externally"
                        >
                            <ExternalLink className="w-5 h-5" />
                        </a>
                        <button
                            onClick={onClose}
                            className="p-2 text-gray-400 hover:text-white transition-colors bg-white/5 rounded-full"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                <div className="p-2">
                    <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black shadow-inner">
                        <iframe
                            src={getEmbedUrl(video.url)}
                            title={video.title}
                            className="w-full h-full border-0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </div>
                </div>

                <div className="p-8 space-y-6">
                    <div>
                        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-[0.2em] mb-3">About this lesson</h3>
                        <p className="text-gray-300 leading-loose text-lg">{video.description}</p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-8 pt-6 border-t border-white/5">
                        <div>
                            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-[0.2em] mb-4">Learning Objectives</h3>
                            <ul className="space-y-3">
                                {video.learningPoints.map((point, i) => (
                                    <li key={i} className="flex items-start gap-3 text-gray-300">
                                        <div className="w-1.5 h-1.5 rounded-full bg-nordic-teal mt-2" />
                                        <span>{point}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoModal;
