// Nikaya Version Switcher Component
// Allows users to select language and version type (original vs improved)

import { useState } from 'react'
import { ChevronDown, Check, Globe, Sparkles } from 'lucide-react'
import type { NikayaLanguage, NikayaVersionType } from '@/types/nikaya'
import { NIKAYA_LANGUAGES } from '@/types/nikaya'

interface VersionOption {
    lang: NikayaLanguage
    type: NikayaVersionType
    author: string
    available: boolean
}

interface NikayaVersionSwitcherProps {
    availableVersions: VersionOption[]
    selectedVersion: { lang: NikayaLanguage; type: NikayaVersionType }
    onVersionChange: (lang: NikayaLanguage, type: NikayaVersionType) => void
    comparisonMode?: boolean
    onComparisonToggle?: (enabled: boolean) => void
    secondVersion?: { lang: NikayaLanguage; type: NikayaVersionType }
    onSecondVersionChange?: (lang: NikayaLanguage, type: NikayaVersionType) => void
}

export function NikayaVersionSwitcher({
    availableVersions,
    selectedVersion,
    onVersionChange,
    comparisonMode = false,
    onComparisonToggle,
    secondVersion,
    onSecondVersionChange
}: NikayaVersionSwitcherProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [isSecondOpen, setIsSecondOpen] = useState(false)

    const getVersionLabel = (lang: NikayaLanguage, type: NikayaVersionType) => {
        const langInfo = NIKAYA_LANGUAGES[lang]
        if (type === 'improved') {
            return `${langInfo.nativeName} - NhậpLưu 2026`
        }
        return `${langInfo.nativeName} - ${langInfo.originalAuthor}`
    }

    const renderVersionDropdown = (
        selectedLang: NikayaLanguage,
        selectedType: NikayaVersionType,
        onChange: (lang: NikayaLanguage, type: NikayaVersionType) => void,
        isOpenState: boolean,
        setIsOpenState: (open: boolean) => void,
        label: string
    ) => (
        <div className="relative">
            <label className="block text-xs text-muted-foreground mb-1">{label}</label>
            <button
                onClick={() => setIsOpenState(!isOpenState)}
                className="w-full flex items-center justify-between gap-2 px-3 py-2 bg-muted rounded-lg border border-border hover:bg-muted/80 transition-colors"
            >
                <div className="flex items-center gap-2">
                    {selectedType === 'improved' ? (
                        <Sparkles className="h-4 w-4 text-primary" />
                    ) : (
                        <Globe className="h-4 w-4 text-muted-foreground" />
                    )}
                    <span className="text-sm font-medium">
                        {getVersionLabel(selectedLang, selectedType)}
                    </span>
                </div>
                <ChevronDown className={`h-4 w-4 transition-transform ${isOpenState ? 'rotate-180' : ''}`} />
            </button>

            {isOpenState && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 z-10"
                        onClick={() => setIsOpenState(false)}
                    />

                    {/* Dropdown */}
                    <div className="absolute top-full left-0 right-0 mt-1 py-1 bg-card border border-border rounded-lg shadow-lg z-20 max-h-64 overflow-y-auto">
                        {/* Group by language */}
                        {(['vi', 'en', 'zh', 'es'] as NikayaLanguage[]).map(lang => {
                            const langInfo = NIKAYA_LANGUAGES[lang]
                            const originalVersion = availableVersions.find(v => v.lang === lang && v.type === 'original')
                            const improvedVersion = availableVersions.find(v => v.lang === lang && v.type === 'improved')

                            if (!originalVersion && !improvedVersion) return null

                            return (
                                <div key={lang} className="px-1">
                                    <div className="px-2 py-1 text-xs text-muted-foreground font-medium">
                                        {langInfo.nativeName}
                                    </div>

                                    {/* Original version */}
                                    {originalVersion && (
                                        <button
                                            onClick={() => {
                                                onChange(lang, 'original')
                                                setIsOpenState(false)
                                            }}
                                            disabled={!originalVersion.available}
                                            className={`
                        w-full flex items-center justify-between px-3 py-2 text-sm rounded-md
                        ${!originalVersion.available ? 'opacity-50 cursor-not-allowed' : 'hover:bg-muted'}
                        ${selectedLang === lang && selectedType === 'original' ? 'bg-primary/10 text-primary' : ''}
                      `}
                                        >
                                            <div className="flex items-center gap-2">
                                                <Globe className="h-3.5 w-3.5 text-muted-foreground" />
                                                <span>{originalVersion.author}</span>
                                            </div>
                                            {selectedLang === lang && selectedType === 'original' && (
                                                <Check className="h-4 w-4 text-primary" />
                                            )}
                                        </button>
                                    )}

                                    {/* Improved version */}
                                    {improvedVersion && (
                                        <button
                                            onClick={() => {
                                                onChange(lang, 'improved')
                                                setIsOpenState(false)
                                            }}
                                            disabled={!improvedVersion.available}
                                            className={`
                        w-full flex items-center justify-between px-3 py-2 text-sm rounded-md
                        ${!improvedVersion.available ? 'opacity-50 cursor-not-allowed' : 'hover:bg-muted'}
                        ${selectedLang === lang && selectedType === 'improved' ? 'bg-primary/10 text-primary' : ''}
                      `}
                                        >
                                            <div className="flex items-center gap-2">
                                                <Sparkles className="h-3.5 w-3.5 text-primary" />
                                                <span>NhậpLưu 2026</span>
                                                {!improvedVersion.available && (
                                                    <span className="text-xs text-muted-foreground">(Sắp có)</span>
                                                )}
                                            </div>
                                            {selectedLang === lang && selectedType === 'improved' && (
                                                <Check className="h-4 w-4 text-primary" />
                                            )}
                                        </button>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                </>
            )}
        </div>
    )

    return (
        <div className="bg-card rounded-lg border border-border p-4">
            <div className="flex flex-col md:flex-row md:items-end gap-4">
                {/* Primary version selector */}
                <div className="flex-1">
                    {renderVersionDropdown(
                        selectedVersion.lang,
                        selectedVersion.type,
                        onVersionChange,
                        isOpen,
                        setIsOpen,
                        comparisonMode ? 'Bản dịch 1' : 'Chọn bản dịch'
                    )}
                </div>

                {/* Comparison toggle */}
                {onComparisonToggle && (
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => onComparisonToggle(!comparisonMode)}
                            className={`
                flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-colors
                ${comparisonMode
                                    ? 'bg-primary text-primary-foreground'
                                    : 'bg-muted text-muted-foreground hover:bg-muted/80'}
              `}
                        >
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                            </svg>
                            So Sánh
                        </button>
                    </div>
                )}

                {/* Secondary version selector (comparison mode) */}
                {comparisonMode && secondVersion && onSecondVersionChange && (
                    <div className="flex-1">
                        {renderVersionDropdown(
                            secondVersion.lang,
                            secondVersion.type,
                            onSecondVersionChange,
                            isSecondOpen,
                            setIsSecondOpen,
                            'Bản dịch 2'
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}
