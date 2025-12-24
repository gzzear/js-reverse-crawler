const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const t = require("@babel/types");
const generator = require("@babel/generator").default;
const fs = require('fs');

const jscode = fs.readFileSync("./t-ast.js", {
    encoding: "utf-8"
});
let ast = parser.parse(jscode);

//ast处理


let code = generator(ast).code;
fs.writeFile('./t-restore.js', code, (err) => { });