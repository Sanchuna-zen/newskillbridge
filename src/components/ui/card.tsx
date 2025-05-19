
import * as React from "react"
import { cn } from "@/lib/utils"

interface DataFreshness {
  age?: string
  source?: string
  reliability?: number
  lastUpdated?: string
}

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  data?: any
  dataFreshness?: DataFreshness
  children?: React.ReactNode
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, data, dataFreshness, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-800 group transition-all",
        className
      )}
      {...props}
    >
      {data && (
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-bold text-lg text-gray-900 dark:text-white truncate">{data.location}</h2>
            <span className="text-xs px-2 py-1 rounded bg-blue-100 dark:bg-blue-800/50 text-blue-700 dark:text-blue-200">
              {data.type ?? 'Parking'}
            </span>
          </div>
          <div className="flex items-baseline gap-2 mt-1 mb-3">
            <span className="text-2xl font-bold text-green-600 dark:text-green-400">{data.available}</span>
            <span className="text-base text-gray-500 dark:text-gray-400">/ {data.capacity} spots</span>
          </div>
        </div>
      )}
      {children}
      {dataFreshness && (
        <div className="border-t px-4 py-2 bg-gray-50 dark:bg-gray-800 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <span>
            <span className="inline-block align-middle mr-1">
              {dataFreshness.source === "CCTV" && (
                <svg className="inline h-4 w-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20"><path d="M2.5 8.5A2.5 2.5 0 015 6h10a2.5 2.5 0 012.5 2.5v3a2.5 2.5 0 01-2.5 2.5H5A2.5 2.5 0 012.5 11.5v-3z"/><path d="M4 14.5A1.5 1.5 0 005.5 16h9a1.5 1.5 0 001.5-1.5V13H4v1.5z"/></svg>
              )}
              {dataFreshness.source === "Manual" && (
                <svg className="inline h-4 w-4 text-yellow-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M9 17v2a2 2 0 002 2h2a2 2 0 002-2v-2"/><path d="M7 9V7a5 5 0 0110 0v2"/><rect width="20" height="8" x="2" y="9" rx="2"/><path d="M5 17h14"/></svg>
              )}
              {dataFreshness.source === "Hybrid" && (
                <svg className="inline h-4 w-4 text-purple-500" fill="currentColor" viewBox="0 0 20 20"><circle cx="10" cy="10" r="8"/><path d="M6 10h8M10 6v8" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
              )}
            </span>
            <span>{dataFreshness.source ?? 'Unknown'}</span>
          </span>
          <span>
            {dataFreshness.age && (
              <>
                <span>{dataFreshness.age}</span>
                <span className="mx-1">•</span>
              </>
            )}
            <span>
              Reliability:{' '}
              <span className={
                dataFreshness.reliability && dataFreshness.reliability >= 0.9
                  ? "text-green-600 dark:text-green-400"
                  : dataFreshness.reliability && dataFreshness.reliability < 0.8
                  ? "text-yellow-600 dark:text-yellow-400"
                  : "text-gray-500 dark:text-gray-400"
              }>
                {typeof dataFreshness.reliability === "number"
                  ? (dataFreshness.reliability * 100).toFixed(0) + '%'
                  : 'N/A'}
              </span>
            </span>
          </span>
        </div>
      )}
    </div>
  )
)
Card.displayName = "Card"
export default Card
