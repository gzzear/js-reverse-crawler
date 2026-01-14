# AST解混淆



### AST

#### 加混淆

```js
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const t = require("@babel/types");
const generator = require("@babel/generator").default;
const fs = require('fs');

//把混淆方案的相关实现方法封装成类
function ConfoundUtils(ast, encryptFunc) {
	this.ast = ast;
	this.bigArr = [];
	//接收传进来的函数，用于字符串加密
	this.encryptFunc = encryptFunc;
}
//改变对象属性访问方式 console.log 改为 console["log"]
ConfoundUtils.prototype.changeAccessMode = function () {
	traverse(this.ast, {
		MemberExpression(path) {
			if (t.isIdentifier(path.node.property)) {
				let name = path.node.property.name;
				path.node.property = t.stringLiteral(name);
			}
			path.node.computed = true;
		},
	});
}
//标准内置对象的处理
ConfoundUtils.prototype.changeBuiltinObjects = function () {
	traverse(this.ast, {
		Identifier(path) {
			let name = path.node.name;
			if ('eval|parseInt|encodeURIComponent|Object|Function|Boolean|Number|Math|Date|String|RegExp|Array'.indexOf(name) != -1) {
				path.replaceWith(t.memberExpression(t.identifier('window'), t.stringLiteral(name), true));
			}
		}
	});
}
//数值常量加密
ConfoundUtils.prototype.numericEncrypt = function () {
	traverse(this.ast, {
		NumericLiteral(path) {
			let value = path.node.value;
			let key = parseInt(Math.random() * (999999 - 100000) + 100000, 10);
			let cipherNum = value ^ key;
			path.replaceWith(t.binaryExpression('^', t.numericLiteral(cipherNum), t.numericLiteral(key)));
			path.skip();
		}
	});
}
//字符串加密与数组混淆
ConfoundUtils.prototype.arrayConfound = function () {
	let bigArr = [];
	let encryptFunc = this.encryptFunc;
	traverse(this.ast, {
		StringLiteral(path) {
			let bigArrIndex = bigArr.indexOf(encryptFunc(path.node.value));
			let index = bigArrIndex;
			if (bigArrIndex == -1) {
				let length = bigArr.push(encryptFunc(path.node.value));
				index = length - 1;
			}
			let encStr = t.callExpression(
				t.identifier('atob'),
				[t.memberExpression(t.identifier('arr'), t.numericLiteral(index), true)]);
			path.replaceWith(encStr);
		}
	});
	bigArr = bigArr.map(function (v) {
		return t.stringLiteral(v);
	});
	this.bigArr = bigArr;
}
//数组乱序
ConfoundUtils.prototype.arrayShuffle = function () {
	(function (myArr, num) {
		var xiaojianbang = function (nums) {
			while (--nums) {
				myArr.unshift(myArr.pop());
			}
		};
		xiaojianbang(++num);
	}(this.bigArr, 0x10));
}
//二项式转函数花指令
ConfoundUtils.prototype.binaryToFunc = function () {
	traverse(this.ast, {
		BinaryExpression(path) {
			let operator = path.node.operator;
			let left = path.node.left;
			let right = path.node.right;
			let a = t.identifier('a');
			let b = t.identifier('b');
			let funcNameIdentifier = path.scope.generateUidIdentifier('xxx');
			let func = t.functionDeclaration(
				funcNameIdentifier,
				[a, b],
				t.blockStatement([t.returnStatement(
					t.binaryExpression(operator, a, b)
				)]));
			let BlockStatement = path.findParent(
				function (p) { return p.isBlockStatement() });
			BlockStatement.node.body.unshift(func);
			path.replaceWith(t.callExpression(funcNameIdentifier, [left, right]));
		}
	});
}
//十六进制字符串
ConfoundUtils.prototype.stringToHex = function () {
	function hexEnc(code) {
		for (var hexStr = [], i = 0, s; i < code.length; i++) {
			s = code.charCodeAt(i).toString(16);
			hexStr += "\\x" + s;
		}
		return hexStr
	}
	traverse(this.ast, {
		MemberExpression(path) {
			if (t.isIdentifier(path.node.property)) {
				let name = path.node.property.name;
				path.node.property = t.stringLiteral(hexEnc(name));
			}
			path.node.computed = true;
		}
	});
}
//标识符混淆
ConfoundUtils.prototype.renameIdentifier = function () {
	//标识符混淆之前先转成代码再解析，才能确保新生成的一些节点也被解析到
	let code = generator(this.ast).code;
	let newAst = parser.parse(code);
	//生成标识符
	function generatorIdentifier(decNum) {
		let arr = ['O', 'o', '0'];
		let retval = [];
		while (decNum > 0) {
			retval.push(decNum % 3);
			decNum = parseInt(decNum / 3);
		}
		let Identifier = retval.reverse().map(function (v) {
			return arr[v]
		}).join('');
		Identifier.length < 6 ? (Identifier = ('OOOOOO' + Identifier).substr(-6)) :
			Identifier[0] == '0' && (Identifier = 'O' + Identifier);
		return Identifier;
	}
	function renameOwnBinding(path) {
		let OwnBindingObj = {}, globalBindingObj = {}, i = 0;
		path.traverse({
			Identifier(p) {
				let name = p.node.name;
				let binding = p.scope.getOwnBinding(name);
				binding && generator(binding.scope.block).code == path + '' ?
					(OwnBindingObj[name] = binding) : (globalBindingObj[name] = 1);
			}
		});
		for (let oldName in OwnBindingObj) {
			do {
				var newName = generatorIdentifier(i++);
			} while (globalBindingObj[newName]);
			OwnBindingObj[oldName].scope.rename(oldName, newName);
		}
	}
	traverse(newAst, {
		'Program|FunctionExpression|FunctionDeclaration'(path) {
			renameOwnBinding(path);
		}
	});
	this.ast = newAst;
}
//指定代码行加密
ConfoundUtils.prototype.appointedCodeLineEncrypt = function () {
	traverse(this.ast, {
		FunctionExpression(path) {
			let blockStatement = path.node.body;
			let Statements = blockStatement.body.map(function (v) {
				if (t.isReturnStatement(v)) return v;
				if (!(v.trailingComments && v.trailingComments[0].value == 'Base64Encrypt')) return v;
				delete v.trailingComments;
				let code = generator(v).code;
				let cipherText = base64Encode(code);
				let decryptFunc = t.callExpression(t.identifier('atob'), [t.stringLiteral(cipherText)]);
				return t.expressionStatement(
					t.callExpression(t.identifier('eval'), [decryptFunc]));
			});
			path.get('body').replaceWith(t.blockStatement(Statements));
		}
	});
}
//指定代码行ASCII码混淆
ConfoundUtils.prototype.appointedCodeLineAscii = function () {
	traverse(this.ast, {
		FunctionExpression(path) {
			let blockStatement = path.node.body;
			let Statements = blockStatement.body.map(function (v) {
				if (t.isReturnStatement(v)) return v;
				if (!(v.trailingComments && v.trailingComments[0].value == 'ASCIIEncrypt')) return v;
				delete v.trailingComments;
				let code = generator(v).code;
				let codeAscii = [].map.call(code, function (v) {
					return t.numericLiteral(v.charCodeAt(0));
				})
				let decryptFuncName = t.memberExpression(
					t.identifier('String'), t.identifier('fromCharCode'));
				let decryptFunc = t.callExpression(decryptFuncName, codeAscii);
				return t.expressionStatement(
					t.callExpression(t.identifier('eval'), [decryptFunc]));
			});
			path.get('body').replaceWith(t.blockStatement(Statements));
		}
	});
}
//构建数组声明语句，加入到ast最前面
ConfoundUtils.prototype.unshiftArrayDeclaration = function () {
	this.bigArr = t.variableDeclarator(t.identifier('arr'), t.arrayExpression(this.bigArr));
	this.bigArr = t.variableDeclaration('var', [this.bigArr]);
	this.ast.program.body.unshift(this.bigArr);
}
//拼接两个ast的body部分
ConfoundUtils.prototype.astConcatUnshift = function (ast) {
	this.ast.program.body.unshift(ast);
}
ConfoundUtils.prototype.getAst = function () {
	return this.ast;
}
//Base64编码
function base64Encode(e) {
	var r, a, c, h, o, t, base64EncodeChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
	for (c = e.length, a = 0, r = ''; a < c;) {
		if (h = 255 & e.charCodeAt(a++), a == c) {
			r += base64EncodeChars.charAt(h >> 2),
				r += base64EncodeChars.charAt((3 & h) << 4),
				r += '==';
			break
		}
		if (o = e.charCodeAt(a++), a == c) {
			r += base64EncodeChars.charAt(h >> 2),
				r += base64EncodeChars.charAt((3 & h) << 4 | (240 & o) >> 4),
				r += base64EncodeChars.charAt((15 & o) << 2),
				r += '=';
			break
		}
		t = e.charCodeAt(a++),
			r += base64EncodeChars.charAt(h >> 2),
			r += base64EncodeChars.charAt((3 & h) << 4 | (240 & o) >> 4),
			r += base64EncodeChars.charAt((15 & o) << 2 | (192 & t) >> 6),
			r += base64EncodeChars.charAt(63 & t)
	}
	return r
}
function main() {
	//读取要混淆的代码
	const jscode = fs.readFileSync("./demo.js", {
		encoding: "utf-8"
	});
	//读取还原数组乱序的代码
	const jscodeFront = fs.readFileSync("./demoFront.js", {
		encoding: "utf-8"
	});
	//把要混淆的代码解析成ast
	let ast = parser.parse(jscode);
	//把还原数组乱序的代码解析成astFront
	let astFront = parser.parse(jscodeFront);
	//初始化类，传递自定义的加密函数进去
	let confoundAst = new ConfoundUtils(ast, base64Encode);
	let confoundAstFront = new ConfoundUtils(astFront);
	//改变对象属性访问方式
	confoundAst.changeAccessMode();
	//标准内置对象的处理
	confoundAst.changeBuiltinObjects();
	//二项式转函数花指令
	confoundAst.binaryToFunc()
	//字符串加密与数组混淆
	confoundAst.arrayConfound();
	//数组乱序
	confoundAst.arrayShuffle();

	//还原数组顺序代码，改变对象属性访问方式，对其中的字符串进行十六进制编码
	confoundAstFront.stringToHex();
	astFront = confoundAstFront.getAst();
	//先把还原数组顺序的代码，加入到被混淆代码的ast中
	confoundAst.astConcatUnshift(astFront.program.body[0]);

	//再生成数组声明语句，并加入到被混淆代码的最开始处
	confoundAst.unshiftArrayDeclaration();
	//标识符重命名
	confoundAst.renameIdentifier();
	//指定代码行的混淆，需要放到标识符混淆之后
	confoundAst.appointedCodeLineEncrypt();
	confoundAst.appointedCodeLineAscii();
	//数值常量混淆
	confoundAst.numericEncrypt();
	ast = confoundAst.getAst();
	//ast转为代码
	code = generator(ast).code;
	//混淆的代码中，如果有十六进制字符串加密，ast转成代码以后会有多余的转义字符，需要替换掉
	code = code.replace(/\\\\x/g, '\\x');
	console.log(code);
}
main();
```







#### 解混淆

> 练习混淆文件

demo.js

