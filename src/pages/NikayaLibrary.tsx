// Nikaya Library Page
// Main listing page for Pali Canon suttas with translation versions

import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Search, BookOpen, Globe, Sparkles, ChevronRight, Filter } from 'lucide-react'
import type { NikayaCollection, NikayaSuttaInfo } from '@/types/nikaya'
import { NIKAYA_COLLECTIONS } from '@/types/nikaya'
import { getAvailableImproved } from '@/data/nikaya-improved'

// Initial suttas list - will be expanded as translations are added
const INITIAL_SUTTAS: NikayaSuttaInfo[] = [
    {
        id: 'mn10',
        code: 'MN 10',
        titlePali: 'Satipaṭṭhāna Sutta',
        titleVi: 'Kinh Niệm Xứ',
        titleEn: 'Mindfulness Meditation',
        collection: 'mn',
        blurb: 'The seventh factor of the noble eightfold path, mindfulness meditation.',
        difficulty: 2
    },
    {
        id: 'dn22',
        code: 'DN 22',
        titlePali: 'Mahāsatipaṭṭhāna Sutta',
        titleVi: 'Kinh Đại Niệm Xứ',
        titleEn: 'The Great Discourse on Mindfulness',
        collection: 'dn',
        blurb: 'Extended version of the mindfulness meditation discourse with Four Noble Truths.',
        difficulty: 2
    },
    {
        id: 'mn118',
        code: 'MN 118',
        titlePali: 'Ānāpānasati Sutta',
        titleVi: 'Kinh Quán Niệm Hơi Thở',
        titleEn: 'Mindfulness of Breathing',
        collection: 'mn',
        blurb: 'Complete instructions on breath meditation and its relation to the awakening factors.',
        difficulty: 2
    },
    {
        id: 'sn56.11',
        code: 'SN 56.11',
        titlePali: 'Dhammacakkappavattana Sutta',
        titleVi: 'Kinh Chuyển Pháp Luân',
        titleEn: 'Setting in Motion the Wheel of Dhamma',
        collection: 'sn',
        blurb: 'The Buddha\'s first teaching after enlightenment, introducing the Four Noble Truths.',
        difficulty: 1
    },
    {
        id: 'mn2',
        code: 'MN 2',
        titlePali: 'Sabbāsava Sutta',
        titleVi: 'Kinh Tất Cả Lậu Hoặc',
        titleEn: 'All the Taints',
        collection: 'mn',
        blurb: 'Seven methods for eliminating mental defilements.',
        difficulty: 2
    },
    {
        id: 'dn16',
        code: 'DN 16',
        titlePali: 'Mahāparinibbāna Sutta',
        titleVi: 'Kinh Đại Bát Niết Bàn',
        titleEn: 'The Great Discourse on the Buddha\'s Passing',
        collection: 'dn',
        blurb: 'The Buddha\'s final days and last teachings.',
        difficulty: 2
    },
    {
        id: 'sn22.59',
        code: 'SN 22.59',
        titlePali: 'Anattalakkhaṇa Sutta',
        titleVi: 'Kinh Vô Ngã Tướng',
        titleEn: 'The Characteristic of Non-Self',
        collection: 'sn',
        blurb: 'The discourse on non-self, given to the first five monks.',
        difficulty: 2
    },
    {
        id: 'an3.65',
        code: 'AN 3.65',
        titlePali: 'Kālāma Sutta',
        titleVi: 'Kinh Kālāma',
        titleEn: 'To the Kālāmas',
        collection: 'an',
        blurb: 'The Buddha\'s teaching on free inquiry and not accepting things based on tradition alone.',
        difficulty: 1
    },
    {
        id: 'mn9',
        code: 'MN 9',
        titlePali: 'Sammādiṭṭhi Sutta',
        titleVi: 'Kinh Chánh Kiến',
        titleEn: 'Right View',
        collection: 'mn',
        blurb: 'Ven. Sāriputta explains right view through various Buddhist concepts.',
        difficulty: 2
    },
    {
        id: 'dn31',
        code: 'DN 31',
        titlePali: 'Sigālovāda Sutta',
        titleVi: 'Kinh Giáo Huấn Singala',
        titleEn: 'Advice to Sigālaka',
        collection: 'dn',
        blurb: 'The Buddha\'s advice on lay ethics and social relationships.',
        difficulty: 1
    }
]

