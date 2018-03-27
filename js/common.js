$.fn.extend({
    scrolls: function () {
        return this.each(function () {
            var $this = $(this);
            $.getScript(company ? '../../js/vendor/jquery.slimscroll.js' : '../js/vendor/jquery.slimscroll.js', function () {
                $this.each(function () {
                    var $this = $(this);
                    var h = $this.data('height');
                    var v = $this.data('direction');

                    $this.slimScroll({
                        height: h !== undefined ? h : 'auto',
                        color: '#64688b',
                        size: '10px',
                        axis: v == 'horizontal' ? 'x' : 'y'
                    });

                    if (!!$('#monitoring-list').length) { // 모니터링 필터버튼 클릭시
                        setTimeout(function () {
                            var h = $(window).height() - $('.body .data-scroll').offset().top - 36;
                            $('.body .data-scroll').slimScroll({
                                height: h,
                                color: '#64688b',
                                size: '10px'
                            });
                        }, 400);
                    }

                });
            });
        })
    },
    dataPosition: function () {
        return this.each(function () {
            var $this = $(this);
            var pos = $this.data('position');
            var x = ~~pos.split(',')[0];
            var y = ~~pos.split(',')[1];
            $this.css({left: x, top: y, visibility: 'visible'});
        });
    },
    odometer: function (val) {
        return this.each(function () {
            var $this = $(this);
            odometerOptions = {
                auto: false,
                selector: '.odometer',
                format: '(,ddd).dd',
                duration: 3000,
                animation: 'count'
            };

            if (val != undefined) {
                setTimeout(function () {
                    $this.find('.odometer').html(val);
                }, 2000);
            } else {
                setTimeout(function () {
                    var val = $this.data('end');
                    $this.html(val);
                }, 2000);
            }

        })
    }
});

function ie11Checkbox() {
    // ie11 체크 : 11에서만 css apparance가 인식이 안되 bootstrap custom-checkbox로 구현
    var ie11 = navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1;

    if (!ie11) return;

    $('body').addClass('ie11');

    $(':checkbox').each(function () {
        var $this = $(this);
        var x = $this.parent('label').size();
        if (x != 0) return;
        $this.addClass('custom-control-input');
        $this.wrap('<label class="custom-control custom-checkbox" />');
        $this.after('<span class="custom-control-indicator" />');
    });

    $(".list label").on({
        click: function (e) {
            e.stopPropagation();
        }
    });
}

$(function () {
    var common = {
        init: function () {

            ie11Checkbox();

            if (!!$('.odometer')) {
                $('.odometer').odometer();
            }
            if (!!$('[data-scroll="true"]')) {
                $('[data-scroll="true"]').scrolls();
            }

            if (!!$('[data-position]')) {
                $('[data-position]').dataPosition();
            }

            //jquery ui
            if (!!$('.tabs')) {
                $('.tabs').tabs({
                    show: {effect: "fade", duration: 400}
                });
            }

            if (!!$('.select')) {
                $(".select").selectmenu();
            }

            if (!!$('.tip')) {
                $('.tip').tooltip({
                    content: function (callback) {
                        callback($(this).prop('title').replace('|', '<br>'));
                    }
                });
            }

            if (!!$('.dialog')) {
                $('.dialog').dialog({
                    autoOpen: false,
                    show: {effect: "clip", duration: 200},
                    hide: {effect: "fade", duration: 200}
                });
            }

            if (!!$('.datepicker')) {
                $('.datepicker').datepicker({
                    dateFormat: "yy-mm-dd"
                });
            }

            if (!!$('.accordion')) {
                $('.accordion').accordion({
                    header: '.title',
                    active: false,
                    icons: false,
                    collapsible: true,
                    animate: 200,
                    heightStyle: 'content'
                });

                // 예외처리
                $(".filter-area .title .end").on({
                    click: function (e) {
                        e.stopPropagation();
                    }
                });

                $(".list input").on({
                    click: function (e) {
                        e.stopPropagation();
                    }
                });
            }

        }
    }.init();
});

