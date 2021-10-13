/**
 * Returns the application base url (specified as MIX_APP_BASE_URL in the .env file)
 * @param {Boolean} trailing Determines if a trailing slash ('/') is added to the base url
 */
export function getBaseUrl(trailing = false) {
    let baseUrl = process.env.NODE_ENV === 'development' ?
        trailing ? '/' : '' :
        `${process.env.MIX_APP_BASE_URL}${trailing ? '/' : ''}`

    return baseUrl
}

/**
 * Add event to an element
 * @param {Element} el Element to attach an event to
 * @param {String|String[]} evt Event name or an array of event names
 * @param {Function} handler Event handler to attach
 */
export function addEvent(el, evt, handler) {
    if (Array.isArray(evt)) {
        evt.forEach((e) => el.addEventListener(e, handler))
    } else {
        el.addEventListener(evt, handler)
    }
}

/**
 * Remove event from an element
 * @param {Element} el Element to remove an event from
 * @param {String|String[]} evt Event name or array of event names to remove
 * @param {Function} handler Event handler to remove
 */
export function removeEvent(el, evt, handler) {
    if (Array.isArray(evt)) {
        evt.forEach(e => el.removeEventListener(e, handler))
    } else {
        el.removeEventListener(evt, handler)
    }
}

/**
 * Group an array of objects
 * @param {Object[]} array Array of objects to group
 * @param {String} by Object key to use in grouping
 * @param {String} name Object key to use as group name in the resulting object
 */
export function groupBy(array, by, name) {
    const result = []
    const memberKey = name || 'members'
    array.forEach(item => {
        let group = result.find(r => r[by] === item[by])

        if (group) {
            group[memberKey].push(item)
        } else {
            group = {}

            group[by] = item[by]
            group[memberKey] = []
            group[memberKey].push(item)

            result.push(group)
        }
    })
    return result
}

/**
 * Downloads a file without opening a new window or popup
 * @param {String} url Request url where to download the file
 * @param {Function} onDone Callback function if finished downloading
 * @param {Function} onError Callback function if error is encountered
 * @param {Function} onProgress Download progress callback
 */
