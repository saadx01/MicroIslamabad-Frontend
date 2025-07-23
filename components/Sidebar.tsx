"use client"

import { useState } from "react"
import { ChevronDown, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface SidebarProps {
  selectedSector?: string
  selectedCategory?: string
  onSectorChange?: (sector: string) => void
  onCategoryChange?: (category: string) => void
}

export default function Sidebar({ selectedSector, selectedCategory, onSectorChange, onCategoryChange }: SidebarProps) {
  const [expandedSectors, setExpandedSectors] = useState<string[]>(["F-Series"])

  const sectors = {
    "A-Series": {
      description: "Northernmost sectors — mostly restricted/Govt. areas",
      sectors: ["A-16", "A-17", "A-18"],
    },
    "B-Series": {
      description: "Somewhat planned but not fully developed",
      sectors: ["B-16", "B-17", "B-18"],
    },
    "C-Series": {
      description: "Central residential areas",
      sectors: ["C-15", "C-16", "C-17"],
    },
    "D-Series": {
      description: "Under Development or Institutional Areas",
      sectors: ["D-12", "D-13", "D-14", "D-15", "D-16"],
    },
    "E-Series": {
      description: "Elite residential areas",
      sectors: ["E-7", "E-8", "E-9", "E-10", "E-11"],
    },
    "F-Series": {
      description: "Central and upscale",
      sectors: ["F-5", "F-6", "F-7", "F-8", "F-9", "F-10", "F-11"],
    },
    "G-Series": {
      description: "Densely populated, residential + commercial",
      sectors: ["G-5", "G-6", "G-7", "G-8", "G-9", "G-10", "G-11", "G-12", "G-13", "G-14"],
    },
    "H-Series": {
      description: "Mostly institutional/educational",
      sectors: ["H-8", "H-9", "H-10", "H-11", "H-12"],
    },
    "I-Series": {
      description: "Affordable housing, mix of residential & institutions",
      sectors: ["I-8", "I-9", "I-10", "I-11", "I-12", "I-13", "I-14", "I-15", "I-16"],
    },
  }

  const categories = ["Restaurants", "Parks & Grounds", "Gyms & Pools", "Cafes & Desserts", "Activities & Events"]

  const toggleSector = (seriesName: string) => {
    setExpandedSectors((prev) =>
      prev.includes(seriesName) ? prev.filter((s) => s !== seriesName) : [...prev, seriesName],
    )
  }

  return (
    <div className="w-80 bg-white shadow-lg h-full overflow-y-auto">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Filters</h2>
        <p className="text-sm text-gray-600">Explore by sector and category</p>
      </div>

      {/* Categories Filter */}
      <div className="p-6 border-b border-gray-200">
        <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "ghost"}
              className={`w-full justify-start text-left h-auto py-2 px-3 ${
                selectedCategory === category ? "bg-blue-600 text-white" : "hover:bg-gray-100"
              }`}
              onClick={() => onCategoryChange?.(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Sectors Filter */}
      <div className="p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Sectors</h3>
        <div className="space-y-2">
          {Object.entries(sectors).map(([seriesName, seriesData]) => (
            <div key={seriesName}>
              <Button
                variant="ghost"
                className="w-full justify-between text-left h-auto py-2 px-3 hover:bg-gray-100"
                onClick={() => toggleSector(seriesName)}
              >
                <div>
                  <div className="font-medium">{seriesName}</div>
                  <div className="text-xs text-gray-500">{seriesData.description}</div>
                </div>
                {expandedSectors.includes(seriesName) ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </Button>

              {expandedSectors.includes(seriesName) && (
                <div className="ml-4 mt-2 space-y-1">
                  {seriesData.sectors.map((sector) => (
                    <Button
                      key={sector}
                      variant={selectedSector === sector ? "default" : "ghost"}
                      size="sm"
                      className={`w-full justify-start ${
                        selectedSector === sector ? "bg-green-600 text-white" : "hover:bg-gray-50"
                      }`}
                      onClick={() => onSectorChange?.(sector)}
                    >
                      {sector}
                      <Badge variant="outline" className="ml-auto text-xs">
                        {Math.floor(Math.random() * 20) + 1}
                      </Badge>
                    </Button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
