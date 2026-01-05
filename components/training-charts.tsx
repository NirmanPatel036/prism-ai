"use client"

import { useEffect, useState, useMemo } from "react"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js"
import { Line } from "react-chartjs-2"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const steps = Array.from({ length: 61 }, (_, i) => i)

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top" as const,
      labels: {
        color: "rgba(255, 255, 255, 0.6)",
        font: { family: "var(--font-mono)", size: 10 },
        boxWidth: 10,
      },
    },
    title: { display: false },
  },
  scales: {
    x: {
      grid: { color: "rgba(255, 255, 255, 0.05)" },
      ticks: { color: "rgba(255, 255, 255, 0.4)", font: { size: 10 } },
    },
    y: {
      grid: { color: "rgba(255, 255, 255, 0.05)" },
      ticks: { color: "rgba(255, 255, 255, 0.4)", font: { size: 10 } },
    },
  },
}

const colors = {
  blue: "rgb(59, 130, 246)",
  red: "rgb(239, 68, 68)",
  purple: "rgb(168, 85, 247)",
  green: "rgb(34, 197, 94)",
}

export function TrainingCharts() {
  const [isRegistered, setIsRegistered] = useState(false)

  useEffect(() => {
    ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler)
    setIsRegistered(true)
  }, [])

  // Memoize data to prevent re-renders with random values
  const lossData = useMemo(() => ({
    labels: steps,
    datasets: [
      {
        label: "exalted-pine-1",
        data: steps.map((s) => 2.5 * Math.exp(-s / 20) + Math.random() * 0.3 + 0.8),
        borderColor: colors.blue,
        borderWidth: 1.5,
        pointRadius: 0,
      },
      {
        label: "hearty-monkey-2",
        data: steps.map((s) => 2.4 * Math.exp(-s / 22) + Math.random() * 0.4 + 0.9),
        borderColor: colors.red,
        borderWidth: 1.5,
        pointRadius: 0,
      },
    ],
  }), [])

  const lrData = useMemo(() => ({
    labels: steps,
    datasets: [
      {
        label: "learning_rate",
        data: steps.map((s) => (s < 7 ? (s / 7) * 0.0002 : 0.0002 * Math.exp(-(s - 7) / 25))),
        borderColor: colors.blue,
        borderWidth: 2,
        pointRadius: 0,
        fill: true,
        backgroundColor: "rgba(59, 130, 246, 0.1)",
      },
    ],
  }), [])

  if (!isRegistered) {
    return <div className="h-48" />
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 max-w-7xl mx-auto">
      <ChartCard title="train/loss" data={lossData} />
      <ChartCard title="train/learning_rate" data={lrData} />
      <ChartCard
        title="train/grad_norm"
        data={{
          labels: steps,
          datasets: [
            {
              label: "grad_norm",
              data: steps.map((s) => (s === 10 ? 3.1 : 1 + Math.random() * 0.5)),
              borderColor: colors.blue,
              borderWidth: 1.5,
              pointRadius: 0,
            },
          ],
        }}
      />
      <ChartCard
        title="train/epoch"
        data={{
          labels: steps,
          datasets: [
            {
              label: "epoch",
              data: steps.map((s) => (s / 60) * 0.6),
              borderColor: colors.blue,
              borderWidth: 2,
              pointRadius: 0,
            },
          ],
        }}
      />
      <ChartCard
        title="train/global_step"
        data={{
          labels: steps,
          datasets: [
            {
              label: "global_step",
              data: steps.map((s) => s),
              borderColor: colors.blue,
              borderWidth: 2,
              pointRadius: 0,
            },
          ],
        }}
      />
    </div>
  )
}

function ChartCard({ title, data }: { title: string; data: any }) {
  return (
    <Card className="bg-background/50 border-border/50 backdrop-blur-sm overflow-hidden">
      <CardHeader className="py-4">
        <CardTitle className="text-xs font-mono uppercase tracking-widest text-foreground/50">{title}</CardTitle>
      </CardHeader>
      <CardContent className="h-48">
        <Line options={chartOptions} data={data} />
      </CardContent>
    </Card>
  )
}
