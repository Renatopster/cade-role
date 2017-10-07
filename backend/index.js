'use strict';
const EventSearch = require("facebook-events-by-location-core");

exports.handler = (event, context, callback) => {
    const options = event.queryStringParameters;
    options.accessToken = options.access_token || process.env.FEBL_ACCESS_TOKEN || null;

    const es = new EventSearch();

    // Search and handle results
    es.search(options)
        .then(function (events) {
            callback(null, {statusCode: 200, body: JSON.stringify(events, null, 2)});
        })
        .catch(function (error) {
            callback(null, {statusCode: 501, body: JSON.stringify(error, null, 2)});
        });
}