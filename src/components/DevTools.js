/**
 *
 * Created by zhangyuanyuan031 on 17/4/20.
 */

import React from 'react'
import { createDevTools } from 'redux-devtools'
import LogMonitor from 'redux-devtools-log-monitor'
import DockMonitor from 'redux-devtools-dock-monitor'

const DevTools = createDevTools(
    <DockMonitor
        toggleVisibilityKey='ctrl-h'
        changePositionKey='ctrl-q'
        /* 设置默认隐藏，不然每次刷新都自动显示 */
        defaultIsVisible={false}>
        <LogMonitor theme='tomorrow' />
    </DockMonitor>
);
export default DevTools;