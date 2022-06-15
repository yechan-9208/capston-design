const { pool } = require('../in_data/pool.js');

// review talbe 리셋
exports.reset_review = async () => {
  try {
    const connection = await pool.getConnection(async conn => conn);
    try {

      var sql ='delete FROM review';
      await connection.query(sql);

      var sql ='drop table review;';
      await connection.query(sql);
      
      console.log('review table 리셋');

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


// user talbe 리셋
exports.reset_user = async () => {
  try {
    const connection = await pool.getConnection(async conn => conn);
    try {

      var sql ='delete FROM user';
      await connection.query(sql);

      var sql ='drop table user;';
      await connection.query(sql);
      
      console.log('user table 리셋');

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



// tour talbe 리셋
exports.reset_tour = async () => {
  try {
    const connection = await pool.getConnection(async conn => conn);
    try {

      var sql ='delete FROM tour';
      await connection.query(sql);

      var sql ='drop table tour;';
      await connection.query(sql);
      
      console.log('tour table 리셋');

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

exports.reset_tour_class = async () => {
  try {
    const connection = await pool.getConnection(async conn => conn);
    try {

      var sql ='delete FROM tour_class';
      await connection.query(sql);

      var sql ='drop table tour_class;';
      await connection.query(sql);
      
      console.log('tour_class table 리셋');

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


// area talbe 리셋
exports.reset_area = async () => {
  try {
    const connection = await pool.getConnection(async conn => conn);
    try {

      var sql ='delete FROM area';
      await connection.query(sql);

      var sql ='drop table area;';
      await connection.query(sql);
      
      console.log('area table 리셋');

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


// typeid12 talbe 리셋
exports.reset_typeid12 = async () => {
  try {
    const connection = await pool.getConnection(async conn => conn);
    try {

      var sql ='delete FROM typeid12';
      await connection.query(sql);

      var sql ='drop table typeid12;';
      await connection.query(sql);
      
      console.log('typeid12 table 리셋');

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

// typeid15 talbe 리셋
exports.reset_typeid15 = async () => {
  try {
    const connection = await pool.getConnection(async conn => conn);
    try {

      var sql ='delete FROM typeid15';
      await connection.query(sql);

      var sql ='drop table typeid15;';
      await connection.query(sql);
      
      console.log('typeid15 table 리셋');

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

// typeid28 talbe 리셋
exports.reset_typeid28 = async () => {
  try {
    const connection = await pool.getConnection(async conn => conn);
    try {

      var sql ='delete FROM typeid28';
      await connection.query(sql);

      var sql ='drop table typeid28;';
      await connection.query(sql);
      
      console.log('typeid28 table 리셋');

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