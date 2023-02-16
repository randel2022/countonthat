export function ErrorText({ value }) {
  return value ? (
    <span className="text-red-600 text-sm w-full required">{value}</span>
  ) : (
    <></>
  );
}
