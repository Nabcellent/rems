import PropTypes from "prop-types";
import React, { Component } from "react";

import { connect } from "react-redux";

//SimpleBar
import SimpleBar from "simplebar-react";

//Import images

class RightSidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            layoutType: this.props.layoutType,
            sidebarType: this.props.leftSideBarType,
            layoutWidth: this.props.layoutWidth,
            sidebarTheme: this.props.leftSideBarTheme,
            sidebarThemeImage: this.props.leftSideBarThemeImage,
            topbarTheme: this.props.topbarTheme,
        };
        this.hideRightbar = this.hideRightbar.bind(this);
        this.changeLayout = this.changeLayout.bind(this);
        this.changeLayoutWidth = this.changeLayoutWidth.bind(this);
        this.changeLeftSidebarTheme = this.changeLeftSidebarTheme.bind(this);
        this.changeLeftSidebarThemeImage =
            this.changeLeftSidebarThemeImage.bind(this);
        this.changeLeftSidebarType = this.changeLeftSidebarType.bind(this);
        this.changeTopbarTheme = this.changeTopbarTheme.bind(this);
        this.changeThemePreloader = this.changeThemePreloader.bind(this);
    }

    /**
     * Hides the right sidebar
     */
    hideRightbar(e) {
        e.preventDefault();
        this.props.hideRightSidebar();
    }
    componentDidMount() {
        this.setState({
            layoutType: this.props.layoutType,
            sidebarType: this.props.leftSideBarType,
            layoutWidth: this.props.layoutWidth,
            sidebarTheme: this.props.leftSideBarTheme,
            sidebarThemeImage: this.props.leftSideBarThemeImage,
            topbarTheme: this.props.topbarTheme,
        });
    }

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            this.setState({
                layoutType: this.props.layoutType,
                sidebarType: this.props.leftSideBarType,
                layoutWidth: this.props.layoutWidth,
                sidebarTheme: this.props.leftSideBarTheme,
                sidebarThemeImage: this.props.leftSideBarThemeImage,
                topbarTheme: this.props.topbarTheme,
            });
        }
    }

    changeThemePreloader = () => {
        this.props.changePreloader(!this.props.isPreloader);
    };
    /**
     * Change the layout
     * @param {*} e
     */
    changeLayout(e) {
        if (e.target.checked) {
            this.props.changeLayout(e.target.value);
        }
    }

    /**
     * Changes layout width
     * @param {*} e
     */
    changeLayoutWidth(e) {
        if (e.target.checked) {
            this.props.changeLayoutWidth(e.target.value);
        }
    }

    // change left sidebar design
    changeLeftSidebarType(e) {
        if (e.target.checked) {
            this.props.changeSidebarType(e.target.value);
        }
    }

    // change left sidebar theme
    changeLeftSidebarTheme(e) {
        if (e.target.checked) {
            this.props.changeSidebarTheme(e.target.value);
        }
    }

    changeLeftSidebarThemeImage(e) {
        if (e.target.checked) {
            this.props.changeSidebarThemeImage(e.target.value);
        }
    }

    // change topbar theme
    changeTopbarTheme(e) {
        if (e.target.checked) {
            this.props.changeTopbarTheme(e.target.value);
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="right-bar" id="right-bar">
                    <SimpleBar style={{ height: "900px" }}>
                        <div data-simplebar className="h-100">

                            <hr className="my-0" />

                        </div>
                    </SimpleBar>
                </div>
                <div className="rightbar-overlay" />
            </React.Fragment>
        );
    }
}

RightSidebar.propTypes = {
    changeLayout: PropTypes.func,
    changeLayoutWidth: PropTypes.func,
    changePreloader: PropTypes.func,
    changeSidebarTheme: PropTypes.func,
    changeSidebarThemeImage: PropTypes.func,
    changeSidebarType: PropTypes.func,
    changeTopbarTheme: PropTypes.func,
    hideRightSidebar: PropTypes.func,
    isPreloader: PropTypes.bool,
    layoutType: PropTypes.any,
    layoutWidth: PropTypes.any,
    leftSideBarTheme: PropTypes.any,
    leftSideBarThemeImage: PropTypes.any,
    leftSideBarType: PropTypes.any,
    toggleRightSidebar: PropTypes.func,
    topbarTheme: PropTypes.any,
};

const mapStatetoProps = state => {
    return { ...state.Layout };
};

export default connect(mapStatetoProps, {
    hideRightSidebar,
    changeLayout,
    changeSidebarTheme,
    changeSidebarThemeImage,
    changeSidebarType,
    changeLayoutWidth,
    changeTopbarTheme,
    changePreloader,
    toggleRightSidebar
})(RightSidebar);
