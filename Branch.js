/**
 * Created by shawn on 2014/10/30.
 * Branch 树木的分支
 * @extend Class
 */
var Branch = Class.extend({
	// 树枝的分叉角
	rotate: 0,
	// 树枝的长度
	length: 0,
	// 树枝的颜色
	color: "rgb(0,0,0)",

	// 树枝的生长位置距离根部的距离
	distanceFromRoot: 0,
	// 树枝深度记录
	depth: 1,

	// 树枝的子树枝
	children: null,
	// 树枝的父树枝
	parent: null,

	// 成长速度
	growRate: 1,

	// 枝干发芽的阈值
	minLengthToBranch: 40,
	// 单位长度的分叉数
	branchesPerLength: 0.04,
	// 子枝干最大长度与父枝干长度的比值
	ratioChildToParent: 0.5,
	// 树干粗度与长度的比值
	ratioWideToLength: 0.05,
	// 子树枝在父枝干上生长的范围
	scopeToBranch: 0.7,
	// 成长速度范围设定
	growRateRange: {
		fast: 1.1,
		normal: 1.01
	},

	ctor: function(distanceFromRoot, rotate, length){
		this.distanceFromRoot = distanceFromRoot;
		this.rotate = rotate;
		this.length = length;

		this.children = [];
		this.initBranches();
	},

	/**
	 * 初始化枝干
	 */
	initBranches: function(){
		if(this.length > this.minLengthToBranch){
			for(var i = 0; i < this.length * this.branchesPerLength; i++){
				this.addChildBranch(this.length * this.ratioChildToParent);
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

	grow: function(){
		this.updateGrowRate();
		this.length = this.length * this.growRate;
		for(var i = 0; i < this.children.length; i++){
			this.children[i].distanceFromRoot = this.children[i].distanceFromRoot * this.growRate;
			this.children[i].grow();
		}

		this.updateBranches();
	},

	/**
	 * 更新分支策略
	 **/
	updateBranches: function(){
		if(this.length > this.minLengthToBranch){
			if(this.children.length < this.length * this.branchesPerLength){
				for(var j = 0; j < this.length * this.branchesPerLength - this.children.length; j++){
					this.addChildBranch(10);
				}
			}
		}
	},

	/**
	 * 动态调整树枝的生长率
	 */
	updateGrowRate: function(){
		if(this.parent){
			if(this.length < this.parent.length * this.ratioChildToParent){
				this.growRate = this.growRateRange.fast;
			}else{
				this.growRate = this.growRateRange.normal;
			}
		}else{
			this.growRate = this.growRateRange.normal;
		}
	},

	_draw: function(ctx){
		ctx.lineWidth = Math.round(this.length * this.ratioWideToLength);
		ctx.strokeStyle = this.color;
		ctx.beginPath();
		ctx.moveTo(0, 0);
		ctx.lineTo(0, -Math.round(this.length));
		//ctx.bezierCurveTo(8,this.length / 4,8, this.length*3 / 4,0, -this.length);
		ctx.closePath();
		ctx.stroke();
	},

	/**
	 * 添加一条子树枝
	 */
	addChildBranch: function(length){
		var rate = Math.random() * this.scopeToBranch + (1 - this.scopeToBranch);
		var rotate = (Math.random() - 0.5) * Math.PI * 2 / 3;
		var branch = new Branch(rate * this.length, rotate, length);
		branch.setParent(this);
		branch.depth = this.depth + 1;
		this.children.push(branch);
	},

	setParent: function(branch){
		this.parent = branch;
	}
});