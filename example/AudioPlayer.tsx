import * as React from 'react';
import { Media, Player, controls, utils } from '../src/index';
import PlayToggle from './PlayToggle';
import MuteToggle from './MuteToggle';

const {
  CurrentTime,
  Progress,
  SeekBar,
  Duration,
  Volume,
  FullScreen,
} = controls;
const { formatTime } = utils;

class Panner {
  private _gainRight: any;
  private _source: any;
  private _audioContext: any;
  private _initialPanningAmount: any;
  private _splitter: any;
  private _gainLeft: any;
  private _merger: any;
  constructor({ source, audioContext, panningAmount = 0 }) {
    this._source = source;
    this._audioContext = audioContext;
    this._initialPanningAmount = panningAmount;
  }

  connect() {
    this._splitter = this._audioContext.createChannelSplitter(2);
    this._gainLeft = this._audioContext.createGain();
    this._gainRight = this._audioContext.createGain();
    this._merger = this._audioContext.createChannelMerger(2);
    this._source.connect(this._splitter, 0, 0);
    this._splitter.connect(this._gainLeft, 0);
    this._splitter.connect(this._gainRight, 1);
    this._gainLeft.connect(this._merger, 0, 0);
    this._gainRight.connect(this._merger, 0, 1);
    return this._merger;
  }

  setPosition(amount) {
    this._gainLeft.gain.value = amount <= 0 ? 1 : 1 - amount;
    this._gainRight.gain.value = amount >= 0 ? 1 : 1 + amount;
  }
}

const tracks = ['podcast', 'armstrong'];

class AudioPlayer extends React.Component<any, any, any> {
  private _player: any;
  public panner: any;
  public media: any;
  state = {
    currentTrack: tracks[0],
  };

  _handlePannerChange = ({ target }) => {
    const x = +target.value;
    const y = 0;
    const z = 1 - Math.abs(x);
    this.panner.setPosition(x, y, z);
  };

  _connectSource = (source, audioContext) => {
    this.panner = new Panner({ source, audioContext });
    return this.panner.connect();
  };

  render() {
    return (
      <Media ref={c => (this.media = c)}>
        <div>
          {tracks.map(track => (
            <button
              key={track}
              onClick={() => this.setState({ currentTrack: track })}
            >
              {track}
            </button>
          ))}
          <Player
            ref={c => (this._player = c)}
            src={`/audio/${this.state.currentTrack}.mp3`}
            connectSource={this._connectSource}
            useAudioObject
            // autoPlay
          />
          <div className="media-controls">
            <PlayToggle className="media-control media-control--play-pause" />
            <CurrentTime className="media-control media-control--current-time" />
            <SeekBar className="media-control media-control--volume-range" />
            <Duration className="media-control media-control--duration" />
            <MuteToggle className="media-control media-control--mute-unmute" />
            <Volume className="media-control media-control--volume" />
          </div>
          <input
            type="range"
            defaultValue="0"
            min="-1"
            max="1"
            step="any"
            onChange={this._handlePannerChange}
          />
        </div>
      </Media>
    );
  }
}

export default AudioPlayer;
