var express = require('express');
var app = express();
var router = express.Router(); //express의 Router()메소드를 사용하여 모듈화를 함.
var path =require('path'); //상대경로

var Web3 = require('web3');
var web3 = new Web3('http://localhost:7018');

//web3 setting
/**
 * from위 계정은 deploy한 계정을 적어야함
 * from: 자신이 리믹스에서 deploy에 사용한 계정
 */
var saveContract = new web3.eth.Contract([
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
	},
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
	}
], '0x3Db3b37F8f3fbb9680476F4a2484d10fA48F75a0', {
    from: '0x6904a616D2FBa4A9028bB50fC47348111b2e6e74', // default from address
    gasPrice: '50000'
});

/**
 * 이 상태로는 성공. 아래 주석은 안한 것들 적음.
 * 시간은 아래 변수 time처럼해서 등록하면 될 것 같음
 * 해시값은 아직 미완성 --> 해시값완성 10.14
 * 이미지 스토리지도 미완성
 * 이미지 스토리지는 이미지를 등록하면 이 서버 폴더의 어떤 곳에 넣어야할 것 같음.
 */
 router.post('/regist',function(req,res){
    console.log(req.body.title);
    console.log(req.body.name);
    console.log(req.body.keyword);
    console.log(req.body.image);
	console.log(req.body.hash);
    var title = req.body.title;
    var name = req.body.name;
    var keyword = req.body.keyword;
    var time = Date.now().toString(); //javascript의 Date객체를 사용하여 시간을 구함.
    var hash = req.body.hash;
    
    saveContract.methods.addContent(name,title,hash,time,keyword).send({
        from: web3.eth.accounts[0],gas:5000000
    }).on('result', function(result){
        console.log(result);
    }).on('receipt',function(receipt){
        console.log(receipt);
	}).on('error', console.error);
	setTimeout(function () {	//JS는 비동기적으로 실행되서 이 내장함수를 써야 시간차를 두고 함수를 실행할수 있다.
		res.redirect('http://localhost:3000/mainpage.html')
	}, 1000);
	
});

module.exports =router;
