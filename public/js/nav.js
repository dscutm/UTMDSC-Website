$(document).ready(function () {

    function updateScroll(position) {
        console.log(position)

        switch (position) {
            case 'body': // Body

                $('#main-nav').removeClass('nav-top');
                $('#main-nav').addClass('nav-active');




                break;
            default: // Top (Docked)
                $('#main-nav').addClass('nav-top');
                $('#main-nav').removeClass('nav-active');


                break;
        }
    };

    var wp = new Waypoint({
        element: document.getElementById('cover'),
        handler: function(direction) {
            updateScroll(direction == 'down' ? 'body' : 'top');
        },
        offset: '-50px'
    })

    updateScroll('top');
});