const fs = require('fs')

/**
 * Reads JSON file from given path
 * @param {String} file File path
 * @param {Function} cb Callback function after reading the JSON file
 */
export function jsonRead(file, cb) {
    fs.readFile(file, 'utf8', (err, jsonData) => {
        if (err) {
            return cb && cb(err)
        }
        
        try {
            const data = JSON.parse(jsonData)
            return cb && cb(null, data)
        } catch(err) {
            return cb && cb(err)
        }
    })
}

/**
 * Writes JSON data to file
 * @param {String} file File path to write the JSON data
 * @param {Object} data JSON data to write to file
 * @param {Function} cb Callback function after writing the data to file
 */
export function jsonWrite(file, data, cb) {
    fs.writeFile(file, JSON.stringify(data), cb)
}