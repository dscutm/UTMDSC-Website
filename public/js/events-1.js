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


    $.get('https://us-central1-utm-254105.cloudfunctions.net/events', function(data) {


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

            var date = months[dateObj.getMonth()] + ' ' + dateObj.getDate() + ', ' + dateObj.getFullYear() + ' @ ' + hours + ':' + minutes + ' ' + ampm

            buffer += generateEvent(event['logo'] != null ? event['logo']['original']['url'] : 'images/defaultevent.png', date, event['name']['text'], '', event['summary'], event['url']);

        }

        console.log(buffer)

        $('#generate-events').html(buffer);



    });


});