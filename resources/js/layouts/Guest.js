import HomeFooter from "@/components/home/HomeFooter";
import HomeHeader from "@/components/home/HomeHeader";
import Container from "@mui/material/Container";

const Guest = ({ children }) => {
    return (
        <>
            <HomeHeader />
            <Container>
                {children}
            </Container>
            <HomeFooter />
        </>
    );
}

export default Guest;