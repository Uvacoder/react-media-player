import * as React from 'react';
import { withMediaProps } from '../decorators/with-media-props';

class Progress extends React.Component<any, any, any> {
  shouldComponentUpdate({ media }: any) {
    return this.props.media.progress !== media.progress;
  }

  render() {
    const { className, style, media } = this.props;
    return (
      <progress
        className={className}
        style={style}
        max={100}
        value={media.progress * 100}
      />
    );
  }
}

export default withMediaProps(Progress);
