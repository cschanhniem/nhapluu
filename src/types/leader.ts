/**
 * Stream Leader - Người dẫn dắt các buổi thực hành tại công viên
 * Leaders được xác minh (KYC) và cấp quyền tổ chức nhóm
 */
export interface StreamLeader {
    id: string
    name: string
    isVerified: boolean    // KYC verified through app
    nodeId: string         // Primary practice node they lead
    joinedDate: Date
    badge: 'bronze' | 'silver' | 'gold'  // Based on experience/contribution
    phone?: string         // Contact (hidden from public)
}

/**
 * Practice Node - Điểm tập tại công viên
 * Các "Thiền đường xanh" nơi cộng đồng thực hành offline
 */
export interface PracticeNode {
    id: string
    name: string           // "Công viên Tao Đàn - Góc Sáng"
    address: string        // Full address for directions
    city: string           // For filtering
    lat: number
    lng: number
    schedule: string       // "5:30 AM - 6:30 AM hàng ngày"
    leader: StreamLeader | null
    memberCount: number
    isActive: boolean      // Node is currently operational
    createdAt: Date
}

/**
 * Check-in record for gamification
 */
export interface CheckIn {
    id: string
    userId: string
    nodeId: string | null  // null = solo practice at home
    date: Date
    type: 'node' | 'solo'  // At a node or solo practice
    duration: number       // Minutes
}

/**
 * User points and achievement tracking
 */
export interface UserPoints {
    totalPoints: number
    checkIns: number
    currentStreak: number
    longestStreak: number
    badges: string[]
}
