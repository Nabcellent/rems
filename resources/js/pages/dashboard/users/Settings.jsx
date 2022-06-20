import Breadcrumbs from '@/components/common/Breadcrumb';
import Dashboard from '@/layouts/Dashboard';
import { SettingsRounded } from '@mui/icons-material';
import { Col, Row } from 'react-bootstrap';
import ProfileSettings from '@/pages/dashboard/users/components/ProfileSettings';
import AccountSettings from '@/pages/dashboard/users/components/AccountSettings';
import BillingSettings from '@/pages/dashboard/users/components/BillingSettings';
import DangerZone from '@/pages/dashboard/users/components/DangerZone';
import ChangePassword from '@/pages/dashboard/users/components/ChangePassword';
import ThemeSettings from '@/pages/dashboard/users/components/ThemeSettings';
import Banner from '@/components/Banner';

const Settings = ({ user, settings }) => {
    console.log(user, settings);

    return (
        <Dashboard title={'Settings'}>
            <Breadcrumbs title={'REMS'} breadcrumbItem={'Settings'}/>

            <Banner title={<SettingsRounded fontSize={'large'}/>}/>

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
