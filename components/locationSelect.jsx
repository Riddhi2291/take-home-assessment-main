import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import LocationContext from "../src/store/context/location-context";
import { LOCATIONS } from "../src/constants/location";

/**
 * @param onChange A callback function that is triggered when the selected element changes
 */
export default function LocationSelect({ onChange, style, ...props }) {
  const ctx = useContext(LocationContext);

  const handleChange = (e) => {
    ctx?.onLocationChange(e?.target?.value)
  };

  useEffect(() => {
    if (typeof onChange === "function") onChange(ctx?.location);
  }, [ctx?.location]);

  return (
    <FormControl fullWidth style={{ margin: "1em 0", ...style }}>
      <InputLabel id="location-select-label">Location</InputLabel>

      <Select
        labelId="location-select-label"
        id="location-select"
        label="Location"
        value={ctx?.location}
        onChange={handleChange}
      >
        {LOCATIONS.map((location) => (
          <MenuItem key={`key-${location.name}`} value={location}>
            {location.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

LocationSelect.propTypes = {
  onChange: PropTypes.func,
};
