import tienTrinhMinhSat from './tien-trinh-minh-sat'
import conDuongMahasi from './con-duong-mahasi'
import huongDanNhapThat from './huong-dan-nhap-that'
import baMuoiBayPham from './37-pham-tro-dao'
import viDieuPhap from './vi-dieu-phap-ung-dung'
import tuDieuDe from './tu-dieu-de-duyen-khoi'

export const teachings = [
    tuDieuDe,        // Foundational Theory (most important first)
    baMuoiBayPham,   // Canonical Framework
    viDieuPhap,      // Applied Abhidhamma
    conDuongMahasi,  // Practical Guide
    huongDanNhapThat,// Retreat Guide
    tienTrinhMinhSat,// Detailed 16 Nanas (Mahasi Classic)
]

export {
    tienTrinhMinhSat,
    conDuongMahasi,
    huongDanNhapThat,
    baMuoiBayPham,
    viDieuPhap,
    tuDieuDe
}
