import React, { useState, useLayoutEffect } from 'react';

export default function ScrollProgressBar(props) {
    return (
        <div
            className='progressbarContainer'
            style={{
                height: '4px',
                width: '100%',
                background: 'transparent',
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 99,
            }}
        >
            <div
                className='progressFill'
                style={{
                    height: '100%',
                    background: 'var(--accent-color)',
                    width: `${props.percent}%`,
                }}
            ></div>
        </div>
    );
}
