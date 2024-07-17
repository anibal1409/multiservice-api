export enum CustomerType {
  NaturalPerson = 'natural-person',
  LegalPerson = 'legal-person',
}

export const CUSTOMER_TYPE = [
  {
    name: 'Persona Jurídica',
    value: CustomerType.LegalPerson,
  },
  {
    name: 'Persona Natural',
    value: CustomerType.NaturalPerson,
  },
];

export const CUSTOMER_TYPE_VALUE: {
  [key: string]: { name: string; value: CustomerType };
} = {
  [CustomerType.LegalPerson]: CUSTOMER_TYPE[0],
  [CustomerType.NaturalPerson]: CUSTOMER_TYPE[1],
};
