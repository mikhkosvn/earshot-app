type PhoneNumberCellProps = {
  phoneNumber: string | null;
};

export function PhoneNumberCell({ phoneNumber }: PhoneNumberCellProps) {
  if (!phoneNumber) {
    return <span className="text-muted-foreground italic">No number</span>;
  }
  return phoneNumber;
}