export function NikayaLibrary() {
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedCollection, setSelectedCollection] = useState<NikayaCollection | 'all'>('all')
    const [suttas, setSuttas] = useState<NikayaSuttaInfo[]>(INITIAL_SUTTAS)

    // Filter suttas based on search and collection
    const filteredSuttas = suttas.filter(sutta => {
        const matchesSearch =
            sutta.titlePali.toLowerCase().includes(searchTerm.toLowerCase()) ||
            sutta.titleVi?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            sutta.titleEn?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            sutta.code.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesCollection = selectedCollection === 'all' || sutta.collection === selectedCollection

        return matchesSearch && matchesCollection
    })

    // Check for improved translations
    useEffect(() => {
        const updatedSuttas = suttas.map(sutta => ({
            ...sutta,
            hasImproved: {
                vi: getAvailableImproved(sutta.id).includes('vi'),
                en: getAvailableImproved(sutta.id).includes('en'),
                zh: getAvailableImproved(sutta.id).includes('zh'),
                es: getAvailableImproved(sutta.id).includes('es')
            }
        }))
        setSuttas(updatedSuttas)
    }, [])

    const difficultyLabels = {
        1: 'Sơ cấp',
        2: 'Trung cấp',
        3: 'Cao cấp'
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-foreground mb-2">
                    Kinh Điển Pāli
                </h1>
                <p className="text-muted-foreground text-lg">
                    Bộ sưu tập kinh điển nguyên thủy với bản dịch gốc và bản cải tiến
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                    So sánh các bản dịch tiếng Việt, Anh, Hoa, Tây Ban Nha
                </p>
            </div>

            {/* Info Banner */}
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-6">
                <div className="flex items-start gap-3">
                    <Sparkles className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                        <p className="font-medium text-foreground">Bản dịch cải tiến 2026</p>
                        <p className="text-sm text-muted-foreground">
                            Bản dịch mới với ngôn ngữ hiện đại, dễ đọc hơn. So sánh song song với bản dịch gốc của HT. Thích Minh Châu.
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
                {/* Sidebar */}
                <div className="md:col-span-1 space-y-4">
                    {/* Search */}
                    <div className="bg-card rounded-lg border border-border p-4">
                        <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                            <Search className="h-4 w-4" />
                            Tìm Kiếm
                        </h3>
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Tên kinh, mã số..."
                            className="w-full px-3 py-2 bg-background border border-input rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                    </div>

                    {/* Collection Filter */}
                    <div className="bg-card rounded-lg border border-border p-4">
                        <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                            <Filter className="h-4 w-4" />
                            Bộ Kinh
                        </h3>
                        <div className="space-y-1">
                            <button
                                onClick={() => setSelectedCollection('all')}
                                className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${selectedCollection === 'all'
                                        ? 'bg-primary text-primary-foreground'
                                        : 'text-muted-foreground hover:bg-muted'
                                    }`}
                            >
                                Tất cả
                            </button>
                            {(Object.keys(NIKAYA_COLLECTIONS) as NikayaCollection[]).map(key => (
                                <button
                                    key={key}
                                    onClick={() => setSelectedCollection(key)}
                                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${selectedCollection === key
                                            ? 'bg-primary text-primary-foreground'
                                            : 'text-muted-foreground hover:bg-muted'
                                        }`}
                                >
                                    {NIKAYA_COLLECTIONS[key].vi} ({key.toUpperCase()})
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="bg-card rounded-lg border border-border p-4">
                        <h3 className="font-semibold text-foreground mb-3">Tiến Độ</h3>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Tổng số kinh</span>
                                <span className="font-medium">{suttas.length}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Có bản cải tiến</span>
                                <span className="font-medium text-primary">
                                    {suttas.filter(s => s.hasImproved?.vi).length}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sutta List */}
                <div className="md:col-span-3 space-y-3">
                    {filteredSuttas.length === 0 ? (
                        <div className="bg-card rounded-lg border border-border p-8 text-center">
                            <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                            <p className="text-muted-foreground">Không tìm thấy kinh nào phù hợp</p>
                        </div>
                    ) : (
                        filteredSuttas.map((sutta) => (
                            <Link
                                key={sutta.id}
                                to={`/nikaya/${sutta.id}`}
                                className="block bg-card rounded-lg border border-border p-4 hover:shadow-md hover:border-primary/30 transition-all"
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                                            <span className="text-sm font-bold text-primary">
                                                {sutta.code}
                                            </span>
                                            <span className="px-2 py-0.5 bg-muted text-muted-foreground text-xs rounded">
                                                {NIKAYA_COLLECTIONS[sutta.collection].vi}
                                            </span>
                                            {sutta.difficulty && (
                                                <span className="px-2 py-0.5 bg-muted text-muted-foreground text-xs rounded">
                                                    {difficultyLabels[sutta.difficulty]}
                                                </span>
                                            )}
                                            {sutta.hasImproved?.vi && (
                                                <span className="flex items-center gap-1 px-2 py-0.5 bg-primary/10 text-primary text-xs rounded">
                                                    <Sparkles className="h-3 w-3" />
                                                    Bản 2026
                                                </span>
                                            )}
                                        </div>

                                        <h3 className="text-lg font-semibold text-foreground mb-1">
                                            {sutta.titleVi}
                                        </h3>
                                        <p className="text-sm text-muted-foreground italic font-serif mb-2">
                                            {sutta.titlePali}
                                        </p>
                                        {sutta.blurb && (
                                            <p className="text-sm text-muted-foreground line-clamp-2">
                                                {sutta.blurb}
                                            </p>
                                        )}

                                        {/* Available versions indicator */}
                                        <div className="flex items-center gap-3 mt-3 text-xs text-muted-foreground">
                                            <span className="flex items-center gap-1">
                                                <Globe className="h-3 w-3" />
                                                VI, EN, ZH, ES
                                            </span>
                                        </div>
                                    </div>
                                    <ChevronRight className="h-5 w-5 text-muted-foreground ml-4 flex-shrink-0" />
                                </div>
                            </Link>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}
