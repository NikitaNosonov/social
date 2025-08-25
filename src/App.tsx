import React from 'react';
import * as S from './App.style';
import {router} from "./routes/Routes";
import {RouterProvider} from "react-router-dom";

function App() {
    return (
        <S.App>
            <RouterProvider router={router}/>
        </S.App>
    );
}

export default App;
