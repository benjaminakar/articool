/* Disable refresh on submit & AJAX */
$(document).ready(function() {
    $('#registerForm').submit(function(event) {
    event.preventDefault();
    });
});

/* Ajax calls */
$('#register_submit').click(function() {

var username = $('#username').val();
var firstname = $('#first_name').val();
var lastname = $('#last_name').val();
var email = $('#email_address').val();
var password = $('#password').val();

$.ajax({
    url: baseUrl + 'auth/register',
    type: 'post',
    data: {
        username: username,
        first_name: firstname,
        last_name: lastname,
        email_address: email,
        password: password
    },
    dataType: 'json',
    success: function (feedback) {

        /* If user logged in, send to profile */
        if(feedback.success == true) {
            setTimeout(function() {
                window.location.href = basePath + 'profile/' + feedback.data.username;
            }, 2500);
        }

        // display error messages properly through our alert div
        if( feedback.success == false) {
            $('#alert_div').removeClass('hidden'); 
            $('#alert_div').removeClass('is-success'); 
            $('#alert_div').addClass('is-error'); 
            $('#alert_title').html('ERROR');
        } else if(feedback.success == true) {
            $('#alert_div').removeClass('hidden');
            $('#alert_div').removeClass('is-error');
            $('#alert_div').addClass('is-success'); 
            $('#alert_title').html('SUCCESS');

            setTimeout(function(){
                $('#alert_div').addClass('hidden');
            }, 2500);
        }

        $('#feedback_message').html(feedback.messages.join('<br />'));
    }
});
    
});


