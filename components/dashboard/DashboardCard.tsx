import Image from 'next/image'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/Card'

interface DashboardCardProps {
  title: string
  value: string
  icon: string
  color?: 'blue' | 'green' | 'purple' | 'orange'
  iconIsUrl?: boolean
}

const colorStyles = {
  blue: 'from-blue-500 to-blue-600',
  green: 'from-green-500 to-green-600',
  purple: 'from-purple-500 to-purple-600',
  orange: 'from-orange-500 to-orange-600',
}

export function DashboardCard({ title, value, icon, color = 'blue', iconIsUrl = false }: DashboardCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className={`bg-gradient-to-r ${colorStyles[color]} p-6 text-white`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-sm font-medium mb-1">{title}</p>
              <p className="text-2xl font-bold">{value}</p>
            </div>
            <div className="opacity-80">
              {iconIsUrl ? (
                <Image
                  src={icon}
                  alt={title}
                  width={48}
                  height={48}
                  className="rounded-lg object-cover"
                />
              ) : (
                <div className="text-3xl">{icon}</div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}