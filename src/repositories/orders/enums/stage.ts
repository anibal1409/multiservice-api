export enum StageOrder {
  Required = 'Required',
  Cancelled = 'Cancelled',
  Paid = 'Paid',
  Completed = 'Completed',
}

export const STAGE_ORDER = [
  {
    name: 'Solicitado',
    value: StageOrder.Required,
  },
  {
    name: 'Cancelado',
    value: StageOrder.Cancelled,
  },
  {
    name: 'Pagado',
    value: StageOrder.Paid,
  },
  {
    name: 'Completado',
    value: StageOrder.Completed,
    disabled: true,
  },
];

export const STAGE_ORDER_VALUE: {
  [key: string]: { name: string; value: StageOrder };
} = {
  [StageOrder.Required]: STAGE_ORDER[0],
  [StageOrder.Cancelled]: STAGE_ORDER[1],
  [StageOrder.Paid]: STAGE_ORDER[2],
  [StageOrder.Completed]: STAGE_ORDER[3],
};
