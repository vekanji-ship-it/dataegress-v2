"use client";

import { useEffect, useRef } from 'react';

export default function BeehiivEmbed() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.innerHTML = '';

    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://subscribe-forms.beehiiv.com/v3/loader.js';
    script.setAttribute('data-beehiiv-form', '2a02bb9d-c0ad-462b-84c4-2b5ba5dc159b');

    containerRef.current.appendChild(script);
  }, []);

  return <div ref={containerRef} className="w-full min-h-[120px]" />;
}
