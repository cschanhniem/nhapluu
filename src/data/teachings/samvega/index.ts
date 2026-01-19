import type { Teaching } from '@/types'
import tongQuan from './00-tong-quan'
import nguonGoc from './01-nguon-goc'
import phatTrien from './02-phat-trien'
import giuGin from './03-giu-gin'
import canBang from './04-can-bang'

export const samvega: Teaching = {
    id: 'samvega',
    title: 'Saṃvega - Tâm Chấn Động Tâm Linh',
    summary: 'Cảm giác khẩn cấp tâm linh khi thấy rõ nguy hiểm của luân hồi. Không có Saṃvega, tu tập lười nhác. Đây là nhiên liệu đốt cháy phiền não.',
    author: 'Truyền thống Theravāda',
    type: 'foundation',
    themes: ['samvega', 'khẩn cấp', 'động lực', 'luân hồi', 'tu tập'],
    difficulty: 'intermediate',
    chapters: [
        tongQuan,
        nguonGoc,
        phatTrien,
        giuGin,
        canBang
    ]
}

export default samvega