```js
var _0x5a19 = ['IiBjbGFzcz0iYnV0dG9uIHdoaXRlIj48Y2FudmFzIHdpZHRoPSI1MHB4IiBoZWlnaHQ9IjQwcHgiIHN0eWxlPSJ3aWR0aDo1MHB4O2hlaWdodDo0MHB4IiBpZD0iYnRuY2Fudl8=', 'Ij48L2NhbnZhcz48L2Rpdj48L2Rpdj4=', 'MnwzfDF8NHww', 'L3l6bXRlc3QvY2hlY2sucGhwP3Q9', 'cG9zdA==', 'MTEyNQ==', 'anNvbg==', 'Ymx1ZQ==', '572R57uc6ZSZ6K+v77yM6K+35Yi35paw6aqM6K+B56CB', 'ZGl2LmJsdWU=', 'PGNhbnZhcyBpZD0ieXptX2ltZyIgc3R5bGU9IndpZHRoOjMwMHB4O2hlaWdodDoxODBweCIgd2lkdGg9IjMwMHB4IiBoZWlnaHQ9IjE4MHB4Ij48L2NhbnZhcz4=', 'PGRpdiBjbGFzcz0ieXptX2J1dHRvbiI+', 'Mnw0fDV8MHwxfDM=', 'NXwyfDF8MHwzfDQ=', 'IzAwMA==', 'MTVweCBib2xk', 'YnRuY2Fudl8=', 'L3l6bXRlc3QvZ2V0LnBocD90PQ==', 'Lnl6bWJvZHk=', 'MXw0fDB8M3wy', 'bG9hZGluZw==', 'I3l6bV9yZWZyZXNo', 'NXw0fDB8MnwxfDM=', 'I3l6bV9jbG9zZQ==', 'Y2xpY2s=', 'TG9naW5Gb3Jt', 'MnwxfDV8NnwwfDN8NA==', 'aW5wdXRbbmFtZT0ndXNlcm5hbWUnXQ==', 'I3VzZXJSZWdGb3Jt', 'I2xlYm95em0=', 'aW5wdXRbbmFtZT0ncGFzc3dkJ10=', 'dXNlclJlZ0Zvcm0=', 'b3NjcWo=', 'c3BsaXQ=', 'cHJvdG90eXBl', 'aGlkZWxvYWRpbmc=', 'JGRpdg==', 'ZmluZA==', 'ZU5remU=', 'aGlkZQ==', 'c2V0TGVu', 'JGxlbg==', 'ZmtVaEM=', 'bHlLemg=', 'UHJERXg=', 'Ykl6SkE=', 'UXhrbFo=', 'ZXZsbEM=', 'WGhJdWY=', 'VkJLbXg=', 'QWd2RWQ=', 'alZ3Qkw=', 'WFlvUlQ=', 'ZE9tVXU=', 'alhyTGQ=', 'eUd6RFk=', 'TXFveEg=', 'bGtaYnY=', 'TWNrWmY=', 'cENWalM=', 'TVBQZ1I=', 'UE9Dd1I=', 'd1ZhUkQ=', 'VERnUFg=', 'eFpybWE=', 'Y0JDTHg=', 'blJhcUI=', 'V1pKRmI=', 'VWhHcXQ=', 'VW94aEk=', 'UWpJVkk=', 'VGRqS1U=', 'THNqZWQ=', 'dXNDQ1Q=', 'QUZlelA=', 'YUVCY2c=', 'RGhWU3U=', 'Rk9aUmw=', 'WlBZZ2k=', 'blRyaGQ=', 'a3hkY0Q=', 'Y1ZzdGQ=', 'ZU1EelI=', 'S2pOY28=', 'V3JLU3k=', 'Ykx3elo=', 'YWFoTEU=', 'ZWVRS3g=', 'dmRldEI=', 'VHNGdVo=', 'SkRNSXY=', 'bk5GdmE=', 'c25YeEs=', 'Qml4WVM=', 'TVdQWmE=', 'T2VLQ3I=', 'bmJ1WGc=', 'WkZtVEk=', 'YU9KZVg=', 'Wkp3WlY=', 'c0ZpbUM=', 'Y2tQSkg=', 'WEZEU0I=', 'cFhjbEw=', 'Y1VTU2g=', 'cm5DWGM=', 'RURSREk=', 'b1ZzbUs=', 'SURuWVA=', 'WExKb3o=', 'eXJmVlo=', 'VG9HS3M=', 'ZGtwQmk=', 'UXZSY1Q=', 'eHNpVmc=', 'Z2V0SWQ=', 'QkJ2eU4=', 'cm91bmQ=', 'Y2RUd0E=', 'cmFuZG9t', 'dG9TdHJpbmc=', 'Z2V0VGltZQ==', 'c3Vic3Ry', 'd0dsRmc=', 'akRJTHg=', 'JHN0cmxlbg==', 'bGVuZ3Ro', 'ZXJyb3I=', 'QU9kcXU=', 'YWRkQ2xhc3M=', 'dUF0UE4=', 'SnVHcmo=', 'dGV4dA==', 'c2hvdw==', 'c2h1ZmZsZQ==', 'Zmxvb3I=', 'c3VjY2VlZA==', 'RE1kZHg=', 'RXl2Y0w=', 'cmVtb3ZlQ2xhc3M=', 'WGRXVkU=', 'dUxEbHg=', 'c2hvd2xvYWRpbmcy', 'YnViTlM=', 'c2V0c3RhdHVz', 'JHN0YXR1cw==', 'ZW1SR3U=', 'cHVzaA==', 'eWVYWXg=', 'JGNsaWVudGlk', 'a2ZxekM=', 'aGRwUG0=', 'bm93', 'JGZvcm1PYmo=', 'QllmZWg=', 'RGtmUHk=', 'TlFlSEc=', 'JHVzZXJuYW1l', 'UWFQbUg=', 'UXBVUk8=', 'RmRGWFc=', 'JGhtZGF0YQ==', 'am9pbg==', 'JHBhc3N3b3Jk', 'aE5UR1M=', 'SnFheEM=', 'ckljT0I=', 'ZldScFo=', 'cmVtb3Zl', 'cnF4UHM=', 'Y2xvc2U=', 'bG9hZA==', 'VVJVR3o=', 'aGlkZWxvYWRpbmcy', 'c2hvd2xvYWRpbmc=', 'U3p2YXI=', 'WGZ6dHI=', 'T0pBU0Y=', 'TWhsZWk=', 'SUdCV20=', 'ZkxEdU0=', 'R2tzZ1Q=', 'YWpheA==', 'ZXRycWM=', 'b2lGSWM=', 'cXNpWU0=', 'amxDUks=', 'eE9kSkQ=', 'ekJ2aUI=', 'Z0p3RHI=', 'cHhoTUE=', 'aHRtbA==', 'Z2V0RWxlbWVudEJ5SWQ=', 'dXRrZ1M=', 'aEpJbEg=', 'bFZrVU4=', 'Z2ZnVXI=', 'ZWFjaA==', 'cW5PWEs=', 'YXR0cg==', 'cmVwbGFjZQ==', 'RVNrQWg=', 'a0VDbkE=', 'bkpaTHE=', 'T05iZmM=', 'WlBjeVU=', 'amdCRHo=', 'SVhDdEI=', 'dmprRWE=', 'V0NqWGI=', 'V3hpTVY=', 'WlNGSm8=', 'T053aVQ=', 'Y29kZQ==', 'c2V0VGltZW91dA==', 'c3VibWl0', 'bXNn', 'aGFzQ2xhc3M=', 'RUZjcmM=', 'WUtoWW0=', 'ZUpQRUs=', 'eHpwbVo=', 'aHNxRHE=', 'WktoeXY=', 'VXJ1akk=', 'TmRyWUU=', 'WXlsUnQ=', 'akxZWU8=', 'Z0dvaU4=', 'UFBoUlk=', 'a2tsS2I=', 'bUlDcEw=', 'SVp5RGs=', 'c2pLUWk=', 'em5YZlM=', 'dmtsTnI=', 'R1l2UUY=', 'c3Jj', 'ZGF0YQ==', 'ZWlpcUY=', 'aW5wdXQ=', 'bHR6V1o=', 'ZmlsbFN0eWxl', 'WnFEWFU=', 'Zm9udA==', 'YXNuTWQ=', 'VW1qUEc=', 'dHh0', 'ZmlsbFRleHQ=', 'WXZrZlc=', 'R2pueFQ=', 'Z2V0Q29udGV4dA==', 'd0h3blY=', 'WlJ1RmY=', 'UkZsdnM=', 'eGlIeHA=', 'bUh0TWo=', 'cnBUbm8=', 'b3Z3bHQ=', 'bW91c2Vtb3Zl', 'b25sb2Fk', 'ZHJhd0ltYWdl', 'bGVu', 'aEFEd2o=', 'ZW1wdHk=', 'dmVyaWZ5', 'VVltZFo=', 'SVhkY0M=', 'dmFs', 'aHhmbGY=', 'cXh3R00=', 'eXptYm94', 'cHZQTXM=', 'UFZ4U2o=', 'T0F4TWc=', 'dGxzUFA=', 'U2VsUng=', 'RWJjWmY=', 'Z2V0c3RhdHVz', 'Z3BzVlo=', 'YXBwZW5k', 'T3VySXY=', 'YmluZA==', 'Ykl1dGs=', 'R3h3dHY=', 'WHJvZ1k=', 'V3JvUUE=', 'bExFTlk=', 'S1RYT1g=', 'cGxYQms=', 'dmdRYXo=', 'bVRKT24=', 'eXptcmVnYm94', 'cmVhZHk=', 'MXwyfDR8N3w1fDN8OHwwfDY=', '6K+36L6T5YWl55m75YWl5biQ5Y+3ISE=', 'eHhAeEB4Lng=', '6K+36L6T5YWl5a+G56CBISE=', '5a+G56CB6ZW/5bqm5LiN6IO95bCR5LqONuS4quWtl+WFgyEh', 'aW5wdXRbbmFtZT0ndmxjb2Rlcydd', 'I0xvZ2luRm9ybSwjTG9naW5Gb3JtMg==', 'Q3BuZVk=', 'Z1ZsUmU=', 'SXVMcm0=', 'UXpGYnU=', 'dW5iaW5k', 'Tm1oUVU=', 'R1pQZnY=', 'ZWlHTVM=', 'bmV5U2g=', 'SVJJUHo=', 'ZHp2eVQ=', 'cXJUbVg=', 'cWVFd0E=', 'SmRsUEg=', 'SWFQUkQ=', 'ck9weEI=', 'WWhEREw=', 'UENPU24=', 'cnhTQk0=', 'cEt1Y0E=', 'UEFmalE=', 'SWFQc1A=', 'cld3amk=', 'Mnw5fDN8MTB8MTJ8MHwxNXw3fDZ8NHwxfDh8MTZ8NXwxMXwxN3wxM3wxNHwxOA==', 'MTd8MTV8NHwxMHw1fDE2fDE0fDB8OHw5fDN8MTh8MTJ8MXwyfDd8MTN8NnwxMQ==', 'CTwvZGl2Pg==', 'CTxpIGlkPSJ5em1fY2xvc2UiIGNsYXNzPSJpY29uZm9udCBpY29uLWN1b3d1Z3VhbmJpLSIgc3R5bGU9ImZvbnQtc2l6ZToyNXB4Ij48L2k+PGkgaWQ9Inl6bV9yZWZyZXNoIiBjbGFzcz0iaWNvbmZvbnQgaWNvbi1zaHVheGluIj48L2k+', 'PGRpdiBpZD0ieXptX2JveCIgY2xhc3M9Inl6bV9kaWFsb2ciPjxkaXYgY2xhc3M9Inl6bV9ib3giPg==', 'CTxkaXYgY2xhc3M9Inl6bV9sb2FkaW5nIj48aSBjbGFzcz0iaWNvbmZvbnQgaWNvbi10dXBpYW4iPjwvaT48ZGl2PuWKoOi9veS4rTwvZGl2PjwvZGl2Pg==', 'PC9kaXY+', 'PGRpdiBjbGFzcz0ieXptX2JvdHRvbSI+', 'PGRpdiBjbGFzcz0ieXptX2JvZHkiPg==', 'CTxkaXYgY2xhc3M9Inl6bWJvZHkiPg==', 'CTxkaXYgY2xhc3M9Inl6bV9sb2FkaW5nMiI+PGkgY2xhc3M9Imljb25mb250IGljb24tanViYW8iPjwvaT48ZGl2PumqjOivgeS4rSzor7fnqI3lkI48L2Rpdj48L2Rpdj4=', 'Ym9keQ==', 'I3l6bV9ib3g=', 'PC9kaXY+PC9kaXY+PC9kaXY+', 'Lnl6bV9sb2FkaW5n', 'Lnl6bV9sb2FkaW5nMg==', 'cmVk', 'ZGl2', '6aqM6K+B5LitLOivt+eojeWQjg==', 'MHwyfDR8MXwz', '6aqM6K+B5oiQ5Yqf77yM5q2j5Zyo6Lez6L2s', 'aWNvbi1qdWJhbw==', 'aWNvbi16aGVuZ3F1ZQ==', 'NHwxNHwxOHwxMHwxNXw1fDZ8OHwxMnwxfDIwfDB8MTF8MTd8M3wyfDE2fDEzfDE5fDd8OQ==', 'ZGl2Lnl6bWJvZHk=', 'eXptX2ltZw==', 'ZGl2LmJ1dHRvbg==', 'b2JqZWN0Xw==', 'PGRpdj48ZGl2IGlkPSJvYmplY3Rf'];
(function (_0x5cb8ac, _0x23b38e) {
    var _0x524cab = function (_0x18d3aa) {
        while (--_0x18d3aa) {
            _0x5cb8ac['push'](_0x5cb8ac['shift']());
        }
    };
    var _0x4821c6 = function () {
        var _0x398fd3 = {
            'data': {
                'key': 'cookie',
                'value': 'timeout'
            },
            'setCookie': function (_0x34eee4, _0x5586ea, _0x5ef311, _0x855d4e) {
                _0x855d4e = _0x855d4e || {};
                var _0x56baa5 = _0x5586ea + '=' + _0x5ef311;
                var _0x3da38b = 0x0;
                for (var _0x3da38b = 0x0, _0x1dc45b = _0x34eee4['length']; _0x3da38b < _0x1dc45b; _0x3da38b++) {
                    var _0x3e8d20 = _0x34eee4[_0x3da38b];
                    _0x56baa5 += ';\x20' + _0x3e8d20;
                    var _0x20e7de = _0x34eee4[_0x3e8d20];
                    _0x34eee4['push'](_0x20e7de);
                    _0x1dc45b = _0x34eee4['length'];
                    if (_0x20e7de !== !![]) {
                        _0x56baa5 += '=' + _0x20e7de;
                    }
                }
                _0x855d4e['cookie'] = _0x56baa5;
            },
            'removeCookie': function () {
                return 'dev';
            },
            'getCookie': function (_0x296452, _0x39f9cd) {
                _0x296452 = _0x296452 || function (_0x587f3d) {
                    return _0x587f3d;
                };
                var _0x19aa2b = _0x296452(new RegExp('(?:^|;\x20)' + _0x39f9cd['replace'](/([.$?*|{}()[]\/+^])/g, '$1') + '=([^;]*)'));
                var _0x3d1943 = function (_0xe1f36d, _0x41a83b) {
                    _0xe1f36d(++_0x41a83b);
                };
                _0x3d1943(_0x524cab, _0x23b38e);
                return _0x19aa2b ? decodeURIComponent(_0x19aa2b[0x1]) : undefined;
            }
        };
        var _0xef60f0 = function () {
            var _0x4ba6f5 = new RegExp('\x5cw+\x20*\x5c(\x5c)\x20*{\x5cw+\x20*[\x27|\x22].+[\x27|\x22];?\x20*}');
            return _0x4ba6f5['test'](_0x398fd3['removeCookie']['toString']());
        };
        _0x398fd3['updateCookie'] = _0xef60f0;
        var _0x4f27d5 = '';
        var _0x4e6c47 = _0x398fd3['updateCookie']();
        if (!_0x4e6c47) {
            _0x398fd3['setCookie'](['*'], 'counter', 0x1);
        } else if (_0x4e6c47) {
            _0x4f27d5 = _0x398fd3['getCookie'](null, 'counter');
        } else {
            _0x398fd3['removeCookie']();
        }
    };
    _0x4821c6();
}
    (_0x5a19, 0x144));
var _0x2ba9 = function (_0x101b8f, _0xcd7c6f) {
    _0x101b8f = _0x101b8f - 0x0;
    var _0x27941a = _0x5a19[_0x101b8f];
    if (_0x2ba9['LmvHXr'] === undefined) {
        (function () {
            var _0x56f6ba;
            try {
                var _0x18f9d6 = Function('return\x20(function()\x20' + '{}.constructor(\x22return\x20this\x22)(\x20)' + ');');
                _0x56f6ba = _0x18f9d6();
            } catch (_0x5e5baa) {
                _0x56f6ba = window;
            }
            var _0x12918c = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
            _0x56f6ba['atob'] || (_0x56f6ba['atob'] = function (_0xdc2fd0) {
                var _0x14148e = String(_0xdc2fd0)['replace'](/=+$/, '');
                for (var _0xbf7507 = 0x0, _0x18356b, _0x4f540f, _0x4c862d = 0x0, _0x4bf1e8 = ''; _0x4f540f = _0x14148e['charAt'](_0x4c862d++); ~_0x4f540f && (_0x18356b = _0xbf7507 % 0x4 ? _0x18356b * 0x40 + _0x4f540f : _0x4f540f, _0xbf7507++ % 0x4) ? _0x4bf1e8 += String['fromCharCode'](0xff & _0x18356b >> (-0x2 * _0xbf7507 & 0x6)) : 0x0) {
                    _0x4f540f = _0x12918c['indexOf'](_0x4f540f);
                }
                return _0x4bf1e8;
            });
        }
            ());
        _0x2ba9['dzoqWA'] = function (_0x30b4a5) {
            var _0x4f6190 = atob(_0x30b4a5);
            var _0x5924c6 = [];
            for (var _0x4a4f81 = 0x0, _0xbab478 = _0x4f6190['length']; _0x4a4f81 < _0xbab478; _0x4a4f81++) {
                _0x5924c6 += '%' + ('00' + _0x4f6190['charCodeAt'](_0x4a4f81)['toString'](0x10))['slice'](-0x2);
            }
            return decodeURIComponent(_0x5924c6);
        };
        _0x2ba9['nKWcry'] = {};
        _0x2ba9['LmvHXr'] = !![];
    }
    var _0x578a10 = _0x2ba9['nKWcry'][_0x101b8f];
    if (_0x578a10 === undefined) {
        var _0x4b1809 = function (_0x3b1d14) {
            this['YlKlnG'] = _0x3b1d14;
            this['NsTJKl'] = [0x1, 0x0, 0x0];
            this['HILIkx'] = function () {
                return 'newState';
            };
            this['GGmyeM'] = '\x5cw+\x20*\x5c(\x5c)\x20*{\x5cw+\x20*';
            this['VUtdVO'] = '[\x27|\x22].+[\x27|\x22];?\x20*}';
        };
        _0x4b1809['prototype']['OsLPar'] = function () {
            var _0x1403ab = new RegExp(this['GGmyeM'] + this['VUtdVO']);
            var _0x3fadf0 = _0x1403ab['test'](this['HILIkx']['toString']()) ? --this['NsTJKl'][0x1] : --this['NsTJKl'][0x0];
            return this['anWLTR'](_0x3fadf0);
        };
        _0x4b1809['prototype']['anWLTR'] = function (_0x26db32) {
            if (!Boolean(~_0x26db32)) {
                return _0x26db32;
            }
            return this['xTDWoN'](this['YlKlnG']);
        };
        _0x4b1809['prototype']['xTDWoN'] = function (_0x597ca7) {
            for (var _0x3e27c4 = 0x0, _0x192434 = this['NsTJKl']['length']; _0x3e27c4 < _0x192434; _0x3e27c4++) {
                this['NsTJKl']['push'](Math['round'](Math['random']()));
                _0x192434 = this['NsTJKl']['length'];
            }
            return _0x597ca7(this['NsTJKl'][0x0]);
        };
        new _0x4b1809(_0x2ba9)['OsLPar']();
        _0x27941a = _0x2ba9['dzoqWA'](_0x27941a);
        _0x2ba9['nKWcry'][_0x101b8f] = _0x27941a;
    } else {
        _0x27941a = _0x578a10;
    }
    return _0x27941a;
};
(function (_0x974ca9, _0x10c65e, _0x4093e7) {
    var _0x1f20d3 = {
        'oscqj': _0x2ba9('0x0'),
        'fkUhC': _0x2ba9('0x1'),
        'lyKzh': _0x2ba9('0x2'),
        'PrDEx': function (_0x56ee68, _0x1607ce) {
            return _0x56ee68(_0x1607ce);
        },
        'bIzJA': function (_0x32a55a, _0x4df6cd) {
            return _0x32a55a + _0x4df6cd;
        },
        'QxklZ': _0x2ba9('0x3'),
        'evllC': _0x2ba9('0x4'),
        'XhIuf': _0x2ba9('0x5'),
        'VBKmx': function (_0x1a8117, _0x3e3864) {
            return _0x1a8117 * _0x3e3864;
        },
        'AgvEd': _0x2ba9('0x6'),
        'jVwBL': _0x2ba9('0x7'),
        'XYoRT': _0x2ba9('0x8'),
        'dOmUu': _0x2ba9('0x9'),
        'jXrLd': _0x2ba9('0xa'),
        'yGzDY': _0x2ba9('0xb'),
        'MqoxH': _0x2ba9('0xc'),
        'lkZbv': _0x2ba9('0xd'),
        'MckZf': function (_0x1e70d6, _0x13ccbf) {
            return _0x1e70d6 + _0x13ccbf;
        },
        'pCVjS': function (_0x2c3d11, _0x4fae60) {
            return _0x2c3d11 + _0x4fae60;
        },
        'MPPgR': function (_0x30229c, _0x40ffc3) {
            return _0x30229c - _0x40ffc3;
        },
        'POCwR': _0x2ba9('0xe'),
        'wVaRD': _0x2ba9('0xf'),
        'TDgPX': _0x2ba9('0x10'),
        'xZrma': _0x2ba9('0x11'),
        'cBCLx': _0x2ba9('0x12'),
        'nRaqB': _0x2ba9('0x13'),
        'WZJFb': _0x2ba9('0x14'),
        'UhGqt': _0x2ba9('0x15'),
        'UoxhI': _0x2ba9('0x16'),
        'QjIVI': _0x2ba9('0x17'),
        'TdjKU': _0x2ba9('0x18'),
        'Lsjed': _0x2ba9('0x19'),
        'usCCT': _0x2ba9('0x1a'),
        'AFezP': _0x2ba9('0x1b'),
        'aEBcg': function (_0x26effe, _0x13d629) {
            return _0x26effe + _0x13d629;
        },
        'DhVSu': function (_0x4f0d11, _0x318e33) {
            return _0x4f0d11 + _0x318e33;
        },
        'FOZRl': _0x2ba9('0x1c'),
        'ZPYgi': _0x2ba9('0x1d'),
        'nTrhd': _0x2ba9('0x1e'),
        'kxdcD': function (_0x578437, _0x29642c) {
            return _0x578437 == _0x29642c;
        },
        'cVstd': _0x2ba9('0x1f'),
        'eMDzR': _0x2ba9('0x20'),
        'KjNco': _0x2ba9('0x21'),
        'WrKSy': _0x2ba9('0x22'),
        'bLwzZ': _0x2ba9('0x23'),
        'aahLE': _0x2ba9('0x24'),
        'eeQKx': _0x2ba9('0x25'),
        'vdetB': _0x2ba9('0x26'),
        'TsFuZ': _0x2ba9('0x27'),
        'JDMIv': _0x2ba9('0x28'),
        'nNFva': function (_0x58664a, _0xfe92ce) {
            return _0x58664a == _0xfe92ce;
        },
        'snXxK': _0x2ba9('0x29'),
        'BixYS': _0x2ba9('0x2a'),
        'MWPZa': _0x2ba9('0x2b'),
        'OeKCr': _0x2ba9('0x2c'),
        'nbuXg': _0x2ba9('0x2d'),
        'ZFmTI': function (_0x4e4bbb, _0x19e1fa) {
            return _0x4e4bbb + _0x19e1fa;
        },
        'aOJeX': _0x2ba9('0x2e'),
        'ZJwZV': _0x2ba9('0x2f'),
        'sFimC': _0x2ba9('0x30'),
        'ckPJH': _0x2ba9('0x31'),
        'XFDSB': _0x2ba9('0x32'),
        'pXclL': _0x2ba9('0x33'),
        'cUSSh': _0x2ba9('0x34'),
        'rnCXc': _0x2ba9('0x35'),
        'EDRDI': function (_0x247161, _0x4c41eb) {
            return _0x247161(_0x4c41eb);
        },
        'oVsmK': _0x2ba9('0x36'),
        'IDnYP': _0x2ba9('0x37'),
        'XLJoz': _0x2ba9('0x38'),
        'yrfVZ': _0x2ba9('0x39'),
        'ToGKs': _0x2ba9('0x3a'),
        'dkpBi': _0x2ba9('0x3b'),
        'QvRcT': function (_0x1235a9, _0x38f538) {
            return _0x1235a9 != _0x38f538;
        },
        'xsiVg': _0x2ba9('0x3c')
    };
    var _0x167f85 = _0x1f20d3[_0x2ba9('0x3d')][_0x2ba9('0x3e')]('|'),
        _0x57c351 = 0x0;
    while (!![]) {
        switch (_0x167f85[_0x57c351++]) {
            case '0':
                _0x41fffd[_0x2ba9('0x3f')][_0x2ba9('0x40')] = function () {
                    this[_0x2ba9('0x41')][_0x2ba9('0x42')](_0x22b277[_0x2ba9('0x43')])[_0x2ba9('0x44')]();
                };
                continue;
            case '1':
                _0x41fffd[_0x2ba9('0x3f')][_0x2ba9('0x45')] = function (_0x1191a7) {
                    this[_0x2ba9('0x46')] = _0x1191a7;
                };
                continue;
            case '2':
                var _0x22b277 = {
                    'emRGu': _0x1f20d3[_0x2ba9('0x47')],
                    'yeXYx': _0x1f20d3[_0x2ba9('0x48')],
                    'kfqzC': function (_0x56e39c, _0x1a2cd7) {
                        return _0x1f20d3[_0x2ba9('0x49')](_0x56e39c, _0x1a2cd7);
                    },
                    'hdpPm': function (_0x16aa9b, _0x64a2ef) {
                        return _0x1f20d3[_0x2ba9('0x4a')](_0x16aa9b, _0x64a2ef);
                    },
                    'BYfeh': _0x1f20d3[_0x2ba9('0x4b')],
                    'DkfPy': _0x1f20d3[_0x2ba9('0x4c')],
                    'NQeHG': _0x1f20d3[_0x2ba9('0x4d')],
                    'cdTwA': function (_0xf81143, _0x36f7a5) {
                        return _0x1f20d3[_0x2ba9('0x4e')](_0xf81143, _0x36f7a5);
                    },
                    'QaPmH': _0x1f20d3[_0x2ba9('0x4f')],
                    'QpURO': _0x1f20d3[_0x2ba9('0x50')],
                    'FdFXW': _0x1f20d3[_0x2ba9('0x51')],
                    'hNTGS': _0x1f20d3[_0x2ba9('0x52')],
                    'JqaxC': _0x1f20d3[_0x2ba9('0x53')],
                    'rIcOB': _0x1f20d3[_0x2ba9('0x54')],
                    'fWRpZ': _0x1f20d3[_0x2ba9('0x55')],
                    'rqxPs': _0x1f20d3[_0x2ba9('0x56')],
                    'BBvyN': function (_0x5bdb1a, _0x30db2a) {
                        return _0x1f20d3[_0x2ba9('0x57')](_0x5bdb1a, _0x30db2a);
                    },
                    'wGlFg': function (_0x27807e, _0xad7450) {
                        return _0x1f20d3[_0x2ba9('0x58')](_0x27807e, _0xad7450);
                    },
                    'jDILx': function (_0x1cafe7, _0x45cd46) {
                        return _0x1f20d3[_0x2ba9('0x59')](_0x1cafe7, _0x45cd46);
                    },
                    'eNkze': _0x1f20d3[_0x2ba9('0x5a')],
                    'AOdqu': _0x1f20d3[_0x2ba9('0x5b')],
                    'uAtPN': _0x1f20d3[_0x2ba9('0x5c')],
                    'JuGrj': _0x1f20d3[_0x2ba9('0x5d')],
                    'bubNS': _0x1f20d3[_0x2ba9('0x5e')],
                    'DMddx': _0x1f20d3[_0x2ba9('0x5f')],
                    'EyvcL': _0x1f20d3[_0x2ba9('0x60')],
                    'XdWVE': _0x1f20d3[_0x2ba9('0x61')],
                    'uLDlx': _0x1f20d3[_0x2ba9('0x62')],
                    'gJwDr': _0x1f20d3[_0x2ba9('0x63')],
                    'pxhMA': _0x1f20d3[_0x2ba9('0x64')],
                    'utkgS': _0x1f20d3[_0x2ba9('0x65')],
                    'hJIlH': _0x1f20d3[_0x2ba9('0x66')],
                    'UrujI': _0x1f20d3[_0x2ba9('0x67')],
                    'NdrYE': function (_0x5a12cb, _0x3fb063) {
                        return _0x1f20d3[_0x2ba9('0x68')](_0x5a12cb, _0x3fb063);
                    },
                    'YylRt': function (_0x54964b, _0x5aec00) {
                        return _0x1f20d3[_0x2ba9('0x69')](_0x54964b, _0x5aec00);
                    },
                    'jLYYO': _0x1f20d3[_0x2ba9('0x6a')],
                    'gGoiN': _0x1f20d3[_0x2ba9('0x6b')],
                    'PPhRY': _0x1f20d3[_0x2ba9('0x6c')],
                    'kklKb': function (_0x5a46b1, _0x1f6739) {
                        return _0x1f20d3[_0x2ba9('0x6d')](_0x5a46b1, _0x1f6739);
                    },
                    'mICpL': _0x1f20d3[_0x2ba9('0x6e')],
                    'IZyDk': _0x1f20d3[_0x2ba9('0x6f')],
                    'qsiYM': _0x1f20d3[_0x2ba9('0x70')],
                    'fLDuM': function (_0x533f11, _0x4fe91c) {
                        return _0x1f20d3[_0x2ba9('0x69')](_0x533f11, _0x4fe91c);
                    },
                    'sjKQi': _0x1f20d3[_0x2ba9('0x71')],
                    'jlCRK': _0x1f20d3[_0x2ba9('0x72')],
                    'znXfS': _0x1f20d3[_0x2ba9('0x73')],
                    'Szvar': function (_0x46f67a, _0x29dec9) {
                        return _0x1f20d3[_0x2ba9('0x49')](_0x46f67a, _0x29dec9);
                    },
                    'Xfztr': _0x1f20d3[_0x2ba9('0x74')],
                    'vklNr': _0x1f20d3[_0x2ba9('0x75')],
                    'GYvQF': _0x1f20d3[_0x2ba9('0x76')],
                    'eiiqF': _0x1f20d3[_0x2ba9('0x77')],
                    'ovwlt': function (_0x52b282, _0x5217f6) {
                        return _0x1f20d3[_0x2ba9('0x78')](_0x52b282, _0x5217f6);
                    },
                    'URUGz': _0x1f20d3[_0x2ba9('0x79')],
                    'OJASF': _0x1f20d3[_0x2ba9('0x7a')],
                    'Mhlei': _0x1f20d3[_0x2ba9('0x7b')],
                    'IGBWm': _0x1f20d3[_0x2ba9('0x7c')],
                    'GksgT': _0x1f20d3[_0x2ba9('0x7d')],
                    'etrqc': function (_0x3fb552, _0x5f9394) {
                        return _0x1f20d3[_0x2ba9('0x7e')](_0x3fb552, _0x5f9394);
                    },
                    'oiFIc': _0x1f20d3[_0x2ba9('0x7f')],
                    'hADwj': _0x1f20d3[_0x2ba9('0x80')],
                    'WroQA': _0x1f20d3[_0x2ba9('0x81')],
                    'lLENY': _0x1f20d3[_0x2ba9('0x82')],
                    'XrogY': _0x1f20d3[_0x2ba9('0x83')],
                    'gpsVZ': _0x1f20d3[_0x2ba9('0x84')],
                    'OurIv': _0x1f20d3[_0x2ba9('0x85')],
                    'bIutk': _0x1f20d3[_0x2ba9('0x86')],
                    'hxflf': function (_0x244e6e, _0xdd8b35) {
                        return _0x1f20d3[_0x2ba9('0x87')](_0x244e6e, _0xdd8b35);
                    },
                    'mTJOn': _0x1f20d3[_0x2ba9('0x88')],
                    'UYmdZ': _0x1f20d3[_0x2ba9('0x89')],
                    'IXdcC': _0x1f20d3[_0x2ba9('0x8a')],
                    'qxwGM': _0x1f20d3[_0x2ba9('0x8b')],
                    'pvPMs': function (_0x5c72fa, _0x534102) {
                        return _0x1f20d3[_0x2ba9('0x7e')](_0x5c72fa, _0x534102);
                    },
                    'PVxSj': function (_0x3cd330, _0xc95f51) {
                        return _0x1f20d3[_0x2ba9('0x87')](_0x3cd330, _0xc95f51);
                    },
                    'OAxMg': _0x1f20d3[_0x2ba9('0x8c')],
                    'tlsPP': _0x1f20d3[_0x2ba9('0x8d')],
                    'SelRx': function (_0x4235da, _0x54b235) {
                        return _0x1f20d3[_0x2ba9('0x8e')](_0x4235da, _0x54b235);
                    },
                    'EbcZf': _0x1f20d3[_0x2ba9('0x8f')]
                };
                continue;
            case '3':
                _0x41fffd[_0x2ba9('0x3f')][_0x2ba9('0x90')] = function (_0x52f0c7) {
                    var _0x4f672e = _0x22b277[_0x2ba9('0x91')](_0x22b277[_0x2ba9('0x91')](Math[_0x2ba9('0x92')](_0x22b277[_0x2ba9('0x93')](Math[_0x2ba9('0x94')](), 0x270f))[_0x2ba9('0x95')](), new Date()[_0x2ba9('0x96')]()[_0x2ba9('0x95')]()[_0x2ba9('0x97')](0x4, 0xa)), Math[_0x2ba9('0x92')](_0x22b277[_0x2ba9('0x93')](Math[_0x2ba9('0x94')](), 0x270f))[_0x2ba9('0x95')]())[_0x2ba9('0x95')]()[_0x2ba9('0x97')](0x3, 0xa);
                    return _0x22b277[_0x2ba9('0x91')](_0x22b277[_0x2ba9('0x98')](_0x4f672e[_0x2ba9('0x97')](0x0, _0x22b277[_0x2ba9('0x99')](this[_0x2ba9('0x9a')], 0x1)), _0x52f0c7), _0x4f672e[_0x2ba9('0x97')](this[_0x2ba9('0x9a')], _0x4f672e[_0x2ba9('0x9b')]));
                };
                continue;
            case '4':
                _0x41fffd[_0x2ba9('0x3f')][_0x2ba9('0x9c')] = function (_0x55734d) {
                    var _0x3a0a3f = this[_0x2ba9('0x41')][_0x2ba9('0x42')](_0x22b277[_0x2ba9('0x9d')]);
                    _0x3a0a3f[_0x2ba9('0x9e')](_0x22b277[_0x2ba9('0x9f')]);
                    _0x3a0a3f[_0x2ba9('0x42')](_0x22b277[_0x2ba9('0xa0')])[_0x2ba9('0xa1')](_0x55734d);
                    _0x3a0a3f[_0x2ba9('0xa2')]();
                };
                continue;
            case '5':
                _0x41fffd[_0x2ba9('0x3f')][_0x2ba9('0xa3')] = function (_0x5f24f3) {
                    var _0x2c9701 = _0x5f24f3[_0x2ba9('0x9b')],
                        _0x42ac56,
                        _0x51dc88;
                    while (_0x2c9701) {
                        _0x42ac56 = Math[_0x2ba9('0xa4')](_0x22b277[_0x2ba9('0x93')](Math[_0x2ba9('0x94')](), _0x2c9701--));
                        _0x51dc88 = _0x5f24f3[_0x42ac56];
                        _0x5f24f3[_0x42ac56] = _0x5f24f3[_0x2c9701];
                        _0x5f24f3[_0x2c9701] = _0x51dc88;
                    }
                    return _0x5f24f3;
                };
                continue;
            case '6':
                _0x41fffd[_0x2ba9('0x3f')][_0x2ba9('0xa5')] = function () {
                    var _0x3ed28f = _0x22b277[_0x2ba9('0xa6')][_0x2ba9('0x3e')]('|'),
                        _0x1ba9da = 0x0;
                    while (!![]) {
                        switch (_0x3ed28f[_0x1ba9da++]) {
                            case '0':
                                var _0x5d285f = this[_0x2ba9('0x41')][_0x2ba9('0x42')](_0x22b277[_0x2ba9('0x9d')]);
                                continue;
                            case '1':
                                _0x5d285f[_0x2ba9('0x42')](_0x22b277[_0x2ba9('0xa0')])[_0x2ba9('0xa1')](_0x22b277[_0x2ba9('0xa7')]);
                                continue;
                            case '2':
                                _0x5d285f[_0x2ba9('0x9e')](_0x22b277[_0x2ba9('0x9f')]);
                                continue;
                            case '3':
                                _0x5d285f[_0x2ba9('0xa2')]();
                                continue;
                            case '4':
                                _0x5d285f[_0x2ba9('0x42')]('i')[_0x2ba9('0xa8')](_0x22b277[_0x2ba9('0xa9')])[_0x2ba9('0x9e')](_0x22b277[_0x2ba9('0xaa')]);
                                continue;
                        }
                        break;
                    }
                };
                continue;
            case '7':
                _0x41fffd[_0x2ba9('0x3f')][_0x2ba9('0xab')] = function () {
                    var _0x3a2899 = this[_0x2ba9('0x41')][_0x2ba9('0x42')](_0x22b277[_0x2ba9('0x9d')]);
                    _0x3a2899[_0x2ba9('0xa8')](_0x22b277[_0x2ba9('0x9f')]);
                    _0x3a2899[_0x2ba9('0x42')](_0x22b277[_0x2ba9('0xa0')])[_0x2ba9('0xa1')](_0x22b277[_0x2ba9('0xac')]);
                    _0x3a2899[_0x2ba9('0xa2')]();
                };
                continue;
            case '8':
                _0x41fffd[_0x2ba9('0x3f')][_0x2ba9('0xad')] = function (_0x435e91) {
                    this[_0x2ba9('0xae')] = _0x435e91;
                };
                continue;
            case '9':
                var _0x41fffd = function (_0x341a3d, _0x533a9e, _0x816e5e) {
                    var _0x3c89ac = _0x22b277[_0x2ba9('0xaf')][_0x2ba9('0x3e')]('|'),
                        _0x3f0846 = 0x0;
                    while (!![]) {
                        switch (_0x3c89ac[_0x3f0846++]) {
                            case '0':
                                _0x5ee96a[_0x2ba9('0xb0')](_0x22b277[_0x2ba9('0xb1')]);
                                continue;
                            case '1':
                                this[_0x2ba9('0xb2')] = _0x22b277[_0x2ba9('0xb3')](Number, _0x22b277[_0x2ba9('0xb4')](Math[_0x2ba9('0x94')]()[_0x2ba9('0x95')]()[_0x2ba9('0x97')](0x3, 0x4), Date[_0x2ba9('0xb5')]()))[_0x2ba9('0x95')](0x24);
                                continue;
                            case '2':
                                this[_0x2ba9('0xb6')] = _0x341a3d;
                                continue;
                            case '3':
                                _0x5ee96a[_0x2ba9('0xb0')](_0x22b277[_0x2ba9('0xb7')]);
                                continue;
                            case '4':
                                _0x5ee96a[_0x2ba9('0xb0')](_0x22b277[_0x2ba9('0xb8')]);
                                continue;
                            case '5':
                                _0x5ee96a[_0x2ba9('0xb0')](_0x22b277[_0x2ba9('0xb9')]);
                                continue;
                            case '6':
                                this[_0x2ba9('0x9a')] = _0x22b277[_0x2ba9('0xb4')](Math[_0x2ba9('0xa4')](_0x22b277[_0x2ba9('0x93')](Math[_0x2ba9('0x94')](), 0x5)), 0x5);
                                continue;
                            case '7':
                                this[_0x2ba9('0xba')] = _0x533a9e;
                                continue;
                            case '8':
                                _0x5ee96a[_0x2ba9('0xb0')](_0x22b277[_0x2ba9('0xbb')]);
                                continue;
                            case '9':
                                _0x5ee96a[_0x2ba9('0xb0')](_0x22b277[_0x2ba9('0xbc')]);
                                continue;
                            case '10':
                                _0x5ee96a[_0x2ba9('0xb0')](_0x22b277[_0x2ba9('0xbd')]);
                                continue;
                            case '11':
                                this[_0x2ba9('0xbe')] = [];
                                continue;
                            case '12':
                                this[_0x2ba9('0x41')] = _0x22b277[_0x2ba9('0xb3')](_0x974ca9, _0x5ee96a[_0x2ba9('0xbf')](''));
                                continue;
                            case '13':
                                this[_0x2ba9('0xc0')] = _0x816e5e;
                                continue;
                            case '14':
                                _0x5ee96a[_0x2ba9('0xb0')](_0x22b277[_0x2ba9('0xc1')]);
                                continue;
                            case '15':
                                var _0x5ee96a = [];
                                continue;
                            case '16':
                                _0x5ee96a[_0x2ba9('0xb0')](_0x22b277[_0x2ba9('0xc2')]);
                                continue;
                            case '17':
                                _0x22b277[_0x2ba9('0xb3')](_0x974ca9, _0x22b277[_0x2ba9('0xc3')])[_0x2ba9('0x42')](_0x22b277[_0x2ba9('0xc4')])[_0x2ba9('0xc5')]();
                                continue;
                            case '18':
                                _0x5ee96a[_0x2ba9('0xb0')](_0x22b277[_0x2ba9('0xc6')]);
                                continue;
                        }
                        break;
                    }
                };
                continue;
            case '10':
                _0x41fffd[_0x2ba9('0x3f')][_0x2ba9('0xc7')] = function () {
                    _0x22b277[_0x2ba9('0xb3')](_0x974ca9, _0x22b277[_0x2ba9('0xc3')])[_0x2ba9('0x42')](_0x22b277[_0x2ba9('0xc4')])[_0x2ba9('0xc5')]();
                    this[_0x2ba9('0xae')] = 0x0;
                };
                continue;
            case '11':
                _0x41fffd[_0x2ba9('0x3f')][_0x2ba9('0xc8')] = function () {
                    var _0x3d749d = _0x22b277[_0x2ba9('0xc9')][_0x2ba9('0x3e')]('|'),
                        _0x4f5399 = 0x0;
                    while (!![]) {
                        switch (_0x3d749d[_0x4f5399++]) {
                            case '0':
                                this[_0x2ba9('0xca')]();
                                continue;
                            case '1':
                                this[_0x2ba9('0xcb')]();
                                continue;
                            case '2':
                                var _0x3cc5a0 = {
                                    'xOdJD': function (_0xea7649, _0x55a64b) {
                                        return _0x22b277[_0x2ba9('0xcc')](_0xea7649, _0x55a64b);
                                    },
                                    'zBviB': _0x22b277[_0x2ba9('0xcd')],
                                    'ltzWZ': _0x22b277[_0x2ba9('0xce')],
                                    'ZqDXU': _0x22b277[_0x2ba9('0xcf')],
                                    'asnMd': _0x22b277[_0x2ba9('0xd0')],
                                    'UmjPG': function (_0x4519b1, _0x4cd8a7) {
                                        return _0x22b277[_0x2ba9('0xcc')](_0x4519b1, _0x4cd8a7);
                                    },
                                    'YvkfW': function (_0x47a7b4, _0x583341) {
                                        return _0x22b277[_0x2ba9('0xd1')](_0x47a7b4, _0x583341);
                                    },
                                    'GjnxT': _0x22b277[_0x2ba9('0xd2')]
                                };
                                continue;
                            case '3':
                                _0x974ca9[_0x2ba9('0xd3')]({
                                    'url': _0x22b277[_0x2ba9('0xd4')](_0x22b277[_0x2ba9('0xd5')], new Date()[_0x2ba9('0x96')]()),
                                    'type': _0x22b277[_0x2ba9('0xd6')],
                                    'data': {
                                        'clientid': _0x54639d[_0x2ba9('0xb2')],
                                        'username': _0x54639d[_0x2ba9('0xba')]
                                    },
                                    'dataType': _0x22b277[_0x2ba9('0xd7')],
                                    'error': function (_0x4c52de) {
                                        _0x3cc5a0[_0x2ba9('0xd8')](alert, _0x3cc5a0[_0x2ba9('0xd9')]);
                                    },
                                    'success': function (_0x4d7419) {
                                        var _0x50f304 = _0x22b277[_0x2ba9('0xda')][_0x2ba9('0x3e')]('|'),
                                            _0x1cf6d6 = 0x0;
                                        while (!![]) {
                                            switch (_0x50f304[_0x1cf6d6++]) {
                                                case '0':
                                                    _0x54639d[_0x2ba9('0x41')][_0x2ba9('0x42')](_0x22b277[_0x2ba9('0xdb')])[_0x2ba9('0xdc')](_0x4cc8d1[_0x2ba9('0xbf')](''));
                                                    continue;
                                                case '1':
                                                    _0x4cc8d1[_0x2ba9('0xb0')](_0x22b277[_0x2ba9('0xbb')]);
                                                    continue;
                                                case '2':
                                                    var _0x5c5136 = _0x4093e7[_0x2ba9('0xdd')](_0x22b277[_0x2ba9('0xde')]);
                                                    continue;
                                                case '3':
                                                    _0x54639d[_0x2ba9('0x41')][_0x2ba9('0x42')](_0x22b277[_0x2ba9('0xdf')])[_0x2ba9('0x35')](function () {
                                                        var _0x3243f6 = _0x333e98[_0x2ba9('0xe0')][_0x2ba9('0x3e')]('|'),
                                                            _0xc910ba = 0x0;
                                                        while (!![]) {
                                                            switch (_0x3243f6[_0xc910ba++]) {
                                                                case '0':
                                                                    if (_0x333e98[_0x2ba9('0xe1')](_0x5bf942[_0x2ba9('0x9b')], _0x54639d[_0x2ba9('0x46')])) {
                                                                        var _0x2465df = [],
                                                                            _0x44edf3 = new Date()[_0x2ba9('0x96')]()[_0x2ba9('0x95')]();
                                                                        _0x974ca9[_0x2ba9('0xe2')](_0x5bf942, function (_0x4184e0, _0x429229) {
                                                                            var _0x1405d0 = _0x333e98[_0x2ba9('0xe3')](_0x974ca9, this)[_0x2ba9('0xe4')]('id');
                                                                            _0x2465df[_0x2ba9('0xb0')](_0x1405d0[_0x2ba9('0xe5')](_0x333e98[_0x2ba9('0xe6')], ''));
                                                                        });
                                                                        _0x54639d[_0x2ba9('0xab')]();
                                                                        _0x974ca9[_0x2ba9('0xd3')]({
                                                                            'url': _0x333e98[_0x2ba9('0xe7')](_0x333e98[_0x2ba9('0xe8')], _0x44edf3),
                                                                            'type': _0x333e98[_0x2ba9('0xe9')],
                                                                            'data': {
                                                                                'clientid': _0x54639d[_0x2ba9('0xb2')],
                                                                                'data': _0x333e98[_0x2ba9('0xea')](_0x333e98[_0x2ba9('0xeb')](_0x333e98[_0x2ba9('0xec')](_0x333e98[_0x2ba9('0xec')](_0x333e98[_0x2ba9('0xed')](_0x2465df[_0x2ba9('0xbf')](''), ''), _0x54639d[_0x2ba9('0x9a')]), ''), _0x44edf3[_0x2ba9('0x97')](-0x2)), _0x333e98[_0x2ba9('0xee')]),
                                                                                'username': _0x54639d[_0x2ba9('0xba')],
                                                                                'password': _0x54639d[_0x2ba9('0xc0')]
                                                                            },
                                                                            'dataType': _0x333e98[_0x2ba9('0xef')],
                                                                            'error': function (_0x42c979) {
                                                                                _0xbced42[_0x2ba9('0xf0')](alert, _0xbced42[_0x2ba9('0xf1')]);
                                                                            },
                                                                            'success': function (_0x3be6d5) {
                                                                                if (_0x333e98[_0x2ba9('0xe1')](_0x3be6d5[_0x2ba9('0xf2')], 0x0)) {
                                                                                    _0x54639d[_0x2ba9('0xad')](0x1);
                                                                                    _0x54639d[_0x2ba9('0xa5')]();
                                                                                    _0x10c65e[_0x2ba9('0xf3')](function () {
                                                                                        _0x54639d[_0x2ba9('0xc7')]();
                                                                                    }, 0x1f4);
                                                                                    _0x54639d[_0x2ba9('0xb6')][_0x2ba9('0xf4')]();
                                                                                } else {
                                                                                    _0x54639d[_0x2ba9('0xad')](0x0);
                                                                                    _0x54639d[_0x2ba9('0x9c')](_0x3be6d5[_0x2ba9('0xf5')]);
                                                                                    _0x10c65e[_0x2ba9('0xf3')](function () {
                                                                                        _0x54639d[_0x2ba9('0xc8')]();
                                                                                    }, 0x3e8);
                                                                                }
                                                                            }
                                                                        });
                                                                    }
                                                                    continue;
                                                                case '1':
                                                                    if (_0x14b520[_0x2ba9('0xf6')](_0x333e98[_0x2ba9('0xf7')]))
                                                                        _0x333e98[_0x2ba9('0xf8')](_0x974ca9, this)[_0x2ba9('0xa8')](_0x333e98[_0x2ba9('0xf7')]);
                                                                    else
                                                                        _0x333e98[_0x2ba9('0xf8')](_0x974ca9, this)[_0x2ba9('0x9e')](_0x333e98[_0x2ba9('0xf7')]);
                                                                    continue;
                                                                case '2':
                                                                    var _0xbced42 = {
                                                                        'ZSFJo': function (_0x373d10, _0xb508c9) {
                                                                            return _0x333e98[_0x2ba9('0xf9')](_0x373d10, _0xb508c9);
                                                                        },
                                                                        'ONwiT': _0x333e98[_0x2ba9('0xfa')]
                                                                    };
                                                                    continue;
                                                                case '3':
                                                                    var _0x14b520 = _0x333e98[_0x2ba9('0xfb')](_0x974ca9, this);
                                                                    continue;
                                                                case '4':
                                                                    var _0x5bf942 = _0x54639d[_0x2ba9('0x41')][_0x2ba9('0x42')](_0x333e98[_0x2ba9('0xfc')]);
                                                                    continue;
                                                            }
                                                            break;
                                                        }
                                                    });
                                                    continue;
                                                case '4':
                                                    var _0x333e98 = {
                                                        'wHwnV': function (_0x4fe8c6, _0x5133b8) {
                                                            return _0x22b277[_0x2ba9('0x98')](_0x4fe8c6, _0x5133b8);
                                                        },
                                                        'ESkAh': _0x22b277[_0x2ba9('0xfd')],
                                                        'ZRuFf': function (_0x484159, _0x42160f) {
                                                            return _0x22b277[_0x2ba9('0xfe')](_0x484159, _0x42160f);
                                                        },
                                                        'RFlvs': function (_0x356126, _0x248330) {
                                                            return _0x22b277[_0x2ba9('0xff')](_0x356126, _0x248330);
                                                        },
                                                        'xiHxp': _0x22b277[_0x2ba9('0x100')],
                                                        'mHtMj': _0x22b277[_0x2ba9('0x101')],
                                                        'rpTno': _0x22b277[_0x2ba9('0x102')],
                                                        'qnOXK': function (_0x5233cc, _0x47cad9) {
                                                            return _0x22b277[_0x2ba9('0xb3')](_0x5233cc, _0x47cad9);
                                                        },
                                                        'gfgUr': function (_0x5a0714, _0x52caf4) {
                                                            return _0x22b277[_0x2ba9('0x103')](_0x5a0714, _0x52caf4);
                                                        },
                                                        'lVkUN': _0x22b277[_0x2ba9('0x104')],
                                                        'kECnA': function (_0x5b148d, _0x15e1ce) {
                                                            return _0x22b277[_0x2ba9('0xff')](_0x5b148d, _0x15e1ce);
                                                        },
                                                        'nJZLq': _0x22b277[_0x2ba9('0x105')],
                                                        'ONbfc': _0x22b277[_0x2ba9('0xd6')],
                                                        'ZPcyU': function (_0x195c56, _0x740bf6) {
                                                            return _0x22b277[_0x2ba9('0xff')](_0x195c56, _0x740bf6);
                                                        },
                                                        'jgBDz': function (_0x3fb704, _0x1533e1) {
                                                            return _0x22b277[_0x2ba9('0xd1')](_0x3fb704, _0x1533e1);
                                                        },
                                                        'IXCtB': function (_0x2bbdd1, _0x31b4e8) {
                                                            return _0x22b277[_0x2ba9('0xd1')](_0x2bbdd1, _0x31b4e8);
                                                        },
                                                        'vjkEa': function (_0x586611, _0x1861e0) {
                                                            return _0x22b277[_0x2ba9('0xd1')](_0x586611, _0x1861e0);
                                                        },
                                                        'WCjXb': _0x22b277[_0x2ba9('0x106')],
                                                        'WxiMV': _0x22b277[_0x2ba9('0xd7')],
                                                        'EFcrc': _0x22b277[_0x2ba9('0x107')],
                                                        'YKhYm': function (_0x16ae11, _0x575078) {
                                                            return _0x22b277[_0x2ba9('0xb3')](_0x16ae11, _0x575078);
                                                        },
                                                        'eJPEK': function (_0xa21ebd, _0x122bf8) {
                                                            return _0x22b277[_0x2ba9('0xcc')](_0xa21ebd, _0x122bf8);
                                                        },
                                                        'xzpmZ': _0x22b277[_0x2ba9('0xcd')],
                                                        'hsqDq': function (_0x55a23a, _0x290fbe) {
                                                            return _0x22b277[_0x2ba9('0xcc')](_0x55a23a, _0x290fbe);
                                                        },
                                                        'ZKhyv': _0x22b277[_0x2ba9('0x108')]
                                                    };
                                                    continue;
                                                case '5':
                                                    _0x5283c1 = _0x54639d[_0x2ba9('0xa3')](_0x5283c1);
                                                    continue;
                                                case '6':
                                                    _0x4cc8d1[_0x2ba9('0xb0')](_0x22b277[_0x2ba9('0x109')]);
                                                    continue;
                                                case '7':
                                                    _0x4de33a[_0x2ba9('0x10a')] = _0x4d7419[_0x2ba9('0x10b')];
                                                    continue;
                                                case '8':
                                                    _0x4cc8d1[_0x2ba9('0xb0')](_0x22b277[_0x2ba9('0x10c')]);
                                                    continue;
                                                case '9':
                                                    _0x54639d[_0x2ba9('0x40')]();
                                                    continue;
                                                case '10':
                                                    _0x974ca9[_0x2ba9('0xe2')](_0x4d7419[_0x2ba9('0x10d')], function (_0x4c0d9a, _0xff7923) {
                                                        _0x5283c1[_0x2ba9('0xb0')]({
                                                            'id': _0x54639d[_0x2ba9('0x90')](_0x4c0d9a[_0x2ba9('0x95')]()),
                                                            'txt': _0xff7923
                                                        });
                                                    });
                                                    continue;
                                                case '11':
                                                    _0x974ca9[_0x2ba9('0xe2')](_0x5283c1, function (_0xa3a45c, _0x10a57b) {
                                                        var _0x79225d = _0x3cc5a0[_0x2ba9('0x10e')][_0x2ba9('0x3e')]('|'),
                                                            _0x2831d1 = 0x0;
                                                        while (!![]) {
                                                            switch (_0x79225d[_0x2831d1++]) {
                                                                case '0':
                                                                    var _0x50b020 = 0x0;
                                                                    continue;
                                                                case '1':
                                                                    _0x4f9554[_0x2ba9('0x10f')] = _0x3cc5a0[_0x2ba9('0x110')];
                                                                    continue;
                                                                case '2':
                                                                    _0x4f9554[_0x2ba9('0x111')] = _0x3cc5a0[_0x2ba9('0x112')];
                                                                    continue;
                                                                case '3':
                                                                    switch (_0x3cc5a0[_0x2ba9('0x113')](parseInt, _0x10a57b[_0x2ba9('0x114')][_0x2ba9('0x9b')])) {
                                                                        case 0x1:
                                                                            _0x50b020 = 0x12;
                                                                            break;
                                                                        case 0x2:
                                                                            _0x50b020 = 0x9;
                                                                            break;
                                                                    }
                                                                    continue;
                                                                case '4':
                                                                    _0x4f9554[_0x2ba9('0x115')](_0x10a57b[_0x2ba9('0x114')], _0x50b020, 0xd);
                                                                    continue;
                                                                case '5':
                                                                    var _0x4f9554 = _0x4093e7[_0x2ba9('0xdd')](_0x3cc5a0[_0x2ba9('0x116')](_0x3cc5a0[_0x2ba9('0x117')], _0xa3a45c))[_0x2ba9('0x118')]('2d');
                                                                    continue;
                                                            }
                                                            break;
                                                        }
                                                    });
                                                    continue;
                                                case '12':
                                                    _0x974ca9[_0x2ba9('0xe2')](_0x5283c1, function (_0x4b8168, _0x27f645) {
                                                        _0x54639d[_0x2ba9('0xbe')][_0x333e98[_0x2ba9('0x119')](_0x333e98[_0x2ba9('0xe6')], _0x27f645['id'])] = 0x1;
                                                        _0x4cc8d1[_0x2ba9('0xb0')](_0x333e98[_0x2ba9('0x119')](_0x333e98[_0x2ba9('0x11a')](_0x333e98[_0x2ba9('0x11a')](_0x333e98[_0x2ba9('0x11b')](_0x333e98[_0x2ba9('0x11c')], _0x27f645['id']), _0x333e98[_0x2ba9('0x11d')]), _0x4b8168), _0x333e98[_0x2ba9('0x11e')]));
                                                    });
                                                    continue;
                                                case '13':
                                                    var _0x4de33a = new Image();
                                                    continue;
                                                case '14':
                                                    if (_0x22b277[_0x2ba9('0x11f')](_0x4d7419[_0x2ba9('0xf2')], 0x1)) {
                                                        _0x54639d[_0x2ba9('0x40')]();
                                                        _0x54639d[_0x2ba9('0x9c')](_0x4d7419[_0x2ba9('0xf5')]);
                                                        return;
                                                    }
                                                    continue;
                                                case '15':
                                                    _0x54639d[_0x2ba9('0xbe')] = [];
                                                    continue;
                                                case '16':
                                                    var _0x52ef24 = _0x5c5136[_0x2ba9('0x118')]('2d');
                                                    continue;
                                                case '17':
                                                    _0x54639d[_0x2ba9('0x41')][_0x2ba9('0x42')](_0x22b277[_0x2ba9('0xdf')])[_0x2ba9('0x120')](function () {
                                                        var _0x5cb71a = _0x333e98[_0x2ba9('0xe3')](_0x974ca9, this)[_0x2ba9('0xe4')]('id');
                                                        _0x54639d[_0x2ba9('0xbe')][_0x5cb71a]++;
                                                    });
                                                    continue;
                                                case '18':
                                                    var _0x4cc8d1 = [],
                                                        _0x28e8c4 = 0xf423f,
                                                        _0x1d965c = 0x186a0,
                                                        _0x5283c1 = [];
                                                    continue;
                                                case '19':
                                                    _0x4de33a[_0x2ba9('0x121')] = function () {
                                                        _0x52ef24[_0x2ba9('0x122')](_0x4de33a, 0x0, 0x0, 0x12c, 0xb4);
                                                    };
                                                    continue;
                                                case '20':
                                                    _0x54639d[_0x2ba9('0x45')](_0x4d7419[_0x2ba9('0x123')]);
                                                    continue;
                                            }
                                            break;
                                        }
                                    }
                                });
                                continue;
                            case '4':
                                var _0x54639d = this;
                                continue;
                            case '5':
                                this[_0x2ba9('0x41')][_0x2ba9('0x42')](_0x22b277[_0x2ba9('0x124')])[_0x2ba9('0x125')]();
                                continue;
                        }
                        break;
                    }
                };
                continue;
            case '12':
                _0x41fffd[_0x2ba9('0x3f')][_0x2ba9('0xcb')] = function () {
                    this[_0x2ba9('0x41')][_0x2ba9('0x42')](_0x22b277[_0x2ba9('0x43')])[_0x2ba9('0xa2')]();
                };
                continue;
            case '13':
                var _0x5a945f = function (_0x4292c7) { };
                continue;
            case '14':
                _0x5a945f[_0x2ba9('0x3f')][_0x2ba9('0x126')] = function () {
                    var _0x197931 = _0x22b277[_0x2ba9('0x127')][_0x2ba9('0x3e')]('|'),
                        _0x4c9aac = 0x0;
                    while (!![]) {
                        switch (_0x197931[_0x4c9aac++]) {
                            case '0':
                                CkType = _0x5413b9[_0x2ba9('0xe4')]('id');
                                continue;
                            case '1':
                                var _0xe4775f = _0x5413b9[_0x2ba9('0x42')](_0x22b277[_0x2ba9('0x128')])[_0x2ba9('0x129')]();
                                continue;
                            case '2':
                                var _0x5413b9 = _0x22b277[_0x2ba9('0x12a')](_0x974ca9, _0x22b277[_0x2ba9('0x12b')]);
                                continue;
                            case '3':
                                yzmObj2 = _0x974ca9['fn'][_0x2ba9('0x12c')](_0x5413b9, _0x22b277[_0x2ba9('0x12d')](_0x22b277[_0x2ba9('0x12e')](_0x974ca9, _0x22b277[_0x2ba9('0x12f')])[_0x2ba9('0xa1')](), _0xe4775f), _0x109550);
                                continue;
                            case '4':
                                yzmObj2[_0x2ba9('0xc8')]();
                                continue;
                            case '5':
                                var _0x109550 = _0x5413b9[_0x2ba9('0x42')](_0x22b277[_0x2ba9('0x130')])[_0x2ba9('0x129')]();
                                continue;
                            case '6':
                                if (_0x22b277[_0x2ba9('0x131')](yzmObj2, null) && _0x22b277[_0x2ba9('0x11f')](CkType, _0x22b277[_0x2ba9('0x132')])) {
                                    if (_0x22b277[_0x2ba9('0x11f')](yzmObj2[_0x2ba9('0x133')](), 0x1))
                                        return !![];
                                }
                                continue;
                        }
                        break;
                    }
                };
                continue;
            case '15':
                _0x41fffd[_0x2ba9('0x3f')][_0x2ba9('0xca')] = function () {
                    this[_0x2ba9('0x41')][_0x2ba9('0x42')](_0x22b277[_0x2ba9('0x9d')])[_0x2ba9('0x44')]();
                };
                continue;
            case '16':
                _0x41fffd[_0x2ba9('0x3f')][_0x2ba9('0x133')] = function (_0x37d3f3) {
                    return this[_0x2ba9('0xae')];
                };
                continue;
            case '17':
                _0x974ca9['fn'][_0x2ba9('0x12c')] = function (_0x19d72f, _0x449ac5, _0x3e316c) {
                    var _0x5eb5d7 = _0x22b277[_0x2ba9('0x134')][_0x2ba9('0x3e')]('|'),
                        _0xa293b = 0x0;
                    while (!![]) {
                        switch (_0x5eb5d7[_0xa293b++]) {
                            case '0':
                                _0x22b277[_0x2ba9('0xcc')](_0x974ca9, _0x22b277[_0x2ba9('0xc3')])[_0x2ba9('0x135')](_0x545037[_0x2ba9('0x41')]);
                                continue;
                            case '1':
                                _0x22b277[_0x2ba9('0xcc')](_0x974ca9, _0x22b277[_0x2ba9('0x136')])[_0x2ba9('0x137')](_0x22b277[_0x2ba9('0x138')], function () {
                                    CkType = _0x3ee93[_0x2ba9('0x139')];
                                    yzmObj2 = null;
                                    _0x545037[_0x2ba9('0xc7')]();
                                });
                                continue;
                            case '2':
                                _0x22b277[_0x2ba9('0x12a')](_0x974ca9, _0x22b277[_0x2ba9('0x13a')])[_0x2ba9('0x137')](_0x22b277[_0x2ba9('0x138')], function () {
                                    var _0x477f36 = _0x22b277[_0x2ba9('0x13b')][_0x2ba9('0x3e')]('|'),
                                        _0x22f910 = 0x0;
                                    while (!![]) {
                                        switch (_0x477f36[_0x22f910++]) {
                                            case '0':
                                                _0x22b277[_0x2ba9('0xcc')](_0x974ca9, this)[_0x2ba9('0x9e')](_0x22b277[_0x2ba9('0x13c')]);
                                                continue;
                                            case '1':
                                                var _0x23e213 = {
                                                    'KTXOX': function (_0x1818c0, _0x2ace0b) {
                                                        return _0x22b277[_0x2ba9('0xcc')](_0x1818c0, _0x2ace0b);
                                                    },
                                                    'plXBk': _0x22b277[_0x2ba9('0x13a')],
                                                    'vgQaz': _0x22b277[_0x2ba9('0x13c')]
                                                };
                                                continue;
                                            case '2':
                                                _0x10c65e[_0x2ba9('0xf3')](function () {
                                                    _0x23e213[_0x2ba9('0x13d')](_0x974ca9, _0x23e213[_0x2ba9('0x13e')])[_0x2ba9('0xa8')](_0x23e213[_0x2ba9('0x13f')]);
                                                }, 0x7d0);
                                                continue;
                                            case '3':
                                                _0x545037[_0x2ba9('0xc8')]();
                                                continue;
                                            case '4':
                                                if (_0x22b277[_0x2ba9('0xcc')](_0x974ca9, this)[_0x2ba9('0xf6')](_0x22b277[_0x2ba9('0x13c')]))
                                                    return ![];
                                                continue;
                                        }
                                        break;
                                    }
                                });
                                continue;
                            case '3':
                                return _0x545037;
                            case '4':
                                var _0x545037 = new _0x41fffd(_0x19d72f, _0x449ac5, _0x3e316c);
                                continue;
                            case '5':
                                var _0x3ee93 = {
                                    'Gxwtv': _0x22b277[_0x2ba9('0x140')]
                                };
                                continue;
                        }
                        break;
                    }
                };
                continue;
            case '18':
                _0x974ca9['fn'][_0x2ba9('0x141')] = function () {
                    var _0x5cfffc = new _0x5a945f();
                    return _0x5cfffc;
                };
                continue;
        }
        break;
    }
}
    (jQuery, window, document));
var CkType = _0x2ba9('0x36');
var yzmObj2 = null;
var yzmObj = null;
$(document)[_0x2ba9('0x142')](function (_0xfe8723) {
    var _0x3fe98e = {
        'GZPfv': _0x2ba9('0x143'),
        'eiGMS': function (_0x52e985, _0x29ccb2) {
            return _0x52e985(_0x29ccb2);
        },
        'neySh': _0x2ba9('0x38'),
        'IRIPz': _0x2ba9('0x3b'),
        'dzvyT': function (_0x221a0e, _0x5e2eab) {
            return _0x221a0e != _0x5e2eab;
        },
        'qrTmX': function (_0x5b0d92, _0x43dc59) {
            return _0x5b0d92 == _0x43dc59;
        },
        'qeEwA': function (_0x27f316, _0x44bdab) {
            return _0x27f316(_0x44bdab);
        },
        'JdlPH': function (_0x1b047d, _0x47ff2c) {
            return _0x1b047d == _0x47ff2c;
        },
        'IaPRD': function (_0x2888ca, _0x59505) {
            return _0x2888ca(_0x59505);
        },
        'rOpxB': _0x2ba9('0x144'),
        'CpneY': function (_0x2c8a76, _0x53c513) {
            return _0x2c8a76 == _0x53c513;
        },
        'YhDDL': _0x2ba9('0x145'),
        'PCOSn': _0x2ba9('0x146'),
        'rxSBM': function (_0x3e42be, _0x399835) {
            return _0x3e42be > _0x399835;
        },
        'pKucA': function (_0x491d47, _0x3cbc54) {
            return _0x491d47 < _0x3cbc54;
        },
        'PAfjQ': _0x2ba9('0x147'),
        'IaPsP': function (_0x57e01b, _0x429b7f) {
            return _0x57e01b + _0x429b7f;
        },
        'gVlRe': function (_0x356c8a, _0x47b654) {
            return _0x356c8a(_0x47b654);
        },
        'rWwji': _0x2ba9('0x3a'),
        'IuLrm': _0x2ba9('0x148'),
        'QzFbu': _0x2ba9('0x149'),
        'NmhQU': _0x2ba9('0xf4')
    };
    yzmObj = new $['fn'][(_0x2ba9('0x141'))]();
    if (_0x3fe98e[_0x2ba9('0x14a')](_0x3fe98e[_0x2ba9('0x14b')]($, _0x3fe98e[_0x2ba9('0x14c')])[_0x2ba9('0x9b')], 0x0)) {
        _0x3fe98e[_0x2ba9('0x14b')]($, _0x3fe98e[_0x2ba9('0x14d')])[_0x2ba9('0x14e')](_0x3fe98e[_0x2ba9('0x14f')])[_0x2ba9('0x137')](_0x3fe98e[_0x2ba9('0x14f')], function () {
            var _0x27fd60 = _0x3fe98e[_0x2ba9('0x150')][_0x2ba9('0x3e')]('|'),
                _0x46c0ac = 0x0;
            while (!![]) {
                switch (_0x27fd60[_0x46c0ac++]) {
                    case '0':
                        yzmObj2[_0x2ba9('0xc8')]();
                        continue;
                    case '1':
                        var _0xe696fb = _0x3fe98e[_0x2ba9('0x151')]($, this);
                        continue;
                    case '2':
                        var _0x94e1d7 = _0xe696fb[_0x2ba9('0x42')](_0x3fe98e[_0x2ba9('0x152')])[_0x2ba9('0x129')]();
                        continue;
                    case '3':
                        CkType = _0xe696fb[_0x2ba9('0xe4')]('id');
                        continue;
                    case '4':
                        var _0x104aba = _0xe696fb[_0x2ba9('0x42')](_0x3fe98e[_0x2ba9('0x153')])[_0x2ba9('0x129')]();
                        continue;
                    case '5':
                        if (_0x3fe98e[_0x2ba9('0x154')](yzmObj2, null) && _0x3fe98e[_0x2ba9('0x155')](_0x3fe98e[_0x2ba9('0x156')]($, this)[_0x2ba9('0xe4')]('id'), CkType)) {
                            if (_0x3fe98e[_0x2ba9('0x157')](yzmObj2[_0x2ba9('0x133')](), 0x1))
                                return !![];
                        }
                        continue;
                    case '6':
                        return ![];
                    case '7':
                        if (_0x3fe98e[_0x2ba9('0x157')](_0x94e1d7, '') || _0x3fe98e[_0x2ba9('0x157')](_0x94e1d7, '帐号')) {
                            _0x3fe98e[_0x2ba9('0x158')](alert, _0x3fe98e[_0x2ba9('0x159')]);
                            return ![];
                        } else if (_0x3fe98e[_0x2ba9('0x157')](_0x104aba, '') || _0x3fe98e[_0x2ba9('0x14a')](_0x104aba, _0x3fe98e[_0x2ba9('0x15a')])) {
                            _0x3fe98e[_0x2ba9('0x158')](alert, _0x3fe98e[_0x2ba9('0x15b')]);
                            return ![];
                        } else if (_0x3fe98e[_0x2ba9('0x15c')](_0x104aba[_0x2ba9('0x9b')], 0x0) && _0x3fe98e[_0x2ba9('0x15d')](_0x104aba[_0x2ba9('0x9b')], 0x6)) {
                            _0x3fe98e[_0x2ba9('0x158')](alert, _0x3fe98e[_0x2ba9('0x15e')]);
                            return ![];
                        }
                        continue;
                    case '8':
                        yzmObj2 = $['fn'][_0x2ba9('0x12c')](_0xe696fb, _0x3fe98e[_0x2ba9('0x15f')](_0x3fe98e[_0x2ba9('0x14b')]($, _0x3fe98e[_0x2ba9('0x160')])[_0x2ba9('0xa1')](), _0x94e1d7), _0x104aba);
                        continue;
                }
                break;
            }
        });
    }
});
```



