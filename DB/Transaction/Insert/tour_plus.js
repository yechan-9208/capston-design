const axios = require('axios');

exports.tour_plus = (async (contentid,contenttypeid) => {

    var url = 'http://api.visitkorea.or.kr/openapi/service/rest/KorService/detailCommon';
    var queryParams = '?' + encodeURIComponent('serviceKey') + '=hqsf047Rny9qenJ5LH' +
            'w87FzuJB8iTHKUfcNi0rchTaKMTNSL3ZA0bHXO9mcrWjj2o3QVtAsic9TBtBy0zwQDAw%3D%3D';/* Service Key*/
    queryParams += '&' + encodeURIComponent('numOfRows') + '=' +
            encodeURIComponent('10');/* */
    queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent(
        '1'
    );/* */
    queryParams += '&' + encodeURIComponent('MobileOS') + '=' + encodeURIComponent(
        'ETC'
    );/* */
    queryParams += '&' + encodeURIComponent('MobileApp') + '=' +
            encodeURIComponent('AppTest');/* */
    queryParams += '&' + encodeURIComponent('contentId') + '=' +
            encodeURIComponent(contentid);/* */
    queryParams += '&' + encodeURIComponent(contenttypeid) + '=' +
            encodeURIComponent('');/* */
    queryParams += '&' + encodeURIComponent('defaultYN') + '=' +
            encodeURIComponent('Y');/* */
    queryParams += '&' + encodeURIComponent('overviewYN') + '=' +
            encodeURIComponent('Y');/* */

    url = url + queryParams
    const plus_data = await axios.get(url)
        .then(function (response) {

            var get_data = response.data.response.body.items.item;
            return get_data
            
        })
        .catch(function (error) {

            console.log(error);
        });
  return plus_data;
})

