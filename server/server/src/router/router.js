const controller  = require("../controller/controller");
const {body,query} = require("express-validator");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null,'uploads')
    },
    filename : function(req,file,cb){
        cb(null,file.originalname+'.png');
    }
})

const upload = multer({
    storage : storage
});

exports.router = (app) =>{
    //test
    app.get("/test",controller.testGet);

    // 배너 사진 요청
    app.get("/banner", controller.bannerGet);
   
    // 카테고리 별 검색 정보 제공
    app.get("/category",
        query("catCode","area").notEmpty()
        ,controller.categoryGet)

    // 검색어 입력 여행지 정보 제공
    app.get("/Search",
        query("keyword").notEmpty().isString().trim(),
        controller.searchKeyword)

    // 여행지 정보 제공 
    app.get("/tourInfo",
        query("contentid","contenttypeid").isInt().toInt()
        ,controller.tourInfoGet);

    // 리뷰 데이터 제공
    app.get("/review",
    query("contentid","r_num","type").isInt().toInt()
    ,controller.reviewGet);

    // DB 유저 데이터 삽입
    app.post("/insertUser",
        body("id","pw","name","nickname").notEmpty().isString(),
        controller.insertUser);
    
    // DB 리뷰 데이터 삽입
    app.post("/insertReview",
        [body("contentid").notEmpty().isNumeric(),
        body("title","content","id").notEmpty().isString(),
        ],
        controller.insertReview);
    
    // 서버 이미지 업로드
    app.post('/upload',
        upload.array('image'),
        controller.uploadImages);

    // 로그인 요청

    app.post('/login',
        [body("id").notEmpty()
        ,body("pw").notEmpty()],
        controller.loginPost);

    // 리뷰 데이터 삭제
    app.post('/deleteReview',
        body('rnum').notEmpty().isNumeric(),
        controller.deleteReview);
}

