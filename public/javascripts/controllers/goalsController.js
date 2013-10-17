UpRaise.GoalsController = Ember.ArrayController.extend({
	needs: ['reviewdocument'],
	actions: {
		showAddGoalRow: function() {
			this.set('showAddRow', true);
		},
		cancelRow: function() {
	      this.set('showAddRow', false);	      
	    },
		saveRow: function() {
			
			var weight = this.get('weight');
			if (!weight || !weight.trim()) { 
				console.log('no weight found')
				return; 
			}

			var goal = this.store.createRecord('goal', {
				index: this.get('nextIndex'),
				kra: this.get('kra'),
				type: this.get('type'),
				description: this.get('description'),
				weight: this.get('weight')
			});
			
			var kra = this.get('controllers.reviewdocument.content');
			kra.set('isApproved', false);
			goal.reviewdocument = kra;
			goal.save().then(function() {
				kra.get('goals').addObject(goal);
				kra.save();
				
			});

			this.set('showAddRow',false);
		},
		reset: function() {
			UpRaise.reset();
		},
		saveDraft: function() {
			//this.get('model').forEach(function(val) { val.reload()});
		},
		requestApproval: function() {
			
		}
	},
	nextIndex: function() {
		var length = this.get('length') + 1;
		return length;
	}.property('@each.weight'),
	totalWeight: function () {
		var total = 0;
		this.get('model').forEach(function(item, index, list) {
			if(item.get('weight'))
				total+=parseInt(item.get('weight'));
		}, this);

		return total;
	}.property('@each.weight'),

	showSubmit: function () {
		if(this.get('totalWeight') == 100)
			return true;
		else
			return false;
	}.property('@each.weight'),

	showAddRow: false
});