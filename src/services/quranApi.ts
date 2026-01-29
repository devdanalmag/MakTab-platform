/**
 * Quran API Service
 * Uses alquran.cloud API for Quran text, translation, and audio
 * Documentation: https://alquran.cloud/api
 */

const API_BASE = 'https://api.alquran.cloud/v1';

// Editions
export const EDITIONS = {
    ARABIC: 'quran-uthmani',
    ENGLISH: 'en.asad',
    HAUSA: 'ha.gumi',
} as const;

export const RECITERS = {
    MISHARY: 'ar.alafasy',
    ABDUL_BASIT: 'ar.abdulbasitmurattal',
    HUSARY: 'ar.husary',
    MINSHAWI: 'ar.minshawi',
} as const;

// Types
export interface SurahMeta {
    number: number;
    name: string;
    englishName: string;
    englishNameTranslation: string;
    numberOfAyahs: number;
    revelationType: 'Meccan' | 'Medinan';
}

export interface Ayah {
    number: number;
    text: string;
    numberInSurah: number;
    juz: number;
    manzil: number;
    page: number;
    ruku: number;
    hizbQuarter: number;
    sajda: boolean | { id: number; recommended: boolean; obligatory: boolean };
    audio?: string;
    audioSecondary?: string[];
    translation?: string;
}

export interface SurahData {
    number: number;
    name: string;
    englishName: string;
    englishNameTranslation: string;
    revelationType: 'Meccan' | 'Medinan';
    numberOfAyahs: number;
    ayahs: Ayah[];
}

export interface PageData {
    number: number;
    ayahs: Ayah[];
    surahs: { [key: number]: string };
}

export interface JuzData {
    number: number;
    ayahs: Ayah[];
    surahs: { [key: number]: string };
}

export interface ApiResponse<T> {
    code: number;
    status: string;
    data: T;
}

// API Functions

/**
 * Fetch metadata for all 114 surahs
 */
export async function fetchAllSurahs(): Promise<SurahMeta[]> {
    try {
        const response = await fetch(`${API_BASE}/surah`);
        const json: ApiResponse<SurahMeta[]> = await response.json();

        if (json.code !== 200) {
            throw new Error(`API Error: ${json.status}`);
        }

        return json.data;
    } catch (error) {
        console.error('Failed to fetch surahs:', error);
        throw error;
    }
}

/**
 * Fetch a complete surah with all ayahs
 */
export async function fetchSurah(
    surahNumber: number,
    edition: string = EDITIONS.ARABIC
): Promise<SurahData> {
    try {
        const response = await fetch(`${API_BASE}/surah/${surahNumber}/${edition}`);
        const json: ApiResponse<SurahData> = await response.json();

        if (json.code !== 200) {
            throw new Error(`API Error: ${json.status}`);
        }

        return json.data;
    } catch (error) {
        console.error(`Failed to fetch surah ${surahNumber}:`, error);
        throw error;
    }
}

/**
 * Fetch a surah with both Arabic text and translation
 */
export async function fetchSurahWithTranslation(
    surahNumber: number,
    translationEdition: string = EDITIONS.ENGLISH
): Promise<{ arabic: SurahData; translation: SurahData }> {
    try {
        const [arabicRes, translationRes] = await Promise.all([
            fetch(`${API_BASE}/surah/${surahNumber}/${EDITIONS.ARABIC}`),
            fetch(`${API_BASE}/surah/${surahNumber}/${translationEdition}`)
        ]);

        const arabicJson: ApiResponse<SurahData> = await arabicRes.json();
        const translationJson: ApiResponse<SurahData> = await translationRes.json();

        if (arabicJson.code !== 200 || translationJson.code !== 200) {
            throw new Error('API Error fetching surah with translation');
        }

        return {
            arabic: arabicJson.data,
            translation: translationJson.data
        };
    } catch (error) {
        console.error(`Failed to fetch surah ${surahNumber} with translation:`, error);
        throw error;
    }
}

/**
 * Fetch a surah with audio (includes audio URLs for each ayah)
 */
export async function fetchSurahWithAudio(
    surahNumber: number,
    reciter: string = RECITERS.MISHARY
): Promise<SurahData> {
    try {
        const response = await fetch(`${API_BASE}/surah/${surahNumber}/${reciter}`);
        const json: ApiResponse<SurahData> = await response.json();

        if (json.code !== 200) {
            throw new Error(`API Error: ${json.status}`);
        }

        return json.data;
    } catch (error) {
        console.error(`Failed to fetch surah ${surahNumber} with audio:`, error);
        throw error;
    }
}

/**
 * Fetch a page of the Quran (1-604)
 */
export async function fetchPage(
    pageNumber: number,
    edition: string = EDITIONS.ARABIC
): Promise<PageData> {
    try {
        const response = await fetch(`${API_BASE}/page/${pageNumber}/${edition}`);
        const json: ApiResponse<PageData> = await response.json();

        if (json.code !== 200) {
            throw new Error(`API Error: ${json.status}`);
        }

        return json.data;
    } catch (error) {
        console.error(`Failed to fetch page ${pageNumber}:`, error);
        throw error;
    }
}

/**
 * Fetch a page with translation
 */
