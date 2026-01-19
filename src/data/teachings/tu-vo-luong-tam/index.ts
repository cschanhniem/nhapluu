import type { TeachingWithChapters } from '../tien-trinh-minh-sat/index'
import chap00 from './00-tong-quan'
import chap01 from './01-tu-metta'
import chap02 from './02-bi-karuna'
import chap03 from './03-hy-mudita'
import chap04 from './04-xa-upekkha'
import chap05 from './05-thuc-hanh'

export const tuVoLuongMeta: Omit<TeachingWithChapters, 'chapters'> = {
    id: 'tu-vo-luong-tam',
    title: 'Tứ Vô Lượng Tâm',
    titlePali: 'Brahmavihāra',
    author: 'Đức Phật Gotama',
    translator: 'Ban Biên Tập Nhập Lưu',
    summary: 'Bốn trạng thái tâm cao thượng: Từ, Bi, Hỷ, Xả. Đây là chiều kích "trái tim" của Phật giáo, bổ sung cho chiều kích "trí tuệ" của Thiền Minh Sát. Thiền Từ Bi giúp chữa lành tâm hồn và là nền tảng vững chắc cho sự giải thoát.',
    themes: ['Từ Bi', 'Metta', 'Thiền Định', 'Chữa lành', 'Tâm linh'],
    difficulty: 'beginner',
    type: 'guide',
}

const tuVoLuong: TeachingWithChapters = {
    ...tuVoLuongMeta,
    chapters: [
        chap00,
        chap01,
        chap02,
        chap03,
        chap04,
        chap05
    ]
}

export default tuVoLuong
