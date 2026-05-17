type FormErrorProps = {
  message?: string;
  id?: string;
};

export const FormError = ({ message, id }: FormErrorProps) => {
  if (!message) {
    return null;
  }

  return (
    <p id={id} role="alert" className="text-sm text-red-400">
      {message}
    </p>
  );
};
