import * as React from 'react';
import { Media, Player } from '../src/index';

class CircleProgress {
  el: HTMLElement | SVGElement;
  r: number;
  c: number;

  constructor(el: HTMLElement | SVGElement) {
    this.el = el;
    this.r = Number(el.getAttribute('r') || 0);
    this.c = Math.PI * (this.r * 2);
    this._init();
  }

  _init() {
    this.el.style.strokeDasharray = String(this.c);
    this.setProgress(0);
  }

  setProgress(amount) {
    const dashoffset = Math.abs((amount * this.c) / 100 - this.c);
    this.el.style.strokeDashoffset = String(dashoffset);
  }
}

class CircleMediaPlayer extends React.Component<any, any, any> {
  private _circle: any;
  private _svg: any;
  componentDidMount() {
    this._circle = new CircleProgress(this._svg);
  }

  renderPlay() {
    return (
      <polygon
        points="13.083,11.5 20.583,16 13.083,20.5 "
        className="circle-media-player__play"
      />
    );
  }

  renderPause() {
    return (
      <g className="circle-media-player__pause">
        <rect width="3" height="9" x="11.5" y="11.5" />
        <rect width="3" height="9" x="17.5" y="11.5" />
      </g>
    );
  }

  _handleTimeUpdate = ({ currentTime, duration }) => {
    this._circle.setProgress((currentTime / duration) * 100);
  };

  render() {
    return (
      <Media>
        {({ isPlaying, playPause }) => (
          <button className="circle-media-player" onClick={() => playPause()}>
            <Player
              src={this.props.src}
              vendor="audio"
              onTimeUpdate={this._handleTimeUpdate}
            />
            <svg width="32px" height="32px" viewBox="0 0 32 32">
              <circle
                cx="16"
                cy="16"
                r="14.5"
                className="circle-media-player__background"
              />
              <circle
                ref={c => (this._svg = c)}
                cx="16"
                cy="16"
                r="14.5"
                className="circle-media-player__foreground"
              />
              {isPlaying ? this.renderPause() : this.renderPlay()}
            </svg>
          </button>
        )}
      </Media>
    );
  }
}

export default CircleMediaPlayer;
