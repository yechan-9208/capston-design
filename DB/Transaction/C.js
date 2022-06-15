const { pool } = require('../in_data/pool.js');


// 트랜잭션 기본 골격
// exports.함수이름 = async () => {
//   try {
//     const connection = await pool.getConnection(async conn => conn);
//     try {

//       var sql ='sql 내용'

//       await connection.query(sql);
//       connection.release();

//     } catch (err) {
//       console.log('Query Error');
//       connection.release();
//       return false;
//     }
//   } catch (err) {
//     console.log('DB Error');
//     return false;
//   }
// };




// create 트랜젝션

exports.create_review = async () => {
  try {
    const connection = await pool.getConnection(async conn => conn);
    try {

      var sql =
      'create table review( r_num int(10) not null auto_increment, title varchar(100) not null, content varchar(100) not null, img varchar(100), id varchar(100) not null, primary key(r_num));';


      await connection.query(sql);
      console.log("review table 생성");
      connection.release();

    } catch (err) {
      console.log('Query Error');
      connection.release();
      return false;
    }
  } catch (err) {
    console.log('DB Error');
    return false;
  }
};



exports.create_user = async () => {
  try {
    const connection = await pool.getConnection(async conn => conn);
    try {

      var sql =
      'create table user(id varchar(100) not null, pw varchar(100) not null, name varchar(100) not null, nickname varchar(100) not null,primary key(id));';


      await connection.query(sql);
      console.log("user table 생성");
      connection.release();

    } catch (err) {
      console.log('Query Error');
      connection.release();
      return false;
    }
  } catch (err) {
    console.log('DB Error');
    return false;
  }
};

exports.create_tour = async () => {
  try {
    const connection = await pool.getConnection(async conn => conn);
    try {

      var sql =
      'create table tour(addr varchar(100), areacode int(100), in_num int(100), cat1 varchar(100), cat2 varchar(100), cat3 varchar(100), contentid int(100) not null, contenttypeid int(100) not null, firstimage varchar(100), firstimage2 varchar(100), mapx float(9,6), mapy float(9,6), title varchar(100) not null,homepage varchar(200),overview varchar(1000), primary key(contentid))';


      await connection.query(sql);
      console.log("tour table 생성");
      connection.release();

    } catch (err) {
      console.log('Query Error');
      connection.release();
      return false;
    }
  } catch (err) {
    console.log('DB Error');
    return false;
  }
};

exports.create_tour_class = async () => {
  try {
    const connection = await pool.getConnection(async conn => conn);
    try {

      var sql =
      "create table tour_class(contenttypeid varchar(100) not null, cat1 varchar(100) not null, cat2 varchar(100) not null, cat3 varchar(100) not null, cat1_text varchar(100) not null, cat2_text varchar(100) not null, cat3_text varchar(100) not null, primary key(cat3)) ;"

      await connection.query(sql);
      console.log("tour_class table 생성");
      connection.release();

    } catch (err) {
      console.log('Query Error');
      connection.release();
      return false;
    }
  } catch (err) {
    console.log('DB Error');
    return false;
  }
};




exports.create_area = async () => {
  try {
    const connection = await pool.getConnection(async conn => conn);
    try {

      var sql =
        'create table area( in_num int(10) not null auto_increment, area varchar(10) not null, area_num int(11) not null, city varchar(10) not null, city_num int(11) not null, primary key(in_num)) ';


      await connection.query(sql);
      console.log("area table 생성");
      connection.release();

    } catch (err) {
      console.log('Query Error');
      connection.release();
      return false;
    }
  } catch (err) {
    console.log('DB Error');
    return false;
  }
};


exports.create_typeid12 = async () => {
  try {
    const connection = await pool.getConnection(async conn => conn);
    try {

      var sql ='create table typeid12(contentid int(10) not null,infocenter varchar(100),restdate varchar(100),usetime varchar(200),primary key(contentid));'

      await connection.query(sql);
      console.log("create_typeid12 생성");
      connection.release();

    } catch (err) {
      console.log('Query Error');
      connection.release();
      return false;
    }
  } catch (err) {
    console.log('DB Error');
    return false;
  }
};

  exports.create_typeid15 = async () => {
    try {
      const connection = await pool.getConnection(async conn => conn);
      try {
  
        var sql ='create table typeid15(contentid int(10) not null,eventplace varchar(100),eventenddate varchar(100),eventstartdate varchar(100),playtime varchar(100),sponsor1 varchar(100),sponsor1tel varchar(100),usetimefestival varchar(100),primary key(contentid));'
  
        await connection.query(sql);
        console.log("create_typeid15 생성");
        connection.release();
  
      } catch (err) {
        console.log('Query Error');
        connection.release();
        return false;
      }
    } catch (err) {
      console.log('DB Error');
      return false;
    }
  };

  exports.create_typeid28 = async () => {
    try {
      const connection = await pool.getConnection(async conn => conn);
      try {
  
        var sql ='create table typeid28(contentid int(10) not null,infocenterleports varchar(200),usetimeleports varchar(200),primary key(contentid))';
  
        await connection.query(sql);
        console.log("create_typeid28 생성");
        connection.release();
  
      } catch (err) {
        console.log('Query Error');
        connection.release();
        return false;
      }
    } catch (err) {
      console.log('DB Error');
      return false;
    }
  };


