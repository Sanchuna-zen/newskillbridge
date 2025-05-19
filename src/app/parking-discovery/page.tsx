
import { fetchParkingData } from '@/utils/parking-data'
import ParkingCard from '@/components/ui/card'

export const metadata = {
  title: 'Parking Discovery',
  description: 'Find real-time parking availability and guidance in your area.',
}

export default async function ParkingDiscoveryPage() {
  const parkingData = await fetchParkingData()

  return (
    <main className="container mx-auto py-8 px-2 md:px-0">
      <h1 className="text-3xl font-extrabold mb-6 text-gray-900 dark:text-white tracking-tight">
        Discover Parking Near You
      </h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {parkingData.length > 0 ? (
          parkingData.map((data, idx) => (
            <ParkingCard
              key={data.id || idx}
              data={data}
              dataFreshness={{
                age: data.freshness?.age,
                source: data.freshness?.source,
                reliability: data.freshness?.reliability,
                lastUpdated: data.freshness?.lastUpdated,
              }}
            />
          ))
        ) : (
          <div className="col-span-full text-gray-500 text-center py-8">
            No parking data currently available.
          </div>
        )}
      </div>
    </main>
  )
}
