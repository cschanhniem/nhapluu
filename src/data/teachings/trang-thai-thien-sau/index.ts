import type { Teaching } from '@/types'
import tongQuan from './00-tong-quan'
import nirodha from './01-nirodha-samapatti'
import anupada from './02-anupada-samadhi'
import phalasamapatti from './03-phala-samapatti'
import banDoThucHanh from './04-ban-do-thuc-hanh'

export const trangThaiThienSau: Teaching = {
    id: 'trang-thai-thien-sau',
    title: 'Trạng Thái Thiền Sâu',
    summary: 'Các trạng thái thiền định cao cấp: Diệt Thọ Tưởng Định (Nirodha), Anupada Samādhi, và Quả Định (Phala). Bản đồ thực hành nội bộ của các dòng thiền.',
    author: 'Truyền thống Theravāda',
    type: 'manual',
    themes: ['thiền định', 'nirodha', 'anupada', 'quả định', 'bản đồ thiền'],
    difficulty: 'advanced',
    chapters: [
        tongQuan,
        nirodha,
        anupada,
        phalasamapatti,
        banDoThucHanh
    ]
}

export default trangThaiThienSau