function formValidCheck() {
    $('[data-valid="1"]').each(function () {
        var $this = $(this);
        $this.addClass('ico-valid');
    });
}

// 말줄임에 마우스 오버시 툴팁에서 풀네임 출력
function ellipsis() {
    $('.ellipsis').each(function () {
        var $this = $(this);
        $this.attr('title', this.innerHTML);
        $this.tooltip();
    });
}

// 페이지 이동
function goPage(url, target) {
    if (target != null) {
        window.open(url, target, '');
        return false;
    } else {
        location.href = url;
    }
}

// 공통팝업처리
function checkPopup(id) {
    var check = {
        autoOpen: false,
        modal: true,
        width: 300,
        height: 'auto',
        dialogClass: 'check-popup',
        close: function () {
            $(this).html('');
        }
    };

    var regist = {
        title: '등록 확인',
        open: function () {
            $(this).html('<p>해당정보가 등록되었습니다.</p>');
        },
        buttons: {
            '확인': {
                'class': 'btn btn-primary',
                'text': '확인',
                click: function () {
                    $(this).dialog("close");
                }
            }
        }
    };

    var modify = {
        title: '수정 확인',
        open: function () {
            $(this).html('<p>해당정보가 수정되었습니다.</p>');
        },
        buttons: {
            '확인': {
                'class': 'btn btn-primary',
                'text': '확인',
                click: function () {
                    $(this).dialog("close");
                }
            }
        }
    };

    var config = {
        title: '설정 확인',
        open: function () {
            $(this).html('<p>해당정보로 설정되었습니다.</p>');
        },
        buttons: {
            '확인': {
                'class': 'btn btn-primary',
                'text': '확인',
                click: function () {
                    $(this).dialog("close");
                }
            }
        }
    };

    var del = {
        title: '삭제 확인',
        open: function () {
            $(this).html('<p>해당정보를 삭제하시겠습니까?</p>');
        },
        buttons: {
            '취소': {
                'class': 'btn btn-secondary',
                'text': '취소',
                click: function () {
                    $(this).dialog("close");
                }
            },
            "삭제": {
                'class': 'btn btn-primary',
                'text': '삭제',
                click: function () {
                    $(this).dialog("close");
                }
            }
        }
    };

    var save = {
        title: '저장 확인',
        open: function () {
            $(this).html('<p>해당정보를 저장하였습니다.</p>');
        },
        buttons: {
            '확인': {
                'class': 'btn btn-primary',
                'text': '확인',
                click: function () {
                    $(this).dialog("close");
                }
            }
        }
    };

    var required = {
        dialogClass: 'check-popup no-title',
        open: function () {
            $(this).html('<p>필수 입력 사항을 입력하지 않았습니다.</p>');
        },
        buttons: {
            '확인': {
                'class': 'btn btn-primary',
                'text': '확인',
                click: function () {
                    $(this).dialog("close");
                }
            }
        }
    };

    var available = {
        dialogClass: 'check-popup no-title',
        open: function () {
            $(this).html('<p>입력하신 <span>00</span>는 사용하실 수 있습니다. <br> 사용하시겠습니까?</p>');
        },
        buttons: {
            '취소': {
                'class': 'btn btn-secondary',
                'text': '취소',
                click: function () {
                    $(this).dialog("close");
                }
            },
            '확인': {
                'class': 'btn btn-primary',
                'text': '확인',
                click: function () {
                    $(this).dialog("close");
                }
            }
        }
    };

    var overlap = {
        dialogClass: 'check-popup no-title',
        open: function () {
            $(this).html('<p>입력하신 <span>00</span>는 중복된 <span>00</span>입니다. <br> 다시 입력해 주세요</p>');
        },
        buttons: {
            '확인': {
                'class': 'btn btn-primary',
                'text': '확인',
                click: function () {
                    $(this).dialog("close");
                }
            }
        }
    };

    var assetOverlap = {
        dialogClass: 'check-popup no-title',
        open: function () {
            $(this).html('<p>이미 등록된 대상번호가 존재합니다.</p>');
        },
        buttons: {
            '확인': {
                'class': 'btn btn-primary',
                'text': '확인',
                click: function () {
                    $(this).dialog("close");
                }
            }
        }
    };

    var doNotDel = {
        dialogClass: 'check-popup no-title',
        open: function () {
            $(this).html('<p>현재 선택하신 회사는 삭제할 수 없습니다.</p>');
        },
        buttons: {
            '확인': {
                'class': 'btn btn-primary',
                'text': '확인',
                click: function () {
                    $(this).dialog("close");
                }
            }
        }
    };

    var assetNull = {
        width: 400,
        dialogClass: 'check-popup no-title',
        open: function () {
            $(this).html('<p>등록된 대상유형이 없습니다. <br><a href="../html/m03020003.html">대상유형관리> 등록</a> 페이지로 이동하시겠습니까?</p>');
        },
        buttons: {
            '닫기': {
                'class': 'btn btn-secondary',
                'text': '닫기',
                click: function () {
                    $(this).dialog("close");
                }
            },
            '이동': {
                'class': 'btn btn-primary',
                'text': '이동',
                click: function () {
                    goPage('../html/m03020003.html')
                }
            }
        }
    };

    var file = {
        title: '파일 등록',
        width: '400',
        open: function () {
            $(this).html('<input type="file" class="form-control">');
        },
        buttons: {
            '취소': {
                'class': 'btn btn-secondary',
                'text': '취소',
                click: function () {
                    $(this).dialog("close");
                }
            },
            '삭제': {
                'class': 'btn btn-secondary active',
                'text': '삭제',
                click: function () {
                    $(this).dialog("close");
                }
            },
            '등록': {
                'class': 'btn btn-primary',
                'text': '등록',
                click: function () {
                    $(this).dialog("close");
                }
            }
        }
    };

	var od = {
        title: 'ON DEMAND',
        open: function () {
            $(this).html('<p>CTD-S100XL의 데이터를<br> 즉시 수신하시겠습니까?</p>');
        },
        buttons: {
            '취소': {
                'class': 'btn btn-secondary',
                'text': '취소',
                click: function () {
                    $(this).dialog("close");
                }
            },
            "확인": {
                'class': 'btn btn-primary',
                'text': '확인',
                click: function () {
                    $(this).dialog("close");
                }
            }
        }
    };

	var legend = {
        title: '대상/단말 상태 설명',
        width: '350',
        open: function () {
            $(this).html('<div class="form text-left legend-list">' +
                '<p>대상 상태 아이콘</p>' +
                '<ul class="item">' +
                '<li data-value="0">데이터미수신</li>' +
                '<li data-value="1">정상수신</li>' +
				'<li data-value="2">OFF</li>' +
				'<li data-value="5">이벤트발생</li>' +
				'</ul>' +
				'</div>' +
				'<div class="form text-left legend-list">' +
                '<p>단말 상태 아이콘</p>' +
				'<ul class="item">' +
                '<li data-value="0">데이터미수신</li>' +
                '<li data-value="1">정상수신</li>' +
				'<li data-value="2">OFF</li>' +
				'<li data-value="3">배터리이벤트</li>' +
				'<li data-value="7">지오펜스진입</li>' +
				'<li data-value="8">지오펜스진출</li>' +
				'</ul>' +
                '</div>');
        },
        buttons: {
            '닫기': {
                'class': 'btn btn-secondary',
                'text': '닫기',
                click: function () {
                    $(this).dialog("close");
                }
            }
        }
    };

    var password = {
        title: '비밀번호 확인',
        width: '500',
        open: function () {
            $(this).html('<div class="form">' +
                '<div class="row"><label for="">사용자ID</label><input type="text" maxlength="" class="form-control"></div>' +
                '<div class="row"><label for="">비밀번호</label><input type="password" maxlength="" class="form-control"></div>' +
                '<p class="small">정보를 안전하게 보호하기 위해 비밀번호를 다시 한번 확인합니다.</p>' +
                '</div>');
        },
        buttons: {
            '취소': {
                'class': 'btn btn-secondary',
                'text': '취소',
                click: function () {
                    $(this).dialog("close");
                }
            },
            '확인': {
                'class': 'btn btn-primary',
                'text': '확인',
                click: function () {
                    $(this).dialog("close");
                }
            }
        }
    };

    var passwordChange = {
        title: '비밀번호 변경',
        width: '500',
        open: function () {
            $(this).html('<div class="form text-left">' +
                '<p style="line-height: 1.6;">장기간 동일한 비밀번호를 이용하고 계십니다. <br> 개인정보 보호를 위해 비밀번호를 변경해주세요. </p>' +
                '<div class="row"><label for="">현재 비밀번호</label><input type="password" maxlength="" class="form-control"></div>' +
                '<div class="row"><label for="">신규 비밀번호</label><input type="password" maxlength="" class="form-control"></div>' +
                '<div class="row"><label for="">비밀번호 확인</label><input type="password" maxlength="" class="form-control"></div>' +
                '<p class="small">* 영문문자,숫자,특수문자를 조합한 최소 10자 이상 <br>' +
                '* 아이디가 포함된 비밀번호 사용불가 <br>' +
                '* 동일 문자가 4개 이상 겹치는 경우/숫자 또는 문자의 4자리 이상 사용 불가</p>' +
                '</div>');
        },
        buttons: {
            '취소': {
                'class': 'btn btn-secondary',
                'text': '취소',
                click: function () {
                    $(this).dialog("close");
                }
            },
            '저장': {
                'class': 'btn btn-primary',
                'text': '저장',
                click: function () {
                    $(this).dialog("close");
                }
            }
        }
    };

    if (!$('#check-popup').length) {
        $('body').append('<div id="check-popup" class="dialog" />');
    }

    var id = eval(id);
    $('#check-popup').dialog(check).dialog(id).dialog('open');
}

