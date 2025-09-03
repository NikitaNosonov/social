import React from 'react';
import * as S from './App.style';
import {router} from "./routes/Routes";
import {RouterProvider} from "react-router-dom";
import {GlobalStyleDark} from "./App.style";
import {GlobalStyleLight} from "./App.style";
import {Switch} from '@mui/material';


function App() {
    const [isDark, setIsDark] = React.useState(false);

    const handleToggle = () => {
        setIsDark(prev => !prev);
    }

    return (
        <S.App>
            {!isDark ? <GlobalStyleDark/> : <GlobalStyleLight/>}
            <RouterProvider router={router}/>
            <S.SwitchThemeContainer>
                <Switch
                checked={isDark}
                onChange={handleToggle}/>
            </S.SwitchThemeContainer>
        </S.App>
    );
}

export default App;
