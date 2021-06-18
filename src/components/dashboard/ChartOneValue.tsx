import React, {useCallback, useState} from "react";
import {
    ComposedChart,
    Line,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from "recharts";
import {ContainerHoverChart, TextChart} from "./style";

type ChartFullProps={
    data :ChartOneValue[]
}

export type ChartOneValue = {
    value: number,
    name: string
}

function CustomTooltip({ payload, label, active } :any) {
    console.log(payload)
    if (active && payload) {
        return (
            <ContainerHoverChart>
                <TextChart>{`${payload[0].payload.name}`}</TextChart>
                <TextChart>{`value: ${payload[0].payload.value}`}</TextChart>
            </ContainerHoverChart>
        );
    }

    return null;
}


export const ChartOneValue= ({data}:ChartFullProps) =>{
    const [opacity, setOpacity] = useState({
        uv: 1,
        pv: 1
    });



    return <ComposedChart
        width={550}
        height={350}
        data={data}
        margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20
        }}
    >
        <CartesianGrid stroke="#f5f5f5" />
        {/*<XAxis dataKey="name" scale="band" />*/}
        <YAxis />
        <Tooltip wrapperStyle={{ width: 100, backgroundColor: '#ccc' }} content={CustomTooltip} />
        <Bar dataKey="value" barSize={20} fill="#413ea0" />
        <Line type="monotone" dataKey="value" stroke="#ff7300"             strokeWidth={"2px"}
        />
    </ComposedChart>
}