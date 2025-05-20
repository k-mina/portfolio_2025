$(document).ready(function () {
    // 1. ScrollTrigger 등록
    gsap.registerPlugin(ScrollTrigger);

    // 2. 스크롤바 초기화
    const bodyScroller = document.querySelector('.scroller');
    const bodyScrollBar = Scrollbar.init(bodyScroller, {
        speed: 10,
        damping: 0.05,
        mobile: {
            speed: 3
        }
    });

    // 3. ScrollTrigger에 스크롤 동기화
    ScrollTrigger.scrollerProxy('.scroller', {
        scrollTop(value) {
        if (arguments.length) {
            bodyScrollBar.scrollTop = value;
        }
        return bodyScrollBar.scrollTop;
        },
        getBoundingClientRect() {
            return {
                top: 0,
                left: 0,
                width: window.innerWidth,
                height: window.innerHeight
            };
        }
    });

    // 4. ScrollTrigger 업데이트 연결
    bodyScrollBar.addListener(ScrollTrigger.update);

    // 5. 필요 시 리프레시
    ScrollTrigger.defaults({ scroller: '.scroller' });
    AOS.init();
    ScrollTrigger.addEventListener('refresh', AOS.refresh);
    ScrollTrigger.refresh();




    
    //a태그 클릭시 부드럽게 이동
    function getSamePageAnchor (link) {
        if (
        link.protocol !== window.location.protocol ||
        link.host !== window.location.host ||
        link.pathname !== window.location.pathname ||
        link.search !== window.location.search
        ) {
        return false;
        }
    
        return link.hash;
    }
    
    
    function scrollToHash(hash, e) {
        const elem = hash ? document.querySelector(hash) : false;
        if (elem) {
            if (e) e.preventDefault();

            // 위치 계산 (offsetTop 기준)
            const targetOffset = elem.offsetTop;

            // Smooth Scrollbar로 스크롤 이동
            bodyScrollBar.scrollTo(0, targetOffset, 1000); 
        }
    }
    
    
    document.querySelectorAll('a[href]').forEach(a => {
        a.addEventListener('click', e => {
        scrollToHash(getSamePageAnchor(a), e);
        });
    });
    
    
    scrollToHash(window.location.hash);









    // HEADER 위치
    gsap.from('header .h-top span', {
        opacity: 0,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.main',    // .main 영역에서 스크롤 트리거
            start: 'top -25%',
            end: 'bottom 60%',   
            scrub: true,         // 스크롤과 함께 부드럽게
            scroller: '.scroller',
        },
    });

    



    
    // 페이지 로드 시 fade-up 효과
    gsap.from('.main .txt-1', {
        duration: 1,
        y: 55, 
        ease: 'ease-out-quart',
    });

    gsap.from('.main .txt-2', {
        duration: 1.5,
        y: 160, 
        ease: 'ease-out-quart',
        delay: 0.6,
    });

    gsap.from('.main .txt-3', {
        duration: 1.5,
        y: 115, 
        ease: 'ease-out-quart',
        delay: 1.2,
    });

    // 스크롤 시 opacity: 0로 사라지게 설정 (스크롤을 따라 사라지게)
    gsap.to('.main .txt-1', {
        opacity: 0,
        x: -200,
        scrollTrigger: {
            trigger: '.main', 
            start: 'top top',
            end: 'bottom 65%',
            scrub: true,  
        },
    });

    gsap.to('.main .txt-3', {
        opacity: 0,
        x: 200,
        scrollTrigger: {
            trigger: '.main',  
            start: 'top top',
            end: 'bottom 65%',
            scrub: true,  
        },
    });
    

    let getAllAos = Array.prototype.slice.call(document.querySelectorAll('[data-aos]'));

    AOS.init({
		easing: 'ease-out-quart',
		duration: 1300,
        once: true,
	});

    getAllAos.length > 0 && getAllAos.forEach((item) => {
		gsap.to(item, {
			scrollTrigger: {
				trigger: item,
				start: 'top bottom',
                scroller: '.scroller',
				onEnter: (scroll) => {
					item.classList.add('aos-animate');
				},
                onLeaveBack: () => {
                    item.classList.remove('aos-animate');
                }
			}
		})
	});





    //project pin
    const pins = gsap.utils.toArray('.project .pin:not(:last-child)');
    

	pins.forEach(pin => {
		ScrollTrigger.create({
			trigger: pin,
			start: "bottom 90%",
			pin: pin, 
			pinSpacing: false, // true로 설정하면 고정된 요소의 공간이 유지
			onEnter: () => pin.classList.add('small'),
			onLeave: () => pin.classList.remove('small'),
			onEnterBack: () => pin.classList.add('small'),
			onLeaveBack: () => pin.classList.remove('small'),
		});   
	});





    //about me    
    ScrollTrigger.matchMedia({
        // ✅ 768px 이하
        "(max-width: 768px)": function() {
            const aboutTl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".about",
                    start: "top 40%",
                    end: "bottom 90%",
                    scrub: 2,
                }
            });

            aboutTl.to(".about .me > span", {
                color: "#fff",
                stagger: 0.2,
                ease: "none",
            });
        },

        // ✅ 769px 이상
        "(min-width: 769px)": function() {
            const aboutTl = gsap.timeline({
                scrollTrigger: {
                trigger: ".about",
                start: "top 20%",
                end: "bottom bottom",
                scrub: 3,
                }
            });

            aboutTl.to(".about .me > span", {
                color: "#fff",
                stagger: 0.2,
                ease: "none",
            });
        }
    });
    
});