##### 整体代码结构

```js
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const t = require("@babel/types");
const generator = require("@babel/generator").default;
const fs = require('fs');

const jscode = fs.readFileSync("./demo.js", {
    encoding: "utf-8"
});
let ast = parser.parse(jscode);

//ast处理


let code = generator(ast).code;
fs.writeFile('./demoNew.js', code, (err) => { });
```



##### 字符串解密与去除数组混淆

处理定义一个加密字符串的大数组以及该数组的还原顺序函数, 后面需要用到直接引用这个大数组的某个值, 这个加密字符串往往会有个函数来加密

```js
//大数组
var _0x5a19 = ['IiBjbGFzcz0iYnV0dG9uIHdoaXRlIj48Y2FudmFzIHdpZHRoPSI1MHB4IiBoZWlnaHQ9IjQwcHgiIHN0eWxlPSJ3aWR0aDo1MHB4O2hlaWdodDo0MHB4IiBpZD0iYnRuY2Fudl8=', 'Ij48L2NhbnZhcz48L2Rpdj48L2Rpdj4=', 'MnwzfDF8NHww', 'L3l6bXRlc3QvY2hlY2sucGhwP3Q9', 'cG9zdA==', 'MTEyNQ==', 'anNvbg==', 'Ymx1ZQ==', '572R57uc6ZSZ6K+v77yM6K+35Yi35paw6aqM6K+B56CB', 'ZGl2LmJsdWU=', 'PGNhbnZhcyBpZD0ieXptX2ltZyIgc3R5bGU9IndpZHRoOjMwMHB4O2hlaWdodDoxODBweCIgd2lkdGg9IjMwMHB4IiBoZWlnaHQ9IjE4MHB4Ij48L2NhbnZhcz4=', 'PGRpdiBjbGFzcz0ieXptX2J1dHRvbiI+', 'Mnw0fDV8MHwxfDM=', 'NXwyfDF8MHwzfDQ=', 'IzAwMA==', 'MTVweCBib2xk', 'YnRuY2Fudl8=', 'L3l6bXRlc3QvZ2V0LnBocD90PQ==', 'Lnl6bWJvZHk=', 'MXw0fDB8M3wy', 'bG9hZGluZw==', 'I3l6bV9yZWZyZXNo', 'NXw0fDB8MnwxfDM=', 'I3l6bV9jbG9zZQ==', 'Y2xpY2s=', 'TG9naW5Gb3Jt', 'MnwxfDV8NnwwfDN8NA==', 'aW5wdXRbbmFtZT0ndXNlcm5hbWUnXQ==', 'I3VzZXJSZWdGb3Jt', 'I2xlYm95em0=', 'aW5wdXRbbmFtZT0ncGFzc3dkJ10=', 'dXNlclJlZ0Zvcm0=', 'b3NjcW'];

//数组顺序还原函数
(function (_0x5cb8ac, _0x23b38e) {
    var _0x524cab = function (_0x18d3aa) {
        while (--_0x18d3aa) {
            _0x5cb8ac['push'](_0x5cb8ac['shift']());
        }
    };
    
}(_0x5a19, 0x144));


//解密函数: 解密大数组中的值
var _0x2ba9 = function (_0x101b8f, _0xcd7c6f) {
    _0x101b8f = _0x101b8f - 0x0;
    var _0x27941a = _0x5a19[_0x101b8f];
    if (_0x2ba9['LmvHXr'] === undefined) {
        (function () {
            var _0x56f6ba;
            try {
                var _0x18f9d6 = Function('return\x20(function()\x20' + '{}.constructor(\x22return\x20this\x22)(\x20)' + ');');
                _0x56f6ba = _0x18f9d6();
            } catch (_0x5e5baa) {
                _0x56f6ba = window;
            }
            var _0x12918c = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
        _0x27941a = _0x2ba9['dzoqWA'](_0x27941a);
        _0x2ba9['nKWcry'][_0x101b8f] = _0x27941a;
    } else {
        _0x27941a = _0x578a10;
    }
    return _0x27941a;
};


var _0x1f20d3 = {
        'oscqj': _0x2ba9('0x0'),	//待还原
        'fkUhC': _0x2ba9('0x1'), //待还原
        'lyKzh': _0x2ba9('0x2') //待还原
}
```



