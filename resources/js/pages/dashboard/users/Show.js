import Breadcrumbs from '@/components/common/Breadcrumb';
import Dashboard from '@/layouts/Dashboard';
import { Avatar, Button, Divider, Paper, useTheme } from '@mui/material';
import { Female, Male, PhoneIphone, ToggleOff, ToggleOn } from '@mui/icons-material';
import { Gender, Status } from '@/utils/enums';
import StatusBadge from '@/components/StatusBadge';
import PhoneBadge from '@/components/PhoneBadge';

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
                            <h6 className="fs-0 fw-normal">{user.email}</h6>
                            <p className="text-500">{user.user_roles_str}</p>
                            <Button variant={'outlined'}
                                    className="px-3 btn btn-falcon-primary btn-sm">Following</Button>
                            <Button variant={'outlined'}
                                    className="px-3 ms-2 btn btn-falcon-default btn-sm">Notify</Button>
                            <div className="border-dashed-bottom my-4 d-lg-none"></div>
                        </div>
                        <div className="ps-2 ps-lg-3 col">
                            <div className="d-flex align-items-center mb-2">
                                <Avatar sx={{ width: 30, height: 30 }} className="me-2">
                                    {user.status === Status.ACTIVE
                                        ? <ToggleOn fontSize={'small'}/>
                                        : <ToggleOff fontSize={'small'}/>}
                                </Avatar>
                                <div className="flex-1"><StatusBadge status={user.status}/></div>
                            </div>
                            <div className="d-flex align-items-center mb-2">
                                <Avatar sx={{ width: 30, height: 30 }} className="me-2">
                                    {user.gender === Gender.MALE
                                        ? <Male fontSize={'small'}/>
                                        : <Female fontSize={'small'}/>}
                                </Avatar>
                                <div className="flex-1"><h6 className="mb-0">{user.gender.toUpperCase()}</h6></div>
                            </div>
                            <Divider sx={{ my: 2 }}/>
                            <div className="d-flex align-items-center mb-2">
                                <Avatar sx={{ width: 30, height: 30 }} className="me-2">
                                    <PhoneIphone fontSize={'small'}/>
                                </Avatar>
                                <div className="flex-1"><PhoneBadge phone={user.phone}/></div>
                            </div>
                        </div>
                    </div>
                </div>
            </Paper>
        </Dashboard>
    );
};

export default Show;
