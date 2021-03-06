import React, { useState, useRef, useEffect, useLayoutEffect, useCallback } from 'react';
import styles from './styles.module.less';

import Icon from '@/components/Icon';

import { debounce, scrollTopTo, beep } from '@/utils';

export default (function ScrollSnap({
  index,
  list,
  onChange,
}: {
  index: number;
  list: { name: string; [k: string]: any }[];
  onChange?: (index: number) => void;
}) {
  const cellRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState({
    cellHeight: 0, // 单元格高度
    shuffling: false, // 洗牌中
  });

  useEffect(() => {
    const _handler = () => {
      const cell = cellRef.current;
      if (!cell) return;
      const { height } = cell.getBoundingClientRect();
      setState(preState => ({ ...preState, cellHeight: height }));
    };

    const handler = debounce(_handler, 800);

    handler();

    window.addEventListener('resize', handler, false);
    return () => {
      window.removeEventListener('resize', handler, false);
    };
  }, []);

  const goTo = useCallback(
    async (index: number) => {
      const slider = sliderRef.current;
      if (!slider) return;

      setState(pre => ({ ...pre, shuffling: true }));
      // slider.scrollTo(0, index * state.cellHeight);
      await scrollTopTo(index * state.cellHeight, slider);
      setState(pre => ({ ...pre, shuffling: false }));
    },
    [state.cellHeight],
  );

  useEffect(() => {
    if (navigator.maxTouchPoints !== 0) return; // 排除触摸屏
    const slider = sliderRef.current;
    if (!slider) return;

    let dragStart = 0,
      scrollStart = 0,
      scrollTop = 0;
    const sliderDragStart = (event: React.PointerEvent<HTMLDivElement>) => {
      event.currentTarget.style.cursor = 'grabbing';

      dragStart = event.clientY;
      scrollStart = event.currentTarget.scrollTop;
    };

    const sliderDragMove = (event: React.PointerEvent<HTMLDivElement>) => {
      if (event.currentTarget.style.cursor !== 'grabbing') return;
      scrollTop = scrollStart - 2 * (event.clientY - dragStart);
      event.currentTarget.scrollTop = scrollTop;
    };

    const sliderDragEnd = (event: React.PointerEvent<HTMLDivElement>) => {
      event.currentTarget.style.cursor = 'grab';
    };

    // @ts-ignore
    slider.addEventListener('mousedown', sliderDragStart);
    // @ts-ignore
    slider.addEventListener('mousemove', sliderDragMove);
    // @ts-ignore
    slider.addEventListener('mouseup', sliderDragEnd);
    // @ts-ignore
    slider.addEventListener('mouseout', sliderDragEnd);
  }, []);

  useLayoutEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;
    let scrollTimeout = 0,
      lastScrollPosition = 0;
    let vibrationTracker: any;
    const handler = (event: React.UIEvent<HTMLDivElement>) => {
      if (state.shuffling) return console.log(`shuffling scroll`);

      if (
        (lastScrollPosition < event.currentTarget.scrollTop &&
          vibrationTracker > Math.round(event.currentTarget.scrollTop % state.cellHeight)) ||
        (lastScrollPosition > event.currentTarget.scrollTop &&
          vibrationTracker < Math.round(event.currentTarget.scrollTop % state.cellHeight))
      ) {
        navigator.vibrate && navigator.vibrate(100);
        beep(1e4, 1);
      }

      vibrationTracker = Math.round(event.currentTarget.scrollTop % state.cellHeight);
      lastScrollPosition = event.currentTarget.scrollTop;

      window.clearTimeout(scrollTimeout);
      scrollTimeout = window.setTimeout(() => {
        const index = Math.round(slider.scrollTop / state.cellHeight);
        // const data = list[index];
        index >= 0 && onChange?.(index);
        setState(pre => ({ ...pre, shuffling: false }));
      }, 500);
    };
    // const handler = debounce(e => _handler(e), 500);
    // @ts-ignore
    slider.addEventListener('scroll', handler, false);
    return () => {
      // @ts-ignore
      slider.removeEventListener('scroll', handler, false);
    };
  }, [list, onChange, state]);

  useLayoutEffect(() => {
    goTo(index);
  }, [goTo, index]);

  return (
    <aside className={[styles.scrollSnap, state.shuffling ? styles.locked : ''].join(' ')}>
      <span className={styles.borderCell} />
      <div className={styles.slider} ref={sliderRef}>
        <i ref={cellRef} className={styles.cell} />
        {list.map(({ name }, i) => (
          <Icon key={name} name={name} className={styles.cell} />
        ))}
        <i className={styles.cell} />
      </div>
    </aside>
  );
});