处理步骤:

1. 先要把加密函数加载到nodejs环境, 方便后续使用来解密

```js
//得到解密函数所在的节点
let stringDecryptFuncAst = ast.program.body[2];
//得到解密函数的名字
let decryptFuncName = stringDecryptFuncAst.declarations[0].id.name;
//新建一个AST, 把原始代码中的大数组、还原数组顺序的函数和字符串解密函数, 加入到body节点中
let newAst = parser.parse('');
newAst.program.body.push(ast.program.body[0]);  //大数组
newAst.program.body.push(ast.program.body[1]);  //还原数组函数
newAst.program.body.push(stringDecryptFuncAst);  //解密函数
//把上述三部分代码转换为字符串, 由于存在格式化检测, 需要指定选项来压缩代码
let stringDecryptFunc = generator(newAst, { compact: true }).code;
//用来让nodejs执行加入到nodejs内, 这样后面就可以使用该函数
eval(stringDecryptFunc);
```

2. 遍历ast变量然后计算解密节点,比如该案例中解密函数是_0x2ba9,  去计算_0x2ba9('0x6'), 并用解密后的结果去替换

```js
traverse(ast, {
    //遍历找到解密函数定义
    VariableDeclarator(path) {
        var name = path.node.id.name;
        if (name === decryptFuncName) {
            //拿到解密函数被引用的位置
            let binding = path.scope.getBinding(name);
            binding && binding.referencePaths && binding.referencePaths.map(item => {
                //必须是解密函数调用如:_0x2ba9('0x6') 而不是_0x2ba9['OsLPar']
                if (t.isCallExpression(item.parentPath)) {
                    //解密后并用stringLiteral替换
                    item.parentPath.replaceWith(t.stringLiteral(eval(item.parentPath + '')));
                }
            });

        }
    }
});

//解密完后大数组、大数组顺序还原函数、解密函数就没用了
ast.program.body.shift();
ast.program.body.shift();
ast.program.body.shift();
```





