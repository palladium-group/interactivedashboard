import React from 'react';

import { colors } from '@dhis2/ui-core';
import ViewTitleBar from './ViewTitleBar';

import './TitleBar.css';

const style = {
    title: {
        position: 'relative',
        fontSize: 21,
        fontWeight: 500,
        color: colors.black,
        minWidth: 50,
    },
    description: {
        fontSize: 14,
        color: colors.grey800,
    },
};

const TitleBar = ({ edit }) => {
    return (
        <div
            className="titlebar-wrapper"
            style={{
                padding: '20px 15px 5px 10px',
            }}
        >
            <ViewTitleBar style={style} />
        </div>
    );
};

export default TitleBar;
