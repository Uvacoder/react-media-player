export default (() => {
  if (typeof document === 'undefined') {
    return () => {};
  }

  const names = [
    'requestFullscreen',
    'mozRequestFullScreen',
    'msRequestFullscreen',
    'webkitRequestFullscreen',
  ];
  return names.reduce((prev, curr) =>
    (document as any).documentElement[curr] ? curr : prev
  );
})() as (() => void) | 'requestFullscreen';