##### 剔除花指令



###### 字符串花指令去除

处理那些包装了字符串的语句, 如: 

```js
_0x22b277["oiFIc"];	//需要处理的语句
var _0x22b277 = {
  ...				//ObjectProperty
  'fkUhC': "17|15|4|10|5|16|14|0|8|9|3|18|12|1|2|7|13|6|11"('0x1'), //ObjectProperty
 	'oiFIc':  ["aOJeX"] //MemberExpression  ObjectProperty
  ...				//ObjectProperty
}

var _0x1f20d3 = {
  ...
  'aOJeX': "/yzmtest/get.php?t="('0x2e')	//需要最后还原的语句
  ...
}
```

这样就很明显需要递归, 所以大体流程是:

* 需要遍历所有的ObjectProperty 然后判断是否是MemberExpression
  * 是的话就查询需要递归继续找, 直到找到StringLiteral 才是找到头了
  * 不是的话就直接返回该节点

但是如何去查询最后还原的语句并把处理的语句替换呢?

可以先遍历全部的ObjectProperty并用一个数组去存储来查询, 比如要获取_0x22b277["oiFIc"]的定义节点就可以查询数组totalObj \\\["0x22b277"]['oiFIc'] 找到该定义节点后, 发现是MemberExpression, 那么就不是最终还原的语句, 还包了一层就再去定位totalObj\\['0x1f20d3']\['aOJeX'] 的节点, 最后去替换最终还原语句.

