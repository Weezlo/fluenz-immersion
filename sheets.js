var google = require('googleapis');
var util = require('util');

//region Constants
//var key = require('./server.json');

//region real Fluenz creds
var jwtClient = new google.auth.JWT(
    "nodebackend@dulcet-equinox-175315.iam.gserviceaccount.com",
    null,
    "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDVUx+CNtAgE2Od\njSXQfX00oFSKIT0E2jo+tWLkB82lI24YhLvGN70UJ14WqSTba8gCGZehmcLgsxW0\nSC7CcW8n6d3zpSc5O/J2XKFlvpAU4UjthJDWli6UZY70gXU8eZASAXmdaM74xkKZ\nH/Mfqj/VqLtGN8OfHvpmGYLjoPa7TOkiFvFGUuyIVEvYmtLJ3eEX1wzUFFAjmx+k\nxrjzrEYTRELxpra07sHRQcoMkUqm+f+x0K0tArG34uUajuXY4BgJCQgwlvGkra9+\nR/97Cme6EoddQRJEXhT/ltDvXuNAQUGqsWvolAQorPt4fXpjSrrtyR4Et2DFnCtu\nNtCLokyJAgMBAAECggEABp1ygW7yMsBvKxxMoyO1DXv4SyU/N2aN/lJRG/ma+Kc5\n24RIL1wcnqKe4gyCMlSsCdah01bJin67KlE/s/NhC0ePBKZnKjjv6pgyQA2x+ZfH\n02e0NxdGn/7rOS1HhaXOYCSQER/GJUQ+nfF18FIu8xDtp76EcCt9f8uEOctMw1+P\nb9lsp79qNu+8Yp6nr/y+zQNfNulwUSWNaYhrvUTTHdI2Miwfp2GIgda1hEq93URS\nvGTsimmiRzzCPmnmlFq5yFKfFDYrxo4u7uG3zP4nFNFNvCASavQSP1PTy/Bf0ias\nuz9P95uf59Iizm0bvNKt0oX5Zdm2/HPdVpQAX1uVNQKBgQDqhwLubZUhnKrUBP35\n0cW3NUe44VZ/OMduB3yEOGD5tCJFjs0AuzsLiY8JBucvsY17BbNP8vgfmnCubHMT\nFDKD2ITEIIHgVdgdNv/Um+u6SWcgydzGZ05X5pc83ivCp/T7rHrh1BdZdorFCD5g\nDFX+4wiu6pTkRhVvBjbgTagvpQKBgQDo2yaXR3WF2G0u2I1Ifxwgd7+Dh1V0IWta\nTqzGE16mIzF7Voc5I8iS7jOjY0opEOyo3GdQ5wGCKioRPuQ9jsGnVKZ6kLpXGPzg\nBkNTgF2e/SuxeR7BlABALk8kvYDhWvuzH47I8s9tMs40+2PFSbVSjJaPLufGIyWj\n8awcyi+UFQKBgQCeElm7ckit2vaY6LR2CRmGHnc0+Uxfe1mPo6QdShKyuuLOly09\nbPSjFhg+MVTpJHcDkBgHru/l/SYtqhL1rQtPKkRyHKbtGW8MYeGU33LGoGrOAsC3\nSTHYtScCc4xzKtlIODyqsVT7i5aErsW73xSnM0bK/nlUUphnuHyMOks9sQKBgDhN\nNMmDJ7FTISMgjRioUz6udYnx4QGRSwms2C2UZWA6Ri6SP2PbeRW9rpKk4TuIshAq\nKnjvQfgdBcrhsAIKUFyLJS2hbMy+Z/YqzYCVGw3kHPpuVLdtd5oNGGnDwDO88frf\neICx5OF8VUuONRNwvPzWrVi1eKj5upInTvwvDs35AoGBALFm78Qvflfuc3GGLmsf\nZK2PyUhFXRHnbf8c7PyFg4mtEieLLMhjptZOItVL8lY3a1gd9ZIZ7vlzX+aCqQp2\nsmBT6JjJVpBIOfr6JHkQ3UmCDlMP/h6hDoo+XvPzbliO5V4Fb1f3wdHTi1k4m2wX\nSlvWr5XLYN/TnIu9+QK/znIw\n-----END PRIVATE KEY-----\n",
    ['https://www.googleapis.com/auth/spreadsheets'],
    null
);
//endregion

