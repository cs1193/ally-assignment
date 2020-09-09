import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { setFilter, clearFilter } from './OKRAction';


class OKRFilter extends Component {
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

    render() {
        const { filters, currentFilter } = this.props;
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
        );

        return filter;
    }
}


const mapStateToProps = (state) => {
    return {
        filters: state.okr.filters,
        currentFilter: state.okr.currentFilter
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        setFilter,
        clearFilter
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(OKRFilter);