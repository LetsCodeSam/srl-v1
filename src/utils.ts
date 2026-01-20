export const getThumbnailUrl = (url: string) => {
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
        const vid = url.split('v=')[1]?.split('&')[0] || url.split('/').pop()?.split('?')[0];
        return `https://img.youtube.com/vi/${vid}/mqdefault.jpg`;
    }
    if (url.includes('vimeo.com')) {
        // Note: Vimeo thumbnails technically require an API call (https://vimeo.com/api/v2/video/ID.json)
        // For a static template, we can return a high-quality placeholder or a generic image
        // However, some vimeo thumbnails follow a pattern if we use the player link, but it's unreliable.
        // Let's use a generic placeholder for Vimeo to keep it clean, or a blurred version.
        return `https://v1.vimeocdn.com/video/default_300`;
    }
    return '';
};
