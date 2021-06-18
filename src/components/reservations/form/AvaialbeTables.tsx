import React from "react";
import {AreaWithTables, useReservationsState} from "../ReservationsContext";
import "./style"
import {ColumnContainer, FlexContainerTables, Line, NameArea, TableContainer, TextTable} from "./style";
import _ from "lodash";

type AvailableTablesProps = {
    selectedTable: string[],
    clickTable: (id: string) => void;
    listTables: AreaWithTables[];
}

export const AvailableTables = ({selectedTable, clickTable, listTables}: AvailableTablesProps) => {
    return <>{listTables && !_.isEmpty(listTables) && listTables.map((area, index) => {
        return <ColumnContainer>
            <NameArea>{area.name}</NameArea>
            <FlexContainerTables>
                {area.tables && !_.isEmpty(area.tables)&&selectedTable && area.tables.map((table, indexTable) => {
                    let findInList: false | number =-1;
                    findInList = selectedTable.findIndex((tableFind) => tableFind == table.id)
                    return <TableContainer selected={findInList != -1} onClick={() => {
                        if (table.availableNow) {
                            clickTable(table.id)
                        }
                    }}>
                        <TextTable>{table.number}</TextTable>
                        <TextTable>{table.minPeople} - {table.maxPeople}</TextTable>
                        <Line green={table.availableNow} red={table.availableNow}/>
                    </TableContainer>
                })}
            </FlexContainerTables>
        </ColumnContainer>
    })}
    </>
}