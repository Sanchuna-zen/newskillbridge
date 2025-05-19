
import { NextResponse } from 'next/server'
import { fetchParkingData } from '@/utils/parking-data'

export async function GET() {
  const parkingData = await fetchParkingData()
  return NextResponse.json(parkingData)
}