> 存储ObjectProperty

```js
//用来存放全部的ObjectProperty
let totalObj = {};
function generateObj(ast) {
    traverse(ast, {
        //需要标识符的名字所以从VariableDeclaration开始遍历
        VariableDeclarator(path) {
            if (t.isObjectExpression(path.node.init)) {
                //是ObjectExpression
                let name = path.node.id.name;   //对象名
                totalObj[name] = {};    //以对象名为属性名在totalObj创建对象
                path.node.init.properties.map(item => {
                    let key = item.key.value;  //属性名
                    let value = item.value; //属性值: Node节点
                    totalObj[name][key] = value;
                });
            }
        }
    });
    return ast;
};
ast = generateObj(ast);
```



> 还原ObjectProperty

```js
//递归获取最终还原的节点
function getFinalStringLiteralNode(node) {
    //是MemberExpression包装层
    if (t.isMemberExpression(node)) {
        let objName = node.object.name; //对象名
        let name = node.property.value; //属性名
        if (totalObj[objName] && totalObj[objName][name]) {
            return getFinalStringLiteralNode(totalObj[objName][name]);
        } else {
            //totalObj里面没有
            return false;
        }
    } else {
        //最终还原的节点
        return node;
    }
}

//字符串花指令剔除
traverse(ast, {
    VariableDeclarator(path) {
        if (t.isObjectExpression(path.node.init)) {
            let objName = path.node.id.name;  //对象名
            path.node.init.properties.map(item => {
                let key = item.key.value;  //属性名
                let value = item.value; //属性值node
                let finalNode = getFinalStringLiteralNode(value);  //遍历获取到最终还原的属性值node
                finalNode && (item.value = finalNode);
            });
        }
    }
});

//ObjectProperty有更新, 需要更新totalObj
ast = generateObj(ast);

```



