import React, { Component, PropTypes } from "react";
import ReactDOM from "react-dom";
import Collapse from "react-collapse";
import "./style.less";
import { CheckMarkIcon, EditIcon, TrashIcon, DragRowIcon } from "dnn-svg-icons";

class ProfilePropertyRow extends Component {
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
    getBooleanDisplay(prop) {
        if (this.props.id !== "add") {
            if (prop) {
                return <div className="checkMarkIcon" dangerouslySetInnerHTML={{ __html: CheckMarkIcon }}></div>;
            }
            else return <span>&nbsp; </span>;
        }
        else return <span>-</span>;
    }

    isSystemProperty(name) {
        let flag = false;
        let systemProperties = ["lastname", "firstname", "preferredtimezone", "preferredlocale"];
        if(name) {
            if (systemProperties.indexOf(name.toLowerCase()) > -1) {
                flag = true;
            }
        }
        return flag;
    }

    dragRow(){
        
    }

    /* eslint-disable react/no-danger */
    render() {
        const {props, state} = this;
        let opened = (this.props.openId !== "" && this.props.id === this.props.openId);
        return (
            <div className={"collapsible-component1"}>
                <div className={"collapsible-header1 " + !opened} >
                    <div className={"row"}>
                        <div title={props.name} className="property-item item-row-name">
                            {props.name}&nbsp; </div>
                        <div className="property-item item-row-dataType">
                            {props.dataType}</div>
                        <div className="property-item item-row-defaultVisibility">
                            {props.defaultVisibility}</div>
                        <div className="property-item item-row-required">
                            {this.getBooleanDisplay(props.required)}</div>
                        <div className="property-item item-row-visible">
                            {this.getBooleanDisplay(props.visible)}</div>
                        <div className="property-item item-row-editButton">   
                            <div className={opened ? "drag-icon-hidden" : "drag-icon"} dangerouslySetInnerHTML={{ __html: DragRowIcon }} onClick={this.dragRow.bind(this)}></div>                         
                            {!this.isSystemProperty(props.name) &&
                                <div className={opened ? "delete-icon-hidden" : "delete-icon"} dangerouslySetInnerHTML={{ __html: TrashIcon }} onClick={props.onDelete.bind(this)}></div>
                            }
                            <div className={opened ? "edit-icon-active" : "edit-icon"} dangerouslySetInnerHTML={{ __html: EditIcon }} onClick={this.toggle.bind(this)}></div>
                        </div>                        
                    </div>
                </div>
                <Collapse isOpened={opened} style={{ float: "left", width: "100%" }}>{opened && props.children}</Collapse>
            </div>
        );
    }
}

ProfilePropertyRow.propTypes = {
    propertyId: PropTypes.number,
    name: PropTypes.string,
    dataType: PropTypes.string,
    defaultVisibility: PropTypes.string,
    required: PropTypes.bool,
    visible: PropTypes.bool,
    OpenCollapse: PropTypes.func,
    Collapse: PropTypes.func,
    onDelete: PropTypes.func,
    id: PropTypes.string,
    openId: PropTypes.string
};

ProfilePropertyRow.defaultProps = {
    collapsed: true
};
export default (ProfilePropertyRow);
