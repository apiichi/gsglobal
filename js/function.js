//header~secti03
$(function() {
	//----------------변수 선언--------------
	//header
	const $head = $('.header-container');
	const $opMnu = $('header .op-mnu > li > a');
	const $headMnu = $('#gnb');
	const $lnb = $headMnu.find('.lnb');
	const $bg_lnb = $('.bg_lnb');
	const $lang = $('.lang');
	const $ham = $('.ham_mnu');
	//section
	const $slides = $('.slide-container>li');
	const $indicators = $('.slide-indicator>li>a');
	//기타
	const topVal = [];
	const mnuPosVal = [];
	let intervalID = null;
	let nowIdx = 0;

	// topVal
	for (let i = 0; i < $opMnu.length; i++) {
		topVal[i] = $('article').eq(i).offset().top;
	}
	// mnuPosVal
	for (let i = 0; i < $opMnu.length; i++) {
		mnuPosVal[i] = $opMnu.eq(i).parent().position().top;
	}
	// --------------함수선언--------------
	//section
	//sect01 - 페이드효과 함수
	const fadeFn = function() {
		$slides.filter('.on').stop().hide().removeClass('on');
		$slides.find('h2, p').stop().fadeOut(800);
		$slides.eq(nowIdx).stop().show().addClass('on');
		$slides.eq(nowIdx).find('h2 ,p').stop().fadeIn(800);
		$indicators.eq(nowIdx).parent().addClass('on').siblings().removeClass('on');
	};
	//sect01 - 정지 함수
	const autoStop = function() {
		clearInterval(intervalID);
		$('.slide-btn').removeClass('pause').text('일시정지');
	};
	//sect01 - 자동재생 함수
	const autoPlay = function() {
		intervalID = setInterval(function() {
			// 인덱스추출
			if (nowIdx < 2) {
				nowIdx++;
			} else {
				nowIdx = 0;
			}
			fadeFn();
		}, 7000);
		$('.slide-btn').addClass('pause').text('자동재생');
	};

	//sect03 - korea 반짝임
	setInterval(function() {
		$('.sect03-item span.on').fadeOut(600).fadeIn(600);
	}, 2000);

	//---------------초기화----------------
	autoPlay();

	//---------------------이벤트등록-----------------
	//스크롤 이벤트
	$(window).on('scroll', function() {
		const scrollTop = $(this).scrollTop();
		//~스크롤에 따라 원페이지 메뉴 변화
		for (let i = 0; i < $opMnu.length; i++) {
			if (scrollTop >= topVal[i] - 100) {
				$('.now').stop().animate({
					top: mnuPosVal[i]
				});
			}
		}
		//~스크롤 내리면 head-container 활성화
		//맨 위에서만 비활성화
		if (scrollTop < 86) {
			$head.removeClass('on');
		} else {
			$head.addClass('on');
		}

		//~fnb 움직임 변화
		if (scrollTop < 2400) {
			$('.fnb').stop().animate({
				bottom: 40
			});
		} else {
			$('.fnb').stop().animate({
				bottom: 80
			});
		}
	});

	//header
	//로고 클릭시 최상단으로 이동
	$('header .logo>a').on('click', function(evt) {
		evt.preventDefault();
		$('html, body').stop().animate({
			scrollTop: 0
		});
	});

	// 원페이지 클릭 시 메뉴활성화 & 스크롤이동
	$opMnu.on('click', function(evt) {
		evt.preventDefault();
		nowIdx = $opMnu.index(this);

		$('.now').stop().animate({
			top: mnuPosVal[nowIdx]
		});
		$('html,body').stop().animate({
			scrollTop: topVal[nowIdx]
		});
	});

	//scroll=0에서 head-container 활성화
	$head.on({
		mouseenter: function() {
			$(this).addClass('on');
		},
		mouseleave: function() {
			//맨 위에서만 비활성화
			if ($(window).scrollTop() < 86) {
				$(this).removeClass('on');
			}
		}
	});

	// 서브메뉴 활성화
	$headMnu.on({
		//나타남
		mouseenter: function() {
			$bg_lnb.stop().slideDown(500).addClass('on');
			$lnb.stop().slideDown(500);
		},
		//사라짐
		mouseleave: function() {
			$lnb.stop().hide();
			$bg_lnb.stop().hide().removeClass('on');
		}
	});

	// 서브메뉴 배경판
	$bg_lnb.on({
		//나타남
		mouseenter: function() {
			$(this).stop().show().addClass('on');
			$lnb.stop().show();
		},
		//사라짐
		mouseleave: function() {
			$(this).stop().fadeOut(500).removeClass('on');
			$lnb.stop().fadeOut(500);
		}
	});

	// 언어박스 선택 시 슬라이드 업/다운
	$lang.on('click', function() {
		$lang.find('.langlist').slideToggle(100);
	});

	// 원하는 언어로 변경
	$lang.find('.langlist>li>a').on('click', function(evt) {
		$lang.find('.select').text($(this).text());
		evt.preventDefault();
	});

	// 햄버거버튼  열기
	$('.ham_btn>a').on('click', function(evt) {
		$ham.show();
		evt.preventDefault();
	});
	// 햄버거버튼  닫기
	$ham.children('.clse').on('click', function(evt) {
		$ham.hide();
		evt.preventDefault();
	});

	//section
	// sect01 페이드 슬라이드 - 인디케이터 활성화
	$indicators.on('click', function(evt) {
		evt.preventDefault();
		nowIdx = $indicators.index(this);
		fadeFn();
		autoStop();
	});

	//sect01 페이드 슬라이드 - 자동재생버튼
	$('.slide-btn').on('click', function(evt) {
		evt.preventDefault();
		if ($('.slide-btn').hasClass('pause')) {
			autoStop();
		} else {
			autoPlay();
		}
	});
});

//sect04~footer
$(function() {
	//----------------변수 선언--------------
	const $news = $('.news-list');
	let nowIdx = 0;
	//----------------이벤트등록--------------
	// sect04 가로 슬라이드 - 다음btn
	$('.sect04 .next').on('click', function(evt) {
		evt.preventDefault();
		if (nowIdx < 3) {
			nowIdx++;
		}
		$news.animate({
			left: -(nowIdx * 3) * 280
		});
	});
	// sect04 가로슬라이드 - 이전btn
	$('.sect04 .prev').on('click', function(evt) {
		evt.preventDefault();
		if (nowIdx > 0) {
			nowIdx--;
		}
		$news.animate({
			left: -(nowIdx * 3) * 280
		});
	});

	// footer - familysite: toggle이벤트
	$('footer .site').on('click', function(evt) {
		evt.preventDefault();
		$('.site_list').toggle();
	});
});
