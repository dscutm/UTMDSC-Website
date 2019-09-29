$(document).ready(function () {

    function generateEvent(image, date, title, location, description, url) {
        return '<!-- Event object -->\n' +
            '<div class="event-object">\n' +
            '          <div class="row">\n' +
            '            <div class="col-md-5">\n' +
            '              <img src="' +

            image +

            '" style="width: 100%">\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-sm-7">\n' +
            '              <h5>\n' +

            date +

            '              </h5>\n' +
            '\n' +
            '              <h5>\n' +
            '                <b>'+

            title +

            '</b>\n' +
            '              </h5>\n' +
            '\n' +
            '              <h5>\n' +

            location +

            '              </h5>\n' +
            '\n' +
            '              <h6>\n' +

            description +

            '              </h6>\n' +
            '\n' +
            '              <br>\n' +
            '\n' +
            '              <a href="' +

            url +

            '" target="_blank"><button type="button" class="btn btn-success">View on eventbrite</button></a>\n' +
            '            </div>\n' +
            '          </div>\n' +
            '        </div>'


    }


    //$.get('api/events', function(data) {

    var data = {
        "pagination":{
            "object_count":1,
            "page_number":1,
            "page_size":50,
            "page_count":1,
            "has_more_items":false
        },
        "events":[
            {
                "name":{
                    "text":"UTM DSC Cloud Study Jam",
                    "html":"UTM DSC Cloud Study Jam"
                },
                "description":{
                    "text":"Learn the fundamental tools of Google Cloud and earn your Google Cloud Platform essentials certification!",
                    "html":"Learn the fundamental tools of Google Cloud and earn your Google Cloud Platform essentials certification!"
                },
                "id":"73706246367",
                "url":"https://www.eventbrite.com/e/utm-dsc-cloud-study-jam-tickets-73706246367",
                "start":{
                    "timezone":"America/Toronto",
                    "local":"2019-10-04T16:00:00",
                    "utc":"2019-10-04T20:00:00Z"
                },
                "end":{
                    "timezone":"America/Toronto",
                    "local":"2019-10-04T21:00:00",
                    "utc":"2019-10-05T01:00:00Z"
                },
                "organization_id":"342324706637",
                "created":"2019-09-21T22:17:59Z",
                "changed":"2019-09-28T17:46:19Z",
                "published":"2019-09-21T22:47:09Z",
                "capacity":150,
                "capacity_is_custom":true,
                "status":"live",
                "currency":"USD",
                "listed":true,
                "shareable":false,
                "invite_only":false,
                "online_event":false,
                "show_remaining":false,
                "tx_time_limit":480,
                "hide_start_date":false,
                "hide_end_date":false,
                "locale":"en_US",
                "is_locked":false,
                "privacy_setting":"unlocked",
                "is_series":false,
                "is_series_parent":false,
                "inventory_type":"limited",
                "is_reserved_seating":false,
                "show_pick_a_seat":false,
                "show_seatmap_thumbnail":false,
                "show_colors_in_seatmap_thumbnail":false,
                "source":"coyote",
                "is_free":true,
                "version":"3.7.0",
                "summary":"Learn the fundamental tools of Google Cloud and earn your Google Cloud Platform essentials certification!",
                "logo_id":"73820423",
                "organizer_id":"27163332577",
                "venue_id":"39073551",
                "category_id":"102",
                "subcategory_id":null,
                "format_id":"9",
                "resource_uri":"https://www.eventbriteapi.com/v3/events/73706246367/",
                "is_externally_ticketed":false,
                "logo":{
                    "crop_mask":{
                        "top_left":{
                            "x":0,
                            "y":0
                        },
                        "width":2160,
                        "height":1080
                    },
                    "original":{
                        "url":"https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F73820423%2F342324706637%2F1%2Foriginal.20190921-233159?auto=compress&s=383dc0a6136c29ae7845747fd3579b29",
                        "width":2160,
                        "height":1080
                    },
                    "id":"73820423",
                    "url":"https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F73820423%2F342324706637%2F1%2Foriginal.20190921-233159?h=200&w=450&auto=compress&rect=0%2C0%2C2160%2C1080&s=e7721f48852ac1b8af9c28bc6071b18c",
                    "aspect_ratio":"2",
                    "edge_color":"#ffffff",
                    "edge_color_set":true
                }
            }
        ]
    }

        console.log(data);

        var buffer = '';

        var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

        for (var i in data['events']) {
            var event = data['events'][i]

            var rawDate = event['start']['local'];

            var dateObj = new Date(rawDate);

            var hours = dateObj.getHours() % 12 == 0 ? 12 : dateObj.getHours() % 12
            var minutes = dateObj.getMinutes()

            if (minutes < 10) {
                minutes = '0' + minutes
            }

            var ampm = dateObj.getHours() >= 12 ? 'PM' : 'AM'

            var date = months[dateObj.getMonth() + 1] + ' ' + dateObj.getDate() + ', ' + dateObj.getFullYear() + ' @ ' + hours + ':' + minutes + ' ' + ampm


            buffer += generateEvent(event['logo']['original']['url'], date, event['name']['text'], '', event['summary'], event['url']);

        }

        console.log(buffer)

        $('#generate-events').html(buffer);



    //});


});