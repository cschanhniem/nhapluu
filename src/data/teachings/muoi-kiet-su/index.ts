import type { Teaching } from '@/types'
import tongQuan from './00-tong-quan'
import haPhan from './01-ha-phan'
import thuongPhan from './02-thuong-phan'
import doanTru from './03-doan-tru'
import bonQua from './04-bon-qua'

export const muoiKietSu: Teaching = {
    id: 'muoi-kiet-su',
    title: 'Mười Kiết Sử (Saṃyojana)',
    summary: 'Hiểu rõ 10 xiềng xích trói buộc chúng sinh trong luân hồi. Tu-đà-hoàn đoạn 3 đầu, A-la-hán đoạn tất cả. Bản đồ chi tiết để đánh giá tiến bộ.',
    author: 'Truyền thống Theravāda',
    type: 'foundation',
    themes: ['kiết sử', 'phiền não', 'tu đà hoàn', 'a la hán', 'giải thoát'],
    difficulty: 'intermediate',
    chapters: [
        tongQuan,
        haPhan,
        thuongPhan,
        doanTru,
        bonQua
    ]
}

export default muoiKietSu
