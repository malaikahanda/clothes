var obj = JSON.parse(jsonString);

var myImgHolder = document.createElement('div');
myImgHolder.setAttribute("id", "myImgHolder");
document.getElementById('ICanTargetThis').appendChild(myImgHolder);

var myImages = '';
for(var i = 0; i < json.length; i++){
  myImages += '<img src="'+json[i]['image_path']+json[i]['img_nm']+'" />';
}
document.getElementById('myImgHolder').innerHTML = myImages;