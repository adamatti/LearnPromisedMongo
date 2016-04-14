'use strict';
const logger = require("log4js").getLogger("index"),
	  config = require("./config"),
	  Promise = require("bluebird"),
	  pmongo = require('promised-mongo')
;

logger.info("Started");

var scope = {obj:{name:"adamatti"}};
return Promise.resolve({})
.then( () => {
	scope.db = pmongo(config.mongo.url);
	scope.collection = scope.db.collection('testCollection');
	return scope.collection.save(scope.obj);
	//list
	//find by id
	//delete
}).then( obj => {
	scope.obj = obj;

	logger.info("Inserted", obj);
	obj.name = "adamatti 2"	
	return scope.collection.save(scope.obj);
}).then( obj => {
	scope.obj = obj;

	logger.info("Updated", obj);
	return scope.collection.find().toArray();
}).then( list => {
	logger.info("List\n", list);

	return scope.collection.findOne({_id: scope.obj._id});
}).then( obj => {
	scope.obj = obj;

	logger.info("Found by id: ", obj);

	return scope.collection.remove({_id: scope.obj._id});	
}).then( obj => {
	logger.info("Removed: ", obj);	
});