import React, {useCallback, useState} from "react";
import {CartesianGrid, Line, LineChart, Tooltip, YAxis} from "recharts";
import {ContainerHoverChart, TextChart} from "./style";
import "./style.css";

type ChartFullProps = {
    data: ChartFull[]
}

export type ChartFull = {
    min: number,
    max: number,
    avg: number,
    name: string
}

function CustomTooltip({payload, label, active}: any) {
    console.log(payload)
    if (active && payload) {
        return (
            <ContainerHoverChart>
                <TextChart>{`${payload[0].payload.name}`}</TextChart>
                <TextChart>{`min: ${payload[0].payload.min}`}</TextChart>
                <TextChart>{`avg: ${payload[0].payload.avg}`}</TextChart>
                <TextChart>{`max: ${payload[0].payload.max}`}</TextChart>
            </ContainerHoverChart>
        );
    }

    return null;
}


export const ChartFull = ({data}: ChartFullProps) => {
    const [opacity, setOpacity] = useState({
        uv: 1,
        pv: 1
    });

    const handleMouseEnter = useCallback(
        (o) => {
            const {dataKey} = o;

            setOpacity({...opacity, [dataKey]: 0.5});
        },
        [opacity, setOpacity]
    );

    const handleMouseLeave = useCallback(
        (o) => {
            const {dataKey} = o;
            setOpacity({...opacity, [dataKey]: 1});
        },
        [opacity, setOpacity]
    );
    return <LineChart
        width={550}
        height={350}
        data={data}
        margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5
        }}
    >
        <CartesianGrid strokeDasharray="3 3"/>
        {/*<XAxis dataKey="name" />*/}
        <YAxis/>
        <Tooltip wrapperStyle={{width: 100, backgroundColor: '#ccc'}} content={CustomTooltip}/>
        <Line
            type="monotone"
            dataKey="min"
            strokeOpacity={opacity.pv}
            stroke="#f58231"
            activeDot={{r: 8}}
            strokeWidth={"2px"}

        />
        <Line
            type="monotone"
            dataKey="max"
            strokeOpacity={opacity.uv}
            stroke="#4363d8"
            strokeWidth={"2px"}

        />
        <Line
            type="monotone"
            dataKey="avg"
            strokeOpacity={opacity.uv}
            stroke="#ffe119"
            strokeWidth={"2px"}

        />
    </LineChart>
}