export enum StageSale {
  Pending = 'Pending',
  Cancelled = 'Cancelled',
  Paid = 'Paid',
  Printed = 'Printed',
}

export const STAGE_SALE = [
  {
    name: 'Pendiente',
    value: StageSale.Pending,
  },
  {
    name: 'Cancelado',
    value: StageSale.Cancelled,
  },
  {
    name: 'Pagado',
    value: StageSale.Paid,
  },
  {
    name: 'Impreso',
    value: StageSale.Printed,
    disabled: true,
  },
];

export const STAGE_STUDY_VALUE: {
  [key: string]: { name: string; value: StageSale };
} = {
  [StageSale.Pending]: STAGE_SALE[0],
  [StageSale.Cancelled]: STAGE_SALE[1],
  [StageSale.Paid]: STAGE_SALE[2],
  [StageSale.Printed]: STAGE_SALE[3],
};

export const STAGE_STATISTICS = [StageSale.Paid, StageSale.Printed];
