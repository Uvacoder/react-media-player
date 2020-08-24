import HTML5 from '../vendors/html5';
import Vimeo from '../vendors/vimeo';
import Youtube from '../vendors/youtube';

export default function getVendor(src: string, vendor: any) {
  src = src || '';
  if (vendor === 'youtube' || /youtube.com|youtu.be/.test(src)) {
    return { vendor: 'youtube', component: Youtube };
  } else if (vendor === 'vimeo' || /vimeo.com/.test(src)) {
    return { vendor: 'vimeo', component: Vimeo };
  } else {
    const isAudio = vendor === 'audio' || /\.(mp3|wav|m4a)($|\?)/i.test(src);
    return {
      vendor: isAudio ? 'audio' : 'video',
      component: HTML5,
    };
  }
}
