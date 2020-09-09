import React from 'react';

import './OKR.scss';

import OKRFilter from './OKRFilter';
import OKRList from './OKRList';

const OKR = () => (
    <div className="okr-list">
        <OKRFilter />
        <OKRList />
    </div>
);

export default OKR;