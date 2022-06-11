import HomeFooter from "@/components/home/HomeFooter";
import HomeHeader from "@/components/home/HomeHeader";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";

const Guest = ({ children }) => {
    return (
        <>
            <HomeHeader />
            <Container>
                <Toolbar />
                {children}
            </Container>
            <HomeFooter />
        </>
    );
}

export default Guest;