// 주소찾기팝업
function findAddress() {
    $.ajax({
        url: '../html/find-address.html',
        dataType: 'html',
        cache: false
    }).done(function (data) {
        if ($('#find-address').length) return;
        $('body').append(data);
    }).complete(function () {
        findAddressOpen();
    });
}

// 조직선택팝업
function selectOrganization(type) {
    $.ajax({
        url: '../html/organization-select.html',
        dataType: 'html',
        cache: false
    }).done(function (data) {
        if ($('#organization-select').length) return;
        $('body').append(data);
    }).complete(function () {
        selectOrganizationOpen(type);
    });
}

// 약관팝업
function clauses() {
    $.ajax({
        url: '../html/clauses.html',
        dataType: 'html',
        cache: false
    }).done(function (data) {
        if ($('#clauses').length) return;
        $('body').append(data);
    }).complete(function () {
        clausesOpen();
    });
}

// 모니터링 마커 상세
function marker() {
    $.ajax({
        url: '../html/marker.html',
        dataType: 'html',
        cache: false
    }).done(function (data) {
        if ($('#marker-dialog').length) return;
        $('body').append(data);
    }).complete(function () {
        $('#marker-dialog').show();
    });
}

// 토스트팝업
function toast() {
    $.ajax({
        url: '../html/toast.html',
        dataType: 'html',
        cache: false
    }).done(function (data) {
        if ($('#toast-dialog').length) return;
        $('body').append(data);
    }).complete(function () {
        setTimeout(function () {
            toastOpen();
        }, 600)
    });
}

