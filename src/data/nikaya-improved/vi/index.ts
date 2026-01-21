// Improved Vietnamese Translations Index
// NhậpLưu 2026 Translation Project

import { mn10 } from './mn-10'
import { dn22 } from './dn-22'
import { mn118 } from './mn-118'
import { sn5611 } from './sn-56-11'
import type { ImprovedTranslation } from '@/types/nikaya'

// All improved Vietnamese translations
export const viImproved: Record<string, ImprovedTranslation> = {
    'mn10': mn10,
    'dn22': dn22,
    'mn118': mn118,
    'sn5611': sn5611,
}

// Get improved translation by sutta ID
export function getImprovedVi(suttaId: string): ImprovedTranslation | null {
    const normalizedId = suttaId.toLowerCase().replace(/[^a-z0-9]/g, '')
    return viImproved[normalizedId] || null
}
