interface TestCallTitleProps {
  finished: boolean;
}

export function TestCallTitle({ finished }: TestCallTitleProps) {
  if (finished) return 'Connection test results';
  return 'Testing your connections';
}