> 还原引用

```js
//上述只处理了ObjectExpression节点的属性值, 还需要修改属性值的引用 如:_0x22b277["oiFIc"]
traverse(ast, {
    MemberExpression(path) {
        let objName = path.node.object.name;    //对象名
        let key = path.node.property.value;     //属性名
        totalObj[objName] && totalObj[objName][key]
            && t.isStringLiteral(totalObj[objName][key])    //是字符串
            && path.replaceWith(totalObj[objName][key]);
    }
});
```



###### 函数花指令去除

处理函数包装嵌套的场景如:

```js
var _0x1f20d3 = {
	'ovwlt': function (_0x52b282, _0x5217f6) {
      return _0x1f20d3["nNFva"](_0x52b282, _0x5217f6);
    }
}


//===============还原为=================

var _0x1f20d3 = {
  'ovwlt': function (_0x58664a, _0xfe92ce) {
            return _0x58664a == _0xfe92ce;
   }
}
```



> 还原ObjectProperty

```js
//递归获取最终还原函数的节点
function getFinalFunctionExpressionNode(node) {
    //必须是函数且只有一个return语句
    if (t.isFunctionExpression(node) && node.body.body.length == 1) {
        let expr = node.body.body[0].argument.callee;
        //如果包装了则递归调用
        if (t.isMemberExpression(expr)) {
            let objName = expr.object.name;
            let key = expr.property.value;
            if (totalObj[objName] && totalObj[objName][key]) {
                return getFinalFunctionExpressionNode(totalObj[objName][key]);
            } else {
                return false;
            }
        } else {
            return node;
        }
    } else {
        return node;
    }
}

//函数花指令剔除
traverse(ast, {
    VariableDeclarator(path) {
        if (t.isObjectExpression(path.node.init)) {
            let objName = path.node.id.name;  //对象名
            path.node.init.properties.map(item => {
                let key = item.key.value;  //属性名
                let value = item.value; //属性值node
                let finalNode = getFinalFunctionExpressionNode(value);  //遍历获取到最终还原的属性值node
                finalNode && (item.value = finalNode);
            });
        }
    }
});

//ObjectExpression更新了需要更新totalObj
ast = generateObj(ast);
```





> 还原引用

```js
this["$strlen"] = _0x22b277["hdpPm"](Math["floor"](_0x22b277["cdTwA"](Math["random"](), 0x5)), 0x5);


//===============还原为=================


this["$strlen"] = Math["floor"](Math["random"]() * 0x5) + 0x5;
```



```js
//去除函数花指令引用
traverse(ast, {
    CallExpression(path) {
        //callee 不为 MemberExpression 的节点，不做处理
        if (!t.isMemberExpression(path.node.callee))
            return;
        //取出对象名和属性名
        let objName = path.node.callee.object.name;
        let propertyName = path.node.callee.property.value;
        //如果在 totalObj 中有相应节点，就是需要进行替换的
        if (totalObj[objName] && totalObj[objName][propertyName]) {
            //totalObj 中存放的是函数节点
            let myFunc = totalObj[objName][propertyName];
            //在原代码中，函数体其实就一行 return 语句，取出其中的 argument 节点
            let returnExpr = myFunc.body.body[0].argument;
            //判断 argument 节点类型，并且用相应的实参来构建二项式或者调用表达式
            //然后替换当前遍历到的整个 CallExpression 节点即可
            if (t.isBinaryExpression(returnExpr)) {
                let binExpr = t.binaryExpression(returnExpr.operator,
                    path.node.arguments[0], path.node.arguments[1]);
                path.replaceWith(binExpr);
            } else if (t.isCallExpression(returnExpr)) {
                //把 arguments 数组中的下标为 1 和以后的成员，放入 newArray 中
                let newArray = path.node.arguments.slice(1);
                let callExpr = t.callExpression(path.node.arguments[0],
                    newArray);
                path.replaceWith(callExpr);
            }
        }
    }
});

// 花指令剔除后，就可以删除原始代码中的ObjectExpression.最好先判断是否有引用，如果没有引用，就删除
traverse(ast, {
    VariableDeclarator(path) {
        if (t.isObjectExpression(path.node.init)) {
            let binding = path.scope.getBinding;
            if (binding && binding.referencePaths == undefined) {
                path.remove();
            }
        };
    }
});
```



###### 流程平坦化

处理场景是分发器保存了 switch case 执行顺序, 还原为代码真实执行顺序

```js
var _0x167f85 = "2|9|3|10|12|0|15|7|6|4|1|8|16|5|11|17|13|14|18"["split"]('|'),	//分发器保存了switch case真实的执行顺序
    _0x57c351 = 0x0;
  while (!![]) {
    switch (_0x167f85[_0x57c351++]) {
      case '0':
        _0x41fffd["prototype"]["hideloading"] = function () {
          this["$div"]["find"](".yzm_loading")["hide"]();
        };
        continue;
      case '1':
        _0x41fffd["prototype"]["setLen"] = function (_0x1191a7) {
          this["$len"] = _0x1191a7;
        };
        continue;
      case '2':
        continue;
      case '3':
        _0x41fffd["prototype"]["getId"] = function (_0x52f0c7) {
          var _0x4f672e = (Math["round"](Math["random"]() * 0x270f)["toString"]() + new Date()["getTime"]()["toString"]()["substr"](0x4, 0xa) + Math["round"](Math["random"]() * 0x270f)["toString"]())["toString"]()["substr"](0x3, 0xa);
          return _0x4f672e["substr"](0x0, this["$strlen"] - 0x1) + _0x52f0c7 + _0x4f672e["substr"](this["$strlen"], _0x4f672e["length"]);
        };
        continue;
      case '4':
        _0x41fffd["prototype"]["error"] = function (_0x55734d) {
          var _0x3a0a3f = this["$div"]["find"](".yzm_loading2");
          _0x3a0a3f["addClass"]("red");
          _0x3a0a3f["find"]("div")["text"](_0x55734d);
          _0x3a0a3f["show"]();
        };
        continue;
      case '5':
        _0x41fffd["prototype"]["shuffle"] = function (_0x5f24f3) {
          var _0x2c9701 = _0x5f24f3["length"],
            _0x42ac56,
            _0x51dc88;
          while (_0x2c9701) {
            _0x42ac56 = Math["floor"](Math["random"]() * _0x2c9701--);
            _0x51dc88 = _0x5f24f3[_0x42ac56];
            _0x5f24f3[_0x42ac56] = _0x5f24f3[_0x2c9701];
            _0x5f24f3[_0x2c9701] = _0x51dc88;
          }
          return _0x5f24f3;
        };
        continue;
      case '6':
        _0x41fffd["prototype"]["succeed"] = function () {
          var _0x3ed28f = "0|2|4|1|3"["split"]('|'),
            _0x1ba9da = 0x0;
          while (!![]) {
            switch (_0x3ed28f[_0x1ba9da++]) {
              case '0':
                var _0x5d285f = this["$div"]["find"](".yzm_loading2");
                continue;
              case '1':
                _0x5d285f["find"]("div")["text"]("\u9A8C\u8BC1\u6210\u529F\uFF0C\u6B63\u5728\u8DF3\u8F6C");
                continue;
              case '2':
                _0x5d285f["addClass"]("red");
                continue;
              case '3':
                _0x5d285f["show"]();
                continue;
              case '4':
                _0x5d285f["find"]('i')["removeClass"]("icon-jubao")["addClass"]("icon-zhengque");
                continue;
            }
            break;
          }
        };
        continue;
      case '7':
        _0x41fffd["prototype"]["showloading2"] = function () {
          var _0x3a2899 = this["$div"]["find"](".yzm_loading2");
          _0x3a2899["removeClass"]("red");
          _0x3a2899["find"]("div")["text"]("\u9A8C\u8BC1\u4E2D,\u8BF7\u7A0D\u540E");
          _0x3a2899["show"]();
        };
        continue;
      case '8':
        _0x41fffd["prototype"]["setstatus"] = function (_0x435e91) {
          this["$status"] = _0x435e91;
        };
        continue;
      case '9':
        var _0x41fffd = function (_0x341a3d, _0x533a9e, _0x816e5e) {
          var _0x3c89ac = "17|15|4|10|5|16|14|0|8|9|3|18|12|1|2|7|13|6|11"["split"]('|'),
            _0x3f0846 = 0x0;
          while (!![]) {
            switch (_0x3c89ac[_0x3f0846++]) {
              case '0':
                _0x5ee96a["push"]("\t</div>");
                continue;
              case '1':
                this["$clientid"] = Number(Math["random"]()["toString"]()["substr"](0x3, 0x4) + Date["now"]())["toString"](0x24);
                continue;
              case '2':
                this["$formObj"] = _0x341a3d;
                continue;
              case '3':
                _0x5ee96a["push"]("\t<i id=\"yzm_close\" class=\"iconfont icon-cuowuguanbi-\" style=\"font-size:25px\"></i><i id=\"yzm_refresh\" class=\"iconfont icon-shuaxin\"></i>");
                continue;
              case '4':
                _0x5ee96a["push"]("<div id=\"yzm_box\" class=\"yzm_dialog\"><div class=\"yzm_box\">");
                continue;
              case '5':
                _0x5ee96a["push"]("\t<div class=\"yzm_loading\"><i class=\"iconfont icon-tupian\"></i><div>\u52A0\u8F7D\u4E2D</div></div>");
                continue;
              case '6':
                this["$strlen"] = Math["floor"](Math["random"]() * 0x5) + 0x5;
                continue;
              case '7':
                this["$username"] = _0x533a9e;
                continue;
              case '8':
                _0x5ee96a["push"]("</div>");
                continue;
              case '9':
                _0x5ee96a["push"]("<div class=\"yzm_bottom\">");
                continue;
              case '10':
                _0x5ee96a["push"]("<div class=\"yzm_body\">");
                continue;
              case '11':
                this["$hmdata"] = [];
                continue;
              case '12':
                this["$div"] = _0x974ca9(_0x5ee96a["join"](''));
                continue;
              case '13':
                this["$password"] = _0x816e5e;
                continue;
              case '14':
                _0x5ee96a["push"]("\t<div class=\"yzmbody\">");
                continue;
              case '15':
                var _0x5ee96a = [];
                continue;
              case '16':
                _0x5ee96a["push"]("\t<div class=\"yzm_loading2\"><i class=\"iconfont icon-jubao\"></i><div>\u9A8C\u8BC1\u4E2D,\u8BF7\u7A0D\u540E</div></div>");
                continue;
              case '17':
                _0x974ca9("body")["find"]("#yzm_box")["remove"]();
                continue;
              case '18':
                _0x5ee96a["push"]("</div></div></div>");
                continue;
            }
            break;
          }
        };
        continue;
      case '10':
        _0x41fffd["prototype"]["close"] = function () {
          _0x974ca9("body")["find"]("#yzm_box")["remove"]();
          this["$status"] = 0x0;
        };
        continue;
      case '11':
        _0x41fffd["prototype"]["load"] = function () {
          var _0x3d749d = "2|4|5|0|1|3"["split"]('|'),
            _0x4f5399 = 0x0;
          while (!![]) {
            switch (_0x3d749d[_0x4f5399++]) {
              case '0':
                this["hideloading2"]();
                continue;
              case '1':
                this["showloading"]();
                continue;
              case '2':
                continue;
              case '3':
                _0x974ca9["ajax"]({
                  'url': "/yzmtest/get.php?t=" + new Date()["getTime"](),
                  'type': "post",
                  'data': {
                    'clientid': _0x54639d["$clientid"],
                    'username': _0x54639d["$username"]
                  },
                  'dataType': "json",
                  'error': function (_0x4c52de) {
                    alert("\u7F51\u7EDC\u9519\u8BEF\uFF0C\u8BF7\u5237\u65B0\u9A8C\u8BC1\u7801");
                  },
                  'success': function (_0x4d7419) {
                    var _0x50f304 = "4|14|18|10|15|5|6|8|12|1|20|0|11|17|3|2|16|13|19|7|9"["split"]('|'),
                      _0x1cf6d6 = 0x0;
                    while (!![]) {
                      switch (_0x50f304[_0x1cf6d6++]) {
                        case '0':
                          _0x54639d["$div"]["find"]("div.yzmbody")["html"](_0x4cc8d1["join"](''));
                          continue;
                        case '1':
                          _0x4cc8d1["push"]("</div>");
                          continue;
                        case '2':
                          var _0x5c5136 = _0x4093e7["getElementById"]("yzm_img");
                          continue;
                        case '3':
                          _0x54639d["$div"]["find"]("div.button")["click"](function () {
                            var _0x3243f6 = "2|3|1|4|0"["split"]('|'),
                              _0xc910ba = 0x0;
                            while (!![]) {
                              switch (_0x3243f6[_0xc910ba++]) {
                                case '0':
                                  if (_0x5bf942["length"] == _0x54639d["$len"]) {
                                    var _0x2465df = [],
                                      _0x44edf3 = new Date()["getTime"]()["toString"]();
                                    _0x974ca9["each"](_0x5bf942, function (_0x4184e0, _0x429229) {
                                      var _0x1405d0 = _0x974ca9(this)["attr"]('id');
                                      _0x2465df["push"](_0x1405d0["replace"]("object_", ''));
                                    });
                                    _0x54639d["showloading2"]();
                                    _0x974ca9["ajax"]({
                                      'url': "/yzmtest/check.php?t=" + _0x44edf3,
                                      'type': "post",
                                      'data': {
                                        'clientid': _0x54639d["$clientid"],
                                        'data': _0x2465df["join"]('') + '' + _0x54639d["$strlen"] + '' + _0x44edf3["substr"](-0x2) + "1125",
                                        'username': _0x54639d["$username"],
                                        'password': _0x54639d["$password"]
                                      },
                                      'dataType': "json",
                                      'error': function (_0x42c979) {
                                        alert("\u7F51\u7EDC\u9519\u8BEF\uFF0C\u8BF7\u5237\u65B0\u9A8C\u8BC1\u7801");
                                      },
                                      'success': function (_0x3be6d5) {
                                        if (_0x3be6d5["code"] == 0x0) {
                                          _0x54639d["setstatus"](0x1);
                                          _0x54639d["succeed"]();
                                          _0x10c65e["setTimeout"](function () {
                                            _0x54639d["close"]();
                                          }, 0x1f4);
                                          _0x54639d["$formObj"]["submit"]();
                                        } else {
                                          _0x54639d["setstatus"](0x0);
                                          _0x54639d["error"](_0x3be6d5["msg"]);
                                          _0x10c65e["setTimeout"](function () {
                                            _0x54639d["load"]();
                                          }, 0x3e8);
                                        }
                                      }
                                    });
                                  }
                                  continue;
                                case '1':
                                  if (_0x14b520["hasClass"]("blue")) _0x974ca9(this)["removeClass"]("blue");else _0x974ca9(this)["addClass"]("blue");
                                  continue;
                                case '2':
                                  continue;
                                case '3':
                                  var _0x14b520 = _0x974ca9(this);
                                  continue;
                                case '4':
                                  var _0x5bf942 = _0x54639d["$div"]["find"]("div.blue");
                                  continue;
                              }
                              break;
                            }
                          });
                          continue;
                        case '4':
                          continue;
                        case '5':
                          _0x5283c1 = _0x54639d["shuffle"](_0x5283c1);
                          continue;
                        case '6':
                          _0x4cc8d1["push"]("<canvas id=\"yzm_img\" style=\"width:300px;height:180px\" width=\"300px\" height=\"180px\"></canvas>");
                          continue;
                        case '7':
                          _0x4de33a["src"] = _0x4d7419["data"];
                          continue;
                        case '8':
                          _0x4cc8d1["push"]("<div class=\"yzm_button\">");
                          continue;
                        case '9':
                          _0x54639d["hideloading"]();
                          continue;
                        case '10':
                          _0x974ca9["each"](_0x4d7419["input"], function (_0x4c0d9a, _0xff7923) {
                            _0x5283c1["push"]({
                              'id': _0x54639d["getId"](_0x4c0d9a["toString"]()),
                              'txt': _0xff7923
                            });
                          });
                          continue;
                        case '11':
                          _0x974ca9["each"](_0x5283c1, function (_0xa3a45c, _0x10a57b) {
                            var _0x79225d = "5|2|1|0|3|4"["split"]('|'),
                              _0x2831d1 = 0x0;
                            while (!![]) {
                              switch (_0x79225d[_0x2831d1++]) {
                                case '0':
                                  var _0x50b020 = 0x0;
                                  continue;
                                case '1':
                                  _0x4f9554["fillStyle"] = "#000";
                                  continue;
                                case '2':
                                  _0x4f9554["font"] = "15px bold";
                                  continue;
                                case '3':
                                  switch (parseInt(_0x10a57b["txt"]["length"])) {
                                    case 0x1:
                                      _0x50b020 = 0x12;
                                      break;
                                    case 0x2:
                                      _0x50b020 = 0x9;
                                      break;
                                  }
                                  continue;
                                case '4':
                                  _0x4f9554["fillText"](_0x10a57b["txt"], _0x50b020, 0xd);
                                  continue;
                                case '5':
                                  var _0x4f9554 = _0x4093e7["getElementById"]("btncanv_" + _0xa3a45c)["getContext"]('2d');
                                  continue;
                              }
                              break;
                            }
                          });
                          continue;
                        case '12':
                          _0x974ca9["each"](_0x5283c1, function (_0x4b8168, _0x27f645) {
                            _0x54639d["$hmdata"]["object_" + _0x27f645['id']] = 0x1;
                            _0x4cc8d1["push"]("<div><div id=\"object_" + _0x27f645['id'] + "\" class=\"button white\"><canvas width=\"50px\" height=\"40px\" style=\"width:50px;height:40px\" id=\"btncanv_" + _0x4b8168 + "\"></canvas></div></div>");
                          });
                          continue;
                        case '13':
                          var _0x4de33a = new Image();
                          continue;
                        case '14':
                          if (_0x4d7419["code"] == 0x1) {
                            _0x54639d["hideloading"]();
                            _0x54639d["error"](_0x4d7419["msg"]);
                            return;
                          }
                          continue;
                        case '15':
                          _0x54639d["$hmdata"] = [];
                          continue;
                        case '16':
                          var _0x52ef24 = _0x5c5136["getContext"]('2d');
                          continue;
                        case '17':
                          _0x54639d["$div"]["find"]("div.button")["mousemove"](function () {
                            var _0x5cb71a = _0x974ca9(this)["attr"]('id');
                            _0x54639d["$hmdata"][_0x5cb71a]++;
                          });
                          continue;
                        case '18':
                          var _0x4cc8d1 = [],
                            _0x28e8c4 = 0xf423f,
                            _0x1d965c = 0x186a0,
                            _0x5283c1 = [];
                          continue;
                        case '19':
                          _0x4de33a["onload"] = function () {
                            _0x52ef24["drawImage"](_0x4de33a, 0x0, 0x0, 0x12c, 0xb4);
                          };
                          continue;
                        case '20':
                          _0x54639d["setLen"](_0x4d7419["len"]);
                          continue;
                      }
                      break;
                    }
                  }
                });
                continue;
              case '4':
                var _0x54639d = this;
                continue;
              case '5':
                this["$div"]["find"](".yzmbody")["empty"]();
                continue;
            }
            break;
          }
        };
        continue;
      case '12':
        _0x41fffd["prototype"]["showloading"] = function () {
          this["$div"]["find"](".yzm_loading")["show"]();
        };
        continue;
      case '13':
        var _0x5a945f = function (_0x4292c7) {};
        continue;
      case '14':
        _0x5a945f["prototype"]["verify"] = function () {
          var _0x197931 = "2|1|5|6|0|3|4"["split"]('|'),
            _0x4c9aac = 0x0;
          while (!![]) {
            switch (_0x197931[_0x4c9aac++]) {
              case '0':
                CkType = _0x5413b9["attr"]('id');
                continue;
              case '1':
                var _0xe4775f = _0x5413b9["find"]("input[name='username']")["val"]();
                continue;
              case '2':
                var _0x5413b9 = _0x974ca9("#userRegForm");
                continue;
              case '3':
                yzmObj2 = _0x974ca9['fn']["yzmbox"](_0x5413b9, _0x974ca9("#leboyzm")["text"]() + _0xe4775f, _0x109550);
                continue;
              case '4':
                yzmObj2["load"]();
                continue;
              case '5':
                var _0x109550 = _0x5413b9["find"]("input[name='passwd']")["val"]();
                continue;
              case '6':
                if (yzmObj2 != null && CkType == "userRegForm") {
                  if (yzmObj2["getstatus"]() == 0x1) return !![];
                }
                continue;
            }
            break;
          }
        };
        continue;
      case '15':
        _0x41fffd["prototype"]["hideloading2"] = function () {
          this["$div"]["find"](".yzm_loading2")["hide"]();
        };
        continue;
      case '16':
        _0x41fffd["prototype"]["getstatus"] = function (_0x37d3f3) {
          return this["$status"];
        };
        continue;
      case '17':
        _0x974ca9['fn']["yzmbox"] = function (_0x19d72f, _0x449ac5, _0x3e316c) {
          var _0x5eb5d7 = "5|4|0|2|1|3"["split"]('|'),
            _0xa293b = 0x0;
          while (!![]) {
            switch (_0x5eb5d7[_0xa293b++]) {
              case '0':
                _0x974ca9("body")["append"](_0x545037["$div"]);
                continue;
              case '1':
                _0x974ca9("#yzm_close")["bind"]("click", function () {
                  CkType = "LoginForm";
                  yzmObj2 = null;
                  _0x545037["close"]();
                });
                continue;
              case '2':
                _0x974ca9("#yzm_refresh")["bind"]("click", function () {
                  var _0x477f36 = "1|4|0|3|2"["split"]('|'),
                    _0x22f910 = 0x0;
                  while (!![]) {
                    switch (_0x477f36[_0x22f910++]) {
                      case '0':
                        _0x974ca9(this)["addClass"]("loading");
                        continue;
                      case '1':
                        continue;
                      case '2':
                        _0x10c65e["setTimeout"](function () {
                          _0x974ca9("#yzm_refresh")["removeClass"]("loading");
                        }, 0x7d0);
                        continue;
                      case '3':
                        _0x545037["load"]();
                        continue;
                      case '4':
                        if (_0x974ca9(this)["hasClass"]("loading")) return ![];
                        continue;
                    }
                    break;
                  }
                });
                continue;
              case '3':
                return _0x545037;
              case '4':
                var _0x545037 = new _0x41fffd(_0x19d72f, _0x449ac5, _0x3e316c);
                continue;
              case '5':
                continue;
            }
            break;
          }
        };
        continue;
      case '18':
        _0x974ca9['fn']["yzmregbox"] = function () {
          var _0x5cfffc = new _0x5a945f();
          return _0x5cfffc;
        };
        continue;
    }
    break;
  }

```





