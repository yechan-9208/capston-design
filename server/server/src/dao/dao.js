const { pool } = require("../../database");

exports.getRows = async function(){
    try{
        const conn = await pool.getConnection(async(conn)=>conn);
        const selectquery = "SELECT * FROM usertable";
        
        try{
            const [row] = await conn.query(selectquery);
            conn.release();
            console.log(row);
            return row;
        }catch{
            console.error(" #### usertable 조회 쿼리 오류 ####");
            conn.release();
            return false;
        }

    }catch{
        console.error("#### DB 연동 에러 #####");
        conn.release();
        return false;   
    }
}

// 이전 검색어 DB 조회

exports.getPreSchWord = async function(){
    try{
        const conn = pool.getConnection( async(conn)=>conn );

        try{
            const PreSchWordQuery = "SELECT .. FROM .. ;" ; // 아마 이전 검색어 -> 회원번호 별?

            const [row] = await conn.query(PreSchWordQuery);
            conn.release();
            return row;
        }catch(err){
            console.error(" ##### getPreSchWord Query error ####");
            conn.release();
            return false
        }

    }catch(err){
        console.error(" ##### getPreSchWord DB error ####");
        conn.release();
        return false
    }
}

// 사용자 검색어 DB 저장

exports.insertSchWord = async function(data1,data2){
    try{
        const conn = await pool.getConnection( async(conn)=>conn );
        
        try{
            const insertSchWordQuery = "INSERT INTO usertable(ID,ID_num) VALUES(?,?)"
            const insertSchWordParams = [data1, data2];
            
            const [row] = await conn.query(insertSchWordQuery,insertSchWordParams);
            conn.release();
            return row;
            
        }catch(err){
            console.error(" ##### insertSchWord query error ####");
            conn.release();
            return false
        }
    }catch(err){
        console.error(" ##### insertSchWord DB error ####");
        conn.release();
        return false
    }
}

// 추천 키워드 DB 조회 

exports.getRecommendKeyword = async function(){
    try{
        const conn = await pool.getConnection(async(conn)=>conn);
        
        try{
            const getRecommendKeywordQuery = "SELECT .. FROM ..";

            const [row] = await conn.query(getRecommendKeywordQuery);
            conn.release();
            return row;
        }catch(err){
            console.error(" ##### getRecommendKeyword query error ####");
            conn.release();
            return false

        }
        
    }catch(err){
        console.error(" ##### getRecommendKeyword DB error ####");
        conn.release();
        return false
    }
}


// 범용 데이터 베이스 조회 함수
// DB = 데이터 베이스 이름(문자열), TB = 테이블 이름(문자열), cmn = 검색할 열 이름(문자열 배열) 
exports.selectDB = async function(DB,TB,cmn,option){
    try{
        const conn = await pool.getConnection(async(conn)=>conn);
        
        // if DB name TB name cmn 구성 검수 추가하기
        
        const selectQuery = "SELECT "+ cmn +" FROM " + DB +"."+ TB + option ;
        console.log(selectQuery);
        try{
            const [row] =  await conn.query(selectQuery);
            conn.release();
            return row;

        }catch(err){
            console.error(" #### selectDB query err ####");
            conn.release();
            return false;
        }
    }catch(err){
        console.error(" #### selectDB DB err ####");
            conn.release();
            return false;
    }
}

// 범용 DB INSERT 함수 
// 1회성 데이터 삽입 ( 여러 행 입력시 반복 호출 해야함 )
// DB = 데이터 베이스 이름(문자열), TB = 테이블 이름(문자열), cmn = 열 이름 (문자열 배열), data = 입력 데이터 (이중 배열)
exports.insertDB = async function(DB,TB,cmn,data){
    try{
        conn = await pool.getConnection(async(conn)=>conn);

        try{
            var Qmark = ""
            var array = [];
            var keys = Object.keys(data);

            for( var j = 0 ; j < Object.keys(data).length ; j++){
                array.push(data[keys[j]]);
            }
            
            for(var i=0 ; i < Object.keys(data).length ; i++){
                if(i == 0){
                    Qmark = "?";
                    continue;
                }
                Qmark += ",?"
            }
            console.log(array);
            const insertDBQuery = "INSERT INTO " + DB + "." + TB + "(" + cmn + ") VALUES("+ Qmark +");";
            const insertDBData = array;;
            console.log(insertDBQuery);
            console.log(insertDBData);

            const [row] = await conn.query(insertDBQuery,insertDBData);
            conn.release();
            return row;
        }catch(err){
            console.error(" #### insertDB query err ####");
            conn.release();
            return false;
        }
    }catch(err){
        console.error(" #### insertDB DB err ####");
        conn.release();
        return false;

    }

}

// 범용 DB Delete 함수 
// DB = 데이터 베이스 이름(문자열), TB = 테이블 이름(문자열), option = 삭제 할 데이터의 조건

exports.deleteDB = async function(DB,TB,option){
    try{
        conn = await pool.getConnection(async(conn)=>(conn));
        try{
            const Query = "DELETE FROM "+DB+ '.' +TB+ " where " + option;

            const [row] = await conn.query(Query);
            conn.release();
            return row;
        }catch(err){
            console.error(" #### deleteDB query err ####");
            conn.release();
            return false;
        }

    }catch(err){
        console.error(" #### deleteDB DB err ####");
        conn.release();
        return false;
    }
}




exports.getR_num = async function(){
    try{
        conn = await pool.getConnection(async(conn)=>conn);

        try{
            const Query = "SELECT r_num FROM review ORDER BY r_num DESC limit 0,1"

            const [row] = await conn.query(Query);
            conn.release();
            return row;
        }catch(err){
            console.error(" #### r_num query err ####");
            conn.release();
            return false;
        }
    }catch(err){
        console.error(" #### r_num DB err ####");
        conn.release();
        return false;

    }
}