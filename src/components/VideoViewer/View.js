// @flow
// @jsx glam
import glam from 'glam';
import React, { Component, type ElementRef } from 'react';
import rafScheduler from 'raf-schd';

import Icon from './Icon';
import ProgressBar from './Progress';

type UrlShape = {
  type: 'video/mp4' | 'video/ogg',
  src: string,
};

export type ViewShape = {
  poster: string,
  urls: Array<UrlShape>,
};

type ViewProps = {
  currentIndex: number,
  data: ViewShape,
  interactionIsIdle: boolean,
};
type ViewState = { paused: boolean, progress: number };

function calculateProgress({ currentTime, duration }) {
  return (100 / duration) * currentTime;
}

const Footer = ({ interactionIsIdle, ...props }) => (
  <div
    css={{
      alignItems: 'center',
      bottom: 0,
      display: 'flex ',
      left: 0,
      opacity: interactionIsIdle ? 0 : 1,
      padding: 10,
      paddingRight: 15,
      position: 'absolute',
      right: 0,
      transition: 'opacity 300ms',
    }}
    style={{
      background: 'linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.44))',
    }}
    {...props}
  />
);
const Button = props => (
  <button
    type="button"
    css={{
      background: 0,
      border: 0,
      color: 'white',
      cursor: 'pointer',
      height: 32,
      marginRight: 10,
      outline: 0,
      padding: 0,
      opacity: 0.66,
      width: 32,

      ':hover': { opacity: 1 },
      ':active': { color: '#00D7FF' },
    }}
    {...props}
  />
);

export default class View extends Component<ViewProps, ViewState> {
  video: HTMLVideoElement;
  state = { paused: true, progress: 0 };
  handlePlay = () => {
    this.setState({ paused: false });
  };
  handleTimeUpdate = rafScheduler(() => {
    const progress = calculateProgress({
      currentTime: this.video.currentTime,
      duration: this.video.duration,
    });

    this.setState({ progress });
  });
  handlePause = () => {
    this.setState({ paused: true });
  };
  getVideo = (ref: ElementRef<*>) => {
    this.video = ref;
  };
  render() {
    const { data, interactionIsIdle } = this.props;
    const { progress } = this.state;
    const width = 854;

    return (
      <div
        css={{
          backgroundColor: 'black',
          lineHeight: 0,
          marginLeft: 'auto',
          marginRight: 'auto',
          maxWidth: '100%',
          position: 'relative',
          textAlign: 'center',
        }}
      >
        <iframe width="560" height="315" src={data.videoSrc} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
      </div>
    );
  }
}
