const axios = require('axios');
const query = require('./insert_query');


var check = (a, b) => {
  if (a == undefined)
    b = null;
  else
    b = a.replace(/(<([^>]+)>)/ig, "");


  return b;
}


exports.type_detail = async (typeid) => {

  var type = await query.get_typeid(typeid);
  for (var i = 0; i < type.length - 1; i++) {

    var contentid = type[i].contentid
    var contenttypeid = typeid
    console.log(contentid);


    var url = 'http://api.visitkorea.or.kr/openapi/service/rest/KorService/detailIntro';
    var queryParams = '?' + encodeURIComponent('serviceKey') + '=hqsf047Rny9qenJ5LHw87FzuJB8iTHKUfcNi0rchTaKMTNSL3ZA0bHXO9mcrWjj2o3QVtAsic9TBtBy0zwQDAw%3D%3D'; /* Service Key*/
    queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10'); /* */
    queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /* */
    queryParams += '&' + encodeURIComponent('MobileOS') + '=' + encodeURIComponent('ETC'); /* */
    queryParams += '&' + encodeURIComponent('MobileApp') + '=' + encodeURIComponent('AppTest'); /* */
    queryParams += '&' + encodeURIComponent('contentId') + '=' + encodeURIComponent(contentid); /* */
    queryParams += '&' + encodeURIComponent('contentTypeId') + '=' + encodeURIComponent(contenttypeid); /* */


    url = url + queryParams

    await axios.get(url)
      .then(async function (response) {

        var data = response.data.response.body.items.item;

        if (contenttypeid == 12) {
          var infocenter, restdate, usetime;



          infocenter = check(data.infocenter, infocenter);
          restdate = check(data.restdate, restdate);
          usetime = check(data.usetime, usetime);


          await query.insert_type12(contentid, infocenter, restdate, usetime);
        }
        else if (contenttypeid == 15) {
          var eventplace, eventenddate, eventstartdate, playtime, sponsor1, sponsor1tel, usetimefestival;

          eventplace = check(data.eventplace, eventplace);
          eventenddate = data.eventenddate;
          eventstartdate = data.eventstartdate;
          playtime = check(data.playtime, playtime);
          sponsor1 = check(data.sponsor1, sponsor1);
          sponsor1tel = check(data.sponsor1tel, sponsor1tel);
          usetimefestival = check(data.usetimefestival, usetimefestival);


          await query.insert_type15(contentid, eventplace, eventenddate, eventstartdate, playtime, sponsor1, sponsor1tel, usetimefestival);
        }
        else //contentid== 28
        {
          var infocenterleports, usetimeleports;

          infocenterleports = check(data.infocenterleports, infocenterleports);
          usetimeleports = check(data.usetimeleports, usetimeleports);

          await query.insert_type28(contentid, infocenterleports, usetimeleports);

        }

      })
      .catch(function (error) {
        console.log(error);
      })
  }
}
