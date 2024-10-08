// SPDX-License-Identifier: GPL-3.0
//
// Copyright (c) 2024 LINBIT
//
// Author: Liang Li <liang.li@linbit.com>

const en = {
  common: {
    disconnected: 'DISCONNECTED',
    connected: 'CONNECTED',
    search: 'Search',
    property: 'Properties',
    add: 'Add',
    view: 'View',
    edit: 'Edit',
    migrate: 'Migrate',
    delete: 'Delete',
    lost: 'Lost',
    nodes: 'Nodes',
    resources: 'Resources',
    volumes: 'Volumes',
    error_reports: 'Error Reports',
    disk_creation_records: 'Disk creation records',
    deploy: 'Deploy',
    submit: 'Submit',
    cancel: 'Cancel',
    snapshot: 'Snapshot',
    success: 'Success',
  },
  menu: {
    dashboard: 'Dashboard',
    support: 'Support',
    inventory: 'Inventory',
    node: 'Nodes',
    storage_pools: 'Storage Pools',
    error_reports: 'Error Reports',
    software_defined: 'Storage Configuration',
    resource_groups: 'Resource Groups',
    resource_definitions: 'Resource Definitions',
    volume_definitions: 'Volume Definitions',
    resources: 'Resources',
    volumes: 'Volumes',
    node_ip_addrs: 'IP Addresses',
    remotes: 'Remotes',
    linstor: 'LINSTOR',
    s3: 'S3',
    settings: 'Settings',
    gateway: 'Gateway',
    iscsi: 'iSCSI',
    nfs: 'NFS',
    'nvme-of': 'NVMe-oF',
    snapshot: 'Snapshot',
    grafana: 'Grafana',
    users: 'Users',
  },
  node: {
    node_list: 'Node List',
    node_name: 'Name',
    default_ip: 'IP',
    default_port: 'Port',
    node_type: 'Type',
    node_status: 'Status',
    node_detail: 'Node Detail',
    create_node: 'Create Node',
  },
  storage_pool: {
    list: 'Storage Pool List',
    name: 'Name',
    node_name: 'Node Name',
    network_preference: 'Network Preference',
    disk: 'Disk',
    provider_kind: 'Provider Kind',
    capacity: 'Capacity',
    free_capacity: 'Free Capacity',
    total_capacity: 'Total Capacity',
    supports_snapshots: 'Supports Snapshots',
  },
  ip_address: {
    list: 'IP Addresses List',
    node: 'Node',
    ip_address: 'IP Address',
    tcp_port: 'TCP Port',
    alias: 'Alias',
    is_management_network: 'Active',
  },
  error_report: {
    name: 'ID',
    time: 'Time',
    message: 'Message',
    action: 'Action',
    detail_title: 'Error Report Detail',
    list_title: 'Error Report List',
  },
  dashboard: {
    title: 'Dashboard',
  },
  resource_group: {
    list: 'Resource Group List',
    name: 'Resource Group Name',
    place_count: 'Place Count',
    storage_pools: 'Storage Pool(s)',
    replication: 'Replication Mode',
    auto: 'Auto',
    async: 'Asynchronous(A)',
    semi_sync: 'Memory synchronous(B)',
    sync: 'Synchronous(C)',
    diskless: 'Diskless',
    description: 'Description',
  },
  resource_definition: {
    name: 'Name',
    list: 'Resource Definition List',
    resource_group_name: 'Resource Group Name',
    size: 'Size',
    port: 'Port',
    state: 'State',
    replication: 'Replication Mode',
    auto: 'Auto',
    async: 'Asynchronous',
    semi_sync: 'Memory synchronous',
    sync: 'Synchronous',
    diskless: 'Diskless',
    description: 'Description',
  },
  volume_definition: {
    name: 'Name',
    list: 'Volume Definition List',
    resource_group_name: 'Resource Group Name',
    size: 'Size',
    port: 'Port',
    state: 'State',
    replication: 'Replication Mode',
    auto: 'Auto',
    async: 'Asynchronous',
    semi_sync: 'Memory synchronous',
    sync: 'Synchronous',
    diskless: 'Diskless',
    description: 'Description',
  },
  resource: {
    list: 'Resource List',
    resource_name: 'Name',
    resource_node: 'Node',
    resource_port: 'Port',
    resource_usage: 'Usage Status',
    resource_conn: 'Connect Status',
    resource_state: 'State',
    resource_create_time: 'Create Time',
  },
  volume: {
    list: 'Volume List',
    name: 'Name',
    node: 'Node',
    resource: 'Resource',
    storage_pool: 'Storage Pool',
    device_name: 'Device Name',
    allocated: 'Allocated',
    in_use: 'In Use',
    state: 'State',
    un_used: 'UnUsed',
  },
  controller: {
    controller_detail: 'Controller Detail',
  },
  // Remote / Linstor
  linstor: {
    list: 'LINSTOR List',
  },
  iscsi: {
    list: 'iSCSI List',
    create: 'iSCSI Create',
    iqn: 'IQN',
    resource_group: 'Resource Group',
    service_ips: 'Service IP',
  },
  nfs: {
    list: 'NFS List',
    create: 'NFS Create',
    name: 'Name',
    size: 'Size',
    service_ip: 'Service IP',
  },
  nvme: {
    list: 'NVMe-oF List',
    create: 'NVMe-oF Create',
    name: 'Name',
    size: 'Size',
    service_ip: 'Service IP',
  },
  snapshot: {
    list: 'Snapshot List',
    create: 'Create',
    name: 'Name',
    size: 'Size',
    service_ip: 'Service IP',
  },
};

export default en;
