import tienTrinhMinhSat from './tien-trinh-minh-sat'
import conDuongMahasi from './con-duong-mahasi'
import huongDanNhapThat from './huong-dan-nhap-that'
import baMuoiBayPham from './37-pham-tro-dao'
import viDieuPhap from './vi-dieu-phap-ung-dung'
import tuDieuDe from './tu-dieu-de-duyen-khoi'
import tuVoLuong from './tu-vo-luong-tam'
import nhanQuaLuanHoi from './nhan-qua-luan-hoi'

export const teachings = [
    nhanQuaLuanHoi,   // Foundation (The Why - Mundane Right View)
    tuDieuDe,         // Foundation (The What - Four Noble Truths)
    tuVoLuong,        // Heart (Metta/Karuna)
    baMuoiBayPham,    // Analysis (37 Factors)
    viDieuPhap,       // Deep Dive (Abhidhamma)
    tienTrinhMinhSat, // Classic Map (16 Nanas)
    conDuongMahasi,   // Practical Guide
    huongDanNhapThat, // Intensive Practice
]

export {
    tienTrinhMinhSat,
    conDuongMahasi,
    huongDanNhapThat,
    baMuoiBayPham,
    viDieuPhap,
    tuDieuDe,
    tuVoLuong,
    nhanQuaLuanHoi
}
