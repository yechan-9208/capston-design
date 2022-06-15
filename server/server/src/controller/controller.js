const dao = require("../dao/dao");
const banner = require("../../banner_src.json");
const { sendfile } = require("express/lib/response");
const {validationResult} = require("express-validator");
const res = require("express/lib/response");
const path = require("path");

exports.testGet = async function(req, res){
    
    let receiveData = req;

    let data = {};
    let row = await dao.selectDB("test","area",["*"],"");
    data = row;

    return res.send({
        result: data,
        inSuccess: true,
        code : 200,
        message : "테스트 성공"
    });
}

// 배너 사진 전송
exports.bannerGet = async function(req,res){

    // 배너 사진 유효성 검사

    return res.send({
        result: banner,
        inSuccess: true,
        code : 200,
        message : "배너 사진 전송 성공"
    });

}

// 카테고리 아이콘 이벤트 동작

exports.categoryGet = async function(req,res){
    
    const errors = validationResult(req);

    // 유효성 검사

    if(!errors.isEmpty()){
        return res.send({
            result: null,
            inSuccess: false,
            code : 402,
            message : errors.array()
        });
    }

    var cat = Number(req.query.catCode);

    if (cat == NaN) {
        return res.send({
            result: null,
            inSuccess: false,
            code : 405,
            message : "catCode가 잘못되었습니다."
        });
    }

    var code = "";
    
    // 임시 분류 ( 데이터 더 많아 질 시 카테고리 확정 후 분류 코드 매칭)
    switch(cat){
        case 0 : // 축제
            code = "A02070200' or cat3 ='A02070100')"
            break;
        case 1 : // 연극, 공연
            code = "A02080100' or cat3 ='A02080200')"
            break;
        case 2 : // 자연 관광지(산)
            code = "A01010400' or cat3 ='A01010500' or cat3 = 'A01010600')"
            break;
        case 3 : // 전시회, 박람회
            code = "A02080500' or cat3 ='A02080600')"
            break;
        case 4 : // 폭포, 계곡
            code = "A01010800' or cat3 ='A01010900')"
            break;
        case 5 : // 식물원
            code = "A01010700')"
            break;
        default :
            return res.send({
            result: null,
            inSuccess: false,
            code : 405,
            message : "카테고리 코드가 잘못 전송되었습니다."
        });
    }

 
   
    // console.log(found);
    // console.log(found[3]);
    // console.log(typeof(found[3]));
    // console.log(found.length);
	
    // area 분류
    var area = req.query.area;
    var option = '';
    var inNum = '';
    
    if(area[0] == ''){
        option = '';
    }else{
    
        for(var j = 0 ; j < area.length ; j++){
        if( j == 0 ){
            inNum += area[j];
            continue;
        }
        inNum += ',' + area[j]
	console.log(inNum);
        }
    
    option = 'and in_num in(' + inNum +')';

    }
  
    code += option;
    
    var data = await dao.selectDB("test","tour","addr,firstimage,firstimage2,title,overview,contentid,contenttypeid"," where (cat3 = '"+code);
    // 더 많은 정보 추가
    
    if(data == false){
        return res.send({
            result: null,
            inSuccess: false,
            code : 400,
            message : "데이터가 존재하지 않습니다."
            });
    }
    
    return res.send({
        result: data,
        inSuccess: true,
        code : 200,
        message : "카테고리 검색 결과 전송 성공"
    });
}

// 검색어 결과 제공

