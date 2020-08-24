import * as React from 'react';
import { findDOMNode } from 'react-dom';
import getVimeoId from '../utils/get-vimeo-id';
import vendorPropTypes from './vendor-prop-types';

class Vimeo extends React.Component<any, any, any> {
  static propTypes = vendorPropTypes;

  private _iframe: any;
  private _vimeoId: any = getVimeoId(this.props.src);
  private _origin = '*';

  componentDidMount() {
    window.addEventListener('message', this._onMessage);
  }

  componentWillReceiveProps(nextProps: any) {
    if (nextProps.src !== this.props.src) {
      this._vimeoId = getVimeoId(nextProps.src);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('message', this._onMessage);
  }

  get instance() {
    return this._iframe;
  }

  get node() {
    return findDOMNode(this._iframe);
  }

  _onMessage = (e: any) => {
    let data;

    // allow messages from the Vimeo player only
    if (!/^https?:\/\/player.vimeo.com/.test(e.origin)) {
      return false;
    }

    if (this._origin === '*') {
      this._origin = e.origin;
    }

    try {
      data = JSON.parse(e.data);
    } catch (err) {
      this.props.onError(err);
    }

    if (data) {
      switch (data.event) {
        case 'ready':
          this._postOnReadyMessages();
          break;
        case 'loadProgress':
          this.props.onProgress(data.data.percent);
          break;
        case 'playProgress':
          this.props.onTimeUpdate(data.data.seconds);
          break;
        case 'play':
          this.props.onPlay(true);
          break;
        case 'pause':
          this.props.onPause(false);
          break;
        case 'finish':
          this.props.onEnded(false);
          break;
      }
      if (data.method === 'getDuration') {
        this.props.onDuration(data.value);
      }
    }

    return;
  };

  _postMessage(method: any, value?: any) {
    const data: { method: any; value?: any } = { method };

    if (value) {
      data.value = value;
    }

    this._iframe.contentWindow.postMessage(JSON.stringify(data), this._origin);
  }

  _postOnReadyMessages() {
    [
      'loadProgress',
      'playProgress',
      'play',
      'pause',
      'finish',
    ].forEach(listener => this._postMessage('addEventListener', listener));
    this._postMessage('getDuration');
    this.props.onReady();
  }

  play() {
    this._postMessage('play');
  }

  pause() {
    this._postMessage('pause');
  }

  stop() {
    this._postMessage('unload');
  }

  seekTo(currentTime: number) {
    this._postMessage('seekTo', currentTime);
  }

  mute(muted: boolean) {
    this._postMessage('setVolume', muted ? '0' : '1');
    this.props.onMute(muted);
    this.props.onVolumeChange(muted ? 0 : 1);
  }

  setVolume(volume: number) {
    this._postMessage('setVolume', volume);
    this.props.onVolumeChange(+volume);
  }

  render() {
    return (
      <iframe
        ref={c => (this._iframe = c)}
        src={`https://player.vimeo.com/video/${this._vimeoId}?api=1`}
        {...this.props.extraProps}
      />
    );
  }
}

export default Vimeo;
