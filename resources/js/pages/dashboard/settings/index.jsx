import Breadcrumbs from '@/components/common/Breadcrumb';
import Dashboard from '@/layouts/Dashboard';
import { Avatar, Paper } from '@mui/material';
import { Card, Col, Row } from 'react-bootstrap';
import General from '@/pages/dashboard/settings/General';
import Banner from '@/components/Banner';

const Index = ({ general }) => {
    console.log(general);

    return (
        <Dashboard title={'Settings'}>
            <Breadcrumbs title={'REMS'} breadcrumbItem={'Settings'}/>

            <Banner title={'REMS.'}/>

            <Row className={'g-3'}>
                <Col sm={8}>
                    <Paper>
                        <Card.Header><h5 className="mb-0">General</h5></Card.Header>

                        <General settings={general}/>
                    </Paper>
                </Col>
                <Col sm={4}></Col>
            </Row>
        </Dashboard>
    );
};

export default Index;
