import React, {
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from 'react';
import styles from './styles.module.less';

import Icon from '@/components/Icon';

export type TypeRefScrollSnap = { random: (manual?: boolean) => void };

export default forwardRef<TypeRefScrollSnap, { list: any[]; onChange?: (data: any, index: number) => void }>(
  function ScrollSnap({ list, onChange }, ref) {
    const cellRef = useRef<HTMLDivElement>(null);
    const sliderRef = useRef<HTMLDivElement>(null);
    const [state, setState] = useState({
      cellHeight: 0, // 单元格高度
      shuffling: false, // 洗牌中
    });

    useEffect(() => {
      const handler = () => {
        const cell = cellRef.current;
        if (!cell) return;
        const { height } = cell.getBoundingClientRect();
        setState(preState => ({ ...preState, cellHeight: height }));
      };
      handler();
      window.addEventListener('resize', handler, false);
      return () => {
        window.removeEventListener('resize', handler, false);
      };
    }, []);

    const goTo = useCallback(
      (index: number) => {
        const slider = sliderRef.current;
        if (!slider) return;
        slider.scrollTo(0, index * state.cellHeight);
      },
      [state.cellHeight],
    );

    const random = useCallback(
      (manual: boolean = false) => {
        goTo(Math.floor(Math.random() * list.length));
      },
      [goTo, list.length],
    );

    useEffect(() => {
      if (navigator.maxTouchPoints !== 0) return; // 排除触摸屏
      const slider = sliderRef.current;
      if (!slider) return;

      let dragStart = 0,
        scrollStart = 0,
        scrollTop = 0;
      function sliderDragStart(event: React.PointerEvent<HTMLDivElement>) {
        event.currentTarget.style.cursor = 'grabbing';

        dragStart = event.clientY;
        scrollStart = event.currentTarget.scrollTop;
      }

      let sliderDragMove = (event: React.PointerEvent<HTMLDivElement>) => {
        if (event.currentTarget.style.cursor !== 'grabbing') return;
        scrollTop = scrollStart - 2 * (event.clientY - dragStart);
        event.currentTarget.scrollTop = scrollTop;
      };

      let sliderDragEnd = (event: React.PointerEvent<HTMLDivElement>) => {
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

      return () => {
        // @ts-ignore
        slider.removeEventListener('mousedown', sliderDragStart);
        // @ts-ignore
        slider.removeEventListener('mousemove', sliderDragMove);
        // @ts-ignore
        slider.removeEventListener('mouseup', sliderDragEnd);
        // @ts-ignore
        slider.removeEventListener('mouseout', sliderDragEnd);
      };
    }, []);

    useLayoutEffect(() => {
      const slider = sliderRef.current;
      if (!slider) return;
      let scrollTimeout = 0;
      const handler = (event: React.UIEvent<HTMLDivElement>) => {
        window.clearTimeout(scrollTimeout);
        scrollTimeout = window.setTimeout(() => {
          const index = Math.round(slider.scrollTop / state.cellHeight);
          const data = list[index];
          data && onChange?.(data, index);
        }, 500);
      };
      // @ts-ignore
      slider.addEventListener('scroll', handler, false);
      return () => {
        // @ts-ignore
        slider.removeEventListener('scroll', handler, false);
      };
    }, [list, onChange, state.cellHeight]);

    useLayoutEffect(() => {
      random();
      return () => {};
    }, [random]);

    useImperativeHandle(
      ref,
      () => ({
        random,
      }),
      [random],
    );

    return (
      <aside className={styles.scrollSnap}>
        <span className={styles.borderCell}></span>
        <div className={styles.slider} ref={sliderRef}>
          <i ref={cellRef} className={styles.cell} />
          {list.map(({ name }, i) => (
            <Icon key={name} name={name} className={styles.cell} />
          ))}
          <i className={styles.cell} />
        </div>
      </aside>
    );
  },
);
