import type { Teaching } from '../../../types'
import tongQuan from './00-tong-quan'
import nhomHaiBa from './01-nhom-hai-ba'
import nhomBonNam from './02-nhom-bon-nam'
import nhomSauBayTam from './03-nhom-sau-bay-tam'
import muoiHaiNhanDuyen from './04-muoi-hai-nhan-duyen'
import tuDienPali from './05-tu-dien-pali'

export const khoTangPhapSo: Teaching = {
    id: 'kho-tang-phap-so',
    title: 'Kho Tàng Pháp Số & Thuật Ngữ',
    summary: 'Ma trận kiến thức của bậc Thánh. Hệ thống hóa toàn bộ giáo lý qua các con số (từ Nhị pháp đến Bát pháp và 12 Nhân duyên) cùng từ điển Pāli cốt lõi.',
    author: 'Tổng Hợp (Anguttara Nikaya)',
    type: 'foundation',
    themes: ['pháp số', 'thuật ngữ', 'cấu trúc', 'hệ thống', 'anguttara', 'pali'],
    difficulty: 'intermediate',
    chapters: [
        tongQuan,
        nhomHaiBa,
        nhomBonNam,
        nhomSauBayTam,
        muoiHaiNhanDuyen,
        tuDienPali
    ]
}

export default khoTangPhapSo
