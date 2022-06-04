import moment from 'moment';
import { Typography } from '@mui/material';
import { isToday, isYesterday } from '@/utils/helpers';
import PropTypes from 'prop-types';

const TableDate = ({ date }) => {
    let relativeDate;
    if (isToday(moment(date))) {
        relativeDate = "Today";
    } else if (isYesterday(moment(date))) {
        relativeDate = "Yesterday";
    } else {
        relativeDate = moment(date).format("D.M.y");
    }

    return (
        <>
            <strong>{moment(date).format("hh:mm A")}</strong><br/>
            <Typography variant={"caption"}>{relativeDate}</Typography>
        </>
    );
};

TableDate.propTypes = {
    date: PropTypes.string.isRequired
};

export default TableDate;
