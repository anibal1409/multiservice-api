export enum UserRole {
  Super = 'super',
  SalesAdvisor = 'sales-advisor',
  Manager = 'manager',
  WarehouseManager = 'warehouse-manager',
}

export const USER_ROLES_LIST = {
  [UserRole.Super]: 'Super usuario',
  [UserRole.Manager]: 'Gerente General',
  [UserRole.SalesAdvisor]: 'Asesor de Ventas',
  [UserRole.WarehouseManager]: 'Gerente de Operaciones',
};
