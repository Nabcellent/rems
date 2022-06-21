import { useEffect } from "react";
import PropTypes from 'prop-types';

// Layout Related Components
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { Head, usePage } from '@inertiajs/inertia-react';

const Dashboard = ({ title, children, isPreloader }) => {
    const { toast: toastData } = usePage().props;

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    useEffect(() => {
        if (toastData) sweet(toastData);

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
            document.getElementById('sidebar-greeting').classList.toggle('d-none');

            body.classList.toggle("sidebar-enable");
        } else {
            document.getElementById('sidebar-greeting').classList.toggle('d-none');

            body.classList.toggle("vertical-collpsed");
            body.classList.toggle("sidebar-enable");
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
                <Sidebar isMobile={isMobile}/>

                <div className="main-content">
                    <Header toggleMenuCallback={() => toggleMenuCallback()}/>

                    <div className="p-3">{children}</div>

                    <Footer/>
                </div>
            </div>
        </>
    );
};

Dashboard.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.any.isRequired,
    isPreloader: PropTypes.bool,
};

export default Dashboard;
