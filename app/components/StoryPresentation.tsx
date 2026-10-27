"use client";

import { useState } from "react";
import type { StorySlide } from "@/lib/types";

export default function StoryPresentation({ slides }: { slides: StorySlide[] }) {
  const [index, setIndex] = useState(0);
  if (!slides.length) return <p className="muted">No curated story slides are available for this location.</p>;
  const slide = slides[index];
  return <section className="story" aria-label="Heritage story">
    <div className="story-top"><span>HERITAGE STORY</span><span>{index + 1} / {slides.length}</span></div>
    <div className="progress"><i style={{ width: `${((index + 1) / slides.length) * 100}%` }} /></div>
    <h3>{slide.title}</h3><p>{slide.content}</p>
    {slide.image && <img src={slide.image} alt={slide.image_caption || slide.title} onError={(event) => { event.currentTarget.style.display = "none"; }} />}
    {slide.image_caption && <small>{slide.image_caption}</small>}
    <div className="row"><button onClick={() => setIndex((i) => i - 1)} disabled={index === 0}>Previous</button><button onClick={() => setIndex((i) => i + 1)} disabled={index === slides.length - 1}>Next</button></div>
  </section>;
}
