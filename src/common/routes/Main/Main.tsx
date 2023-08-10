import React, { Suspense, lazy } from 'react';
import { Layout } from 'antd';
import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ILayoutOwnState } from '@common/redux/modules/Layout/LayoutInterface';
import Header from '@common/containers/Header';
import Footer from '@common/containers/Footer';
import { Paths } from '@common/constants/Paths';
import { useAuth } from '@common/contexts/AuthContext';
import PageLoading from '@common/components/PageLoading';
import PrivateRoute from '@common/containers/PrivateRoute';
import HomeRoute from '@common/containers/HomeRoute/HomeRoute';
import { StyledContent } from './styled';

const PageUnderConstruction = lazy(() => import('@common/components/PageUnderConstruction'));
const Home = lazy(() => import('@modules/Home'));
const Entry = lazy(() => import('@modules/Entry'));
const Photo = lazy(() => import('@modules/Photo'));

//todo add route to PageNotFound, AccessDenied

const Main: React.FC = () => {
  const { isUserLoading } = useAuth();
  const hideContentPadding = useSelector(({ layout }: ILayoutOwnState) => layout.hideContentPadding);

  if (isUserLoading) {
    return <PageLoading />;
  }

  return (
    <Layout>
      <Header />
      <StyledContent $hideContentPadding={hideContentPadding}>
        <Suspense fallback={<PageLoading />}>
          <Routes>
            <Route
              path={Paths.Home}
              element={
                <HomeRoute>
                  <Home />
                </HomeRoute>
              }
            />
            <Route path={Paths.Welcome} element={<Home />} />
            {/* //todo: allow everybody to view */}
            <Route
              path={Paths.Entry}
              element={
                <PrivateRoute>
                  <Entry />
                </PrivateRoute>
              }
            />
            <Route
              path={Paths.Photo}
              element={
                <PrivateRoute>
                  <Photo />
                </PrivateRoute>
              }
            />
            {/* todo: Create Page Not Found View */}
            <Route path="*" element={<PageUnderConstruction title="Page Not Found" />} />
          </Routes>
        </Suspense>
      </StyledContent>
      <Footer />
    </Layout>
  );
};

export default Main;
