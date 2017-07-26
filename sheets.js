var google = require('googleapis');
var googleAuth = require('google-auth-library');
var util = require('util');
//region Models
var COLUMNS = [
    { field: 'timestamp', header: 'Timestamp' },
    { field: 'reservationDates', header: 'Reservation Dates'},
    { field: 'location', header: 'Location' },
    { field: 'occupancy', header: 'Occupancy' },
    { field: 'firstName', header: 'First Name' },
    { field: 'lastName', header: 'Last Name' },
    { field: 'email', header: 'E-mail'},
    { field: 'message', header: 'Message'},
    { field: 'status', header: 'Status'}
];
//endregion

//regionPrivate sheets.js functions
function buildRowsForOrders(orders) {
    return orders.map(function(order) {
        var cells = COLUMNS.map(function(column) {
            switch (column.field) {
                case 'unitsOrdered':
                    return {
                        userEnteredValue: {
                            numberValue: order.unitsOrdered
                        },
                        userEnteredFormat: {
                            numberFormat: {
                                type: 'NUMBER',
                                pattern: '#,##0'
                            }
                        }
                    };
                    break;
                case 'unitPrice':
                    return {
                        userEnteredValue: {
                            numberValue: order.unitPrice
                        },
                        userEnteredFormat: {
                            numberFormat: {
                                type: 'CURRENCY',
                                pattern: '"$"#,##0.00'
                            }
                        }
                    };
                    break;
                case 'status':
                    return {
                        userEnteredValue: {
                            stringValue: order.status
                        },
                        dataValidation: {
                            condition: {
                                type: 'ONE_OF_LIST',
                                values: [
                                    { userEnteredValue: 'PENDING' },
                                    { userEnteredValue: 'SHIPPED' },
                                    { userEnteredValue: 'DELIVERED' }
                                ]
                            },
                            strict: true,
                            showCustomUi: true
                        }
                    };
                    break;
                default:
                    return {
                        userEnteredValue: {
                            stringValue: order[column.field].toString()
                        }
                    };
            }
        });
        return {
            values: cells
        };
    });
}
//endregion

var API_KEY = 'AIzaSyBXAUZjwkkrm6OCa-C-YE-yv9Gk7Kte6Cs';

//region SheetHelper Definition and export
var SheetsHelper = function () {
    this.service = google.sheets({version: 'v4', auth: API_KEY});
};

SheetsHelper.prototype.updateSpreadsheet = function(spreadsheetId, sheetId, reservation, callback) {
    var requests = [];
    // Resize the sheet.
    requests.push({
        updateSheetProperties: {
            properties: {
                sheetId: sheetId,
                gridProperties: {
                    rowCount: orders.length + 1,
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
                sheetId: sheetId,
                rowIndex: 1,
                columnIndex: 0
            },
            rows: buildRowsForOrders(orders),
            fields: '*'
        }
    });
    // Send the batchUpdate request.
    var request = {
        spreadsheetId: spreadsheetId,
        resource: {
            requests: requests
        }
    };
    this.service.spreadsheets.batchUpdate(request, function(err) {
        if (err) {
            return callback(err);
        }
        return callback();
    });
};

module.exports = SheetsHelper;
//endregion