import type { Teaching } from '@/types'
import tongQuan from './00-tong-quan'
import loTrinh1Trang from './01-lo-trinh-1-trang'
import hoTriCan from './02-ho-tri-can'
import doiTriTrienCai from './03-doi-tri-trien-cai'

export const loTrinhDuLuu: Teaching = {
    id: 'lo-trinh-du-luu',
    title: 'Lộ Trình Dự Lưu Thực Hành',
    summary: 'Bản đồ 1 trang và các thực hành cốt lõi để tiến đến Dự Lưu: hộ trì căn, tiết độ ăn, tỉnh thức và đối trị triền cái.',
    author: 'Tổng hợp theo kinh',
    type: 'guide',
    themes: ['dự lưu', 'thực hành', 'bát chánh đạo', 'triền cái', 'chánh niệm'],
    difficulty: 'intermediate',
    chapters: [
        tongQuan,
        loTrinh1Trang,
        hoTriCan,
        doiTriTrienCai
    ]
}

export default loTrinhDuLuu