//region Development creds
// //AWS Account
// var jwtClient = new google.auth.JWT(
//     "nodeserver@ardent-fusion-174722.iam.gserviceaccount.com",
//     null,
//     "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQChIEg+4aRblPAe\n5cQ84DRMrVXxrGEbus0riPTyry4DxTsliMceJu23EPPWZO74wEewCfzHyD7+uRVf\nMF3uu5G6HPQ4Y7O7Rn5uVmi8kjW9FTqSOqjYKA2oV8ksP/zflqsz/sFAHVcY2OBZ\njqB4stHNgmQdqSg2g+vV5wkliAqhf/RjpzO8fFYj8+yE8UVI5fe6G9MIeDQvPBsp\nJWSrElBwfgrS8YEuZv3h0D3fwz4NncYtnTKtIkd8yUVWuKKM5kFJeVXNCltwoq9x\nPbMRSXrmKPlFY5x+p+fUfFtCDl+X0kFawWTzTwZ2J9L28/y6bWO/zhlzs83siFMS\nMGoeUF/rAgMBAAECggEAL6JqmWR+AbE7d/b3mAO0koKgKO2MW/VS2K8Js4GEugqi\nHMueClT57Cgv3k9Csvmtd+bL+4hAz2+KWPTkoEKFp58NuGoJZbFGiXo0RqN3Daps\nAXUkG5tjxkQFrnZQXQ2fGaUUHs9Nw4PCd9eJq4U6L2aAEKDEybEglMFT2+unMO06\nDP4hae2bX69cQcpNWhzCtJeagct//3QFLlTBLYBFHJI5N7HhgVMsE01HfBWH90eu\nCm39k37Jr0fLMspe+d07MFvaxpovNOvkVN1NXkllgCz1sxopOHdMOxU5t54063U/\nwGgGs6z8Phl/XnavPf2xXrnNd+LpCZaCNnzNgH4wCQKBgQDMnp4TZsGNgzPw8nQc\nHg1DkK36s1YbB9AtNGesjPIka8Prw5xEnjHVkep0btXo9J3lj7plRwQnGbxc2Tze\nMpnyCv25ELhpHiyyAmAo/sDUq7UEtdvz/vp9g8adNqwvwkk8z25ABjYWgzowvN85\nG2JG3z+F+07h8HaldzBe96y+jwKBgQDJlc9yVVie/X6sDhM0ZJJ6xgY6aBtZZU+D\nbc/QbREdRmQHYinQ+yucynFOA7xFsaPAuCcc68LqW8OH1H8B2w4aPURGW1nj2kMG\nQzOa6Tu9ZW2uSysO0wtB4PZeiy4D5Has67qjtTljpzjE8Axq393kuuJ5tZChkCAp\ngL70+cx25QKBgA/dKFJGwDDRgEBo+7mGVu7rE6IBL2bPF0O58WO+VbOfK0RnGQF0\n5lYxhuTaBvmVpXw7xW6+r8K8Sw9DxGVRtP+//GXRtwpnTX3Lk1r6TUbvvQwNcW0c\nUp1Sjx53M6hMPtNZHaoXETBzohpPOls6FUd7XXhswHPh6cDwWa6zMxBfAoGAfK9E\n2JshbXWt3A34ovdyAq5pO8cY43pebBSH7YsIgur/A/Ibmz9AAoLVAkQdN55ggttk\nlebdcMfBcUpmJGexmVk72ai3OM/PlRgL201XvhX2eU/VGh4/YEgdGu1LUO0G2n4T\nux5kmNbdrjIr/A7r2IYffthm1QeoXQNdGXlIlmECgYAaexzTDFeCHrIB1F6vVntQ\nPhYE97QTzZX7Ns8ueHy+xJpvyBuRaeTBasnPqtB/47MiWxRwPXe94xGCrpedSPT1\n0sZTB2o7uRHgEmhS6trSuvMvvlI2EvFTPrBe+1xdea4Y1Rl73SwsFsRc1IpjAHrt\n0kTFp+Ka0aYBbySYGdZMUA==\n-----END PRIVATE KEY-----\n",
//     ['https://www.googleapis.com/auth/spreadsheets'],
//     null
// );
//endregion

