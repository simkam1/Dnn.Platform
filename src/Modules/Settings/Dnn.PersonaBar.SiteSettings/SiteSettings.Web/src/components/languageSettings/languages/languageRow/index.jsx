import React, { Component, PropTypes } from "react";
import ReactDOM from "react-dom";
import Collapse from "react-collapse";
import "./style.less";
import { CheckMarkIcon, SettingsIcon, UsersIcon, LanguagesIcon } from "dnn-svg-icons";

class LanguageRow extends Component {
    componentWillMount() {
        let opened = (this.props.openId !== "" && this.props.id === this.props.openId);
        this.setState({
            opened
        });
    }

    toggle(mode) {
        if ((this.props.openId !== "" && this.props.id === this.props.openId)) {
            //this.props.Collapse();
        }
        else {
            this.props.OpenCollapse(this.props.id, mode);
            this.setState({
                openedMode: mode
            });
        }
    }

    getLanguageNameDisplay(name, icon, isDefault) {
        if (this.props.id !== "add") {
            return <div>
                <div className="language-flag">
                    <img src={icon} />
                </div>
                <div className="language-name">{isDefault ? name + " **" : name}</div>
            </div>;
        }
        else return <span>-</span>;
    }

    /* eslint-disable react/no-danger */
    getBooleanDisplay(prop) {
        if (this.props.id !== "add") {
            if (prop) {
                return <div className="checkMarkIcon" dangerouslySetInnerHTML={{ __html: CheckMarkIcon }}></div>;
            }
            else return <span>&nbsp; </span>;
        }
        else return <span>-</span>;
    }

    getTranslatorBtnClassName() {
        const {props, state} = this;
        let name = "translator-icon";
        if (props.openId !== "" && props.id === this.props.openId) {
            if (props.openId !== "add") {
                if (state.openedMode === 1) {
                    name = "translator-icon-disable";
                }
                else {
                    name = "translator-icon-active";
                }
            }
            else {
                name = "translator-icon-hidden";
            }
        }
        return name;
    }

    getEditBtnClassName() {
        const {props, state} = this;
        let name = "edit-icon";
        if (this.props.openId !== "" && this.props.id === this.props.openId) {
            if (props.openId !== "add") {
                if (state.openedMode === 2) {
                    name = "edit-icon-disable";
                }
                else {
                    name = "edit-icon-active";
                }
            }
            else {
                name = "edit-icon-hidden";
            }
        }
        return name;
    }

    getEditorBtnClassName() {
        const {props, state} = this;
        let name = "editor-icon";
        if (this.props.openId !== "" && this.props.id === this.props.openId) {
            if (props.openId !== "add") {
                name = "editor-icon-disable";
            }
            else {
                name = "editor-icon-hidden";
            }
        }
        return name;
    }

    /* eslint-disable react/no-danger */
    render() {
        const {props, state} = this;
        let opened = (this.props.openId !== "" && this.props.id === this.props.openId);
        return (
            <div className={"collapsible-component-language"}>
                <div className={"collapsible-header-language " + !opened} >
                    <div className={"row"}>
                        <div className="language-item item-row-name">
                            {this.getLanguageNameDisplay(props.name, props.icon, props.isDefault)}
                        </div>
                        <div className="language-item item-row-enabled">
                            {this.getBooleanDisplay(props.enabled)}
                        </div>
                        <div className="language-item item-row-actionButtons">
                            <div className={this.getEditorBtnClassName()} dangerouslySetInnerHTML={{ __html: LanguagesIcon }} onClick={props.onOpenEditor.bind(this)}></div>
                            {!props.isDefault &&
                                <div className={this.getTranslatorBtnClassName()} dangerouslySetInnerHTML={{ __html: UsersIcon }} onClick={this.toggle.bind(this, 2)}></div>
                            }
                            <div className={this.getEditBtnClassName()} dangerouslySetInnerHTML={{ __html: SettingsIcon }} onClick={this.toggle.bind(this, 1)}></div>
                        </div>
                    </div>
                </div>
                <Collapse isOpened={opened} style={{ float: "left", width: "100%" }}>{opened && props.children}</Collapse>
            </div>
        );
    }
}

LanguageRow.propTypes = {
    languageId: PropTypes.number,
    name: PropTypes.string,
    code: PropTypes.string,
    icon: PropTypes.string,
    enabled: PropTypes.bool,
    isDefault: PropTypes.bool,
    OpenCollapse: PropTypes.func,
    Collapse: PropTypes.func,
    id: PropTypes.string,
    openId: PropTypes.string,
    onOpenEditor: PropTypes.func
};

LanguageRow.defaultProps = {
    collapsed: true
};
export default (LanguageRow);
