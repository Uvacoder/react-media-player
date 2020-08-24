export default (() => {
  if (typeof document === 'undefined') {
    return () => {};
  }

  return [
    'exitFullscreen',
    'mozCancelFullScreen',
    'msExitFullscreen',
    'webkitExitFullscreen',
  ].reduce((prev, curr) => ((document as any)[curr] ? curr : prev));
})() as (() => void) | 'exitFullscreen';
