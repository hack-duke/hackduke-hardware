import Hardware from '../models/HardwareSchema.js';

function groupByHardwareSet(req,res) {
  Hardware.aggregate([
      {
        $project:{in_stock:{$cond:['$checked_out',0,1]},
                  hardware_set: '$hardware_set'}
      },
      {
        $group: {
          _id:'$hardware_set',
          total:{$sum: 1},
          in_stock:{$sum: '$in_stock'}
        }
      }
    ], function(err, result) {
      if(err) {
        res.status(500).send('error grouping hardware by hardware set.');
      } else {
        res.json(result);
      }
    });
}

function recordForUserId(req,res) {
  Hardware.find({
    'user_checkout':req.params.uid
  }).select('id name checked_out checkout_time user_checkout')
  .exec(function(err,hardware) {
    if(err) {
      res.status(500).send('error finding record by user id');
    } else {
      res.json(hardware);
    }
  });
}

function findCheckedOut(req,res) {
  Hardware.find({
    'checked_out': true
  }).select('id name checked_out user_checkout checkout_time hardware_set')
  .exec(function(err,hardware) {
    if (err) {
      res.status(500).send('error finding all checked-out hardware. ');
    } else {
      res.json(hardware);
    }
  });
}

function findAll(req,res) {
  Hardware.find({
  }).select('id name checked_out checkout_time user_checkout hardware_set')
  .exec(function(err,hardware) {
    if(err) {
      res.status(500).send('error finding hardware. ');
    } else {
      res.json(hardware);
    }
  });
}

function findById(req,res) {
  var id = req.params.id;
  Hardware.findOne({ id: id }, function(err,hardware) {
    if (err) {
      res.status(500).send('error finding hardware with id '+id+'.');
    }
    if(hardware===null) {
      res.status(404).send('no hardware with id '+id+' has been found');
    } else {
      res.json(hardware);
    }   
  });
}
function create(req,res) {
  var newHardware = new Hardware(req.body);
  newHardware.save(function(err,event) {
    if(err) {
      res.status(500).send('error creating hardware entry: '+err);
    } else {
      res.json(event);
    }
  });
}
function remove(req,res) {
  Hardware.remove({ id:req.params.id }, function(err) {
    if(err) {
      res.status(500).send('Could not remove record. Error: '+err);
    }
    res.json('record removed!');
  });
}
function updateForId(req,res) {
  Hardware.update({ id: req.params.id }, {
    name: req.body.name,
    description: req.body.description,
    hardware_set: req.body.hardware_set
  }, {
    upsert: false,
    multi: false
  },
  function(err,writeResult) {
    if(err) {
      res.status(500).send('error updating hardware id '+req.params.id);
      return;
    } 
    res.json(writeResult);
  });
}

function checkout(req,res) {
  var id = req.params.id;
  var checkoutTime = req.body.checkout_time;
  var userId = req.body.userId;
  if(typeof userId==='undefined') {
    res.status(400).send('must include userId in request.');
    return;
  }
  if(typeof checkoutTime==='undefined') {
    res.status(400).send('must include checkout time in request.');
    return;
  }
  
  Hardware.findOne({ id: id }, function(err,hardware) {
    if (err) {
      res.status(400).send('error finding hardware id: '+id+' '+err);
      return;
    }
    if(hardware.checked_out) {
      res.status(400).send('Hardware is already checked out.');
      return;
    }
    hardware.checked_out = true;
    hardware.checkout_time = checkoutTime;
    hardware.user_checkout = userId;
    hardware.record.push({
      "user_id": userId,
      "checkout_time": checkoutTime,
      "checkin_time": ""
    });
    hardware.save(function(err) {
      if(err) {
        res.status(500).send('save failed.');
      }else {
        res.json('checkout record appended.');
      }
    });
  });
}

function checkin(req,res) {
  var id = req.params.id;
  var checkinTime = req.body.checkin_time;
  if(typeof checkinTime==='undefined') {
    res.status(400).send('must include check in time.');
    return;
  }
  Hardware.findOne({ id: id }, function(err,hardware) {
    if(err) {
      res.status(400).send('error finding hardware with id '+id+' '+err);
      return;
    }
    if(!hardware.checked_out) {
      res.status(400).send('hardware is already checked in.');
      return;
    }
    hardware.record[hardware.record.length-1].checkin_time = checkinTime;
    hardware.checked_out = false;
    hardware.user_checkout = '';
    hardware.checkout_time = '';
    hardware.save(function(err) {
      if(err) {
        res.status(500).send('Unable to update hardware record. Contact Administrator');
      }
      res.json('checkin record appended.')
    });
  });
}


export default {groupByHardwareSet,recordForUserId,findCheckedOut,findAll,findById,create,remove,updateForId,checkout,checkin};
