"use strict";
var module = module || Object.create(null);
var Symbol = Symbol || function () {};
// CORE
var D = (function () {
  var __ = { '@@functional/placeholder': true };
  function isPlaceholder (x) { return x && x['@@functional/placeholder'] === true }

  /** INITIAL VARIABLES **/
  var YEARS_IN_ERA               = 100;
  var LEAP_YEAR_EVERY_YEARS      = 4;
  var SESSIONS_IN_YEAR           = 4;
  var MONTHS_IN_SESSION          = 3;
  var DAYS_IN_ERA                = 36525;
  var DAYS_IN_CALENDAR_YEAR      = 365;
  var DAYS_ADDITION_IN_LEAP_YEAR = 1;
  var DAYS_IN_MONTH_MAX          = 31;
  var DAYS_IN_MONTH              = DAYS_IN_MONTH_MAX - 1;
  var DAYS_IN_FEBRUARY           = 28;
  var DAYS_IN_WEEK               = 7;
  var HOURS_IN_YEAR              = 8766;
  var HOURS_IN_DAY               = 24;
  var MINUTES_IN_HOUR            = 60;
  var SECONDS_IN_MINUTE          = 60;
  var MILLISECONDS_IN_SECOND     = 1000;

  var SESSIONS_IN_ERA          = SESSIONS_IN_YEAR * YEARS_IN_ERA;

  var MONTHS_IN_YEAR           = MONTHS_IN_SESSION * SESSIONS_IN_YEAR;
  var MONTHS_IN_ERA            = MONTHS_IN_SESSION * SESSIONS_IN_ERA;
  var MONTHS_DAYS_IN_LEAP_YEAR = createMonthDays(true);
  var MONTHS_DAYS_IN_YEAR      = createMonthDays(false);

  var DECEMBER  = MONTHS_IN_YEAR  - 1;
  var NOVEMBER  = DECEMBER  - 1;
  var OCTOBER   = NOVEMBER  - 1;
  var SEPTEMBER = OCTOBER   - 1;
  var AUGUST    = SEPTEMBER - 1;
  var JULY      = AUGUST    - 1;
  var JUNE      = JULY      - 1;
  var MAY       = JUNE      - 1;
  var APRIL     = MAY       - 1;
  var MARCH     = APRIL     - 1;
  var FEBRUARY  = MARCH     - 1;
  var JANUARY   = FEBRUARY  - 1;

  var SATURDAY  = DAYS_IN_WEEK - 1;
  var FRIDAY    = SATURDAY     - 1;
  var THURSDAY  = FRIDAY       - 1;
  var WEDNESDAY = THURSDAY     - 1;
  var TUESDAY   = WEDNESDAY    - 1;
  var MONDAY    = TUESDAY      - 1;
  var SUNDAY    = MONDAY       - 1;

  var DAYS_IN_YEAR                  = HOURS_IN_YEAR * HOURS_IN_DAY;
  var DAYS_IN_LEAP_YEAR             = DAYS_ADDITION_IN_LEAP_YEAR + DAYS_IN_CALENDAR_YEAR;
  var DAYS_IN_FEBRUARY_IN_LEAP_YEAR = DAYS_ADDITION_IN_LEAP_YEAR + DAYS_IN_FEBRUARY;

  var HOURS_IN_ERA           = HOURS_IN_DAY * DAYS_IN_ERA;
  var HOURS_IN_CALENDAR_YEAR = HOURS_IN_DAY * DAYS_IN_CALENDAR_YEAR;
  var HOURS_IN_LEAP_YEAR     = HOURS_IN_DAY * DAYS_IN_LEAP_YEAR;
  var HOURS_IN_WEEK          = HOURS_IN_DAY * DAYS_IN_WEEK;

  var MINUTES_IN_ERA           = MINUTES_IN_HOUR * HOURS_IN_ERA;
  var MINUTES_IN_YEAR          = MINUTES_IN_HOUR * HOURS_IN_YEAR;
  var MINUTES_IN_CALENDAR_YEAR = MINUTES_IN_HOUR * HOURS_IN_CALENDAR_YEAR;
  var MINUTES_IN_LEAP_YEAR     = MINUTES_IN_HOUR * HOURS_IN_LEAP_YEAR;
  var MINUTES_IN_WEEK          = MINUTES_IN_HOUR * HOURS_IN_WEEK;
  var MINUTES_IN_DAY           = MINUTES_IN_HOUR * HOURS_IN_DAY;

  var SECONDS_IN_ERA           = SECONDS_IN_MINUTE * MINUTES_IN_ERA;
  var SECONDS_IN_YEAR          = SECONDS_IN_MINUTE * MINUTES_IN_YEAR;
  var SECONDS_IN_CALENDAR_YEAR = SECONDS_IN_MINUTE * MINUTES_IN_CALENDAR_YEAR;
  var SECONDS_IN_LEAP_YEAR     = SECONDS_IN_MINUTE * MINUTES_IN_LEAP_YEAR;
  var SECONDS_IN_WEEK          = SECONDS_IN_MINUTE * MINUTES_IN_WEEK;
  var SECONDS_IN_DAY           = SECONDS_IN_MINUTE * MINUTES_IN_DAY;
  var SECONDS_IN_HOUR          = SECONDS_IN_MINUTE * MINUTES_IN_HOUR;

  var MILLISECONDS_IN_ERA           = MILLISECONDS_IN_SECOND * SECONDS_IN_ERA;
  var MILLISECONDS_IN_YEAR          = MILLISECONDS_IN_SECOND * SECONDS_IN_YEAR;
  var MILLISECONDS_IN_CALENDAR_YEAR = MILLISECONDS_IN_SECOND * SECONDS_IN_CALENDAR_YEAR;
  var MILLISECONDS_IN_LEAP_YEAR     = MILLISECONDS_IN_SECOND * SECONDS_IN_LEAP_YEAR;
  var MILLISECONDS_IN_WEEK          = MILLISECONDS_IN_SECOND * SECONDS_IN_WEEK;
  var MILLISECONDS_IN_DAY           = MILLISECONDS_IN_SECOND * SECONDS_IN_DAY;
  var MILLISECONDS_IN_HOUR          = MILLISECONDS_IN_SECOND * SECONDS_IN_HOUR;
  var MILLISECONDS_IN_MINUTE        = MILLISECONDS_IN_SECOND * SECONDS_IN_MINUTE;

  var START_TIME_PARTS         = [0, 0, 0, 0];
  var END_TIME_PARTS           = [HOURS_IN_DAY - 1, MINUTES_IN_HOUR - 1, SECONDS_IN_MINUTE - 1, MILLISECONDS_IN_SECOND - 1];
  var ISO_PATTERN              = /[0-9]+-((0[1-9])|10|11|12)-([0-2][0-9]|30|31)T([0-1][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]\.[0-9]{3}Z/;
  /** INITIAL VARIABLES **/

  // utility
  function _pipe2 (exec) {
    var length = exec.length;
    return function _pipe1(exec2) {
      return Object.defineProperty(function _piped2 () {
        return exec2(exec.apply(null, arguments));
      }, "length", {
        configurable : true, enumerable : false, writable : false,
        value        : length,
      })}
  }

  function _curry2(exec_2) {
    return function _curried2 (y, x) {
      switch (arguments.length) {
        case 0  : return curried2;
        case 1  : return function _curry1(x) { return exec_2(y, x) }
        default : return isPlaceholder(y) ? function (y) { return exec_2(y, x) } : exec_2(y, x);
      }
    };
  };
  function _curry2Date (exec2Dates) {
    return function _curried2Date (y, x) {
      switch (arguments.length) {
        case 0: return _curry2Date;
        case 1: {
          var yDate = new Date(y);
          return function useYDate (x) {
            return exec2Dates(yDate, new Date(x));
          }
        }
        default : {
          if (isPlaceholder(y)) {
            var xDate = new Date(x);
            return function useXDate (y) {
              return exec2Dates(xDate, new Date(y));
            }
          }
          return exec2Dates(new Date(x), new Date(y));
        }
      }
    }
  }
  function _curry3 (exec_3) {
    return function _curried3 (x, y, z) {
      switch (arguments.length) {
        case 0  : return curried3;
        case 1  : return _curry2(function (y, z) { return exec_3(x, y, z) });
        case 2  : return isPlaceholder(x)
            ? _curry2(function (x, z) { return exec_3(x, y, z) })
            : function (z) { return exec_3(x, y, z) };
        default : return isPlaceholder(x)
            ? isPlaceholder(y)
              ? _curry2(function(x, y) { return exec_3(x, y, z) })
              : function (x) { return exec_3(x, y, z) }
            : isPlaceholder(y)
              ? function (y) { return exec_3(x, y, z) }
              : exec_3(x, y, z);
      };
    };
  };

  function _concat (list1, list2) {
    var length1 = list1.length;
    if (length1 > 0) {
      var length2 = list2.length;
      if (length2 > 0) {
        var newArray = Array(length1 + length2);
        var index = 0;
        while (index < length1) {
          newArray[index] = list1[index];
          index++;
        }
        index = 0;
        while (index < length2) {
          newArray[index + length1] = list2[index];
          index++;
        }
        return newArray;
      }
      return list1;
    }
    return list2;
  }

  function date (date) {
    switch (arguments.length) {
      case 0  : return new Date;
      case 1  : return new Date(date);
      case 2  : return new Date(date, arguments[1]);
      case 3  : return new Date(date, arguments[1], arguments[2]);
      case 4  : return new Date(date, arguments[1], arguments[2], arguments[3]);
      case 5  : return new Date(date, arguments[1], arguments[2], arguments[3], arguments[4]);
      case 6  : return new Date(date, arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
      default : return new Date(date, arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6]);
    }
  }

  function identity (x) {
    return x;
  }

  // CONVERTORS
  function erasToYears (eras) {
    return eras * YEARS_IN_ERA;
  }
  function erasToSessions (eras) {
    return eras * SESSIONS_IN_ERA;
  }
  function erasToMonths (eras) {
    return eras * MONTHS_IN_ERA;
  }
  function erasToDays (eras) {
    return eras * DAYS_IN_ERA;
  }
  function erasToHours (eras) {
    return eras * HOURS_IN_ERA;
  }
  function erasToMinutes (eras) {
    return eras * MINUTES_IN_ERA;
  }
  function erasToSeconds (eras) {
    return eras * SECONDS_IN_ERA;
  }
  function erasToMilliseconds (eras) {
    return eras * MILLISECONDS_IN_ERA;
  }

  function yearsToSessions (years) {
    return years * SESSIONS_IN_YEAR;
  }
  function yearsToMonths (years) {
    return years * MONTHS_IN_YEAR;
  }
  function yearsToDays (years) {
    return years * DAYS_IN_YEAR;
  }
  function yearsToHours (years) {
    return years * HOURS_IN_YEAR;
  }
  function yearsToMinutes (years) {
    return years * MINUTES_IN_YEAR;
  }
  function yearsToSeconds (years) {
    return years * SECONDS_IN_YEAR;
  }
  function yearsToMilliseconds (years) {
    return years * MILLISECONDS_IN_YEAR;
  }
  function yearsToEras (years) {
    return years / YEARS_IN_ERA;
  }

  function weeksToDays (weeks) {
    return weeks * DAYS_IN_WEEK;
  }
  function weeksToHours (weeks) {
    return weeks * HOURS_IN_WEEK;
  }
  function weeksToMinutes (weeks) {
    return weeks * MINUTES_IN_WEEK;
  }
  function weeksToSeconds (weeks) {
    return weeks * SECONDS_IN_WEEK;
  }
  function weeksToMilliseconds (weeks) {
    return weeks * MILLISECONDS_IN_WEEK;
  }

  function daysToHours (days) {
    return days * HOURS_IN_DAY;
  }
  function daysToMinutes (days) {
    return days * MINUTES_IN_DAY;
  }
  function daysToSeconds (days) {
    return days * SECONDS_IN_DAY;
  }
  function daysToMilliseconds (days) {
    return days * MILLISECONDS_IN_DAY;
  }
  function daysToWeeks (days) {
    return days / DAYS_IN_WEEK;
  }
  function daysToYears (days) {
    return days / DAYS_IN_YEAR;
  }
  function daysToEras (days) {
    return days / DAYS_IN_ERA;
  }

  function hoursToMinutes (hours) {
    return hours * MINUTES_IN_HOUR;
  }
  function hoursToSeconds (hours) {
    return hours * SECONDS_IN_HOUR;
  }
  function hoursToMilliseconds (hours) {
    return hours * MILLISECONDS_IN_HOUR;
  }
  function hoursToDays (hours) {
    return hours / HOURS_IN_DAY;
  }
  function hoursToWeeks (hours) {
    return hours / HOURS_IN_WEEK;
  }
  function hoursToYears (hours) {
    return hours / HOURS_IN_YEAR;
  }
  function hoursToEras (hours) {
    return hours / HOURS_IN_ERA;
  }

  function minutesToSeconds (minutes) {
    return minutes * SECONDS_IN_MINUTE;
  }
  function minutesToMilliseconds (minutes) {
    return minutes * MILLISECONDS_IN_MINUTE;
  }
  function minutesToHours (minutes) {
    return minutes / MINUTES_IN_HOUR;
  }
  function minutesToDays (minutes) {
    return minutes / MINUTES_IN_DAY;
  }
  function minutesToWeeks (minutes) {
    return minutes / MINUTES_IN_WEEK;
  }
  function minutesToYears (minutes) {
    return minutes / MINUTES_IN_YEAR;
  }
  function minutesToEras (minutes) {
    return minutes / MINUTES_IN_ERA;
  }

  function secondsToMilliseconds (seconds) {
    return seconds * MILLISECONDS_IN_SECOND;
  }
  function secondsToMinutes (seconds) {
    return seconds / SECONDS_IN_MINUTE;
  }
  function secondsToHours (seconds) {
    return seconds / SECONDS_IN_HOUR;
  }
  function secondsToDays (seconds) {
    return seconds / SECONDS_IN_DAY;
  }
  function secondsToWeeks (seconds) {
    return seconds / SECONDS_IN_WEEK;
  }
  function secondsToYears (seconds) {
    return seconds / SECONDS_IN_YEAR;
  }
  function secondsToEras (seconds) {
    return seconds / SECONDS_IN_ERA;
  }

  function millisecondsToSeconds (milliseconds) {
    return milliseconds / MILLISECONDS_IN_SECOND;
  }
  function millisecondsToMinutes (milliseconds) {
    return milliseconds / MILLISECONDS_IN_MINUTE;
  }
  function millisecondsToHours (milliseconds) {
    return milliseconds / MILLISECONDS_IN_HOUR;
  }
  function millisecondsToDays (milliseconds) {
    return milliseconds / MILLISECONDS_IN_DAY;
  }
  function millisecondsToWeeks (milliseconds) {
    return milliseconds / MILLISECONDS_IN_WEEK;
  }
  function millisecondsToYear (milliseconds) {
    return milliseconds / MILLISECONDS_IN_YEAR;
  }
  function millisecondsToEras (milliseconds) {
    return milliseconds / MILLISECONDS_IN_ERA;
  }

  // DATE MATH
  function _addMilliseconds (milliseconds) {
    return function (date) { return new Date(new Date(date).valueOf() + milliseconds) }
  }
  function createAddUnit (converter) {
    return function _addConvert(x, date) {
      switch (arguments.length) {
        case 0: _addConvert;
        case 1: _addMilliseconds(converter(x));
        default: {
          var unix = new Date(date).valueOf();
          if (isPlaceholder(x)) return function (x) { return new Date(unix + converter(x))};
          return new Date(unix + converter(x));
        }
      }
    }
  }
  // ADD
  var addEras         = createAddUnit(erasToMilliseconds);
  var addWeeks        = createAddUnit(weeksToMilliseconds);
  var addDays         = createAddUnit(daysToMilliseconds);
  var addHours        = createAddUnit(hoursToMilliseconds);
  var addMinutes      = createAddUnit(minutesToMilliseconds);
  var addSeconds      = createAddUnit(secondsToMilliseconds);
  var addMilliseconds = createAddUnit(identity);

  function addEra (date) {
    return new Date(new Date(date).valueOf() + MILLISECONDS_IN_ERA);
  }

  function addYear (date) {
    var currentDate = new Date(date);
    var year = currentDate.getFullYear();
    var month = currentDate.getMonth();
    var day = currentDate.getDate();
    if (month === FEBRUARY && day === 29) return new Date(
      year + 1,
      FEBRUARY,
      DAYS_IN_FEBRUARY,
      currentDate.getHours(),
      currentDate.getMinutes(),
      currentDate.getSeconds(),
      currentDate.getMilliseconds(),
    );

    return new Date(
      year + 1,
      month,
      day,
      currentDate.getHours(),
      currentDate.getMinutes(),
      currentDate.getSeconds(),
      currentDate.getMilliseconds(),
    );
  }

  function addMonth (date) {
    var currentDate = new Date(date);
    var year  = currentDate.getFullYear();
    var month = currentDate.getMonth();
    var day   = currentDate.getDate();
    switch (month) {
      case JANUARY: {
        switch (day) {
          case 31:
          case 30:
          case 29:
            return new Date(
            year,
            FEBRUARY,
            isLeapYear(year) ? DAYS_IN_FEBRUARY : DAYS_IN_FEBRUARY_IN_LEAP_YEAR,
            currentDate.getHours(),
            currentDate.getMinutes(),
            currentDate.getSeconds(),
            currentDate.getMilliseconds()
          );
          default: return new Date(
            year,
            FEBRUARY,
            day,
            currentDate.getHours(),
            currentDate.getMinutes(),
            currentDate.getSeconds(),
            currentDate.getMilliseconds()
         );
        }
      }
      case MARCH:
      case MAY:
      case JULY:
      case AUGUST:
      case OCTOBER: return new Date(
        currentDate.getFullYear(),
        month + 1,
        day > 30 ? DAYS_IN_MONTH : day,
        currentDate.getHours(),
        currentDate.getMinutes(),
        currentDate.getSeconds(),
        currentDate.getMilliseconds()
      );
      case DECEMBER: return new Date(
        year + 1,
        JANUARY,
        day,
        currentDate.getHours(),
        currentDate.getMinutes(),
        currentDate.getSeconds(),
        currentDate.getMilliseconds()
      );
      default: return new Date(
        year,
        month + 1,
        day,
        currentDate.getHours(),
        currentDate.getMinutes(),
        currentDate.getSeconds(),
        currentDate.getMilliseconds()
      );
    }
  }
  function addWeek (date) {
    return new Date(new Date(date).valueOf() + MILLISECONDS_IN_WEEK);
  }
  function addDay (date) {
    return new Date(new Date(date).valueOf() + MILLISECONDS_IN_DAY);
  }
  function addHour (date) {
    return new Date(new Date(date).valueOf() + MILLISECONDS_IN_HOUR);
  }
  function addMinute (date) {
    return new Date(new Date(date).valueOf() + MILLISECONDS_IN_MINUTE);
  }
  function addSecond (date) {
    return new Date(new Date(date).valueOf() + MILLISECONDS_IN_SECOND);
  }

  function createSubtractMilliseconds (milliseconds) {
    return function useSubtractMilliseconds (date) { return new Date(new Date(date).valueOf() - milliseconds) }
  }
  function createSubtractUnit (converter) {
    return function useSubtractUnit(x, date) {
      switch (arguments.length) {
        case 0: useSubtractUnit;
        case 1: createSubtractMilliseconds(converter(x));
        default: {
          var unix = new Date(date).valueOf();
          if (isPlaceholder(x)) return function (x) { return new Date(unix - converter(x))};
          return new Date(unix - converter(x));
        }
      }
    }
  }
  var subtractEras    = createSubtractUnit(erasToMilliseconds);
  var subtractYears   = createSubtractUnit(yearsToMilliseconds);
  var subtractWeeks   = createSubtractUnit(weeksToMilliseconds);
  var subtractDays    = createSubtractUnit(daysToMilliseconds);
  var subtractHours   = createSubtractUnit(hoursToMilliseconds);
  var subtractMinutes = createSubtractUnit(minutesToMilliseconds);
  var subtractSeconds = createSubtractUnit(secondsToMilliseconds);

  function _differenceMilliseconds (date1, date2) { return new Date(date1).valueOf() -new Date(date2) }

  var differenceMilliseconds = _curry2(_differenceMilliseconds);
  var useDifference          = _pipe2(_differenceMilliseconds);
  var differenceSeconds      = _curry2(useDifference(millisecondsToSeconds));
  var differenceMinutes      = _curry2(useDifference(millisecondsToMinutes));
  var differenceHours        = _curry2(useDifference(millisecondsToHours));
  var differenceDays         = _curry2(useDifference(millisecondsToDays));
  var differenceWeeks        = _curry2(useDifference(millisecondsToWeeks));

  var max = _curry2(function _max(y, x) {
    return new Date(y).valueOf() > new Date(x).valueOf() ? y : x;
  });
  var min = _curry2(function _min(y, x) {
    return new Date(y).valueOf() < new Date(x).valueOf() ? y : x;
  });
  var clamp = _curry3(function _clamp(min, max, x) {
    var _x = new Date(x).valueOf();
    return _x > new Date(max).valueOf() ? max : _x < new Date(min).valueOf() ? min : x;
  });
  // DATE LOGIC
  function eqByDate (date1, date2) {
    switch(arguments.length) {
      case 0: return eqByDate;
      case 1: {
        var currentDate1 = new Date(date1);
        return function eqNextDate(date2) {
          var currentDate2 = new Date(date2);
          return currentDate1.getDate()     === currentDate2.getDate()
              && currentDate1.getMonth()    === currentDate2.getMonth()
              && currentDate1.getFullYear() === currentDate2.getFullYear();
        }
      }
      default: {
        if (isPlaceholder(date1)) {
          var currentDate2 = new Date(date2);
          return function eqFirstDate(date1) {
            var currentDate1 = new Date(date1);
            return currentDate1.getDate()     === currentDate2.getDate()
                && currentDate1.getMonth()    === currentDate2.getMonth()
                && currentDate1.getFullYear() === currentDate2.getFullYear();
          }
        }
        var currentDate1 = new Date(date1), currentDate2 = new Date(date2);
        return currentDate1.getDate()     === currentDate2.getDate()
            && currentDate1.getMonth()    === currentDate2.getMonth()
            && currentDate1.getFullYear() === currentDate2.getFullYear();
      }
    }
  }

  var equal = _curry2(function _equal (date1, date2) { return new Date(date1).valueOf() === new Date(date2).valueOf() });

  var isBetween = _curry3(function (start, end, current) {
    var _current = new Date(current).valueOf();
    return _current > new Date(start).valueOf() && _current < new Date(end).valueOf();
  });

  /** SINGLE FUNCTIONS */
  // helpers
  function template (date) {
    return Object.defineProperties(new Date(date), {
      Y: {
        get: getFullYear,
      },
      M: {
        get: getMonth,
      },
      D: {
        get: getDay,
      },
    });
  }
  function partsDate (date) {
    const currentDate = new Date(date);
    return [currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDay()];
  }
  function toStartTime (dateParam) {
    return date.apply(null, _concat(partsDate(dateParam), START_TIME_PARTS));
  }
  function toEndTime (date) {
    return date.apply(null, _concat(partsDate(dateParam), END_TIME_PARTS));
  }

  // math
  function subtractEra (date) {
    return new Date(new Date(date).valueOf() - MILLISECONDS_IN_ERA);
  }
  function subtractYear (date) {
    var currentDate = new Date(date);
    var year = currentDate.getFullYear();
    switch (year % LEAP_YEAR_EVERY_YEARS) {
      case 0: {
        var month = currentDate.getMonth();
        if (month > 1 || (month === 1 && currentDate.getDate() === 29)) return new Date(currentDate.valueOf() - MILLISECONDS_IN_LEAP_YEAR);
      }
      case 1: {
        if (currentDate.getMonth() < 1) return new Date(currentDate.valueOf() - MILLISECONDS_IN_LEAP_YEAR);
      }
      default: return new Date(currentDate.valueOf() - MILLISECONDS_IN_CALENDAR_YEAR); // TODO
    }
  }
  function subtractMonth (date) {
    var currentDate = new Date(date);
    switch (currentDate.getMonth()) {
      case JANUARY: return new Date(
        currentDate.getFullYear() - 1,
        DECEMBER,
        currentDate.getDate(),
        currentDate.getHours(),
        currentDate.getMinutes(),
        currentDate.getSeconds(),
        currentDate.getMilliseconds(),
      );

      case MARCH: {
        var year = currentDate.getFullYear();
        var day  = currentDate.getDay();
        return new Date(
         year,
         currentDate.getMonth() - 1,
         day < DAYS_IN_FEBRUARY ? day : isLeap(year) && day > DAYS_IN_FEBRUARY ? DAYS_IN_FEBRUARY_IN_LEAP_YEAR : DAYS_IN_FEBRUARY,
         currentDate.getHours(),
         currentDate.getMinutes(),
         currentDate.getSeconds(),
         currentDate.getMilliseconds(),
        );
      }

      case MAY:
      case JULY:
      case AUGUST:
      case OCTOBER:
      case DECEMBER: {
        var day = currentDate.getDay();
        return new Date(
         currentDate.getFullYear(),
         currentDate.getMonth() - 1,
         day > DAYS_IN_MONTH ? DAYS_IN_MONTH : day,
         currentDate.getHours(),
         currentDate.getMinutes(),
         currentDate.getSeconds(),
         currentDate.getMilliseconds(),
        );
      }
      default: return new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - 1,
        currentDate.getDate(),
        currentDate.getHours(),
        currentDate.getMinutes(),
        currentDate.getSeconds(),
        currentDate.getMilliseconds(),
      );
    }
  }
  function subtractWeek (date) {
    return new Date(new Date(date).valueOf() - MILLISECONDS_IN_WEEK);
  }
  function subtractDay (date) {
    return new Date(new Date(date).valueOf() - MILLISECONDS_IN_DAY);
  }
  function subtractHour (date) {
    return new Date(new Date(date).valueOf() - MILLISECONDS_IN_HOUR);
  }
  function subtractMinute (date) {
    return new Date(new Date(date).valueOf() - MILLISECONDS_IN_MINUTE)
  }
  function subtractSecond (date) {
    return new Date(new Date(date).valueOf() - MILLISECONDS_IN_SECOND);
  }

  function subtractMilliseconds(milliseconds, date) {
    switch (arguments.length) {
      case 0  : return subtractMilliseconds;
      case 1  : return createSubtractMilliseconds(milliseconds);
      default : {
        var unix = new Date(date).valueOf();
        if (isPlaceholder(milliseconds)) return function () {
          return new Date(unix - milliseconds);
        }
        return new Date(unix - milliseconds);
      }
    }
  }

  function getYearsToLeapYearByYear (year) {
    return LEAP_YEAR_EVERY_YEARS - (year % LEAP_YEAR_EVERY_YEARS || LEAP_YEAR_EVERY_YEARS);
  }
  // GETTERS
  function getDateNow () {
    return new Date();
  }
  function getDateStartYearNow () {
    return new Date(new Date().getFullYear(), 0);
  }
  function getDateStartMonthNow () {
    var date = new Date();
    return new Date(date.getFullYear(), date.getMonth());
  }
  function getYearNow () {
    return new Date().getFullYear();
  }
  function getMonthNow () {
    return new Date().getMonth();
  }
  function getWeekNow () {
    var currentDate = new Date();
    var startDate   = new Date(currentDate.getFullYear(), currentDate.getMonth());
    return Math.ceil((currentDate.getDate() + startDate.getDay()) / DAYS_IN_WEEK);
  }
  function getDayNow () {
    return new Date().getDate();
  }
  function getWeekDayNow () {
    return new Date().getDay();
  }
  function getHoursNow () {
    return new Date().getHours();
  }
  function getMinutesNow () {
    return new Date().getMinutes();
  }
  function getSecondsNow () {
    return new Date().getSeconds();
  }
  function getMillisecondsNow () {
    return new Date().getMilliseconds();
  }
  function getYesterdayDate () {
    return new Date(Date.now() - MILLISECONDS_IN_DAY);
  }
  function getTomorrowDate () {
    return new Date(Date.now() + MILLISECONDS_IN_DAY);
  }
  function getLastWeekDate () {
    return new Date(Date.now() - MILLISECONDS_IN_WEEK);
  }
  function getNextWeekDate () {
    return new Date(Date.now() + MILLISECONDS_IN_WEEK);
  }
  function getFullYear (date) {
    return new Date(date).getFullYear();
  }
  function getMonth (date) {
    return new Date(date).getMonth();
  }
  function getWeek (date) {
    var currentDate = new Date(date);
    var startDate   = new Date(currentDate.getFullYear(), currentDate.getMonth());
    return Math.ceil((currentDate.getDate() + startDate.getDay()) / DAYS_IN_WEEK);
  }
  function getWeekDay (date) {
    return new Date(date).getDay();
  }
  function getDay (date) {
    return new Date(date).getDate();
  }
  function getHours (date) {
    return new Date(date).getHours();
  }
  function getMinutes (date) {
    return new Date(date).getMinutes();
  }
  function getSeconds (date) {
    return new Date(date).getSeconds();
  }
  function getMilliseconds (date) {
    return new Date(date).getMilliseconds();
  }
  function getFebruaryDays (isLeapYear) {
    return isLeapYear ? DAYS_IN_FEBRUARY_IN_LEAP_YEAR : DAYS_IN_FEBRUARY;
  }
  /** LOGIC **/
  function isDate (maybeDate) {
    return maybeDate instanceof Date;
  }
  function notDate (maybeDate) {
    return !(maybeDate instanceof Date);
  }
  function isISO (maybeISO) {
    return typeof maybeISO === "string" && ISO_PATTERN.test(maybeISO);
  }
  function isFuture (date) {
    return new Date(date).valueOf() > Date.now();
  }
  function notFuture (date) {
    return Date.now() > new Date(date).valueOf();
  }
  function isPast (date) {
    return new Date(date).valueOf() < Date.now();
  }
  function notPast (date) {
    return Date.now() < new Date(date).valueOf();
  }
  function isValid (date) {
    return ~new Date(date) !== -1
  }
  function notValid (date) {
    return ~new Date(date) === -1
  };
  function isLeapYear (year) {
    return year % LEAP_YEAR_EVERY_YEARS === 0;
  }
  function isLeap (date) {
    return new Date(date).getFullYear() % LEAP_YEAR_EVERY_YEARS === 0;
  }

  function isToday (date) {
    var currentDate = new Date(date);
    if (!currentDate === -1) return false;
    var now = new Date();
    return currentDate.getDate() === now.getDate()
        && currentDate.getMonth() === now.getMonth()
        && currentDate.getFullYear() === now.getFullYear();
  }
  function isTomorrow (date) {
    var currentDate = new Date(date);
    if (!currentDate === -1) return false;
    var now = new Date();
    return currentDate.getDate() === now.getDate() + 1
        && currentDate.getMonth() === now.getMonth()
        && currentDate.getFullYear() === now.getFullYear();
  }
  function isYesterday () {
    var currentDate = new Date(date);
    if (!currentDate === -1) return false;
    var now = new Date();
    return currentDate.getDate() === now.getDate() - 1
        && currentDate.getMonth() === now.getMonth()
        && currentDate.getFullYear() === now.getFullYear();
  }
  // TODO this week next week last week this month next month last month this year next year last year
  /** LOGIC **/

  function createMonthDays (isLeapYear) {
    return [
      DAYS_IN_MONTH_MAX,
      getFebruaryDays(isLeapYear),
      DAYS_IN_MONTH_MAX,
      DAYS_IN_MONTH,
      DAYS_IN_MONTH_MAX,
      DAYS_IN_MONTH,
      DAYS_IN_MONTH_MAX,
      DAYS_IN_MONTH_MAX,
      DAYS_IN_MONTH,
      DAYS_IN_MONTH_MAX,
      DAYS_IN_MONTH,
      DAYS_IN_MONTH_MAX,
    ];
  }

  var era = {
    to: {
      years           : erasToYears,
      sessions        : erasToSessions,
      months          : erasToMonths,
      days            : erasToDays,
      hours           : erasToHours,
      minutes         : erasToMinutes,
      seconds         : erasToSeconds,
      milliseconds    : erasToMilliseconds,
    },

    YEARS               : YEARS_IN_ERA,
    SESSIONS            : SESSIONS_IN_ERA,
    MONTHS              : MONTHS_IN_ERA,
    DAYS                : DAYS_IN_ERA,
    HOURS               : HOURS_IN_ERA,
    MINUTES             : MINUTES_IN_ERA,
    SECONDS             : SECONDS_IN_ERA,
    MILLISECONDS_IN_ERA : MILLISECONDS_IN_ERA,
  };

  function createGetter (getter) {
    var constanta = Object.create(null);
    constanta.get = getter;
    constanta.set = function () { throw "TypeError: Assignment to constant variable." };
    return constanta;
  }
  function createProperty (property) {
    return createGetter(function () { return property });
  }
  var year = Object.defineProperties(Object.assign(getFullYear, {
    valueOf: getYearNow,
  }), {
    getNow   : createProperty(getFullYear),
    isLeap   : createProperty(isLeapYear),
    add      : addYear,
    subtract : subtractYear,
    to       : createProperty({
      eras         : createProperty(yearsToEras),
      sessions     : createProperty(yearsToSessions),
      months       : createProperty(yearsToMonths),
      days         : createProperty(yearsToDays),
      hours        : createProperty(yearsToHours),
      minutes      : createProperty(yearsToMinutes),
      seconds      : createProperty(yearsToSeconds),
      milliseconds : createProperty(yearsToMilliseconds),
    }),

    SESSIONS     : createProperty(SESSIONS_IN_YEAR),
    MONTHS       : createProperty(MONTHS_IN_YEAR),
    DAYS         : createProperty(DAYS_IN_YEAR),
    HOURS        : createProperty(HOURS_IN_YEAR),
    MINUTES      : createProperty(MINUTES_IN_YEAR),
    SECONDS      : createProperty(SECONDS_IN_YEAR),
    MILLISECONDS : createProperty(MILLISECONDS_IN_YEAR),

    now : createGetter(getYearNow),
  });

  var session = {
    MONTHS: MONTHS_IN_SESSION,
  };

  var month = Object.defineProperties(Object.assign(getMonth, {
    valueOf: getMonthNow,
  }), {
    getNow                        : createProperty(getMonthNow),
    add                           : createProperty(addMonth),
    subtract                      : createProperty(subtractMonth),

    DAYS                          : createProperty(DAYS_IN_MONTH),
    MAX_DAYS                      : createProperty(DAYS_IN_MONTH_MAX),
    DAYS_IN_FEBRUARY              : createProperty(DAYS_IN_FEBRUARY),
    DAYS_IN_FEBRUARY_IN_LEAP_YEAR : createProperty(DAYS_ADDITION_IN_LEAP_YEAR),

    DECEMBER                      : createProperty(DECEMBER),
    NOVEMBER                      : createProperty(NOVEMBER),
    OCTOBER                       : createProperty(OCTOBER),
    SEPTEMBER                     : createProperty(SEPTEMBER),
    AUGUST                        : createProperty(AUGUST),
    JULY                          : createProperty(JULY),
    JUNE                          : createProperty(JUNE),
    MAY                           : createProperty(MAY),
    APRIL                         : createProperty(APRIL),
    MARCH                         : createProperty(MARCH),
    FEBRUARY                      : createProperty(FEBRUARY),
    JANUARY                       : createProperty(JANUARY),

    now                           : createGetter(getMonthNow),
  });
  if (Symbol.iterator) try {
   eval("month[Symbol.iterator] = function *() {"
    + "var now = new Date();"
    + "var daysOnThisMonth = createMonthDays(isLeapYear(now.getFullYear()))[now.getMonth()];"
    + "var iterator = 0;"
    + "while (iterator < daysOnThisMonth) yield iterator++;"
    + "}");
  } catch (error) {}

  var week = Object.defineProperties(Object.assign(getWeek, {
    valueOf: getWeekNow,
  }), {
    add      : createProperty(addWeek),
    subtract : createProperty(subtractWeek),
    to       : createProperty({
      days         : weeksToDays,
      hours        : weeksToHours,
      minutes      : weeksToMinutes,
      seconds      : weeksToSeconds,
      milliseconds : weeksToMilliseconds,
    }),

    DAYS         : createProperty(DAYS_IN_WEEK),
    HOURS        : createProperty(HOURS_IN_WEEK),
    MINUTES      : createProperty(MINUTES_IN_WEEK),
    SECONDS      : createProperty(SECONDS_IN_WEEK),
    MILLISECONDS : createProperty(MILLISECONDS_IN_WEEK),

    getNow       : getWeekNow,

    now          : createGetter(getWeekNow),
  });

  var weekDay = Object.defineProperties(Object.assign(getWeekDay, {
    valueOf: getWeekNow,
  }), {
    getNow : createProperty(getWeekDayNow),

    SATURDAY  : createProperty(SATURDAY),
    FRIDAY    : createProperty(FRIDAY),
    THURSDAY  : createProperty(THURSDAY),
    WEDNESDAY : createProperty(WEDNESDAY),
    TUESDAY   : createProperty(TUESDAY),
    MONDAY    : createProperty(MONDAY),
    SUNDAY    : createProperty(SUNDAY),

    now    : createGetter(getWeekDayNow),
  });

  var day = Object.defineProperties(Object.assign(getDay, {
    valueOf: getDayNow,
  }), {
    getNow       : createProperty(getDayNow),

    HOURS        : createProperty(HOURS_IN_DAY),
    MINUTES      : createProperty(MINUTES_IN_DAY),
    SECONDS      : createProperty(SECONDS_IN_DAY),
    MILLISECONDS : createProperty(MILLISECONDS_IN_DAY),

    to: createProperty({
      hours        : daysToHours,
      minutes      : daysToMinutes,
      seconds      : daysToSeconds,
      milliseconds : daysToMilliseconds,

      week         : daysToWeeks,
      year         : daysToYears,
      eras         : daysToEras,
    }),

    now : createGetter(getDayNow),
  });

  var hour = Object.defineProperties(Object.assign(getHours, {
    valueOf: getHoursNow,
  }), {
    getNow       : createProperty(getHoursNow),

    to : createProperty({
      minutes      : hoursToMinutes,
      seconds      : hoursToSeconds,
      milliseconds : hoursToMilliseconds,

      days  : hoursToDays,
      weeks : hoursToWeeks,
      years : hoursToYears,
      eras  : hoursToEras,
    }),

    MINUTES      : createProperty(MINUTES_IN_HOUR),
    SECONDS      : createProperty(SECONDS_IN_HOUR),
    MILLISECONDS : createProperty(MILLISECONDS_IN_HOUR),
  });

  var minute = Object.defineProperties(Object.assign(getMinutes, {
    valueOf: getMinutesNow,
  }), {
    getNow       : createProperty(getMinutesNow),

    to : createProperty({
      seconds      : minutesToSeconds,
      milliseconds : minutesToMilliseconds,

      hours        : minutesToHours,
      days         : minutesToDays,
      weeks        : minutesToWeeks,
      years        : minutesToYears,
      eras         : minutesToEras,
    }),

    SECONDS      : createProperty(SECONDS_IN_MINUTE),
    MILLISECONDS : createProperty(MILLISECONDS_IN_MINUTE),
  });

  var second = Object.defineProperties(Object.assign(getSeconds, {
    valueOf: getSecondsNow,
  }), {
    getNow       : createProperty(getSecondsNow),

    to : createProperty({
      milliseconds : secondsToMilliseconds,

      minutes      : secondsToMinutes,
      hours        : secondsToHours,
      days         : secondsToDays,
      weeks        : secondsToWeeks,
      years        : secondsToYears,
      eras         : secondsToEras,
    }),

    MILLISECONDS : createProperty(MILLISECONDS_IN_SECOND),
  });

  var millisecond = {
    getNow : getMillisecondsNow,
  };

  return Object.freeze(Object.defineProperties(Object.assign(
    date,
    {
      era,
      year,
      session,
      month,
      week,
      weekDay,
      day,
      hour,
      minute,
      second,
      millisecond,
      add: {
        eras         : addEras,
        era          : addEra,
        year         : addYear,
        month        : addMonth,
        weeks        : addWeeks,
        week         : addWeek,
        days         : addDays,
        day          : addDay,
        hours        : addHours,
        hour         : addHour,
        minutes      : addMinutes,
        minute       : addMinute,
        seconds      : addSeconds,
        second       : addSecond,
        milliseconds : addMilliseconds,
      },
      subtract: {
        eras         : subtractEras,
        era          : subtractEra,
        year         : subtractYear,
        month        : subtractMonth,
        weeks        : subtractWeeks,
        week         : subtractWeek,
        days         : subtractWeeks,
        day          : subtractDay,
        hours        : subtractHours,
        hour         : subtractHour,
        minutes      : subtractMinutes,
        minute       : subtractMinute,
        seconds      : subtractSeconds,
        second       : subtractSecond,
        milliseconds : subtractMilliseconds,
      },
      toString: function () {
        return new Date().toISOString();
      },
      valueOf: function () {
        return Date.now();
      },
    },
  ), {
    now : {
      get: getDateNow,
    },
    yesterday : {
      get: getYesterdayDate,
    },
    tomorrow : {
      get: getTomorrowDate,
    },
    lastWeek: {
      get: getLastWeekDate,
    },
    nextWeek : {
      get: getNextWeekDate,
    },
  }));
})()

module.exports = D;
