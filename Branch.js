/**
 * Created by shawn on 2014/10/30.
 * Branch 树木的分支
 * @extend Class
 */
var Branch = Class.extend({
	// 树枝的粗细
	wide: 5,
	// 树枝的分叉角
	rotate: 0,
	// 树枝的长度
	length: 0,
	// 树枝的颜色
	color: "rgb(0,0,0)",

	// 树枝的生长位置距离根部的距离
	distanceFromRoot: 0,
	// 树枝深度记录
	depth: 0,

	// 树枝的子树枝
	children: null,
	// 树枝的父树枝
	parent: null,

	ctor: function(distanceFromRoot, rotate, length){
		this.distanceFromRoot = distanceFromRoot;
		this.rotate = rotate;
		this.length = length;

		this.children = [];

		if(this.length > 40){
			for(var i = 0; i < 10; i++){
				this.addChildBranch();
			}
		}
	},
	draw: function(ctx){
		ctx.save();
		ctx.translate(0, -this.distanceFromRoot);
		ctx.rotate(this.rotate);
		this._draw(ctx);
		for(var i = 0; i < this.children.length; i++){
			this.children[i].draw(ctx);
		}

		ctx.restore();
	},
	_draw: function(ctx){
		ctx.lineWidth = this.wide;
		ctx.strokeStyle = this.color;
		ctx.beginPath();
		ctx.moveTo(0, 0);
		ctx.lineTo(0, -this.length);
		//ctx.bezierCurveTo(8,this.length / 4,8, this.length*3 / 4,0, -this.length);
		ctx.closePath();
		ctx.stroke();
	},
	/**
	 * 添加一条子树枝
	 */
	addChildBranch: function(){
		var rate = Math.random();
		rate = rate < 0.3 ? rate + 0.3 : rate;
		var rotate = (Math.random() - 0.5) * Math.PI * 2 / 3;
		var length = Math.round(this.length * 0.5);
		var branch = new Branch(rate * this.length, rotate, length);
		branch.setParent(this);
		branch.wide = Math.round(this.wide * 0.5);
		branch.depth = this.depth + 1;
		this.children.push(branch);
	},
	setParent: function(branch){
		this.parent = branch;
	},
	grow: function(){
		// this.length ++
	}
});