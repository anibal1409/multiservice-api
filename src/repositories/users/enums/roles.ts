export enum UserRole {
  Super = 'super',
  Bionalist = 'bionalist',
  Administrativessistant = 'administrative-assistant',
  LaboratoryAssistant = 'laboratory-assistant',
  Manager = 'manager',
}

export const USER_ROLES_LIST = {
  [UserRole.Super]: 'Super usuario',
  [UserRole.Manager]: 'Gerente',
  [UserRole.Bionalist]: 'Bionalista',
  [UserRole.Administrativessistant]: 'Asistente administrativo',
  [UserRole.LaboratoryAssistant]: 'Auxiliar de laboratorio',
};
