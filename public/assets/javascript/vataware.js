// (c) vataware. all rights reserved.

var googleMapStyles = {
	blue: [{featureType:"transit.station.airport",stylers:[{visibility:"on"},{hue:"#2c3e50"},{saturation:10},{gamma:0.3}]},{featureType:"landscape",stylers:[{color:"#2c5a71"}]},{featureType:"water",stylers:[{color:"#2c3e50"}]},{featureType:"road",stylers:[{visibility:"off"}]},{featureType:"administrative.country",elementType:"geometry",stylers:[{visibility:"on"},{color:"#ffffff"},{weight:0.5}]},{featureType:"administrative.country",elementType:"labels",stylers:[{visibility:"on"},{color:"#FFFFFF"},{weight:0.1}]},{featureType:"administrative.locality",elementType:"labels",stylers:[{visibility:"off"}]},{featureType:"administrative.province",stylers:[{visibility:"off"}]},{featureType:"poi",elementType:"labels",stylers:[{visibility:"off"}]},{featureType:"poi",stylers:[{visibility:"off"}]},{featureType:"administrative.locality",elementType:"labels",stylers:[{visibility:"on"},{weight:0.1},{color:"#dddddd"}]},{featureType:"transit.line",stylers:[{visibility:"off"}]}]
};

function getMapHeight() {
	return Math.max(400, ($(window).height()-$('header').outerHeight()));
}

function isVisible(elem) {
	var docViewTop = $(window).scrollTop();
	var docViewBottom = docViewTop + $(window).height();

	var elemTop = $(elem).offset().top;
	var elemBottom = elemTop + $(elem).height();

	return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}

$('body').on('mousewheel', function(e) {
	if($('body').hasClass('map-loaded')) {
		if($(window).scrollTop() === 0) {
			$('.vataware-map-container').hover(function() {
				$('body').css('overflow','hidden');
			}, function() {
				$('body').css('overflow','scroll');
			});
			$(':not(.vataware-map-container)').mouseover(function() {
				$('body').css('overflow','scroll');
			});
		} else {
			$('body').css('overflow','scroll');
		}
	} else if($(window).scrollTop() <= 0 && e.originalEvent.wheelDeltaY > 0) {
		$('.vataware-map-container').animate({
			height: getMapHeight()
		}, {
			done: function() {
				globalMap();
			}
		});
		$('body').addClass('map-loaded');
	}
});

$(document).ready(function() {
	$('tbody.rowlink').rowlink();

	$('#search .searchField').popover({
		html: true,
		placement: 'bottom',
		trigger: 'focus',
		title: 'Quick Search',
		content: $('#search .searchTips').html(),
		container: 'body'
	});
});

$(window).resize(function() { $('.vataware-map-container').height(getMapHeight()); });

function createPieChart(element, data, legend) {
	if(typeof legend == 'undefined') {
		legend = false;

	}
	$.plot(element, data, {
		series: {
			pie: {
				show: true,
				radius: 110,
				highlight: {
					opacity: 0.25
				},
				stroke: {
					color: '#fff',
					width: 0
				},
				// startAngle: 0,
				label: false
			}
		},
		legend: {
			show: legend,
			labelFormatter: function(label, series) {
				if(legend) {
					return '<div class="chart-legend">' + label + '<br /><small>' + series.data[0][1] + ' minutes </small></div>';
				} else {
					return '<div class="chart-label">' + label + '</div>';
				}
			},
		},
		grid: {
			hoverable: true,
		},
	});
}