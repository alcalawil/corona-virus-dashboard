import React, { useState } from "react";
import {
  DatePicker as DatePickerMUI,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import "moment/locale/es";
import moment from "moment";

// set spanish
moment.locale("es");
const locale = "es";

const DatePicker = ({ onChange, minDate, maxDate, defaultDate }) => {
  const [date, setDate] = useState(defaultDate);
  const [classes, setClasses] = useState("dropdown");

  const handleChange = (date) => {
    setDate(date);
    onChange(date);
    onDatePickerClick();
  };

  const onDatePickerClick = () => {
    if (classes === "dropdown") {
      setClasses("dropdown show-dropdown open");
    } else {
      setClasses("dropdown");
    }
  };

  return (
    <div className="fixed-plugin">
      <div id="fixedPluginClasses" className={classes}>
        <div onClick={onDatePickerClick}>
          <i className="fa fa-calendar fa-2x" />
        </div>
        <ul className="dropdown-menu">
          <div className="pull-right">
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <DatePickerMUI
                autoOk
                orientation="landscape"
                variant="static"
                openTo="date"
                value={date}
                defaultValue={defaultDate}
                onChange={handleChange}
                locale={locale}
                minDate={minDate}
                maxDate={maxDate}
              />
            </MuiPickersUtilsProvider>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default DatePicker;
