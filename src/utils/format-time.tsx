export default function formatTime(current: number) {
  let h: number | string = Math.floor(current / 3600);
  let m: number | string = Math.floor((current - h * 3600) / 60);
  let s: number | string = Math.floor(current % 60);

  if (s < 10) {
    s = '0' + s;
  }

  if (h > 0) {
    m = m < 10 ? `0${m}` : m;
    return h + ':' + m + ':' + s;
  } else {
    return m + ':' + s;
  }
}
