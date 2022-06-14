import Breadcrumbs from '@/components/common/Breadcrumb';
import { Avatar, Paper } from '@mui/material';
import Dashboard from '@/layouts/Dashboard';
import { SettingsRounded } from '@mui/icons-material';
import { Col, Row } from 'react-bootstrap';
import ProfileSettings from '@/pages/dashboard/users/components/ProfileSettings';
import AccountSettings from '@/pages/dashboard/users/components/AccountSettings';
import BillingSettings from '@/pages/dashboard/users/components/BillingSettings';
import DangerZone from '@/pages/dashboard/users/components/DangerZone';
import ChangePassword from '@/pages/dashboard/users/components/ChangePassword';
import ThemeSettings from '@/pages/dashboard/users/components/ThemeSettings';

const Settings = ({ user, settings }) => {
    console.log(user, settings);

    return (
        <Dashboard title={'Settings'}>
            <Breadcrumbs title={'REMS'} breadcrumbItem={'Settings'}/>

            <Paper className={'mb-3 d-flex flex-column'}>
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
                    }}><SettingsRounded fontSize={'large'}/>
                    </Avatar>
                </div>
            </Paper>

            <Row className={'g-3'}>
                <Col lg={8}>
                    <ProfileSettings user={user}/>
                    <ChangePassword user={user}/>
                </Col>
                <Col lg={4}>
                    <div className="sticky-sidebar">
                        <AccountSettings settings={settings}/>
                        <BillingSettings settings={settings}/>
                        <ThemeSettings settings={settings}/>
                        <DangerZone/>
                    </div>
                </Col>
            </Row>
        </Dashboard>
    );
};

export default Settings;