export function xhrDownload(url, onDone, onError, onProgress) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'blob';
    xhr.onprogress = function (res) {
        if (onProgress && typeof onProgress === 'function')
            onProgress(Math.floor((res.loaded / res.total) * 100));
    }
    xhr.onerror = function () { if (onError && typeof onError === 'function') onError() }
    xhr.onload = function () {
        if (this.status === 200) {
            var blob = this.response;
            var _filename = '', _disp = xhr.getResponseHeader('content-disposition'), _type = xhr.getResponseHeader('Content-Type');

            if (_disp && _disp.indexOf('attachment') !== -1) {
                var _regEx = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
                var matches = _regEx.exec(_disp);
                if (matches != null && matches[1]) _filename = matches[1].replace(/['"]/g, '');
            }

            if (typeof window.navigator.msSaveBlob !== 'undefined') {
                // IE workaround for "HTML7007: One or more blob URLs were revoked by closing the blob for which they were created. These URLs will no longer resolve as the data backing the URL has been freed."
                window.navigator.msSaveBlob(blob, _filename);
            } else {
                var URL = window.URL || window.webkitURL;
                var downloadUrl = URL.createObjectURL(blob);
                // use HTML5 a[download] attribute to specify filename
                var a = document.createElement("a");

                if (_filename) {
                    // safari doesn't support this yet
                    if (typeof a.download === 'undefined') {
                        window.location = url;
                    } else {
                        a.href = downloadUrl;
                        a.download = _filename;
                        document.body.appendChild(a);
                        a.click();
                    }
                } else {
                    window.location = url;
                }

                setTimeout(function () {
                    URL.revokeObjectURL(downloadUrl);
                    a.remove();
                }, 100); // cleanup
            }
        }

        if (onDone && typeof onDone === 'function') onDone(this.status, this.statusText);
    }
    xhr.send()
}

/**
 * Returns the specified query string parameter value
 * @param {String} name Query string parameter name
 */
export function getUrlParam(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

/**
 * Returns the parameter value from specified url
 * @param {String} url Url string
 * @param {String} name Query string parameter name
 */
export function getParam(url, name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(url);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

/**
 * Formats a number to add ordinal suffix
 * @param {Number} number The number to format
 */
export function toOrdinal(number) {
    if (number === 0) return 'Ground'

    let s = ["th", "st", "nd", "rd"]

    if (Array.isArray(number)) {
        return number.map(n => { return toOrdinal(n) })
    } else {
        let v = number % 100

        return number + (s[(v - 20) % 10] || s[v] || s[0]);
    }
}

/**
 * Preloads image resource
 * @param {string} src Image url
 * @param {Function} callback On image load callback
 */
export function preloadImage(src, callback) {
    let img = new Image()

    img.onload = callback
    img.src = `${src}`
}

/**
 * Vanilla JavaScript version of jQuery.extend()
 * @see {@link https://gomakethings.com/vanilla-javascript-version-of-jquery-extend/}
 */
export function extend() {
    // Variables
    var extended = {}
    var deep = false
    var i = 0
    var length = arguments.length

    // Check if a deep merge
    if (Object.prototype.toString.call(arguments[0]) === '[object Boolean]') {
        deep = arguments[0]
        i++
    }

    // Merge the object into the extended object
    var merge = function (obj) {
        for (var prop in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, prop)) {
                // If deep merge and property is an object, merge properties
                if (deep && Object.prototype.toString.call(obj[prop]) === '[object Object]') {
                    extended[prop] = extend(true, extended[prop], obj[prop])
                } else {
                    extended[prop] = obj[prop]
                }
            }
        }
    }

    // Loop through each object and conduct a merge
    for (; i < length; i++) {
        var obj = arguments[i]
        merge(obj)
    }

    return extended
}

/**
 * Gets the value of the object using string property name
 * @param {Object} obj Object where to get the value from
 * @param {string} propStr String property accessor (i.e 'foo.bar' from obj = { foo: { bar: 'hello' } })
 * @returns 
 */
export function getObjValue(obj, propStr, defaultValue) {
    return propStr
        .split('.')
        .reduce((o, p) => o ? o[p] : defaultValue, obj)
}

/**
 * Returns the sum of all numbers in the array
 * @param {Number[]} arr Array of numbers
 */
export function sum(arr) {
    return arr.reduce((a, b) => a + b, 0)
}

/**
 * Returns the average of all numbers in the array
 * @param {Number[]} arr Array of numbers
 */
export function average(arr) {
    return arr.reduce((a, b) => a + b, 0) / arr.length
}

/**
 * Returns the hour (24-hour format) of the time
 * @param {string} timeStr Time string
 */
export function toHour(timeStr) {
    return [
        '12:00 am', '1:00 am', '2:00 am', '3:00 am', '4:00 am', '5:00 am', '6:00 am', '7:00 am', '8:00 am', '9:00 am', '10:00 am', '11:00 am', 
        '12:00 pm', '1:00 pm', '2:00 pm', '3:00 pm', '4:00 pm', '5:00 pm', '6:00 pm', '7:00 pm', '8:00 pm', '9:00 pm', '10:00 pm', '11:00 pm'
    ].indexOf(timeStr)
}

/**
 * Return the time string based on the given hour
 * @param {Number} hour Hour value
 */
export function hourStr(hour, hourOnly = false, uppercase = false) {
    let str = hourOnly ?
    ['12 am', '1 am', '2 am', '3 am', '4 am', '5 am', '6 am', '7 am', '8 am', '9 am', '10 am', '11 am', 
        '12 pm', '1 pm', '2 pm', '3 pm', '4 pm', '5 pm', '6 pm', '7 pm', '8 pm', '9 pm', '10 pm', '11 pm'][hour] :
    ['12:00 am', '1:00 am', '2:00 am', '3:00 am', '4:00 am', '5:00 am', '6:00 am', '7:00 am', '8:00 am', '9:00 am', '10:00 am', '11:00 am', 
        '12:00 pm', '1:00 pm', '2:00 pm', '3:00 pm', '4:00 pm', '5:00 pm', '6:00 pm', '7:00 pm', '8:00 pm', '9:00 pm', '10:00 pm', '11:00 pm'][hour]

    return uppercase ? str.toUpperCase() : str
}

/**
 * Returns ISO string of the date (starting time 00)
 * @param {Date} date Date object
 */
export function toISOStart(date) {
    let month = `0${date.getMonth() + 1}`.substr(-2, 2),
        day = `0${date.getDate()}`.substr(-2, 2)
    return `${date.getFullYear()}-${month}-${day}T00:00:00Z`
}

/**
 * Returns ISO string of the date (end time 23)
 * @param {Date} date Date object
 */
export function toISOEnd(date) {
    let month = `0${date.getMonth() + 1}`.substr(-2, 2),
        day = `0${date.getDate()}`.substr(-2, 2)
    return `${date.getFullYear()}-${month}-${day}T23:00:00Z`
}

/**
 * Returns the start and end date of the specified year & month (ISO start & end format)
 * @param {Number} year Year (4-digit)
 * @param {Number} month Month (0 - 11)
 */
export function getMonthRange(year, month) {
    let startDate = new Date(year, month, 1)
    let endDate = new Date(year, month + 1, 0)

    return {
        start : toISOStart(startDate),
        end: toISOEnd(endDate)
    }
}

/**
 * Returns the month name
 * @param {Number} month Month number value
 */
export function getMonthName(month) {
    return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][month]
}

/**
 * Returns the (whole number) percent value
 * @param {Float32Array} value Decimal value
 */
export function toPercent(value) {
    let percent = value * 100

    return Math.round(percent)
}

/**
 * Returns the (whole number) percent string
 * @param {Float32Array} value Decimal value
 */
export function toPercentStr(value) {
    let percent = value * 100

    return `${Math.round(percent)}%`
}

/**
 * Rounds the specified value
 * @param {Float} value Value to round
 * @param {Number} precision Decimal place precision
 */
export function roundNum(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}