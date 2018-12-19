import Application from '../app';
import config from '../config/environment';
import { setApplication } from '@ember/test-helpers';
import { moduleFor, test, start } from 'ember-qunit';

setApplication(Application.create(config.APP));

moduleFor('adapter:application', 'Unit | Adapter | application', {
    // Specify the other units that are required for this test.
    needs: ['service:firebase']
  });
  
  test('it exists', function(assert) {
    let adapter = this.subject();
    assert.ok(adapter);
  });
  
start();
