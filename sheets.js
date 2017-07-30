var google = require('googleapis');
var util = require('util');

//region Constants
//var key = require('./server.json');
var jwtClient = new google.auth.JWT(
    "nodeserver@ardent-fusion-174722.iam.gserviceaccount.com",
    null,
    "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQChIEg+4aRblPAe\n5cQ84DRMrVXxrGEbus0riPTyry4DxTsliMceJu23EPPWZO74wEewCfzHyD7+uRVf\nMF3uu5G6HPQ4Y7O7Rn5uVmi8kjW9FTqSOqjYKA2oV8ksP/zflqsz/sFAHVcY2OBZ\njqB4stHNgmQdqSg2g+vV5wkliAqhf/RjpzO8fFYj8+yE8UVI5fe6G9MIeDQvPBsp\nJWSrElBwfgrS8YEuZv3h0D3fwz4NncYtnTKtIkd8yUVWuKKM5kFJeVXNCltwoq9x\nPbMRSXrmKPlFY5x+p+fUfFtCDl+X0kFawWTzTwZ2J9L28/y6bWO/zhlzs83siFMS\nMGoeUF/rAgMBAAECggEAL6JqmWR+AbE7d/b3mAO0koKgKO2MW/VS2K8Js4GEugqi\nHMueClT57Cgv3k9Csvmtd+bL+4hAz2+KWPTkoEKFp58NuGoJZbFGiXo0RqN3Daps\nAXUkG5tjxkQFrnZQXQ2fGaUUHs9Nw4PCd9eJq4U6L2aAEKDEybEglMFT2+unMO06\nDP4hae2bX69cQcpNWhzCtJeagct//3QFLlTBLYBFHJI5N7HhgVMsE01HfBWH90eu\nCm39k37Jr0fLMspe+d07MFvaxpovNOvkVN1NXkllgCz1sxopOHdMOxU5t54063U/\nwGgGs6z8Phl/XnavPf2xXrnNd+LpCZaCNnzNgH4wCQKBgQDMnp4TZsGNgzPw8nQc\nHg1DkK36s1YbB9AtNGesjPIka8Prw5xEnjHVkep0btXo9J3lj7plRwQnGbxc2Tze\nMpnyCv25ELhpHiyyAmAo/sDUq7UEtdvz/vp9g8adNqwvwkk8z25ABjYWgzowvN85\nG2JG3z+F+07h8HaldzBe96y+jwKBgQDJlc9yVVie/X6sDhM0ZJJ6xgY6aBtZZU+D\nbc/QbREdRmQHYinQ+yucynFOA7xFsaPAuCcc68LqW8OH1H8B2w4aPURGW1nj2kMG\nQzOa6Tu9ZW2uSysO0wtB4PZeiy4D5Has67qjtTljpzjE8Axq393kuuJ5tZChkCAp\ngL70+cx25QKBgA/dKFJGwDDRgEBo+7mGVu7rE6IBL2bPF0O58WO+VbOfK0RnGQF0\n5lYxhuTaBvmVpXw7xW6+r8K8Sw9DxGVRtP+//GXRtwpnTX3Lk1r6TUbvvQwNcW0c\nUp1Sjx53M6hMPtNZHaoXETBzohpPOls6FUd7XXhswHPh6cDwWa6zMxBfAoGAfK9E\n2JshbXWt3A34ovdyAq5pO8cY43pebBSH7YsIgur/A/Ibmz9AAoLVAkQdN55ggttk\nlebdcMfBcUpmJGexmVk72ai3OM/PlRgL201XvhX2eU/VGh4/YEgdGu1LUO0G2n4T\nux5kmNbdrjIr/A7r2IYffthm1QeoXQNdGXlIlmECgYAaexzTDFeCHrIB1F6vVntQ\nPhYE97QTzZX7Ns8ueHy+xJpvyBuRaeTBasnPqtB/47MiWxRwPXe94xGCrpedSPT1\n0sZTB2o7uRHgEmhS6trSuvMvvlI2EvFTPrBe+1xdea4Y1Rl73SwsFsRc1IpjAHrt\n0kTFp+Ka0aYBbySYGdZMUA==\n-----END PRIVATE KEY-----\n",
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