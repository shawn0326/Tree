/**
 * Created by shawn on 2014/10/30.
 * Tree 树木
 * @extend Class
 */
var Tree = Class.extend({
	x: 0,
	y: 0,
	_mainBranch: null,
	ctor: function(x, y, height, ctx){
		this.x = x;
		this.y = y;
		this._mainBranch = new Branch(0, 0, height, 10);

		this.draw(ctx);
	},
	grow: function(){

	},
	draw: function(ctx){
		ctx.save();
		ctx.translate(this.x, this.y);
		this._mainBranch.draw(ctx);
		ctx.restore();
	}
});

Tree.create = function(x, y, height, ctx){
	return new Tree(x, y, height, ctx);
};