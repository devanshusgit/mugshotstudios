import React, { useRef, useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

export default function HoverPlayCard({
  src,
  poster,
  className,
  loop = false,
  mutedOnHover = true,
  title,
  type,
  desc,
}) {
  const videoRef = useRef(null)
  const containerRef = useRef(null)
  const [isHovering, setIsHovering] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [userStarted, setUserStarted] = useState(false)
  const [prevMuted, setPrevMuted] = useState(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  // ── Lazy-load: only set video src when the card scrolls into view ──
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: "200px" } // start loading slightly before visible
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // ── Track when video has enough data to play ──
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const onCanPlay = () => setIsLoaded(true)
    video.addEventListener("canplay", onCanPlay)
    // If already ready (cached)
    if (video.readyState >= 3) setIsLoaded(true)
    return () => video.removeEventListener("canplay", onCanPlay)
  }, [isVisible])

  useEffect(() => {
    const video = videoRef.current
    if (!video || !isVisible) return
    let ignore = false

    const doPlayMuted = async () => {
      if (!video) return
      if (prevMuted === null) setPrevMuted(video.muted)
      if (mutedOnHover) video.muted = true
      try {
        await video.play()
        if (!ignore) setIsPlaying(true)
      } catch {
        if (!ignore) setIsPlaying(false)
      }
    }

    const doPause = () => {
      if (!video) return
      video.pause()
      setIsPlaying(false)
      if (!userStarted && prevMuted !== null) video.muted = prevMuted
    }

    if (isHovering && !userStarted) void doPlayMuted()
    else if (!isHovering && !userStarted) doPause()

    return () => { ignore = true }
  }, [isHovering, mutedOnHover, userStarted, isVisible])

  const handleIconClick = async () => {
    const video = videoRef.current
    if (!video) return
    if (!isPlaying) {
      setUserStarted(true)
      video.muted = false
      setPrevMuted(false)
      try {
        await video.play()
        setIsPlaying(true)
      } catch (err) {
        console.error("Play failed:", err)
        setIsPlaying(false)
      }
    } else {
      video.pause()
      setIsPlaying(false)
    }
  }

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const onPlay = () => setIsPlaying(true)
    const onPause = () => setIsPlaying(false)
    const onEnded = () => { setIsPlaying(false); setUserStarted(false) }
    video.addEventListener("play", onPlay)
    video.addEventListener("pause", onPause)
    video.addEventListener("ended", onEnded)
    return () => {
      video.removeEventListener("play", onPlay)
      video.removeEventListener("pause", onPause)
      video.removeEventListener("ended", onEnded)
    }
  }, [isVisible])

  return (
    <div
      ref={containerRef}
      className={cn("bg-card rounded-xl overflow-hidden border border-border group flex flex-col", className)}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="relative aspect-video bg-black cursor-pointer" onClick={handleIconClick}>
        {isVisible ? (
          <video
            ref={videoRef}
            src={`${src}#t=0.5`}
            poster={poster}
            loop={loop}
            preload="metadata"
            playsInline
            className="w-full h-full object-cover"
          />
        ) : (
          /* Lightweight placeholder until card scrolls into view */
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-8 h-8 rounded-full border-2 border-white/20 border-t-white/60 animate-spin" />
          </div>
        )}
        <AnimatePresence>
          {(isHovering || !isPlaying) && isVisible && (
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <Button
                variant="ghost"
                onClick={(e) => { e.stopPropagation(); handleIconClick() }}
                className="pointer-events-auto bg-black/30 hover:bg-black/50 text-white rounded-full px-6 h-11 text-sm font-semibold uppercase tracking-widest"
                aria-label={isPlaying ? "Pause video" : "Play video"}
              >
                {isPlaying ? (isLoaded ? "Pause" : "Loading…") : "Play"}
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="absolute left-3 bottom-3 text-xs bg-black/40 text-white px-3 py-1 rounded-full uppercase tracking-widest">
          {isPlaying ? "Playing" : "Paused"}
        </div>
      </div>
      {(title || desc) && (
        <div className="p-5 flex flex-col gap-1">
          {type && <div className="text-xs uppercase tracking-widest" style={{ color: 'var(--muted-foreground)' }}>{type}</div>}
          {title && <h3 className="text-lg font-bold">{title}</h3>}
          {desc && <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>{desc}</p>}
        </div>
      )}
    </div>
  )
}