exports.searchKeyword = async function(req,res){

    // 유효성 검증
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.send({
            result: null,
            inSuccess: false,
            code : 402,
            message : errors.array()
        });
      }

      
    var keywordBefor = req.query.keyword;
    //공백 제거
    var keyword = keywordBefor.replace(/(\s*)/g,'')

    if( !strFilter(keyword)){
        return res.send({
            result: null,
            inSuccess: false,
            code : 403,
            message : "특수문자 포함"
        });
    }

    var word = "'%"+keyword+"%'";

    var area = req.query.area;
    var option = '';
    var inNum = '';

    if(area[0] == ''){
        option = '';
    }else{
    
        for(var j = 0 ; j < area.length ; j++){
        if( j == 0 ){
            inNum += area[j];
            continue;
        }
        inNum += ',' + area[j]
        }
    
    option = 'and in_num in(' + inNum +')';

    }
    

    word += option;


    let data = await dao.selectDB("test","tour","addr,firstimage,firstimage2,title,overview,contentid,contenttypeid",' where title like '+ word);

    if(!data){
        return res.send({
            result: null,
            inSuccess: false,
            code : 401,
            message : '검색결과 없음'
        });
    }
    
    return res.send({
        result: data,
        inSuccess: true,
        code : 200,
        message : "키워드 검색 데이터 전송 성공"
    });
}

// 여행지 정보 제공

exports.tourInfoGet = async function(req,res){
    
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.send({
            result: null,
            inSuccess: false,
            code : 402,
            message : errors.array()
        });
    }

    var contentid = Number(req.query.contentid);
    var contenttype = Number(req.query.contenttypeid);

    var data1 = await dao.selectDB("test","tour","addr,firstimage,firstimage2,mapx,mapy,title,homepage,overview",' where contentid = '+contentid);
    if(data1 == false){
        return res.send({
            result: null,
            inSuccess: false,
            code : 401,
            message : "검색 결과가 없습니다."
            });
    }

    switch(contenttype){
        case 12 :
            var data2 = await dao.selectDB("test","typeid12","infocenter,restdate,usetime",' where contentid = '+contentid);
            break;
        case 15 :
            var data2 = await dao.selectDB("test","typeid15","eventplace,eventstartdate,eventenddate,playtime,sponsor1,sponsor1tel,usetimefestival",' where contentid = '+contentid);
            break;
        case 28 :
            var data2 = await dao.selectDB("test","typeid28","infocenterleports,usetimeleports",' where contentid = '+contentid);
            break;
        default :
            res.send({
            result: null,
            inSuccess: false,
            code : 405,
            message : "contenttype 값이 잘 못 돼었습니다"
            });
    }

    if(data2 == false){
        return res.send({
            result: null,
            inSuccess: false,
            code : 401,
            message : "검색 결과가 없습니다."
            });
    }

    return res.send({
        result1: data1,
        result2: data2,
        inSuccess: true,
        code : 200,
        message : "여행지 정보 데이터 전송 성공"
    });
    
}

exports.reviewGet = async function(req,res){

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.send({
            result: null,
            inSuccess: false,
            code : 402,
            message : errors.array()
        });
    }

    var data = "";

    if(Number(req.query.type) == 1){

        var contentid = Number(req.query.contentid);
        data = await dao.selectDB("test","review","title,content,img,id,r_num",' where contentid = '+contentid);
    }
    else if(Number(req.query.type) == 2){
        var r_num = Number(req.query.r_num);
        data = await dao.selectDB("test","review","title,content,img,id,r_num",' where r_num = '+ r_num);
    }
    else if(Number(req.query.type) == 3){
        var id = req.query.id;
        data = await dao.selectDB("test","review","title,content,img,id,r_num",' where id = "'+ id+'"');
    }
    else{
        return res.send({
            result: null,
            inSuccess: false,
            code : 402,
            message : "타입 인자 에러."
            });
    }
    
    if(data == false){
        return res.send({
            result: null,
            inSuccess: false,
            code : 401,
            message : "검색 결과가 없습니다."
            });
    }

    return res.send({
        result: data,
        inSuccess: true,
        code : 200,
        message : "리뷰 데이터 전송 성공"
    });
    

}



// 유저 데이터 DB 삽입

