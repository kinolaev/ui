import Component from '@ember/component';
import layout from './template';
import { get, set } from '@ember/object';
import { next } from '@ember/runloop';
import { isEmpty } from '@ember/utils';

export default Component.extend({
  layout,
  showAddCloudCredential:         null,
  errors:                         null,
  region:                         null, // only used a passthrough for the amazon region so the region selection can happen in cloud creds rather than have the markup on both pages
  hideSave:                       false,
  cloudCredentials:               null,
  driverName:                     null,
  primaryResource:                null,
  finishAndSelectCloudCredential: null,
  progressStep:                   null,
  cancel:                         null,

  createLabel:                    'saveCancel.create',
  savingLabel:                    'generic.loading',

  init() {
    this._super(...arguments);

    this.initSingleOrAddCredential();
  },

  actions: {
    doneSavingCloudCredential(cred) {
      if (cred) {
        get(this, 'finishAndSelectCloudCredential')(cred)

        set(this, 'showAddCloudCredential', false);
      }
    },
    addCloudCredential() {
      set(this, 'showAddCloudCredential', true);
    },
    cancleNewCloudCredential() {
      set(this, 'showAddCloudCredential', false);
    },
  },

  initSingleOrAddCredential() {
    if ( isEmpty(get(this, 'primaryResource.cloudCredentialId')) && (get(this, 'cloudCredentials.length') || []) >= 1) {
      let singleCloudCredentialId = get(this, 'cloudCredentials.firstObject.id');

      next(() => {
        set(this, 'primaryResource.cloudCredentialId', singleCloudCredentialId);
      });
    } else {
      if (isEmpty(get(this, 'cloudCredentials'))) {
        next(() => {
          set(this, 'showAddCloudCredential', true);
        });
      }
    }
  },
});
