// SPDX-License-Identifier: GPL-3.0
//
// Copyright (c) 2024 LINBIT
//
// Author: Liang Li <liang.li@linbit.com>

import { components, operations } from '@app/apis/schema';

export type CreateResourceDefinitionRequestBody = components['schemas']['ResourceDefinitionCreate'];
export type CreateVolumeDefinitionRequestBody = components['schemas']['VolumeDefinitionCreate'];
export type AutoPlaceRequestBody = components['schemas']['AutoPlaceRequest'];
export type ResourceModifyRequestBody = components['schemas']['ResourceModify'];
export type ResourceCreateRequestBody = components['schemas']['ResourceCreate'];
export type GetResourcesRequestBody = operations['viewResources']['parameters'];
export type GetResourcesResponseBody = components['schemas']['ResourceWithVolumes'][];
export type ResourceListQuery = operations['viewResources']['parameters']['query'];
export type ResourceDataType = components['schemas']['ResourceWithVolumes'];
export type VolumeType = components['schemas']['Volume'];
