$(function () {

	$('#applicationForm input,#applicationForm textarea, #applicationForm select').jqBootstrapValidation({
		preventSubmit: true,
		submitError: function ($form, event, errors) {
			// additional error messages or events
		},
		submitSuccess: function ($form, event) {
			event.preventDefault(); // prevent default submit behaviour
			// get values from FORM
			var name = $('#applicationForm input#name').val();
			var email = $('#applicationForm input#email').val();
			var subject = $('#applicationForm input#subject').val();
			var year = $('#applicationForm input#year').val();
			var college = $('#applicationForm input#college').val();
            var university = $('#applicationForm select#university').val();
			var experience = $('#applicationForm textarea#experience').val();
			var interest = $('#applicationForm textarea#interest').val();
			var questions = $('#applicationForm textarea#questions').val();
			var firstName = name; // For Success/Failure Message
			// Check for white space in name for Success/Fail message
			if (firstName.indexOf(' ') >= 0) {
				firstName = name.split(' ').slice(0, -1).join(' ');
			}

			// Success message
			$('#applicationForm #success').html("<div class='alert alert-info'>");
			$('#applicationForm #success > .alert-info').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
				.append('</button>');
			$('#applicationForm #success > .alert-info')
				.append('<strong>Please wait while we try to send your message. This may take some time. </strong>');
			$('#applicationForm #success > .alert-info')
				.append('</div>');

			$.ajax({
				url: '/api/applications/create',
				type: 'POST',
				data: {
					name: name,
					email: email,
					subject: subject,
					year: year,
					college: college,
                    university: university,
					experience: experience,
					interest: interest,
					questions: questions
				},
				cache: false,
				success: function () {
					// Success message
					$('#applicationForm #success').html("<div class='alert alert-success'>");
					$('#applicationForm #success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
						.append('</button>');
					$('#applicationForm #success > .alert-success')
						.append('<strong>Your application has been sent. </strong>');
					$('#applicationForm #success > .alert-success')
						.append('</div>');

					// clear all fields
					$('#applicationForm ').trigger('reset');
				},
				error: function () {
					// Fail message
					$('#applicationForm #success').html("<div class='alert alert-danger'>");
					$('#applicationForm #success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
						.append('</button>');
					$('#applicationForm #success > .alert-danger').append('<strong>Sorry ' + firstName + ', it seems that my application server is not responding. Please try again later!');
					$('#applicationForm #success > .alert-danger').append('</div>');
					// clear all fields
					$('#applicationForm ').trigger('reset');
				},
			});
		},
		filter: function () {
			return $(this).is(':visible');
		},
	});

	$('a[data-toggle="tab"]').click(function (e) {
		e.preventDefault();
		$(this).tab('show');
	});
});


/* When clicking on Full hide fail/success boxes */
$('#applicationForm #name').focus(function () {
	$('#applicationForm #success').html('');
});
