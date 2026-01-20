import type { Teaching } from '@/types'
import tongQuan from './00-tong-quan'
import bonYeuTo from './01-bon-yeu-to'
import dauHieu from './02-dau-hieu'
import chuyen from './03-chuyen-ke'
import loiKhuyen from './04-loi-khuyen'

export const sotapattiSamyutta: Teaching = {
    id: 'sotapatti-samyutta',
    title: 'Sotāpatti Saṃyutta - Kinh Điển Về Dự Lưu',
    summary: 'Tuyển tập các bài kinh từ Tương Ưng Bộ (SN 55) về quả Dự Lưu. Lời Phật trực tiếp về 4 yếu tố, dấu hiệu, và câu chuyện các bậc Thánh đắc quả.',
    author: 'Đức Phật Gotama',
    type: 'discourse',
    themes: ['dự lưu', 'tu đà hoàn', 'kinh điển', 'SN 55', 'đạo quả'],
    difficulty: 'intermediate',
    chapters: [
        tongQuan,
        bonYeuTo,
        dauHieu,
        chuyen,
        loiKhuyen
    ]
}

export default sotapattiSamyutta
