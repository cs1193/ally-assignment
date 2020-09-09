import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getOKR } from './OKRAction';

import OKRAccordion from '../OKRAccordion/OKRAccordion';

class OKRList extends Component {
    componentDidMount() {
        this.props.getOKR();
    }

    render() {
        const { okr, keys } = this.props;

        const list = (
            <div className="okr-lister">
                {okr.map((o, i) => (
                    <OKRAccordion key={i} id={i + 1} title={o.title} children={keys[o.id]} />
                ))}
            </div>
        );

        return list;
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
        keys: state.okr.keys
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getOKR
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(OKRList);