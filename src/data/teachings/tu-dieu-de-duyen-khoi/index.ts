import type { TeachingWithChapters } from '../tien-trinh-minh-sat/index'
import chap00 from './00-tong-quan'
import chap01 from './01-kho-de'
import chap02 from './02-tap-de'
import chap03 from './03-diet-de'
import chap04 from './04-dao-de'
import chap05 from './05-duyen-khoi'

export const tuDieuDeMeta: Omit<TeachingWithChapters, 'chapters'> = {
    id: 'tu-dieu-de-duyen-khoi',
    title: 'Tứ Diệu Đế & Duyên Khởi',
    titlePali: 'Cattāri Ariyasaccāni & Paṭiccasamuppāda',
    author: 'Đức Phật Gotama',
    translator: 'Ban Biên Tập Nhập Lưu',
    summary: 'Hai trụ cột lý thuyết của Phật giáo: Bốn Sự Thật Cao Quý mà Đức Phật tuyên thuyết trong bài pháp đầu tiên, và Lý Duyên Khởi giải thích cơ chế vận hành của khổ đau và giải thoát. Đây là nền tảng không thể thiếu cho mọi hành giả.',
    themes: ['Tứ Diệu Đế', 'Duyên Khởi', 'Nền tảng', 'Cốt lõi', 'Lý thuyết'],
    difficulty: 'intermediate',
    type: 'discourse',
}

const tuDieuDe: TeachingWithChapters = {
    ...tuDieuDeMeta,
    chapters: [
        chap00,
        chap01,
        chap02,
        chap03,
        chap04,
        chap05
    ]
}

export default tuDieuDe
