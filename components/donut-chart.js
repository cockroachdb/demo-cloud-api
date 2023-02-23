import React from 'react'
import PropTypes from 'prop-types'

const DonutChart = ({ states }) => {
  const getColor = (string) => {
    switch (string) {
      case 'CREATED':
        return 'var(--color-green-500)'

      case 'LOCKED':
        return 'var(--color-red-500)'

      default:
        return 'var(--color-gray-500)'
    }
  }

  const incrementAngle = 360 / states.length
  const colors = states.map((state) => `${getColor(state)}`)
  const angles = new Array(states.length).fill().map((_, index) => `${incrementAngle * index}deg`)

  const total_value = states.reduce((a, b) => a + 1, 0)
  const convertToPercent = (num) => Math.round((num / total_value) * 100)
  const convertToDegrees = (num) => Math.round((num / 100) * 360)

  const css_string = states
    .map((state) => {
      return {
        name: state,
        value: 1
      }
    })
    .reduce((items, item, index, array) => {
      items.push(item)

      item.count = item.count || 0
      item.count += array[index - 1]?.count || item.count
      item.start_value = array[index - 1]?.count ? array[index - 1].count : 0
      item.end_value = item.count += item.value
      item.start_percent = convertToPercent(item.start_value)
      item.end_percent = convertToPercent(item.end_value)
      item.start_degrees = convertToDegrees(item.start_percent)
      item.end_degrees = convertToDegrees(item.end_percent)

      return items
    }, [])
    .map((chart, index) => {
      const { start_degrees, end_degrees } = chart
      return ` ${colors[index]} ${start_degrees}deg ${end_degrees}deg`
    })
    .join()

  return (
    <div className="relative flex-1 mx-auto">
      <div className="absolute flex items-center justify-center rounded-full bg-brand-narwhal-grey w-4/6 h-4/6 top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2">
        <div className="mb-3 leading-none">
          <strong className="block font-black text-2xl text-center text-brand-starfleet-blue">State</strong>
          <small className="flex gap-2 items-center text-xxs text-center text-brand-light">
            <span className="relative h-2 w-2">
              <span className="absolute w-full h-full rounded-full bg-brand-starfleet-blue motion-safe:animate-ping "></span>
              <span className="absolute w-full h-full rounded-full bg-brand-starfleet-blue"></span>
            </span>
            /api/v1/clusters
          </small>
        </div>
      </div>
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full rounded-full">
        <defs>
          <linearGradient id="divider" x1="0" x2="0" y1="0" y2="1">
            <stop
              offset="0%"
              className="[--start-color:var(--color-brand-narwhal-gray)]"
              stopColor="var(--start-color)"
            />
            <stop offset="20%" className="[--mid-color:var(--color-brand-narwhal-gray)]" stopColor="var(--mid-color)" />
            <stop offset="21%" className="[--end-color:var(--color-transparent)]" stopColor="var(--end-color)" />
            <stop offset="100%" className="[--end-color:var(--color-transparent)]" stopColor="var(--end-color)" />
          </linearGradient>
        </defs>

        <clipPath id="hole">
          <path d="M 50 0 a 50 50 0 0 1 0 100 50 50 0 0 1 0 -100 v 18 a 2 2 0 0 0 0 64 2 2 0 0 0 0 -64" />
        </clipPath>
        <foreignObject x="0" y="0" width="100" height="100" clipPath="url(#hole)">
          <div
            xmlns="http://www.w3.org/1999/xhtml"
            className="w-full h-full"
            style={{
              background: `conic-gradient(${css_string})`
            }}
          />
        </foreignObject>
        {states.map((_, index) => {
          return (
            <rect
              key={index}
              width="2"
              height="100"
              x="50%"
              fill="url(#divider)"
              style={{
                transformBox: 'fill-box',
                transformOrigin: 'center',
                transform: `translateX(-1px) rotate(${angles[index]})`
              }}
            />
          )
        })}
      </svg>
    </div>
  )
}

DonutChart.propTypes = {
  /** Trimmed string of types of state from /api/v1/clusters */
  states: PropTypes.arrayOf(PropTypes.oneOf(['UNSPECIFIED', 'CREATED', 'LOCKED'])).isRequired
}

export default DonutChart
