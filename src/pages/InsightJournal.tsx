import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useAppState } from '@/hooks/useAppState'
import { Button } from '@/components/ui/button'
import {
  BookText,
  Plus,
  Search,
  Trash2,
  X,
  Save,
  Sparkles,
  Leaf,
  Heart,
  CircleDot
} from 'lucide-react'

type ContemplationType = 'anicca' | 'dukkha' | 'anatta' | 'general'

const contemplationIcons: Record<ContemplationType, React.ReactNode> = {
  anicca: <Sparkles className="h-4 w-4" />,
  dukkha: <Heart className="h-4 w-4" />,
  anatta: <CircleDot className="h-4 w-4" />,
  general: <Leaf className="h-4 w-4" />
}

export function InsightJournal() {
  const { t } = useTranslation()
  const { state, addInsightEntry, deleteInsightEntry } = useAppState()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState<ContemplationType | 'all'>('all')
  const [isAdding, setIsAdding] = useState(false)
  const [expandedId, setExpandedId] = useState<string | null>(null)

  // Form state
  const [formTitle, setFormTitle] = useState('')
  const [formContent, setFormContent] = useState('')
  const [formContemplation, setFormContemplation] = useState<ContemplationType>('general')
  const [formTags, setFormTags] = useState('')

  // Filter entries
  const filteredEntries = state.insightEntries.filter(entry => {
    const matchesSearch =
      entry.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === 'all' || entry.contemplation === filterType
    return matchesSearch && matchesType
  })

  const handleAddEntry = () => {
    if (!formContent.trim()) return

    addInsightEntry({
      date: new Date().toISOString(),
      title: formTitle.trim() || undefined,
      content: formContent.trim(),
      contemplation: formContemplation,
      tags: formTags ? formTags.split(',').map(t => t.trim()).filter(Boolean) : undefined
    })

    resetForm()
    setIsAdding(false)
  }

  const handleDelete = (id: string) => {
    if (confirm(t('journal.confirmDelete'))) {
      deleteInsightEntry(id)
    }
  }

  const resetForm = () => {
    setFormTitle('')
    setFormContent('')
    setFormContemplation('general')
    setFormTags('')
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <BookText className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold text-foreground">
            {t('journal.title')}
          </h1>
        </div>
        <p className="text-muted-foreground">
          {t('journal.subtitle')}
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t('journal.searchPlaceholder')}
            className="w-full pl-10 pr-3 py-2 bg-background border border-input rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <div className="flex gap-2">
          {(['all', 'anicca', 'dukkha', 'anatta', 'general'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1 ${
                filterType === type
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {type !== 'all' && contemplationIcons[type]}
              {t(`journal.contemplations.${type}`)}
            </button>
          ))}
        </div>
      </div>

      {/* Add New Entry Button */}
      {!isAdding && (
        <Button
          onClick={() => setIsAdding(true)}
          className="w-full mb-6"
          size="lg"
        >
          <Plus className="mr-2 h-5 w-5" />
          {t('journal.addEntry')}
        </Button>
      )}

      {/* Add Entry Form */}
      {isAdding && (
        <div className="bg-card rounded-lg border border-border p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">
              {t('journal.newEntry')}
            </h3>
            <button
              onClick={() => { setIsAdding(false); resetForm() }}
              className="p-1 hover:bg-muted rounded"
            >
              <X className="h-5 w-5 text-muted-foreground" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                {t('journal.form.title')}
              </label>
              <input
                type="text"
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
                placeholder={t('journal.form.titlePlaceholder')}
                className="w-full px-3 py-2 bg-background border border-input rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                {t('journal.form.contemplation')}
              </label>
              <div className="flex flex-wrap gap-2">
                {(['general', 'anicca', 'dukkha', 'anatta'] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => setFormContemplation(type)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1 ${
                      formContemplation === type
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                  >
                    {contemplationIcons[type]}
                    {t(`journal.contemplations.${type}`)}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                {t('journal.form.content')} *
              </label>
              <textarea
                value={formContent}
                onChange={(e) => setFormContent(e.target.value)}
                placeholder={t('journal.form.contentPlaceholder')}
                className="w-full px-3 py-2 bg-background border border-input rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                rows={6}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                {t('journal.form.tags')}
              </label>
              <input
                type="text"
                value={formTags}
                onChange={(e) => setFormTags(e.target.value)}
                placeholder={t('journal.form.tagsPlaceholder')}
                className="w-full px-3 py-2 bg-background border border-input rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <Button
              onClick={handleAddEntry}
              disabled={!formContent.trim()}
              className="w-full"
            >
              <Save className="mr-2 h-4 w-4" />
              {t('journal.form.save')}
            </Button>
          </div>
        </div>
      )}

      {/* Entries List */}
      {filteredEntries.length === 0 ? (
        <div className="bg-card rounded-lg border border-border p-12 text-center">
          <BookText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-foreground mb-2">
            {state.insightEntries.length === 0
              ? t('journal.empty.title')
              : t('journal.noResults')}
          </h3>
          <p className="text-muted-foreground">
            {state.insightEntries.length === 0
              ? t('journal.empty.description')
              : t('journal.tryDifferentSearch')}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredEntries.map((entry) => (
            <div
              key={entry.id}
              className="bg-card rounded-lg border border-border p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    {entry.contemplation && contemplationIcons[entry.contemplation]}
                    <span className="text-xs text-muted-foreground">
                      {formatDate(entry.date)}
                    </span>
                    {entry.contemplation && (
                      <span className="text-xs text-primary bg-primary/10 px-2 py-0.5 rounded">
                        {t(`journal.contemplations.${entry.contemplation}`)}
                      </span>
                    )}
                  </div>
                  {entry.title && (
                    <h3 className="text-lg font-semibold text-foreground">
                      {entry.title}
                    </h3>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleDelete(entry.id)}
                    className="p-1.5 hover:bg-destructive/10 hover:text-destructive rounded transition-colors"
                    title={t('journal.delete')}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <p className={`text-foreground whitespace-pre-wrap ${
                expandedId === entry.id ? '' : 'line-clamp-3'
              }`}>
                {entry.content}
              </p>

              {entry.content.length > 200 && (
                <button
                  onClick={() => setExpandedId(expandedId === entry.id ? null : entry.id)}
                  className="text-sm text-primary hover:underline mt-2"
                >
                  {expandedId === entry.id ? t('journal.showLess') : t('journal.showMore')}
                </button>
              )}

              {entry.tags && entry.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {entry.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 bg-muted text-muted-foreground text-xs rounded"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Stats */}
      {state.insightEntries.length > 0 && (
        <div className="mt-8 p-4 bg-muted rounded-lg">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-foreground">{state.insightEntries.length}</div>
              <div className="text-xs text-muted-foreground">{t('journal.stats.totalEntries')}</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">
                {state.insightEntries.filter(e => e.contemplation === 'anicca').length}
              </div>
              <div className="text-xs text-muted-foreground">{t('journal.contemplations.anicca')}</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">
                {state.insightEntries.filter(e => e.contemplation === 'dukkha').length}
              </div>
              <div className="text-xs text-muted-foreground">{t('journal.contemplations.dukkha')}</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">
                {state.insightEntries.filter(e => e.contemplation === 'anatta').length}
              </div>
              <div className="text-xs text-muted-foreground">{t('journal.contemplations.anatta')}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
