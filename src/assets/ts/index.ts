import '../css/pc_common.scss';

interface Alldata{
    [propName: string]: any
}
declare let alldata:Alldata;

const app = new Vue({
    el: '#app',
    data: {
        jiaodiantu: alldata.jiaodiantu,
        dongtaibaogao: alldata.dongtaibaogao,
        xunzhan: alldata.xunzhan,
        fuhua: alldata.fuhua,
        tuopinji: alldata.tuopinji
    },
    methods:{
        addswing(index:number){
            let app = this;
            this.xunzhan[index].swing = true;
            setTimeout(function(){
                app.xunzhan[index].swing = false;
            }, 1000);
        }
    },
    mounted(){
        var swiper1 = new Swiper('.shoupinbg .swiper-container', {
            pagination: '.swiper-pagination',
            paginationClickable: true,
            loop: true,
            autoplay: 2000,
        });
        var swiper2 = new Swiper('.fuhua .swiper-container', {
            slidesPerView: 3,
            centeredSlides: true,
            loop : true,
            autoplay: 1000,
            paginationClickable: true,
            spaceBetween: 30
        });

        // 初始化 3D旋转 
        var showcase = $("#showcase")
        showcase.Cloud9Carousel({
            yPos: 42,
            yRadius: 100,
            mirrorOptions: {
                gap: 22,
                height: 0.2
            },
            autoPlayDelay: 1500,
            autoPlay: true,
            buttonLeft: $(".nav-arrow > .left"),
            buttonRight: $(".nav-arrow > .right"),
            bringToFront: true,
            farScale:0.7,
            //onRendered: showcaseUpdated,
            onLoaded: function () {
                showcase.css('visibility', 'visible')
                showcase.css('display', 'none')
                showcase.fadeIn(1500)
                // $('#showcase .cloud9-item').mouseenter(function () {
                // 	if ($(this).hasClass('active')) {
                // 		$(this).addClass('show-code')
                // 	}
                // })
                // $('#showcase .cloud9-item').mouseleave(function () {
                // 	$(this).removeClass('show-code')
                // })
            }
        })




        
        // function showcaseUpdated(showcase:any) {
        //     var title = $('#item-title').html(
        //         $(showcase.nearestItem()).attr('alt')
        //     )
        //     var c = Math.cos((showcase.floatIndex() % 1) * 2 * Math.PI)
        //     title.css('opacity', 0.5 + (0.5 * c))
        // }

    }
});