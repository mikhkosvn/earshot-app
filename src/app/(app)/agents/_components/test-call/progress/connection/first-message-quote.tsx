type FirstMessageQuoteProps = {
  message: string | null;
};

export function FirstMessageQuote({ message }: FirstMessageQuoteProps) {
  if (!message) return null;
  return (
    <p className="text-green-800 italic dark:text-green-200">
      &ldquo;{message}&rdquo;
    </p>
  );
}