export async function fetchPageWithTranslation(
    pageNumber: number,
    translationEdition: string = EDITIONS.ENGLISH
): Promise<{ arabic: PageData; translation: PageData }> {
    try {
        const [arabicRes, translationRes] = await Promise.all([
            fetch(`${API_BASE}/page/${pageNumber}/${EDITIONS.ARABIC}`),
            fetch(`${API_BASE}/page/${pageNumber}/${translationEdition}`)
        ]);

        const arabicJson: ApiResponse<PageData> = await arabicRes.json();
        const translationJson: ApiResponse<PageData> = await translationRes.json();

        if (arabicJson.code !== 200 || translationJson.code !== 200) {
            throw new Error('API Error fetching page with translation');
        }

        return {
            arabic: arabicJson.data,
            translation: translationJson.data
        };
    } catch (error) {
        console.error(`Failed to fetch page ${pageNumber} with translation:`, error);
        throw error;
    }
}

/**
 * Fetch a juz of the Quran (1-30)
 */
export async function fetchJuz(
    juzNumber: number,
    edition: string = EDITIONS.ARABIC
): Promise<JuzData> {
    try {
        const response = await fetch(`${API_BASE}/juz/${juzNumber}/${edition}`);
        const json: ApiResponse<JuzData> = await response.json();

        if (json.code !== 200) {
            throw new Error(`API Error: ${json.status}`);
        }

        return json.data;
    } catch (error) {
        console.error(`Failed to fetch juz ${juzNumber}:`, error);
        throw error;
    }
}

/**
 * Fetch a juz with translation
 */
export async function fetchJuzWithTranslation(
    juzNumber: number,
    translationEdition: string = EDITIONS.ENGLISH
): Promise<{ arabic: JuzData; translation: JuzData }> {
    try {
        const [arabicRes, translationRes] = await Promise.all([
            fetch(`${API_BASE}/juz/${juzNumber}/${EDITIONS.ARABIC}`),
            fetch(`${API_BASE}/juz/${juzNumber}/${translationEdition}`)
        ]);

        const arabicJson: ApiResponse<JuzData> = await arabicRes.json();
        const translationJson: ApiResponse<JuzData> = await translationRes.json();

        if (arabicJson.code !== 200 || translationJson.code !== 200) {
            throw new Error('API Error fetching juz with translation');
        }

        return {
            arabic: arabicJson.data,
            translation: translationJson.data
        };
    } catch (error) {
        console.error(`Failed to fetch juz ${juzNumber} with translation:`, error);
        throw error;
    }
}

/**
 * Fetch a single ayah
 */
export async function fetchAyah(
    reference: string | number, // Can be ayah number (1-6236) or "surah:ayah" format
    edition: string = EDITIONS.ARABIC
): Promise<Ayah> {
    try {
        const response = await fetch(`${API_BASE}/ayah/${reference}/${edition}`);
        const json: ApiResponse<Ayah> = await response.json();

        if (json.code !== 200) {
            throw new Error(`API Error: ${json.status}`);
        }

        return json.data;
    } catch (error) {
        console.error(`Failed to fetch ayah ${reference}:`, error);
        throw error;
    }
}

/**
 * Search the Quran
 */
export async function searchQuran(
    keyword: string,
    surah: number | 'all' = 'all',
    edition: string = EDITIONS.ENGLISH
): Promise<{ count: number; matches: Ayah[] }> {
    try {
        const response = await fetch(`${API_BASE}/search/${encodeURIComponent(keyword)}/${surah}/${edition}`);
        const json: ApiResponse<{ count: number; matches: Ayah[] }> = await response.json();

        if (json.code !== 200) {
            throw new Error(`API Error: ${json.status}`);
        }

        return json.data;
    } catch (error) {
        console.error(`Failed to search for "${keyword}":`, error);
        throw error;
    }
}

/**
 * Get audio URL for a specific ayah
 */
export function getAudioUrl(
    surahNumber: number,
    ayahNumber: number,
    reciter: string = RECITERS.MISHARY
): string {
    // Format: reciter identifier uses ayah number padded to 3 digits
    const paddedSurah = surahNumber.toString().padStart(3, '0');
    const paddedAyah = ayahNumber.toString().padStart(3, '0');

    // CDN URL pattern for audio files
    const reciterFolder = reciter.replace('ar.', '');
    return `https://cdn.islamic.network/quran/audio/128/${reciterFolder}/${paddedSurah}${paddedAyah}.mp3`;
}

/**
 * Get metadata about pages, hizbs, juzs etc
 */
export async function fetchMeta(): Promise<{
    ayahs: { count: number };
    surahs: { count: number; references: SurahMeta[] };
    pages: { count: number };
    juzs: { count: number };
}> {
    try {
        const response = await fetch(`${API_BASE}/meta`);
        const json = await response.json();

        if (json.code !== 200) {
            throw new Error(`API Error: ${json.status}`);
        }

        return json.data;
    } catch (error) {
        console.error('Failed to fetch meta:', error);
        throw error;
    }
}

// Helper function to combine Arabic and translation ayahs
export function combineWithTranslation(
    arabicAyahs: Ayah[],
    translationAyahs: Ayah[]
): (Ayah & { translation: string })[] {
    return arabicAyahs.map((ayah, index) => ({
        ...ayah,
        translation: translationAyahs[index]?.text || ''
    }));
}
