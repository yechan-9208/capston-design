var c_button = require('./Transaction/C.js');
var rs_button = require('./Transaction/RS.js');
var r_button = require('./Transaction/R.js');
var i_button = require('./Transaction/Insert/m_btn.js');
const data = require('./in_data/data_group.js');

//
var read = (async () => {

  //user 하고 review는 아직 값이 없음 22/05/12기준
  await r_button.read_tour();
  // await r_button.read_area();
  // await r_button.read_tour_class();
  // await r_button.read_user();
  // await r_button.read_review();
})

// read();



//테이블 값 삭제 및 테이블 삭제
var reset_tables = (async () => {
  await rs_button.reset_tour();
  await rs_button.reset_tour_class();
  await rs_button.reset_area();
  await rs_button.reset_user();
  await rs_button.reset_review();
  await rs_button.reset_typeid12();
  await rs_button.reset_typeid15();
  await rs_button.reset_typeid28();
})

// reset_tables();

//테이블생성
var create_tables = (async () => {
  await c_button.create_tour();
  await c_button.create_area();
  await c_button.create_user();
  await c_button.create_review();
  await c_button.create_tour_class();
  await c_button.create_typeid12();
  await c_button.create_typeid15();
  await c_button.create_typeid28();

})

// create_tables();

//테이블에 기본 데이터 저장
var insert_default_data = (async () => {

  i_button.insert_default_data();
})

// insert_default_data();


//데이터베이스 테이블 및 초기 데이터삽입
// 1번만 실행 해야됨
var total = (async () => {

  await reset_tables();
  await create_tables();
  await insert_default_data();

})

total();




