$(document).ready(function () {

    function generateCurrentEvent(image, date, title, location, description, url) {
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

            '</b>\n'

            + location +
            '              <h5>\n' +

            description +

            '              </h5>\n' +
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

    function generateArchivedEvent(image, date, title, location, description, url) {
        return '<!-- Event object -->\n' +
            '<div class="event-object">\n' +
            '              <h5>\n' +

            date +

            '              </h5>\n' +
            '\n' +
            '              <h5>\n' +
            '                <b>'+

            title +

            '</b> ' + location +

            '              </h5>\n' +
            '\n' +
            '              <h6>\n' +

            description +

            '              </h6>\n' +
            '        </div>'


    }


    $.get('https://us-central1-utm-254105.cloudfunctions.net/events', function(data) {

        console.log(data);

        var currentBuffer = '';
        var archivedBuffer = '';

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

            if (dateObj >= new Date()) { // In the future
                currentBuffer += generateCurrentEvent(event['logo'] != null ? event['logo']['original']['url'] : 'images/defaultevent.png', date, event['name']['text'], event['venue'] == null ? '' : (' @ ' + event['venue']['address']['localized_multi_line_address_display'][0]), event['summary'], event['url']);
            } else {
                archivedBuffer += generateArchivedEvent(event['logo'] != null ? event['logo']['original']['url'] : 'images/defaultevent.png', date, event['name']['text'], event['venue'] == null ? '' : (' @ ' + event['venue']['address']['localized_multi_line_address_display'][0]), event['summary'], event['url']);

            }
        }

        console.log(currentBuffer)

        if (currentBuffer == '') {
            currentBuffer = '       <div class="event-object" style="text-align: center">\n' +
                '              <div class="events-info"></div>\n' +
                '              <h1 style="transform: translateY(-50%) !important;">No upcoming events <i class="fas fa-sad-tear"></i></h1>\n' +
                '          </div>\n'
        }

        if (archivedBuffer != '') {
            $('#archived-events').css('display', 'block');
        }

        $('#generate-events').html(currentBuffer);
        $('#generate-archived-events').html(archivedBuffer);



    });


});