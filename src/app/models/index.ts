import { Models } from '@rematch/core';
import { nfs } from './nfs';
import { node } from './node';
import { setting } from './setting';
import { notification } from './notification';
import { iscsi } from './iscsi';
import { nvme } from './nvme';
import { report } from './report';

export interface RootModel extends Models<RootModel> {
  nfs: typeof nfs;
  node: typeof node;
  setting: typeof setting;
  notification: typeof notification;
  iscsi: typeof iscsi;
  report: typeof report;
  nvme: typeof nvme;
}

export const models: RootModel = { nfs, node, setting, notification, iscsi, report, nvme };
