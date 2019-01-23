var wrapper;

google.charts.load('current'); // Don't need to specify chart libraries!
google.charts.setOnLoadCallback(drawVisualization);

function drawVisualization() {

	// Draw a column chart
	wrapper = new google.visualization.ChartWrapper({
		chartType: 'ColumnChart',
		dataTable: [['', 'Germany', 'USA', 'Brazil', 'Canada', 'France', 'RU'],
                ['', 300, 500, 400, 500, 600, 800]],
		options: {
			'title': 'Countries'
		},
		containerId: 'chart_div'
	});

	// Never called.
	google.visualization.events.addListener(wrapper, 'onmouseover', uselessHandler);

	// Must wait for the ready event in order to
	// request the chart and subscribe to 'onmouseover'.

	// select, onReady, onError 테스트
	google.visualization.events.addListener(wrapper, 'select', onSelect);
	google.visualization.events.addListener(wrapper, 'ready', onReady);
	google.visualization.events.addListener(wrapper, 'error', onError);

	// ChartWrapper api 테스트
	var json = wrapper.toJSON();
	var containerId = wrapper.getContainerId();

	console.log("#test_json: "+json);
	console.log("#test_containerId: "+containerId);

	wrapper.draw();
	// Never called
	function uselessHandler() {
		alert("I am never called!");
	}
	function onSelect() {
		alert("셀렉트테스트");
	}
	function onReady() {
//		google.visualization.events.addListener(wrapper.getChart(), 'onmouseover', usefulHandler);
	}
	// Called
	function usefulHandler() {
		alert("Mouseover event!");
	}
	function onError(){
		alert("에러테스트");
	}
}