// 알람
function alarm() {
    $('.alarm').toggle('blind', 200);
    $('.ico-alarm').toggleClass('active');

    $.ajax({
        url: '../html/alarm.html',
        dataType: 'html',
        cache: false
    }).done(function (data) {
        if ($('#alarm-dialog').length) return;
        $('body').append(data);
    }).complete(function () {
        alarmOpen();
    });
}

// 대상관리 : 단말 모델명 클릭시 매핑단말 정보 팝업
function deviceMapping() {
    $.ajax({
        url: '../html/device-mapping.html',
        dataType: 'html',
        cache: false
    }).done(function (data) {
        if ($('#device-mapping').length) return;
        $('body').append(data);
    }).complete(function () {
        deviceMappingOpen();
    });
}

// 대상관리 : 매핑가능 단말 선택 팝업
function deviceSelect() {
    $.ajax({
        url: '../html/device-select.html',
        dataType: 'html',
        cache: false
    }).done(function (data) {
        if ($('#device-select').length) return;
        $('body').append(data);
    }).complete(function () {
        deviceSelectOpen();
    });
}


// 대상관리 : 관리자 선택 팝업
function adminSelect() {
    $.ajax({
        url: '../html/admin-select.html',
        dataType: 'html',
        cache: false
    }).done(function (data) {
        if ($('#admin-select').length) return;
        $('body').append(data);
    }).complete(function () {
        adminSelectOpen();
    });
}


