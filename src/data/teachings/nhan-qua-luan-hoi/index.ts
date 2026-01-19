import type { Teaching } from '../../../types'
import tongQuan from './00-tong-quan'
import nguyenLyNghiep from './01-nguyen-ly-nghiep'
import taiSinh from './02-tai-sinh'
import phuocBau from './03-phuoc-bau'
import ngheThuatSong from './04-nghe-thuat-song'
import lamChuMenh from './05-lam-chu-menh'

export const nhanQuaLuanHoi: Teaching = {
    id: 'nhan-qua-luan-hoi',
    title: 'Luật Nhân Quả & Luân Hồi',
    summary: 'Nền tảng của Chánh Kiến hiệp thế. Hiểu rõ quy luật vận hành của Nghiệp và Tái Sinh để làm chủ vận mệnh.',
    author: 'Tổng Hợp',
    type: 'foundation',
    chapters: [
        tongQuan,
        nguyenLyNghiep,
        taiSinh,
        phuocBau,
        ngheThuatSong,
        lamChuMenh
    ],
    themes: ['nghiệp', 'luân hồi', 'tái sinh', 'chánh kiến', 'phước báu'],
    difficulty: 'beginner'
}

export default nhanQuaLuanHoi