exports.insertUser = async function(req,res){
    
    const errors = validationResult(req);

    // 유효성 검사

    if (!errors.isEmpty()) {
        return res.send({
            result: null,
            inSuccess: false,
            code : 402,
            message : errors.array()
        });
    }

    // insert data 유효성 검사

    if(!(strFilter(req.body.id) && strFilter(req.body.pw) && strFilter(req.body.name) && strFilter(req.body.nickname)) ){
        return res.send({
            result: null,
            inSuccess: false,
            code : 403,
            message : "수신 받은 데이터에 특수문자가 포함되어 있음."
        });
    }

    var data =[];
    data.push(req.body.id);
    data.push(req.body.pw);
    data.push(req.body.name);
    data.push(req.body.nickname);
    
    var insuccess = await dao.insertDB("test","user","id,pw,name,nickname",data);
    if (insuccess == false){
        return res.send({
            result: null,
            inSuccess: false,
            code : 404,
            message : "중복된 ID 값이 입력되었습니다."
        });
    }


    return res.send({
        result: null,
        inSuccess: true,
        code : 200,
        message : "사용자 데이터 DB 삽입 성공"
    });
}

// 리뷰 데이터 DB 삽입

exports.insertReview = async function(req,res){
    
    const errors = validationResult(req);

    // 유효성 검사

    if (!errors.isEmpty()) {
        return res.send({
            result: null,
            inSuccess: false,
            code : 402,
            message : errors.array()
        });
    }

    // insert data 유효성 검사

    if(!(strFilter(req.body.title) && strFilter(req.body.content) && strFilter(req.body.id)) ){
        return res.send({
            result: null,
            inSuccess: false,
            code : 403,
            message : "수신 받은 데이터에 허용되지 않은 특수문자가 포함되어 있음."
        });
    }


    var row = await dao.getR_num();
    var r_num = row[0].r_num + 1;

    var r_numJson = { r_num : r_num }
    
    

    var data = Object.assign(r_numJson,req.body);
    console.log(typeof(data));
    var insuccess = await dao.insertDB("test","review","r_num,title,content,img,id,contentid",data);
    if (insuccess == false){
        return res.send({
            result: null,
            inSuccess: false,
            code : 404,
            message : "리뷰 데이터 DB 입력 실패."
        });
    }


    return res.send({
        result: null,
        inSuccess: true,
        code : 200,
        message : "사용자 데이터 DB 삽입 성공"
    });
}

// 이미지 업로드 
exports.uploadImages = async function(req,res){

    var image = req.files;
    console.log(image);
   
    if(image === undefined){
        return res.send({
            result: null,
            inSuccess: false,
            code : 400,
            message : "이미지 업로드 실패"
        });
    }
    
    return res.send({
        result: image[0].filename,
        inSuccess: true,
        code : 200,
        message : "이미지 업로드 성공"
    });
    
}

// 로그인 요청

exports.loginPost = async function(req,res){

    const errors = validationResult(req);

    // 유효성 검사

    if (!errors.isEmpty()) {
        return res.send({
            result: null,
            inSuccess: false,
            code : 402,
            message : errors.array()
        });
    }

    var user = await dao.selectDB('test','user',"id,pw,name,nickname",' where id = "'+ req.body.id+'"');

    console.log(user);

    if(user.length == 0){
        return res.send({
            result: null,
            inSuccess: false,
            code : 406,
            message : "등록된 아이디가 존재하지 않습니다."
        });
    }

    console.log(user[0].pw);

    if(req.body.pw != user[0].pw){
        return res.send({
            result: null,
            inSuccess: false,
            code : 407,
            message : "비밀번호가 맞지 않습니다."
        });
    }

    return res.send({
        result: user,
        inSuccess: true,
        code : 200,
        message : "로그인 성공"
    });



}


exports.deleteReview = async function(req,res){

    const errors = validationResult(req);

    // 유효성 검사

    if (!errors.isEmpty()) {
        return res.send({
            result: null,
            inSuccess: false,
            code : 402,
            message : errors.array()
        });
    }

    var option = "r_num = " + req.body.rnum;
    
    var result = dao.deleteDB('test','review',option);

    if(result == false){
        return res.send({
            result: null,
            inSuccess: false,
            code : 400,
            message : 'DB 오류입니다.'
        });
    }

    return res.send({
        result: result,
        inSuccess: true,
        code : 200,
        message : "리뷰 삭제 성공"
    });


}




// insert 특문 방지 함수

const strFilter = (data) =>{
    
    if(data.includes(";")){
        return false;
    }
    return true;
}