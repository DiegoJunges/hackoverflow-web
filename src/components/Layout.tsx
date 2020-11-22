import { NavBar } from './NavBar';
import { WraperVariant, Wrapper } from './Wraper';

interface LayoutProps {
  variant?: WraperVariant
}

export const Layout: React.FC<LayoutProps> = ({ children, variant }) => {
  return (
    <div>
      <NavBar />
      <Wrapper variant={variant}>
        {children}
      </Wrapper>
    </div>
  );
};
