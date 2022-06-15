// area 데베에 지역 이름, 시군구 이름 저장


const axios = require('axios');
const query = require('./insert_query.js');
const data_group = require('../../in_data/data_group.js');
const { pool } = require('../../in_data/pool.js');




var area1, area_num1, city1, city_num1;



const area_list = data_group.area_list;

exports.insert_area = (async () => {


  for (var loop = 0; loop < area_list.length; loop++) {

    rownumber = 31; //경기도에 최대 31구가 있음


    var url = 'http://api.visitkorea.or.kr/openapi/service/rest/KorService/areaCode';
    var queryParams = '?' + encodeURIComponent('serviceKey') + '=hqsf047Rny9qenJ5LHw87FzuJB8iTHKUfcNi0rchTaKMTNSL3ZA0bHXO9mcrWjj2o3QVtAsic9TBtBy0zwQDAw%3D%3D'; /* Service Key*/
    queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent(rownumber); /* */
    queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /* */
    queryParams += '&' + encodeURIComponent('MobileOS') + '=' + encodeURIComponent('ETC'); /* */
    queryParams += '&' + encodeURIComponent('MobileApp') + '=' + encodeURIComponent('AppTest'); /* */
    queryParams += '&' + encodeURIComponent('areaCode') + '=' + encodeURIComponent(area_list[loop][0]); /* */

    url = url + queryParams



    await axios.get(url)
      .then(async function (response) {

        for (var num = 0; num < rownumber; num++) {


          var get_data = response.data.response.body.items.item[num];

          if (response.data.response.body.items.item[num] == undefined)
            break;

          area1 = area_list[loop][1];
          area_num1 = area_list[loop][0];
          city1 = get_data.name;
          city_num1 = get_data.rnum;

          await query.set_area(area1, area_num1, city1, city_num1);

        }

      }).catch(function (error) {
        console.log("area.js error");
      });

  };

})





