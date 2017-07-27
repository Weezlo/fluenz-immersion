var google = require('googleapis');
var googleAuth = require('google-auth-library');
var util = require('util');

//region Models
var COLUMNS = [
    {field: 'timestamp', header: 'Timestamp'},
    {field: 'reservationDates', header: 'Reservation Dates'},
    {field: 'location', header: 'Location'},
    {field: 'occupancy', header: 'Occupancy'},
    {field: 'firstName', header: 'First Name'},
    {field: 'lastName', header: 'Last Name'},
    {field: 'email', header: 'E-mail'},
    {field: 'message', header: 'Message'},
    {field: 'status', header: 'Status'}
];
//endregion

//region Private sheets.js functions
function buildRowFromReservation(reservation) {

    var cells = COLUMNS.map(function (column) {
        switch (column.field) {
            case 'timeStamp':
                return {
                    userEnteredValue: {
                        stringValue: reservation.timestamp
                    }
                };
                break;
            case 'reservationDates':
                return {
                    userEnteredValue: {
                        stringValue: reservation.reservationDates
                    }
                };
                break;
            case 'location':
                return {
                    userEnteredValue: {
                        stringValue: reservation.location
                    }
                };
                break;
            case 'occupancy':
                return {
                    userEnteredValue: {
                        stringValue: reservation.occupancy
                    }
                };
                break;
            case 'firstName':
                return {
                    userEnteredValue: {
                        stringValue: reservation.firstName
                    }
                };
                break;
            case 'lastName':
                return {
                    userEnteredValue: {
                        stringValue: reservation.lastName
                    }
                };
                break;
            case 'email':
                return {
                    userEnteredValue: {
                        stringValue: reservation.email
                    }
                };
                break;
            case 'message':
                return {
                    userEnteredValue: {
                        stringValue: reservation.email
                    }
                };
                break;
            case 'status':
                return {
                    userEnteredValue: {
                        stringValue: reservation.status
                    }
                };
                break;

            default:
                return {
                    userEnteredValue: {
                        stringValue: reservation[column.field].toString()
                    }
                };
        }
    });
    return {
        values: cells
    };

}

//endregion

var API_KEY = 'AIzaSyBXAUZjwkkrm6OCa-C-YE-yv9Gk7Kte6Cs';
var SPREADSHEET_ID = '1C6hHM8POcOV5-W84z38aFCmIFStis6TY7uEPMd-LcEU';
var SHEET_ID = '1086357442';

//region SheetHelper Definition and export
var SheetsHelper = function () {
    this.service = google.sheets({version: 'v4', auth: API_KEY});
};

SheetsHelper.prototype.updateSpreadsheet = function (reservation, callback) {
    var requests = [];
    // Resize the sheet.
    requests.push({
        updateSheetProperties: {
            properties: {
                sheetId: SHEET_ID,
                gridProperties: {
                    rowCount: 2, //TODO: do GET to have rowCount
                    columnCount: COLUMNS.length
                }
            },
            fields: 'gridProperties(rowCount,columnCount)'
        }
    });
    // Set the cell values.
    requests.push({
        updateCells: {
            start: {
                sheetId: SHEET_ID,
                rowIndex: 1,
                columnIndex: 0
            },
            rows: buildRowFromReservation(reservation),
            fields: '*'
        }
    });
    // Send the batchUpdate request.
    var request = {
        spreadsheetId: SPREADSHEET_ID,
        resource: {
            requests: requests
        }
    };
    this.service.spreadsheets.batchUpdate(request, function (err) {
        console.log('batchUpdate done!!');
        if (err) {
            return callback(err);
        }
        return callback();
    });
};

module.exports = SheetsHelper;
//endregion