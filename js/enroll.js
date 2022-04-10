$(document).ready(function () {
  $('.hashbtn').click(function () {
    var reader = new FileReader(); //define a Reader
    var file = $('#fileupload')[0].files[0]; //get the File object
    if (!file) {
      alert('no file selected');
      return;
    } //check if user selected a file

    reader.onload = function (f) {
      var file_result = this.result; // this == reader, get the loaded file "result"
      var file_wordArr = CryptoJS.lib.WordArray.create(file_result); //convert blob to WordArray , see https://code.google.com/p/crypto-js/issues/detail?id=67
      var sha1_hash = CryptoJS.SHA1(file_wordArr); //calculate SHA1 hash
      document.getElementById('hash_').value = sha1_hash.toString();
    };
    reader.readAsArrayBuffer(file); //read file as ArrayBuffer
  });
});
function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader(); //파일리더 객체인 reader

    reader.onload = function (e) {
      // 파일리더는 문서가 다 읽히면 보여줌
      document.getElementById('imgpreview').src = e.target.result; //이미지 URL 출력
    };
    reader.readAsDataURL(input.files[0]); //0번째 배열인 URL 읽어오기
  }
}
$('#fileupload').change(function () {
  //이미지가 바뀌면
  readURL(this); //URL을 다시 읽어온다
});
