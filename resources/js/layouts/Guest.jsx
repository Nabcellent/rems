import HomeFooter from "@/components/home/HomeFooter";
import HomeHeader from "@/components/home/HomeHeader";
import logoDark from "@/assets/images/logo-dark.svg";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import { Head } from "@inertiajs/inertia-react";

const Guest = ({ children }) => {
    return (
        <>
            <Head>
                <link rel="icon" href={logoDark} />
            </Head>
            <HomeHeader />
            <Container>
                <Toolbar />
                {children}
            </Container>
            <HomeFooter />
        </>
    );
};

export default Guest;
