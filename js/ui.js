var company = location.href.indexOf('/company/') != -1 || location.href.indexOf('/operator/') != -1;
var ui = {
    menuSet: function (activeId) {
        $.ajax({
            dataType: 'json',
            url: company ? '../../js/menu.json' : '../js/menu.json',
            cache: false
        }).done(function (data) {

            if (activeId === undefined) activeId = 'm00000000';
            $('html').attr({id: activeId});
            var pageId = 'page-' + $('.wrap').attr('id');
            $('body').attr({id: pageId});

            function jqgridResize() {
                if (!$('.table-container').length) return;
                setTimeout(function () {
                    var w = $('.table-container').addClass('resize').width();
                    $('.table-container').each(function () {
                        $(this).find('table').setGridWidth(w, true)
                    });
                }, 400);
            }

            jqgridResize();

            $(window).on('resize', jqgridResize);

            /*$( ".tabs" ).tabs({
                activate: function() {
                    jqgridResize();
                }
            });*/

            var layout = {
                init: function () {
                    // this.zoom();
                    this.header();
                    this.sidebar();
                    this.title();

                    // sidebar toggle
                    $('.btn-menu').on('click', this.sidebarToggle);
                    // 대시보드일때 사이드바 숨김
                    if (activeId !== 'm01000000') return;
                    //$('#sidebar .btn-menu').trigger('click');
					var x = $('#sidebar .btn-menu').hasClass('active');
                    $('.btn-menu').toggleClass('active');
                    $('#header .btn-menu').toggle();
                    $('#sidebar').stop().animate({left: x ? 0 : -200}, 0);
                    $('body').stop().animate({paddingLeft: x ? 200 : 0}, 0);
                    $('#header').stop().animate({left: x ? 200 : 0}, 0);

                    jqgridResize();
					
                },
                zoom: function () {
                    $(window).resize(function () {
                        var w = $(window).width();
                        var bp = .77;
                        var x = (w * bp) / 1000;
                        x = x.toFixed(2);

                        var $body = $('.wrap > .content');

                        if (w <= 1620 && x < 1 && x > bp) {
                            console.log(w, w < 1620 ? x : 1);
                            $body.css({transform: 'scale(' + x + ')'});
                        }
                        if (w > 1024) return;
                        $body.css({transform: 'scale(' + bp + ')'});
                    }).resize();
                },
                zoom2: function () {
                    $(window).resize(function () {
                        var w = $(window).width();
                        var bp = .62;
                        var x = (w * bp) / 1000;

                        var $body = $('body');

                        if (x > bp) {
                            $body.css({zoom: w < 1620 ? x : 1});
                        }
                        if (w > 1024) return;
                        $body.css({zoom: bp});
                    }).resize();
                },
                header: function () {

                    if (activeId == 'm10000000') return;
                    if (!!$('#header').length) return;

                    var items = [];
                    items.push('<div id="header">');
                    items.push('<div class="left">');
                    items.push('<button type="button" class="btn btn-menu"><span class="sr-only">사이드메뉴 열기</span></button>');
                    items.push('<h1 class="logo"><a href="m02000000.html"><span class="sr-only">KT IoT Tracker</span></a></h1>');
                    items.push('</div>');
                    items.push('<div class="right" />');
                    items.push('</div>');
                    var html = items.join('');
                    $('.wrap').prepend(html);

                    $.ajax({
                        dataType: 'html',
                        url: company ? '../notice.html' : 'notice.html',
                        cache: false
                    }).done(function (data) {
                        $('#header .right').append(data);
                        $('#header .carousel').carousel({
                            interval: 3000
                        });
                    });

                },
                sidebar: function () {

                    if (activeId == 'm10000000') return;

                    var items = [];
                    items.push('<div id="sidebar">');
                    items.push('<button type="button" class="btn btn-menu"><span class="sr-only">사이드메뉴 닫기</span></button>');
                    items.push('<div class="account">');
                    items.push('<div>'+'<img src=' + (company ? "../../img/user.png" : "../img/user.gif") + ' alt="">'+'</div>');
                    items.push('<div class="id">' +
                        '<a href="#none" class="title"><span>홍길동님</span><i class="fa fa-caret-down" aria-hidden="true"></i></a>' +
                        '<div class="content"><ul>' +
                        '<li><a href="m08000001.html">사용자정보</a></li>' +
                        '<li><a href="m10000000.html">로그아웃</a></li>' +
                        '</ul></div>' +
                        '</div>');
                    items.push('<div class="class">슈퍼관리자</div>');
                    items.push('<div class="team"><a href="#" onclick="selectOrganization()"><span>한진중공업</span><br><span>영업1팀</span></a></div>');
                    items.push('</div>');

                    items.push('<div class="scroll" data-scroll="true">');
                    items.push('<ul class="nav">');
                    var icon = ['ico-home', 'ico-dashboard', 'ico-monitor', 'ico-asset', 'ico-device', 'ico-stat', 'ico-admin', 'ico-setting', '', 'ico-cs'];

                    $.each(data, function (key, val) {
                        var x = ~~key.slice(1, 3);
                        // if (x > 9) return; // 출력범위
                        var currentClass = x == activeId.slice(1, 3) ? 'active' : '';
                        items.push('<li class="' + currentClass + (val.hidden ? ' hidden' : '') + '"><a class="' + icon[x] + '" href="' + val.url + '">' + val.name + '</a>');
                        if (val.sub) {
                            items.push('<ul class="depth2">');
                            $.each(val.sub, function (i, data) {
                                $.each(data, function (key, val) {
                                    var currentClass = key.slice(1, 5) == activeId.slice(1, 5) ? 'active' : '';
                                    items.push('<li class="' + currentClass + '"><a href="' + val.url + '">' + val.name + '</a></li>');
                                });
                            });
                            items.push('</ul>');
                        }
                        items.push('</li>');
                    });
                    items.push('</ul>');
                    items.push('<address class="copyright">@Copyright KT GiGA IoT <br> Tracking service 2017.</address>');
                    items.push('</div>');
                    items.push('</div>');

                    var html = items.join('');
                    $('body').prepend(html);

                    $('[data-scroll="true"]').scrolls();

                    $('.id').accordion({
                        header: '.title',
                        active: false,
                        icons: false,
                        collapsible: true,
                        animate: 100,
                        heightStyle: 'content'
                    });

                    var $this = $('#sidebar');

                    $this.find('.active:last').addClass('on');

                    // $this.find('.nav > li > a').on('click', function () {
                    //     $(this).next('ul').stop().slideDown(200);
                    // });

                    $this.find('.nav > li').on('click', function () {
                        $(this).find('ul').stop().slideToggle(200);
                        // currentMenu();
                    });

                    currentMenu();

                    function currentMenu() {
                        setTimeout(function () {
                                if ($('body').hasClass('active')) return;
                                $this.find('.active .depth2').slideDown(200); // 활성화 메뉴 펼침
                            }, 200
                        )
                    }

                },
                sidebarToggle: function () {
                    var x = $('#sidebar .btn-menu').hasClass('active');
                    $('.btn-menu').toggleClass('active');
                    $('#header .btn-menu').toggle();
                    $('#sidebar').stop().animate({left: x ? 0 : -200}, 200);
                    $('body').stop().animate({paddingLeft: x ? 200 : 0}, 200);
                    $('#header').stop().animate({left: x ? 200 : 0}, 200);

                    jqgridResize();
                },
                title: function () {
                    var $this = $('.content-header h2');

                    if (!$this) return;

                    var depth1 = eval('data.' + activeId.slice(0, 3) + '000000');

                    var items = [];
                    items.push('<a href="' + depth1.url + '">' + depth1.name + '</a>'); // 1depth
                    $.each(depth1.sub, function (key, val) {
                        $.each(val, function (key, val) {
                            var x = activeId.slice(0, 5) === key.slice(0, 5); // 2depth
                            if (x) items.push('<a href="' + val.url + '">' + val.name + '</a>');
                            if (val.sub) {
                                $.each(val.sub, function (i, data) {
                                    $.each(data, function (key, val) {
                                        var x = activeId.slice(0, 9) === key.slice(0, 9); // 2depth
                                        if (x) items.push('<a href="#none">' + val.name + '</a>');
                                    });
                                });
                            }
                        });
                    });
                    var html = items.join('');

                    $this.html(html).css({visibility: 'visible'});

                }
            }.init();
        });
    }
};
