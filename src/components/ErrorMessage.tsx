type Props = {
  children?: React.ReactNode;
};

export const ErrorMessage: React.FC<Props> = ({ children }) => {
  return (
    <p className="bg-red-50 text-red-600 p-3 uppercase text-sm font-bold text-center">{children}</p>
  );
};