// 대상 대상 선택 팝업
function assetSelect() {
    $.ajax({
        url: '../html/asset-select.html',
        dataType: 'html',
        cache: false
    }).done(function (data) {
        if ($('#asset-select').length) return;
        $('body').append(data);
    }).complete(function () {
        assetSelectOpen();
    });
}


// 단말타입선택 팝업
function deviceTypeSelect() {
    $.ajax({
        url: '../html/device-type-select.html',
        dataType: 'html',
        cache: false
    }).done(function (data) {
        if ($('#device-type-select').length) return;
        $('body').append(data);
    }).complete(function () {
        deviceTypeSelectOpen();
    });
}

// 연락처 보기
function viewContact() {
    $.ajax({
        url: '../html/contact.html',
        dataType: 'html',
        cache: false
    }).done(function (data) {
        if ($('#view-contact').length) return;
        $('body').append(data);
    }).complete(function () {
        viewContactOpen();
    });
}


// 대상유형 추가
function assetTypeAdd(idx) {
    $.ajax({
        url: '../html/m03020003.html',
        dataType: 'html',
        cache: false
    }).done(function (data) {
        if ($('#asset-type1-add').length) return;
        $('body').append(data);
    }).complete(function () {
        assetTypeAddOpen(idx);
    });
}

// 대상유형 수정
function assetTypeMod(idx) {
    $.ajax({
        url: '../html/m03020002.html',
        dataType: 'html',
        cache: false
    }).done(function (data) {
        if ($('#asset-type1-mod').length) return;
        $('body').append(data);
    }).complete(function () {
        assetTypeModOpen(idx);
    });
}

// 단말관리 : 단말 이력 팝업
function deviceHistory() {
    $.ajax({
        url: '../html/device-history.html',
        dataType: 'html',
        cache: false
    }).done(function (data) {
        if ($('#device-history').length) return;
        $('body').append(data);
    }).complete(function () {
        deviceHistoryOpen();
    });
}

// 관리자 : 상위메뉴 조회
function topmenuSearch() {
    $.ajax({
        url: '../html/topmenu-search.html',
        dataType: 'html',
        cache: false
    }).done(function (data) {
        if (!$('#topmenu-search')) return;
        $('body').append(data);
    }).complete(function () {
        topmenuSearchOpen();
    });
}


// 관리자 : 프로그램 조회
function programSearch() {
    $.ajax({
        url: '../html/program-search.html',
        dataType: 'html',
        cache: false
    }).done(function (data) {
        if (!$('#program-search')) return;
        $('body').append(data);
    }).complete(function () {
        programSearchOpen();
    });
}

