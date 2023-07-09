import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface EthereumAddressInterface {
  id?: string;
  address: string;
  organization_id: string;
  created_at?: any;
  updated_at?: any;

  organization?: OrganizationInterface;
  _count?: {};
}

export interface EthereumAddressGetQueryInterface extends GetQueryInterface {
  id?: string;
  address?: string;
  organization_id?: string;
}
