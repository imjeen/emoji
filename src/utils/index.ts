/**
 * 下载文件
 *
 * @export
 * @param {string} url
 * @param {string} [name='']
 */
export async function downloadFile(url: string, name: string = '') {
  const blob = await fetch(url).then(res => res.blob());
  const imgUrl = (window.URL || window.webkitURL).createObjectURL(blob);

  const el = document.createElement('a');
  el.download = name;
  el.href = imgUrl;
  el.style.display = 'none';
  document.body.appendChild(el);
  el.click();
}

/**
 * 防抖 (debounce)
 *
 * 有新的指令进来，则重新计时等待，保证执行最后一个指令
 *
 * @param {Function} fn - 目标函数
 * @param {number} delay - 延迟执行毫秒数
 */
export function debounce(fn: (...args: any) => void, delay: number) {
  let timer: number;
  return function (this: any, ...args: Parameters<typeof fn>) {
    const context = this;
    clearTimeout(timer);
    timer = window.setTimeout(() => fn.apply(context, args), delay);
  };
}

/**
 * 强制延迟 time 毫秒
 *
 * @export
 * @param {number} time - 多少毫秒
 * @returns
 */
export function sleep(time: number) {
  return new Promise(resolve => setTimeout(resolve, time));
}

/**
 * 将元素垂直滚动指定位置
 *
 * @export
 * @param {number} position - 位置
 */
export function scrollTopTo(position: number, container: Element) {
  return new Promise<void>(resolve => {
    const scrollListener = (e: any) => {
      if ('undefined' === typeof e) return;

      // 是否已到底
      const isBottom = container.clientHeight + container.scrollTop === container.scrollHeight;

      if (isBottom || Math.abs(container.scrollTop - position) < 2) {
        container.removeEventListener('scroll', scrollListener);
        resolve();
      }
    };
    container.addEventListener('scroll', scrollListener);

    container.scrollTo({
      top: position,
      behavior: 'smooth',
    });
  });
}
