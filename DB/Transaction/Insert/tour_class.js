const { pool }= require('../../in_data/pool.js');



exports.insert_tour_class = async (values1) => {
	try {
		const connection = await pool.getConnection(async conn => conn);
		try {

      var sql = "INSERT INTO tour_class	VALUES	?";
      
      var values = values1;
      
      await connection.query(sql, [values]);
      console.log("insert_tour_class 정상작동");
      
			connection.release();

		} catch(err) {
			console.log(' Query Error');
			connection.release();
			return false;
		}
	} catch(err) {
		console.log('DB Error');
		return false;
	}
};

