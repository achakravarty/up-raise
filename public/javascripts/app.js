window.UpRaise = Ember.Application.createWithMixins(Bootstrap.Register, {
	LOG_TRANSITIONS: true
});

UpRaise.ApplicationSerializer = DS.RESTSerializer.extend({
    primaryKey: function(type) {
        return '_id';
    }
});

UpRaise.ApplicationAdapter = DS.RESTAdapter.extend({	
    namespace: 'api'    
});