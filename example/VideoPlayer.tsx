import * as React from 'react';
import { Media, Player, controls } from '../src/index';
import PlayToggle from './PlayToggle';
import MuteToggle from './MuteToggle';
import FullScreen from './FullScreen';

const { CurrentTime, Progress, SeekBar, Duration, Volume } = controls;

const VideoPlayer: React.FC<any> = ({ src }) => {
  return (
    <Media>
      {({ isFullscreen, playPause }) => (
        <div
          className={
            'media-player' + (isFullscreen ? ' media-player--fullscreen' : '')
          }
          tabIndex={0}
        >
          <Player src={src} onClick={() => playPause()} />
          <div className="media-controls">
            <PlayToggle className="media-control media-control--play-pause" />
            <CurrentTime className="media-control media-control--current-time" />
            <div className="media-control-group media-control-group--seek">
              <Progress className="media-control media-control--progress" />
              <SeekBar className="media-control media-control--seekbar" />
            </div>
            <Duration className="media-control media-control--duration" />
            <MuteToggle className="media-control media-control--mute-unmute" />
            <Volume className="media-control media-control--volume" />
            <FullScreen className="media-control media-control--fullscreen" />
          </div>
        </div>
      )}
    </Media>
  );
};

export { VideoPlayer };
export default VideoPlayer;
