import { FaPlaystation, FaXbox } from "react-icons/fa";
import { FaComputerMouse } from "react-icons/fa6";
import React from "react";

interface Device {
    name: string;
    Icon:any
}

export const compatibleDevices: Device[] = [
    {
        name: "PC",
        Icon: FaComputerMouse
    },
    {
        name: "PlayStation",
        Icon: FaPlaystation
    },
    {
        name: "Xbox",
        Icon: FaXbox
    }
];
