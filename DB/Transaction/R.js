const { pool } = require('../in_data/pool.js');

// review review 리셋
exports.read_review = async () => {
  try {
    const connection = await pool.getConnection(async conn => conn);
    try {

      var sql ='select * FROM review';
      const [rows] = await connection.query(sql);

      console.log(rows);

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

// review tour 읽기
exports.read_tour = async () => {
  try {
    const connection = await pool.getConnection(async conn => conn);
    try {

      var sql ='select * FROM tour';
      const [rows] = await connection.query(sql);

      console.log(rows);

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


// review area 읽기
exports.read_area = async () => {
  try {
    const connection = await pool.getConnection(async conn => conn);
    try {

      var sql ='select * FROM area';
      const [rows] = await connection.query(sql);

      console.log(rows);

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

// review tour_class 읽기
exports.read_tour_class = async () => {
  try {
    const connection = await pool.getConnection(async conn => conn);
    try {

      var sql ='select * FROM tour_class';
      const [rows] = await connection.query(sql);

      console.log(rows);

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

// review user 읽기
exports.read_user = async () => {
  try {
    const connection = await pool.getConnection(async conn => conn);
    try {

      var sql ='select * FROM user';
      const [rows] = await connection.query(sql);

      console.log(rows);

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


// review reivew 읽기
exports.read_reivew = async () => {
  try {
    const connection = await pool.getConnection(async conn => conn);
    try {

      var sql ='select * FROM reivew';
      const [rows] = await connection.query(sql);

      console.log(rows);

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
