export default function fullscreenChange(type: string, callback: Function) {
  const vendors = [
    'fullscreenchange',
    'mozfullscreenchange',
    'MSFullscreenChange',
    'webkitfullscreenchange',
  ];
  vendors.forEach(vendor =>
    (document as any)[`${type}EventListener`](vendor, callback)
  );
}
