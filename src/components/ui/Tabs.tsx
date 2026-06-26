'use client';

import { useState, type ReactNode } from 'react';
import { motion } from 'framer-motion';

export interface TabItem {
  id: string;
  label: ReactNode;
  content: ReactNode;
}

export function Tabs({ items, idBase = 'tabs' }: { items: TabItem[]; idBase?: string }) {
  const [active, setActive] = useState(items[0]?.id);

  return (
    <div>
      <div role="tablist" className="mx-auto flex max-w-full flex-wrap justify-center gap-2">
        {items.map((it) => {
          const selected = it.id === active;
          return (
            <button
              key={it.id}
              role="tab"
              aria-selected={selected}
              aria-controls={`${idBase}-panel-${it.id}`}
              id={`${idBase}-tab-${it.id}`}
              onClick={() => setActive(it.id)}
              className={`relative rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                selected ? 'text-kalite-ink' : 'text-kalite-cream/70 hover:text-kalite-cream'
              }`}
            >
              {selected && (
                <motion.span
                  layoutId={`${idBase}-pill`}
                  className="absolute inset-0 -z-10 rounded-full bg-gold-sheen shadow-gold-glow"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              {it.label}
            </button>
          );
        })}
      </div>

      <div className="mt-10">
        {items.map((it) => (
          <div
            key={it.id}
            role="tabpanel"
            id={`${idBase}-panel-${it.id}`}
            aria-labelledby={`${idBase}-tab-${it.id}`}
            hidden={it.id !== active}
          >
            {it.id === active && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              >
                {it.content}
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
