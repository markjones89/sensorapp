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
    if(Array.isArray(evt)) {
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
    if(Array.isArray(evt)) {
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
export function groupBy(array, by, name){
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
 * Formats a number to add ordinal suffix
 * @param {Number} number The number to format
 */
export function toOrdinal(number) {
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