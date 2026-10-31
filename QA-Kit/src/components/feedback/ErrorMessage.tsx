/**
 * Red error text. Renders nothing when `message` is empty, so you can always render it.
 *
 * @example
 * <ErrorMessage message={error} />
 *
 * Used in: SlotEditor, CollagePanel
 */
export default function ErrorMessage({ message }: { message: string }) {
    if (!message) return null;
    return <p className="error" role="alert">{message}</p>;
}