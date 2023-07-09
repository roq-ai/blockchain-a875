const mapping: Record<string, string> = {
  'ethereum-addresses': 'ethereum_address',
  organizations: 'organization',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