> 还原代码

```js
//多循环几次, 就不用去判断原始代码中到底有多少个switch流程平坦化
for (let i = 0; i < 20; i++) {
    traverse(ast, {
        MemberExpression(path) {
            //找到分发器
            if (t.isStringLiteral(path.node.object) &&
                t.isStringLiteral(path.node.property, {
                    value: 'split'
                })) {
                //找到类型为 VariableDeclaration 的父节点
                let varPath = path.findParent(function (p) {
                    return t.isVariableDeclaration(p);
                });
                //获取下一个同级节点 while
                let whilePath = varPath.getSibling(varPath.key + 1);
                //解析整个 switch
                let myArr = [];
                // 遍历全部case
                whilePath.node.body.body[0].cases.map(function (p) {
                    //排除掉只有continue的
                    !t.isContinueStatement(p.consequent[0]) && (myArr[p.test.value] = p.consequent[0]);
                });

                let parentPath = whilePath.parent;
                //去掉分发器、while
                varPath.remove();
                whilePath.remove();
                // path.node.object.value 取到的是 '1|2|4|7|5|3|8|0|6'
                let shufferArr = path.node.object.value.split("|");
                shufferArr.map(function (v) {
                    parentPath.body.push(myArr[v]);
                });
                //每遍历一轮ast, 只处理一个switch流程平坦化就停止遍历
                path.stop();
            }
        }
    });
}

```





###### 还原数值常量加密

```js
eval(String.fromCharCode(425871 ^ 425977, 118436 ^ 118469));

==================还原后================================
  
eval(String.fromCharCode(118, 97));
```

> 还原

```js
traverse(ast, {
  	//找到计算表达式
    BinaryExpression(path) {
        let left = path.node.left;
        let right = path.node.right;
      	//左右两边都是数字
        if (t.isNumericLiteral(left) && t.isNumericLiteral(right)) {
          	//path.evaluate方法用来计算节点的值，返回一个对象。返回的对象中的confident是一个布尔值，它代表节点是否可计算出结果. value表示计算得出的值
            let { confident, value } = path.evaluate();
            confident && path.replaceWith(t.valueToNode(value));
        }
    }
});

```





###### 还原代码加密

```js
eval(String.fromCharCode(118, 97, 14, 32, 79, 79, 79, 79, 79, 48, 32, 61, 32, 79, 79, 79, 79, 79, 111, 59));
eval(atob("aGVsbG8gd29ybGQ="));


======================加密后===================
  
var OOOOO0 = OOOOOo;;
hello world;
```



> 还原

```js
traverse(ast, {
    CallExpression(path) {
        if (path.node.callee.name != 'eval') {
            return;
        }
        let arguments = path.node.arguments;
        let code = generator(arguments[0]).code;
        if (t.isStringLiteral(arguments)) {
            path.replaceWith(t.identifier(code));
        } else {
            path.replaceWith(t.identifier(eval(code)));
        }
    }
});
```





###### 还原unicode与十六进制字符串

```js
(function (q$JHle1, pWO2) { q$JHle1['\x75\x70\x64\x61\x74\x65'] = "\x32\x30\x31\x39\u5e74\x30\x39\u6708\x31\x36\u65e5\x31\x35\x3a\x32\x34\x3a\x32\x39\u66f4\u65b0"; pWO2['\x69\x6e\x66\x6f'] = "\u8fd9\u662f\u5bf9\u4e00\u4e2a\u811a\u672c\u8fdb\u884c\u6df7\u6dc6\u7684\u5728\u7ebf\u5de5\u5177\uff0c\u538b\u7f29\u4f53\u79ef\u8f83\u5c0f\uff0c\u89e3\u5bc6\u96be\u5ea6\u4e0d\u96be\uff0c\u9700\u8981\u9ad8\u96be\u5ea6\u52a0\u5bc6\u8bf7\u7528\u3010\u6700\u725b\u52a0\u5bc6\u3011"; pWO2['\x66\x65\x65\x64\x62\x61\x63\x6b'] = "\u6709\u95ee\u9898\u8bf7\u8054\u7cfb\x51\x51  \x38\x34\x30\x33\x34\x36\x36\x36" })(window, window["\x64\x6f\x63\x75\x6d\x65\x6e\x74"]);

==========================还原=============================
(function (q$JHle1, pWO2) {
  q$JHle1["update"] = "2019年09月16日15:24:29更新";
  pWO2["info"] = "这是对一个脚本进行混淆的在线工具，压缩体积较小，解密难度不难，需要高难度加密请用【最牛加密】";
  pWO2["feedback"] = "有问题请联系QQ  84034666";
})(window, window["document"]);
```

> 还原

```js
let code = generator(ast, { minified: true, jsescOption: { minimal: true } }).code;
ast = parser.parse(code);
code = generator(ast).code;
```



###### 还原逗号表达式

```js
function test2(a, b, c, d, e, f) {
    return f = (e = (d = (c = (b = (a = 1000, a + 50, b + 60, c + 70, a + 2000), d + 80, b
        + 3000), e + 90, c + 4000), f + 100, d + 5000), e + 6000);
}
console.log(test2());

================================还原==========================
function test2(a, b, c, d, e, f) {
  a = 1000;
  a + 50;
  b + 60;
  c + 70;
  b = a + 2000;
  d + 80;
  c = b + 3000;
  e + 90;
  d = c + 4000;
  f + 100;
  e = d + 5000;
  return f = e + 6000;
}
console.log(test2());

```

> 还原

```js
traverse(ast, {
    SequenceExpression: {
        //退出的时候, 从内部开始
        exit(path) {
            let expressions = path.node.expressions;
            let finalExpression = expressions.pop();
            let statement = path.getStatementParent();
            expressions.map(item => {
                statement.insertBefore(t.expressionStatement(item));
            });
            path.replaceInline(finalExpression);
        }
    }
});
```



###### 常量变量替换

```js
 var ae = 4,
     se = "14731255234d414cF91356d684E4E8F5F56c8f1bc";

n = se;


=====================还原为=============================

n = "14731255234d414cF91356d684E4E8F5F56c8f1bc";
```



> 还原

```js
traverse(ast, {
  	//遍历变量赋值或变量声明
    "AssignmentExpression|VariableDeclarator"(path) {
        let name = null;
        let value = null;
        if (path.isAssignmentExpression()) {
            name = path.node.left.name;
            value = path.node.right;
        } else {
            name = path.node.id.name;
            value = path.node.init;
        }
      	//必须得是字符串或者数字
        if (t.isStringLiteral(value) || t.isNumericLiteral(value)) {
            let binding = path.scope.getBinding(name);
          	//是常量并且没有修改过
            if (binding && binding.constant && binding.constantViolations.length == 0) {
                binding.referencePaths.map(item => {
                    item.replaceWith(value);
                });
            }
        }
    }
});

```

