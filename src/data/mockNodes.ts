import type { PracticeNode, StreamLeader } from '@/types/leader'

/**
 * Mock Stream Leaders for development
 */
export const mockLeaders: StreamLeader[] = [
    {
        id: 'leader-1',
        name: 'Minh Tuệ',
        isVerified: true,
        nodeId: 'node-taodan',
        joinedDate: new Date('2025-06-01'),
        badge: 'gold'
    },
    {
        id: 'leader-2',
        name: 'Thanh Tâm',
        isVerified: true,
        nodeId: 'node-giaven',
        joinedDate: new Date('2025-08-15'),
        badge: 'silver'
    },
    {
        id: 'leader-3',
        name: 'Thiện Hạnh',
        isVerified: true,
        nodeId: 'node-leloi',
        joinedDate: new Date('2025-10-01'),
        badge: 'bronze'
    },
    {
        id: 'leader-4',
        name: 'Quang Minh',
        isVerified: false,
        nodeId: 'node-hoabinh',
        joinedDate: new Date('2025-12-01'),
        badge: 'bronze'
    }
]

/**
 * Mock Practice Nodes - "Thiền đường xanh" tại các công viên TP.HCM
 */
export const mockNodes: PracticeNode[] = [
    {
        id: 'node-taodan',
        name: 'Công viên Tao Đàn - Góc Sáng',
        address: 'Góc đường Trương Định & Nguyễn Thị Minh Khai, Q.1',
        city: 'TP. Hồ Chí Minh',
        lat: 10.7769,
        lng: 106.6895,
        schedule: '5:30 AM - 6:30 AM (Thứ 2-7)',
        leader: mockLeaders[0],
        memberCount: 28,
        isActive: true,
        createdAt: new Date('2025-06-01')
    },
    {
        id: 'node-giaven',
        name: 'Công viên Gia Định - Bãi cỏ Nam',
        address: 'Góc Hoàng Minh Giám & Phan Đăng Lưu, Q.Bình Thạnh',
        city: 'TP. Hồ Chí Minh',
        lat: 10.8014,
        lng: 106.6885,
        schedule: '5:30 AM - 6:30 AM (Hàng ngày)',
        leader: mockLeaders[1],
        memberCount: 15,
        isActive: true,
        createdAt: new Date('2025-08-15')
    },
    {
        id: 'node-leloi',
        name: 'Công viên Lê Lợi - Góc yên tĩnh',
        address: 'Gần cổng số 2, Q.1',
        city: 'TP. Hồ Chí Minh',
        lat: 10.7744,
        lng: 106.7001,
        schedule: '5:45 AM - 6:45 AM (Thứ 2, 4, 6)',
        leader: mockLeaders[2],
        memberCount: 12,
        isActive: true,
        createdAt: new Date('2025-10-01')
    },
    {
        id: 'node-hoabinh',
        name: 'Công viên Hòa Bình - Khu vực Hồ',
        address: 'Đường Võ Văn Kiệt, Q.5',
        city: 'TP. Hồ Chí Minh',
        lat: 10.7510,
        lng: 106.6600,
        schedule: '6:00 AM - 7:00 AM (Cuối tuần)',
        leader: mockLeaders[3],
        memberCount: 8,
        isActive: true,
        createdAt: new Date('2025-12-01')
    },
    {
        id: 'node-23thang9',
        name: 'Công viên 23/9 - Bãi cỏ lớn',
        address: 'Gần đài phun nước, Q.1',
        city: 'TP. Hồ Chí Minh',
        lat: 10.7729,
        lng: 106.6911,
        schedule: '5:30 AM - 6:30 AM (Chủ nhật)',
        leader: null,  // Looking for a leader
        memberCount: 5,
        isActive: false,  // Not yet operational
        createdAt: new Date('2026-01-01')
    }
]

/**
 * Get nodes near a location (simple distance calculation)
 */
export function getNodesNearby(lat: number, lng: number, maxDistanceKm: number = 10): PracticeNode[] {
    return mockNodes
        .filter(node => {
            const distance = getDistance(lat, lng, node.lat, node.lng)
            return distance <= maxDistanceKm && node.isActive
        })
        .sort((a, b) => {
            const distA = getDistance(lat, lng, a.lat, a.lng)
            const distB = getDistance(lat, lng, b.lat, b.lng)
            return distA - distB
        })
}

/**
 * Simple Haversine distance calculation in km
 */
function getDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371 // Earth's radius in km
    const dLat = toRad(lat2 - lat1)
    const dLon = toRad(lon2 - lon1)
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
}

function toRad(deg: number): number {
    return deg * (Math.PI / 180)
}

/**
 * Format distance for display
 */
export function formatDistance(lat1: number, lon1: number, lat2: number, lon2: number): string {
    const km = getDistance(lat1, lon1, lat2, lon2)
    if (km < 1) {
        return `${Math.round(km * 1000)} m`
    }
    return `${km.toFixed(1)} km`
}