// 관리자 : 상위코드 선택
function topcodeSelect() {
    $.ajax({
        url: '../html/topcode-select.html',
        dataType: 'html',
        cache: false
    }).done(function (data) {
        if (!$('#topcode-select')) return;
        $('body').append(data);
    }).complete(function () {
        topcodeSelectOpen();
    });
}

// 관리자 : 역할선택
function roleSelect() {
    $.ajax({
        url: '../html/role-select.html',
        dataType: 'html',
        cache: false
    }).done(function (data) {
        if (!$('#role-select')) return;
        $('body').append(data);
    }).complete(function () {
        roleSelectOpen();
    });
}

// 관리자 : 운영사선택
function operatorSelect() {
    $.ajax({
        url: '../html/operator-select.html',
        dataType: 'html',
        cache: false
    }).done(function (data) {
        if (!$('#operator-select')) return;
        $('body').append(data);
    }).complete(function () {
        operatorSelectOpen();
    });
}


setTimeout(function () { // 관리자별 페이지 분기 // 퍼블리싱 전용, 개발시 삭제
    var x = location.href.indexOf('/company/') != -1;

    function urlChange(url, x) {
        if (location.href.indexOf(url) != -1) {


            var url1;
            if (location.href.indexOf('operator') != -1) {
                url1 = location.href.replace('operator/', '');
            } else if (location.href.indexOf('company') != -1) {
                url1 = location.href.replace('company/', '');
            } else {
                url1 = location.href;
            }

            var url2;
            if (location.href.indexOf('operator') != -1) {
                url2 = location.href;
            } else if (location.href.indexOf('company') != -1) {
                url2 = location.href.replace('company', 'operator');
            } else {
                url2 = location.href.replace('html/', 'html/operator/');
            }

            var url3;
            if (location.href.indexOf('company') != -1) {
                url3 = location.href;
            } else if (location.href.indexOf('operator') != -1) {
                url3 = location.href.replace('operator', 'company');
            } else {
                url3 = location.href.replace('html/', 'html/company/');
            }


            if (x == undefined) {
                $('body').append('<div class="sticker"><a class="' + (location.href.indexOf("html/m") != -1 ? 'active' : '') + '" href="' + url1 + '">admin</a>' +
                    '<a class="' + (location.href.indexOf("company") != -1 ? 'active' : '') + '" href="' + url3 + '">company</a></div>');
            } else if (x == '2') {
                $('body').append('<div class="sticker"><a class="' + (location.href.indexOf("html/m") != -1 ? 'active' : '') + '" href="' + url1 + '">시스템</a>' +
                    '<a class="' + (location.href.indexOf("operator") != -1 ? 'active' : '') + '" href="' + url2 + '">운영사</a></div>');
            } else if (x == '3') {
                $('body').append('<div class="sticker"><a class="' + (location.href.indexOf("html/m") != -1 ? 'active' : '') + '" href="' + url1 + '">시스템</a>' +
                    '<a class="' + (location.href.indexOf("operator") != -1 ? 'active' : '') + '" href="' + url2 + '">운영사</a>' +
                    '<a class="' + (location.href.indexOf("company") != -1 ? 'active' : '') + '" href="' + url3 + '">회사</a></div>');
            }
        }
    }

    // 단말관리
    urlChange('m04000000');
    urlChange('m04000001');

    // 관리자 : 운영사관리
    urlChange('m06050001', 2);
    urlChange('m06050002', 2);

    // 관리자 : 회사관리
    urlChange('m06070001', 3);
    urlChange('m06070002', 3);
    urlChange('m06070003', 2);

    // 관리자 : 사용자관리
    urlChange('m06090001', 3);
    urlChange('m06090002', 3);
    urlChange('m06090003', 3);

    // 고객지원
    urlChange('m09000001');

}, 200);
