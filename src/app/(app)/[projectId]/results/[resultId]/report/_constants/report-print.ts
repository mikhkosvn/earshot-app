export const REPORT_ROOT_ID = 'result-report';

export const REPORT_PRINT_STYLE = `
@media print {
  @page { margin: 16mm; }
  body * { visibility: hidden; }
  #${REPORT_ROOT_ID}, #${REPORT_ROOT_ID} * { visibility: visible; }
  #${REPORT_ROOT_ID} { position: absolute; top: 0; left: 0; width: 100%; }
}
`;
