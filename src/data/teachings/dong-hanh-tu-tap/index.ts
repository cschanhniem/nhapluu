import type { Teaching } from '@/types'
import tongQuan from './00-tong-quan'
import choNguoiThan from './01-cho-nguoi-than'
import loTrinhDongHanh from './02-lo-trinh-dong-hanh'
import gioiHan from './03-gioi-han'

export const dongHanhTuTap: Teaching = {
    id: 'dong-hanh-tu-tap',
    title: 'Đồng Hành Tu Tập',
    summary: 'Gợi ý thực tế giúp con cái, vợ chồng, cha mẹ, bạn bè, đồng nghiệp cùng tu tập hướng đến Dự Lưu mà không ép buộc.',
    author: 'Tổng hợp theo kinh',
    type: 'practical',
    themes: ['đồng hành', 'gia đình', 'bạn bè', 'dự lưu', 'thực hành'],
    difficulty: 'beginner',
    chapters: [
        tongQuan,
        choNguoiThan,
        loTrinhDongHanh,
        gioiHan
    ]
}

export default dongHanhTuTap
