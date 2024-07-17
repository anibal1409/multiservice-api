export enum UserRole {
  Super = 'super',
  SalesAdvisor = 'sales-advisor',
  Manager = 'manager',
  WarehouseManager = 'warehouse-manager',
}

export const USER_ROLES_LIST = {
  [UserRole.Super]: 'Super usuario',
  [UserRole.Manager]: 'Gerente',
  [UserRole.SalesAdvisor]: 'Cajero',
  [UserRole.WarehouseManager]: 'Jefe de almacén',
};
