// Improved Translations Index
// Central index for all improved translations across languages

import { viImproved, getImprovedVi } from './vi'
import type { ImprovedTranslation, NikayaLanguage } from '@/types/nikaya'

// Get improved translation by sutta ID and language
export function getImprovedTranslation(
    suttaId: string,
    lang: NikayaLanguage
): ImprovedTranslation | null {
    const normalizedId = suttaId.toLowerCase().replace(/[^a-z0-9]/g, '')

    switch (lang) {
        case 'vi':
            return getImprovedVi(normalizedId)
        case 'en':
            // TODO: Add English improved translations
            return null
        case 'zh':
            // TODO: Add Chinese improved translations
            return null
        case 'es':
            // TODO: Add Spanish improved translations
            return null
        default:
            return null
    }
}

// Check if improved version exists
export function hasImprovedTranslation(
    suttaId: string,
    lang: NikayaLanguage
): boolean {
    return getImprovedTranslation(suttaId, lang) !== null
}

// Get all available improved translations for a sutta
export function getAvailableImproved(suttaId: string): NikayaLanguage[] {
    const langs: NikayaLanguage[] = ['vi', 'en', 'zh', 'es']
    return langs.filter(lang => hasImprovedTranslation(suttaId, lang))
}

// Export all translation collections
export { viImproved }
