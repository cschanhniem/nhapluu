// Original Translations Index
// Central index for all original translations stored locally

import { viOriginal, getOriginalVi } from './vi'
import type { ImprovedTranslation, NikayaLanguage } from '@/types/nikaya'

// Get original translation by sutta ID and language
export function getOriginalTranslation(
    suttaId: string,
    lang: NikayaLanguage
): ImprovedTranslation | null {
    const normalizedId = suttaId.toLowerCase().replace(/[^a-z0-9]/g, '')

    switch (lang) {
        case 'vi':
            return getOriginalVi(normalizedId)
        case 'en':
            // TODO: Add English original translations
            return null
        case 'zh':
            // TODO: Add Chinese original translations
            return null
        case 'es':
            // TODO: Add Spanish original translations
            return null
        default:
            return null
    }
}

// Check if original version exists locally
export function hasOriginalTranslation(
    suttaId: string,
    lang: NikayaLanguage
): boolean {
    return getOriginalTranslation(suttaId, lang) !== null
}

// Get all available original translations for a sutta
export function getAvailableOriginal(suttaId: string): NikayaLanguage[] {
    const langs: NikayaLanguage[] = ['vi', 'en', 'zh', 'es']
    return langs.filter(lang => hasOriginalTranslation(suttaId, lang))
}

// Export all translation collections
export { viOriginal }
