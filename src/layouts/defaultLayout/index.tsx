import { Outlet } from 'react-router-dom';
import { Header } from '../../Components/header';
import { LayoutContainer } from './styles';

export function DefaultLayout() {
  return (
    <LayoutContainer>
      <Header />
      <Outlet />
    </LayoutContainer>
  );
}