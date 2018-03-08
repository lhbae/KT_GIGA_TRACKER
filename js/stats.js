$(function () {

	// 컬럼(세로막대)차트 공통
	var chartBarOptions = {
		chart: {
			type: 'column',
			backgroundColor: 'rgba(0,0,0,0)'
		},
		title: {
			text: ''
		},
		subtitle: {
			text: ''
		},
		credits: {
			enabled: false
		},
		legend: {
			enabled: true,
			floating: true,
			align: 'right',
			verticalAlign: 'top',
			y: -60,
			layout: 'horizontal'
		},
		tooltip: {
			useHTML: true,
			backgroundColor: null,
			borderWidth: 0,
			shadow: false,
			formatter: function () {
				return '<div class="tooltip" style="background-color:' + this.color + ';border-color:' + this.color + '"><p>'+ this.x + '</p>' + this.series.name + ' : <span style="font-weight:bold">' + this.y + '</span></div>';
			}
		},
		xAxis: {
			crosshair: true,
			allowDecimals: false,
			labels: {
				formatter: function () {
					return this.value;
				},
				style: {color: "rgb(156, 155, 155,.2)"}
			},
			lineColor: 'rgba(156, 155, 155,.2)',
			lineWidth: 1,
			tickWidth: 1 // x축 라벨 눈금
		},
		yAxis: {
			title: {
				text: '',
				style: {color: "#9c9b9b"}
			},
			labels: {
				formatter: function () {
					return this.value;
				},
				style: {color: "#9c9b9b"}
			},
			gridLineColor: 'rgba(156, 155, 155,.2)',
			gridLineWidth: 1
		},
		plotOptions: {
			column: {
				borderWidth: 0
			},
			series: {
				pointWidth: 18,
				animation: {
					duration: 2000,
					easing: 'easeOutBounce'
				}
			}
		}
	};

	// 지역별 트래킹 통계
	var chartAreaData = (function () {
		var chart = new Highcharts.Chart(Highcharts.merge(chartBarOptions, {
			chart: {
				renderTo: 'areaData',
				width: 850,
				height: 490
			},
			title: {
				text: '',
				style: {fontSize: 12, color: "#9c9b9b"},
				x: -380,
				y: 172
			},
			colors: ["#07c5c7"],
			xAxis: {
				categories: ['서울', '부산', '대구', '인천', '광주', '대전', '울산', '세종', '경기', '강원', '충청', '전라', '경상', '제주'],
				labels: {
					x: 0,
					y: 30,
					style: {color: '#9c9b9b'}
				}
			},
			yAxis: {
				min: 0,
				max: 250,
				labels: {
					style: {color: '#9c9b9b'}
				}
			},
			series: [{
				name: '등록(매핑)',
				data: [10, 15, 6, 10, 8, 18, 8, 3, 14, 7, 4, 2, 3, 10],
				color:'#07c5c7'
				
			},
			{
				name: '수집',
				data: [150, 200, 100, 50, 20, 10, 150, 200, 170, 20, 15, 5, 25, 45],
				color:'#f65161'
			}]
		}));
    })();

	// 지역별 트래킹 통계
	var chartAreaDetail = (function () {
		var chart = new Highcharts.Chart(Highcharts.merge(chartBarOptions, {
			chart: {
				renderTo: 'areaDetail',
				width: 850,
				height: 490
			},
			title: {
				text: '',
				style: {fontSize: 12, color: "#9c9b9b"},
				x: -380,
				y: 172
			},
			colors: ["#07c5c7"],
			xAxis: {
				categories: ['서울', '부산', '대구', '인천', '광주', '대전', '울산', '세종', '경기', '강원', '충청', '전라', '경상', '제주'],
				labels: {
					x: 0,
					y: 30,
					style: {color: '#9c9b9b'}
				}
			},
			yAxis: {
				min: 0,
				max: 250,
				labels: {
					style: {color: '#9c9b9b'}
				}
			},
			series: [{
				name: '등록(매핑)',
				data: [10, 15, 6, 10, 8, 18, 8, 3, 14, 7, 4, 2, 3, 10],
				color:'#07c5c7'
				
			},
			{
				name: '수집',
				data: [150, 200, 100, 50, 20, 10, 150, 200, 170, 20, 15, 5, 25, 45],
				color:'#f65161'
			}]
		}));
	})();
});