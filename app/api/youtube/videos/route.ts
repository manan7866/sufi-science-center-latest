import { NextRequest, NextResponse } from 'next/server';

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const YOUTUBE_CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID;

const YOUTUBE_API_SEARCH = 'https://www.googleapis.com/youtube/v3/search';
const YOUTUBE_API_VIDEOS = 'https://www.googleapis.com/youtube/v3/videos';

export interface YouTubeVideoItem {
  id: string;
  slug: string;
  title: string;
  description: string;
  youtube_url: string;
  thumbnail_url: string;
  duration: string;
  release_date: string;
  language_primary: string;
  subtitle_languages: string[];
  format_type: 'subtitle' | 'interpretation';
  themes: string[];
  view_count: number;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .substring(0, 80)
    .replace(/-+$/, '');
}

function formatDuration(isoDuration: string): string {
  const match = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return '0:00';

  const [, hours, minutes, seconds] = match;
  const h = hours ? parseInt(hours) : 0;
  const m = minutes ? parseInt(minutes) : 0;
  const s = seconds ? parseInt(seconds) : 0;

  if (h > 0) {
    return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }
  return `${m}:${s.toString().padStart(2, '0')}`;
}

function inferMetadata(title: string, description: string): {
  language_primary: string;
  subtitle_languages: string[];
  format_type: 'subtitle' | 'interpretation';
  themes: string[];
} {
  const language_primary = 'Roman Urdu';
  const subtitle_languages: string[] = [];
  const format_type: 'subtitle' | 'interpretation' = 'subtitle';
  const themes: string[] = [];

  const lowerText = `${title} ${description}`.toLowerCase();

  const languageMap: Record<string, string[]> = {
    'Urdu': ['urdu', 'اردو'],
    'Hindi': ['hindi', 'हिन्दी'],
    'Arabic': ['arabic', 'عربى'],
    'Turkish': ['turkish', 'türkçe'],
    'Farsi': ['farsi', 'فارسی'],
    'Punjabi': ['punjabi', 'ਪੰਜਾਬੀ'],
    'Indonesian': ['indonesian', 'bahasa'],
    'Spanish': ['spanish', 'español'],
    'Portuguese': ['portuguese', 'português'],
    'French': ['french', 'français'],
    'German': ['german', 'deutsch'],
    'Russian': ['russian', 'русский'],
    'Bengali': ['bengali', 'বাংলা'],
    'Mandarin': ['mandarin', '中文', '普通话'],
    'Japanese': ['japanese', '日本語'],
    'English': ['english'],
  };

  for (const [lang, keywords] of Object.entries(languageMap)) {
    if (keywords.some((kw) => lowerText.includes(kw))) {
      subtitle_languages.push(lang);
    }
  }

  const themeMap: Record<string, string[]> = {
    'Consciousness': ['consciousness', 'awareness', 'inner'],
    'Transformation': ['transformation', 'change', 'evolve'],
    'Tawhid': ['tawhid', 'unity', 'oneness'],
    'Mortality': ['mortality', 'death', 'finite'],
    'Ethical Discipline': ['ethical', 'discipline', 'disciplined'],
    'Inner Light': ['light', 'noor', 'illumination'],
    'Divine Love': ['love', 'ishq', 'divine'],
    'Spiritual Journey': ['journey', 'path', 'quest'],
  };

  for (const [theme, keywords] of Object.entries(themeMap)) {
    if (keywords.some((kw) => lowerText.includes(kw))) {
      themes.push(theme);
    }
  }

  return {
    language_primary,
    subtitle_languages: subtitle_languages.length > 0 ? subtitle_languages : ['English'],
    format_type,
    themes: themes.length > 0 ? themes : ['Spiritual Journey'],
  };
}

export async function GET(request: NextRequest) {
  try {
    if (!YOUTUBE_API_KEY || !YOUTUBE_CHANNEL_ID) {
      return NextResponse.json(
        { error: 'YouTube API credentials not configured' },
        { status: 500 }
      );
    }

    const searchParams = request.nextUrl.searchParams;
    const maxResults = Math.min(parseInt(searchParams.get('limit') || '50'), 50);
    const pageToken = searchParams.get('pageToken') || undefined;

    const searchUrl = new URL(YOUTUBE_API_SEARCH);
    searchUrl.searchParams.set('part', 'snippet');
    searchUrl.searchParams.set('channelId', YOUTUBE_CHANNEL_ID);
    searchUrl.searchParams.set('maxResults', maxResults.toString());
    searchUrl.searchParams.set('order', 'date');
    searchUrl.searchParams.set('type', 'video');
    searchUrl.searchParams.set('key', YOUTUBE_API_KEY);
    if (pageToken) {
      searchUrl.searchParams.set('pageToken', pageToken);
    }

    const searchResponse = await fetch(searchUrl.toString(), {
      next: { revalidate: 3600 },
    });

    if (!searchResponse.ok) {
      const errorData = await searchResponse.json().catch(() => ({}));
      console.error('YouTube API error:', errorData);
      return NextResponse.json(
        { error: 'Failed to fetch videos from YouTube', details: errorData },
        { status: 502 }
      );
    }

    const searchData = await searchResponse.json();

    if (!searchData.items || searchData.items.length === 0) {
      return NextResponse.json({
        videos: [],
        nextPageToken: searchData.nextPageToken || null,
        totalResults: searchData.pageInfo?.totalResults || 0,
      });
    }

    const videoIds = searchData.items
      .map((item: any) => item.id?.videoId)
      .filter(Boolean)
      .join(',');

    const videosUrl = new URL(YOUTUBE_API_VIDEOS);
    videosUrl.searchParams.set('part', 'snippet,contentDetails,statistics');
    videosUrl.searchParams.set('id', videoIds);
    videosUrl.searchParams.set('key', YOUTUBE_API_KEY);

    const videosResponse = await fetch(videosUrl.toString(), {
      next: { revalidate: 3600 },
    });

    if (!videosResponse.ok) {
      console.error('YouTube Videos API error:', await videosResponse.json().catch(() => ({})));
      return NextResponse.json(
        { error: 'Failed to fetch video details' },
        { status: 502 }
      );
    }

    const videosData = await videosResponse.json();

    const videos: YouTubeVideoItem[] = videosData.items.map((item: any) => {
      const snippet = item.snippet;
      const contentDetails = item.contentDetails;
      const statistics = item.statistics;

      const title = snippet.title || 'Untitled';
      const description = snippet.description || '';

      const metadata = inferMetadata(title, description);

      return {
        id: item.id,
        slug: slugify(title),
        title,
        description,
        youtube_url: `https://www.youtube.com/watch?v=${item.id}`,
        thumbnail_url: snippet.thumbnails?.high?.url || snippet.thumbnails?.default?.url || '',
        duration: formatDuration(contentDetails?.duration || ''),
        release_date: snippet.publishedAt
          ? new Date(snippet.publishedAt).toISOString().split('T')[0]
          : '',
        language_primary: metadata.language_primary,
        subtitle_languages: metadata.subtitle_languages,
        format_type: metadata.format_type,
        themes: metadata.themes,
        view_count: parseInt(statistics?.viewCount || '0'),
      };
    });

    return NextResponse.json({
      videos,
      nextPageToken: searchData.nextPageToken || null,
      totalResults: searchData.pageInfo?.totalResults || 0,
    });
  } catch (error: any) {
    console.error('Error in YouTube API route:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}
