import React, { Component } from 'react';

import './OKRAccordion.scss';

export default class OKRAccordion extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false
        }

        this.onToggle = this.onToggle.bind(this);
    }

    onToggle() {
        this.setState({
            open: !this.state.open
        })
    }

    render() {
        let { id, title, children } = this.props;
        const { open } = this.state;

        children = children || [];

        return (
            <div className={`okr-accordion ` + (open ? 'open': '')}>
                <div className="title" onClick={this.onToggle}>
                    <span className="counter">{id}.</span> 
                    <span className="name">{title}</span>
                </div>

                <div className="children">
                    {children.map((c, i) => (
                        <div key={i} className="item">
                            {c}
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}