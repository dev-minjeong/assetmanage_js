function openSearchbtn() {
     document.getElementById("searchsection").style.display = 'block'
}
function closeSearchbtn() {
    document.getElementById("searchsection").style.display = 'none'
}
var express = require('express');
var app = express();
var router = express.Router(); //express의 Router()메소드를 사용하여 모듈화를 함.
var path =require('path'); //상대경로
var fs = require('fs'); //json 파일을 읽고 쓰기 위해 필요하다.
var Web3 = require('web3');
var web3 = new Web3('http://localhost:7018'); 


//web3 setting
var searchContract = new web3.eth.Contract([
	{
		"constant": true,
		"inputs": [
			{
				"name": "_hash",
				"type": "string"
			}
		],
		"name": "detailkeyword",
		"outputs": [
			{
				"name": "keyword",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_name",
				"type": "string"
			},
			{
				"name": "number",
				"type": "uint256"
			}
		],
		"name": "getName",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_hash",
				"type": "string"
			}
		],
		"name": "getHash",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_keyword",
				"type": "string"
			},
			{
				"name": "number",
				"type": "uint256"
			}
		],
		"name": "getKeyWord",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_title",
				"type": "string"
			},
			{
				"name": "number",
				"type": "uint256"
			}
		],
		"name": "getTitle",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_hash",
				"type": "string"
			}
		],
		"name": "detailname",
		"outputs": [
			{
				"name": "name",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_hash",
				"type": "string"
			}
		],
		"name": "detailtitle",
		"outputs": [
			{
				"name": "title",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_name",
				"type": "string"
			},
			{
				"name": "_title",
				"type": "string"
			},
			{
				"name": "_hash",
				"type": "string"
			},
			{
				"name": "_date",
				"type": "string"
			},
			{
				"name": "_keyword",
				"type": "string"
			}
		],
		"name": "addContent",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	}
], '0x3Db3b37F8f3fbb9680476F4a2484d10fA48F75a0', {
    from: '0x6904a616D2FBa4A9028bB50fC47348111b2e6e74', // default from address
    gasPrice: '50000'
});

//검색하면 밑의 searchkeyword함수가 실행되고
//그 안의 블록체인 함수가 호출되어 검색결과 해시값을 반환하고
//그것을 일단은 5번정도 반복하여 5개의 해시값을
//test.json 파일에 저장한다
router.post('/keyword',function(req,res){
	var keyword =req.body.keyword;
	//console.log(keyword);
	searchkeyword(keyword);
	//검색목록 창으로 넘어가기
	setTimeout(function () {	//JS는 비동기적으로 실행되서 이 내장함수를 써야 시간차를 두고 함수를 실행할수 있다.
		res.redirect('http://localhost:3000/gallery.html')
	}, 1000);
	
});
router.post('/name',function(req,res){
    var name =req.body.name;
	//console.log(name);
	searchname(name);
	//검색목록 창으로 넘어가기
	setTimeout(function () {	//JS는 비동기적으로 실행되서 이 내장함수를 써야 시간차를 두고 함수를 실행할수 있다.
		res.redirect('http://localhost:3000/gallery.html')
	}, 1000);
});


//keyword를 블록체인에서 검색하여 해시값을 배열에 저장하는 함수
//일단 keyword검색만 해놨다 다른것도 같은 방식이다. --> 이름검색,키워드검색 완성
//이미지 검색 미완성
//또 현재는 일치하는 것들 중 일정한 수만 검색되게 했다.
function searchkeyword(data1) {
	var array = new Array();
	var data = new Object();
	var json = "";
	for(var idx = 0; idx<5; idx++){
		searchContract.methods.getKeyWord(data1,idx).call({from: web3.eth.accounts[0]})
		.then(function(result){
			data = "./images/".concat(result,'.jpg')
			array.push(data);
			json = JSON.stringify(array); 
			console.log(json);
			
		});
	}
	setTimeout(function () {	//JS는 비동기적으로 실행되서 이 내장함수를 써야 시간차를 두고 함수를 실행할수 있다.
		writejson(json);
		
	}, 1000);
}

//위 배열을 json파일에 write하는 함수
function writejson(jsondata) {
	fs.writeFile('./public/json/test.json', jsondata, err => {
		if (err) {
			console.log('Error writing file', err)
		} else {
			console.log('Successfully wrote file')
			
		}
	});
}

function searchname(data1) {
	var array = new Array();
	var data = new Object();
	var json = "";
	for(var idx = 0; idx<3; idx++){
		searchContract.methods.getName(data1,idx).call({from: web3.eth.accounts[0]})
		.then(function(result){
			data = "./images/".concat(result,'.jpg')
			array.push(data);
			json = JSON.stringify(array); 
			console.log(json);
			
		});
	}
	setTimeout(function () {	//JS는 비동기적으로 실행되서 이 내장함수를 써야 시간차를 두고 함수를 실행할수 있다.
		writejson(json);
	}, 1000);
}



/**searchContract.methods.detailname(resultdata.toString()).call({from: web3.eth.accounts[0]})
	.then(function(result){
		console.log(result);
	});*/

module.exports = router;