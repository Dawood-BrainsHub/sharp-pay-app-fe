import { Link as RouterLink } from 'react-router-dom';
import { Typography } from '@mui/material';

const CustomRouterLink = ({ to, children, ...props }) => {
  return (
    <RouterLink to={to} style={{ textDecoration: 'none' }}>
      <Typography
        component="span"
        color="primary"
        fontWeight={500}
        {...props}
      >
        {children}
      </Typography>
    </RouterLink>
  );
};

export default CustomRouterLink;
