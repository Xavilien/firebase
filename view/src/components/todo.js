import React from 'react';

import {Box} from "@mui/material";
import Typography from "@mui/material/Typography";

const styles = {
    content: {
        flexGrow: 1,
        padding: 3,
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
    },
}

export default function Todo() {
    return (
        <Box sx={styles.content}>
            <Box sx={styles.toolbar} />
            <Typography paragraph>
                Hello I am todo
            </Typography>
        </Box>
    )
}