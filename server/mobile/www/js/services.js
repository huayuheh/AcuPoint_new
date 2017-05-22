angular.module('starter.services', [])


.factory('Records', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var records = [{
    id: 0,
    name: 'Third eye point GV24.5',
    face: '/img/treatment/gv24.svg',
    time: '2'
  }, {
    id: 1,
    name: 'Drilling Bamboo B2',
    face: '/img/treatment/b2.svg',
    time: '4'
    }, {
    id: 2,
    name: 'Facial Beauty St3',
    face: '/img/treatment/st3.svg',
    time: '4'
  }, {
    id: 3,
    name: 'Joining the Valley (Hoku)  LI4',
    face: '/img/treatment/li4.svg',
    time: '2'
  }];

  return {
    all: function() {
      return records;
    },
    remove: function(record) {
      records.splice(records.indexOf(record), 1);
    },
    get: function(recordID) {
      for (var i = 0; i < records.length; i++) {
        if (records[i].id === parseInt(recordID)) {
          return records[i];
        }
      }
      return null;
    }
  };
});
