import Breadcrumbs from '@/components/common/Breadcrumb';
import Dashboard from '@/layouts/Dashboard';
import { Avatar, Grid, Paper, TextField } from '@mui/material';
import { Card, Col, Row } from 'react-bootstrap';
import General from '@/pages/dashboard/settings/General';

const Index = ({ general }) => {
    console.log(general);

    return (
        <Dashboard title={'Settings'}>
            <Breadcrumbs title={'REMS'} breadcrumbItem={'Settings'}/>

            <Paper className={'mb-3'}>
                <div className="position-relative min-vh-25 mb-8 card-header">
                    <div className="bg-holder rounded-3 rounded-bottom-0"
                         style={{ backgroundImage: 'url(/images/users/profile-default.jpg)' }}></div>
                    <Avatar sx={{
                        position: 'absolute',
                        bottom: 0,
                        fontSize: '20pt',
                        transform: 'translateY(50%)',
                        width: '10rem',
                        height: '10rem',
                    }}>
                        REMS
                    </Avatar>
                </div>
            </Paper>

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
