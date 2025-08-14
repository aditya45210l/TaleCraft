interface ContainerProps {
  children: React.ReactNode;
}
export default function Container({ children }: ContainerProps) {
  return <div className="container mx-auto py-4 px-4 md:px-6 max-w-4xl">{children}</div>;
}