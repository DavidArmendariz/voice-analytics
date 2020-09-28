import React, { useState, useEffect } from "react";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

const Options = ({ title, options, handleChange }) => {
  const classes = useStyles();
  const [firstValue, setFirstValue] = useState(
    options[Object.keys(options)[0]]
  );
  useEffect(() => {handleChange(firstValue)})
  return (
    <FormControl className={classes.formControl}>
      <InputLabel>{title}</InputLabel>
      <Select
        value={firstValue}
        onChange={event => {
          setFirstValue(event.target.value);
          handleChange(event.target.value);
        }}
      >
        {Object.entries(options).map((option, index) => (
          <MenuItem key={index} value={option[1]}>
            {option[0]}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Options;
