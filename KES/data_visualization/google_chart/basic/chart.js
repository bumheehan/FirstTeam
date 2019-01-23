// Load the Visualization API and the corechart package.
/*
	(1) Version
			current

				이것은 새로운 릴리스를 출시 할 때마다 변경되는 최신 공식 릴리스입니다.
				이 버전은 이상적으로 잘 테스트되고 버그가 없지만, 작동 중이라면 특정 고정 버전을 대신 지정할 수 있습니다.

			upcoming

				이것은 차기 릴리스를위한 것이며 아직 테스트 중이며 공식 릴리스가 되기 전입니다.
				이 버전이 공식 릴리스가되기 전에 해결해야 할 문제가 있는지 여부를
				가능한 한 빨리 알 수 있도록이 버전을 정기적으로 테스트하십시오
				둘의 차이는 거의 없으며 새 릴리즈가 진행되는 경우를 제외하고는 동일
				일반적으로 새로운 기능을 테스트하기를 원할때 사용

			고정된 버전은 번호로 식별됨
			https://developers.google.com/chart/interactive/docs/release_notes#Releases

			고정 된 버전을 로드하려면
			<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
			<script type="text/javascript">
				 google.charts.load('43', {packages: ['corechart']});
				 google.charts.setOnLoadCallback(drawChart);
			</script>

			여기에 최신버젼 발표와 공지
			https://groups.google.com/forum/#!forum/google-visualization-api

	(2) Package
			corechart
				bar, column, line, area, stepped area, bubble, pie,
				donut, combo, candlestick, histogram, scatter

		45 버전 이후부터는 추가 패키지 로드를 하기위해 두번 이상 호출 할 수 있지만
		그럴 경우 매번 동일한 버전 번호와 언어를 설정해야함

		!!Limitations(제한사항)

			(1)google.charts.load 를 한번만 할 수 있다
				그러나 모든 페키지를 나열 할 수 있으니 한번만 해도 된다
			(2)autoload 라이브러리는 사용할 수 없다
			(3)ChartWrapper를 사용하는 경우 ChartWrapper를 사용해서
				자동으로 로드하는 대신 필요한 모든 패키지를 명시 적으로 로드해야함
			(4)Geochart & Map Chart는 기존 라이브러리 로더와 새 라이브러리 로더를 모두 로드해야함
				<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
				<script type="text/javascript" src="https://www.google.com/jsapi"></script>

*/
google.charts.load('current', {
	'packages': ['corechart']
});

// Set a callback to run when the Google Visualization API is loaded.
/*
	예제는 웹페이지 어딘가에 drawchart라는 변수가 정의되었다고 가정함
 	google.charts.setOnLoadCallBack();
	라는 함수의 이름은 원하는대로 지정할 수 있지만 전역적으로 고유해야하며
	함수를 참조하기전에 정의해아함

	이전 버전에서는
	<script type="text/javascript" src="https://www.google.com/jsapi"></script>
	<script type="text/javascript">
	  google.load("visualization", "1", {packages:["corechart"]});
	  google.setOnLoadCallback(drawChart);
	</script>

	새로운 버전에서는
	<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
	<script type="text/javascript">
	  google.charts.load('current', {packages: ['corechart']});
	  google.charts.setOnLoadCallback(drawChart);
	</script>

*/
google.charts.setOnLoadCallback(drawChart);
//google.charts.setOnLoadCallback(soozlChart);

// Callback that creates and populates a data table,
// instantiates the pie chart, passes in the data and
// draws it
function drawChart() {
	// Define the chart to be draw
	var data = new google.visualization.DataTable();
	data.addColumn('string', 'Topping');
	data.addColumn('number', 'Slices');

	// Create the data table.
	data.addRows([
	['매울신경식 게임', 10],
	['김은수 게임', 57],
	['패트와 메트 게임', 22],
	['CSS 게임', 30],
	]);

	// Set chart options
	var options = {
		'title': '인기 게임 차트',
//		'width': 500,
//		'height': 400,
		'is3D': true,
		'legend': 'left',
		fontName: 'Roboto',
		fontSize: 12,
		backgroundColor: '#E9D5B9',
		colors: ['#7CB064', '#BE2748', '#55485E', '#42241A', '#FA7A9D', '#E0E4D5'],
		titleTextStyle: {fontSize: 26, color: '#333'},
		chartArea: {width: '90%'}
	};

	// Instantiate and draw our chart, passing in some options.
	/*
		파이 차트를 바 차트로 변경하려면
		google.visualization.BarChart
		width : 500;
	*/
	var chart = new google.visualization.PieChart(document.getElementById('chart_div2'));
	chart.draw(data, options);
}

var wrapper;
function drawVisualization() {

  // Draw a column chart
  wrapper = new google.visualization.ChartWrapper({
    chartType: 'ColumnChart',
    dataTable: [['Germany', 'USA', 'Brazil', 'Canada', 'France', 'RU'],
                [700, 300, 400, 500, 600, 800]],
    options: {'title': 'Countries'},
    containerId: 'visualization'
  });

  // Never called.
  google.visualization.events.addListener(wrapper, 'onmouseover', uselessHandler);

  // Must wait for the ready event in order to
  // request the chart and subscribe to 'onmouseover'.
  google.visualization.events.addListener(wrapper, 'ready', onReady);

  var json = wrapper.toJSON();
  alert(console.log(json));
  wrapper.draw();
  // Never called
  function uselessHandler() {
    alert("I am never called!");
  }

  function onReady() {
    google.visualization.events.addListener(wrapper.getChart(), 'onmouseover', usefulHandler);
  }

  // Called
  function usefulHandler() {
    alert("Mouseover event!");
  }
}
function soozlChart(){
	var data = new google.visualization.DataTable();
	data.addColumn('string', '나이');
	data.addColumn('number', '명');
	data.addRows([
		['10대', 28],
		['20대', 32],
		['30대', 29]
	]);
	var options = {title: '회원 나이'
                    };
	var chart = new google.visualization.PieChart(document.getElementById('chart_div2'));
        chart.draw(data, options);
}
