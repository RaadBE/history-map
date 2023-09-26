import React, {useContext } from 'react';
import {DataContext} from "./DataContext";

function Anda() {
    const { data, setData } = useContext(DataContext);
    return (

    console.log('why here ?',data)

    );

}
export default Anda;
