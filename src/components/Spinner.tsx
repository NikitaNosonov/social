import React from 'react';
import {Box, CircularProgress} from "@mui/material";

const Spinner = ({ size = 40, color = 'primary' }) => {
    return (
        <Box display="flex" justifyContent="center" textAlign="center" p={3} margin="35vh 30vw">
            <CircularProgress
                size={size}
                color='primary'
            />
        </Box>
    );
};

export default Spinner;