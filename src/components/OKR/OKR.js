/* eslint-disable no-unused-expressions */

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import React, { Component } from 'react';

import { getOKR, setFilter, clearFilter } from './OKRAction';
import OKRAccordion from '../OKRAccordion/OKRAccordion';

import './OKR.scss';

class OKR extends Component {
    constructor(props) {
        super(props);

        this.setFilter = this.setFilter.bind(this);
        this.clearFilter = this.clearFilter.bind(this);
    }

    clearFilter() {
        this.props.clearFilter();
    }

    setFilter(e) {
        const filterText = e.target.innerText;
        this.props.setFilter(filterText);
    }

    componentDidMount() {
        this.props.getOKR();
    }

    render() {
        const { okr, keys, filters, currentFilter } = this.props;

        let clearFilter = '';
        
        if (currentFilter) {
            clearFilter = (
                <div className="clear-filter" onClick={this.clearFilter}>Clear Filter</div>
            );
        }

        const filter = (
            <div className="okr-filters">
                {filters.map((f, i) => (
                    <div key={i} className={`filter-item ` + (f === currentFilter ? 'active' : '')} onClick={this.setFilter}>{f}</div>
                ))}
                {clearFilter}
            </div>
        )

        const list = (
            <div>
                {okr.map((o, i) => (
                    <OKRAccordion key={i} id={i + 1} title={o.title} children={keys[o.id]} />
                ))}
            </div>
        );

        return (
            <div className="okr-list">
                {filter}
                {list}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    let okr = state.okr.okr;

    if (state.okr.currentFilter) {
        okr = state.okr.okr.filter((obj) => obj.category === state.okr.currentFilter);
    }

    return {
        loading: state.okr.loading,
        okr,
        error: state.okr.error,
        keys: state.okr.keys,
        filters: state.okr.filters,
        currentFilter: state.okr.currentFilter
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getOKR,
        setFilter,
        clearFilter
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(OKR);