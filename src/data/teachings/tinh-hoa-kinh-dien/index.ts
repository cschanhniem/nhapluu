import type { Teaching } from '../../../types'
import tongQuan from './00-tong-quan'
import kinhPhapCu from './01-kinh-phap-cu'
import kinhKalama from './02-kinh-kalama'
import kinhSigalovada from './03-kinh-sigalovada'
import kinhMangala from './04-kinh-mangala'
import kinhVoNgaTuong from './05-kinh-vo-nga-tuong'

export const tinhHoaKinhDien: Teaching = {
    id: 'tinh-hoa-kinh-dien',
    title: 'Tinh Hoa Kinh Điển (Sutta Essence)',
    summary: 'Lời vàng trực tiếp từ Đức Phật (Buddhavacana). Tuyển tập những bài kinh căn bản nhất cho người cư sĩ: từ nghệ thuật sống (Pháp Cú, Hạnh Phúc) đến đạo đức (Thi-ca-la-việt) và tư duy tự do (Kalama).',
    author: 'Đức Phật Gotama',
    type: 'foundation',
    themes: ['kinh điển', 'nguyên thủy', 'đạo đức', 'hạnh phúc', 'tự do tư tưởng'],
    difficulty: 'beginner',
    chapters: [
        tongQuan,
        kinhPhapCu,
        kinhKalama,
        kinhSigalovada,
        kinhMangala,
        kinhVoNgaTuong
    ]
}

export default tinhHoaKinhDien
