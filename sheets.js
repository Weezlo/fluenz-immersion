var google = require('googleapis');
var util = require('util');

//region Constants
var key = require('My Project-920c63f73f63.json');
var jwtClient = new google.auth.JWT(
    key.client_email,
    null,
    key.private_key,
    ['https://www.googleapis.com/auth/spreadsheets'],
    null
);

var SPREADSHEET_ID = '1C6hHM8POcOV5-W84z38aFCmIFStis6TY7uEPMd-LcEU';
var SHEET_ID = '1086357442';
//endregion

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

//region SheetHelper Definition and export
var SheetsHelper = function (callback) {
    var $this = this;

    jwtClient.authorize(function(err, tokens){
        if(err){
            console.log('Error!', err);
            return;
        }

        console.log('Authenticated!');
        $this.service = google.sheets({version: 'v4', auth: jwtClient});
        callback();
    });

};

var prepareUpdateRequests = function(rowCount, reservation){
    var requests = [];
    // Resize the sheet.
    requests.push({
        updateSheetProperties: {
            properties: {
                sheetId: SHEET_ID,
                gridProperties: {
                    rowCount: rowCount + 1,
                    columnCount: COLUMNS.length
                }
            },
            fields: 'gridProperties(rowCount,columnCount)'
        }
    }); //updateSheetProperties
    requests.push({
        autoResizeDimensions: {
            dimensions: {
                sheetId: SHEET_ID,
                dimension: "COLUMNS",
                startIndex: 0,
                endIndex: COLUMNS.length
            }
        }
    }); //autoResizeDimensions

    // Set the cell values.
    requests.push({
        updateCells: {
            start: {
                sheetId: SHEET_ID,
                rowIndex: rowCount,
                columnIndex: 0
            },
            rows: buildRowFromReservation(reservation),
            fields: '*'
        }
    }); //updateCells

    // Send the batchUpdate request.
    return {
        spreadsheetId: SPREADSHEET_ID,
        resource: {
            requests: requests
        }
    };
};

SheetsHelper.prototype.getSpreadsheet = function(callback){
    var params = {
        spreadsheetId: SPREADSHEET_ID,
        ranges: [],
        includeGridData: false
    };

    this.service.spreadsheets.get(params, function(err, response){
        if(err){
            console.log('this.service.spreadsheets.get error:', err);
            return
        }

        callback(response);
    });
};

SheetsHelper.prototype.updateSpreadsheet = function (reservation, callback) {

    var batchUpdate = this.service.spreadsheets.batchUpdate;

    this.getSpreadsheet(function(result){
        var rowCount = result.sheets[0].properties.gridProperties.rowCount;

        var request = prepareUpdateRequests(rowCount, reservation);
        console.log('Request: %o', request);

        batchUpdate(request, function (err, response) {
            if (err) {
                console.log("ERROR in batchUpdate", err);
                return callback(err);
            }
            if(response){
                console.log('Got a response', response);
            }

           callback();
        });
    });
};

module.exports = SheetsHelper;
//endregion