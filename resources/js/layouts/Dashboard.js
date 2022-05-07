import { lazy, useEffect, useState } from "react";
import PropTypes from 'prop-types';

// Layout Related Components
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { Head } from '@inertiajs/inertia-react';

const Footer = lazy(() => import('../components/Footer'));

const Dashboard = ({
    title,
    children,
    leftSideBarTheme,
    leftSideBarType,
    isPreloader,
    changeSidebarTheme,
    leftSideBarThemeImage, changeSidebarThemeImage,
    layoutWidth, changeLayoutWidth,
    changeSidebarType,
    topbarTheme, changeTopbarTheme,
    toggleRightSidebar
}) => {
    const [isMobile, setIsMobile] = useState(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    const capitalizeFirstLetter = string => {
        return string.charAt(1).toUpperCase() + string.slice(2);
    };

    useEffect(() => {
        document.body.addEventListener("click", hideRightBar, true);

        if (isPreloader === true) {
            document.getElementById("preloader").style.display = "block";
            document.getElementById("status").style.display = "block";

            setTimeout(function () {
                document.getElementById("preloader").style.display = "none";
                document.getElementById("status").style.display = "none";
            }, 2500);
        } else {
            document.getElementById("preloader").style.display = "none";
            document.getElementById("status").style.display = "none";
        }

        // Scroll Top to 0
        window.scrollTo(0, 0);

        if (leftSideBarTheme) {
            changeSidebarTheme(leftSideBarTheme);
        }

        if (leftSideBarThemeImage) {
            changeSidebarThemeImage(leftSideBarThemeImage);
        }

        if (layoutWidth) {
            changeLayoutWidth(layoutWidth);
        }

        if (leftSideBarType) {
            changeSidebarType(leftSideBarType);
        }
        if (topbarTheme) {
            changeTopbarTheme(topbarTheme);
        }
    });

    const toggleMenuCallback = () => {
        let body = document.body;
        if (window.screen.width <= 998) {
            body.classList.toggle("sidebar-enable");
        } else {
            body.classList.toggle("vertical-collpsed");
            body.classList.toggle("sidebar-enable");
        }
    };

    // //hides right sidebar on body click
    const hideRightBar = (event) => {
        let rightBar = document.getElementById("right-bar");

        //if clicked in inside right bar, then do nothing
        if (!(rightBar && rightBar.contains(event.target))) {
            if (document.body.classList.contains('right-bar-enabled')) toggleRightSidebar(false);
        }
    };

    return (
        <>
            <Head><title>{title}</title></Head>

            <div id="preloader">
                <div id="status">
                    <div className="spinner-chase">
                        <div className="chase-dot"></div>
                        <div className="chase-dot"></div>
                        <div className="chase-dot"></div>
                        <div className="chase-dot"></div>
                        <div className="chase-dot"></div>
                        <div className="chase-dot"></div>
                    </div>
                </div>
            </div>

            <div id="layout-wrapper">
                <Header toggleMenuCallback={toggleMenuCallback}/>
                <Sidebar
                    theme={leftSideBarTheme}
                    type={leftSideBarType}
                    isMobile={isMobile}
                />
                <div className="main-content">
                    <div className="page-content">
                        {children}
                    </div>
                </div>
                <Footer/>
            </div>
        </>
    );
};

Dashboard.propTypes = {
    title: PropTypes.string,
    changeLayoutWidth: PropTypes.func,
    changeSidebarTheme: PropTypes.func,
    changeSidebarThemeImage: PropTypes.func,
    changeSidebarType: PropTypes.func,
    changeTopbarTheme: PropTypes.func,
    children: PropTypes.any,
    isPreloader: PropTypes.bool,
    layoutWidth: PropTypes.any,
    leftSideBarTheme: PropTypes.any,
    leftSideBarThemeImage: PropTypes.any,
    leftSideBarType: PropTypes.any,
    location: PropTypes.object,
    showRightSidebar: PropTypes.any,
    toggleRightSidebar: PropTypes.any,
    topbarTheme: PropTypes.any
};

export default Dashboard;
