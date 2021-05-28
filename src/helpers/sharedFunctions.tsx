import React from "react";

export const getDayNameByNumber = (dateNumber: number) => {
    switch (dateNumber) {
        case 1: {
            return "Monday"
        }
        case 2: {
            return "Tuesday"
        }
        case 3: {
            return "Wednesday"
        }
        case 4: {
            return "Thursday"
        }
        case 5: {
            return "Friday"
        }
        case 6: {
            return "Saturday"
        }
        case 7: {
            return "Sunday"
        }
    }
}