// Nikaya Translation Types
// Types for the Pali Canon translation project with original + improved versions

export type NikayaCollection = 'dn' | 'mn' | 'sn' | 'an' | 'kn'
export type NikayaLanguage = 'en' | 'vi' | 'zh' | 'es' | 'pli'
export type NikayaVersionType = 'original' | 'improved'

// Collection metadata
export const NIKAYA_COLLECTIONS = {
    dn: { pali: 'Dīgha Nikāya', vi: 'Trường Bộ Kinh', en: 'Long Discourses' },
    mn: { pali: 'Majjhima Nikāya', vi: 'Trung Bộ Kinh', en: 'Middle Discourses' },
    sn: { pali: 'Saṃyutta Nikāya', vi: 'Tương Ưng Bộ Kinh', en: 'Connected Discourses' },
    an: { pali: 'Aṅguttara Nikāya', vi: 'Tăng Chi Bộ Kinh', en: 'Numerical Discourses' },
    kn: { pali: 'Khuddaka Nikāya', vi: 'Tiểu Bộ Kinh', en: 'Minor Collection' }
} as const

// Language metadata with author info
export const NIKAYA_LANGUAGES = {
    en: {
        name: 'English',
        nativeName: 'English',
        originalAuthor: 'Bhikkhu Sujato',
        originalAuthorUid: 'sujato'
    },
    vi: {
        name: 'Vietnamese',
        nativeName: 'Tiếng Việt',
        originalAuthor: 'Thích Minh Châu',
        originalAuthorUid: 'minh_chau'
    },
    zh: {
        name: 'Chinese',
        nativeName: '汉语',
        originalAuthor: '莊春江',
        originalAuthorUid: 'zhuang'
    },
    es: {
        name: 'Spanish',
        nativeName: 'Español',
        originalAuthor: 'Anton P. Baron',
        originalAuthorUid: 'baron'
    },
    pli: {
        name: 'Pāli',
        nativeName: 'Pāli',
        originalAuthor: 'Mahāsaṅgīti Tipiṭaka',
        originalAuthorUid: 'ms'
    }
} as const

// A specific version of a sutta (original or improved)
export interface NikayaVersion {
    type: NikayaVersionType
    lang: NikayaLanguage
    author: string
    authorUid?: string
    source: 'suttacentral' | 'local'
    year?: string
    title: string
    content?: string // Loaded dynamically
}

// Basic sutta info for list display
export interface NikayaSuttaInfo {
    id: string              // e.g., 'mn10'
    code: string            // e.g., 'MN 10'
    titlePali: string       // e.g., 'Satipaṭṭhāna Sutta'
    titleVi?: string        // e.g., 'Kinh Niệm Xứ'  
    titleEn?: string        // e.g., 'Mindfulness Meditation'
    collection: NikayaCollection
    blurb?: string          // Short description
    difficulty?: 1 | 2 | 3  // 1=beginner, 2=intermediate, 3=advanced
    hasImproved?: {         // Which languages have improved versions
        vi?: boolean
        en?: boolean
        zh?: boolean
        es?: boolean
    }
}

// Full sutta data with all versions
export interface NikayaSuttaFull extends NikayaSuttaInfo {
    versions: NikayaVersion[]
}

// SuttaCentral API response types
export interface SCTranslation {
    lang: string
    lang_name: string
    author: string
    author_short: string
    author_uid: string
    id: string
    segmented: boolean
    title?: string
    publication_date?: string
}

export interface SCSuttaplex {
    uid: string
    acronym: string
    original_title: string
    translated_title?: string
    blurb: string
    difficulty?: { level: number; name: string }
    translations: SCTranslation[]
    parallel_count: number
}

// Improved translation stored locally
export interface ImprovedTranslation {
    suttaId: string
    lang: NikayaLanguage
    author: string
    year: string
    title: string
    content: string
}
