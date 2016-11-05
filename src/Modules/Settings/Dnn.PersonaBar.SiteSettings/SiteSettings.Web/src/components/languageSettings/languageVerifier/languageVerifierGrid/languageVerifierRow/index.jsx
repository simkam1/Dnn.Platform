import React, { Component, PropTypes } from "react";
import ReactDOM from "react-dom";
import Collapse from "react-collapse";
import "./style.less";
import { CheckMarkIcon, SettingsIcon, UsersIcon, LanguagesIcon } from "dnn-svg-icons";

class LanguageVerifierRow extends Component {
    componentWillMount() {
        let opened = (this.props.openId !== "" && this.props.id === this.props.openId);
        this.setState({
            opened
        });
    }

    toggle() {
        if ((this.props.openId !== "" && this.props.id === this.props.openId)) {
            //this.props.Collapse();
        }
        else {
            this.props.OpenCollapse(this.props.id);
        }
    }    

    /* eslint-disable react/no-danger */
    render() {
        const {props, state} = this;
        let opened = (this.props.openId !== "" && this.props.id === this.props.openId);
        return (
            <div className={"collapsible-component-verifier"}>
                <div className={"collapsible-header-verifier " + !opened} >
                    <div className={"row"}>
                        <div className="verifier-item item-row-name" onClick={this.toggle.bind(this)}>
                            {props.text}
                        </div>                        
                    </div>
                </div>
                <Collapse isOpened={opened} style={{ float: "left", width: "100%" }}>{opened && props.children}</Collapse>
            </div>
        );
    }
}

LanguageVerifierRow.propTypes = {
    text: PropTypes.string,
    OpenCollapse: PropTypes.func,
    Collapse: PropTypes.func,
    id: PropTypes.string,
    openId: PropTypes.string
};

LanguageVerifierRow.defaultProps = {
    collapsed: true
};
export default (LanguageVerifierRow);
