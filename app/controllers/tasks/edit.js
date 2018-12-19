import Controller from '@ember/controller';

export default Controller.extend({
    actions: {
        edittask: function(){
            var title = this.get('title');
            var description = this.get('description');
            var date = this.get('date');

            this.store.findRecord('task', id).then(function(task) {
                task.set('title', title);
                task.set('description', description);
                task.set('date', new Date(date));

                task.save();

                self.transitionTo('tasks');
            });
        }
    }
});
