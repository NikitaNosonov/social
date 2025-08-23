import React from 'react';
import {Box, CircularProgress} from "@mui/material";

const Spinner = ({ size = 40, color = 'primary' }) => {
    return (
        <Box display="flex" justifyContent="center" alignItems="center" p={3}>
            <CircularProgress
                size={size}
                color='primary'
            />
        </Box>
    );
};

export default Spinner;