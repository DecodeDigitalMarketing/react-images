// @flow
// @jsx glam
import glam from 'glam';
import React from 'react';

import { smallDevice } from './css-helpers';
import { Div, Span } from '../primitives';
import type { PropsWithStyles, ViewType } from '../types';
import { className } from '../utils';
import componentBaseClassNames from './componentBaseClassNames';

import ParseHtml from 'html-react-parser';

type State = { isModal: boolean, interactionIsIdle: boolean };
type Props = State &
  PropsWithStyles & {
    components: Object,
    currentView: ViewType,
    innerProps: any,
    isFullscreen: boolean,
    isModal: boolean,
    modalProps: any,
    interactionIsIdle: any,
  };

export const footerCSS = ({ isModal, interactionIsIdle }: State) => ({
  alignItems: 'top',
  bottom: isModal ? 0 : null,
  color: isModal ? 'rgba(255, 255, 255, 0.9)' : '#666',
  display: 'flex ',
  flex: '0 0 auto',
  fontSize: 13,
  justifyContent: 'space-between',
  left: isModal ? 0 : null,
  opacity: interactionIsIdle && isModal ? 0 : 1,
  padding: isModal ? '30px 20px 20px' : '10px 0',
  position: isModal ? 'absolute' : null,
  right: isModal ? 0 : null,
  transform: isModal ? `translateY(${interactionIsIdle ? 10 : 0}px)` : null,
  transition: 'opacity 300ms, transform 300ms',
  zIndex: isModal ? 1 : null,

  '& *:focus': {
    outline: '1.5px solid orange',
  },

  [smallDevice]: {
    padding: isModal ? '20px 15px 15px' : '5px 0',
  },
});

const footerBaseClassName = componentBaseClassNames.Footer;

const Footer = (props: Props) => {
  const { components, getStyles, innerProps, isFullscreen, isModal } = props;

  const style = isModal
    ? { background: 'linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.33))' }
    : null;

  const state = { isFullscreen, isModal };
  const cn = {
    container: className(footerBaseClassName, state),
    caption: className('footer__caption', state),
    count: className('footer__count', state),
  };
  const css = {
    container: getStyles(footerBaseClassName, props),
    caption: getStyles('footerCaption', props),
    count: getStyles('footerCount', props),
  };
  const { Caption, Count } = components;

  return (
    <Div
      css={css.container}
      className={cn.container}
      // TODO glam prefixer fails on gradients
      // https://github.com/threepointone/glam/issues/35
      style={style}
      {...innerProps}
    >
      <Caption {...props} />
      <span>
        <a
          href="https://www.facebook.com/StLukesHealthTX"
          target="_blank"
          rel="noreferrer"
        >
          <svg height="50px" viewBox="0 0 24 24" width="24">
            <path
              d="m22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"
              fill="#fff"
            ></path>
          </svg>
        </a>
        <a
          href="https://www.instagram.com/stlukeshealthtx/"
          target="_blank"
          rel="noreferrer"
        >
          <svg height="50px" viewBox="0 0 24 24" width="24">
            <path
              d="m12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.668.072 4.948c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.668-.014 4.948-.072c4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
              fill="#fff"
            ></path>
          </svg>
        </a>
        <a
          href="https://twitter.com/StLukesHealthTX"
          target="_blank"
          rel="noreferrer"
        >
          <svg height="50px" viewBox="0 0 24 24" width="24">
            <path
              d="m24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"
              fill="#fff"
            ></path>
          </svg>
        </a>
        <a
          href="https://www.youtube.com/user/CHIStLukesHealth"
          target="_blank"
          rel="noreferrer"
        >
          <svg height="50px" viewBox="0 0 24 24" width="24">
            <path
              d="m19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993z"
              fill="#fff"
            ></path>
          </svg>
        </a>
      </span>
    </Div>
  );
};

// ==============================
// Inner Elements
// ==============================

export const footerCaptionCSS = () => ({});

export const FooterCaption = (props: ViewType) => {
  const { currentView, getStyles, isFullscreen, isModal } = props;
  const { caption } = currentView;
  const state = { isFullscreen, isModal };

  return (
    <Span
      css={getStyles('footerCaption', props)}
      className={className('footer__caption', state)}
    >
      {/*
       * Render a string caption using ParseHtml in case we were passed a
       * string with HTML. All other types are rendered by JSX by default.
       */}
      {typeof caption === 'string'
        ? ParseHtml(`<span>${caption}</span>`)
        : caption}
    </Span>
  );
};

export const footerCountCSS = () => ({ flexShrink: 0, marginLeft: '1em' });

export const FooterCount = (props: ViewType) => {
  const { currentIndex, getStyles, isFullscreen, isModal, views } = props;
  const state = { isFullscreen, isModal };
  const activeView = currentIndex + 1;
  const totalViews = views.length;

  if (!activeView || !totalViews) return null;

  return (
    <Span
      css={getStyles('footerCount', props)}
      className={className('footer__count', state)}
    >
      {activeView} of {totalViews}
    </Span>
  );
};

export default Footer;
