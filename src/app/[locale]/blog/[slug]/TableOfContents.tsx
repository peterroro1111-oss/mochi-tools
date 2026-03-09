'use client';

import { useState, useEffect } from 'react';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export default function TableOfContents({ isZh }: { isZh: boolean }) {
  const [items, setItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const article = document.querySelector('.blog-content');
    if (!article) return;

    const headings = article.querySelectorAll('h2[id], h3[id]');
    const tocItems: TocItem[] = Array.from(headings).map((h) => ({
      id: h.id,
      text: h.textContent || '',
      level: h.tagName === 'H2' ? 2 : 3,
    }));
    setItems(tocItems);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            break;
          }
        }
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0.1 }
    );

    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, []);

  if (items.length === 0) return null;

  return (
    <nav className="blog-toc">
      <h3 className="text-sm font-bold text-gray-600 mb-3 uppercase tracking-wider">
        {isZh ? '目錄' : 'Table of Contents'}
      </h3>
      <div className="space-y-0.5 border-l-2 border-pink-100 pl-3">
        {items.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`${item.level === 3 ? 'pl-3 text-xs' : ''} ${activeId === item.id ? 'active' : ''}`}
          >
            {item.text}
          </a>
        ))}
      </div>
    </nav>
  );
}
