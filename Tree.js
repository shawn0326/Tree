/**
 * Created by shawn on 2014/10/30.
 * Tree 树木
 * @extend Class
 */
var Tree = Class.extend({
	x: 0,
	y: 0,

	// 树木的主干
	_mainBranch: null,

	// 树木主干的最高生长限制
	maxHeight: 300,

	ctor: function(ctx, x, y, height){
		this.x = x;
		this.y = y;

		this._mainBranch = new Branch(0, 0, height);
		// TODO 树干的粗度考虑依树干高度自动改变
		this._mainBranch.wide = 10;

		this.draw(ctx);
	},

	/**
	 * 树木生长一次
	 */
	grow: function(){
		if(this._mainBranch.length > this.maxHeight){
			console.log("达到生长顶峰,不能继续生长！");
			return false
		}
		this._mainBranch.grow();
	},

	/**
	 * 树木的绘制
	 */
	draw: function(ctx){
		ctx.save();
		ctx.translate(this.x, this.y);
		this._mainBranch.draw(ctx);
		ctx.restore();
	}
});