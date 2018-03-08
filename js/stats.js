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