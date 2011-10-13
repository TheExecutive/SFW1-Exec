// take everything below this comment, and paste it to the bottom of your library
/*
	Ryu Easing
	----------
	Example: easing(currentTime, startValue, changeToValue, duration)
	----------
	Methods:
		linearTween
		easeInQuad
		easeOutQuad
		easeInOutQuad
		easeInCubic
		easeOutCubic
		easeInOutCubic
		easeInQuart
		easeOutQuart
		easeInOutQuart
		easeInQuint
		easeOutQuint
		easeInOutQuint
		easeInSine
		easeOutSine
		easeInOutSine
		easeInExpo
		easeOutExpo
		easeInOutExpo
		easeInCirc
		easeOutCirc
		easeInOutCirc
		easeInElastic
		easeOutElastic
		easeInOutElastic
		easeInBack
		easeOutBack
		easeInOutBack
		easeInBounce
		easeOutBounce
		easeInOutBounce	
*/
Math.linearTween=function(a,c,b,d){return b*a/d+c};Math.easeInQuad=function(a,c,b,d){return b*(a/=d)*a+c};Math.easeOutQuad=function(a,c,b,d){return-b*(a/=d)*(a-2)+c};Math.easeInOutQuad=function(a,c,b,d){return(a/=d/2)<1?b/2*a*a+c:-b/2*(--a*(a-2)-1)+c};Math.easeInCubic=function(a,c,b,d){return b*(a/=d)*a*a+c};Math.easeOutCubic=function(a,c,b,d){return b*((a=a/d-1)*a*a+1)+c};Math.easeInOutCubic=function(a,c,b,d){return(a/=d/2)<1?b/2*a*a*a+c:b/2*((a-=2)*a*a+2)+c};
Math.easeInQuart=function(a,c,b,d){return b*(a/=d)*a*a*a+c};Math.easeOutQuart=function(a,c,b,d){return-b*((a=a/d-1)*a*a*a-1)+c};Math.easeInOutQuart=function(a,c,b,d){return(a/=d/2)<1?b/2*a*a*a*a+c:-b/2*((a-=2)*a*a*a-2)+c};Math.easeInQuint=function(a,c,b,d){return b*(a/=d)*a*a*a*a+c};Math.easeOutQuint=function(a,c,b,d){return b*((a=a/d-1)*a*a*a*a+1)+c};Math.easeInOutQuint=function(a,c,b,d){return(a/=d/2)<1?b/2*a*a*a*a*a+c:b/2*((a-=2)*a*a*a*a+2)+c};
Math.easeInSine=function(a,c,b,d){return-b*Math.cos(a/d*(Math.PI/2))+b+c};Math.easeOutSine=function(a,c,b,d){return b*Math.sin(a/d*(Math.PI/2))+c};Math.easeInOutSine=function(a,c,b,d){return-b/2*(Math.cos(Math.PI*a/d)-1)+c};Math.easeInExpo=function(a,c,b,d){return a==0?c:b*Math.pow(2,10*(a/d-1))+c};Math.easeOutExpo=function(a,c,b,d){return a==d?c+b:b*(-Math.pow(2,-10*a/d)+1)+c};
Math.easeInOutExpo=function(a,c,b,d){return a==0?c:a==d?c+b:(a/=d/2)<1?b/2*Math.pow(2,10*(a-1))+c:b/2*(-Math.pow(2,-10*--a)+2)+c};Math.easeInCirc=function(a,c,b,d){return-b*(Math.sqrt(1-(a/=d)*a)-1)+c};Math.easeOutCirc=function(a,c,b,d){return b*Math.sqrt(1-(a=a/d-1)*a)+c};Math.easeInOutCirc=function(a,c,b,d){return(a/=d/2)<1?-b/2*(Math.sqrt(1-a*a)-1)+c:b/2*(Math.sqrt(1-(a-=2)*a)+1)+c};
Math.easeInElastic=function(a,c,b,d,e,f){if(a==0)return c;if((a/=d)==1)return c+b;f||(f=d*0.3);e<Math.abs(b)?(e=b,b=f/4):b=f/(2*Math.PI)*Math.asin(b/e);return-(e*Math.pow(2,10*(a-=1))*Math.sin((a*d-b)*2*Math.PI/f))+c};Math.easeOutElastic=function(a,c,b,d,e,f){if(a==0)return c;if((a/=d)==1)return c+b;f||(f=d*0.3);if(e<Math.abs(b))var e=b,g=f/4;else g=f/(2*Math.PI)*Math.asin(b/e);return e*Math.pow(2,-10*a)*Math.sin((a*d-g)*2*Math.PI/f)+b+c};
Math.easeInOutElastic=function(a,c,b,d,e,f){if(a==0)return c;if((a/=d/2)==2)return c+b;f||(f=d*0.3*1.5);if(e<Math.abs(b))var e=b,g=f/4;else g=f/(2*Math.PI)*Math.asin(b/e);return a<1?-0.5*e*Math.pow(2,10*(a-=1))*Math.sin((a*d-g)*2*Math.PI/f)+c:e*Math.pow(2,-10*(a-=1))*Math.sin((a*d-g)*2*Math.PI/f)*0.5+b+c};Math.easeInBack=function(a,c,b,d,e){e==void 0&&(e=1.70158);return b*(a/=d)*a*((e+1)*a-e)+c};Math.easeOutBack=function(a,c,b,d,e){e==void 0&&(e=1.70158);return b*((a=a/d-1)*a*((e+1)*a+e)+1)+c};
Math.easeInOutBack=function(a,c,b,d,e){e==void 0&&(e=1.70158);return(a/=d/2)<1?b/2*a*a*(((e*=1.525)+1)*a-e)+c:b/2*((a-=2)*a*(((e*=1.525)+1)*a+e)+2)+c};Math.easeInBounce=function(a,c,b,d){return b-Math.easeOutBounce(d-a,0,b,d)+c};Math.easeOutBounce=function(a,c,b,d){return(a/=d)<1/2.75?b*7.5625*a*a+c:a<2/2.75?b*(7.5625*(a-=1.5/2.75)*a+0.75)+c:a<2.5/2.75?b*(7.5625*(a-=2.25/2.75)*a+0.9375)+c:b*(7.5625*(a-=2.625/2.75)*a+0.984375)+c};
Math.easeInOutBounce=function(a,c,b,d){return a<d/2?Math.easeInBounce(a*2,0,b,d)*0.5+c:Math.easeOutBounce(a*2-d,0,b,d)*0.5+b*0.5+c};
