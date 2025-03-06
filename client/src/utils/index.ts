export const type = [
  {
    name: 'Administrator',
    value: 'administrator'
  },
  {
    name: 'User',
    value: 'user'
  },
  {
    name: 'Editor',
    value: 'editor'
  },
  {
    name: 'Writer',
    value: 'writer'
  }
];

export const status = [
  {
    name: 'Active',
    value: 'active'
  },
  {
    name: 'Inactive',
    value: 'inactive'
  }
];

export const joinDataError = (data: Record<string, unknown>, key: string) => {
  const value = data[key];
  return Array.isArray(value) ? value.join(', ') : value ?? '';
};
