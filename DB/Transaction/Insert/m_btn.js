const area= require('./area.js');
const tour= require('./tour.js');
const detail = require('./typeid.js');
const tour_class = require('./tour_class.js');
const data = require('../../in_data/data_group.js')

// 12 = 관광지(75)/ 15 - 행사,공연,축제(14) / 28 - 레포츠(44)
var tour_class_arry = [12,15,28]


exports.insert_default_data = (async () => {

  //지역구 기본설정
  await area.insert_area();

  //컨텐츠 기본설정
  await tour_class.insert_tour_class(data.values);


  for(var num=0;num<tour_class_arry.length;num++)
  {
    await tour.insert_tour(tour_class_arry[num]);
    await detail.type_detail(tour_class_arry[num]);
  }

});

