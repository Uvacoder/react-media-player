import * as React from 'react';
import { withMediaProps } from '../decorators/with-media-props';

class MuteToggle extends React.Component<any, any, any> {
  shouldComponentUpdate({ media }: any) {
    return this.props.media.isMuted !== media.isMuted;
  }

  _handleMuteUnmute = () => {
    this.props.media.muteUnmute();
  };

  render() {
    const { className, style, media } = this.props;
    return (
      <button
        type="button"
        className={className}
        style={style}
        onClick={this._handleMuteUnmute}
      >
        {media.isMuted ? 'Unmute' : 'Mute'}
      </button>
    );
  }
}

export default withMediaProps(MuteToggle);
