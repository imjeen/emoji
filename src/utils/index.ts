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
