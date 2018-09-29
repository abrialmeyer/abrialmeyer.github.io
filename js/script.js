var nav_template, project_list_template, etc_list_template, project_template;

Handlebars.registerHelper('ifLink', function(link) {
  if( link != "" ) {
    return options.fn(this);
  }
  return options.inverse(this);
});

function showTemplate(div, template, data){
	var html = template(data);
	$(div).html(html);
}

function showProject(template, _data, id){
	var html = template(projects[_data][id]);
	$('#project').html(html);
}


var smallWindow = false;

$(document).ready(function(){
	// do all the template stuff
	var source = $("#nav-template").html();
	nav_template = Handlebars.compile(source);
	
	source = $("#project-list-template").html();
	project_list_template = Handlebars.compile(source);

	source = $("#project-template").html();
	project_template = Handlebars.compile(source);

	showTemplate("#nav", nav_template, projects);
	showTemplate("#project-list", project_list_template, projects);

	if ($(window).width() <= 992){
		smallWindow = true;
		$("#proj-list-container").removeClass('in');
	}

	listen();

})

function clearproject(){
	$('#project').empty();

	$('.project-nav').animate({
		"font-size" : "1em",
		}, 50)
}

function listen() {

	// FILTER PROJ LIST BY TYPE
	// $('.type').click(function(){
	// 	var typefilter = $(this).attr("data-type");
				
	// 	$('.type').animate({
	// 		"margin-left" : "0"
	// 		}, 50)

	// 	$(this).animate({
	// 		"margin-left" : "0.5em",
	// 		}, 50)
				
	// 	$('.project-nav').filter('[data-type!=' + typefilter + ']')
	// 		.animate({
	// 		"margin-left" : "0"
	// 		}, 50)

	// 	$('.project-nav').filter('[data-type=' + typefilter + ']')
	// 		.animate({
	// 		"margin-left" : "1em",
	// 		}, 50)
	// })

	// $('#experiments').click(function(){
	// 	clickExperiments();		
	// })



	//SHOW SELECTED PROJECT
	$('.project-nav').click(function(){
		var projid = $(this).attr("data-id")
		
		$('.project-nav').animate({
			"font-size" : "1em",
			}, 50)
		
		$(this).animate({
			"font-size" : "1.3em",
			}, 50)
		
		$('#project').empty();
		
		showProject(project_template, "main", projid);
		
		$('.project-container').show()
		
	})


	$('#name').click(function(){
		clearproject();
	})

	$('#email').click(function(){
		clearproject();
		$('#project').html('<div id="displayemail"> abrial[at]abrialmeyer[dot]com </div>')
	})

	$('#about').click(function(){
		clearproject();
		var text = "";
		for (i = 0; i < projects.about.text.length; i ++) {
			text = text + '<p>' + projects.about.text[i] + '</p>'
		}
		$('#project').html('<div id="displayemail"> ' + text + ' <a id="resume" target="_blank" href="' + projects.about.resume + '"> Click here for my resume </a> </div>')
	})
	// $('#resume').click(function(){
	// 	clearproject();
	// 	add resume

	// }

	$(window).resize(function(){
	  if ($(window).width() >= 992){ 
	  	smallWindow = false; 
	    $("#proj-list-container").addClass('in');
	  }
	  if ($(window).width() <= 992){  
	  	smallWindow = true;
	    $("#proj-list-container").removeClass('in');
	  }
	});

}
