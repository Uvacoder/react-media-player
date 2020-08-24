import * as React from 'react';
import contextTypes from '../context-types';

export function withMediaProps(MediaComponent: any) {
  return class extends React.Component<any, any, any> {
    static displayName = 'withMediaProps';

    static contextTypes = contextTypes;

    render() {
      return <MediaComponent {...this.props} media={this.context.media} />;
    }
  };
}
