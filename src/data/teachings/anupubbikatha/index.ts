import type { Teaching } from '@/types'
import tongQuan from './00-tong-quan'
import boDan from './01-bo-dan'
import traiNghiem from './02-trai-nghiem'
import tuDe from './03-tu-de'
import apDung from './04-ap-dung'

export const anupubbikatha: Teaching = {
    id: 'anupubbikatha',
    title: 'Anupubbikathā - Pháp Tuần Tự',
    summary: 'Phương pháp giảng dạy tuần tự của Đức Phật: Bố thí → Trì giới → Cõi trời → Nguy hiểm dục lạc → Lợi ích xuất ly → Tứ Diệu Đế. Con đường chuẩn bị tâm để đắc đạo.',
    author: 'Đức Phật Gotama',
    type: 'guide',
    themes: ['pháp tuần tự', 'bố thí', 'trì giới', 'tứ diệu đế', 'phương pháp giảng'],
    difficulty: 'beginner',
    chapters: [
        tongQuan,
        boDan,
        traiNghiem,
        tuDe,
        apDung
    ]
}

export default anupubbikatha
