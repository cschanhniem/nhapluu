// Original Vietnamese Translations Index (Thích Minh Châu)
// Stored locally for offline access

import { mn10_original } from './mn-10'
import { sn5611_original } from './sn-56-11'
import type { ImprovedTranslation } from '@/types/nikaya'

// All original Vietnamese translations
export const viOriginal: Record<string, ImprovedTranslation> = {
    'mn10': mn10_original,
    'sn5611': sn5611_original,
    // Add more as needed
}

// Get original translation by sutta ID
export function getOriginalVi(suttaId: string): ImprovedTranslation | null {
    const normalizedId = suttaId.toLowerCase().replace(/[^a-z0-9]/g, '')
    return viOriginal[normalizedId] || null
}
