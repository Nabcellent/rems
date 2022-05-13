import Breadcrumbs from '@/components/common/Breadcrumb';
import Dashboard from '@/layouts/Dashboard';
import { Avatar, Button, Paper, useTheme } from '@mui/material';

const Show = ({ errors, user }) => {
    const theme = useTheme();
    console.log(user);

    return (
        <Dashboard errors={errors} title={'Transaction'}>
            <Breadcrumbs title="Users" breadcrumbItem={user.email}/>

            <Paper className={'mb-3'}>
                <div className="position-relative min-vh-25 mb-7 card-header">
                    <div className="bg-holder rounded-3 rounded-bottom-0"
                         style={{ backgroundImage: 'url(/images/users/profile-default.jpg)' }}></div>
                    <Avatar sx={{
                        position: 'absolute',
                        bottom: 0,
                        fontSize: '20pt',
                        transform: 'translateY(50%)',
                        width: '10rem',
                        height: '10rem',
                        backgroundColor: theme.palette.primary.main
                    }} src={`/images/users/${user.image}`}>
                        {user.initials}
                    </Avatar>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-lg-8">
                            <h4 className="mb-1">
                                {user.full_name}
                                <i className={'bx bxs-check-circle'}/>
                            </h4>
                            <h5 className="fs-0 fw-normal">{user.email}</h5>
                            <p className="text-500">{user.user_roles_str}</p>
                            <Button variant={'outlined'} className="px-3 btn btn-falcon-primary btn-sm">Following</Button>
                            <Button variant={'outlined'} className="px-3 ms-2 btn btn-falcon-default btn-sm">Notify</Button>
                            <div className="border-dashed-bottom my-4 d-lg-none"></div>
                        </div>
                        <div className="ps-2 ps-lg-3 col">
                            <a href="/user/profile#!">
                                <div className="d-flex align-items-center mb-2">
                                    <Avatar sx={{width:30, height:30}} className="me-2"/>
                                    <div className="flex-1"><h6 className="mb-0">See followers (330)</h6></div>
                                </div>
                            </a>
                            <a href="/user/profile#!">
                                <div className="d-flex align-items-center mb-2">
                                    <img
                                        src="data:image/png;base64,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"
                                        alt="Google" width="30" className="me-2"/>
                                    <div className="flex-1"><h6 className="mb-0">Google</h6></div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </Paper>
        </Dashboard>
    );
};

export default Show;
