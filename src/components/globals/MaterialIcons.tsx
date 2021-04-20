import React from "react"

const MaterialIcon = ({iconName, id}: { iconName: string; id?: string }) => {
    return (
        <i className={"material-icons"} id={id}>{iconName}</i>
    )
};

export default MaterialIcon