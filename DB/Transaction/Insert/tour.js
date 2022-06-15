//데베에 지역에 해당되는 topic값 저장

const axios = require('axios');
const query = require('./insert_query.js');
const data_group = require('../../in_data/data_group.js');
const urlparse = require('./url_parse.js');
const plus_data = require('./tour_plus');


//rownumber= 한페이지 결과수 , max 서울권,경기권에 몇번째 구까지 출력할지
var rownumber = 5;

var check = (a, b) => {
  if (a == undefined)
    b = null;
  else
    b = a.replace(/(<([^>]+)>)/ig, "");


  return b;
}


exports.insert_tour = (async (topic_num) => {

  // 지역 번호,이름 배열 가져오기
  const area_list = data_group.area_list;

  var contenttypeid, cat1, cat2, cat3, in_num, max;


  var topic_in_num;

  var topic = await query.get_topic(topic_num)

  //topic_in_num < topic.length 반복문 조건

  for (topic_in_num = 0; topic_in_num < 10; topic_in_num++) {
    contenttypeid = topic_num;
    cat1 = topic[topic_in_num].cat1;
    cat2 = topic[topic_in_num].cat2;
    cat3 = topic[topic_in_num].cat3;

    console.log(contenttypeid+'토픽내 content 반복번호');
    console.log(topic_in_num);
    console.log('토픽 대,중 소 분류번호');
    console.log(cat1,cat2,cat3);


    for (var loop = 0; loop < area_list.length; loop++) {

      // 맥스값 가져오기 즉 해당지역의 최대 시군구 코드 값 가져오기
      max = await query.get_max(area_list[loop][0]);
   

      console.log('서울 = 0, 경기 =1');
      console.log(loop);
      for (var in_loop = 1; in_loop <= max; in_loop++) {
        console.log('in_num값(지역 고유값)');
        console.log(in_loop);




        var url = 'http://api.visitkorea.or.kr/openapi/service/rest/KorService/areaBasedList';
        var queryParams = '?' + encodeURIComponent('serviceKey') + '=hqsf047Rny9qenJ5LHw87FzuJB8iTHKUfcNi0rchTaKMTNSL3ZA0bHXO9mcrWjj2o3QVtAsic9TBtBy0zwQDAw%3D%3D'; /* Service Key*/
        queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /* */
        queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent(rownumber); /* 한페이지 결과수 */
        queryParams += '&' + encodeURIComponent('MobileApp') + '=' + encodeURIComponent('AppTest'); /* */
        queryParams += '&' + encodeURIComponent('MobileOS') + '=' + encodeURIComponent('ETC'); /* */
        queryParams += '&' + encodeURIComponent('arrange') + '=' + encodeURIComponent('A'); /* */
        queryParams += '&' + encodeURIComponent('cat1') + '=' + encodeURIComponent(cat1); /* */
        queryParams += '&' + encodeURIComponent('contentTypeId') + '=' + encodeURIComponent(contenttypeid); /* 관광타입*/
        queryParams += '&' + encodeURIComponent('areaCode') + '=' + encodeURIComponent(area_list[loop][0]); /* 지역코드(서울,경기)*/
        queryParams += '&' + encodeURIComponent('sigunguCode') + '=' + encodeURIComponent(in_loop); /* 시군구 코드(강남,송파)*/
        queryParams += '&' + encodeURIComponent('cat2') + '=' + encodeURIComponent(cat2); /* */
        queryParams += '&' + encodeURIComponent('cat3') + '=' + encodeURIComponent(cat3); /* */
        queryParams += '&' + encodeURIComponent('listYN') + '=' + encodeURIComponent('Y'); /* */
        queryParams += '&' + encodeURIComponent('modifiedtime') + '=' + encodeURIComponent(''); /* */


        url = url + queryParams

        //in_num 지역 고유 번호 가져오기
        var in_num = await query.get_in_num(area_list[loop][0], in_loop);

        var addr, areacode, cat1, cat2, cat3, contentid, contenttypeid, firstimage, firstimage2, mapx, mapy, title

      

        var inplus_data, homepage, overview, homepageparse


        await axios.get(url)
          .then(async function (response) {

   
            for (var num = 0; num < rownumber; num++) {
        
              var get_data = response.data.response.body.items.item;


              if(response.data.response.body.items == 0 )
                break;
             
         
              if (get_data[num] == undefined) {
                if (get_data == undefined || get_data.contentid == undefined)
                  break;
                else {

                  addr = get_data.addr1;
                  areacode = get_data.areacode;
                  cat1 = get_data.cat1;
                  cat2 = get_data.cat2;
                  cat3 = get_data.cat3;
                  contentid = get_data.contentid;
                  contenttypeid = get_data.contenttypeid;
                  firstimage = get_data.firstimage;
                  firstimage2 = get_data.firstimage2;
                  mapx = get_data.mapx;
                  mapy = get_data.mapy;
                  title = get_data.title;

                  inplus_data = await plus_data.tour_plus(contentid, contenttypeid);
                  homepage = inplus_data.homepage;
                  overview = check(inplus_data.overview,overview);


                  if (homepage == undefined)
                    homepage = null;
                  else {
                    homepageparse = await urlparse.xml2js(homepage);
                    homepage = homepageparse;
                  }


                  await query.set_tour(addr, areacode, in_num, cat1, cat2, cat3, contentid, contenttypeid, firstimage, firstimage2, mapx, mapy, title, homepage, overview);
                  console.log("db삽입 other");
                  break;

                }
              }
 

              addr = get_data[num].addr1;
              areacode = get_data[num].areacode;
              cat1 = get_data[num].cat1;
              cat2 = get_data[num].cat2;
              cat3 = get_data[num].cat3;
              contentid = get_data[num].contentid;
              contenttypeid = get_data[num].contenttypeid;
              firstimage = get_data[num].firstimage;
              firstimage2 = get_data[num].firstimage2;
              mapx = get_data[num].mapx;
              mapy = get_data[num].mapy;
              title = get_data[num].title;


              inplus_data = await plus_data.tour_plus(contentid, contenttypeid);

              homepage = inplus_data.homepage;
              overview = check(inplus_data.overview,overview);


              if (homepage == undefined)
                homepage = null;
              else {
                homepageparse = await urlparse.xml2js(homepage);
                homepage = homepageparse;
              }

              await query.set_tour(addr, areacode, in_num, cat1, cat2, cat3, contentid, contenttypeid, firstimage, firstimage2, mapx, mapy, title, homepage, overview);
              console.log("db삽입");

            }
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          });
      }
    }
  }
})

