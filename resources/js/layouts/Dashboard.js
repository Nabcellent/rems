import { lazy, useEffect, useState } from "react";
import PropTypes from 'prop-types';

// Layout Related Components
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { Head, usePage } from '@inertiajs/inertia-react';
import { Container } from 'react-bootstrap';

const Footer = lazy(() => import('../components/Footer'));

const Dashboard = ({
    title,
    children,
    isPreloader,
    leftSideBarTheme,
    leftSideBarType,
    toggleRightSidebar
}) => {
    const { toast: toastData } = usePage().props;

    const [isMobile, setIsMobile] = useState(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));

    useEffect(() => {
        if (toastData) sweet(toastData);

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
    }, [toastData]);

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
                <Sidebar theme={leftSideBarTheme} type={leftSideBarType} isMobile={isMobile}/>
                <div className="main-content">
                    <div className="page-content"><Container fluid>{children}</Container></div>
                </div>
                <Footer/>
            </div>
        </>
    );
};

Dashboard.propTypes = {
    title: PropTypes.string,
    children: PropTypes.any,
    isPreloader: PropTypes.bool,
    leftSideBarTheme: PropTypes.any,
    leftSideBarThemeImage: PropTypes.any,
    leftSideBarType: PropTypes.any,
};

export default Dashboard;
