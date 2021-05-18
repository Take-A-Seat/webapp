import React from "react";
import {FieldProps} from "formik";

interface GoogleMapsFieldValues extends FieldProps{
   longitude : number;
   latitude: number;
   title : string;
}

export const GoogleMapsField =({longitude,latitude,title}:GoogleMapsFieldValues)=> {

}