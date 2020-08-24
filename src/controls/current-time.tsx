import * as React from 'react';
import { withMediaProps } from '../decorators/with-media-props';
import formatTime from '../utils/format-time';

class CurrentTime extends React.Component<any, any, any> {
  shouldComponentUpdate({ media }: any) {
    return this.props.media.currentTime !== media.currentTime;
  }

  render() {
    const { className, style, media } = this.props;
    return (
      <time className={className} style={style}>
        {formatTime(media.currentTime)}
      </time>
    );
  }
}

export default withMediaProps(CurrentTime);
