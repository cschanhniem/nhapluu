import type { Teaching } from '../../../types'
import tongQuan from './00-tong-quan'
import bonDuongAc from './01-bon-duong-ac'
import coiNguoiTroi from './02-coi-nguoi-troi'
import phamThien from './03-pham-thien'
import suNguyHiem from './04-su-nguy-hiem'
import loiThoatDuyNhat from './05-loi-thoat-duy-nhat'

export const tamGioiVuTruQuan: Teaching = {
    id: 'tam-gioi-vu-tru-quan',
    title: 'Tam Giới & Vũ Trụ Quan (Cosmology)',
    summary: 'Bản đồ toàn cảnh về "Nhà tù" Luân Hồi. Khám phá 31 cõi sống, từ Địa ngục tăm tối đến các cõi Phạm Thiên rực rỡ, để thấy rõ sự nguy hiểm và khởi tâm khẩn trương thoát ly.',
    author: 'Pa-Auk Sayadaw',
    type: 'foundation',
    themes: ['vũ trụ quan', 'luân hồi', '31 cõi', 'địa ngục', 'thiên đàng'],
    difficulty: 'intermediate',
    chapters: [
        tongQuan,
        bonDuongAc,
        coiNguoiTroi,
        phamThien,
        suNguyHiem,
        loiThoatDuyNhat
    ]
}

export default tamGioiVuTruQuan
