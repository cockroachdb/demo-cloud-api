import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

const Particles = ({ className }) => {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) return null

  const getRandomNumber = (min, max) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  const particleArray = [...Array(20).keys()].map(() => {
    return {
      x: getRandomNumber(20, 600),
      y: getRandomNumber(300, 100),
      r: getRandomNumber(1, 5),
      duration: getRandomNumber(5, 10),
      delay: getRandomNumber(1, 10)
    }
  })

  return (
    <svg xmlns='http://www.w3.org/2000/svg' className={`${className} pointer-events-none`} viewBox='0 0 600 300'>
      <g>
        {particleArray.map((particle, index) => {
          const { x, y, r, duration, delay } = particle
          return (
            <circle
              key={index}
              cx={x}
              cy={y}
              r={r}
              className={`opacity-0 ${
                index % 2 ? 'fill-brand-electric-purple' : 'fill-brand-iridescent-blue'
              } motion-safe:animate-[float_ease-out_infinite]`}
              style={{
                animationDuration: `${duration}s`,
                animationDelay: `${delay}s`
              }}
            />
          )
        })}
      </g>
    </svg>
  )
}

Particles.propTypes = {
  /** Tailwind classNames */
  className: PropTypes.string
}

export default Particles
