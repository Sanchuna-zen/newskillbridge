
import { fetchParkingData as fetchFromSupabase } from '@/utils/supabase/server'

type ParkingDataSource = 'CCTV' | 'Manual' | 'Hybrid'

export interface ParkingSpot {
  id: string
  location: string
  available: number
  capacity: number
  type: string
  // Data transparency indicators
  freshness: {
    age: string      // e.g. "2 min ago"
    source: ParkingDataSource
    reliability: number // 0-1
    lastUpdated: string // ISO date
  }
  [key: string]: any
}

function normalizeData(data: any[]): ParkingSpot[] {
  // Normalize and enrich parking data for UI & transparency
  return data.map((item) => {
    // Example normalization - production logic should be more robust
    const lastUpdated = item.last_updated || item.updated_at || new Date().toISOString()
    const ageMs = Date.now() - new Date(lastUpdated).getTime()
    const ageMinutes = Math.floor(ageMs / 60000)
    let reliability = 0.7
    let source: ParkingDataSource = 'Manual'
    if (item.source === 'CCTV') {
      reliability = 0.95
      source = 'CCTV'
    }
    if (item.source === 'Manual') {
      reliability = 0.7
      source = 'Manual'
    }
    if (item.source === 'Hybrid') {
      reliability = 0.85
      source = 'Hybrid'
    }
    return {
      id: item.id?.toString() ?? Math.random().toString(36).slice(2,10),
      location: item.location ?? item.name ?? 'Unknown',
      available: Number(item.available ?? item.free ?? 0),
      capacity: Number(item.capacity ?? item.total ?? 0),
      type: item.type ?? 'General',
      freshness: {
        age: ageMinutes === 0 ? 'Just now' : `${ageMinutes} min ago`,
        source,
        reliability,
        lastUpdated,
      },
      ...item,
    }
  })
}

// Simulated fetches for demonstration. Replace with real data sources.
async function fetchCCTVData(): Promise<any[]> {
  // e.g., fetch from Supabase CCTV table or external API
  // Here we mock data:
  return [
    {
      id: 'cctv-1',
      location: 'Downtown Garage',
      available: 12,
      capacity: 50,
      type: 'Garage',
      source: 'CCTV',
      last_updated: new Date(Date.now() - 1000 * 60 * 2).toISOString(),
    },
  ]
}

async function fetchManualData(): Promise<any[]> {
  return [
    {
      id: 'manual-1',
      location: 'Market Lot',
      available: 7,
      capacity: 30,
      type: 'Open Lot',
      source: 'Manual',
      last_updated: new Date(Date.now() - 1000 * 60 * 8).toISOString(),
    },
  ]
}

export async function fetchParkingData(): Promise<ParkingSpot[]> {
  // Replace these with real aggregation logic:
  const CCTVData = await fetchCCTVData()
  const manualData = await fetchManualData()
  // Optionally, aggregate from Supabase as well
  // const supabaseData = await fetchFromSupabase()
  return normalizeData([...CCTVData, ...manualData])
}
