use heroku_vkhkvzv3
db.hardwareschemas.remove({});
db.userschemas.remove({});
db.hardwareschemas.insert({
  "id":"1",
  "name":"hardware 1",
  "checked_out":false,
  "user_checkout":"",
  "checkout_time":"",
  "record":[],
  "hardware_set":"set1"
});
db.hardwareschemas.insert({
  "id":"2",
  "name":"hardware 2",
  "checked_out":true,
  "user_checkout":"Amy",
  "checkout_time":"Sat Oct 8 16.48PM EST",
  "record":[{
    "user_id":"Amy",
    "checkout_time":"Sat Oct 8 16.48PM EST",
    "checkin_time":""
  }],
  "hardware_set":"set1"
});
db.hardwareschemas.insert({
  "id":"3",
  "name":"hardware 2",
  "checked_out":false,
  "user_checkout":"",
  "checkout_time":"",
  "record":[{
    "user_id":"Bob",
    "checkout_time":"Sat Oct 8 16.48PM EST",
    "checkin_time":"Sat Oct 9 16.48PM EST"
  }],
  "hardware_set":"set2"
});
db.hardwareschemas.insert({
  "id":"4",
  "name":"hardware 4",
  "checked_out":true,
  "user_checkout":"Bill",
  "checkout_time":"Sun Oct 9 17:19PM EST",
  "record":[{
    "user_id":"Bill",
    "checkout_time":"Sun Oct 9 17:19PM EST",
    "checkin_time":"Sun Oct 9 18:19PM EST"
  }],
  "hardware_set":"set2"
});
db.hardwareschemas.insert({
  "id":"5",
  "name":"hardware 5",
  "checked_out":true,
  "user_checkout":"Bill",
  "checkout_time":"Sun Oct 9 17:19PM EST",
  "record":[{
    "user_id":"Bill",
    "checkout_time":"Sun Oct 9 17:19PM EST",
    "checkin_time":"Sun Oct 9 18:19PM EST"
  }],
  "hardware_set":"set3"
});
db.hardwareschemas.insert({
  "id":"6",
  "name":"hardware 6",
  "checked_out":true,
  "user_checkout":"Bill",
  "checkout_time":"Sun Oct 9 17:19PM EST",
  "record":[{
    "user_id":"Bill",
    "checkout_time":"Sun Oct 9 17:19PM EST",
    "checkin_time":"Sun Oct 9 18:19PM EST"
  }],
  "hardware_set":"set3"
});
db.hardwareschemas.insert({
  "id":"7",
  "name":"hardware 7",
  "checked_out":true,
  "user_checkout":"Bill",
  "checkout_time":"Sun Oct 9 17:19PM EST",
  "record":[{
    "user_id":"Bill",
    "checkout_time":"Sun Oct 9 17:19PM EST",
    "checkin_time":"Sun Oct 9 18:19PM EST"
  }],
  "hardware_set":"set3"
});
