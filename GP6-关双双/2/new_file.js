;(function($){
	 $.fn.banner = function (option){
		//为animate，autoPlay设置默认参数
		this.animate = option.animate ? option.animate : "slide";
		this.autoPlay = option.autoPlay ? option.autoPlay : true;
		this.nextBtn = option.nextBtn;
		this.prevBtn = option.prevBtn;
		this.ele = $(".banner");
		this.img = this.ele.find("img");
		this.imgCount = this.img.length;
		this.index = 0;
		this.init();
	}
	
	$.fn.banner.prototype = {
		constructor:$.fn.banner,
		init(){
			//初始化  添加事件
			this.nextBtn.on("click",$.proxy(this.next,this));
			this.prevBtn.on("click",$.proxy(this.prev,this));
			if(this.autoPlay) this.autoplay();
			this.ele.hover(function(){
				//清除定时器  阻止自动播放
				if(this.timer) clearInterval(this.timer);
			}.bind(this),function(){
				this.autoplay();
			}.bind(this))
		},
		run(opt,index){
			//判断动画播放方式
			if(opt == "slide"){
				this.img.each(function(index,item){
					$(item).slideUp(0);
				})
				this.img.eq(index).stop().slideDown(300);
			}
			if(opt == "fade"){
				this.img.each(function(index,item){
					$(item).fadeOut(0);
				})
				this.img.eq(index).stop().fadeIn(300);
			}
		},
		next(){
			//清除定时器  阻止自动播放
			if(this.timer) clearInterval(this.timer);
			this.index++;
			//播放到最后一张图片则回到第一张
			if(this.index == this.imgCount) this.index = 0;
			this.run(this.animate,this.index);
		},
		prev(){
			//清除定时器  阻止自动播放
			if(this.timer) clearInterval(this.timer);
			this.index--;
			//播放到第一张图片则回到最后一张
			if(this.index == 0) this.index = this.imgCount-1;
			this.run(this.animate,this.index);
		},
		autoplay(){
			//设置定时器每隔一秒自动调用run方法
			this.timer = setInterval(function(){
				this.index++;
				if(this.index == this.imgCount) this.index = 0;
				this.run(this.animate,this.index);
			}.bind(this),2000)
		}
	}
})(jQuery);
