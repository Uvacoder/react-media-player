import * as React from 'react';
import { withMediaProps } from '../decorators/with-media-props';
import formatTime from '../utils/format-time';

class Duration extends React.Component<any, any, any> {
  shouldComponentUpdate({ media }: any) {
    return this.props.media.duration !== media.duration;
  }

  render() {
    const { className, style, media } = this.props;
    return (
      <time className={className} style={style}>
        {formatTime(media.duration)}
      </time>
    );
  }
}

export default withMediaProps(Duration);
