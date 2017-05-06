import React from 'react';
import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

const devToolVisible = process.env.DEV_TOOL_VISIBLE ? Boolean(process.env.DEV_TOOL_VISIBLE) : false;
const DevTools = createDevTools(
  <DockMonitor
    toggleVisibilityKey='ctrl-h'
    changePositionKey='ctrl-m'
    defaultPosition={ process.env.DEV_TOOL_POS || 'right' }
    defaultIsVisible={ devToolVisible } >
    <LogMonitor theme='solarized' />
  </DockMonitor>
);

export default DevTools;
