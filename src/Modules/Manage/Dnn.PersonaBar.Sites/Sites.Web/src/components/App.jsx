import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import PortalList from "./PortalList";
import { visiblePanel as VisiblePanelActions, portal as PortalActions } from "../actions";
import PersonaBarPage from "dnn-persona-bar-page";
import CreatePortal from "./CreatePortal";

class App extends Component {
    constructor() {
        super();
        this.state = {
            editMode: false,
            portalBeingExported: {}
        };
    }

    onAddNewSite(event) {
        event.preventDefault();
        this.navigateMap(1);
    }

    onEditSite() { }

    onExportPortal(portalBeingExported) {
        const { props } = this;
        props.dispatch(PortalActions.setPortalBeingExported(portalBeingExported, this.navigateMap.bind(this, 2)));
    }

    navigateMap(page, event) {
        const {props} = this;
        props.dispatch(VisiblePanelActions.selectPanel(page));
    }

    cancelExport(event) {
        if (event !== undefined)
            event.preventDefault();
        this.setState({
            portalBeingExported: {}
        });
        this.navigateMap(0);
    }

    render() {
        const {props, state} = this;
        return (
            <div className="sites-Root">
                <PersonaBarPage isOpen={props.selectedPage === 0 || props.selectedPage === 2}>
                    <PortalList
                        onAddNewSite={this.onAddNewSite.bind(this)}
                        onExportPortal={this.onExportPortal.bind(this)} />
                </PersonaBarPage>
                <PersonaBarPage isOpen={props.selectedPage === 1}>
                    <CreatePortal
                        onCancel={this.navigateMap.bind(this, 0)} />
                </PersonaBarPage>
            </div>
        );
    }
}

App.PropTypes = {
    dispatch: PropTypes.func.isRequired,
    selectedPage: PropTypes.number,
    selectedPageVisibleIndex: PropTypes.number
};


function mapStateToProps(state) {
    return {
        selectedPage: state.visiblePanel.selectedPage,
        selectedPageVisibleIndex: state.visiblePanel.selectedPageVisibleIndex,
        portalBeingExported: state.portal.portalBeingExported
    };
}


export default connect(mapStateToProps)(App);
