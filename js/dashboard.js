$(function () {

    toast();

// 상단 우측 kt메뉴
    $('.selectmenu').accordion({
        header: '.title',
        active: false,
        icons: {"header": "fa fa-caret-down", "activeHeader": "fa fa-caret-up"},
        collapsible: true,
        animate: 200,
        heightStyle: 'content'
    });


// 메인 그래프
    var chartAreaOptions = {
        chart: {
            type: 'area',
            margin: 0,
            spacing: 0,
            width: 260,
            height: 60,
            backgroundColor: 'rgba(0,0,0,0)' // 그래프 백그라운드 컬러 투명
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
            enabled: false
        },
        xAxis: {
            visible: false
        },
        yAxis: {
            visible: false
        },
        tooltip: {
            shadow: false,
            borderRadius: 7,
            padding: 6,
            formatter: function () {
                return this.y + '대';
            }
        },
        plotOptions: {
            area: {
                marker: {
                    enabled: false,
                    symbol: 'circle',
                    radius: 2,
                    lineWidth: 0
                }
            },
            series: {
                lineWidth: 0,
                fillColor: this.colors,
                fillOpacity: 1,
                animation: {
                    duration: 2000,
                    easing: 'easeInElastic'
                }
            }
        }
    };
    var mainGraph = (function () {
        var chartPower = new Highcharts.Chart(Highcharts.merge(chartAreaOptions, {
            chart: {
                renderTo: 'chart-power'
            },
            series: [{
                data: [7, 5, 7, 6, 9, 11, 12, 7, 8, 5, 2, 4, 0, 1, 0]
            }],
            colors: ['#5c6bc0']
        }));

        var chartAsset = new Highcharts.Chart(Highcharts.merge(chartAreaOptions, {
            chart: {
                renderTo: 'chart-asset'
            },
            series: [{
                data: [8, 5, 6, 9, 12, 5, 8, 12, 13, 11, 12, 14, 10, 11, 10]
            }],
            colors: ['#26c6da']
        }));

        var chartER = new Highcharts.Chart(Highcharts.merge(chartAreaOptions, {
            chart: {
                renderTo: 'chart-er'
            },
            series: [{
                data: [13, 2, 2, 3, 2, 1, 2, 2, 3, 1, 2, 4, 0, 1, 0]
            }],
            colors: ['#36c398']
        }));

        var chartGeo = new Highcharts.Chart(Highcharts.merge(chartAreaOptions, {
            chart: {
                renderTo: 'chart-geo'
            },
            series: [{
                data: [8, 5, 6, 9, 12, 5, 8, 12, 13, 11, 12, 14, 10, 11, 10]
            }],
            colors: ['#ffb70c']
        }));

        var chartError = new Highcharts.Chart(Highcharts.merge(chartAreaOptions, {
            chart: {
                renderTo: 'chart-error'
            },
            series: [{
                data: [7, 5, 7, 6, 9, 11, 12, 7, 8, 5, 2, 4, 0, 1, 0]
            }],
            colors: ['#f87678']
        }));
    })();

// 배터리 현황
    var chartBatteryOptions = {
        chart: {
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
        tooltip: {
            enabled: false
        },
        legend: {
            enabled: false
        }
    };
    var chartBattery = (function () {
        var itemsList = [
            ['양호', 100],
            ['주의', 20],
            ['부족', 15]
        ];

        var total = 0;
        for (var i = 0, len = 3; i < len; i++) {
            total += itemsList[i][1];
        }

        var chartPie = new Highcharts.Chart(Highcharts.merge(chartBatteryOptions, {
            chart: {
                type: 'pie',
                renderTo: 'chart-battery',
                width: 180,
                height: 200,
                margin: 0,
                spacing: 0
            },
            title: {
                useHTML: true,
                text: '<div class="chart-battery-title">' +
                '<span class="value">' + itemsList[0][1] + '</span><span class="total" ">/' + total + '</span>' +
                '<div class="label-wrap">' +
                '<span class="label">' + itemsList[0][0] + '</span>' + '/전체' +
                '</div></div>'
            },
            colors: ["#36c398", "#ffb70c", "#f65161"],
            series: [{
                innerSize: '84%',
                data: itemsList,
                showInLegend: false,
                point: {
                    events: {
                        mouseOver: function () {
                            $('.chart-battery-title .value').text(this.y);
                            $('.chart-battery-title .label').text(this.name);
                        }
                    }
                }
            }],
            plotOptions: {
                pie: {
                    dataLabels: {
                        enabled: false
                    },
                    startAngle: 0,
                    endAngle: 360,
                    center: ['50%', '50%'],
                    borderWidth: 0,
                    events: {
                        legendItemClick: function (e) {
                            e.preventDefault();
                        }
                    }
                }
            }
        }));

        var chartBar = new Highcharts.Chart(Highcharts.merge(chartBatteryOptions, {
            chart: {
                type: 'bar',
                renderTo: 'chart-battery-bar',
                width: 342,
                height: 160
            },
            xAxis: {
                categories: ['양호', '주의', '부족'],
                tickWidth: 0, // 라벨 눈금
                lineWidth: 0,
                title: {
                    text: ''
                },
                labels: {
                    enabled: true,
                    style: {fontSize: 14, color: "#9c9b9b"}
                }
            },
            yAxis: {
                gridLineWidth: 0,
                min: 0,
                title: {
                    text: ''
                },
                labels: {
                    enabled: false
                }
            },
            colors: ["#36c398", "#ffb70c", "#f65161"],
            series: [{
                colorByPoint: true,
                data: itemsList,
                pointWidth: 20
            }],
            plotOptions: {
                bar: {
                    dataLabels: {
                        enabled: true,
                        format: '{y}' + '<span style="color:#6e6e6e; font-size: 16px">%</span>',
                        color: '#3b3b3b',
                        x: -230,
                        style: {fontSize: 20, color: '#3b3b3b', fontWeight: 400},
                        textOutline: 0
                    },
                    borderWidth: 0
                }
            }
        }));
    })();

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
            enabled: false
        },
        tooltip: {
            useHTML: true,
            backgroundColor: null,
            borderWidth: 0,
            shadow: false,
            formatter: function () {
                return '<div class="tooltip" style="background-color:' + this.color + ';border-color:' + this.color + '">' + this.y + '대</div>';
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
            tickWidth: 0 // x축 라벨 눈금
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

// 배터리 잔량별 단말수
    var chartBatteryDevice = (function () {
        var chart = new Highcharts.Chart(Highcharts.merge(chartBarOptions, {
            chart: {
                renderTo: 'chart-battery-device',
                width: 860,
                height: 170
            },
            title: {
                text: '',
                style: {fontSize: 12, color: "#9c9b9b"},
                x: -360,
                y: 162
            },
            colors: ["#f65161", "#f65161", "#ffb70c", "#ffb70c", "#ffb70c", "#ffb70c", "#ffb70c", "#ffb70c", "#36c398", "#36c398", "#36c398"],
            xAxis: {
                categories: ['1-5', '6-10', '11-20', '21-30', '31-40', '41-50', '51-60', '61-70', '71-80', '81-90', '91-100'],
                labels: {
                    x: 0,
                    y: 30,
                    style: {color: '#9c9b9b'}
                }
            },
            yAxis: {
                min: 0,
                max: 20,
                labels: {
                    style: {color: 'rgba(0,0,0,0)'}
                }
            },
            series: [{
                colorByPoint: true,
                data: [2, 3, 6, 10, 8, 8, 8, 3, 4, 7, 4]
            }]
        }));
    })();

// 데이터 수집주기별 단말수
    var chartDataDevice = (function () {
        var chart = new Highcharts.Chart(Highcharts.merge(chartBarOptions, {
            chart: {
                renderTo: 'chart-data-device',
                width: 800,
                height: 180
            },
            title: {
                text: '',
                style: {fontSize: 12, color: "#9c9b9b"},
                x: -380,
                y: 172
            },
            colors: ["#07c5c7"],
            xAxis: {
                categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24'],
                labels: {
                    x: 0,
                    y: 30,
                    style: {color: '#9c9b9b'}
                }
            },
            yAxis: {
                min: 0,
                max: 20,
                labels: {
                    style: {color: 'rgba(0,0,0,0)'}
                }
            },
            series: [{
                colorByPoint: true,
                data: [2, 3, 6, 10, 8, 18, 8, 3, 14, 7, 4, 2, 3, 6, 10, 18, 8, 8, 3, 4, 17, 4, 7, 4]
            }]
        }));
    })();

// 단말타입 현황
    var chartDeviceType = (function () {
        var itemsList = [
            ['Samsung', 65, ['GPS', '배터리','속도','충격','온도','습도']],
            ['SK', 15, ['GPS', '배터리']]
        ];

        function deviceInfoHtml(idx) {
            var idx = idx;
            var size = itemsList[idx][2].length;
            $('.device-info .title').text(itemsList[idx][0]);
            $('.device-info .value').text(itemsList[idx][1] + '개');
            var result = '';
            for (var i = 0, len = size; i < len; i++) {
                result += '<li>' + itemsList[idx][2][i] + '</li>';
            }
            // console.log(result);
            $('.device-info ul').html(result);
        }
        deviceInfoHtml(0); // 초기값


        var chartPie = new Highcharts.Chart(Highcharts.merge({
            chart: {
                type: 'pie',
                renderTo: 'chart-device-type',
                width: 320,
                height: 166,
                margin: 0,
                spacing: 0,
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
            tooltip: {
                shadow: false,
                borderRadius: 7,
                padding: 6,
                formatter: function () {
                    return this.point.name;
                }
            },
            colors: ["#7884ca", "#07c5c7", "#48bf9b"],
            series: [{
                innerSize: '50%',
                data: itemsList,
                showInLegend: false,
                point: {
                    events: {
                        click: function () {
                            var idx = this.colorIndex;
                            deviceInfoHtml(idx);
                        }
                    }
                }
            }],
            plotOptions: {
                pie: {
                    dataLabels: {
                        enabled: false
                    },
                    startAngle: 0,
                    endAngle: 360,
                    center: ['28%', '50%'],
                    borderWidth: 0,
                    events: {
                        legendItemClick: function (e) {
                            e.preventDefault();
                        }
                    }
                }
            }

        }));

    })();


// 지오펜스 설정 현황 확대버튼 클릭시
    var geopenceSet = (function () {
        var box = '.box-extend';
        var speed = 200;

        function fullscreen() {
            $(this).closest(box).toggleClass('active', speed, 'easeInExpo');
            var x = $(this).closest(box).hasClass('active');
            $('body').css({overflow: x ? 'auto' : 'hidden'});
        }

        $(document).on('click', '.btn-extend', fullscreen);
    })();

});