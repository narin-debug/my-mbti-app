'use client';

import { useEffect, useState } from 'react';
import { getSupabaseClient } from '@/lib/supabase/client';

export default function ParticipantCounter() {
  const [count, setCount] = useState<number | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const supabase = getSupabaseClient();
    if (!supabase) {
      setReady(true);
      return;
    }

    let active = true;

    supabase
      .from('results')
      .select('*', { count: 'exact', head: true })
      .then(({ count: total, error }) => {
        if (!active) return;
        if (!error && typeof total === 'number') setCount(total);
        setReady(true);
      });

    const channel = supabase
      .channel('results-count-realtime')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'results' },
        () => setCount((prev) => (prev === null ? prev : prev + 1))
      )
      .subscribe();

    return () => {
      active = false;
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="flex min-h-[3.25rem] w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-500 px-5 py-3 text-center text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 sm:text-base">
      <span className="shrink-0 text-lg">👥</span>
      {!ready ? (
        <span className="h-4 w-44 animate-pulse rounded bg-white/30" />
      ) : count !== null ? (
        <span>
          이미 <strong className="font-extrabold">{count.toLocaleString()}</strong>명의 동료들이 자신의 부캐를 확인했어요!
        </span>
      ) : (
        <span>지금 바로 나의 IT 부캐를 가장 먼저 확인해보세요!</span>
      )}
    </div>
  );
}