//region localhost creds
// var jwtClient = new google.auth.JWT(
//     "localserver@ardent-fusion-174722.iam.gserviceaccount.com",
//     null,
//     "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDdc2YpQ2SkbsTx\nJEiYr0DntzPNnrLwr6x3i+8qDpCbh/k4L1chDUDSSyo8VzmtbYXFdxTSRnnY+mXC\n56+OVbKGdR4WBy0ce5emnhql8rNG/swaLhCEsFXy4R8BxDWGM/qSuP0IB46KbBS/\nKpFSAmK0xxOLxwx+k9NQ1JMDHrFJtnteMIq+2rbSZeFhIrN8SBsXUcPB/Ml3xA05\n+CP0QljqfF+83hwUQHBNzH85OYO+FSztZw1CF3Oa86th8TvAR6uj7QbbdfCyAsx5\nux8YShfJsGzDNL/1+N5TkN1LjdbLXqK8tiIVE/JKT1gxJTguBXPWIqJa3eBflY80\na54AsBcvAgMBAAECggEAR3n00oK3HD/If1DHwchnOaMvLEH53afGEfvvoPJ8iEbW\nEOVuyPM/JeEu67T3n9uG3tp1tP0cXQVNDSC80EMm0TFCGbgNPnFB3HyRe1iftt2M\nwTJ3EGzeAPvahzZuVDe4u9zLhujxgAoslBtINmEgvNq4m1gO11gdT6ydGtewP2r1\n5bbWpxOCByxTMoWNBRhHaTPko6bTeH2qsWoihefy9+pc+N+9Yf9fOvSTQRhoohms\nXSc+1IYkWNdfjA/CrtT5GhONOdzHcVSnDaZqkyir4eG04+VD/kj2xSn6Cymd/DUn\nXKBuNuHo1BoLkf/HDkXh2Hryt0Fa9Qkt2pkOtbtZsQKBgQD8b3C/C/Mawh6g1adt\nKdFVjH4o0p5W+tiwrfed+JYUM9HNkg9asgbP0wsI572GtFkgriHK2GT0IORb96XR\n5HN+F68DfkeTgw/WJtom0XMq/34Ij/5l67EYeft1JV4jyFzsiA/P73RGfpoQr4X+\n5EZfuOrzZacz45FGepqRUFGYCQKBgQDgk/LmN01N03ja4BFM5eDj/3ocUGx8AjZk\nwFKHgesFNuLcMbKEgyV2MKrzCVi5wVKhlF3W4v+8hWD75FezUADDe46u9SAdq0+p\nQ8T5d8c9aJ72w4St3bt4XpQxr+cMH4SdjlFzCYhjxlksM/gptjhXmrJZmQ29v+vN\nbidxtZvTdwKBgCC9g24D6r/ptXc+vrxV1CS4WBSLXKYDWt9vcNI4T57HKcrzyrIE\nrQV/Zcr944L5GSY374ITluRi77tN31/dtW0BPV3Cnx3uvbsUxu6J89n70SjjJCer\n7ggyqf6DnjYd4o97BjH96KLMAMdxPHvWt5nqre5rnMgKF+mANVPriumhAoGBAKhE\nMirsJK+7U0IrwMqtMuOh+Axe9em0fqzerPd7EGzHwxLY6bj/yoHT1UJkLmZ/wznt\nwKHRU2wdQ514aX2g4/GUEkRkxbt1MCrS7DM+27nXOcQKms7q5Bw8QS05bxRWSTcD\n+2MGMXsQkp/cEISwU2bQMfGQDAuwUS2K62L3f9nhAoGAFU80y7ikzdt+OR5ly6ui\nQXRmFfTb/RnZeisF2nHckCWSFUetWY8LUSMRRFbdN/rBsIfxbDKKPiLmpX1C9f1O\nPQeDIDOECGfb27FRI1RAwFQGon0puK5Uk58U6zIyAAPhSdXVwB3IjolPDMOiLrE7\nxvOjno13HxRc7/GdhTYq8aY=\n-----END PRIVATE KEY-----\n",
//     ['https://www.googleapis.com/auth/spreadsheets'],
//     null
// );
//endregion

var SPREADSHEET_ID = '1C6hHM8POcOV5-W84z38aFCmIFStis6TY7uEPMd-LcEU';
var SHEET_ID = '1086357442';

//endregion

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