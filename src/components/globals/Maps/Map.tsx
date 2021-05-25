import React, {useCallback} from "react";

import {GoogleMap, Marker, useLoadScript} from "@react-google-maps/api"
import {GOOGLE_API_KEY} from "../../../constants/globalConstants";
import {Libraries} from "@react-google-maps/api/dist/utils/make-load-script-url";
import mapStyles from "./mapStyles"
import pin from "../../../assets/food-pin-pngrepo-com.png"
import {useSettingsDispatch, useSettingsState} from "../../settings/SettingsContext";
import {setMark} from "../../settings/SettingsActions";

const libraries = ["places"];
const mapContainerStyle = {
    width: "400px",
    height: "400px",
}

const options = {
    styles: mapStyles,
} as google.maps.MapOptions



const Map = ( )=> {
    const dispatch = useSettingsDispatch();
    const settingsState = useSettingsState();
    const {mark} = settingsState;

    const onMapClick = useCallback((event) => {
        setMark({dispatch: dispatch, mark: {lat: event.latLng.lat(), lng: event.latLng.lng()}})
    }, [])

    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: GOOGLE_API_KEY ? GOOGLE_API_KEY : "",
        libraries: libraries as Libraries
    })


    if (loadError) return <>Error loading maps</>;
    if (!isLoaded) return <>Is loading</>
    return <>
        <GoogleMap mapContainerStyle={mapContainerStyle}
                   zoom={16}
                   center={mark}
                   options={options}
                   onClick={onMapClick}><Marker position={mark}
                                                icon={{
                                                    url: pin,
                                                    scaledSize: new window.google.maps.Size(50, 50),

                                                }}/> </GoogleMap>
    </>
}

export default Map