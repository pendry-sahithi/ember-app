import Controller from '@ember/controller';

export default Controller.extend({
    actions: {
        addtask: function(){
            var title = this.get('title');
            var description = this.get('description');
            var date = this.get('date');

            var newTask = this.store.createRecord('task', {
                title: title,
                description: description,
                date: new Date(date)
            });

            newTask.save();

            this.setProperties({
                title: '',
                description: '',
                date: ''
            });
        }
    }
});
