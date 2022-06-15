const { pool }= require('../../in_data/pool.js');



//axios_tour에서 사용
//지역권에 시군구가 총 얼만큼 있는지 확인
exports.get_max = async (area_num) => {
	try {
		const connection = await pool.getConnection(async conn => conn);
		try {

      var sql = 'SELECT max(city_num) as max FROM area WHERE area_num = ?';
      var params = [area_num];
      
      const [rows] = await connection.query(sql, params)
      console.log('get_max 정상작동');

			connection.release();
			return rows[0].max;

		} catch(err) {
			console.log('get_max Query Error');
			connection.release();
			return false;
		}
	} catch(err) {
		console.log('DB Error');
		return false;
	}
};

//in_num 즉 지역 고유 코드값 가져오기
exports.get_in_num = async (area_num,city_num) => {
	try {
		const connection = await pool.getConnection(async conn => conn);
		try {

      var sql = 'SELECT in_num FROM area WHERE area_num = ? and city_num= ?';
      var params = [area_num,city_num];
      
      const [rows] = await connection.query(sql, params)
      console.log('get_in_num 정상작동');

			connection.release();
			return rows[0].in_num

		} catch(err) {
			console.log('get_in_num Query Error');
			connection.release();
			return false;
		}
	} catch(err) {
		console.log('DB Error');
		return false;
	}
};



//topic은 [ex) 공원,산] 데이터
exports.get_topic = async (topic_num) => {
	try {
		const connection = await pool.getConnection(async conn => conn);
		try {

      var sql = 'select * From tour_class where contenttypeid =?';
      var params = [topic_num];

      const [rows] = await connection.query(sql, params)
      console.log('get_topic 정상작동');

			connection.release();
			return rows;

		} catch(err) {
			console.log('get_topic Query Error');
			connection.release();
			return false;
		}
	} catch(err) {
		console.log('DB Error');
		return false;
	}
};



//관광지 정보 저장
exports.set_tour = async (addr, areacode,in_num, cat1, cat2, cat3, contentid, contenttypeid, firstimage, firstimage2, mapx, mapy, title,homepage,overview) => {
	try {
		const connection = await pool.getConnection(async conn => conn);
		try {
      var sql = 'INSERT INTO tour(addr, areacode,in_num, cat1, cat2, cat3, contentid, contenttypeid, firstimage, firstimage2, mapx, mapy, title,homepage,overview) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
      var params = [addr, areacode,in_num, cat1, cat2, cat3, contentid, contenttypeid, firstimage, firstimage2, mapx, mapy, title,homepage,overview];

      const [rows] = await connection.query(sql, params);
      console.log('set_tour 정상작동');
      
			connection.release();

		} catch(err) {
			console.log('set_tour Query Error');
			connection.release();
			return false;
		}
	} catch(err) {
		console.log('DB Error');
		return false;
	}
};


//axios_area에서 사용
//지역 정보 저장
exports.set_area = async (area1, area_num1, city1, city_num1) => {
	try {
		const connection = await pool.getConnection(async conn => conn);
		try {


      var sql = 'INSERT INTO area(area,area_num,city,city_num) VALUES(?,?,?,?)';
      var params = [area1, area_num1, city1, city_num1];

      await connection.query(sql, params);
      console.log(city1+'set_area 정상작동');

			connection.release();

		} catch(err) {
			console.log('set_area Query Error');
			connection.release();
			return false;
		}
	} catch(err) {
		console.log('DB Error');
		return false;
	}
};


exports.get_typeid = async (typeid) => {
	try {
		const connection = await pool.getConnection(async conn => conn);
		try {

      var sql = 'select * From tour where contenttypeid =?';
      var params = [typeid];

      const [rows] = await connection.query(sql, params);
      console.log('get_typeid 정상작동');

			connection.release();
			return rows;

		} catch(err) {
			console.log('get_typeid Query Error');
			connection.release();
			return false;
		}
	} catch(err) {
		console.log('DB Error');
		return false;
	}
};

/// detail type query
exports.insert_type12  = async (contentid,infocenter,restdate,usetime) => {
	try {
		const connection = await pool.getConnection(async conn => conn);
		try {

      var sql = 'INSERT INTO typeid12(contentid,infocenter,restdate,usetime) VALUES(?,?,?,?)';
      var params = [contentid,infocenter,restdate,usetime];
      
      await connection.query(sql, params)
      console.log('get_typeid12 정상작동');

			connection.release();


		} catch(err) {
			console.log('insert_typeid12 Query Error');
			connection.release();
			return false;
		}
	} catch(err) {
		console.log('DB Error');
		return false;
	}
};

exports.insert_type15  = async (contentid,eventplace,eventenddate,eventstartdate,playtime,sponsor1,sponsor1tel,usetimefestival) => {
	try {
		const connection = await pool.getConnection(async conn => conn);
		try {

      var sql = 'INSERT INTO typeid15(contentid,eventplace,eventenddate,eventstartdate,playtime,sponsor1,sponsor1tel,usetimefestival) VALUES(?,?,?,?,?,?,?,?)';
      var params = [contentid,eventplace,eventenddate,eventstartdate,playtime,sponsor1,sponsor1tel,usetimefestival];
      
      await connection.query(sql, params)
      console.log('get_typeid15 정상작동');

			connection.release();


		} catch(err) {
			console.log('insert_type15 Query Error');
			connection.release();
			return false;
		}
	} catch(err) {
		console.log('DB Error');
		return false;
	}
};

exports.insert_type28  = async (contentid,infocenterleports,usetimeleports) => {
	try {
		const connection = await pool.getConnection(async conn => conn);
		try {

      var sql = 'INSERT INTO typeid28(contentid,infocenterleports,usetimeleports) VALUES(?,?,?)';
      var params = [contentid,infocenterleports,usetimeleports];
      
      await connection.query(sql, params)
      console.log('get_typeid28 정상작동');

			connection.release();


		} catch(err) {
			console.log('insert_type28 Query Error');
			connection.release();
			return false;
		}
	} catch(err) {
		console.log('DB Error');
		return false;
	}
};